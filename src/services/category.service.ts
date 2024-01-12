import { FindCategoryById } from '../db';
import { ERRORS, prisma } from '../helper';
import { Category, CategoryDto, CreateCategorySchema } from '../schema/category.schema';

export async function GetAllCategories(): Promise<Partial<Category>[]> {
  return await prisma.category.findMany({
    include: {
      owner: {
        select: {
          id: true,
          email: true,
        },
      },
    },
  });
}
export async function GetOneCategory(id: string): Promise<Partial<Category>> {
  const existCategry = FindCategoryById(Number(id));
  if (!existCategry) {
    throw ERRORS.categoryNotExists;
  }
  return existCategry;
}

export async function CreateCategory(dto: CategoryDto): Promise<Partial<Category>> {
  const { counter, latitude, longitude, ownerId, title } = dto;
  const existCategry = await prisma.category.findFirst({ where: { title } });
  if (existCategry) {
    throw ERRORS.categoryExists;
  }
  return await prisma.category.create({
    data: {
      counter,
      latitude,
      longitude,
      ownerId,
      title,
    },
  });
}

export async function UpdateCategory(id: string, dto: Partial<CategoryDto>): Promise<void> {
  if (dto.title) {
    const existCategry = await prisma.category.findFirst({ where: { title: dto.title } });
    if (existCategry) {
      throw ERRORS.categoryExists;
    }
  }
  await prisma.category.update({
    where: {
      id: Number(id),
    },
    data: {
      ...dto,
    },
  });
}

export async function DeleteCategory(id: string): Promise<void> {
  const existCategry = FindCategoryById(Number(id));
  console.log('existCategry :>> ', existCategry);
  if (!existCategry) {
    throw ERRORS.categoryNotExists;
  }
  await prisma.category.delete({ where: { id: Number(id) } });
}

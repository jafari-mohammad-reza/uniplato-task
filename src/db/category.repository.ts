import { prisma } from '../helper';
import { Category } from '../schema/category.schema';

export async function FindCategoryById(id: number): Promise<Partial<Category>> {
  return await prisma.category.findFirst({
    where: { id },
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

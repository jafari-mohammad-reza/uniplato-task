import { Category } from './category.schema';

export declare type User = {
  id: number;
  email: string;
  password: string;
  salt: string;
  categories: Category[];
};
export interface LoginRequestBody {
  email: string;
  password: string;
}

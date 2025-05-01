import { IUser } from "../auth/IUser";
import { ICategory, ICategoryList } from './ICategory';
import { IHeading } from "./IHeading";








export interface IPost {
  id: string;
  user: any;
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  keywords: string;
  slug: string;
  category: ICategory;
  created_at: string;
  updated_at: string;
  status: string;
  headings: IHeading[];
  view_count: number;
  comments_count: number;
  has_liked: boolean;
  likes_count: number;
}

export interface IPostsList {
  id: string;
  title: string;
  updated_at: string;
  created_at: string;
  description: string;
  thumbnail: string;
  slug: string;
  category: ICategoryList;
  view_count: string;
  user: IUser;
  status: string;
}


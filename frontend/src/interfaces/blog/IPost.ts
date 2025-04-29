import { IUser } from "../auth/IUser";
import { ICategoryList } from "./ICategory";
import { IHeading } from "./IHeading";

export interface IPost {
  id: string;
  user: string;
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  keywords: string;
  slug: string;
  category: string;
  created_at: string;
  update_at: string;
  headings: IHeading[];
  status: string;
  view_count: number;
  has_liked: boolean;
  comments_count: number;
  likes_count: number;
}

export interface IPostsList {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  updated_at: string;
  created_at: string;
  slug: string;
  category: ICategoryList;
  view_count: string;
  user: IUser;
  nextUrl: string;
} 
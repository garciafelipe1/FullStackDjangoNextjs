import { IPostsList } from "@/interfaces/blog/IPost";
import PostCard from "./PostCard";
import LoadingPostCard from "@/components/loaders/LoaderPostCard";

interface ComponentProps {
  posts: IPostsList[];
  title?: string;
  description?: string;
  loading: boolean;
}
export default function PostList({ posts,loading,title, description }: ComponentProps) {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {
          title !=='' &&(

          <div className="mx-auto  text-left">
            <h2 className="text-balance text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
              {title}
            </h2>
            {
              description !=='' &&(
                <p className="mt-2 text-lg/8 text-gray-600">
                  {description}
                </p>
              )
            }
           
          </div>

        )}         
         <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {loading 
              ? Array.from({ length: 3 }).map((_, index) => <LoadingPostCard key={index}/>)
              :posts?.map((item) => (<PostCard key={item?.id} post={item} />))
              }
                
            </div>
        
      </div>
    </div>
  );
}

PostList.defaultProps = {
  title: "",
  description: "",
};

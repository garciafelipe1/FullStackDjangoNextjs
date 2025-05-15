import { IPostsList } from "@/interfaces/blog/IPost";
import Image from "next/image";
import moment from 'moment';
import Link from 'next/link';

interface ComponentProps {
    post: IPostsList
}




export default function PostCard({ post }: ComponentProps) {
  return (
    <div>
      <article className="flex flex-col items-start justify-between">
        {post?.thumbnail && (
          <div className="relative w-full">
            <Image
              width={146}
              height={146}
              alt=""
              src={`http://127.0.0.1:8004${post?.thumbnail}`}
              className="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[2/2]"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
          </div>
        )}
        <div className="max-w-xl">
          <div className="mt-8 flex items-center gap-x-4 text-xs">
            <time dateTime={post?.updated_at} className="text-gray-500">
              {moment(post?.updated_at).subtract(3, 'days').calendar()}
            </time>
            <Link
              href={`/category/${post?.user?.username}`}
              className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
            >
              {post?.category?.name}
            </Link>
          </div>
          <div className="group relative">
            <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
              <Link href={`/@/${post?.user?.username}/`}>
                <span className="absolute inset-0" />
                {post?.title}
              </Link>
            </h3>
            <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">{post?.description}</p>
          </div>
          <div className="relative mt-8 flex items-center gap-x-4">
            <Image
              width={40}
              height={40}
              alt=""
              src={`http://127.0.0.1:8004${post.user.profile_picture}`}
              className="size-10 rounded-full bg-gray-100"
            />
            
            <div className="text-sm leading-6">
              <p className="font-semibold text-gray-900">
                <Link href={`/@/${post?.user?.username}/`}>
                  <span className="absolute inset-0" />
                  {post?.user?.username}
                </Link>
              </p>
            </div>
            
          </div>
        </div>
      </article>
    </div>
  );
}
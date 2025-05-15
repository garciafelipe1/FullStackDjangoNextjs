import { IPostsList } from '@/interfaces/blog/IPost';

import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';

interface ComponentProps {
  posts: IPostsList[];
}

export default function PostCardList({ posts }: ComponentProps) {
  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <article key={post.id} className="mx-auto w-full max-w-2xl lg:mx-0 lg:max-w-lg">
          <time dateTime={post.updated_at} className="block text-sm/6 text-gray-600">
            {moment(post.updated_at).fromNow()}
          </time>
          <h2 className="mt-4 text-pretty text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
            {post.title}
          </h2>
          <p className="mt-4 text-base/7 text-gray-600">{post.description}</p>
          <div className="mt-4 flex flex-col justify-between gap-6 sm:mt-8 sm:flex-row-reverse sm:gap-8 lg:mt-4 lg:flex-col">
            <div className="flex">
              <Link
                href={`/blog/${post.slug}`}
                className="text-sm/6 font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Leer más<span className="sr-only">, {post.title}</span>
              </Link>
            </div>
            <div className="flex lg:border-t lg:border-gray-900/10 lg:pt-8">
              <Link
                href={`/@/${post.user.first_name}/`}
                className="flex gap-x-2.5 text-sm/6 font-semibold text-gray-900 hover:text-gray-700"
              >
                <Image
                  width={24}
                  height={24}
                  alt={`Avatar de ${post.user.first_name}`}
                  src={post.thumbnail}
                  className="size-6 flex-none rounded-full bg-gray-50 object-cover"
                />
                {post.user.first_name}
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

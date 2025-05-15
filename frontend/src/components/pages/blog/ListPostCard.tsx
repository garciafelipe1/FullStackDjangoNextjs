import { IPostsList } from '@/interfaces/blog/IPost';
import { RootState } from '@/redux/reducers';
import { useState } from 'react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import DeletPostModal from './DeletePostModal';
import EditPostModal from './EditPostModal';

interface ComponentsProps {
  post: IPostsList;
  handleDelete?: (slug: string) => Promise<void>;
  loadingDelete?: boolean;
}

export default function ListPostCard({ post, handleDelete, loadingDelete }: ComponentsProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  return (
    <article key={post.id} className="relative isolate flex flex-col gap-8 lg:flex-row">
      {post?.thumbnail && (
        <div className="relative aspect-video sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
          <Image
            width={290}
            height={290}
            alt=""
            src={`http://127.0.0.1:8004${post.category.thumbnail}`}
            className="absolute inset-0 size-full rounded-2xl bg-gray-50 object-cover"
          />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
        </div>
      )}
      <div>
        <div className="flex items-center gap-x-4 text-xs">
          <time dateTime={post?.updated_at} className="text-gray-500">
            {moment(post?.updated_at).subtract(3, 'days').calendar()}
          </time>
          <Link
            href={`/category/${post.category.slug}`}
            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          >
            {post.category.name}
          </Link>
        </div>

        <div className="group relative max-w-xl">
          <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
            <Link href={`blog/post/${post?.slug}`}>
              <span className="absolute inset-0" />
              {post.title}
            </Link>
          </h3>
          <p className="mt-5 text-sm/6 text-gray-600">{post?.description}</p>
        </div>

        {/* Usuario + botones */}
        <div className="mt-6 flex items-center justify-between border-t border-gray-900/5 pt-6">
          <div className="flex items-center gap-x-3">
            <Image
              width={256}
              height={256}
              alt=""
              src={`http://127.0.0.1:8004${post.user.profile_picture}`}
              className="size-10 rounded-full bg-gray-50 object-cover"
            />
            <div className="text-sm">
              <p className="font-semibold text-gray-900">
                <Link href={`/@/${post?.user?.username}`}>
                  <span className="absolute inset-0" />
                  {post?.user?.username}
                </Link>
              </p>
              <p className="text-gray-600">
                {post?.user?.role
                  ? post.user.role.charAt(0).toUpperCase() + post.user.role.slice(1)
                  : ''}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-x-4">
            <button
              onClick={() => setOpenEdit(!openEdit)}
              type="button"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => setOpenDelete(!openDelete)}
              type="button"
              className="text-sm font-medium text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
          <DeletPostModal
            open={openDelete}
            setOpen={setOpenDelete}
            post={post}
            handleDelete={handleDelete || (() => Promise.resolve())}
            loadingDelete={loadingDelete || false}
          />
          <EditPostModal open={openEdit} setOpen={setOpenEdit} slug={post?.slug} />
        </div>
      </div>
    </article>
  );
}

ListPostCard.defaultProps = {
  handleDelete: null,
  loadingDelete: false,
};

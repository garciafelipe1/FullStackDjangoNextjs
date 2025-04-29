import CustomTabs from '@/components/CustomTabs';
import CreatePost from '@/components/pages/blog/CreatePost';
import ListPosts from '@/components/pages/blog/ListPosts';
import Layout from '@/hocs/Layout';
import useCategories from '@/hooks/useCategories';
import usePosts from '@/hooks/usePosts';
import usePostsAuthor from '@/hooks/usePostsAuthor';

import { IProfile } from '@/interfaces/auth/IProfile';
import { IUser } from '@/interfaces/auth/IUser';
import { RootState } from '@/redux/reducers';
import SanitizeContent from '@/utils/SanitizeContent';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';

import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { slug } = context.params as { slug: string };

  let user: IUser | null = null;
  let profile: IProfile | null = null;

  try {
    const apiRes = await fetch(`${process.env.API_URL}/api/profile/get/?username=${slug}`, {
      headers: {
        Accept: 'application/json',
      },
    });
    const data = await apiRes.json();
    if (apiRes.status === 200) {
      user = data.results.user;
      profile = data.results.profile;
    }
  } catch (e) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user,
      profile,
    },
  };
};

function CreatePostContent() {
  return <div key={1}>Create Post</div>;
}

export default function Page({
  profile,
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const myUser = useSelector((state: RootState) => state.auth.user);

  const social = [
    {
      name: 'URL',
      href: profile?.website,
      icon: <i className="bx bx-globe text-3xl"></i>,
    },
    {
      name: 'Facebook',
      href: profile?.facebook,
      icon: <i className="bx bxl-facebook text-3xl" />,
    },
    {
      name: 'Twitter',
      href: profile?.twitter,
      icon: <i className="bx bxl-twitter text-3xl" />,
    },
    {
      name: 'Snapchat',
      href: profile?.snapchat,
      icon: <i className="bx bxl-snapchat text-3xl" />,
    },
    {
      name: 'Github',
      href: profile?.github,
      icon: <i className="bx bxl-facebook text-3xl" />,
    },
    {
      name: 'Instagram',
      href: profile?.instagram,
      icon: <i className="bx bxl-instagram text-3xl" />,
    },
    {
      name: 'LinkedIn',
      href: profile?.linkedin,
      icon: <i className="bx bxl-linkedin text-3xl" />,
    },
    {
      name: 'Tiktok',
      href: profile?.tiktok,
      icon: <i className="bx bxl-tiktok text-3xl" />,
    },
    {
      name: 'Youtube',
      href: profile?.youtube,
      icon: <i className="bx bxl-youtube text-3xl" />,
    },
  ];

  const sanitizedBio = SanitizeContent(profile?.biography);
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const toggleExpanded = () => {
    setIsExpand(!isExpand);
  };
  const biographyPreview = sanitizedBio.slice(0, 600);
  const isCustomer = user?.role === 'customer';
  const isOwner = myUser?.username === user?.username;

  const { categories, loading: loadingCategories } = useCategories();

  // Enlistar nuestros posts si estamos en nuestro perfil
  const {
    posts: authorPosts,
    loading: loadingAuthorPosts,
    loading: loadingMoreAuthorPosts,
    loadMore: loadMoreAuthorPosts,
  } = usePostsAuthor({ isOwner });

  // Enlistar los posts de alguien más
  const authorHook = usePostsAuthor({ isOwner });
  const otherUserHook = usePosts({ username: user?.username });

  const { posts, loading, loadingMore, loadMore, nextUrl, handleDelete, loadingDelete } = isOwner
    ? authorHook
    : otherUserHook;

  return (
    <div>
      <Image
        className="h-48 w-full object-cover lg:h-64"
        src={`http://127.0.0.1:8004${profile?.profile_banner}`}
        width={512}
        height={512}
        alt=""
      />
      <div className="mx-auto max-w-5xl px-4 pb-32 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <Image
              width={512}
              height={512}
              className="dark:bg-dark-bg dark:border-dark-border h-24 w-24 rounded-full border bg-white object-cover sm:h-32 sm:w-32"
              src={`http://127.0.0.1:8004${profile?.profile_picture}`}
              alt=""
            />
          </div>
          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center space-x-1">
              <h2 className="text-2xl font-semibold">{user?.username}</h2>
              <CheckBadgeIcon className="h-5 w-auto text-green-500" />
            </div>
            <div className="flex items-center space-x-2">
              {social?.map((item) => {
                if (item.href && item.href.trim() !== '') {
                  return (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      key={item?.name}
                      href={item?.href}
                    >
                      {item?.icon}
                    </Link>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
        <div className="relative mt-12 pb-8">
          <p dangerouslySetInnerHTML={{ __html: isExpand ? sanitizedBio : biographyPreview }} />
          {!isExpand && (
            <div className="dark:from-dark-main absolute bottom-0 h-32 w-full bg-gradient-to-t from-white dark:to-transparent" />
          )}
          <div>
            <button
              onClick={toggleExpanded}
              type="button"
              className="absolute bottom-2 right-2 z-10 text-indigo-500 hover:text-indigo-700"
            >
              {isExpand ? 'View Less' : 'View More'}
            </button>
          </div>
        </div>
        <div className="mt-2">
          <CustomTabs
            titles={isOwner && !isCustomer ? ['Post', 'Create Post'] : ['Post']}
            panels={
              isOwner && !isCustomer
                ? [
                    <div className="mt-6" key={1}>
                      <ListPosts
                        loading={loading}
                        key={1}
                        posts={posts}
                        loadingMore={loadingMore}
                        nextUrl={nextUrl}
                        loadMore={loadMore}
                        handleDelete={handleDelete}
                        loadingDelete={loadingDelete}
                      />
                    </div>,
                    <CreatePost
                      key={2}
                      categories={categories}
                      loadingCategories={loadingCategories}
                    />,
                  ]
                : [
                    <div className="mt-6" key={1}>
                      <ListPosts
                        key={1}
                        posts={posts}
                        loadingMore={loadingMore}
                        nextUrl={nextUrl}
                        loadMore={loadMore}
                        handleDelete={handleDelete}
                        loadingDelete={loadingDelete}
                      />
                    </div>,
                  ]
            }
            width="w-full"
          />
        </div>
      </div>
    </div>
  );
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

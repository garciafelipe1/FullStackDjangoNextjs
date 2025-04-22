
import CustomTabs from '@/components/CustomTabs';
import Layout from '@/hocs/Layout';
import { IProfile } from '@/interfaces/auth/IProfile';
import { IUser } from '@/interfaces/auth/IUser';
import SanitizeContent from '@/utils/SanitizeContent';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';

import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ReactElement, useState } from 'react';


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

function PostsContent() {
  return <div key={1}>Posts</div>;
}
function CreatePostContent() {
  return <div key={2}>Create Post</div>;
}


export default function Page({
  profile,
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
   const toggleExpanded=()=>{
     setIsExpand(!isExpand);
   }
   const biographyPreview=sanitizedBio.slice(0,600);
   const isCustomer = user?.role === 'customer';
   

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
        <div>
          <CustomTabs
            titles={isCustomer ? ['Post'] : ['Post', 'Create Post']}
            panels={isCustomer ? [PostsContent()] : [PostsContent(), CreatePostContent()]}
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

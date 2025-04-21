
import Layout from "@/hocs/Layout";
import { IProfile } from "@/interfaces/auth/IProfile";
import { IUser } from "@/interfaces/auth/IUser";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { ReactElement } from "react";

export const getServerSideProps:GetServerSideProps = async (context:GetServerSidePropsContext) => {
    
    const{slug}=context.params as {slug:string};

    let user: IUser | null = null
    let profile: IProfile| null = null

    
    try{
        const apiRes=await fetch(`${process.env.API_URL}/api/profile/get/?username=${slug}`,
        {
            headers:{
                Accept:'application/json',
            },
        })
     const data=await apiRes.json(); 
     if(apiRes.status===200){
        user=data.results.user
        profile=data.results.profile
     }   
    }catch(e){
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
      profile
    },
  };
}

export default function Page({
  profile,
  user
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
            <div>URLS</div>
            
          </div>
        </div>
      </div>
    </div>
  );
}


Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
  
} 

import EditEmail from "@/components/forms/EditEmail";
import Layout from "@/hocs/Layout";
import { ReactElement } from 'react';
import { useState } from "react";




export default function Page(){


    const[email,setEmail]= useState<string>('')
    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email);
    };


  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-32 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Registrate y empieza ahora!
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleOnSubmit} className="space-y-6">
          
          <EditEmail 
            data={email} 
            setData={setEmail} 
            title="Email"
            placeholder="YourEmail@gmail.com" description="write your email"
            required/>
          
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not a member?{' '}
          <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Start a 14 day free trial
          </a>
        </p>
      </div>
    </div>
  );
 
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
  
}
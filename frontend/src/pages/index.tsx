import Layout from "@/hocs/Layout";
import { ReactElement } from "react";

export default function Home() {
  return <div className="text-rose-500">home page</div>
}


Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
  
} 
import FeaturedPost from "@/components/pages/blog/FeaturedPosts";
import PostList from "@/components/pages/blog/PostList";
import Layout from "@/hocs/Layout";
import usePosts from "@/hooks/usePosts";
import { ReactElement } from "react";

export default function Page() {

  const{ posts : featuredPost, loading : loadingFeaturedPosts}=usePosts({showFeatured:true});  
  const { posts, loading } = usePosts({ showFeatured: false });  
  

  return <div className="text-rose-500">
    <FeaturedPost posts={featuredPost} loading={loadingFeaturedPosts}/>
    <PostList title="Latest Posts" posts={posts} loading={loading}/>
    </div>
}


Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
  
} 
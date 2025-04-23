import Button from "@/components/Buttom";
import EditImage from "@/components/forms/EditImage";
import EditKeywords from "@/components/forms/EditKeywords";
import EditRichText from "@/components/forms/EditRichText";
import EditSelect from "@/components/forms/EditSelect";
import EditSlug from "@/components/forms/EditSlug";
import EditText from "@/components/forms/EditText";
import { ToastError } from "@/components/toast/toast";
import { ICategory } from "@/interfaces/blog/ICategory";

import { useState } from "react";


interface ComponentProps{
    categories:ICategory[]
    loadingCategories:boolean;
}




export default function CreatePost({ categories, loadingCategories }: ComponentProps) {
  const [title, setTitle] = useState<string>('');
  const [description, setdescription] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<any>(null);
  const [keywords, setKeywords] = useState<string>('');
  const [slug, setSlug] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  const[loading,setLoading]=useState<boolean>(false)
  const handleOnSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try {
        setLoading(true)
    }
    catch (err) {
      ToastError("Something went wrong")
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleOnSubmit} className="space-y-4">
      <EditText title="Title" data={title} setData={setTitle} required />
      <EditText title="Description" data={description} setData={setdescription} required />
      <EditRichText title="Content" data={content} setData={setContent}  />
      <EditImage title="Thumbail" data={thumbnail} setData={setThumbnail} />
      <EditKeywords title="Keywords" data={keywords} setData={setKeywords} required />
      <EditSlug title="Slug" data={slug} setData={setSlug} required />
      <EditSelect
        title="Category"
        data={category}
        setData={setCategory}
        options={categories.map((cat) => cat.slug)}
        placeholder="Select a category"
      />
      <Button >Create Post</Button>
    </form>
  );
}
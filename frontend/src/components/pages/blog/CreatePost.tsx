import Button from "@/components/Buttom";
import EditImage from "@/components/forms/EditImage";
import EditKeywords from "@/components/forms/EditKeywords";
import EditRichText from "@/components/forms/EditRichText";
import EditSelect from "@/components/forms/EditSelect";
import EditSlug from "@/components/forms/EditSlug";
import EditText from "@/components/forms/EditText";
import LoadingMoon from "@/components/loaders/LoadingMoon";
import { ToastError, ToastSuccess } from "@/components/toast/toast";
import { ICategory } from "@/interfaces/blog/ICategory";
import createPost, { CreatePostProps } from "@/utils/api/blog/post/Create";




import { useState } from "react";


interface ComponentProps{
    categories:ICategory[]
    loadingCategories:boolean;
}




export default function CreatePost({ categories, loadingCategories }: ComponentProps) {
  const [title, setTitle] = useState<string>('');
  const [description, setdescription] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [keywords, setKeywords] = useState<string>('');
  const [slug, setSlug] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const[status,setStatus]=useState<string>('draft');

  const [thumbnail, setThumbnail] = useState<any>(null);
  const [percentage, setPercentage] = useState<number>(0);
  const[hasChangesThumbnail, setHasChangesThumbnail] = useState<boolean>(false);
  const [uploadingProfilePicture, setUploadingThubnail] = useState<boolean>(false);
  const[loading,setLoading]=useState<boolean>(false)
  
  const onLoadThumbnail = (newImage: any) => {
    if (newImage?.file !== thumbnail?.file) {
      setThumbnail(newImage);
      setHasChangesThumbnail(true);
      console.log('Actualización de profilePicture:', newImage);
    }
  };
  
  const isEmpty = (str: string) => {
    const CleanedContent = str.replace(/<[^>]+>/g, '').trim();
    return CleanedContent === '';
  };
  

  
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEmpty(content)) {
      ToastError('Content cannot be empty');
      return null;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('content', content);
      formData.append('keywords', keywords);
      formData.append('slug', slug);
      formData.append('category', category);
      formData.append('status', status);

      if (thumbnail?.file) {
        formData.append(
          'thumbnail',
          thumbnail.file,
          `thumbnail_${Date.now()}_${thumbnail.file.name.replace(/\s/g, '_')}`,
        );
      }

      const res = await fetch('/api/blog/post/create/', {
        // ¡Llamamos a nuestra API Route!
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        ToastSuccess(data.results || `Post '${title}' created successfully!`);
        // ...
      } else {
        ToastError(data.error || `Failed to create post: ${res.statusText}`);
      }
    } catch (error) {
      ToastError('An unexpected error occurred while creating the post.');
      console.error('Frontend error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleOnSubmit} className="space-y-4">
      <EditText title="Title" data={title} setData={setTitle} required />
      <EditText title="Description" data={description} setData={setdescription} required />
      <EditRichText title="Content" data={content} setData={setContent} />
      <EditImage
        onLoad={onLoadThumbnail}
        title="Thumbail"
        data={thumbnail}
        setData={setThumbnail}
      />
      <EditKeywords title="Keywords" data={keywords} setData={setKeywords} required />
      <EditSlug title="Slug" data={slug} setData={setSlug} required />
      <EditSelect
        title="Category"
        data={category}
        setData={setCategory}
        disabled={loadingCategories}
        options={categories.map((cat) => cat.slug)}
        placeholder="Select a category"
      />
      <EditSelect
        title="Status"
        data={status}
        setData={setStatus}
        options={['draft', 'published']}
        placeholder="Select status"
      />
      <Button type="submit">{loading ? <LoadingMoon /> : 'Create Post'}</Button>
    </form>
  );
}
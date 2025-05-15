
import { ToastError, ToastSuccess } from "@/components/toast/toast";
import { IPostsList } from "@/interfaces/blog/IPost"
import deletePost from "@/utils/api/blog/post/author/delete";

import fetchPosts, { FetchPostProps } from "@/utils/api/blog/post/List";
import { use, useCallback, useEffect, useState } from "react"


interface ComponentProps {
  username?: string;
  showFeatured?: boolean
}

export default function usePosts({ username, showFeatured }: ComponentProps) {
  const [posts, setPosts] = useState<IPostsList[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [nextUrl, setNextUrl] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(12);
  const [ordering, setOrdering] = useState<string>('');
  const [sorting, setSorting] = useState<string>('');
  const [searchBy, setSearchBy] = useState<string>('');
  const [isFeatured, setIsFeatured] = useState<boolean>(showFeatured || false);
  const [author, setAuthor] = useState<string>(username || '');

  const listPosts = useCallback(
    async (page: number, search: string) => {
      try {
        setLoading(true);

        const fetchPostsData: FetchPostProps = {
          p: page,
          page_size: pageSize,
          ordering,
          sorting,
          search,
          author,
          ...(showFeatured !==undefined && {is_featured:showFeatured}),
        };

        const res = await fetchPosts(fetchPostsData);
        if (res.status === 200) {
          setPosts(res.results);
          setCount(res.count);
          setNextUrl(res.next);
        }
        // Aquí deberías actualizar el estado 'posts', 'count' y posiblemente 'nextUrl'
      } catch (err) {
        ToastError('error fetching  posts');
      } finally {
        setLoading(false);
      }
    },
    [pageSize, ordering, sorting, author, isFeatured],
  );

  useEffect(() => {
    listPosts(currentPage, searchBy);
  }, [listPosts, currentPage]);
  const onSubmitSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    listPosts(1, searchBy);
  };

  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const loadMore = async () => {
    if (nextUrl) {
      try {
        setLoadingMore(true);

        const url = new URL(nextUrl);
        const queryParams = new URLSearchParams(url.search);

        const params: any = {};
        queryParams.forEach((value, key) => {
          params[key] = value;
        });

        const fetchPostsData: FetchPostProps = {
          p: params.p,
          page_size: params.page_size,
          ...(showFeatured !== undefined && { is_featured: showFeatured }),
        };

        const res = await fetchPosts(fetchPostsData);

        if (res.status === 200) {
          setPosts([...posts, ...res.results]);
          setCount(res.count);
          setNextUrl(res.next);
        }
      } catch (err) {
        ToastError('Error Fetching posts');
      } finally {
        setLoadingMore(false);
      }
    }
  };

  const [loadingDelete, setLoadingDelete] = useState(false);
  const handleDelete = async (slug: string) => {
    try {
      setLoadingDelete(true);
      const res = await deletePost({ slug });
      if (res.status === 200) {
        ToastSuccess('post deleted successfully');
        setPosts((prevPosts) => prevPosts.filter((post) => post.slug !== slug));
      }
    } catch (err) {
      ToastError('error deleting post');
    } finally {
      setLoadingDelete(false);
    }
  };

  return {
    posts,
    count,
    loading,
    loadingMore,
    nextUrl,
    loadingDelete,
    pageSize,
    currentPage,
    ordering,
    sorting,
    searchBy,
    handleDelete,
    setCurrentPage,
    setPageSize,
    setOrdering,
    setSorting,
    setSearchBy,
    setAuthor,
    loadMore,
    onSubmitSearch,
    setIsFeatured
  };
}
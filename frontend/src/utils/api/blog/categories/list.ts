import buildQueryString from "@/utils/BuildQueryString"

export interface fetchCategoriesProps {
  parent_slug?: string;
  ordering?: string;
  sorting?: string;
  search?: string;
  p?: number;
  page_size?: number;
}



export default async function fetchCategories(props:fetchCategoriesProps) {
    try{
           const res = await fetch(`/api/blog/categories/list/?${buildQueryString(props)}`);
            const data=await res.json()
            console.log(data)
            return data
        }catch(err){
            console.log(err);
            return null
        }

}

fetchCategories.defaultProps = {

};
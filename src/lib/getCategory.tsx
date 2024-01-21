import { trpc } from '@/app/_trpc/client' 
const getCategory = (id:number) => {
    const {data:categoryData, error:categoryError, isLoading:categoryLoading}:any = trpc.subMenu.gets.useQuery()
    const catName = categoryData && categoryData.find(x => x.id === id)
    return catName;
  }
export default getCategory;
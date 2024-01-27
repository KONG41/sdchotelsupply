import { trpc } from '@/app/_trpc/client' 
const getCategory = (id:number) => {
    const {data:categoryData} = trpc.subMenu.gets.useQuery()
    const catName = categoryData && categoryData.find(x => x.id === id)
    return catName;
  }
export default getCategory;
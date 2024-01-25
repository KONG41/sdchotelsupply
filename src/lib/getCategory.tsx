import { trpc } from '@/app/_trpc/client' 
const getCategory = (id:number) => {
    // eslint-disable-next-line
    const {data:categoryData} = trpc.subMenu.gets.useQuery()
    const catName = categoryData && categoryData.find(x => x.id === id)
    return catName;
  }
export default getCategory;
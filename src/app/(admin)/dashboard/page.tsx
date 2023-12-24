import {auth} from "@/auth"
import DashboardPage from "@/app/_components/admin/page/dashboardpage";
import { redirect } from "next/navigation";

export default async function Page() {

  // const session = await auth();
  // console.log(session)
  // if(!session){
  //   redirect("/")
  // }

  return(
    <DashboardPage/>
  )
}
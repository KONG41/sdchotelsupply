import Login from "@/app/_components/admin/page/login"
import {auth} from "@/auth";
import {redirect} from "next/navigation"
export default async function Page(){
    const session = await auth();
    if(session?.user?.id){
        redirect("/dashboard");
    }


    return <Login />
}
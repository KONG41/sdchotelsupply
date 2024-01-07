import { redirect } from "next/navigation";

export default async function Page() {

  // const session = await auth();
  // console.log(session)
  // if(!session){
  //   redirect("/")
  // }

  return redirect("/dashboard/user")
}
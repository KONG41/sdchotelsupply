"use client";
import { trpc } from "@/app/_trpc/client"
import { toast } from "sonner";

export default function Test(){

  const {data,error,isLoading} = trpc.getData.useQuery();
    if(isLoading) toast.loading("Loading...")
    if(error) toast.error(error.message)
    return(
    <div>
      {data?.message}
      {error?.message}
    </div>
    )
}
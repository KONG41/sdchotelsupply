"use client";
import { trpc } from "@/app/_trpc/client"

export default function Test(){

  const {data,error} = trpc.getData.useQuery();

    return(
    <div>
      {data?.message}
      {error?.message}
    </div>
    )
}
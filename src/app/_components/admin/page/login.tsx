"use client";
import { useState } from "react";
import {Button,Input} from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
export default function Page(){

    const [username , setUsername ] = useState("")
    const [password, setPassword ] = useState("")
    // const [isLoading,setIsLoading] = useState(false)

    const handleLogin = ()=>{
      if(!username ||!password){
            toast.error(("Please enter a username and password"));
            // setIsLoading(false);
            return;
        }
        toast.promise(signIn("credentials", {
            username: username,
            password: password,
            redirect:false
        }),{
            loading: ("Logging in"),
            success: (res) => { 
                if(res?.error){
                    toast.error(("Invalid username or password"));
                    toast.dismiss();
                    // setIsLoading(false);
                    return;
                }
                // useRouter not working
                window.location.reload();
                return ("Logged in")
            },
            error: (e)=> {console.log("error",e);return ("Something went wrong11!")},
        })
    }

    return(
        <div className="flex justify-center items-center h-screen w-full">
            <div className="flex flex-col gap-3 w-[350px] p-3">
                <div className="text-2xl font-bold">Admin</div>
                <div className="flex flex-col gap-3">
                    <Input autoCapitalize="off" autoCorrect="off" label="Username" onChange={(e)=>setUsername(e.target.value)} value={username}/>
                    <Input autoCapitalize="off" autoCorrect="off" type="password" label="Password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
                    <Button onClick={handleLogin}>Login</Button>
                </div>
            </div>
        </div>
    )
}
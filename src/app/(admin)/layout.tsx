import "~/styles/globals.css";
import 'react-quill/dist/quill.snow.css';
import TrpcProvider from "@/app/_trpc/Provider";
import { Inter } from "next/font/google";
import { Providers } from "@/app/providers";
import {Toaster} from "sonner"
import Sidebar from "@/app/_components/admin/sidebar";
import Topbar from "@/app/_components/admin/topbar";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import { db } from "~/server/db";
import { signOut } from "next-auth/react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "SDC Hotel Supply",
  description: "SDC Hotel Supply was established in 2008. Until now SDC work closely with all 5 stars hotels in Cambodia.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if(!session){
    redirect("/")
  }
  const user = await db.user.findUnique({where:{id:Number(session.user.id)},select:{username:true,status:true}})

  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TrpcProvider BASE_URL={BASE_URL}>
          <Providers>
          <div className="flex h-screen">
              <Sidebar />
              <div className="flex flex-col w-full p-3">
                <Topbar user={user}/>
                <div className="flex h-full mt-3">
                  {children}
                </div>
              </div>
          </div>
          </Providers>
        </TrpcProvider>
        <Toaster />
      </body>
    </html>
  );
}

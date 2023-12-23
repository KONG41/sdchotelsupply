import "~/styles/globals.css";
import TrpcProvider from "@/app/_trpc/Provider";
import { Inter } from "next/font/google";
import { Providers } from "@/app/providers";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "SDC Hotel Supply",
  description: "SDC Hotel Supply was established in 2008. Until now SDC work closely with all 5 stars hotels in Cambodia.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TrpcProvider BASE_URL="http://localhost:3000">
          <Providers>
              {children}
          </Providers>
        </TrpcProvider>
      </body>
    </html>
  );
}

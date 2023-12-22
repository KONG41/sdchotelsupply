import "~/styles/globals.css";

import { Inter } from "next/font/google";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { Providers } from "./providers";
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
        <Providers>
          <Header />
            {children}
          <Footer/>
        </Providers>
      </body>
    </html>
  );
}

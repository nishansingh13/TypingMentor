import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ContextProvider from "./context/ContextProvider";
import Navbar from "./component/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TypingMentor",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ContextProvider>
         
        {children}
        </ContextProvider>
      </body>
    </html>
  );
}

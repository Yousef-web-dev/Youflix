import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/anvbar/Navbar";
import Footer from "@/components/footer/Footer";
import PageTransition from "@/components/PageTransition"; // استدعاء مكون الانتقال
import "aos/dist/aos.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-black text-white">
        <Navbar user={null} />
        
        {/* تغليف المحتوى هنا يطبق التأثير على كل الصفحات واللينكات */}
        <PageTransition>
          {children}
        </PageTransition>

        <Footer />
      </body>
    </html>
  );
}
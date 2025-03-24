// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from 'next/font/google';
import Navbar from "./componens/Navbar";
import { UserProvider } from "./componens/UserContext"; 


const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
});

export const metadata: Metadata = {
  title: "AstroTour",
  description: "AstroTour Official",
  icons: {
    icon: "/project.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu" className={montserrat.className}>
      <body className="min-h-screen bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: "url('/galaxy.jpg')" }}>
        <main>
            <UserProvider>
              <Navbar />
              {children}
            </UserProvider>
        </main>
      </body>
    </html>
  );
}

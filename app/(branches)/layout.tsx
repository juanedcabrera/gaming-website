import WebsiteFooter from "../components/Footer/page"
import Navigation from "../components/Navigation/page"
import '../globals.css'
import { Toaster } from "@/components/ui/toaster"

export const metadata = {
  title: 'Project 1 Games',
  description: 'A website for indie game developers to share their games and get support from the community.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className="flex flex-col min-h-screen">
        <Navigation />
        <div className="flex-grow">{children}</div>
        <Toaster />
        <WebsiteFooter />
      </body>
    </html>
  );
}
 
import WebsiteFooter from "../../components/Footer/page"
import Navigation from "../../components/Navigation/page"
import '../globals.css'

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
    <html lang="en">
      <body >
      <Navigation />
      <div>
        {children}
      </div>
        <WebsiteFooter />
      </body>
    </html>
  )
}

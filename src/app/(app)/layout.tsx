import Navbar from "@/components/Navbar";


interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-100 via-green-100 to-yellow-100">

      <Navbar/>
      {children}
    </div>
  );
}
import React from "react";
import UserNav from "../components/UserNav";
import Footer from "../components/Footer";

interface Props {
  children: React.ReactNode;
}

function Layout(props: Props) {
  const { children } = props;

  return (
    <div className="w-full">
      <UserNav />
      <main className="xl:max-w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;

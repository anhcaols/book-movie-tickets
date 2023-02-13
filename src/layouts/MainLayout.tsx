import Header from './HeaderLayout/HeaderLayout';
import Footer from './FooterLayout';

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="app">
      <Header />
      <main className="main mt-[70px] md:mt-20 bg-bgd">{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;

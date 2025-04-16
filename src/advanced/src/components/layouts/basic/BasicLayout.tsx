import Header from "#advanced/components/layouts/Header";
import Main from "#advanced/components/layouts/Main";
import Footer from "#advanced/components/layouts/Footer";

const BasicLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-gray-100 min-h-screen flex">
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
};

export default BasicLayout;

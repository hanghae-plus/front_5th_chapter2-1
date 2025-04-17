import React from "react";

import { cn } from "#advanced/libs";
import Header from "#advanced/components/layouts/Header";
import Main from "#advanced/components/layouts/Main";
import Footer from "#advanced/components/layouts/Footer";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {}

const BasicLayout: React.FC<React.PropsWithChildren<IProps>> = ({ children, className, ...props }) => {
  return (
    <div {...props} className={cn("min-h-screen bg-gray-100", className)}>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
};

export default BasicLayout;

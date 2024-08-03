import React from "react";

interface Props {}

function Footer(props: Props) {
  const {} = props;

  return (
    <footer className="xl:max-w-full max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 xl:px-20 mb-10 mt-auto">
      <div className="border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
        <p>&copy; shoe store 2022, all rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer;

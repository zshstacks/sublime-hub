import React from "react";

interface MarkdownLayoutProps {
  children: React.ReactNode;
}

const MarkdownLayout = ({ children }: MarkdownLayoutProps) => {
  return (
    <div className="min-h-screen  bg-white dark:bg-gray-900 bg-[url('https://images.unsplash.com/photo-1542640244-7e672d6cef4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
      <main className="h-screen flex items-center justify-center">
        {children}
      </main>
    </div>
  );
};

export default MarkdownLayout;

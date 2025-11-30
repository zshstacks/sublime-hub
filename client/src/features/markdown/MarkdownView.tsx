import ListSidebar from "@/features/markdown/components/ListSidebar";
import FirstContent from "@/features/markdown/components/FirstContent";
import SecondContent from "@/features/markdown/components/SecondContent";

const MarkdownView = () => {
  return (
    <div className=" shadow-lg rounded-xl bg-red-700 overflow-hidden w-[1752px] h-[850px] mx-auto my-6">
      <div className="flex h-full ">
        {" "}
        <ListSidebar />
        <div className="flex w-full justify-center">
          <FirstContent />
          <SecondContent />
        </div>
      </div>
    </div>
  );
};

export default MarkdownView;

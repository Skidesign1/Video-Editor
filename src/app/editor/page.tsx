import { StoreProvider } from "@/store";
import { Editor } from "../../components/Editor";

function EditorPage() {
  return (
    <StoreProvider>
      <p className=" ml-5"><img src="/favicon.png" className="h-[40px] w-[40px] ml-5 mt-5" /> Skye Studio</p>
      <Editor/>
    </StoreProvider>
  );
}

export default EditorPage;

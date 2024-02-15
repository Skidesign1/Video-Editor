"use client"
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { StoreProvider } from "@/store";
import { Editor } from "../../../components/Editor";


function EditorPage( ) {

    const params = useParams<{ templateId: string }>()
    const [templateInfo, setTemplateInfo] = useState(null);
  
    useEffect(() => {
      const fetchTemplateInfo = async () => {
        try {
          // Make a POST request to fetch template info using the provided id
          const response = await axios.get(`https://skyestudio-backend.onrender.com/templates/${params.templateId}`);
          console.log(response)
          setTemplateInfo(response.data);
        } catch (error) {
          console.error('Error fetching template info:', error);
        }
      };
  
      if (params.templateId) {
        fetchTemplateInfo();
      }
    }, [params.templateId]);

  return (
    <StoreProvider>
      <p className=" ml-5"><img src="/favicon.png" className="h-[40px] w-[40px] ml-5 mt-5" /> Skye Studio</p>
      <Editor/>
    </StoreProvider>
  );
}



export default EditorPage;

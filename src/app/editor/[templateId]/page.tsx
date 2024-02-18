"use client"
import { useParams } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { StoreProvider } from "@/store";
import { Editor } from "../../../components/Editor";


function EditorPage( ) {

    const params = useParams<{ templateId: string }>()
    const searchParams = useSearchParams()
    const userId = searchParams.get('userId')
   if (userId) {
    window.sessionStorage.setItem('userId', userId);
  }
    const [templateInfo, setTemplateInfo] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
  
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

      const userId = window.sessionStorage.getItem('userId');
      const fetchUserInfo = async () => {
        try {
          // Make a POST request to fetch user info using the provided id
          const response = await axios.get(`https://skyestudio-backend.onrender.com/user/profile`);
          console.log(response)
          setUserInfo(response.data);
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      };
  
      if (params.templateId) {
        fetchTemplateInfo();
      }

      if (userId) {
        fetchUserInfo();
      }
    }, [params.templateId, userId]);

  return (
    userId &&
    <StoreProvider>
      <p className=" ml-5"><img src="/favicon.png" className="h-[40px] w-[40px] ml-5 mt-5" /> Skye Studio</p>
      <Editor/>
    </StoreProvider>
  );
}



export default EditorPage;

"use client"
import React from "react";
import { useParams } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { StoreProvider } from "@/store";
import { StoreContext } from "@/store";
import { Editor } from "../../../components/Editor";


function EditorPage() {
  const store = React.useContext(StoreContext);

  const params = useParams<{ templateId: string }>()
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId')
  const token = searchParams.get('token')
  if (token) {
    window.sessionStorage.setItem('token', token);
  }
  if (userId) {
    window.sessionStorage.setItem('userId', userId);
  }
  if (params.templateId) {
    window.sessionStorage.setItem('templateId', params.templateId);
  }

  useEffect(() => {
    const fetchTemplateInfo = async () => {
      try {

        const token = window.sessionStorage.getItem('token');

        // Check if token exists
        if (!token) {
          // Handle case where token is not available
          console.error('Token not found in session.');
          return;
        }

        // Define request headers with Authorization header containing the token
        const config = {
          headers: {
            Authorization: `${token}`,
          },
        };
        // Make a POST request to fetch template info using the provided id
        const response = await axios.get(`https://skyestudio-backend.onrender.com/templates/${params.templateId}`, config);
        console.log(response)
        store?.setTemplateInfo(response.data);
      } catch (error) {
        console.error('Error fetching template info:', error);
      }
    };

    const userId = window.sessionStorage.getItem('userId');
    const fetchUserInfo = async () => {
      try {
        const token = window.sessionStorage.getItem('token');

        // Check if token exists
        if (!token) {
          // Handle case where token is not available
          console.error('Token not found in session.');
          return;
        }

        // Define request headers with Authorization header containing the token
        const config = {
          headers: {
            Authorization: `${token}`,
          },
        };

        // Make a POST request to fetch user info using the provided id
        const response = await axios.get(`https://skyestudio-backend.onrender.com/user/profile`, config);
        console.log(response)
        store?.setUserInfo(response.data);
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
      <Editor />
    </StoreProvider>
  );
}



export default EditorPage;

"use client";
import { Dispatch,SetStateAction , useMemo } from 'react';
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';

export default function Editor({value,setValue,readOnly}:{value:string,setValue: Dispatch<SetStateAction<string>>,readOnly?:boolean}){
   const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);
   const toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

    ];

  return <ReactQuill readOnly={readOnly} modules={{toolbar:toolbarOptions}}  theme="snow" value={value} onChange={setValue} />;
}
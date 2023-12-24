"use client";
import { useState , useMemo } from 'react';
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';

export default function Editor(){
  const [value, setValue] = useState('');
   const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);

  return <ReactQuill theme="snow" value={value} onChange={setValue} />;
}
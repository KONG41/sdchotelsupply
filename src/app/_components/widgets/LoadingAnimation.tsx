"use client";
import React from "react";
// import Lottie from "react-lottie";
import Loading from "@/assets/loading.png"
import * as loadingAnimation from "@/assets/loading_animation.json";

const LoadingAnimation = () => {

  return <img src={Loading.src} className="w-[300px] h-[300px]"/>
};

export default LoadingAnimation;

"use client";
import React from "react";
import Lottie from "react-lottie";
import * as loadingAnimation from "@/assets/loading_animation.json";

const LoadingAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} height={400} width={400} />;
};

export default LoadingAnimation;

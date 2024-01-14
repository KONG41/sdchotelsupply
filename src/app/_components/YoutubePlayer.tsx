import React from "react";
import YouTube, { YouTubeProps } from "react-youtube";

interface YouTubePlayerProps {
  videoId: string | undefined;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId }) => {
  if (!videoId) {
    // Handle the case where videoId is undefined, if needed
    return <div>Invalid video ID</div>;
  }

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: "215",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  return <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />;
};

export default YouTubePlayer;

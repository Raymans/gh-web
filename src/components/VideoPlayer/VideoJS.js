import React from 'react';
import videojs from 'video.js';
import 'videojs-youtube';
import 'video.js/dist/video-js.css';

export const VideoJS = (props) => {

  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const {
    options,
    onReady
  } = props;

  React.useEffect(() => {
    // make sure .js pVideolayer is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = playerRef.current = videojs(videoElement, options, () => {
        onReady && onReady(player);
      });
    } else {
    }
  }, [options, videoRef]);

  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered"/>
    </div>
  );
};

export default VideoJS;

/**
 * Display song, artist, name etc.
 *
 */

import React from "react";

const Song = ({ currentSong, isPlaying }) => {
  return (
    <div className="song-container">
      <img
        src={currentSong.cover}
        alt={currentSong.name}
        className={isPlaying === true ? "music-played" : ""}
      ></img>
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
};

export default Song;

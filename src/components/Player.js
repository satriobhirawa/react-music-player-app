/**
 * Control media player
 *
 */

import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  setSongInfo,
  songInfo,
  songs,
  setSongs,
  setCurrentSong,
}) => {
  // * Effect

  useEffect(() => {
    const newSongs = songs.map((song) => {
      if (song.id === currentSong.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return { ...song, active: false };
      }
    });
    setSongs(newSongs);
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then((audio) => {
          audioRef.current.play();
        });
      }
    }
  }, [currentSong]);

  // * Handlers

  const playHandler = () => {
    //todo correct audio ref
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipHandler = async (direction) => {
    //current song position is
    let curIndex = songs.findIndex((song) => song.active);

    if (direction === "skipforward") {
      await setCurrentSong(songs[(curIndex + 1) % songs.length]);
    }
    if (direction === "skipback") {
      if ((curIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        if (isPlaying) audioRef.current.play();
        return;
      }
      await setCurrentSong(songs[(curIndex - 1) % songs.length]);
    }
    if (isPlaying) audioRef.current.play();
  };

  // * Utils Functions

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  return (
    <div className="player">
      {/* controlling time slider, play button, forward, backward  */}
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          type="range"
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={dragHandler}
        />
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back-btn"
          size="2x"
          icon={faAngleLeft}
          color="white"
          onClick={() => skipHandler("skipback")}
        />
        <FontAwesomeIcon
          className="play-btn"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
          onClick={playHandler}
          color="white"
        />
        <FontAwesomeIcon
          className="skip-forward-btn"
          size="2x"
          icon={faAngleRight}
          color="white"
          onClick={() => skipHandler("skipforward")}
        />
      </div>
    </div>
  );
};

export default Player;

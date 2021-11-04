import React from "react";
import LibrarySong from "./LibrarySong";
import UserInfo from "./UserInfo";

const Library = ({
  songs,
  currentSong,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  libraryStatus,
}) => {
  return (
    <div className={`library ${libraryStatus ? "active-lib" : ""}`}>
      <UserInfo />
      <div>
        {songs.map((song) => (
          <LibrarySong
            songs={songs}
            song={song}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            key={song.id}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;

import React from "react";

const LibrarySong = ({
  song,
  currentSong,
  setCurrentSong,
  id,
  songs,
  audioRef,
  isPlaying,
  setSongs,
}) => {
  //!function
  const clickedSong = async () => {
    // const selectedSong = songs.filter((state) => state.id === song.id);
    //filter will reutrn an array, so selected first element
    // setCurrentSong(selectedSong[0]);
    await setCurrentSong(song);

    const newSongs = songs.map((song) => {
      if (song.id === id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return { ...song, active: false };
      }
    });
    if (isPlaying) audioRef.current.play();
    setSongs(newSongs);

    //check if the song is playing
  };

  return (
    <div
      className={`library-song-container ${
        song.id === currentSong.id ? "selected" : ""
      }`}
      onClick={clickedSong}
    >
      <img src={song.cover} alt={song.name}></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;

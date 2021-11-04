import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Nav = ({ libraryStatus, setLibraryStatus }) => {
  return (
    <nav>
      <h2>Gramus</h2>
      <button onClick={() => setLibraryStatus(!libraryStatus)}>
        <FontAwesomeIcon icon={faList} color="white" />
      </button>
    </nav>
  );
};

export default Nav;

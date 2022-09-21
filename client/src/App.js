import "./App.css";
import { useState } from "react";
import { Link } from "react-router-dom";

//testy

const App = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  

  return (
    <div className="Homepage">
      <div className="homepage-menu">
        <img
          src={require("/Users/Admin/Unstable Unicorns/client/src/assets/logoUU.png")}
          alt="LOGO"
          width="400px"
          margin-top="10px"
          class="center"
        />
        <div className="joinChatContainer">
          <input
            type="text"
            placeholder="Steven"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
        </div>
        <div className="homepage-form">
          <Link to={`/load?roomCode=${room}`}>
            <button className="game-button green">
              JOIN GAME
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default App;

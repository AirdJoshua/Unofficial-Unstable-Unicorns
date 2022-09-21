import "/Users/Admin/Unstable Unicorns/client/src/Screens/ScreenCSS/loading.css";
import { useEffect, useState } from "react";
import queryString from "query-string";

var io = require("socket.io-client");
var socket = io.connect("http://localhost:3001", { reconnect: true });

socket.on("connect_error", (err) => {
	console.log(`connect_error due to ${err.message}`);
});
// Add room full 
// Add errors 

const Loading = (props) => {
	const data = queryString.parse(props.location.search);
	const [username, setUsername] = useState("");
	const [room, setRoom] = useState(data.roomCode);
	const [roomFull, setRoomFull] = useState(false);
	const [users, setUsers] = useState([]);
	{
		/* React Hook */
	}
	const [currentUser, setCurrentUser] = useState("");
	const [isDisabled, setDisabled] = useState(false);
	const [gameShow, setGameShow] = useState(false);
	useEffect(() => {
		socket.emit("join_room", { room: room }, (error) => {
			if (error) setRoomFull(true);
		});

		socket.on("roomData", ({ users }) => {
			setUsers(users);
		});

		socket.on("currentUserData", ({ name }) => {
			setCurrentUser(name);
		});
	}, []);

	const startGame = () => {
		setGameShow(true);
	};

	return (
		// Contains the rounded rectangle image and List of players in room.
		//Image shows the purple round rectangle to dispaly hold text
		// Holds waiting for players gif and number of players
		// Displays list of players in room

		//if sufficient players are in room and start button is pressed  Homepage2 will be hidden
		//game will be initialized
		//game screen will be displayed to players
		<div className="GameScreen">
			{!gameShow ? (
				<div className="Homepage2">
					<img
						src={require("/Users/Admin/Unstable Unicorns/client/src/assets/pplist.png")}
						alt="List"
						height={"600px"}
						class={"center"}
					/>

					<div className="WaitHead">
						{/* Dispaly number of users in room with header Number of Players 1/4 */}
						<h1>Number of players in room {users.length}/2</h1>
						<div className="ListPlayers">
							<ul>
								{users.map((item) => (
									<li key={item.objectID}>
										{" "}
										{/* React Hook */}
										{item.name}
									</li>
								))}
							</ul>
							<button className="game-button green" onClick={startGame}>
								START GAME
							</button>
						</div>
					</div>
				</div>
			) : (
				<div className="GameRoom">
					<h1> GameRoom</h1>
					{/* Class that displays the background and board */}
					{/* Class to init game */}
					{/* Player 1 view  */}
					{/* Player 2 view  */}
				</div>
			)}
		</div>
	);
};

export default Loading;

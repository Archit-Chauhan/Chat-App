import './App.css';
import io from 'socket.io-client';
import { useState } from'react';
import Chats from './Chats';

const socket = io('http://localhost:3001');

function App() {
  const [username,setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat,setShowChat] = useState(false);
  const joinRoom = () => {
    if(username!=="" && room !== "" ){
        socket.emit('join_room',room)
        setShowChat(true);
    }
  };
  return (
    <div className="App">
      {!showChat?(
        <div className='joinChatContainer' >
        <h3>Join A Chat</h3>
          <input type="text" placeholder="John.." onChange = {(event) => setUsername(event.target.value)}/>
          <input type="text" placeholder="Room id.." onChange = {(event) => setRoom(event.target.value)}/>
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ):(
        <>
        <h3>Welcome {username} to Room {room}</h3>
        <Chats socket={socket} username={username} room={room}/>
        </>
      )} 
    </div>
  );
}

export default App;

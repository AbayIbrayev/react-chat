import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './chat.styles.css';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = `localhost:5000`;

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT, {
      transports: ['websocket', 'polling', 'flashsocket'],
    });

    // console.log(name, room);
    setName(name);
    setRoom(room);

    console.log(socket);

    socket.emit('join', { name, room }, () => {});

    // return () => {
    //   socket.emit('disconnect');

    //   socket.off();
    // };
  }, [location.search, ENDPOINT]);

  //listening to messages
  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  //sending messages
  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  console.log(message, messages);

  return (
    <div className='outerContainer'>
      <div className='container'>
        <input
          type='text'
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={(event) =>
            event.key === 'Enter' ? sendMessage(event) : null
          }
        />
      </div>
    </div>
  );
};

export default Chat;

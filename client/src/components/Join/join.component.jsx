import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './join.styles.css';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className='join__wrapper'>
      <div className='join__container'>
        <h1 className='join__text'>
          Realtime Chat Application{' '}
          <span role='img' aria-label='emoji'>
            💬
          </span>
        </h1>
        <h2 className='join__text'>
          Created with React, Express, Node and Socket.io{' '}
          <span role='img' aria-label='emoji'>
            ❤️
          </span>
        </h2>
        <h1 className='join__heading'>Join</h1>
        <div>
          <input
            placeholder='Enter your name'
            className='join__input'
            type='text'
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder='Enter room name'
            className='join__input mt-20'
            type='text'
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
        <Link
          onClick={(event) => (!name || !room ? event.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className='join__button mt-20' type='submit'>
            Join
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;

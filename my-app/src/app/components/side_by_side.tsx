"use client"; // Ensure this is a client-side component

import React, { useEffect, useState } from 'react';

export default function Side() {
  const [imagePair, setImagePair] = useState(null);
  const [rando, setRando] = useState(1); 
  const [count, setCount] = useState(0); // dummy variable used to trigger useEffect 

  function randomNumber(): number {
    return Math.floor(Math.random() * 33);
  }

  useEffect(() => {
    fetch('http://localhost:6969/api/getImagePair')
      .then((response) => response.json())
      .then((data) => {setImagePair(data); setRando(randomNumber());})
      .catch((error) => console.error('Error fetching data:', error));
  }, [count]);

  if (!imagePair) {
    return <p className='text-2xl'>Loading...</p>;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {rando % 2 == 0 ? (
        <>
          <img src={imagePair.aiImageUrl} style={{ width: '30%', height: '30%' }} alt="AI Generated" onClick={() => setCount(count+1)}/>
          <p style={{ margin: '0 16px', fontSize: '2rem' }}>or</p>
          <img src={imagePair.realImageUrl} style={{ width: '30%', height: '30%' }} alt="Real" onClick={() => setCount(count+1)} />
        </>
      ) : (
        <>
          <img src={imagePair.realImageUrl} style={{ width: '30%', height: '30%' }} alt="Real" onClick={() => setCount(count+1)} />
          <p style={{ margin: '0 16px', fontSize: '2rem' }}>or</p>
          <img src={imagePair.aiImageUrl} style={{ width: '30%', height: '30%' }} alt="AI Generated" onClick={() => setCount(count+1)} />
        </>
      )}
    </div>
  );
}

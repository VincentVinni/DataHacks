"use client"; // Ensure this is a client-side component

import React, { useEffect, useState } from 'react';
import Image from 'next/image'

export default function Side() {
  const [imagePair, setImagePair] = useState(null);
  const [rando, setRando] = useState(1); 
  const [count, setCount] = useState(0); // dummy variable used to trigger useEffect 

  function randomNumber(): number {
    return Math.floor(Math.random() * 100);
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
          <Image src={imagePair.aiImageUrl} width={400} height={400} alt="AI Generated" onClick={() => setCount(count+1)} priority />
          <p style={{ margin: '0 16px', fontSize: '2rem' }}>or</p>
          <Image src={imagePair.realImageUrl} width={400} height={400} alt="Real" onClick={() => setCount(count+1)} priority />
        </>
      ) : (
        <>
          <Image src={imagePair.realImageUrl} width={400} height={400} alt="Real" onClick={() => setCount(count+1)} priority />
          <p style={{ margin: '0 16px', fontSize: '2rem' }}>or</p>
          <Image src={imagePair.aiImageUrl} width={400} height={400} alt="AI Generated" onClick={() => setCount(count+1)} priority />
        </>
      )}
    </div>
  );
}

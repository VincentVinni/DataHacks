"use client"; // Ensure this is a client-side component

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image'
import Loader from './loader';

export default function Side() {
  const [imagePair, setImagePair] = useState(null);
  const [rando, setRando] = useState(1); 
  const [count, setCount] = useState(0); // dummy variable used to trigger useEffect 

  const handleAiPick = async (imageUrl: string) => {
    try {
      await fetch('http://localhost:6969/api/updateScore', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl }),
      });
  
      setCount(count + 1);
      setImagePair(null);
    } catch (error) {
      console.error('Error updating score:', error);
    }
  }
  
  function handleRealPick(): void {
    setCount(count+1)
    setImagePair(null)
  }

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
    return <Loader/>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        damping: 30,
        stiffness: 90
      }}
    >
      <div className="flex justify-center items-center gap-10">
        {rando % 2 == 0 ? (
          <>
            <Image src={imagePair.aiImageUrl} className="rounded-lg cursor-pointer hover:scale-105 active:scale-100" width={400} height={400} alt="AI Generated" onClick={() => handleAiPick(imagePair.aiImageUrl)} priority />
            <p style={{ margin: '0 16px', fontSize: '1.5rem' }}>or</p>
            <Image src={imagePair.realImageUrl} className="rounded-lg cursor-pointer hover:scale-105 active:scale-100" width={400} height={400} alt="Real" onClick={handleRealPick} priority />
          </>
        ) : (
          <>
            <Image src={imagePair.realImageUrl} className="rounded-lg cursor-pointer hover:scale-105 active:scale-100" width={400} height={400} alt="Real" onClick={handleRealPick} priority />
            <p style={{ margin: '0 16px', fontSize: '1.5rem' }}>or</p>
            <Image src={imagePair.aiImageUrl} className="rounded-lg cursor-pointer hover:scale-105 active:scale-100" width={400} height={400} alt="AI Generated" onClick={() => handleAiPick(imagePair.aiImageUrl)} priority />
          </>
        )}
      </div>
    </motion.div>
  );
}

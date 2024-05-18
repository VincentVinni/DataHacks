import React from 'react';

export default function Side() {
  return (
    <div className="flex items-center justify-center">
      <img src="/cat_two.png" className="w-72 h-48 mr-4" alt="Cat Two" />
      <p className="mx-4 text-2xl">or</p>
      <img src="/cat_one.jpg" className="w-72 h-72 ml-4" alt="Cat One" />
    </div>
  );
}
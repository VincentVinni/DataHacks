import Image from "next/image";
import Link from 'next/link';
import Navbar from './components/navbar';
import Side from './components/side_by_side';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col items-center" style={{ marginTop: '10vh' }}>
        <div className="flex justify-center mb-10">
          <p className="text-center font-oran text-4xl">Which of these photos is real?</p>
        </div>
        <Side />
      </div>
    </div>
  );
}
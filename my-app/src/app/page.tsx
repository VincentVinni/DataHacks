import Image from "next/image";
import Link from 'next/link';
import Navbar from '../components/ui/navbar';
import Side from './components/side_by_side';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center" style={{ marginTop: '10vh' }}>
        <div className="flex justify-center">
          <p className="text-center text-2xl mb-10">Which of these photos is real?</p>
        </div>
        <Side />
      </div>
    </div>
  );
}
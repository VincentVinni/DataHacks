import Image from "next/image";
import Link from 'next/link'
import Navbar from './components/navbar';
import Side from './components/side_by_side';

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <p>Which of these photos is real?</p>
      <Side></Side>

      
    </div>
  );
}

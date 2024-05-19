"use client"
import { RxOpenInNewWindow } from "react-icons/rx";
import Image from "next/image";
import { motion } from "framer-motion"

async function getLeaderboard() {
  const res = await fetch('http://localhost:6969/api/getLeaderboard', { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch leaderboard')
  }
  return res.json()
}

export interface Item {
  url: string;
  score_count: number;
}

export default async function Page() {
  const leaderboard: Item[] = await getLeaderboard()
  return(
    <div className="w-full md:w-1/3 mx-2 md:mx-auto my-10">
      <div className="mb-3">
        <h1 className="font-oran text-2xl">Leaderboard</h1>
        <p className="font-light text-sm">Images that fooled users the most times go here :)</p>
      </div>
      <div className="flex flex-col gap-2">
        {leaderboard.map((item, index) => (
          <motion.div
            key={index}
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.15, delay: 0.05 * index }}
          >
          <div className="border border-customWhite rounded-xl flex items-center justify-between p-2" key={index}>
            <div className="flex items-center gap-4 px-3">
              {index+1 === 1 && (<h1 className="text-sm">{index+1}st</h1>)}
              {index+1 === 2 && (<h1 className="text-sm">{index+1}nd</h1>)}
              {index+1 === 3 && (<h1 className="text-sm">{index+1}rd</h1>)}
              {index+1 > 3 && (<h1 className="text-sm">{index+1}th</h1>)}
              <Image src={item.url} alt={item.url} width={60} height={60} className="rounded-lg"></Image>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-sm font-light">score <b className="font-extrabold">{item.score_count}</b></h1>
              <a className="text-sm flex items-center gap-1 text-neutral-500 hover:text-neutral-500/80 duration-150 transition-colors" href={item.url} target="blank">view image<RxOpenInNewWindow/></a>
            </div>
          </div>
        </motion.div>
        ))}
      </div>
    </div>
  )
}
import Image from "next/image";

export default function Page() {
  return(
    <main>
      <div className="w-full md:w-2/3 mx-2 md:mx-auto my-10 py-10 flex">
        <div className="w-full md:w-1/2">
          <h1 className="font-oran text-2xl">About</h1>
          <p className="font-light mb-2 leading-6 text-sm">The idea is simple. You are presented with 2 images side by side, and you have to pick the one that is real. The images that fool y’all the most times will go on the leaderboard. Analyze them carefully, because the AI-generated ones can get quite good! </p>
          <p className="font-light mb-2 leading-6 text-sm">We came up with this project while brainstorming for a hackathon. We wanted to test the capabilities of artificial intelligence in 2024, where us humans are having more difficulty distinguishing the difference between what’s real and what’s AI-generated. AI or not? is sort of a cautionary project for y’all to be cautious, because not all the things we see online are real. </p>
          <p className="font-light leading-6 text-sm">We are Vincent and Peter, a couple of university students who have a passion for full stack development. We wanted to have some fun with this hackathon project and we hope you do too while trying it out. <a href="https://github.com/VincentVinni/DataHacks" target="_blank" className="hover:opacity-80 transition"><u>Learn more about us on Github.</u></a></p>
        </div>
        <div className="w-1/2 py-2">
          <Image
            src="https://jhjxvhhavsxmgnjbrmbn.supabase.co/storage/v1/object/public/ai-images/8.jpg"
            width={300}
            height={300}
            alt="cat"
            className="m-auto rounded-lg"
          />
          <p className="font-light text-xs text-center">believe it or not, this is an AI cat!</p>
        </div>
      </div>
    </main>
  )
}
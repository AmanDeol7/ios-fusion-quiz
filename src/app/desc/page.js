
import { BackgroundBeams } from "../components/ui/Background"
import  Image from "next/image"
const page = () => {
  return (<>
    <BackgroundBeams />
    <div className="flex  justify-between my-20 mx-40 ">
        <div className="flex flex-col gap-8 w-[40%]">
        <h1 className="text-4xl text-white">sheesh you are 20!</h1>
        <p>Sad to say but this is like the only picture we have together ig and this was like 3 years ago lmaoo </p>
        <p> Thanks for being there with me all through these years :)))))) </p>
        <p> ik we barely ever met each other irl (once a year ig haha) but uk u mean a lot to me </p>
        <p>I think for ur dumbass this much appreciation is enough chalu vamo </p>
        <p>Wish I was there to meet ya  :||</p>
        <p>have a greatttt dayyy and eat manchiga (im so jealous u get to have nice food)</p>

        <p className="text-xs"> *pretend that there is tiramisu cake song playing in the background* (idk how to add that) </p>

        </div>

    <Image src="/diya.jpg " width={300} height={700} className="rounded-xl"/>
    </div>
    </>
  )
}

export default page
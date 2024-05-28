import { TypewriterEffect } from "./ui/typewriter-effect";

export default function Header() {
  const text_1 = [
    {
      text: "Astralinium",
      className: "text-[#7369CA] font-semibold",
    },
  ];
  const text_2 = [
    {
      text: "A", 
    },
    {
      text: "database",
    },
    {
      text: "for",
    },
    {
      text: "Astralopedia.",
      className: "text-[#c382f0]",
    },
  ];

  return (
    <div className="">
      {" "}
      <div className="flex flex-col items-center justify-center h-screen">
        <TypewriterEffect words={text_1} />
        <TypewriterEffect words={text_2} />
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
          <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-full border border-none bg-[linear-gradient(110deg,#7369CA,45%,#857cd1,55%,#7369CA)] bg-[length:200%_100%] px-6 font-medium text-slate-100 transition-colors z-[1]">
            Upload Now
          </button>
        </div>
      </div>
    </div>
  );
}

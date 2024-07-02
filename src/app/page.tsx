"use client";

import transcript from "../data/transcript.json";
import audio from "../data/audio.wav";
import { useEffect, useRef, useState } from "react";

type TranscriptType = {
  speaker: "Speaker1" | "Speaker2";
  syncTime: string;
  text: string;
};

export default function Home() {
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);

  const activeIndex: number =
    transcript.findIndex((elem) => Number(elem.syncTime) > progress) - 1;

  function handleClick(time: string) {
    audioRef.current!.currentTime = Number(time);
    audioRef.current?.play();
  }

  useEffect(() => {
    if (
      ulRef.current &&
      ulRef.current.childNodes[activeIndex] instanceof HTMLElement
    ) {
      const childElement = ulRef.current.childNodes[activeIndex] as HTMLElement;
      childElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeIndex]);

  return (
    <main className="bg-gray-900 p-8 h-screen">
      <section className="flex flex-col gap-8">
        <audio
          ref={audioRef}
          className="w-full"
          src={audio}
          controls
          onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
        ></audio>
        <ul
          ref={ulRef}
          className="flex flex-col gap-4 h-[600px] overflow-y-auto"
        >
          {transcript.map((elem, index) => (
            <li
              onClick={() => handleClick(elem.syncTime)}
              className={` text-white p-4 rounded-md w-3/4 border border-1 ${
                elem.speaker == "Speaker2"
                  ? "self-end bg-gray-600"
                  : "bg-gray-700"
              } ${
                index === activeIndex
                  ? "border-red-400 border-2"
                  : " border-gray-300"
              } ${
                progress < Number(elem.syncTime) ? "opacity-50" : "opacity-100"
              }`}
              key={index}
            >
              <div className="flex flex-col gap-2">
                <div className="flex flex-row justify-between">
                  <span className="text-gray-300">{elem.speaker}</span>
                  <span className="text-gray-400">{elem.syncTime}</span>
                </div>
                <p className="text-lg">{elem.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

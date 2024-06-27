import transcript from "../data/transcript.json";
import audio from "../data/audio.wav";

type TranscriptType = {
  speaker: "Speaker1" | "Speaker2";
  syncTime: string;
  text: string;
};

export default function Home() {
  return (
    <main className="bg-gray-900 p-8">
      <section className=" flex flex-col gap-8">
        <ul className="flex flex-col gap-4">
          {transcript.map((elem, index) => (
            <li
              className={` text-white py-2 px-4 rounded-md w-3/4 ${
                elem.speaker == "Speaker2"
                  ? "self-end bg-gray-600"
                  : "bg-gray-700"
              }`}
              key={index}
            >
              {elem.text}
            </li>
          ))}
        </ul>
        <audio className="w-full" src={audio} controls></audio>
      </section>
    </main>
  );
}

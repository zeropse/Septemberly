import { useEffect, useState } from "react";
import quotes from "../data/quotes.json";

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function Quote() {
  const [q, setQ] = useState(() => pick(quotes));

  useEffect(() => {
    // nothing
  }, []);

  return (
    <div className="bg-white/2 border border-white/5 p-3 rounded-md mb-3">
      <h2 className="font-semibold">Quote of the Day</h2>
      <blockquote className="italic mt-2">“{q.text}”</blockquote>
      <div className="text-right text-sm text-gray-400">— {q.author}</div>
      <div className="mt-2">
        <button
          className="px-3 py-1 rounded-md bg-gray-700"
          onClick={() => setQ(pick(quotes))}
        >
          Refresh
        </button>
      </div>
    </div>
  );
}

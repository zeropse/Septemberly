import { useState, useEffect } from "react";
import quotes from "../data/quotes.json";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/8bit/card";
import { Button } from "./ui/8bit/button";

const STORAGE_KEY = "dailyQuote";

function getRandomQuote(exclude) {
  let newQuote;
  do {
    newQuote = quotes[Math.floor(Math.random() * quotes.length)];
  } while (quotes.length > 1 && newQuote.text === exclude?.text);
  return newQuote;
}

function todayString() {
  return new Date().toISOString().slice(0, 10);
}

function loadDailyQuote() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const today = todayString();
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.date === today && parsed?.quote) {
        return parsed.quote;
      }
    }
    const q = getRandomQuote(undefined);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ date: today, quote: q })
    );
    return q;
  } catch {
    return getRandomQuote(undefined);
  }
}

export default function Quote() {
  const [quote, setQuote] = useState(null);

  // Load only on client after mount
  useEffect(() => {
    setQuote(loadDailyQuote());
  }, []);

  const handleRefresh = () => {
    const newQ = getRandomQuote(quote);
    setQuote(newQ);
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ date: todayString(), quote: newQ })
      );
    } catch {
      /* ignore storage errors */
    }
  };

  if (!quote) {
    return (
      <Card className="mb-3">
        <CardHeader>
          <CardTitle className="font-semibold">Quote of the Day</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-500">Loading...</CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-3">
      <CardHeader>
        <CardTitle className="font-semibold">Quote of the Day</CardTitle>
      </CardHeader>

      <CardContent>
        <blockquote className="italic leading-relaxed text-gray-400">
          “{quote.text}”
        </blockquote>
        <div className="text-right mt-2 text-sm text-gray-600">
          — {quote.author}
        </div>
      </CardContent>

      <CardFooter>
        <Button
          size="sm"
          onClick={handleRefresh}
          className="w-full cursor-pointer"
        >
          Refresh
        </Button>
      </CardFooter>
    </Card>
  );
}

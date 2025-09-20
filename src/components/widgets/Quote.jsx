import { useState, useEffect } from "react";
import quotes from "@/data/quotes.json";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit/card";
import { Button } from "@/components/ui/8bit/button";
import useLocalStorage from "@/hooks/useLocalStorage";

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

export default function Quote() {
  const [quote, setQuote] = useState(null);
  const [dailyQuote, setDailyQuote] = useLocalStorage("dailyQuote", null);

  // Load daily quote
  useEffect(() => {
    const today = todayString();

    if (dailyQuote?.date === today && dailyQuote?.quote) {
      setQuote(dailyQuote.quote);
    } else {
      const newQuote = getRandomQuote(undefined);
      const newDailyQuote = { date: today, quote: newQuote };
      setDailyQuote(newDailyQuote);
      setQuote(newQuote);
    }
  }, [dailyQuote, setDailyQuote]);

  const handleRefresh = () => {
    const newQ = getRandomQuote(quote);
    const today = todayString();
    const newDailyQuote = { date: today, quote: newQ };
    setDailyQuote(newDailyQuote);
    setQuote(newQ);
  };

  if (!quote) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-semibold">Quote of the Day</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-500">Loading...</CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold">Quote of the Day</CardTitle>
      </CardHeader>

      <CardContent className="mb-10 flex flex-col justify-between min-h-[90px]">
        <div>
          <blockquote className="italic leading-relaxed text-gray-400 mb-3">
            “{quote.text}”
          </blockquote>
          <div className="text-right mt-2 text-sm text-gray-600">
            — {quote.author}
          </div>
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

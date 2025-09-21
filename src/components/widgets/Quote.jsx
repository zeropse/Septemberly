import { useEffect } from "react";
import quotes from "@/data/quotes.json";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit/card";
import { Button } from "@/components/ui/8bit/button";
import { useQuoteStore } from "@/stores/quoteStore";

export default function Quote({ className }) {
  const { quote, loadDailyQuote, refreshQuote } = useQuoteStore();

  // Load daily quote on mount
  useEffect(() => {
    loadDailyQuote(quotes);
  }, [loadDailyQuote]);

  const handleRefresh = () => {
    refreshQuote(quotes);
  };

  if (!quote) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="font-bold">Quote of the Day</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-500">Loading...</CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="font-semibold">Quote of the Day</CardTitle>
      </CardHeader>

      <CardContent className="mb-10 flex flex-col justify-between min-h-[200px]">
        <div>
          <blockquote className="italic leading-relaxed text-gray-200 mb-5">
            “{quote.text}”
          </blockquote>
          <div className="text-right mt-2 text-sm text-gray-300">
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

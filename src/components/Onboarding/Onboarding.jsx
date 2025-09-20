import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/8bit/dialog";
import { Button } from "@/components/ui/8bit/button";
import { Input } from "../ui/8bit/input";
import { Textarea } from "../ui/8bit/textarea";

const STORAGE_KEY = "Profile";

export default function Onboarding({ onFinish }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [trait, setTrait] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        setName(data.name || "");
        setTrait(data.trait || "");
        setAbout(data.about || "");
      }
    } catch {
      // ignore
    }
  }, []);

  function saveAndFinish(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn("Failed to save onboarding data", e);
    }
    onFinish?.(data);
  }

  function next() {
    if (step === 1) {
      if (!name.trim()) return; // required
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!trait) return; // required
      setStep(3);
      return;
    }

    if (step === 3) {
      const data = { name: name.trim(), trait, about };
      saveAndFinish(data);
    }
  }

  function prev() {
    setStep((s) => Math.max(1, s - 1));
  }

  function skip() {
    const data = { name: name.trim(), trait, about };
    saveAndFinish(data);
  }

  return (
    <Dialog open={true}>
      <DialogContent className="max-w-lg mx-auto">
        <div className="flex flex-col gap-4">
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-5">
                Welcome to Septemberly
              </h2>
              <p className="text-sm text-muted-foreground mt-2 mb-2">
                What's your name?
              </p>

              <Input
                className=""
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold">Choose a trait</h2>
              <p className="text-sm text-muted-foreground mt-2 mb-2">
                Pick one trait.
              </p>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  { id: "cozy", label: "Cozy" },
                  { id: "leafy", label: "Leafy" },
                  { id: "retro", label: "Retro" },
                ].map((t) => (
                  <button
                    key={t.id}
                    className={`px-3 py-2 rounded-md border ${
                      trait === t.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-background"
                    }`}
                    onClick={() => setTrait(t.id)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold">Something about you</h2>
              <p className="text-sm text-muted-foreground mt-2">
                Tell us something about yourself (optional).
              </p>

              <Textarea
                className="mt-4 w-full"
                rows={4}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="A short bio or something you like..."
              />
            </div>
          )}

          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-2">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={prev}
                  size="sm"
                  className="cursor-pointer"
                >
                  Back
                </Button>
              )}
            </div>

            <div className="flex gap-5">
              {step === 3 && (
                <Button
                  variant="secondary"
                  onClick={skip}
                  size="sm"
                  className="cursor-pointer"
                >
                  Skip
                </Button>
              )}

              <Button onClick={next} size="sm" className="cursor-pointer">
                {step === 3 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

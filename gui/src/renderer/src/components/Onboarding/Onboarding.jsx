import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/8bit/dialog";
import { Button } from "@/components/ui/8bit/button";
import { Input } from "@/components/ui/8bit/input";
import { Textarea } from "@/components/ui/8bit/textarea";
import { useAppStore } from "@/stores/appStore";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/8bit/select";

export default function Onboarding({ onFinish }) {
  const { profile, setProfile } = useAppStore();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [trait, setTrait] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setTrait(profile.trait || "");
      setAbout(profile.about || "");
    }
  }, [profile]);

  function saveAndFinish(data) {
    setProfile(data);
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

  const canProceed =
    step === 1
      ? Boolean(name.trim())
      : step === 2
      ? Boolean(trait)
      : Boolean(name.trim() && trait);

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
              <h2 className="text-xl font-semibold mb-2">Choose a trait</h2>
              <Select value={trait} onValueChange={(v) => setTrait(v)}>
                <SelectTrigger className="w-full cursor-pointer">
                  <SelectValue placeholder="Select any one." />
                </SelectTrigger>
                <SelectContent>
                  {[
                    { id: "cozy", label: "Cozy" },
                    { id: "leafy", label: "Leafy" },
                    { id: "retro", label: "Retro" },
                    { id: "crisp", label: "Crisp" },
                    { id: "golden", label: "Golden" },
                  ].map((t) => (
                    <SelectItem
                      key={t.id}
                      value={t.id}
                      className="cursor-pointer"
                    >
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                placeholder="A short bio or something about you..."
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
              <Button
                onClick={next}
                size="sm"
                disabled={!canProceed}
                className={`${
                  !canProceed
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                {step === 3 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

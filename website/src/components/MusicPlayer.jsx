import { useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/8bit/card";
import { Slider } from "@/components/ui/8bit/slider";
import useMusicStore from "@/stores/musicStore";
import tracksData from "@/data/songs";
import { Button } from "@/components/ui/8bit/button";
import {
  IconVolume,
  IconPlayerTrackNextFilled,
  IconPlayerTrackPrevFilled,
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
} from "@tabler/icons-react";

/**
 * RetroMusicPlayer
 *
 * Usage:
 * <RetroMusicPlayer tracks={[{ id: '1', src: '/audio/tune.mp3' }]} />
 *
 * Notes:
 * - Component uses an internal <audio> element and basic controls. It intentionally
 *   keeps the visual style minimal and matches the 8-bit `retro` font.
 */

export default function RetroMusicPlayer({ tracks = [], className = "" }) {
  const setTracks = useMusicStore((s) => s.setTracks);
  const playing = useMusicStore((s) => s.playing);
  const progress = useMusicStore((s) => s.progress);
  const duration = useMusicStore((s) => s.duration);
  const volume = useMusicStore((s) => s.volume);
  const next = useMusicStore((s) => s.next);
  const prev = useMusicStore((s) => s.prev);
  const setVolume = useMusicStore((s) => s.setVolume);
  const requestSeek = useMusicStore((s) => s.requestSeek);
  const togglePlaying = useMusicStore((s) => s.togglePlaying);

  // format seconds into mm:ss (or h:mm:ss if long)
  const formatTime = (secs) => {
    if (!secs && secs !== 0) return "--:--";
    const s = Math.floor(secs);
    const hours = Math.floor(s / 3600);
    const minutes = Math.floor((s % 3600) / 60);
    const seconds = s % 60;
    const pad = (n) => String(n).padStart(2, "0");
    if (hours > 0) return `${hours}:${pad(minutes)}:${pad(seconds)}`;
    return `${pad(minutes)}:${pad(seconds)}`;
  };

  // initialize tracks on first mount if not provided
  useEffect(() => {
    if (tracks && tracks.length > 0) {
      setTracks(tracks);
    } else if (tracksData && tracksData.length > 0) {
      setTracks(tracksData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className={cn("retro rounded-none p-0", className)} font="retro">
      <CardContent className="p-5 flex flex-col items-center">
        <motion.img
          src="/record.png"
          alt="Record"
          width={140}
          height={140}
          className="mb-5 rounded-full border-2 border-white"
          animate={playing ? { rotate: 360 } : { rotate: 0 }}
          transition={
            playing ? { repeat: Infinity, duration: 2, ease: "linear" } : {}
          }
          style={{ transformOrigin: "50% 50%" }}
        />

        {/* Time / duration */}
        <div className="flex items-center gap-2 text-sm mb-5">
          <span>{formatTime(progress || 0)}</span>
          <span className="opacity-60">/</span>
          <span>{formatTime(duration || 0)}</span>
        </div>

        {/* Progress slider */}
        <div className="w-full mb-5">
          <Slider
            aria-label="Seek"
            value={[progress || 0]}
            min={0}
            max={duration || 0}
            onValueChange={(v) => {
              const val = Array.isArray(v) ? v[0] : v;
              requestSeek(Number(val));
            }}
            className="cursor-pointer"
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-5 w-full mb-4">
          <Button
            onClick={prev}
            aria-label="Previous"
            className="cursor-pointer"
          >
            <IconPlayerTrackPrevFilled className="h-5 w-5" />
          </Button>

          <Button
            onClick={togglePlaying}
            aria-label={playing ? "Pause" : "Play"}
            className="cursor-pointer"
          >
            {playing ? (
              <IconPlayerPauseFilled className="h-5 w-5" />
            ) : (
              <IconPlayerPlayFilled className="h-5 w-5" />
            )}
          </Button>

          <Button onClick={next} aria-label="Next" className="cursor-pointer">
            <IconPlayerTrackNextFilled className="h-5 w-5" />
          </Button>
        </div>

        {/* Volume */}
        <div className="w-full flex items-center gap-5">
          <Button aria-label="Volume">
            <IconVolume className="h-5 w-5" />
          </Button>

          <div className="flex-1">
            <Slider
              aria-label="Volume"
              value={[volume]}
              min={0}
              max={1}
              step={0.01}
              onValueChange={(v) =>
                setVolume(Array.isArray(v) ? Number(v[0]) : Number(v))
              }
              className="w-full cursor-pointer"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

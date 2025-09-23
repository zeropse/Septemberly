import { useEffect, useRef } from "react";
import useMusicStore from "@/stores/musicStore";

export default function AudioManager() {
  const audioRef = useRef(null);

  const tracks = useMusicStore((s) => s.tracks);
  const index = useMusicStore((s) => s.index);
  const playing = useMusicStore((s) => s.playing);
  const volume = useMusicStore((s) => s.volume);

  const setProgress = useMusicStore((s) => s.setProgress);
  const setDuration = useMusicStore((s) => s.setDuration);
  const setIndex = useMusicStore((s) => s.setIndex);
  const setPlaying = useMusicStore((s) => s.setPlaying);
  const awardTrackXP = useMusicStore((s) => s.awardTrackXP);
  const seekRequest = useMusicStore((s) => s.seekRequest);
  const clearSeek = useMusicStore((s) => s.clearSeek);

  // create audio ref element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      // Award XP for listening to a full track
      awardTrackXP();
      setIndex(index + 1);
    };
    const onTime = () => setProgress(audio.currentTime || 0);

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("timeupdate", onTime);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("timeupdate", onTime);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // update src when index or tracks change
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const track = tracks[index];
    audio.src = track?.src || "";
    audio.load();
    if (playing) {
      audio.play().catch(() => setPlaying(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, tracks]);

  // control play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume ?? 1;
    if (playing) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [playing, volume, setPlaying]);

  // apply seek requests from UI
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (seekRequest == null) return;
    // clamp
    const t = Math.max(
      0,
      Math.min(Number(seekRequest) || 0, audio.duration || Infinity)
    );
    try {
      audio.currentTime = t;
    } catch {
      // ignore
    }
    // clear the request after applying it
    clearSeek();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seekRequest]);

  return <audio ref={audioRef} style={{ display: "none" }} />;
}

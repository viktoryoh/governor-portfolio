"use client";

import { useEffect, useRef, useState } from "react";
import { LoaderCircle, Pause, Play, SlidersHorizontal, Volume2, VolumeX } from "lucide-react";
import styles from "./SiteSound.module.css";

const preferenceKey = "governor-portfolio:sound";

function rememberSound(volume: number, muted: boolean) {
  try { localStorage.setItem(preferenceKey, JSON.stringify({ volume, muted })); }
  catch { /* Playback still works when browser storage is unavailable. */ }
}

export default function SiteSound() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLButtonElement>(null);
  const targetVolume = useRef(0.35);
  const fadeFrame = useRef<number | null>(null);
  const fading = useRef(false);
  const playRequest = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [pending, setPending] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [muted, setMuted] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [error, setError] = useState("");

  const stopFade = () => {
    if (fadeFrame.current !== null) cancelAnimationFrame(fadeFrame.current);
    fadeFrame.current = null;
    fading.current = false;
    if (audioRef.current) audioRef.current.volume = targetVolume.current;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const syncPreferences = () => {
      if (fading.current) return;
      setVolume(audio.volume);
      setMuted(audio.muted);
    };
    audio.addEventListener("volumechange", syncPreferences);
    let savedVolume = 0.35;
    let savedMuted = false;
    try {
      const saved = JSON.parse(localStorage.getItem(preferenceKey) ?? "null");
      if (typeof saved?.volume === "number" && Number.isFinite(saved.volume)) {
        savedVolume = Math.min(1, Math.max(0, saved.volume));
      }
      if (typeof saved?.muted === "boolean") savedMuted = saved.muted;
    } catch { /* Ignore unavailable storage or invalid saved preferences. */ }
    targetVolume.current = savedVolume;
    audio.volume = savedVolume;
    audio.muted = savedMuted;

    const pauseWhenHidden = () => { if (document.hidden) audio.pause(); };
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => {
      document.removeEventListener("visibilitychange", pauseWhenHidden);
      audio.removeEventListener("volumechange", syncPreferences);
      if (fadeFrame.current !== null) cancelAnimationFrame(fadeFrame.current);
      audio.pause();
    };
  }, []);

  useEffect(() => {
    if (!settingsOpen) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !dockRef.current?.contains(event.target)) setSettingsOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSettingsOpen(false);
        settingsRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [settingsOpen]);

  const toggleSound = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    setError("");
    const request = ++playRequest.current;
    if (pending || !audio.paused) {
      audio.pause();
      stopFade();
      setPending(false);
      return;
    }
    setPending(true);
    fading.current = true;
    audio.volume = 0;
    try {
      await audio.play();
      if (request !== playRequest.current || audio.paused) return;
      const start = performance.now();
      const fadeIn = (now: number) => {
        const progress = Math.min(1, (now - start) / 800);
        audio.volume = targetVolume.current * progress;
        if (progress < 1) fadeFrame.current = requestAnimationFrame(fadeIn);
        else { fading.current = false; fadeFrame.current = null; }
      };
      fadeFrame.current = requestAnimationFrame(fadeIn);
    } catch (cause) {
      if (request === playRequest.current) {
        stopFade();
        if (!(cause instanceof DOMException && cause.name === "AbortError")) {
          setError("Sound could not be played. Please try again.");
        }
      }
    } finally {
      if (request === playRequest.current) setPending(false);
    }
  };

  const label = pending ? "Cancel loading sound" : playing ? "Pause background sound" : "Play background sound";
  const silent = muted || volume === 0;
  return (
    <div ref={dockRef} className={styles.dock} role="group" aria-label="Background sound" data-playing={playing && !silent}>
      <audio ref={audioRef} src="/audio/cinematic.mp3" preload="none" loop
        onPlaying={() => setPlaying(true)}
        onPause={() => { stopFade(); setPlaying(false); setPending(false); }}
        onError={() => { stopFade(); setPlaying(false); setPending(false); setError("Sound could not be loaded. Please try again."); }} />
      <button type="button" className={styles.playButton} onClick={toggleSound} aria-label={label} title={label}
        aria-pressed={playing} aria-busy={pending}>
        {pending ? <LoaderCircle size={18} className={styles.loadingIcon} aria-hidden="true" /> : playing ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}
      </button>
      <span className={styles.equalizer} aria-hidden="true">{Array.from({ length: 5 }, (_, index) => <span key={index} />)}</span>
      <button ref={settingsRef} type="button" className={styles.settingsButton} aria-label="Sound settings" title="Sound settings"
        aria-expanded={settingsOpen} aria-controls="site-sound-settings" onClick={() => setSettingsOpen(!settingsOpen)}>
        <SlidersHorizontal size={16} aria-hidden="true" />
      </button>
      <div id="site-sound-settings" className={styles.settings} data-open={settingsOpen}>
        <button type="button" className={styles.muteButton} aria-label={muted ? "Unmute background sound" : "Mute background sound"}
          title={muted ? "Unmute" : "Mute"} aria-pressed={muted} onClick={() => {
            const audio = audioRef.current;
            if (!audio) return;
            stopFade();
            audio.muted = !audio.muted;
            rememberSound(targetVolume.current, audio.muted);
          }}>
          {silent ? <VolumeX size={18} aria-hidden="true" /> : <Volume2 size={18} aria-hidden="true" />}
        </button>
        <input className={styles.volume} type="range" min="0" max="1" step="0.05" value={volume}
          aria-label="Background sound volume" aria-valuetext={`${Math.round(volume * 100)} percent`} title="Volume"
          onChange={(event) => {
            const audio = audioRef.current;
            if (!audio) return;
            stopFade();
            targetVolume.current = Number(event.target.value);
            audio.volume = targetVolume.current;
            rememberSound(targetVolume.current, audio.muted);
          }} />
      </div>
      {error && <p role="alert" className={styles.error}>{error}</p>}
    </div>
  );
}

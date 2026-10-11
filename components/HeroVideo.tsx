"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let mayAutoStart = !motion.matches && !connection?.saveData;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !document.hidden && mayAutoStart) {
        mayAutoStart = false;
        void video.play().catch(() => setPlaying(false));
      } else if (!entry.isIntersecting) video.pause();
    }, { threshold: 0.25 });
    const onMotionChange = () => {
      if (motion.matches) { mayAutoStart = false; video.pause(); }
    };
    const onVisibilityChange = () => { if (document.hidden) video.pause(); };
    observer.observe(video);
    motion.addEventListener("change", onMotionChange);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      video.pause();
    };
  }, []);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => setPlaying(false));
    else video.pause();
  }

  return <div className="hero-film-card">
    <div className="hero-film-heading"><span className="film-indicator" aria-hidden="true" />OUR PURPOSE, IN MOTION<span>00:37</span></div>
    <div className="hero-film-frame">
      {unavailable ? <img src="/images/community-film-cover.webp" alt="A group gathered in conversation, with the caption: Improving human relations in an empowering and restorative way" /> : <video
        ref={videoRef} id="hero-film"
        src="/videos/community-film-cover.mp4"
        poster="/images/community-film-cover.webp"
        width={476} height={320}
        muted={muted} controls playsInline preload="none"
        aria-label="Wellspring and Watershed: our purpose, a 37-second captioned film"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onVolumeChange={() => setMuted(videoRef.current?.muted ?? true)}
        onError={() => { setUnavailable(true); setPlaying(false); }}
      />}
    </div>
    <div className="hero-film-footer">
      <p>Different perspectives.<br /><em>Shared possibilities.</em></p>
      {!unavailable ? <div className="hero-film-actions">
        <button type="button" onClick={togglePlayback} aria-controls="hero-film" aria-label={playing ? "Pause film" : "Play film"}>
          {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
          <span>{playing ? "Pause" : "Play film"}</span>
        </button>
        <button type="button" onClick={() => setMuted(!muted)} aria-controls="hero-film" aria-label={muted ? "Turn sound on" : "Mute film"}>
          {muted ? <VolumeX size={17} aria-hidden="true" /> : <Volume2 size={17} aria-hidden="true" />}
          <span>{muted ? "Sound off" : "Sound on"}</span>
        </button>
      </div> : <a className="film-download" href="/videos/community-film-cover.mp4">Open film</a>}
    </div>
  </div>;
}

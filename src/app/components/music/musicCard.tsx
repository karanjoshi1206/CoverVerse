import React, { useState, useRef, useEffect } from "react";
import { IMusic } from "@/models/music";
import { Play, Pause, Volume2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const MusicCard: React.FC<IMusic> = ({ artist, audioUrl, thumbnail, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAudioTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  const handleAudioLoaded = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }

    console.log(audioRef.current?.duration);
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      const newTime = (value[0] / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(value[0]);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  if (!audioUrl) {
    return null;
  }

  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <div className="relative aspect-square">
        <img src={thumbnail.length > 0 ? thumbnail : "/image.png"} alt={title} className="w-full h-full object-cover" />
        {/* <div className="absolute inset-0 bg-black/50 flex items-center justify-center md:opacity-0 md:hover:opacity-100 transition-opacity duration-300">
          <Button variant="secondary" size="icon" className="w-16 h-16 rounded-full" onClick={handlePlayPause}>
            {isPlaying ? <Pause size={32} /> : <Play size={32} />}
          </Button>
        </div> */}
      </div>
      <CardContent className="p-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-foreground truncate">{title}</h2>
          <p className="text-sm text-muted-foreground">{artist}</p>
        </div>
        <div className="md:hidden mb-4">
          <Button variant="outline" size="sm" className="w-full" onClick={handlePlayPause}>
            {isPlaying ? <Pause className="mr-2" size={16} /> : <Play className="mr-2" size={16} />}
            {isPlaying ? "Pause" : "Play"}
          </Button>
        </div>
        <div className="space-y-2">
          <Slider value={[progress]} max={100} step={0.1} onValueChange={handleSeek} className="w-full" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <div className="flex items-center space-x-2">
              <Volume2 size={16} />
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <audio ref={audioRef} src={audioUrl} onTimeUpdate={handleAudioTimeUpdate} onLoadedMetadata={handleAudioLoaded} onEnded={handleAudioEnded} />
    </Card>
  );
};

export default MusicCard;

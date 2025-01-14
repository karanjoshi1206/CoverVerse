"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mic, StopCircle, Upload, Trash2, Image } from "lucide-react";
import MusicCard from "../components/music/musicCard";

const CreateMusic = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | undefined>(undefined);
  const [audioURL, setAudioURL] = useState<string | undefined>(undefined);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | undefined>(undefined);
  const [isPublic, setIsPublic] = useState(true);
  const [songName, setSongName] = useState("");
  const [thumbnail, setThumbnail] = useState<string>("/placeholder-image.png");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startRecording = async () => {
    setIsRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);

    const chunks: Blob[] = [];

    recorder.ondataavailable = (event) => {
      chunks.push(event.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/webm" });
      setAudioBlob(blob);
      const url = URL.createObjectURL(blob);
      setAudioURL(url);
      setIsRecording(false);
    };

    recorder.start();
    setMediaRecorder(recorder);
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  const handleThumbnailUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  console.log(`audioBlob`, audioBlob);

  return (
    <div className="container mx-auto py-8 min-h-[100svh]">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Create New Music</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center space-x-4">
            <Button variant={isRecording ? "destructive" : "default"} size="lg" onClick={isRecording ? stopRecording : startRecording} className="w-40">
              {isRecording ? (
                <>
                  <StopCircle className="mr-2 h-4 w-4" /> Stop
                </>
              ) : (
                <>
                  <Mic className="mr-2 h-4 w-4" /> Record Audio
                </>
              )}
            </Button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="song-name">Song Name</Label>
              <Input id="song-name" placeholder="Enter song name" value={songName} onChange={(e) => setSongName(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="thumbnail">Thumbnail</Label>
              <div className="flex items-center space-x-4">
                <img src={thumbnail} alt="Thumbnail" className="w-20 h-20 object-cover rounded" />
                <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                  <Image className="mr-2 h-4 w-4" /> Upload Image
                </Button>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleThumbnailUpload} />
              </div>
            </div>
          </div>

          <div className="mt-6">
            {isRecording ? (
              <div className="bg-muted p-4 rounded-md text-center">
                <p className="text-lg font-semibold">Recording in progress...</p>
                <p className="text-sm text-muted-foreground">Your audio will appear here when you stop recording.</p>
              </div>
            ) : (
              <MusicCard audioUrl={audioURL} artist="You" thumbnail={thumbnail} title={songName || "Your New Track"} />
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch id="public" checked={isPublic} onCheckedChange={setIsPublic} />
              <Label htmlFor="public" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Make it Public
              </Label>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => {
              setAudioURL(undefined);
              setSongName("");
              setThumbnail("/placeholder-image.png");
            }}
          >
            <Trash2 className="mr-2 h-4 w-4" /> Discard
          </Button>
          <Button onClick={() => console.log("Post audio")}>
            <Upload className="mr-2 h-4 w-4" /> Post Audio
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateMusic;

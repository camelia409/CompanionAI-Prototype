'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mic, StopCircle } from 'lucide-react';

export default function VoiceSetupPage() {
  const router = useRouter();
  const [recording, setRecording] = useState(false);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [uploadedAudio, setUploadedAudio] = useState<File | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<string>('HealMate');
  const [voiceMode, setVoiceMode] = useState<'mic' | 'upload' | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number>(0);

  // Start mic
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    setAudioStream(stream);
    setRecording(true);
    setVoiceMode('mic');

    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    const source = audioContextRef.current.createMediaStreamSource(stream);
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 2048;
    source.connect(analyserRef.current);

    visualize();
  };

  // Stop mic
  const stopRecording = () => {
    if (audioStream) {
      audioStream.getTracks().forEach(track => track.stop());
    }
    setRecording(false);
    cancelAnimationFrame(animationRef.current);
  };

  // Visualize mic or uploaded audio
  const visualize = () => {
    const canvas = canvasRef.current;
    const canvasCtx = canvas?.getContext('2d');
    if (!canvas || !canvasCtx || !analyserRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyserRef.current!.getByteTimeDomainData(dataArray);

      canvasCtx.fillStyle = '#f3f4f6';
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = '#4f46e5';
      canvasCtx.beginPath();

      const sliceWidth = (canvas.width * 1.0) / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;
        if (i === 0) canvasCtx.moveTo(x, y);
        else canvasCtx.lineTo(x, y);
        x += sliceWidth;
      }

      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      canvasCtx.stroke();
    };

    draw();
  };

  // Load uploaded audio
  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedAudio(file);
    setVoiceMode('upload');

    const audio = new Audio(URL.createObjectURL(file));
    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
    const source = context.createMediaElementSource(audio);
    const analyser = context.createAnalyser();

    analyser.fftSize = 2048;
    source.connect(analyser);
    analyser.connect(context.destination);

    audioContextRef.current = context;
    analyserRef.current = analyser;

    audio.play();
    visualize();
  };

  const handleContinue = () => {
    if (!voiceMode) {
      alert('Please record with mic or upload a voice to continue.');
      return;
    }

    // Save preferences
    localStorage.setItem('selectedVoice', selectedVoice);
    localStorage.setItem('voiceMode', voiceMode);

    router.push('/onboarding/user-info');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold text-indigo-600 mb-2">Voice Setup 🎙️</h1>
      <p className="text-gray-600 text-center max-w-xl">
        Choose how you want to communicate with CompanionAI. You can speak live, upload a voice, and select your favorite voice model!
      </p>

      {/* Canvas for waveform */}
      <canvas
        ref={canvasRef}
        width={600}
        height={100}
        className="border border-gray-300 rounded shadow-md bg-gray-100"
      />

      {/* Mic controls */}
      <div className="flex items-center space-x-4">
        {!recording ? (
          <button
            onClick={startRecording}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded flex items-center space-x-2"
          >
            <Mic size={20} />
            <span>Start Mic</span>
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded flex items-center space-x-2"
          >
            <StopCircle size={20} />
            <span>Stop</span>
          </button>
        )}

        <input
          type="file"
          accept="audio/*"
          onChange={handleAudioUpload}
          className="text-sm text-gray-600"
        />
      </div>

      {/* Voice Model Selector */}
      <div className="mt-6 w-full max-w-3xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Choose Your Voice Model</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {['HealMate', 'CalmCare', 'EnergyTone'].map((voice) => (
            <button
              key={voice}
              onClick={() => setSelectedVoice(voice)}
              className={`p-4 rounded-lg border shadow-sm hover:shadow-md transition duration-200 ${
                selectedVoice === voice ? 'bg-green-100 border-green-500' : 'bg-white'
              }`}
            >
              <h3 className="text-lg font-medium">{voice}</h3>
              <p className="text-sm text-gray-600">
                {voice === 'HealMate'
                  ? 'Warm & empathetic'
                  : voice === 'CalmCare'
                  ? 'Soft & soothing'
                  : 'Energetic & motivational'}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        className="mt-8 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-lg font-medium shadow-md"
      >
        Continue →
      </button>
    </div>
  );
}

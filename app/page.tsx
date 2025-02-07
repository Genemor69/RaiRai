"use client";

import { useState, useRef } from "react";
import Image from "next/image";

const ValentineProposal = () => {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Increase "Yes" button size when "No" is clicked
  const yesButtonSize = noCount * 20 + 16;

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure?",
      "Really sure?",
      "Think again!",
      "Last chance!",
      "Surely not?",
      "You might regret this!",
      "Give it another thought!",
      "Are you absolutely certain?",
      "This could be a mistake!",
      "Have a heart!",
      "Don't be so cold!",
      "Change of heart?",
      "Wouldn't you reconsider?",
      "Is that your final answer?",
      "You're breaking my heart ;(",
    ];
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  // Make the "No" button run away after 2 clicks
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isHovering && !yesPressed && noCount >= 2) {
      const noButton = document.getElementById("noButton");
      if (!noButton) return;

      const rect = noButton.getBoundingClientRect();
      const buttonCenter = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };

      const angle = Math.atan2(e.clientY - buttonCenter.y, e.clientX - buttonCenter.x);
      const distance = 100;
      const newX = buttonCenter.x - Math.cos(angle) * distance;
      const newY = buttonCenter.y - Math.sin(angle) * distance;

      noButton.style.transform = `translate(${newX - buttonCenter.x}px, ${newY - buttonCenter.y}px)`;
    }
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/sunset.jpg')" }}>
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Background Music */}
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      {/* Main Content */}
      <div className="relative flex flex-col items-center justify-center min-h-screen text-white" onMouseMove={handleMouseMove}>
        {/* Music Button */}
        <button
          onClick={toggleMusic}
          className="absolute top-4 right-4 bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          {isPlaying ? "Pause Music 🎵" : "Play Music 🎶"}
        </button>

        <div className="text-center p-8 max-w-md">
          {yesPressed ? (
            <div className="space-y-6 animate-fade-in">
              <Image src="/me-and-rai.jpg" alt="Me and Rai" width={300} height={300} className="rounded-lg shadow-lg" />
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-pink-300">Yay! You make me happy, dearest ❤️</h2>
                <p className="text-xl">Even though we're 8433Km apart, it'll be the best.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
               <img 
                src="/your-gif.gif" 
                alt="Sailor" 
                className="mx-auto rounded-lg shadow-lg w-[300px] h-auto"
               />
              
              <h1 className="text-4xl font-bold text-pink-300 mb-8">Will you be my Valentine? 🌹</h1>
              
              {/* Buttons Row */}
              <div className="flex justify-center items-center gap-6">
                <button
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all"
                  style={{ fontSize: `${yesButtonSize}px` }}
                  onClick={() => setYesPressed(true)}
                >
                  Yes ❤️
                </button>
                <button
                  id="noButton"
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all"
                  onClick={handleNoClick}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => {
                    setIsHovering(false);
                    const noButton = document.getElementById("noButton");
                    if (noButton) noButton.style.transform = "none";
                  }}
                >
                  {getNoButtonText()}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ValentineProposal;

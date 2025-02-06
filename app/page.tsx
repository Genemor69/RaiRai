import { useState } from "react";

const ValentineProposal = () => {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Make the "Yes" button grow with each "No"
  const yesButtonSize = noCount * 20 + 16;

  const handleNoClick = () => {
    setNoCount(noCount + 1);
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

  // Make the "No" button run away from the mouse only after 2 clicks
  const handleMouseMove = (e) => {
    if (isHovering && !yesPressed && noCount >= 2) {
      const noButton = document.getElementById("noButton");
      if (!noButton) return; // Prevent errors if the button is not found

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
    <div>
      {/* Background Music */}
      <audio autoPlay loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      {/* Main Content */}
      <div 
        className="flex flex-col items-center justify-center min-h-screen bg-pink-50 relative"
        onMouseMove={handleMouseMove}
      >
        <div className="text-center p-8 max-w-md">
          {yesPressed ? (
            <div className="space-y-6 animate-fade-in">
              <img
                src="https://i.postimg.cc/RFJ2Q2J8/download.gif"
                alt="Celebration gif"
                className="mx-auto rounded-lg shadow-lg"
              />
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-pink-600">
                  Yay! You make me happy dearest ❤️
                </h2>
                <p className="text-xl text-gray-700">
                  Even though we're separated by 8433Km, it'll be the best
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <img
                src="https://i.postimg.cc/VkbsvZD7/IMG-8375.jpg"
                alt="Me and Rai"
                className="mx-auto rounded-lg shadow-lg"
              />
              <h1 className="text-4xl font-bold text-pink-600 mb-8">
                Will you be my Valentine? 🌹
              </h1>
              <div className="flex justify-center items-center gap-4 relative">
                <button
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all"
                  style={{ fontSize: `${yesButtonSize}px` }}
                  onClick={() => setYesPressed(true)}
                >
                  Yes ❤️
                </button>
                <button
                  id="noButton"
                  className={`bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all absolute ${
                    noCount >= 2 ? 'hover:cursor-pointer' : ''
                  }`}
                  onClick={handleNoClick}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => {
                    setIsHovering(false);
                    const noButton = document.getElementById("noButton");
                    if (noButton) {
                      noButton.style.transform = "none";
                    }
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

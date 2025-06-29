import React from 'react';
import { GAME_CONFIG } from '../constants/gameConfig';

const GameStatus = ({ 
  gameStatus, 
  currentNumber, 
  circles, 
  points 
}) => {
  const getStatusDisplay = () => {
    switch (gameStatus) {
      case "cleared":
        return { text: "ALL CLEARED", color: "green" };
      case "over":
        return { text: "GAME OVER", color: "red" };
      default:
        return { text: "LET'S PLAY", color: "#111" };
    }
  };

  const statusDisplay = getStatusDisplay();
  const isGameActive = gameStatus === "playing" || gameStatus === "cleared" || gameStatus === "over";

  return (
    <>
      <h2 style={{
        margin: 0,
        fontWeight: 700,
        color: statusDisplay.color
      }}>
        {statusDisplay.text}
      </h2>

      {isGameActive && (
        <div style={{
          width: GAME_CONFIG.SQUARE_SIZE,
          margin: "0px 0 0 2px",
          textAlign: "left",
          alignSelf: "flex-start",
          fontSize: 13,
          color: "#222",
          fontWeight: 500,
        }}>
        
        </div>
      )}
    </>
  );
};

export default GameStatus; 
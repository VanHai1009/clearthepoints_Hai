import React from 'react';
import { GAME_CONFIG } from '../constants/gameConfig';

const GameCircle = ({ 
  circle, 
  gameStatus, 
  onCircleClick, 
  totalPoints 
}) => {
  if (circle.removed) return null;

  const opacity = circle.fading ? 0.5 + 0.5 * (circle.fadeLeft / 3) : 1;
  const backgroundColor = circle.fading
    ? `rgba(255,87,34,${0.2 + 0.3 * (circle.fadeLeft / 3)})`
    : "rgba(255,255,255,1)";

  // Z-index: số nhỏ hơn sẽ có z-index cao hơn để hiển thị lên trên
  const zIndex = totalPoints * 2 - circle.num + 1000;

  return (
    <div
      onClick={() => onCircleClick(circle.num)}
      style={{
        position: "absolute",
        left: circle.x,
        top: circle.y,
        width: GAME_CONFIG.CIRCLE_SIZE,
        height: GAME_CONFIG.CIRCLE_SIZE,
        borderRadius: "50%",
        background: backgroundColor,
        color: "#222",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: 10,
        cursor: gameStatus === "playing" && !circle.fading ? "pointer" : "default",
        border: "1px solid #ff5722",
        userSelect: "none",
        zIndex,
        transition: "background 0.2s, opacity 0.2s",
        opacity,
        boxSizing: "border-box",
        transform: "translate3d(0,0,0)",
        willChange: circle.fading ? "opacity, background" : "auto",
      }}
    >
      <div style={{ textAlign: "center", width: "100%" }}>
        <div>{circle.num}</div>
        {circle.fading && (
          <div style={{ 
            fontSize: 10,    
            color: "#b85c3b" 
          }}>
            {circle.fadeLeft.toFixed(1)}s
          </div>
        )}
      </div>
    </div>
  );
};

export default GameCircle; 
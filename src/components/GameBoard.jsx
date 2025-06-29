import React, { useMemo } from 'react';
import { GAME_CONFIG } from '../constants/gameConfig';
import GameCircle from './GameCircle';

const GameBoard = ({ 
  circles, 
  gameStatus, 
  onCircleClick, 
  totalPoints, 
  currentNumber, 
  points, 
  circlesData 
}) => {
  // Optimized rendering with useMemo for better performance
  const renderedCircles = useMemo(() => {
    // Sort circles để số nhỏ có z-index cao hơn (hiển thị lên trên)
    const sortedCircles = [...circles].sort((a, b) => a.num - b.num);

    return sortedCircles.map(circle => (
      <GameCircle
        key={circle.num}
        circle={circle}
        gameStatus={gameStatus}
        onCircleClick={onCircleClick}
        totalPoints={totalPoints}
      />
    ));
  }, [circles, gameStatus, onCircleClick, totalPoints]);

  return (
    <>
      <div style={{
        width: GAME_CONFIG.SQUARE_SIZE,
        height: GAME_CONFIG.SQUARE_SIZE,
        border: "2px solid #222",
        // margin: "20px 0 0 0",
        position: "relative",
        background: "#fff",
        alignSelf: "center",
        // Performance optimization
        transform: "translate3d(0,0,0)",
        overflow: "hidden", // Ensure circles don't overflow
      }}>
        {renderedCircles}
      </div>
      {(gameStatus === "playing" || gameStatus === "cleared" || gameStatus === "over") && (
        <div style={{
          marginTop: 4,
          marginLeft: 2,
          fontSize: 16,
          color: "#222",
          fontWeight: 500,
        }}>
          Next: {gameStatus === "cleared" || gameStatus === "over" ? "-" : currentNumber}
          {points > 100 && circlesData && (
            <span style={{ marginLeft: 10, fontSize: 14, color: "#666" }}>
              ({circlesData.filter(c => !c.removed).length} remaining)
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default GameBoard; 
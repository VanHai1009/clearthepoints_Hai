import React from 'react';
import { GAME_CONFIG } from '../constants/gameConfig';

const GameControls = ({
  points,
  timer,
  gameStatus,
  autoPlay,

  onPointsBlur,
  onStartGame,
  onRestartGame,
  onToggleAutoPlay,
}) => {
  return (
    <div style={{ margin: "0 0 0 0" }}>
      <div style={{ marginBottom: 8 ,display: "flex",alignItems:"flex-start",gap :"80px"}}>
        <span style={{ display: "flex",alignItems:"flex-start",justifyContent:"flex-end" }}>Points:</span>
        <input
          type="number"
          value={points}
          min={GAME_CONFIG.MIN_POINTS}
          max={GAME_CONFIG.MAX_POINTS}
          disabled={gameStatus === "playing"}
          onBlur={onPointsBlur}
          style={{
            width: 80,
            marginLeft: 5,
            fontSize: 16,
            border: "1px solid #aaa",
            borderRadius: 4,
            outline: "none",
            
          }}
        />
       
      </div>

      <div style={{ marginBottom: 8 ,display: "flex",alignItems:"flex-start",gap :"93px"}}>
        <span style={{ display: "flex",alignItems:"flex-start"}}>Time:</span>
        <span style={{ fontSize: 16, marginLeft: 0 }}>
          {timer.toFixed(1)}s
        </span>
      </div>

      <div style={{ marginBottom: 10, display: "flex",alignItems:"flex-start" }}>
        <button
          onClick={gameStatus === "playing" ? onRestartGame : onStartGame}
          style={{
            display:"flex",
            alignItems:"center",
            justifyContent: "center",
            fontSize: 15,
            border: "1px solid #888",
            borderRadius: 4,
            background: "#f5f5f5",
            cursor: "pointer",
            width:"112px",
            
          }}
          onMouseEnter={(e) => e.target.style.background = "#e0e0e0"}
          onMouseLeave={(e) => e.target.style.background = "#f5f5f5"}
        >
          {gameStatus === "playing" ? "Restart" : "Play"}
        </button>

        {gameStatus === "playing" && (
          <button
            onClick={onToggleAutoPlay}
            style={{
              fontSize: 15,
              border: "1px solid #888",
              borderRadius: 4,
              background: "#f5f5f5" ,
              color: "black",
              cursor: "pointer",
              transition: "all 0.2s",
              marginLeft: 8,
              textAlign:"center"
            }}
          >
            Auto Play {autoPlay ? "ON" : "OFF"}
          </button>
        )}
      </div>
    </div>
  );
};

export default GameControls; 
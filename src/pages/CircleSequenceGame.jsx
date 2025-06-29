import React from 'react';
import { useGameLogic } from '../hooks/useGameLogic';
import GameStatus from '../components/GameStatus';
import GameControls from '../components/GameControls';
import GameBoard from '../components/GameBoard';

const CircleSequenceGame = () => {
  const {
    points,
    circles,
    currentNumber,
    gameStatus,
    timer,
    autoPlay,
    setAutoPlay,
    initializeGame,
    startGame,
    handleCircleClick,
    handlePointsChange,
    handlePointsBlur,
  } = useGameLogic();

  const handleToggleAutoPlay = () => {
    setAutoPlay(prev => !prev);
  };

  return (
    <div style={{
      width: "500px",
      margin: "40px auto",
      background: "#fff",
      padding: 30,
      borderRadius: 4,
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      fontFamily: "sans-serif",
      minHeight: 700,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    }}>
      <GameStatus 
        gameStatus={gameStatus}
        currentNumber={currentNumber}
        circles={circles}
        points={points}
      />

      <GameControls
        points={points}
        timer={timer}
        gameStatus={gameStatus}
        autoPlay={autoPlay}
        onPointsChange={handlePointsChange}
        onPointsBlur={handlePointsBlur}
        onStartGame={startGame}
        onRestartGame={initializeGame}
        onToggleAutoPlay={handleToggleAutoPlay}
      />

      <GameBoard
        circles={circles}
        gameStatus={gameStatus}
        onCircleClick={handleCircleClick}
        totalPoints={points}
        currentNumber={currentNumber}
        points={points}
        circlesData={circles}
      />

      
    </div>
  );
};

export default CircleSequenceGame; 
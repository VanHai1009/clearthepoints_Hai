import { useState, useRef, useEffect, useCallback } from 'react';
import { GAME_CONFIG, GAME_STATUS } from '../constants/gameConfig';
import { generateCircles } from '../utils/gameUtils';

export const useGameLogic = () => {
  const [points, setPoints] = useState(GAME_CONFIG.DEFAULT_POINTS);
  const [circles, setCircles] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.READY);
  const [timer, setTimer] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [fadingCircles, setFadingCircles] = useState({});
  const timerRef = useRef();
  const autoPlayRef = useRef();
  const fadeIntervalRef = useRef();

  const initializeGame = useCallback((pointsCount = points) => {
    setCircles(generateCircles(pointsCount));
    setCurrentNumber(1);
    setGameStatus(GAME_STATUS.READY);
    setTimer(0);
    setAutoPlay(false);
    setFadingCircles({});

    clearInterval(timerRef.current);
    clearTimeout(autoPlayRef.current);
    clearInterval(fadeIntervalRef.current);
  }, [points]);

  const startGame = useCallback(() => {
    const newCircles = generateCircles(points);
    setCircles(newCircles);
    setCurrentNumber(1);
    setGameStatus(GAME_STATUS.PLAYING);
    setTimer(0);
    setAutoPlay(false);
    setFadingCircles({});
  }, [points]);

  // Timer effect
  useEffect(() => {
    if (gameStatus === GAME_STATUS.PLAYING) {
      timerRef.current = setInterval(() => {
        setTimer(prevTimer => +(prevTimer + 0.1).toFixed(1));
      }, GAME_CONFIG.TIMER_INTERVAL);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [gameStatus]);

  // Fade effect
  useEffect(() => {
    if (Object.keys(fadingCircles).length === 0) return;

    fadeIntervalRef.current = setInterval(() => {
      setCircles(prevCircles =>
        prevCircles.map(circle => {
          if (circle.fading && !circle.removed) {
            const elapsed = (Date.now() - circle.fadeStart) / 1000;
            return {
              ...circle,
              fadeLeft: Math.max(0, +(3 - elapsed).toFixed(1)),
            };
          }
          return circle;
        })
      );
    }, GAME_CONFIG.TIMER_INTERVAL);

    return () => clearInterval(fadeIntervalRef.current);
  }, [fadingCircles]);

  // Auto play effect
  useEffect(() => {
    if (autoPlay && gameStatus === GAME_STATUS.PLAYING) {
      let nextNumber = currentNumber;

      autoPlayRef.current = setInterval(() => {
        const targetCircle = circles.find(c => c.num === nextNumber && !c.removed);
        if (targetCircle && gameStatus === GAME_STATUS.PLAYING) {
          handleCircleClick(targetCircle.num);
        }
        nextNumber++;
        if (nextNumber > points || gameStatus !== GAME_STATUS.PLAYING) {
          clearInterval(autoPlayRef.current);
        }
      }, GAME_CONFIG.AUTO_PLAY_INTERVAL);

      return () => clearInterval(autoPlayRef.current);
    }
  }, [autoPlay, gameStatus, circles, currentNumber, points]);

  const handleCircleClick = useCallback((clickedNumber) => {
    if (gameStatus !== GAME_STATUS.PLAYING) return;

    if (clickedNumber === currentNumber) {
      const fadeStartTime = Date.now();

      setCircles(prevCircles =>
        prevCircles.map(circle =>
          circle.num === clickedNumber
            ? { ...circle, fading: true, fadeStart: fadeStartTime, fadeLeft: 3 }
            : circle
        )
      );

      setFadingCircles(prev => ({
        ...prev,
        [clickedNumber]: { start: fadeStartTime, left: 3 },
      }));

      if (currentNumber === points) {
        setTimeout(() => setGameStatus(GAME_STATUS.CLEARED), 300);
      } else {
        setCurrentNumber(prev => prev + 1);
      }

      setTimeout(() => {
        setCircles(prevCircles =>
          prevCircles.map(circle =>
            circle.num === clickedNumber ? { ...circle, removed: true } : circle
          )
        );
        setFadingCircles(prev => {
          const updated = { ...prev };
          delete updated[clickedNumber];
          return updated;
        });
      }, GAME_CONFIG.FADE_DURATION);
    } else {
      setGameStatus(GAME_STATUS.OVER);
    }
  }, [gameStatus, currentNumber, points]);

  const handlePointsChange = useCallback((event) => {
    const value = event.target.value;
    if (value === '') {
      setPoints('');
      return;
    }
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= GAME_CONFIG.MIN_POINTS && numValue <= GAME_CONFIG.MAX_POINTS) {
      setPoints(numValue);
    }
  }, []);

  const handlePointsBlur = useCallback(() => {
    if (points === '' || isNaN(points) || points < GAME_CONFIG.MIN_POINTS) {
      setPoints(GAME_CONFIG.DEFAULT_POINTS);
    } else if (points > GAME_CONFIG.MAX_POINTS) {
      setPoints(GAME_CONFIG.MAX_POINTS);
    }
  }, [points]);

  return {
    // State
    points,
    circles,
    currentNumber,
    gameStatus,
    timer,
    autoPlay,
    fadingCircles,
    
    // Actions
    setPoints,
    setAutoPlay,
    initializeGame,
    startGame,
    handleCircleClick,
    handlePointsChange,
    handlePointsBlur,
  };
}; 
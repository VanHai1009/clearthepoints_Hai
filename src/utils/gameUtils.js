import { GAME_CONFIG } from '../constants/gameConfig';

// Random positioning system with collision detection
export const generateRandomPositions = (totalPoints) => {
  const { SQUARE_SIZE, CIRCLE_SIZE, MIN_DISTANCE } = GAME_CONFIG;
  const positions = [];
  const maxAttempts = 50000; 
  
  // Calculate minimum spacing based on density
  const area = (SQUARE_SIZE - CIRCLE_SIZE) * (SQUARE_SIZE - CIRCLE_SIZE);
  const circleArea = Math.PI * (CIRCLE_SIZE / 2) * (CIRCLE_SIZE / 2);
  const estimatedSpacing = Math.sqrt(area / totalPoints);
  const minSpacing = Math.max(MIN_DISTANCE, Math.min(CIRCLE_SIZE + MIN_DISTANCE, estimatedSpacing * 0.8));
  
  for (let i = 0; i < totalPoints; i++) {
    let attempts = 0;
    let position;
    let isValidPosition = false;
    
    while (!isValidPosition && attempts < maxAttempts) {
      // Generate random position within bounds
      position = {
        x: Math.random() * (SQUARE_SIZE - CIRCLE_SIZE - 2 * MIN_DISTANCE) + MIN_DISTANCE,
        y: Math.random() * (SQUARE_SIZE - CIRCLE_SIZE - 2 * MIN_DISTANCE) + MIN_DISTANCE
      };
      
      // Check collision with existing positions
      isValidPosition = true;
      for (const existingPos of positions) {
        const distance = Math.sqrt(
          Math.pow(position.x - existingPos.x, 2) + 
          Math.pow(position.y - existingPos.y, 2)
        );
        
        if (distance < minSpacing) {
          isValidPosition = false;
          break;
        }
      }
      
      attempts++;
    }
    
    // If we can't find a valid random position, use fallback grid
    if (!isValidPosition) {
      position = getFallbackGridPosition(i, totalPoints, positions);
    }
    
    positions.push(position);
  }
  
  return positions;
};

// Fallback grid positioning for high density
export const getFallbackGridPosition = (index, totalPoints, existingPositions) => {
  const { SQUARE_SIZE, CIRCLE_SIZE, MIN_DISTANCE } = GAME_CONFIG;
  const availableWidth = SQUARE_SIZE - CIRCLE_SIZE - 2 * MIN_DISTANCE;
  const availableHeight = SQUARE_SIZE - CIRCLE_SIZE - 2 * MIN_DISTANCE;
  
  // Calculate grid size needed
  const cols = Math.ceil(Math.sqrt(totalPoints * (availableWidth / availableHeight)));
  const rows = Math.ceil(totalPoints / cols);
  
  const spacingX = availableWidth / (cols + 1);
  const spacingY = availableHeight / (rows + 1);
  
  const row = Math.floor(index / cols);
  const col = index % cols;
  
  // Add some randomness to grid positions
  const randomOffsetX = (Math.random() - 0.5) * spacingX * 0.3;
  const randomOffsetY = (Math.random() - 0.5) * spacingY * 0.3;
  
  return {
    x: Math.max(MIN_DISTANCE, Math.min(
      MIN_DISTANCE + (col + 1) * spacingX + randomOffsetX,
      SQUARE_SIZE - CIRCLE_SIZE - MIN_DISTANCE
    )),
    y: Math.max(MIN_DISTANCE, Math.min(
      MIN_DISTANCE + (row + 1) * spacingY + randomOffsetY,
      SQUARE_SIZE - CIRCLE_SIZE - MIN_DISTANCE
    ))
  };
};

export const generateCircles = (totalPoints) => {
  if (totalPoints <= 0) return [];
  

  const positions = generateRandomPositions(totalPoints);
  
  // Create circles with numbers 1 to totalPoints
  const circles = [];
  for (let i = 0; i < totalPoints; i++) {
    const position = positions[i];
    if (position) {
      circles.push({
        num: i + 1,
        x: position.x,
        y: position.y,
        fading: false,
        removed: false,
        fadeStart: null,
        fadeLeft: 3,
      });
    }
  }
  
  return circles;
}; 
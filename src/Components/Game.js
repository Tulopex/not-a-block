import React, { useState, useCallback, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import '../Styles/Game.css';

const GRID_SIZE = 8;
const CELL_SIZE = 35; // Размер одной ячейки в пикселях

function Game() {
  const [grid, setGrid] = useState(
    Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null))
  );
  const [availableShapes, setAvailableShapes] = useState([]);
  const [shapesPlaced, setShapesPlaced] = useState(0); // Счетчик размещенных фигур
  const [hoveredShape, setHoveredShape] = useState(null);

  const getCSSColors = () => {
    const rootStyles = getComputedStyle(document.documentElement);
    const colors = [];
    for (let i = 1; i <= 8; i++) {
      colors.push(rootStyles.getPropertyValue(`--color-${i}`).trim());
    }
    return colors;
  };

  const generateShapes = useCallback(() => {
    const shapes = [
      [[1, 1, 1, 1]], // линия 4 горизонтальная
      [[1], [1], [1], [1]], // линия 4 вертикальная
      [[1, 1, 1]], // троица горизонтальная
      [[1], [1], [1]], // троица вертикальная
      [[1, 1]], // пара горизонтальная
      [[1], [1]], // пара вертикальная
      [[1, 1], [1, 0]], // угол вправо
      [[1, 1], [0, 1]], // угол влево
      [[1, 1], [1, 1]], // квадрат
      [[1, 1, 1], [1, 1, 1]], // прямоугольник 3на3
      [[1]], // одиночная ячейка
      [[1, 1, 1], [1, 0, 0], [1, 0, 0]], // угол 3на3
      [[1, 1, 1], [0, 0, 1], [0, 0, 1]], // угол 3на3
    ];

    const colors = getCSSColors();
    const newShapes = [];

    // Генерация 2 случайных фигур
    for (let i = 0; i < 2; i++) {
      const randomIndex = Math.floor(Math.random() * shapes.length);
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      newShapes.push({ shape: shapes[randomIndex], color: randomColor, id: `${Date.now()}-${i}` });
    }

    return newShapes;
  }, []);

  useEffect(() => {
    if (availableShapes.length === 0 || shapesPlaced >= 2) {
      setShapesPlaced(0);
      setAvailableShapes(generateShapes());
    }
  }, [shapesPlaced, generateShapes, availableShapes]);

  const canPlaceShape = (shape, startRow, startCol) => {
    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[i].length; j++) {
        if (shape[i][j]) {
          const targetRow = startRow + i;
          const targetCol = startCol + j;
  
          if (
            targetRow < 0 ||
            targetRow >= GRID_SIZE ||
            targetCol < 0 ||
            targetCol >= GRID_SIZE ||
            grid[targetRow][targetCol]
          ) {
            return false;
          }
        }
      }
    }
    return true;
  };
  
  const placeShape = (shape, row, col, shapeId) => {
    const newGrid = JSON.parse(JSON.stringify(grid));
  
    // Размещение фигуры на поле
    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[i].length; j++) {
        if (shape[i][j]) {
          newGrid[row + i][col + j] = 1;
        }
      }
    }
  
    // Проверка на полностью заполненные ряды и их очистка
    for (let r = 0; r < GRID_SIZE; r++) {
      if (newGrid[r].every(cell => cell === 1)) {
        // Если ряд заполнен, очищаем только его
        newGrid[r] = Array(GRID_SIZE).fill(null);
      }
    }
  
    setGrid(newGrid);
    setShapesPlaced((prev) => prev + 1);
    setAvailableShapes((prev) => prev.filter((shapeObj) => shapeObj.id !== shapeId));
  };
  
  

  const Shape = ({ shape, color, id }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'SHAPE',
      item: { shape, color, id },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    return (
      <div
        ref={drag}
        className="shape"
        style={{
          opacity: isDragging ? 0.5 : 1,
          '--shape-color': color,
          touchAction: 'none',
          cursor: 'move',
        }}
      >
        {shape.map((row, rowIndex) => (
          <div key={rowIndex} className="shape-row">
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`shape-cell ${cell ? 'filled' : ''}`}
              />
            ))}
          </div>
        ))}
      </div>
    );
  };

  const Cell = ({ row, col }) => {
    const [{ isOver, canDrop }, drop] = useDrop(() => ({
      accept: 'SHAPE',
      drop: (item, monitor) => {
        const offset = monitor.getClientOffset();
        const boardRect = document.querySelector('.board').getBoundingClientRect();
  
        if (!offset || !boardRect) return;
  
        // Вычисляем целевую ячейку
        const targetRow = Math.floor((offset.y - boardRect.top) / CELL_SIZE);
        const targetCol = Math.floor((offset.x - boardRect.left) / CELL_SIZE);
  
        if (canPlaceShape(item.shape, targetRow, targetCol)) {
          placeShape(item.shape, targetRow, targetCol, item.id);
        }
  
        setHoveredShape(null);
      },
      canDrop: (item) => canPlaceShape(item.shape, row, col),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }));
  
    return (
      <div
        ref={drop}
        onMouseOver={() => {
          setHoveredShape(hoveredShape);
        }}
        onMouseOut={() => {
          setHoveredShape(null);
        }}
        className={`cell ${grid[row][col] ? 'filled' : ''} ${
          isOver && canDrop ? 'highlighted' : ''
        }`}
      />
    );
  };

  return (
    <div className="Game">
      <div className="board">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.map((_, colIndex) => (
              <Cell key={`${rowIndex}-${colIndex}`} row={rowIndex} col={colIndex} />
            ))}
          </div>
        ))}
      </div>
      <div className="shapes">
        {availableShapes.map((shapeObj) => (
          <Shape
            key={shapeObj.id}
            shape={shapeObj.shape}
            color={shapeObj.color}
            id={shapeObj.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Game;

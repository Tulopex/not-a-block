import React, { useState, useCallback, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import '../Styles/Game.css';

const GRID_SIZE = 8;

function Game() {
  const [grid, setGrid] = useState(
    Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null))
  );
  const [availableShapes, setAvailableShapes] = useState([]);
  const [shapesPlaced, setShapesPlaced] = useState(0); // Счётчик размещённых фигур

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
      [[1, 1, 1, 1]],
      [[1], [1], [1], [1]],
      [[1, 1, 1]],
      [[1], [1], [1]],
      [[1, 1]],
      [[1], [1]],
      [[1, 1], [1, 0]],
      [[1, 1], [0, 1]],
      [[1, 1], [1, 1]],
      [[1]],
    ];

    const colors = getCSSColors();
    const newShapes = [];

    // Генерация 2 случайных фигур
    for (let i = 0; i < 2; i++) {
      const randomIndex = Math.floor(Math.random() * shapes.length);
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      newShapes.push({ shape: shapes[randomIndex], color: randomColor });
    }

    setAvailableShapes(newShapes);
  }, []);

  useEffect(() => {
    if (shapesPlaced < 2) {
      generateShapes(); // Генерация фигур только если меньше 2 фигур размещено
    }
  }, [shapesPlaced, generateShapes]);

  const canPlaceShape = (shape, row, col) => {
    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[i].length; j++) {
        if (
          shape[i][j] &&
          (row + i >= GRID_SIZE || col + j >= GRID_SIZE || grid[row + i][col + j])
        ) {
          return false;
        }
      }
    }
    return true;
  };

  const placeShape = (shape, row, col) => {
    const newGrid = JSON.parse(JSON.stringify(grid));

    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[i].length; j++) {
        if (shape[i][j]) {
          newGrid[row + i][col + j] = 1;
        }
      }
    }

    setGrid(newGrid);
    setShapesPlaced((prev) => prev + 1); // Увеличиваем счётчик размещённых фигур
  };

  const Shape = ({ shape, color }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'SHAPE',
      item: { shape, color },
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
      drop: (item) => {
        if (canPlaceShape(item.shape, row, col)) {
          placeShape(item.shape, row, col);
        } else {
          alert('Cannot place the shape here!');
        }
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
        className={`cell ${grid[row][col] ? 'filled' : ''} ${
          isOver && canDrop ? 'highlighted' : ''
        }`}
      />
    );
  };

  useEffect(() => {
    // Как только разместим 2 фигуры, сбрасываем счётчик
    if (shapesPlaced >= 2) {
      setShapesPlaced(0); // Сбрасываем счётчик после размещения двух фигур
    }
  }, [shapesPlaced]);

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
        {availableShapes.map((shapeObj, index) => (
          <Shape key={index} shape={shapeObj.shape} color={shapeObj.color} />
        ))}
      </div>
    </div>
  );
}

export default Game;

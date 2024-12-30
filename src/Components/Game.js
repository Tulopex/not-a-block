import React, { useState, useCallback, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import '../Styles/Game.css';

const GRID_SIZE = 8;

function Game() {
  const [grid, setGrid] = useState(
    Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null))
  );
  const [availableShapes, setAvailableShapes] = useState([]);
  const [shapesPlaced, setShapesPlaced] = useState(0); // Счетчик размещенных фигур

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
      newShapes.push({ shape: shapes[randomIndex], color: randomColor, id: `${Date.now()}-${i}` });
    }

    return newShapes;
  }, []);

  useEffect(() => {
    if (availableShapes.length === 0 || shapesPlaced >= 2) {
      setShapesPlaced(0);
      const shapesWithIds = generateShapes();
      setAvailableShapes(shapesWithIds);
    }
  }, [shapesPlaced, generateShapes, availableShapes]);

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

  const clearFullRowsAndColumns = (newGrid) => {
    let updatedGrid = newGrid;

    // Проверка и очистка строк
    updatedGrid = updatedGrid.filter(row => !row.every(cell => cell !== null));
    while (updatedGrid.length < GRID_SIZE) {
      updatedGrid.unshift(Array(GRID_SIZE).fill(null));
    }

    // Проверка и очистка колонок
    for (let col = 0; col < GRID_SIZE; col++) {
      let isFullColumn = true;
      for (let row = 0; row < GRID_SIZE; row++) {
        if (updatedGrid[row][col] === null) {
          isFullColumn = false;
          break;
        }
      }
      if (isFullColumn) {
        for (let row = 0; row < GRID_SIZE; row++) {
          updatedGrid[row][col] = null;
        }
      }
    }

    return updatedGrid;
  };

  const placeShape = (shape, row, col, shapeId) => {
    const newGrid = JSON.parse(JSON.stringify(grid));

    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[i].length; j++) {
        if (shape[i][j]) {
          newGrid[row + i][col + j] = 1;
        }
      }
    }

    const clearedGrid = clearFullRowsAndColumns(newGrid);
    setGrid(clearedGrid);
    setShapesPlaced((prev) => prev + 1);
    setAvailableShapes((prev) => prev.filter((shapeObj) => shapeObj.id !== shapeId));
  };

  const Shape = ({ shape, color, id }) => {
    const [{ isDragging }, drag, preview] = useDrag(() => ({
      type: 'SHAPE',
      item: { shape, color, id },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));
  
    useEffect(() => {
      // Для TouchBackend необходимо предварительно подключить preview
      preview(document.createElement('div'));
    }, [preview]);
  
    return (
      <div
        ref={drag}
        className="shape"
        style={{
          opacity: isDragging ? 0.5 : 1,
          '--shape-color': color,
          touchAction: 'none', // Отключает стандартные жесты
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
    const [{ isOver, canDrop, item }, drop] = useDrop(() => ({
      accept: 'SHAPE',
      drop: (item) => {
        if (canPlaceShape(item.shape, row, col)) {
          placeShape(item.shape, row, col, item.id);
        } else {
          alert('Cannot place the shape here!');
        }
      },
      canDrop: (item) => canPlaceShape(item.shape, row, col),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        item: monitor.getItem(),
      }),
    }));
  
    const isHighlighted = isOver && canDrop && item?.shape?.some((shapeRow, i) =>
      shapeRow.some((cell, j) => cell && row === row + i && col === col + j)
    );
  
    return (
      <div
        ref={drop}
        className={`cell ${grid[row][col] ? 'filled' : ''} ${
          isHighlighted ? 'highlighted' : ''
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

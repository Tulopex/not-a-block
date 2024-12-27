import React, { useState, useCallback, useEffect } from 'react';
import './Game.css';

function Game() {
  const GRID_SIZE = 8;

  const [grid, setGrid] = useState(
    Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null))
  );
  const [availableShapes, setAvailableShapes] = useState([]);
  const [draggedShape, setDraggedShape] = useState(null);
  const [highlightedCells, setHighlightedCells] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

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
      [[1, 1, 1, 1, 1]],
      [[1], [1], [1], [1], [1]],
      [[1, 1, 1]],
      [[1], [1], [1]],
      [[1, 1]],
      [[1], [1]],
      [[1, 1], [1, 0]],
      [[1, 1], [0, 1]],
      [[1, 1], [1, 1]],
      [[1]],
      [[0, 1, 0], [1, 1, 1]],
      [[1, 1, 1], [1, 1, 1]],
      [[1, 1, 1], [1, 0]],
      [[1, 1, 1], [1, 0, 0], [1, 0, 0]],
      [[1, 1, 1], [0, 0, 1], [0, 0, 1]],
    ];

    const colors = getCSSColors();

    const newShapes = [];
    for (let i = 0; i < 2; i++) {
      const randomIndex = Math.floor(Math.random() * shapes.length);
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      newShapes.push({ shape: shapes[randomIndex], color: randomColor });
    }

    setAvailableShapes(newShapes);
    setDraggedShape(null);
    setHighlightedCells([]);
  }, []);

  useEffect(() => {
    generateShapes();
  }, [generateShapes]);

  // Начало перетаскивания (для мышки)
  const handleDragStart = (shape) => {
    setDraggedShape(shape);
    setIsDragging(true); // Устанавливаем флаг перетаскивания
  };

  // Проверка, можно ли разместить фигуру
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

  // Подсветка поля с учётом занятых клеток
  const handleDragOver = (row, col) => {
    if (!draggedShape) return;

    const highlighted = [];
    let validPlacement = true;

    for (let i = 0; i < draggedShape.shape.length; i++) {
      for (let j = 0; j < draggedShape.shape[i].length; j++) {
        if (draggedShape.shape[i][j]) {
          const targetRow = row + i;
          const targetCol = col + j;

          if (
            targetRow >= GRID_SIZE ||
            targetCol >= GRID_SIZE ||
            grid[targetRow][targetCol] !== null
          ) {
            validPlacement = false;
          } else {
            highlighted.push([targetRow, targetCol]);
          }
        }
      }
    }

    setHighlightedCells(validPlacement ? highlighted : []);
    document.documentElement.style.setProperty('--shape-color', draggedShape.color || '#ccc');
  };

  // Размещение фигуры на поле
  const placeShape = (shape, row, col) => {
    const newGrid = JSON.parse(JSON.stringify(grid));

    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[i].length; j++) {
        if (shape[i][j]) {
          newGrid[row + i][col + j] = 1;
        }
      }
    }

    setGrid(clearCompletedRows(newGrid));

    // Удаляем только первую найденную фигуру
    const shapeIndex = availableShapes.findIndex(
      (shapeItem) => shapeItem.shape === draggedShape.shape
    );
    if (shapeIndex !== -1) {
      const updatedShapes = [...availableShapes];
      updatedShapes.splice(shapeIndex, 1);
      setAvailableShapes(updatedShapes);
    }

    setDraggedShape(null);
    setHighlightedCells([]);

    if (availableShapes.length === 1) {
      generateShapes();
    }
  };

  // Очистка завершенных рядов и колонок
  const clearCompletedRows = (grid) => {
    const newGrid = grid.map((row) =>
      row.every((cell) => cell) ? Array(GRID_SIZE).fill(null) : row
    );

    for (let col = 0; col < GRID_SIZE; col++) {
      if (newGrid.every((row) => row[col])) {
        newGrid.forEach((row) => (row[col] = null));
      }
    }

    return newGrid;
  };

  // Обработка дропа фигуры (для мышки)
  const handleDrop = (row, col) => {
    if (!draggedShape) return;

    if (canPlaceShape(draggedShape.shape, row, col)) {
      placeShape(draggedShape.shape, row, col);
    } else {
      alert('Невозможно разместить фигуру здесь!');
    }
  };

  // Обработка завершения перетаскивания на мобильных устройствах
  const handleTouchEnd = (e, row, col) => {
    e.preventDefault();
    if (isDragging) {
      if (canPlaceShape(draggedShape.shape, row, col)) {
        placeShape(draggedShape.shape, row, col);
      } else {
        alert('Невозможно разместить фигуру здесь!');
      }
      setIsDragging(false); // Сброс флага перетаскивания
    }
  };

  return (
    <div className="Game">
      <div className="board">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.map((cell, colIndex) => {
              const isHighlighted = highlightedCells.some(
                ([hRow, hCol]) => hRow === rowIndex && hCol === colIndex
              );

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`cell ${cell ? 'filled' : ''} ${isHighlighted ? 'highlighted' : ''}`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    handleDragOver(rowIndex, colIndex);
                  }}
                  onDrop={() => handleDrop(rowIndex, colIndex)}
                  onTouchEnd={(e) => handleTouchEnd(e, rowIndex, colIndex)}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="shapes">
        {availableShapes.map((shapeObj, index) => (
          <div
            key={index}
            className="shape"
            draggable
            onDragStart={() => handleDragStart(shapeObj)}
            onDragEnd={() => {
              setDraggedShape(null);
              setHighlightedCells([]);
              setIsDragging(false);
            }}
            style={{ '--shape-color': shapeObj.color }}
          >
            {shapeObj.shape.map((row, rowIndex) => (
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
        ))}
      </div>
    </div>
  );
}

export default Game;

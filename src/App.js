import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

function App() {
  const GRID_SIZE = 8;

  const [grid, setGrid] = useState(
    Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null))
  );
  const [availableShapes, setAvailableShapes] = useState([]);
  const [draggedShape, setDraggedShape] = useState(null);
  const [highlightedCells, setHighlightedCells] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const generateShapes = useCallback(() => {
    const shapes = [
      [[1, 1, 1, 1]], // Линия 4
      [[1], [1], [1], [1]], // Линия 4
      [[1, 1, 1]], // Линия 3 горизонтальная
      [[1], [1], [1]], // Линия 3 вертикальная
      [[1, 1]], // Линия 2 горизонтальная
      [[1], [1]], // Линия 2 вертикальная
      [[1, 1], [1, 0]], // Угловая
      [[1, 1], [0, 1]], // Угловая зеркальная
      [[1, 1], [1, 1]], // Квадрат 2x2
      [[1]], // Один блок
      [[0, 1, 0], [1, 1, 1]], // Верхняя часть квадрата
    ];
  
    const newShapes = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * shapes.length);
      newShapes.push(shapes[randomIndex]);
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
    let validPlacement = true; // Флаг для проверки корректности размещения

    for (let i = 0; i < draggedShape.length; i++) {
      for (let j = 0; j < draggedShape[i].length; j++) {
        if (draggedShape[i][j]) {
          const targetRow = row + i;
          const targetCol = col + j;

          // Проверка на выход за пределы сетки
          if (
            targetRow >= GRID_SIZE ||
            targetCol >= GRID_SIZE ||
            grid[targetRow][targetCol] !== null
          ) {
            validPlacement = false; // Некорректное размещение
          } else {
            highlighted.push([targetRow, targetCol]);
          }
        }
      }
    }

    // Подсвечиваем клетки только если размещение допустимо
    setHighlightedCells(validPlacement ? highlighted : []);
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
      (shapeItem) => shapeItem === draggedShape
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

    if (canPlaceShape(draggedShape, row, col)) {
      placeShape(draggedShape, row, col);
    } else {
      alert('Невозможно разместить фигуру здесь!');
    }
  };

  // Обработка завершения перетаскивания на мобильных устройствах
  const handleTouchEnd = (e, row, col) => {
    e.preventDefault();
    if (isDragging) {
      if (canPlaceShape(draggedShape, row, col)) {
        placeShape(draggedShape, row, col);
      } else {
        alert('Невозможно разместить фигуру здесь!');
      }
      setIsDragging(false); // Сброс флага перетаскивания
    }
  };

  return (
    <div className="app">
      <h1>Block Blast</h1>
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
      <h2>Available Shapes</h2>
      <div className="shapes">
        {availableShapes.map((shape, index) => (
          <div
            key={index}
            className="shape"
            draggable
            onDragStart={() => handleDragStart(shape)}
            onDragEnd={() => {
              setDraggedShape(null);
              setHighlightedCells([]);
              setIsDragging(false);
            }}
            onTouchEnd={(e) => handleTouchEnd(e, 0, 0)} // Это не важно, поскольку мы сразу обновляем состояние
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
        ))}
      </div>
    </div>
  );
}

export default App;

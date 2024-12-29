import React from 'react';
import ReactDOM from 'react-dom/client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect';
import App from './App';

// Опции для TouchBackend
const backend = isMobile
  ? TouchBackend
  : HTML5Backend;

const backendOptions = isMobile
  ? { enableMouseEvents: true, delayTouchStart: 0 }
  : {};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <DndProvider backend={backend} options={backendOptions}>
    <App />
  </DndProvider>
);

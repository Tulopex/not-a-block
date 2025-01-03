import React from 'react';
import ReactDOM from 'react-dom/client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect';

import App from './App';

import { init, initData, shareURL } from '@telegram-apps/sdk';

// Функция для вызова shareURL
export const invokeShareURL = () => {
  if (shareURL.isAvailable()) {
    shareURL(
      'https://t.me/TestgndfgnfdkBot',
      'Play TestBlock'
    );
  } else {
    console.error('shareURL недоступен в текущем окружении.');
  }
};

const initializeTelegramSDK = async () => {
  try {
    // Попытка инициализировать настоящее окружение Telegram
    console.log("Инициализация окружения Telegram");
    const [miniApp] = init();
    await miniApp.ready();

    await initData();
    console.log(`ID челока: ${initData.user().id}`);

    if (miniApp.mount.isAvailable()) {
      miniApp.mount();
      miniApp.isMounted(); // true
    }

  } catch (error) {
    // В случае ошибки инициализируем фейковое окружение
    console.log('Mock Telegram environment initialized');
  }
};

// Инициализация SDK
initializeTelegramSDK();

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

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

    await initData(miniApp);
    const user = await miniApp.getUser(
      console.log('Пользователь успешно инициализирован')
    );
    console.log(`ID: ${user.id}, First Name: ${user.first_name}`);

    if (miniApp.mount.isAvailable()) {
      miniApp.mount();
      miniApp.isMounted(); // true
    }

    root.render(
      <DndProvider backend={backend} options={backendOptions}>
        <App firstName={user.first_name} />
      </DndProvider>
    );

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

import express, { Application } from "express";
import { Telegraf } from "telegraf";
import { APP_URL, PORT, TELEGRAM_TOKEN } from "./constants";  // Импорт из твоего файла с константами

// Используем процесс для динамического порта или по умолчанию 3000
const port = process.env.PORT || 3000;
const app: Application = express();

// Настройка статических файлов (если у тебя есть папка 'static' с медиа)
app.use(express.static("static"));
app.use(express.json());

// Главный маршрут
app.get("/", (_, res) => {
  res.send("Hello World");
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Создание Telegram-бота с использованием токена (здесь заменим на переменную из твоих констант)
const bot = new Telegraf(TELEGRAM_TOKEN);

// Команда "start" для бота
bot.command("start", (ctx) => {
  return ctx.reply("Play RumVall", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Play Game",
            web_app: { url: `${APP_URL}` },
          },
        ],
      ],
    },
  });
});

// Запуск бота
bot.launch();

// Экспортируем приложение для использования на сервере
export default app;

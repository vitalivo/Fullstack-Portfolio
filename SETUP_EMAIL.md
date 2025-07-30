# Настройка Email и Telegram уведомлений

## 1. Настройка Resend для отправки email

1. Зарегистрируйся на [resend.com](https://resend.com)
2. Получи API ключ в панели управления
3. Добавь в `.env.local`:
   \`\`\`
   RESEND_API_KEY=re_your_api_key_here
   \`\`\`

## 2. Настройка Telegram бота (опционально)

1. Напиши @BotFather в Telegram
2. Создай нового бота командой `/newbot`
3. Получи токен бота
4. Узнай свой Chat ID:
   - Напиши боту любое сообщение
   - Перейди по ссылке: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Найди свой chat_id в ответе

5. Добавь в `.env.local`:
   \`\`\`
   TELEGRAM_BOT_TOKEN=your_bot_token_here
   TELEGRAM_CHAT_ID=your_chat_id_here
   \`\`\`

## 3. Альтернативные варианты

### Gmail SMTP (если не хочешь использовать Resend):
\`\`\`env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
\`\`\`

### EmailJS (клиентское решение):
1. Зарегистрируйся на [emailjs.com](https://emailjs.com)
2. Настрой email service
3. Получи Service ID, Template ID, Public Key

## 4. Тестирование

1. Заполни форму на сайте
2. Проверь:
   - Приходит ли email на твою почту
   - Приходит ли уведомление в Telegram
   - Логи в консоли разработчика
\`\`\`

**4. Обновим package.json для установки зависимостей:**

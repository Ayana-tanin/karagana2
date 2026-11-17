// Telegram Bot Configuration
// 
// INSTRUCTIONS:
// 1. Create a Telegram bot by messaging @BotFather on Telegram
// 2. Get your bot token from @BotFather
// 3. Get your chat ID by messaging @userinfobot or by using getUpdates API
// 4. Copy this file to config.js and fill in your credentials
// 5. Update app.js to import from config.js instead of hardcoded values

const TELEGRAM_CONFIG = {
    BOT_TOKEN: 'YOUR_BOT_TOKEN_HERE',
    CHAT_ID: 'YOUR_CHAT_ID_HERE'
};

// To use this config, update app.js:
// Replace: const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';
// With: const TELEGRAM_BOT_TOKEN = TELEGRAM_CONFIG.BOT_TOKEN;

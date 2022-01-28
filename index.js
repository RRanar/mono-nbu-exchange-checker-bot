const TelegramBot = require('node-telegram-bot-api')
const dotenv = require('dotenv')
const path = require('path')
dotenv.config()

const logger = require('logger').createLogger(
    path.join(__dirname, process.env.LOG_DIR, `${(new Date).toISOString()}.log`)
)

dotenv.config()

try {
    logger.info('Init TG bot token')
    const token = process.env.TG_TOKEN
    
    if (!token) {
        throw new Error('Telegram Bot token is required')
    }
    
    const bot = new TelegramBot(token, {polling: true});
    
    bot.on('message', (msg) => {
      const chatId = msg.chat.id
      logger.info(msg.from)
      bot.sendMessage(chatId, 'Received your message')
    });
} catch (e) {
    logger.error(e.message)
}
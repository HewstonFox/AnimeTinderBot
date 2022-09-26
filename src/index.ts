import * as dotenv from 'dotenv';
import { Telegraf } from 'telegraf';
import { configure } from './configuration';
import { BotContext } from './feature/bot/types';
import { attachHandlers } from './feature/bot/handlers';
import { attachMiddlewares } from './feature/bot/middlewares';
import { connectDB } from './db';
import { COMMANDS } from './feature/bot/constants';

dotenv.config();

const [port, domain = process.env.DOMAIN] = process.argv.slice(2);

const isWebhook = port && domain;

const bot = new Telegraf<BotContext>(process.env.BOT_TOKEN);

attachMiddlewares(bot);
attachHandlers(bot);

bot
  .launch({
    dropPendingUpdates: true,
    ...(isWebhook && {
      webhook: {
        domain,
        port: +port,
      },
    }),
  })
  .then(() => {
    if (isWebhook)
      console.log(`Bot started using webhook at ${domain} ${port}`);
    else console.log('Bot started using long pool');
    bot.telegram
      .setMyCommands(Object.values(COMMANDS))
      .then(() => console.log('Commands updated'));
    configure().then(() => console.log('Configuration set'));
    connectDB().then(() => console.log('DB Connected'));
  });

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

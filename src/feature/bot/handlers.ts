import { Telegraf } from 'telegraf';
import { getAnimeByIdMinRequest } from '../anime/requests';
import { BotContext } from './types';
import { listTextTemplate, startTextTemplate } from './templates';

import { Update } from 'typegram/update';
import { ACTIONS, COMMANDS } from './constants';
import { buildAnimeListMessageArgs, sendCard } from './utils';

const startHandler = async (ctx: BotContext) => {
  await ctx.reply(startTextTemplate);
  await sendCard(ctx);
};

const cardActionHandler = async (
  ctx: BotContext & { update: Update.CallbackQueryUpdate },
  next
) => {
  ctx.cardId = +ctx.update.callback_query.data.split(' ')[1];
  if (ctx.cardId !== ctx.dbUser.activeCard) return;
  await next();
  await sendCard(ctx);
};

const likeHandler = async (ctx: BotContext) => {
  const anime = await getAnimeByIdMinRequest(ctx.cardId);
  await ctx.dbUser.addAnime(anime._id, anime.name);
};

const continueHandler = async (ctx: BotContext) => {
  await sendCard(ctx, true, ctx.dbUser.activeCard);
  await ctx.deleteMessage();
};

const listHandler = async (ctx: BotContext) =>
  ctx.sendMessage(
    listTextTemplate,
    await buildAnimeListMessageArgs(ctx.dbUser.list, 0)
  );

const listPageHandler = async (
  ctx: BotContext & { update: Update.CallbackQueryUpdate }
) => {
  const args = await buildAnimeListMessageArgs(
    ctx.dbUser.list,
    +ctx.update.callback_query.data.split(' ')[1]
  );
  try {
    await ctx.editMessageText(listTextTemplate, args);
  } catch {
    await ctx.sendMessage(listTextTemplate, args);
  }
};

const previewHandler = async (
  ctx: BotContext & { update: Update.CallbackQueryUpdate }
) => {
  await sendCard(ctx, false, +ctx.update.callback_query.data.split(' ')[1]);
  await ctx.deleteMessage();
};

const animeWatchToggleHandler = async (
  ctx: BotContext & { update: Update.CallbackQueryUpdate }
) => {};

const filtersHandler = async (ctx: BotContext) => {};

export const attachHandlers = (bot: Telegraf<BotContext>) => {
  bot.start(startHandler);

  bot.action(new RegExp(`^${ACTIONS.ACTION}`), cardActionHandler);

  bot.action(new RegExp(`${ACTIONS.LIKE}$`), likeHandler);

  bot.action(ACTIONS.CONTINUE, continueHandler);

  bot.action(ACTIONS.LIST, listHandler);
  bot.command(COMMANDS.LIST.command, listHandler);
  bot.action(
    [new RegExp(`^${ACTIONS.PREV_PAGE}`), new RegExp(`^${ACTIONS.NEXT_PAGE}`)],
    listPageHandler
  );

  bot.action(ACTIONS.FILTERS, filtersHandler);
  bot.command(COMMANDS.FILTERS.command, listHandler);

  bot.action(new RegExp(`^${ACTIONS.PREVIEW}`), previewHandler);
  bot.action(
    [new RegExp(`^${ACTIONS.WATCH}`), new RegExp(`^${ACTIONS.UNWATCH}`)],
    animeWatchToggleHandler
  );
};

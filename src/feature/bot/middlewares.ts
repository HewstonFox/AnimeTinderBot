import { MiddlewareFn, Telegraf } from 'telegraf';
import { BotContext } from './types';
import { User } from '../user/models';

export const callbackAnswerMiddleware: MiddlewareFn<BotContext> = async (
  ctx,
  next
) => {
  await next();
  if (ctx.updateType === 'callback_query') await ctx.answerCbQuery();
};

export const dbUserMiddleware: MiddlewareFn<BotContext> = async (ctx, next) => {
  const _id = ctx.from.id;

  let user = await User.findById(_id);
  if (!user)
    user = await User.create({
      _id,
      fullName: `${ctx.from.first_name} ${ctx.from.last_name}`.trim(),
      username: ctx.from.username,
    });

  ctx.dbUser = user;
  await next();
};

export const attachMiddlewares = (bot: Telegraf<BotContext>) => {
  bot.use(dbUserMiddleware);
  bot.use(callbackAnswerMiddleware);
};

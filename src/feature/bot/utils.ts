import { BotContext } from './types';
import { getRandomAnimeRequest } from '../anime/requests';
import { buildAnimeCardTemplate } from './templates';
import {
  buildAnimeListControlsMarkup,
  buildCardReactionMarkup,
  buildPaginationMarkup,
  cardAdditionalButtonsMarkup,
  continueButtonMarkup,
} from './markups';
import { Anime } from '../anime/models';
import { LIST_PAGE_MAX_ITEMS } from './constants';

export const sendCard = async (
  ctx: BotContext,
  reactions: boolean = true,
  id: number = null
) => {
  const anime = await getRandomAnimeRequest(ctx.dbUser.filters, id);

  if (!reactions) {
    ctx.dbUser.activeCard = anime.id;
    await ctx.dbUser.save();
  }

  await ctx.sendPhoto(anime.preview, {
    parse_mode: 'HTML',
    caption: buildAnimeCardTemplate(anime),
    reply_markup: {
      inline_keyboard: [
        ...(reactions
          ? buildCardReactionMarkup(anime.id)
          : continueButtonMarkup),
        ...cardAdditionalButtonsMarkup,
      ],
    },
  });
};

export const buildAnimeListMessageArgs = async (
  list: number[],
  offset: number
) => ({
  reply_markup: {
    inline_keyboard: [
      ...buildAnimeListControlsMarkup(
        await Anime.find({ _id: list }).skip(offset).limit(LIST_PAGE_MAX_ITEMS),
        offset
      ),
      ...buildPaginationMarkup(
        offset === 0 ? null : offset - LIST_PAGE_MAX_ITEMS,
        (await Anime.count()) - LIST_PAGE_MAX_ITEMS >= offset
          ? offset + LIST_PAGE_MAX_ITEMS
          : null
      ),
      ...continueButtonMarkup,
    ],
  },
});

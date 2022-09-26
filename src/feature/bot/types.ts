import { Context } from 'telegraf';
import { HydratedDocument } from 'mongoose';
import { IUser } from "../user/types";

export interface BotContext extends Context {
  dbUser: HydratedDocument<IUser>;
  cardId: number;
}

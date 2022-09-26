import { model, Schema } from 'mongoose';
import { IAnimeDB } from './types';

export const AnimeItemSchema = new Schema<IAnimeDB>(
  {
    _id: Number,
    name: String,
    isWatched: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    methods: {
      async watch() {
        this.isWatched = true;
        await this.save();
      },
      async unwatch() {
        this.isWatched = false;
        await this.save();
      },
    },
  }
);

export const Anime = model<IAnimeDB>('Anime', AnimeItemSchema);

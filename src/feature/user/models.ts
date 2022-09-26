import { model, Schema } from 'mongoose';
import { IUser } from './types';
import { Anime } from '../anime/models';

const UserSchema = new Schema<IUser>(
  {
    _id: Number,
    username: String,
    fullName: String,
    activeCard: Number,
    list: [Number],
    filters: {
      genreIn: [String],
      genreNotIn: [String],
      tagIn: [String],
      tagNotIn: [String],
    },
  },
  {
    timestamps: true,
    methods: {
      async addAnime(id, name) {
        if (this.list.includes(id)) return;

        let anime = await Anime.findById(id);
        if (!anime)
          anime = await Anime.create({
            _id: id,
            name,
            isWatched: false,
          });
        this.list.push(id);
        await this.save();
        return anime;
      },
      async removeAnime(id) {
        if (!this.list.includes(id)) return;
        this.list.splice(this.list.indexOf(id), 1);
        await this.save();
      },
    },
  }
);

export const User = model<IUser>('User', UserSchema);

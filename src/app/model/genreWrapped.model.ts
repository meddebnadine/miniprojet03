import { Genre } from "./genre.model"

export class genreWrapped{
    _embedded!: { genres: Genre[] };
}
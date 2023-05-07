import { createAsyncThunkWithCustomError } from '@redux/heplers';
import { genresService } from '@services/genres.service';
import { z } from 'zod';

const getGenresPayloadSchema = z.object({
  query: z.object({ page: z.number(), limit: z.number() }),
});

const updateGenrePayloadSchema = z.object({
  dataValues: z.object({
    name: z.string(),
    price: z.string(),
    description: z.string(),
    image: z.string(),
  }),
  genreId: z.number(),
});

const deleteGenrePayloadSchema = z.object({
  genreId: z.number(),
});

type GetGenresPayload = z.infer<typeof getGenresPayloadSchema>;
type UpdateGenrePayload = z.infer<typeof updateGenrePayloadSchema>;
type DeleteGenrePayload = z.infer<typeof deleteGenrePayloadSchema>;

export const onGetGenres = createAsyncThunkWithCustomError<
  {
    genres: GenreEntity[];
    paginationOptions: ApiPagination;
  },
  GetGenresPayload
>(
  'genres',
  async payload => {
    getGenresPayloadSchema.parse(payload);
    const { query } = payload;
    const response: any = await genresService.getGenres(query);
    return {
      genres: response.genres,
      paginationOptions: response.paginationOptions,
    };
  },
  {
    defaultErrorMessage: 'Error while fetching genres',
  }
);

// export const onCreateGenre = createAsyncThunkWithCustomError(
//   'genres/create',
//   async payload => {
//     const response: any = await genresService.createGenre(payload);
//     return {
//       newGenre: response.genre,
//     };
//   },
//   {
//     defaultErrorMessage: 'Error while create genre',
//   }
// );

// export const onUpdateGenre = createAsyncThunkWithCustomError<
//   {
//     updateValues: GenreEntity;
//   },
//   UpdateGenrePayload
// >(
//   'genres/update',
//   async payload => {
//     updateGenrePayloadSchema.parse(payload);
//     const { dataValues, genreId } = payload;

//     const payloadUpdate = new FormData();
//     Object.keys(dataValues).forEach(key => {
//       payloadUpdate.append(key, (dataValues as any)[key]);
//     });
//     const response: any = await genresService.updateGenre(genreId, payloadUpdate);
//     return {
//       updateValues: response.genre,
//     };
//   },
//   {
//     defaultErrorMessage: 'Error while update genre',
//   }
// );

// export const onDeleteGenre = createAsyncThunkWithCustomError<{ genreId: number }, DeleteGenrePayload>(
//   'genres/delete',
//   async payload => {
//     deleteGenrePayloadSchema.parse(payload);
//     await genresService.deleteGenre(payload.genreId);
//     return {
//       genreId: payload.genreId,
//     };
//   },
//   {
//     defaultErrorMessage: 'Error while delete genre',
//   }
// );

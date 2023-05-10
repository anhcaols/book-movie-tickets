import { createAsyncThunkWithCustomError } from '@redux/heplers';
import { ratingsService } from '@services/ratings.service';
import { z } from 'zod';

const getRatingsPayloadSchema = z.object({
  query: z.object({ page: z.number(), limit: z.number() }),
  movieId: z.number(),
});

type GetRatingsPayload = z.infer<typeof getRatingsPayloadSchema>;

export const onGetRatings = createAsyncThunkWithCustomError<
  {
    ratings: RatingEntity[];
    paginationOptions: ApiPagination;
  },
  GetRatingsPayload
>(
  'ratings',
  async payload => {
    getRatingsPayloadSchema.parse(payload);
    const { query, movieId } = payload;
    const ratings: any = await ratingsService.getRatings(query, movieId);
    return {
      ratings: ratings.ratings,
      paginationOptions: ratings.paginationOptions,
    };
  },
  {
    defaultErrorMessage: 'Error while fetching ratings',
  }
);

export const onCreateRating = createAsyncThunkWithCustomError(
  'ratings/add',
  async (payload: any) => {
    const response: any = await ratingsService.createRating(payload);
    return {
      newRating: response.rating,
    };
  },
  {
    defaultErrorMessage: 'Error while create ratings',
  }
);

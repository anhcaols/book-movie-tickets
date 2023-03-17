import { createAsyncThunkWithCustomError } from '@redux/heplers';
import { ratingsService } from '@services/rating.service';
import { z } from 'zod';

const getRatingsPayloadSchema = z.object({
  query: z.object({ page: z.number(), limit: z.number() }),
  movieId: z.number(),
});

type GetRatingsPayload = z.infer<typeof getRatingsPayloadSchema>;

export const onGetRatings = createAsyncThunkWithCustomError<
  {
    ratings: RatingEntity[];
    ratingsPagination: ApiPagination;
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
      ratingsPagination: ratings.paginationOptions,
    };
  },
  {
    defaultErrorMessage: 'Error while fetching ratings',
  }
);

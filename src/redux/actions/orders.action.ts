import { createAsyncThunkWithCustomError } from '@redux/heplers';
import { ordersService } from '@services/orders.service';
import { z } from 'zod';

const createOrderPayloadSchema = z.object({
  user_id: z.number(),
  seats: z.array(z.number()),
  schedule_id: z.number(),
  foods: z
    .array(
      z.object({
        id: z.number(),
        quantity: z.number(),
      })
    )
    .optional(),
});

type CreateOrderPayload = z.infer<typeof createOrderPayloadSchema>;

export const onCreateOrder = createAsyncThunkWithCustomError<
  {
    newOrder: OrderByUserEntity;
  },
  CreateOrderPayload
>(
  'orders/add',
  async payload => {
    createOrderPayloadSchema.parse(payload);
    console.log(payload);
    const newOrder: any = await ordersService.createOrder(payload);
    return {
      newOrder: newOrder.order,
    };
  },
  {
    defaultErrorMessage: 'Error while fetching ratings',
  }
);

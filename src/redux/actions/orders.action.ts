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

const getOrdersPayloadSchema = z.object({
  query: z.object({ page: z.number(), limit: z.number() }),
  userId: z.union([z.string(), z.number()]),
});

const deleteOrderPayloadSchema = z.object({
  orderId: z.number(),
});

type CreateOrderPayload = z.infer<typeof createOrderPayloadSchema>;
type GetOrdersPayload = z.infer<typeof getOrdersPayloadSchema>;
type DeleteOrderPayload = z.infer<typeof deleteOrderPayloadSchema>;

export const onCreateOrder = createAsyncThunkWithCustomError<
  {
    newOrder: OrderByUserEntity;
  },
  CreateOrderPayload
>(
  'orders/add',
  async payload => {
    createOrderPayloadSchema.parse(payload);
    const newOrder: any = await ordersService.createOrder(payload);
    return {
      newOrder: newOrder.order,
    };
  },
  {
    defaultErrorMessage: 'Error while create order',
  }
);

export const onGetOrders = createAsyncThunkWithCustomError<
  {
    orders: OrderByUserEntity[];
    paginationOptions: ApiPagination;
  },
  GetOrdersPayload
>(
  'orders/get',
  async payload => {
    getOrdersPayloadSchema.parse(payload);
    const { query, userId } = payload;
    const response: any = await ordersService.getOrdersByUser(userId, query);
    return {
      orders: response.orders,
      paginationOptions: response.paginationOptions,
    };
  },
  {
    defaultErrorMessage: 'Error while fetching ratings',
  }
);

export const onDeleteOrder = createAsyncThunkWithCustomError<
  {
    orderId: number;
  },
  DeleteOrderPayload
>(
  'orders/delete',
  async payload => {
    deleteOrderPayloadSchema.parse(payload);
    await ordersService.deleteOrder(payload.orderId);
    return {
      orderId: payload.orderId,
    };
  },
  {
    defaultErrorMessage: 'Error while create order',
  }
);

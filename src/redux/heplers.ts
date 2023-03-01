import { createAsyncThunk } from '@reduxjs/toolkit';
import { z } from 'zod';

export function createAsyncThunkWithCustomError<Returned = any, ThunkArg = void>(
	typePrefix: string,
	asyncThunk: (arg: ThunkArg, thunkAPI: any) => Promise<Returned>,
	configs?: {
		defaultErrorMessage?: string;
		overrideErrorMessage?: string;
	}
) {
	return createAsyncThunk<
		Returned,
		ThunkArg,
		{
			rejectValue: {
				errorMessage: string;
			};
		}
	>(typePrefix, async (arg, thunkAPI) => {
		try {
			const result = await asyncThunk(arg, thunkAPI);
			return result;
		} catch (error: any) {
			if (error instanceof z.ZodError) {
				return thunkAPI.rejectWithValue({
					errorMessage: configs?.overrideErrorMessage || error.issues[0].message,
				});
			}

			const { defaultErrorMessage = '' } = configs || {};

			if (error?.isAxiosError) {
				return thunkAPI.rejectWithValue({
					errorMessage: configs?.overrideErrorMessage || error.response.message || defaultErrorMessage,
				});
			}

			return thunkAPI.rejectWithValue({
				errorMessage: configs?.overrideErrorMessage || defaultErrorMessage,
			});
		}
	});
}

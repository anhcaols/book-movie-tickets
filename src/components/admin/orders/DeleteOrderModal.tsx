import AppDialog from '@components/shared/app-dialog';
import { useAsync } from '@hooks/useAsync';
import { useAppDispatch } from '@hooks/useRedux';
import { LoadingButton } from '@mui/lab';
import { Box, Button } from '@mui/material';
import { onDeleteOrder } from '@redux/actions/orders.action';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';

interface DeleteOrderModalOpen {
  id: number;
  open: boolean;
  onClose: any;
}

export const DeleteOrderModal = ({ id, open, onClose }: DeleteOrderModalOpen) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = () => {
    setIsLoading(true);
    executeDelete({ orderId: id });
  };

  const [executeDelete] = useAsync<{
    orderId: number;
  }>({
    delay: 500,
    asyncFunction: async payload => dispatch(onDeleteOrder(payload)),
    onResolve: () => {
      onClose(false);
      setIsLoading(false);
      enqueueSnackbar('Xóa thành công', { variant: 'success' });
    },
    onReject: (error: any) => {
      setIsLoading(false);
      enqueueSnackbar('Xóa thất bại', { variant: 'error' });
    },
  });

  return (
    <AppDialog title="Xóa hóa đơn" open={open} onClose={() => onClose(false)}>
      <h1>Bạn có chắc chắn muốn xóa không?</h1>
      <Box className="w-full flex justify-end gap-2">
        <Button variant="outlined" size="medium" onClick={() => onClose(false)}>
          Hủy
        </Button>
        <LoadingButton onClick={handleDelete} type="submit" variant="contained" size="medium" loading={isLoading}>
          Xóa
        </LoadingButton>
      </Box>
    </AppDialog>
  );
};

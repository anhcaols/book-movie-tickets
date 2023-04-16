import AppDialog from '@components/shared/app-dialog';
import React, { useState } from 'react';

interface DeleteUserModalOpen {
  id: number;
  open: boolean;
  onClose: any;
}

export const DeleteUserModal = ({ id, open, onClose }: DeleteUserModalOpen) => {
  return (
    <AppDialog title="Delete" open={open} onClose={() => onClose(false)}>
      <h1>{id}</h1>
    </AppDialog>
  );
};

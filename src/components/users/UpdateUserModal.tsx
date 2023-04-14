import AppDialog from '@components/shared/app-dialog';
import React, { useState } from 'react';

interface UpdateUserModalOpen {
  id: number;
  open: boolean;
  onClose: any;
}

export const UpdateUserModal = ({ id, open, onClose }: UpdateUserModalOpen) => {
  console.log(id);
  return (
    <AppDialog title="Demo" open={open} onClose={() => onClose(false)}>
      <h1>dasndahscsadas[dfasf asdasd</h1>
    </AppDialog>
  );
};

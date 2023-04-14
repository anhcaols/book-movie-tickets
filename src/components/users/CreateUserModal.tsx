import AppDialog from '@components/shared/app-dialog';
import React, { useState } from 'react';

interface CreateUserModalOpen {
  open: boolean;
  onClose: any;
}

export const CreateUserModal = ({ open, onClose }: CreateUserModalOpen) => {
  return (
    <AppDialog title="Demo" open={open} onClose={() => onClose(false)}>
      <h1>dasndahscsadas[dfasf asdasd</h1>
    </AppDialog>
  );
};

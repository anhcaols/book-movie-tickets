import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { PropsWithChildren } from 'react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .css-mtk6ir-MuiPaper-root-MuiDialog-paper': {
    width: 600,
  },
  '& .css-52f9f3-MuiPaper-root-MuiDialog-paper': {
    backgroundColor: '#222b36',
  },
}));

export interface AppDialogProps extends PropsWithChildren {
  open: boolean;
  textEnter?: string;
  textCancel?: string;
  title: string;
  onClose: () => void;
  onEnter?: () => void;
  onCancel?: () => void;
}

export const AppDialog = ({
  children,
  open,
  textEnter = 'Ok',
  textCancel = 'cancel',
  title,
  onClose,
  onEnter,
  onCancel,
}: AppDialogProps) => {
  return (
    <BootstrapDialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {title}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent
        style={{
          width: '100%',
          padding: '18px 16px',
        }}
      >
        {children}
      </DialogContent>
      {(onEnter || onCancel) && (
        <DialogActions>
          {onCancel && (
            <Button autoFocus onClick={onClose}>
              {textCancel}
            </Button>
          )}
          {onEnter && (
            <Button variant="contained" onClick={onEnter}>
              {textEnter}
            </Button>
          )}
        </DialogActions>
      )}
    </BootstrapDialog>
  );
};

export default AppDialog;

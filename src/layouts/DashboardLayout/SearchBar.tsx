import React, { FC } from 'react';
import { Box, Button, InputAdornment, InputBase, Slide } from '@mui/material';

// --------------------------------------------------------
type SearchBarProps = {
  open: boolean;
  handleClose: () => void;
};
// --------------------------------------------------------

const SearchBar: FC<SearchBarProps> = ({ open, handleClose }) => {
  return (
    <Slide direction="down" in={open} mountOnEnter unmountOnExit>
      <Box
        sx={{
          gap: 2,
          left: 0,
          top: -16,
          height: 60,
          zIndex: 9999,
          boxShadow: 1,
          width: '100%',
          display: 'flex',
          padding: '0 1rem',
          borderRadius: '4px',
          alignItems: 'center',
          position: 'absolute',
          backgroundColor: 'background.paper',
        }}
      >
        <InputBase
          fullWidth
          autoFocus
          placeholder="Search..."
          startAdornment={<InputAdornment position="start"></InputAdornment>}
          sx={{ fontSize: 13, fontWeight: 500, flexGrow: 1 }}
        />

        <Button variant="contained" onClick={handleClose}>
          Search
        </Button>
      </Box>
    </Slide>
  );
};

export default SearchBar;

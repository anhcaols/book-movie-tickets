import { SearchOutlined } from '@mui/icons-material';
import { Box, InputAdornment, InputBase } from '@mui/material';
import React from 'react';

interface SearchInputProps {
  value: string;
  onChange: any;
  width: number | string;
}

const SearchInput = ({ value, onChange, width }: SearchInputProps) => {
  return (
    <Box className="flex border-[1px] border-[#ffffff1f] rounded p-2">
      <InputBase
        value={value}
        onChange={onChange}
        fullWidth
        autoFocus
        placeholder="Search..."
        startAdornment={
          <InputAdornment position="start">
            <SearchOutlined className="text-[#455a79]" fontSize="medium" />
          </InputAdornment>
        }
        sx={{ fontSize: 13, fontWeight: 500, flexGrow: 1, width }}
      />
    </Box>
  );
};

export default SearchInput;

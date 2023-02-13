/* eslint-disable @next/next/no-img-element */
import { Star } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

const Comment = () => {
  return (
    <Box mt={2}>
      <Box className="bg-[#28282d] p-4 rounded-lg">
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={2}>
            <img
              className="w-11 h-11 rounded-full"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvLXIx01O6T3s2GIG9mwecxh1yRiivBbSz1yzHpOw&s"
              alt="img"
            />
            <Box>
              <Typography color="#fff">Cao The Anh</Typography>
              <Typography fontSize={13}>14/02/2023</Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Star fontSize="small" style={{ color: '#ffc028', marginRight: 4 }} />
            <Typography color="#fff">9</Typography>
          </Box>
        </Box>
        <Box mt={3}>
          <p>Cái kết chưa sâu sắc cho lắm</p>
        </Box>
      </Box>
    </Box>
  );
};

export default Comment;

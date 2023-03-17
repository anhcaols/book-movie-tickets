/* eslint-disable @next/next/no-img-element */
import { Star } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import moment from 'moment';

interface CommentProps {
  rating: RatingEntity;
}

const Comment = ({ rating }: CommentProps) => {
  return (
    <Box mt={2}>
      <Box className="bg-[#28282d] p-4 rounded-lg">
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={2}>
            <img className="w-11 h-11 rounded-full" src={rating.user.avatar || '/assets/images/avatar.jpg'} alt="img" />
            <Box>
              <Typography color="#fff">{rating.user.fullName}</Typography>
              <Typography fontSize={13}>{moment(rating.createdAt).format('DD/MM/YYYY')}</Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Star fontSize="small" style={{ color: '#ffc028', marginRight: 4 }} />
            <Typography color="#fff">{rating.rate}</Typography>
          </Box>
        </Box>
        <Box mt={rating.content ? 3 : 0}>
          <p>{rating.content}</p>
        </Box>
      </Box>
    </Box>
  );
};

export default Comment;

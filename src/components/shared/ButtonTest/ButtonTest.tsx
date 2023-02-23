import { Button, ButtonProps, styled } from '@mui/material';

const StyledButton = styled(Button)(() => ({
  //   border: '1px solid #fff',
  //   color: '#fff',
  //   '&:hover': {
  //     borderColor: '#ff55a5 ',
  //     color: '#ff55a5 ',
  //     background: 'transparent',
  //   },
  '& .css-8l9bqd-MuiButtonBase-root-MuiButton-root': {
    background: '#fff',
  },
}));
const ButtonTest = ({ children, ...props }: ButtonProps) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};
export default ButtonTest;

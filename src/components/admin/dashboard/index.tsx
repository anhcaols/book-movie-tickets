import styled from '@emotion/styled';
import { Box, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ChartReport } from './chart-report';
import { ordersService } from '@services/orders.service';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const StyledCard = styled(Card)(() => ({
  background: '#222b36',
  border: 'none',
}));

const Dashboard = () => {
  const [revenueByMonth, setRevenueByMonth] = useState<number>(0);
  const [revenueByYear, setRevenueByYear] = useState<number>(0);
  const [tickerNumber, setTicketNumber] = useState<number>(0);
  const today = new Date();

  useEffect(() => {
    const fetchByMonth = async () => {
      const model = today.getMonth() + 1;
      const res: any = await ordersService.getReportRevenue(String(model));
      setRevenueByMonth(res.data);
    };
    fetchByMonth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchByYear = async () => {
      const model = today.getFullYear();
      const res: any = await ordersService.getReportRevenue(String(model));
      setRevenueByYear(res.data);
    };
    fetchByYear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchTicketNumber = async () => {
      const model = today.getMonth() + 1;
      const res: any = await ordersService.getTicketByMonth(String(model));
      setTicketNumber(res.data);
    };
    fetchTicketNumber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [year, setYear] = useState<any>(dayjs().format('YYYY'));
  console.log(dayjs(year).format('YYYY'));

  return (
    <>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <StyledCard sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography className="!text-xl">Số vé đặt của tháng</Typography>
                <Typography className="!text-2xl !font-semibold text-primary !mt-3">
                  {tickerNumber} vé <span className="!text-sm !font-semibold text-text !mt-3">+ 2.2 %</span>
                </Typography>
                <Typography className="!text-xs !mt-1 italic">so với tháng trước</Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledCard sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography className="!text-xl">Tổng thu nhập năm</Typography>
                <Typography className="!text-2xl !font-semibold text-primary !mt-3">
                  {revenueByYear.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}{' '}
                  <span className="!text-sm !font-semibold text-text !mt-3">+ 3.1 %</span>
                </Typography>
                <Typography className="!text-xs !mt-1 italic">so với năm trước</Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledCard sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography className="!text-xl">Tổng thu nhập tháng</Typography>
                <Typography className="!text-2xl !font-semibold text-primary !mt-3">
                  {revenueByMonth.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}{' '}
                  <span className="!text-sm !font-semibold text-text !mt-3">+ 2 %</span>
                </Typography>
                <Typography className="!text-xs !mt-1 italic">so với tháng trước</Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>
      </Box>
      <Box mt={3}>
        <Grid container>
          <Grid item xs={12} lg={8}>
            <StyledCard>
              <CardContent>
                <Box className="float-right mb-2">
                  <DatePicker
                    views={['year']}
                    disableFuture={true}
                    value={year}
                    onChange={(date: any) => setYear(date)}
                    renderInput={(inputProps: any) => (
                      <TextField
                        sx={{ width: 120 }}
                        size="small"
                        views={['year']}
                        {...inputProps}
                        label="Năm"
                        fullWidth
                      />
                    )}
                  />
                </Box>
                <ChartReport year={dayjs(year).format('YYYY')} />
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;

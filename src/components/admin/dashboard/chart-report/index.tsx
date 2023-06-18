import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ordersService } from '@services/orders.service';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

const labels = [
  'Tháng 1',
  'Tháng 2',
  'Tháng 3',
  'Tháng 4',
  'Tháng 5',
  'Tháng 6',
  'Tháng 7',
  'Tháng 8',
  'Tháng 9',
  'Tháng 10',
  'Tháng 11',
  'Tháng 12',
];

export const ChartReport = ({ year }: { year: any }) => {
  const [monthlyRevenue, setMonthlyRevenue] = useState<number[]>([]);
  useEffect(() => {
    const fetchRevenueByMonth = async () => {
      const res: any = await ordersService.getRevenueByMonth(year);
      const data = res.data.map((item: { month: number; total: number }) => item.total);
      setMonthlyRevenue(data);
    };
    fetchRevenueByMonth();
  }, [year]);

  const data = {
    labels,
    datasets: [
      {
        label: 'Doanh thu theo năm',
        data: monthlyRevenue,
        backgroundColor: 'rgba(255, 85, 165, 0.5)',
      },
    ],
  };
  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
};

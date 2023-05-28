import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';

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
  'January',
  'February',
  'March',
  'April',
  'May',
  // 'June',
  // 'July',
  // 'August',
  // 'September',
  // 'October',
  // 'November',
  // 'December',
];

export const data = {
  labels,
  datasets: [
    {
      label: 'Doanh thu của năm',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      backgroundColor: 'rgba(255, 85, 165, 0.5)',
    },
  ],
};

export const ChartReport = () => {
  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
};

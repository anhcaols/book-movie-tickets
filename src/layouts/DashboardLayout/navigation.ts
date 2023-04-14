import {
  Dashboard,
  LiveTv,
  Group,
  Chair,
  Fastfood,
  Receipt,
  Grade,
  DateRange,
  MapsHomeWork,
} from '@mui/icons-material';

export const navigations = [
  {
    name: 'Trang chủ',
    path: '/admin',
    icon: Dashboard,
  },
  {
    name: 'Tài khoản',
    path: '/admin/accounts',
    icon: Group,
  },

  {
    name: 'Phim',
    icon: LiveTv,
    children: [
      {
        name: 'Tất cả phim',
        path: '/admin/movies',
      },
      {
        name: 'Thể loại phim',
        path: '/admin/movies/genre',
      },
      {
        name: 'Đánh giá phim',
        path: '/admin/movies/rating',
      },
    ],
  },

  {
    name: 'Lịch trình',
    path: '/schedules',
    icon: DateRange,
  },

  {
    name: 'Ghế',
    icon: Chair,
    children: [
      { name: 'Tất cả ghế', path: '/admin/seats' },
      { name: 'Trạng thái ghế', path: '/admin/status-seats' },
      { name: 'Loại ghế', path: '/admin/seat-types' },
    ],
  },

  {
    name: 'Rạp',
    icon: MapsHomeWork,
    children: [
      {
        name: 'Tất cả rạp',
        path: '/admin/cinemas',
      },
      {
        name: 'Phòng chiếu',
        path: '/admin/rooms',
      },
    ],
  },

  {
    name: 'Hóa đơn',
    path: '/admin/orders',
    icon: Receipt,
    children: [
      {
        name: 'Tất cả hóa đơn',
        path: '/admin/foods',
      },
      {
        name: 'Vé phim',
        path: '',
      },
      {
        name: 'Đồ ăn',
        path: '/admin/foods',
      },
    ],
  },
];

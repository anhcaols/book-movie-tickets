interface AccountEntity {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: Date | string;
  avatar: string;
  role: string;
}

interface MovieEntity {
  id: number;
  name: string;
  description: string;
  releaseDate: Date | string;
  duration: number;
  actor: string;
  director: string;
  language: string;
  country: string;
  producer: string;
  status: number;
  age: number;
  image: string;
  trailer: string;
  genres: string[];
  slug: string;
  scoreRate: number;
}

interface RatingEntity {
  id: number;
  rate: number;
  movieId: number;
  user: {
    id: number;
    fullName: string;
    avatar: string;
    email: string;
    role: string;
  };
  content: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface ScheduleEntity {
  movieId: number;
  room: {
    id: number;
    roomName: string;
    cinemaName: string;
    cinemaAddress: string;
  };
  showTimes: {
    id: number;
    startTime: Date | string;
  }[];
}

interface StatusSeatEntity {
  id: number;
  seatId: number;
  schedule: {
    id: number;
    movie: {
      id: number;
      name: string;
    };
    showTime: Date | string;
  };
  room: {
    id: number;
    name: string;
  };
  rowPosition: number;
  columnPosition: number;
  status: string;
  seatType: string;
  price: number;
}

interface FoodEntity {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface OrderByUserEntity {
  id: number;
  user: {
    id: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    role: string;
  };
  orderDate: string;
  totalMount: number;
}

interface CinemaEntity {
  id: number;
  name: string;
  address: string;
}

interface RoomEntity {
  id: number;
  name: string;
  rowNumber: number;
  columnNumber: number;
  cinema: Pick<CinemaEntity>;
}

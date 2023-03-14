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

interface MoviesEntity {
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
  image: string;
  trailer: string;
  genres: string[];
  slug: string;
}

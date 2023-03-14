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
}

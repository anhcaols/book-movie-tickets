interface ApiPagination {
  totalDocs: number;
  offset: number;
  limit: number;
  totalPages: number;
  page: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

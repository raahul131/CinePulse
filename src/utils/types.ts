// types.ts
export interface Video {
  id?: number | undefined;
  key?: string;
  name?: string;
  official?: boolean;
  published_at?: string;
  site?: string;
  size?: number;
  type?: string;
  title?: string;
  release_date: string;
  first_air_date: string;
  vote_average: number;
  genre_ids: [];
  backdrop_path?: string;
  poster_path?: string;
  overview?: string
}

export interface CastMember {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string | null;
}

export interface CrewMember {
  adult: boolean;
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
}

export interface CarouselItem {
  backdrop_path?: string;
  original_title?: string;
  id?: string | number;
  poster_path?: string;
  overview?: string;
  popularity?: number;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number | undefined;
  vote_count?: number;
  genre_ids?: number[] | undefined;
  media_type?: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface FetchResponse {
  id: number;
  name?: string;
  title?: string;
  poster_path?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  genre_ids: number[];
  backdrop_path?: string;
  tagline?: string;
  overview?: string;
  status?: string;
  runtime?: number;
  genres?: Genre[];
  created_by?: {
    id: number;
    credit_id: string;
    name: string;
    original_name: string;
    gender: number;
    profile_path?: string;
  }[];
  crew?: CrewMember[];
  cast?: CastMember[];
  results?: Video[];
  result?: CarouselItem[];
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface ApiConfigResponse {
  images: {
    secure_base_url: string;
  };
}

export interface GenreApiResponse {
  genres: Genre[];
}

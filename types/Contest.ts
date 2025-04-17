export type Contest = {
  contest_id: string;
  contest_name: string;
  location: string;
  start_date: string;
  end_date?: string;
  categories: string;

  thumbnail_url?: string;
  federation?: string;
};

export type ContestsPOST = {
  contest_url: string;
  location_url: string;
  contest_name: string;
  categories: string;
  start_date: string;

  end_date?: string;
  thumbnail_url?: string;
  contact?: string;
  federation?: string;
};

export type ContestsGET = {
  contest_id: string;
  contest_url: string;
  contest_name: string;
  location_url: string;
  location: string;
  start_date: string;
  categories: string;
  created_at: string;
  is_approved: boolean;

  end_date?: string;
  thumbnail_url?: string;
  contact?: string;
  federation?: string;
};

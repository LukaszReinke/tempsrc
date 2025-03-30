export type Contest = {
  contest_id: string;
  contest_name: string;
  location: string;
  start_date: string;
  end_date: string;
  category: string[];

  thumbnail_url?: string;
  federation?: string;
};

// TODO: fix type on deploy
export type DetailedContest = Contest & {
  // FIXME: extend type correctly
  contest_url: string;
};

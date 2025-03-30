export type Workshop = {
  workshop_id: string;
  workshop_topic: string;
  coaches: string;
  organizer: string;
  start_date: string;
  end_date: string;
  location: string;

  thumbnail_url?: string | null;
  participation_condition?: string;
};

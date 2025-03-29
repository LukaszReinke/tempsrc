export type Workshop = {
  workshop_id: string;
  workshop_topic: string;
  coaches: string;
  organizer: string;
  start_date: string;
  end_date: string;
  location: string;
  is_approved: boolean | string;
  thumbnail_url?: string | null;
  attendance_limitation: string;
  participation_condition?: string;
  category: string[];
  workshop_url: string;
};

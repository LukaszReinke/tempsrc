
export type Workshop = {
  workshop_id: string;
  workshop_topic: string;
  coaches: string;
  organizer: string;
  start_date: string;
  end_date: string;
  location: string;
  attendance_limitation: string;
  category: string;
  workshop_url: string;
  thumbnail_url: string;
  participation_condition: string;
  
  is_approved: boolean | string;
};

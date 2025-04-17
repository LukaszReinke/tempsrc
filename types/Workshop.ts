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

export type WorkshopPOST = {
  workshop_url: string;
  workshop_topic: string;
  location_url: string;
  coaches: string;
  start_date: string;

  end_date?: string;
  organizer?: string;
  thumbnail_url?: string;
  participation_condition?: string;
  contact?: string;
};

export type WorkshopsGET = {
  workshop_id: string;
  workshop_url: string;
  workshop_topic: string;
  coaches: string;
  organizer: string;
  location_url: string;
  location: string;
  start_date: string;
  end_date: string;
  created_at: string;
  is_approved: boolean;

  thumbnail_url?: string;
  participation_condition?: string;
  contact?: string;
};

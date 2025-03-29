import { Workshop } from "@hd/types/Workshop";

export const exampleWorkshops: Workshop[] = [
  {
    workshop_id: "1",
    is_approved: true,
    thumbnail_url: "asd.jpg",
    workshop_topic: "React w praktyce",
    coaches: "Jan Nowak",
    organizer: "Koło Informatyczne PW",
    start_date: "15.04.2025",
    end_date: "17.04.2025",
    location: "Warszawa",
    attendance_limitation: "50",
    category: ["Matematyka", "Liceum"],
    participation_condition: "Tylko dla członków koła naukowego",
    workshop_url: "https://zmagania.info"
  },
  {
    workshop_id: "2",
    is_approved: true,
    thumbnail_url: "asd.jpg",
    workshop_topic: "Warsztat AI z Pythona",
    coaches: "Anna Kowalska",
    organizer: "Politechnika Krakowska",
    start_date: "11.05.2025",
    end_date: "12.05.2025",
    location: "Kraków",
    attendance_limitation: "30",
    category: ["Matematyka", "Liceum"],
    participation_condition: "Tylko dla członków koła naukowego",
    workshop_url: "https://zmagania.info"
  }
];

import { DetailedContest } from "@hd/types/Contest";

export const exampleContests: DetailedContest[] = [
  {
    contest_id: "1",
    is_approved: true,
    thumbnail_url: "asd.jpg",
    contest_name: "Matematyczny Maraton",
    contest_url: "https://maraton.edu.pl",
    start_date: "10.04.2025",
    end_date: "12.04.2025",
    location: "Warszawa",
    contact: "kontakt@maraton.edu.pl",
    category: "Matematyka, Liceum"
  },
  {
    contest_id: "2",
    is_approved: true,
    thumbnail_url: "asd.jpg",
    contest_name: "Informatyczne Zmagania",
    contest_url: "https://zmagania.info",
    start_date: "05.05.2025",
    end_date: "07.05.2025",
    location: "Kraków",
    contact: "zgloszenia@zmagania.info",
    category: "Informatyka, Technikum"
  }
];

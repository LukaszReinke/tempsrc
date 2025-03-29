import { Contest } from '@hd/types';

const categories = ['Pole Dance', 'Exotic Pole', 'Sport Pole', 'Pole Art', 'Aerial Dance'];

export const CONTESTS: Contest[] = Array.from({ length: 20 }, (_, i) => {
  const category = categories[i % categories.length];
  return {
    contest_id: `contest_${i + 1}`,
    contest_url: `https://example.com/contest/${i + 1}`,
    contest_name: `${category} Championship ${i + 1}`,
    location: `City ${i + 1}, Country ${(i % 5) + 1}`,
    start_date: `27.06.2025`,
    end_date: `27.06.2025`,
    category: [category],
    federation: i === 1 ? 'POSA' : undefined,
    thumbnail_url: `https://i0.wp.com/www.posaworld.org/wp-content/uploads/2023/03/posa-euro2023.jpg?resize=750%2C750&ssl=1`,
  };
});

import { Timeline, TimelineItemStatus } from '@hd/types';

export const getTimelineItemStatus = (entityType: Timeline, itemId: string): TimelineItemStatus => {
  const storageKey = `${entityType}_statuses`;
  const storedData = localStorage.getItem(storageKey);
  const statuses: Record<string, TimelineItemStatus> = storedData ? JSON.parse(storedData) : {};
  return statuses[itemId] || null;
};

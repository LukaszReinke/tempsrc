import { TIMELINE_ITEM_STATUS } from '@hd/consts/TimelineItemStatus';
import { TimelineItemStatus } from '@hd/types';

export const toggleTimelineItemStatus = (
  entityType: string,
  itemId: string,
): TimelineItemStatus | null => {
  const storageKey = `${entityType}_statuses`;

  const storedData = localStorage.getItem(storageKey);
  const statuses: Record<string, TimelineItemStatus> = storedData ? JSON.parse(storedData) : {};

  const currentStatus = statuses[itemId] || null;

  let newStatus: TimelineItemStatus;
  if (currentStatus === null) {
    newStatus = TIMELINE_ITEM_STATUS.FOLLOWED;
  } else if (currentStatus === TIMELINE_ITEM_STATUS.FOLLOWED) {
    newStatus = TIMELINE_ITEM_STATUS.UNFOLLOWED;
  } else {
    newStatus = null;
  }

  if (newStatus === null) {
    delete statuses[itemId];
  } else {
    statuses[itemId] = newStatus;
  }

  localStorage.setItem(storageKey, JSON.stringify(statuses));

  return newStatus;
};

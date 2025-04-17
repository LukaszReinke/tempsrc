'use client';

import { useState, useCallback } from 'react';
import { TIMELINE_ITEM_STATUS } from '@hd/consts/Timeline';
import { Timeline as TimelineType, TimelineItemStatus } from '@hd/types';

export const useTimelineStatus = (entityType: TimelineType) => {
  const storageKey = `${entityType}_statuses`;

  const getInitialStatuses = (): Record<string, TimelineItemStatus> => {
    try {
      const storedData = localStorage.getItem(storageKey);
      return storedData ? JSON.parse(storedData) : {};
    } catch {
      return {};
    }
  };

  const [statusState, setStatusState] =
    useState<Record<string, TimelineItemStatus>>(getInitialStatuses());

  const getStatus = useCallback(
    (itemId: string): TimelineItemStatus => {
      return statusState[itemId] || null;
    },
    [statusState],
  );

  const toggleStatus = useCallback(
    (itemId: string): TimelineItemStatus | null => {
      const currentStatus = statusState[itemId] || null;

      let newStatus: TimelineItemStatus;
      if (currentStatus === null) {
        newStatus = TIMELINE_ITEM_STATUS.FOLLOWED;
      } else if (currentStatus === TIMELINE_ITEM_STATUS.FOLLOWED) {
        newStatus = TIMELINE_ITEM_STATUS.UNFOLLOWED;
      } else {
        newStatus = null;
      }

      const updatedStatusState = { ...statusState };
      if (newStatus === null) {
        delete updatedStatusState[itemId];
      } else {
        updatedStatusState[itemId] = newStatus;
      }

      localStorage.setItem(storageKey, JSON.stringify(updatedStatusState));
      setStatusState(updatedStatusState);

      return newStatus;
    },
    [statusState, storageKey],
  );

  return {
    statusState,
    getStatus,
    toggleStatus,
  };
};

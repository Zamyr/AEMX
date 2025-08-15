import { useState } from 'react';

export type TabType = 'flightNumber' | 'destination';

export const usePanelViewModel = () => {
  const [selectedTab, setSelectedTab] = useState<TabType>('flightNumber');

  const selectTab = (tab: TabType) => {
    setSelectedTab(tab);
  };

  const isTabSelected = (tab: TabType) => selectedTab === tab;

  return {
    selectedTab,
    selectTab,
    isTabSelected,
  };
};

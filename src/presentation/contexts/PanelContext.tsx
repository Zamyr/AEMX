import React, { createContext, useContext, useState, ReactNode } from 'react';

export type TabType = 'flightNumber' | 'destination';

interface PanelContextType {
  selectedTab: TabType;
  selectTab: (tab: TabType) => void;
  isTabSelected: (tab: TabType) => boolean;
}

const PanelContext = createContext<PanelContextType | undefined>(undefined);

interface PanelProviderProps {
  children: ReactNode;
}

export const PanelProvider: React.FC<PanelProviderProps> = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState<TabType>('flightNumber');

  const selectTab = (tab: TabType) => {
    setSelectedTab(tab);
  };

  const isTabSelected = (tab: TabType) => selectedTab === tab;

  const value = {
    selectedTab,
    selectTab,
    isTabSelected,
  };

  return (
    <PanelContext.Provider value={value}>
      {children}
    </PanelContext.Provider>
  );
};

export const usePanelContext = (): PanelContextType => {
  const context = useContext(PanelContext);
  if (!context) {
    throw new Error('usePanelContext must be used within a PanelProvider');
  }
  return context;
};

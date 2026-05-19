import React, { createContext, useEffect, useMemo, useState } from "react";

export const SelectedSurahContext = createContext({
  selectedSurahs: [],
  setSelectedSurahs: () => {},
});

export function SelectedSurahProvider({ children }) {
  const [selectedSurahs, setSelectedSurahs] = useState(() => {
    if (typeof window === "undefined") return [];
    const saved = window.localStorage.getItem("selectedSurahs");
    const initial = saved ? JSON.parse(saved) : [];
    return Array.isArray(initial) ? initial.slice(0, 4) : [];
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      "selectedSurahs",
      JSON.stringify(selectedSurahs),
    );
  }, [selectedSurahs]);

  const value = useMemo(
    () => ({ selectedSurahs, setSelectedSurahs }),
    [selectedSurahs],
  );

  return (
    <SelectedSurahContext.Provider value={value}>
      {children}
    </SelectedSurahContext.Provider>
  );
}

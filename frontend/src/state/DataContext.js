import React, { createContext, useCallback, useContext, useState } from 'react';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

const fetchItems = useCallback(async (signal, page = 1) => {
  try {
    const res = await fetch(`/api/items?page=${page}&limit=2`, { signal });
    if (!res.ok) throw new Error('Internal Server Error');
    const json = await res.json();
    setItems(json.results || []);
    setTotalPages(json.totalPages || 1); // novo
  } catch (err) {
    console.error('Error fetching items:', err);
    setItems([]);
  }
}, []);



  return (
    <DataContext.Provider value={{ items,totalPages,fetchItems }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
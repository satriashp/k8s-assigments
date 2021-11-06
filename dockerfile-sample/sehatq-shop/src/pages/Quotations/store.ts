import create from 'zustand';

interface Store {
  tableQuery: string;
  setTableQuery: (tableQuery: string) => void;
}

const useStore = create<Store>(set => ({
  tableQuery: '',
  setTableQuery: tableQuery => set({ tableQuery }),
}));

export default useStore;

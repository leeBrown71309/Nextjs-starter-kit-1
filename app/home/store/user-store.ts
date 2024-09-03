import { create } from "zustand";

interface userState {
  users: any;
  setUsers: (users: any) => void;
}

export const useUserStore = create<userState>()((set) => ({
  users: null,
  setUsers: (newUsers: any) => {
    set({ users: newUsers });
  },
}));

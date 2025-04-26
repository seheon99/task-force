import { create } from "zustand";

type MissionFilterStore = {
  selectedTeamId: string | null;
  selectTeamId: (teamId: string | null) => void;
};

export const useMissionFilterStore = create<MissionFilterStore>()((set) => ({
  selectedTeamId: null,
  selectTeamId: (teamId) => set(() => ({ selectedTeamId: teamId })),
}));

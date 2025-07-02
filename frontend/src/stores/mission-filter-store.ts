import { create } from "zustand";

type MissionFilterStore = {
  selectedOrganizationId: string | null;
  selectOrganization: (id: string | null) => void;
};

export const useMissionFilterStore = create<MissionFilterStore>()((set) => ({
  selectedOrganizationId: null,
  selectOrganization: (id) => set(() => ({ selectedOrganizationId: id })),
}));

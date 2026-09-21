import { create } from 'zustand';

export type WorkspaceMode = 'simple' | 'advanced';

interface UiState {
  authModalOpen: boolean;
  authModalMode: 'login' | 'register';
  /** Callback fired after a successful login triggered from a modal. */
  postAuthAction: (() => void) | null;
  openAuthModal: (mode?: 'login' | 'register', after?: () => void) => void;
  closeAuthModal: () => void;
  shortcutsOpen: boolean;
  setShortcutsOpen: (open: boolean) => void;
  mobilePanel: string | null;
  setMobilePanel: (panel: string | null) => void;
  /** Simple = consumer controls; Advanced = pro inspector, layers, precision. */
  workspaceMode: WorkspaceMode;
  setWorkspaceMode: (mode: WorkspaceMode) => void;
  /** Admin/pro overlay: zones rendered as wireframe in 3D. */
  technicalView: boolean;
  setTechnicalView: (on: boolean) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  presentationOpen: boolean;
  setPresentationOpen: (open: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
  authModalOpen: false,
  authModalMode: 'login',
  postAuthAction: null,
  openAuthModal(mode = 'login', after) {
    set({ authModalOpen: true, authModalMode: mode, postAuthAction: after ?? null });
  },
  closeAuthModal() {
    set({ authModalOpen: false, postAuthAction: null });
  },
  shortcutsOpen: false,
  setShortcutsOpen(open) {
    set({ shortcutsOpen: open });
  },
  mobilePanel: null,
  setMobilePanel(panel) {
    set({ mobilePanel: panel });
  },
  workspaceMode: (() => {
    try {
      return (localStorage.getItem('cpd.workspaceMode') as WorkspaceMode) || 'simple';
    } catch {
      return 'simple';
    }
  })(),
  setWorkspaceMode(mode) {
    try {
      localStorage.setItem('cpd.workspaceMode', mode);
    } catch {
      /* private mode */
    }
    set({ workspaceMode: mode });
  },
  technicalView: false,
  setTechnicalView(on) {
    set({ technicalView: on });
  },
  commandPaletteOpen: false,
  setCommandPaletteOpen(open) {
    set({ commandPaletteOpen: open });
  },
  presentationOpen: false,
  setPresentationOpen(open) {
    set({ presentationOpen: open });
  },
}));

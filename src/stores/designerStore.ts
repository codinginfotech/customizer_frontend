import { create } from 'zustand';
import type { DesignArea, DesignDocument, DesignElement } from '@cpd/shared';
import { createEmptyDesign } from '@cpd/shared';
import type { Product, ProductVariant, DesignTemplate } from '../types/catalog';
import { newElementId } from '../utils/id';

export type SaveStatus = 'idle' | 'unsaved' | 'saving' | 'saved' | 'error';
export type PreviewMode = '2d' | '3d';
export type PanelTab = 'product' | 'upload' | 'text' | 'shapes' | 'graphics' | 'templates' | 'layers';

const HISTORY_LIMIT = 50;

function cloneAreas(areas: DesignArea[]): DesignArea[] {
  return JSON.parse(JSON.stringify(areas)) as DesignArea[];
}

interface DesignerState {
  // context
  product: Product | null;
  variant: ProductVariant | null;
  activeAreaKey: string;
  // the shared design state (single source of truth for 2D + 3D)
  areas: DesignArea[];
  productColor: string;
  // persistence
  designId: number | null;
  designName: string;
  dirty: boolean;
  saveStatus: SaveStatus;
  /** Bumped on every visual change — 3D textures listen to this. */
  revision: number;
  // editor UI
  selectedId: string | null;
  /** Multi-selection (always contains selectedId when non-empty). */
  selectedIds: string[];
  previewMode: PreviewMode;
  activeTab: PanelTab;
  zoom: number;
  clipboard: DesignElement | null;
  /** Named camera view request consumed by the 3D engine. */
  cameraRequest: { view: string; nonce: number; instant?: boolean } | null;
  /** Per-view preview thumbnails captured by the 3D engine (view → dataURL). */
  viewThumbs: Record<string, string>;
  setViewThumbs: (thumbs: Record<string, string>) => void;
  // history
  past: DesignArea[][];
  future: DesignArea[][];
  pendingSnapshot: DesignArea[] | null;

  // ---- lifecycle ----
  initialize: (
    product: Product,
    variant: ProductVariant | null,
    /** `id: null` loads a document without binding it to a saved design (storefront mode). */
    existing?: { id: number | null; name: string; doc: DesignDocument } | null,
  ) => void;
  reset: () => void;

  // ---- context ----
  setVariant: (variant: ProductVariant | null) => void;
  setProductColor: (color: string) => void;
  setActiveArea: (key: string) => void;
  setPreviewMode: (mode: PreviewMode) => void;
  setActiveTab: (tab: PanelTab) => void;
  setZoom: (zoom: number) => void;

  // ---- selection ----
  select: (id: string | null) => void;
  selectMany: (ids: string[]) => void;
  toggleSelect: (id: string) => void;
  removeSelected: () => void;
  alignSelected: (mode: 'left' | 'centerX' | 'right' | 'top' | 'centerY' | 'bottom') => void;
  distributeSelected: (axis: 'x' | 'y') => void;
  requestCameraView: (view: string, instant?: boolean) => void;

  // ---- element operations ----
  addElement: (element: DesignElement, areaKey?: string) => void;
  updateElement: (id: string, patch: Partial<DesignElement>, options?: { history?: boolean }) => void;
  removeElement: (id: string) => void;
  duplicateElement: (id: string) => void;
  copyElement: (id: string) => void;
  paste: () => void;
  moveLayer: (id: string, action: 'forward' | 'backward' | 'front' | 'back') => void;
  toggleLock: (id: string) => void;
  toggleVisible: (id: string) => void;
  clearArea: (areaKey: string) => void;
  applyTemplate: (template: DesignTemplate) => void;

  /** Replace all areas (design transfer / restore) — resets history. */
  replaceAreas: (areas: DesignArea[], productColor?: string) => void;

  // ---- transform sessions (drag/resize/rotate) ----
  beginTransform: () => void;
  endTransform: () => void;

  // ---- history ----
  undo: () => void;
  redo: () => void;

  // ---- persistence ----
  setSaveStatus: (status: SaveStatus) => void;
  setDesignIdentity: (id: number | null, name: string) => void;
  markSaved: () => void;

  // ---- derived helpers ----
  buildDocument: () => DesignDocument | null;
  activeArea: () => DesignArea | undefined;
  selectedElement: () => DesignElement | undefined;
}

export const useDesignerStore = create<DesignerState>((set, get) => {
  /** Push current areas to history and apply a mutation. */
  function commit(mutator: (areas: DesignArea[]) => void) {
    const state = get();
    const prev = cloneAreas(state.areas);
    const next = cloneAreas(state.areas);
    mutator(next);
    set({
      areas: next,
      past: [...state.past.slice(-HISTORY_LIMIT + 1), prev],
      future: [],
      dirty: true,
      saveStatus: state.designId ? 'unsaved' : state.saveStatus,
      revision: state.revision + 1,
    });
  }

  function findElement(areas: DesignArea[], id: string): { area: DesignArea; index: number } | null {
    for (const area of areas) {
      const index = area.elements.findIndex((e) => e.id === id);
      if (index !== -1) return { area, index };
    }
    return null;
  }

  return {
    product: null,
    variant: null,
    activeAreaKey: '',
    areas: [],
    productColor: '#ffffff',
    designId: null,
    designName: 'Untitled design',
    dirty: false,
    saveStatus: 'idle',
    revision: 0,
    selectedId: null,
    selectedIds: [],
    previewMode: '2d',
    activeTab: 'product',
    zoom: 1,
    clipboard: null,
    cameraRequest: null,
    viewThumbs: {},
    setViewThumbs: (thumbs) => set({ viewThumbs: thumbs }),
    past: [],
    future: [],
    pendingSnapshot: null,

    initialize(product, variant, existing) {
      const areaKeys = product.printAreas.map((a) => a.key);
      const color = variant?.color || product.variants.find((v) => v.color)?.color || '#ffffff';
      const defaultPreview: PreviewMode = product.model ? '3d' : '2d';
      if (existing) {
        // Merge saved areas with the product's current areas (admin may have
        // added areas since the design was saved).
        const saved = existing.doc;
        const areas: DesignArea[] = areaKeys.map(
          (key) => saved.areas.find((a) => a.areaKey === key) ?? { areaKey: key, elements: [] },
        );
        set({
          product,
          variant,
          activeAreaKey: areaKeys[0] ?? '',
          areas,
          productColor: saved.productColor || color,
          designId: existing.id,
          designName: existing.name,
          dirty: false,
          saveStatus: 'saved',
          revision: get().revision + 1,
          selectedId: null,
          past: [],
          future: [],
          previewMode: defaultPreview,
          cameraRequest: { view: 'default', nonce: Date.now(), instant: true },
          viewThumbs: {},
          activeTab: 'product',
          zoom: 1,
        });
      } else {
        const doc = createEmptyDesign(product.id, variant?.id ?? null, areaKeys, color);
        set({
          product,
          variant,
          activeAreaKey: areaKeys[0] ?? '',
          areas: doc.areas,
          productColor: color,
          designId: null,
          designName: 'Untitled design',
          dirty: false,
          saveStatus: 'idle',
          revision: get().revision + 1,
          selectedId: null,
          past: [],
          future: [],
          previewMode: defaultPreview,
          cameraRequest: { view: 'default', nonce: Date.now(), instant: true },
          viewThumbs: {},
          activeTab: 'product',
          zoom: 1,
        });
      }
    },

    reset() {
      set({
        product: null,
        variant: null,
        activeAreaKey: '',
        areas: [],
        designId: null,
        designName: 'Untitled design',
        dirty: false,
        saveStatus: 'idle',
        selectedId: null,
        past: [],
        future: [],
        clipboard: null,
      });
    },

    setVariant(variant) {
      const patch: Partial<DesignerState> = { variant };
      if (variant?.color) patch.productColor = variant.color;
      set({ ...patch, dirty: true, revision: get().revision + 1 } as never);
    },

    setProductColor(color) {
      set({ productColor: color, dirty: true, revision: get().revision + 1 });
    },

    setActiveArea(key) {
      set({ activeAreaKey: key, selectedId: null, selectedIds: [] });
    },

    setPreviewMode(mode) {
      set({ previewMode: mode });
    },

    setActiveTab(tab) {
      set({ activeTab: tab });
    },

    setZoom(zoom) {
      set({ zoom: Math.min(4, Math.max(0.25, zoom)) });
    },

    select(id) {
      set({ selectedId: id, selectedIds: id ? [id] : [] });
    },

    selectMany(ids) {
      set({ selectedIds: ids, selectedId: ids[0] ?? null });
    },

    toggleSelect(id) {
      const current = get().selectedIds;
      const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
      set({ selectedIds: next, selectedId: next[next.length - 1] ?? null });
    },

    removeSelected() {
      const ids = get().selectedIds;
      if (ids.length === 0) return;
      commit((areas) => {
        for (const area of areas) {
          area.elements = area.elements.filter((e) => !ids.includes(e.id) || e.locked);
        }
      });
      set({ selectedId: null, selectedIds: [] });
    },

    alignSelected(mode) {
      const state = get();
      const ids = state.selectedIds;
      const areaConfig = state.product?.printAreas.find((a) => a.key === state.activeAreaKey);
      if (!areaConfig || ids.length === 0) return;
      commit((areas) => {
        const area = areas.find((a) => a.areaKey === state.activeAreaKey);
        if (!area) return;
        const targets = area.elements.filter((e) => ids.includes(e.id) && !e.locked);
        if (targets.length === 0) return;
        // Single element aligns to the safe area; groups align to their bounds.
        const sizeOf = (e: DesignElement) =>
          e.type === 'text'
            ? { w: e.width, h: e.text.split('\n').length * e.fontSize * e.lineHeight }
            : { w: e.width, h: e.height };
        let minX: number;
        let maxX: number;
        let minY: number;
        let maxY: number;
        if (targets.length === 1) {
          const s = areaConfig.safeArea;
          minX = s.x;
          maxX = s.x + s.width;
          minY = s.y;
          maxY = s.y + s.height;
        } else {
          minX = Math.min(...targets.map((e) => e.x));
          maxX = Math.max(...targets.map((e) => e.x + sizeOf(e).w));
          minY = Math.min(...targets.map((e) => e.y));
          maxY = Math.max(...targets.map((e) => e.y + sizeOf(e).h));
        }
        for (const e of targets) {
          const { w, h } = sizeOf(e);
          if (mode === 'left') e.x = minX;
          if (mode === 'right') e.x = maxX - w;
          if (mode === 'centerX') e.x = (minX + maxX) / 2 - w / 2;
          if (mode === 'top') e.y = minY;
          if (mode === 'bottom') e.y = maxY - h;
          if (mode === 'centerY') e.y = (minY + maxY) / 2 - h / 2;
        }
      });
    },

    distributeSelected(axis) {
      const state = get();
      const ids = state.selectedIds;
      if (ids.length < 3) return;
      commit((areas) => {
        const area = areas.find((a) => a.areaKey === state.activeAreaKey);
        if (!area) return;
        const targets = area.elements
          .filter((e) => ids.includes(e.id) && !e.locked)
          .sort((a, b) => (axis === 'x' ? a.x - b.x : a.y - b.y));
        if (targets.length < 3) return;
        const first = targets[0];
        const last = targets[targets.length - 1];
        const step = (axis === 'x' ? last.x - first.x : last.y - first.y) / (targets.length - 1);
        targets.forEach((e, i) => {
          if (axis === 'x') e.x = first.x + step * i;
          else e.y = first.y + step * i;
        });
      });
    },

    requestCameraView(view, instant) {
      set({ cameraRequest: { view, nonce: (get().cameraRequest?.nonce ?? 0) + 1, instant } });
    },

    addElement(element, areaKey) {
      const key = areaKey ?? get().activeAreaKey;
      commit((areas) => {
        const area = areas.find((a) => a.areaKey === key);
        if (area) area.elements.push(element);
      });
      set({ selectedId: element.id, selectedIds: [element.id] });
    },

    updateElement(id, patch, options) {
      if (options?.history) {
        commit((areas) => {
          const found = findElement(areas, id);
          if (found) {
            found.area.elements[found.index] = {
              ...found.area.elements[found.index],
              ...patch,
            } as DesignElement;
          }
        });
        return;
      }
      // Transient update — no history entry (used mid-drag and by inputs
      // between beginTransform/endTransform).
      const state = get();
      const next = cloneAreas(state.areas);
      const found = findElement(next, id);
      if (!found) return;
      found.area.elements[found.index] = {
        ...found.area.elements[found.index],
        ...patch,
      } as DesignElement;
      set({
        areas: next,
        dirty: true,
        saveStatus: state.designId ? 'unsaved' : state.saveStatus,
        revision: state.revision + 1,
      });
    },

    removeElement(id) {
      commit((areas) => {
        const found = findElement(areas, id);
        if (found) found.area.elements.splice(found.index, 1);
      });
      if (get().selectedId === id) set({ selectedId: null, selectedIds: [] });
    },

    duplicateElement(id) {
      const found = findElement(get().areas, id);
      if (!found) return;
      const copy = JSON.parse(JSON.stringify(found.area.elements[found.index])) as DesignElement;
      copy.id = newElementId();
      copy.x += 20;
      copy.y += 20;
      commit((areas) => {
        const target = areas.find((a) => a.areaKey === found.area.areaKey);
        target?.elements.push(copy);
      });
      set({ selectedId: copy.id, selectedIds: [copy.id] });
    },

    copyElement(id) {
      const found = findElement(get().areas, id);
      if (!found) return;
      set({ clipboard: JSON.parse(JSON.stringify(found.area.elements[found.index])) });
    },

    paste() {
      const { clipboard } = get();
      if (!clipboard) return;
      const copy = JSON.parse(JSON.stringify(clipboard)) as DesignElement;
      copy.id = newElementId();
      copy.x += 24;
      copy.y += 24;
      get().addElement(copy);
    },

    moveLayer(id, action) {
      commit((areas) => {
        const found = findElement(areas, id);
        if (!found) return;
        const { area, index } = found;
        const [el] = area.elements.splice(index, 1);
        let target = index;
        if (action === 'forward') target = Math.min(area.elements.length, index + 1);
        if (action === 'backward') target = Math.max(0, index - 1);
        if (action === 'front') target = area.elements.length;
        if (action === 'back') target = 0;
        area.elements.splice(target, 0, el);
      });
    },

    toggleLock(id) {
      const el = findElement(get().areas, id);
      if (!el) return;
      get().updateElement(id, { locked: !el.area.elements[el.index].locked }, { history: true });
    },

    toggleVisible(id) {
      const el = findElement(get().areas, id);
      if (!el) return;
      get().updateElement(id, { visible: !(el.area.elements[el.index].visible ?? true) }, { history: true });
    },

    clearArea(areaKey) {
      commit((areas) => {
        const area = areas.find((a) => a.areaKey === areaKey);
        if (area) area.elements = [];
      });
      set({ selectedId: null });
    },

    applyTemplate(template) {
      const state = get();
      const product = state.product;
      if (!product) return;
      const areaConfig = product.printAreas.find((a) => a.key === state.activeAreaKey);
      if (!areaConfig) return;
      const { canvas, elements } = template.templateJson;
      // Scale the template canvas to fit the target print area.
      const scale = Math.min(areaConfig.width / canvas.width, areaConfig.height / canvas.height);
      const offsetX = (areaConfig.width - canvas.width * scale) / 2;
      const offsetY = (areaConfig.height - canvas.height * scale) / 2;
      const scaled = (elements as DesignElement[]).map((el) => {
        const copy = JSON.parse(JSON.stringify(el)) as DesignElement;
        copy.id = newElementId();
        copy.x = copy.x * scale + offsetX;
        copy.y = copy.y * scale + offsetY;
        if (copy.type === 'text') {
          copy.fontSize = Math.max(6, copy.fontSize * scale);
          copy.width = copy.width * scale;
        } else {
          copy.width = copy.width * scale;
          copy.height = copy.height * scale;
        }
        return copy;
      });
      commit((areas) => {
        const area = areas.find((a) => a.areaKey === state.activeAreaKey);
        if (area) area.elements.push(...scaled);
      });
    },

    replaceAreas(areas, productColor) {
      set({
        areas: cloneAreas(areas),
        ...(productColor ? { productColor } : {}),
        past: [],
        future: [],
        selectedId: null,
        selectedIds: [],
        dirty: true,
        saveStatus: get().designId ? 'unsaved' : get().saveStatus,
        revision: get().revision + 1,
      });
    },

    beginTransform() {
      set({ pendingSnapshot: cloneAreas(get().areas) });
    },

    endTransform() {
      const state = get();
      if (!state.pendingSnapshot) return;
      set({
        past: [...state.past.slice(-HISTORY_LIMIT + 1), state.pendingSnapshot],
        future: [],
        pendingSnapshot: null,
        dirty: true,
        saveStatus: state.designId ? 'unsaved' : state.saveStatus,
      });
    },

    undo() {
      const state = get();
      if (state.past.length === 0) return;
      const prev = state.past[state.past.length - 1];
      set({
        areas: prev,
        past: state.past.slice(0, -1),
        future: [cloneAreas(state.areas), ...state.future].slice(0, HISTORY_LIMIT),
        dirty: true,
        saveStatus: state.designId ? 'unsaved' : state.saveStatus,
        revision: state.revision + 1,
        selectedId: null,
        selectedIds: [],
      });
    },

    redo() {
      const state = get();
      if (state.future.length === 0) return;
      const [next, ...rest] = state.future;
      set({
        areas: next,
        past: [...state.past, cloneAreas(state.areas)].slice(-HISTORY_LIMIT),
        future: rest,
        dirty: true,
        saveStatus: state.designId ? 'unsaved' : state.saveStatus,
        revision: state.revision + 1,
        selectedId: null,
        selectedIds: [],
      });
    },

    setSaveStatus(status) {
      set({ saveStatus: status });
    },

    setDesignIdentity(id, name) {
      set({ designId: id, designName: name });
    },

    markSaved() {
      set({ dirty: false, saveStatus: 'saved' });
    },

    buildDocument() {
      const state = get();
      if (!state.product) return null;
      return {
        version: 1 as const,
        productId: state.product.id,
        variantId: state.variant?.id ?? null,
        productColor: state.productColor,
        areas: cloneAreas(state.areas),
      };
    },

    activeArea() {
      const state = get();
      return state.areas.find((a) => a.areaKey === state.activeAreaKey);
    },

    selectedElement() {
      const state = get();
      if (!state.selectedId) return undefined;
      for (const area of state.areas) {
        const el = area.elements.find((e) => e.id === state.selectedId);
        if (el) return el;
      }
      return undefined;
    },
  };
});

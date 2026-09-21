import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Group, Image as KImage, Layer, Line, Rect, Stage, Transformer } from 'react-konva';
import Konva from 'konva';
import { AlertTriangle, Grid3x3 } from 'lucide-react';
import type { KonvaEventObject } from 'konva/lib/Node';
import { useDesignerStore } from '../../../stores/designerStore';
import { onImageLoaded } from '../../../utils/areaRenderer';
import { tintedMockupUrl, loadImage } from '../../../utils/mockup';
import { areaHasOverflow, elementSize } from '../../../utils/designMath';
import { ElementNode } from './ElementNode';
import clsx from 'clsx';

const SNAP_THRESHOLD = 6;

interface SnapTargets {
  vertical: number[];
  horizontal: number[];
}

/**
 * The 2D design canvas: product mockup backdrop, print-area frame with safe
 * zone, design elements, multi-selection (shift-click + marquee), snapping to
 * centers/edges/safe-area/other elements, space-drag panning and wheel zoom.
 */
export function CanvasEditor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const nodeMap = useRef(new Map<string, Konva.Group>());
  const dragOrigin = useRef<Map<string, { x: number; y: number }>>(new Map());
  const snapTargets = useRef<SnapTargets>({ vertical: [], horizontal: [] });

  const product = useDesignerStore((s) => s.product);
  const activeAreaKey = useDesignerStore((s) => s.activeAreaKey);
  const areas = useDesignerStore((s) => s.areas);
  const selectedIds = useDesignerStore((s) => s.selectedIds);
  const productColor = useDesignerStore((s) => s.productColor);
  const zoom = useDesignerStore((s) => s.zoom);

  const [size, setSize] = useState({ width: 800, height: 600 });
  const [mockupImage, setMockupImage] = useState<HTMLImageElement | null>(null);
  const [, setImageTick] = useState(0);
  const [guides, setGuides] = useState<{ v: number | null; h: number | null }>({ v: null, h: null });
  const [showGrid, setShowGrid] = useState(false);
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const [spaceDown, setSpaceDown] = useState(false);
  const [marquee, setMarquee] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);

  const areaConfig = product?.printAreas.find((a) => a.key === activeAreaKey);
  const area = areas.find((a) => a.areaKey === activeAreaKey);

  // --- pan with spacebar (professional-editor convention) ---
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        setSpaceDown(true);
      }
    };
    const up = (e: KeyboardEvent) => {
      if (e.code === 'Space') setSpaceDown(false);
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  // --- container sizing ---
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setSize({ width: el.clientWidth, height: el.clientHeight });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => onImageLoaded(() => setImageTick((t) => t + 1)), []);

  // --- tinted mockup backdrop ---
  useEffect(() => {
    let cancelled = false;
    if (!areaConfig?.templateImage) {
      setMockupImage(null);
      return;
    }
    tintedMockupUrl(areaConfig.templateImage, productColor)
      .then(loadImage)
      .then((img) => {
        if (!cancelled) setMockupImage(img);
      })
      .catch(() => setMockupImage(null));
    return () => {
      cancelled = true;
    };
  }, [areaConfig?.templateImage, productColor]);

  // --- geometry: fit the mockup (or bare area) into the stage ---
  const geometry = useMemo(() => {
    if (!areaConfig) return null;
    const pad = 40;
    const availW = Math.max(50, size.width - pad * 2);
    const availH = Math.max(50, size.height - pad * 2);

    if (mockupImage && areaConfig.mockup) {
      const scale = Math.min(availW / mockupImage.width, availH / mockupImage.height);
      const imgW = mockupImage.width * scale;
      const imgH = mockupImage.height * scale;
      const imgX = (size.width - imgW) / 2;
      const imgY = (size.height - imgH) / 2;
      const m = areaConfig.mockup;
      const rect = {
        x: imgX + (m.left / 100) * imgW,
        y: imgY + (m.top / 100) * imgH,
        width: (m.width / 100) * imgW,
        height: (m.height / 100) * imgH,
      };
      return {
        image: { x: imgX, y: imgY, width: imgW, height: imgH },
        rect,
        areaScale: rect.width / areaConfig.width,
      };
    }
    const scale = Math.min(availW / areaConfig.width, availH / areaConfig.height, 1.5);
    const rect = {
      x: (size.width - areaConfig.width * scale) / 2,
      y: (size.height - areaConfig.height * scale) / 2,
      width: areaConfig.width * scale,
      height: areaConfig.height * scale,
    };
    return { image: null, rect, areaScale: scale };
  }, [areaConfig, mockupImage, size]);

  // --- transformer attachment (multi-node) ---
  useEffect(() => {
    const tr = transformerRef.current;
    if (!tr) return;
    const nodes: Konva.Group[] = [];
    for (const id of selectedIds) {
      const el = area?.elements.find((e) => e.id === id);
      const node = nodeMap.current.get(id);
      if (el && node && !el.locked) nodes.push(node);
    }
    tr.nodes(nodes);
    tr.getLayer()?.batchDraw();
  }, [selectedIds, area, geometry]);

  const registerNode = useCallback((id: string, node: Konva.Group | null) => {
    if (node) nodeMap.current.set(id, node);
    else nodeMap.current.delete(id);
  }, []);

  const handleSelect = useCallback((id: string, shiftKey: boolean) => {
    const store = useDesignerStore.getState();
    if (shiftKey) store.toggleSelect(id);
    else if (!store.selectedIds.includes(id)) store.select(id);
  }, []);

  // --- drag with smart snapping (centers, edges, safe area, siblings) ---
  const beginDrag = useCallback(
    (draggedId: string) => {
      const store = useDesignerStore.getState();
      store.beginTransform();
      // Record origins for group dragging.
      dragOrigin.current.clear();
      const active = store.areas.find((a) => a.areaKey === store.activeAreaKey);
      for (const el of active?.elements ?? []) {
        dragOrigin.current.set(el.id, { x: el.x, y: el.y });
      }
      // Snap targets: area center/edges + safe area + other elements.
      if (!areaConfig) return;
      const vertical = [areaConfig.width / 2, areaConfig.safeArea.x, areaConfig.safeArea.x + areaConfig.safeArea.width];
      const horizontal = [areaConfig.height / 2, areaConfig.safeArea.y, areaConfig.safeArea.y + areaConfig.safeArea.height];
      for (const el of active?.elements ?? []) {
        if (el.id === draggedId || store.selectedIds.includes(el.id) || el.visible === false) continue;
        const { width, height } = elementSize(el);
        vertical.push(el.x, el.x + width / 2, el.x + width);
        horizontal.push(el.y, el.y + height / 2, el.y + height);
      }
      snapTargets.current = { vertical, horizontal };
    },
    [areaConfig],
  );

  const handleDragMove = useCallback(
    (id: string, x: number, y: number) => {
      const store = useDesignerStore.getState();
      const el = store.areas
        .find((a) => a.areaKey === store.activeAreaKey)
        ?.elements.find((e) => e.id === id);
      if (!el || !areaConfig || !geometry) return;

      const groupIds = store.selectedIds.includes(id) && store.selectedIds.length > 1 ? store.selectedIds : [id];
      let nx = x;
      let ny = y;
      const newGuides: { v: number | null; h: number | null } = { v: null, h: null };

      // Snap only single, unrotated drags — group snapping feels sticky.
      if (groupIds.length === 1 && el.rotation % 360 === 0) {
        const { width, height } = elementSize(el);
        const snapPx = SNAP_THRESHOLD / (geometry.areaScale * useDesignerStore.getState().zoom);
        const candidatesX = [x, x + width / 2, x + width];
        outer: for (let ci = 0; ci < candidatesX.length; ci += 1) {
          for (const target of snapTargets.current.vertical) {
            if (Math.abs(candidatesX[ci] - target) < snapPx) {
              nx = target - (ci === 1 ? width / 2 : ci === 2 ? width : 0);
              newGuides.v = target;
              break outer;
            }
          }
        }
        const candidatesY = [y, y + height / 2, y + height];
        outer2: for (let ci = 0; ci < candidatesY.length; ci += 1) {
          for (const target of snapTargets.current.horizontal) {
            if (Math.abs(candidatesY[ci] - target) < snapPx) {
              ny = target - (ci === 1 ? height / 2 : ci === 2 ? height : 0);
              newGuides.h = target;
              break outer2;
            }
          }
        }
        if (nx !== x || ny !== y) nodeMap.current.get(id)?.position({ x: nx, y: ny });
      }
      setGuides(newGuides);

      // Group drag: apply the same delta to every other selected element.
      const origin = dragOrigin.current.get(id);
      if (origin && groupIds.length > 1) {
        const dx = nx - origin.x;
        const dy = ny - origin.y;
        for (const gid of groupIds) {
          if (gid === id) {
            store.updateElement(gid, { x: nx, y: ny });
            continue;
          }
          const gOrigin = dragOrigin.current.get(gid);
          const gEl = store.areas
            .find((a) => a.areaKey === store.activeAreaKey)
            ?.elements.find((e) => e.id === gid);
          if (!gOrigin || !gEl || gEl.locked) continue;
          const gx = gOrigin.x + dx;
          const gy = gOrigin.y + dy;
          nodeMap.current.get(gid)?.position({ x: gx, y: gy });
          store.updateElement(gid, { x: gx, y: gy });
        }
      } else {
        store.updateElement(id, { x: nx, y: ny });
      }
    },
    [areaConfig, geometry],
  );

  const handleDragEnd = useCallback((id: string, x: number, y: number) => {
    setGuides({ v: null, h: null });
    const store = useDesignerStore.getState();
    if (!(store.selectedIds.length > 1 && store.selectedIds.includes(id))) {
      store.updateElement(id, { x, y });
    }
    store.endTransform();
  }, []);

  const handleTransformEnd = useCallback(() => {
    const store = useDesignerStore.getState();
    for (const id of store.selectedIds) {
      const node = nodeMap.current.get(id);
      const el = store.areas
        .find((a) => a.areaKey === store.activeAreaKey)
        ?.elements.find((e) => e.id === id);
      if (!node || !el || el.locked) continue;
      const scaleX = node.scaleX();
      const scaleY = node.scaleY();
      node.scale({ x: 1, y: 1 });
      const patch: Record<string, number> = {
        x: node.x(),
        y: node.y(),
        rotation: Math.round(node.rotation() * 10) / 10,
      };
      if (el.type === 'text') {
        patch.width = Math.max(20, el.width * scaleX);
        patch.fontSize = Math.max(4, el.fontSize * scaleY);
      } else {
        patch.width = Math.max(4, el.width * scaleX);
        patch.height = Math.max(4, el.height * scaleY);
      }
      store.updateElement(id, patch);
    }
    store.endTransform();
  }, []);

  // --- zoom towards pointer ---
  const handleWheel = useCallback((e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const stage = stageRef.current;
    if (!stage) return;
    const store = useDesignerStore.getState();
    const oldZoom = store.zoom;
    const direction = e.evt.deltaY > 0 ? -1 : 1;
    const newZoom = Math.min(4, Math.max(0.25, oldZoom * (direction > 0 ? 1.08 : 1 / 1.08)));
    const pointer = stage.getPointerPosition();
    if (pointer) {
      const mousePointTo = {
        x: (pointer.x - stage.x()) / oldZoom,
        y: (pointer.y - stage.y()) / oldZoom,
      };
      stage.position({
        x: pointer.x - mousePointTo.x * newZoom,
        y: pointer.y - mousePointTo.y * newZoom,
      });
    }
    store.setZoom(newZoom);
  }, []);

  // --- marquee selection on empty-stage drag (pan is space+drag) ---
  const stageToArea = useCallback(
    (stage: Konva.Stage) => {
      const pointer = stage.getPointerPosition();
      if (!pointer || !geometry) return null;
      const sx = (pointer.x - stage.x()) / useDesignerStore.getState().zoom;
      const sy = (pointer.y - stage.y()) / useDesignerStore.getState().zoom;
      return {
        x: (sx - geometry.rect.x) / geometry.areaScale,
        y: (sy - geometry.rect.y) / geometry.areaScale,
      };
    },
    [geometry],
  );

  const handleStageMouseDown = useCallback(
    (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
      const clickedEmpty = e.target === e.target.getStage() || e.target.name() === 'backdrop';
      if (!clickedEmpty || spaceDown) return;
      const stage = e.target.getStage();
      if (!stage) return;
      const p = stageToArea(stage);
      if (!p) return;
      setMarquee({ x1: p.x, y1: p.y, x2: p.x, y2: p.y });
      useDesignerStore.getState().select(null);
    },
    [spaceDown, stageToArea],
  );

  const handleStageMouseMove = useCallback(
    (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
      if (!marquee) return;
      const stage = e.target.getStage();
      if (!stage) return;
      const p = stageToArea(stage);
      if (p) setMarquee((m) => (m ? { ...m, x2: p.x, y2: p.y } : m));
    },
    [marquee, stageToArea],
  );

  const handleStageMouseUp = useCallback(() => {
    if (!marquee) return;
    const { x1, y1, x2, y2 } = marquee;
    setMarquee(null);
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    if (maxX - minX < 4 && maxY - minY < 4) return; // click, not drag
    const store = useDesignerStore.getState();
    const active = store.areas.find((a) => a.areaKey === store.activeAreaKey);
    const hits = (active?.elements ?? [])
      .filter((el) => {
        if (el.visible === false || el.locked) return false;
        const { width, height } = elementSize(el);
        return el.x < maxX && el.x + width > minX && el.y < maxY && el.y + height > minY;
      })
      .map((el) => el.id);
    if (hits.length > 0) store.selectMany(hits);
  }, [marquee]);

  const editingElement = editingTextId
    ? area?.elements.find((e) => e.id === editingTextId && e.type === 'text')
    : undefined;

  const overflow = areaConfig ? areaHasOverflow(area, areaConfig.safeArea) : false;

  if (!product || !areaConfig || !geometry) return <div ref={containerRef} className="flex-1" />;

  const { rect, areaScale } = geometry;
  const safe = areaConfig.safeArea;

  return (
    <div
      ref={containerRef}
      className={clsx(
        'relative min-h-0 flex-1 touch-none overflow-hidden bg-[color:var(--studio-canvas,#eceef1)]',
        spaceDown && 'cursor-grab',
      )}
    >
      <Stage
        ref={stageRef}
        width={size.width}
        height={size.height}
        scaleX={zoom}
        scaleY={zoom}
        draggable={spaceDown}
        onWheel={handleWheel}
        onMouseDown={handleStageMouseDown}
        onMouseMove={handleStageMouseMove}
        onMouseUp={handleStageMouseUp}
        onTouchStart={handleStageMouseDown}
        onTouchEnd={handleStageMouseUp}
      >
        {/* Backdrop: tinted product mockup */}
        <Layer>
          {geometry.image && mockupImage && (
            <KImage
              name="backdrop"
              image={mockupImage}
              x={geometry.image.x}
              y={geometry.image.y}
              width={geometry.image.width}
              height={geometry.image.height}
            />
          )}
          {!geometry.image && (
            <Rect
              name="backdrop"
              x={rect.x - 1}
              y={rect.y - 1}
              width={rect.width + 2}
              height={rect.height + 2}
              fill="#ffffff"
              shadowColor="rgba(0,0,0,0.15)"
              shadowBlur={12}
              cornerRadius={4}
            />
          )}
        </Layer>

        {/* Design elements, clipped to the print area */}
        <Layer>
          <Group
            x={rect.x}
            y={rect.y}
            scaleX={areaScale}
            scaleY={areaScale}
            clipX={0}
            clipY={0}
            clipWidth={areaConfig.width}
            clipHeight={areaConfig.height}
          >
            {area?.elements.map((el) => (
              <ElementNode
                key={el.id}
                el={el}
                onSelect={handleSelect}
                onRegister={registerNode}
                onDragStart={beginDrag}
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}
                onTextDblClick={(id) => setEditingTextId(id)}
              />
            ))}
          </Group>
        </Layer>

        {/* Overlays: print frame, safe area, grid, snap guides, marquee */}
        <Layer listening={false}>
          <Rect
            x={rect.x}
            y={rect.y}
            width={rect.width}
            height={rect.height}
            stroke="#94a3b8"
            strokeWidth={1}
            dash={[6, 4]}
          />
          <Rect
            x={rect.x + safe.x * areaScale}
            y={rect.y + safe.y * areaScale}
            width={safe.width * areaScale}
            height={safe.height * areaScale}
            stroke={overflow ? '#ef4444' : '#38bdf8'}
            strokeWidth={overflow ? 1.5 : 1}
            dash={[4, 4]}
          />
          {showGrid &&
            Array.from({ length: Math.floor(areaConfig.width / 50) }).map((_, i) => (
              <Line
                key={`gv${i}`}
                points={[
                  rect.x + (i + 1) * 50 * areaScale,
                  rect.y,
                  rect.x + (i + 1) * 50 * areaScale,
                  rect.y + rect.height,
                ]}
                stroke="rgba(100,116,139,0.15)"
                strokeWidth={1}
              />
            ))}
          {showGrid &&
            Array.from({ length: Math.floor(areaConfig.height / 50) }).map((_, i) => (
              <Line
                key={`gh${i}`}
                points={[
                  rect.x,
                  rect.y + (i + 1) * 50 * areaScale,
                  rect.x + rect.width,
                  rect.y + (i + 1) * 50 * areaScale,
                ]}
                stroke="rgba(100,116,139,0.15)"
                strokeWidth={1}
              />
            ))}
          {guides.v !== null && (
            <Line
              points={[rect.x + guides.v * areaScale, rect.y, rect.x + guides.v * areaScale, rect.y + rect.height]}
              stroke="#f43f5e"
              strokeWidth={1}
              dash={[4, 3]}
            />
          )}
          {guides.h !== null && (
            <Line
              points={[rect.x, rect.y + guides.h * areaScale, rect.x + rect.width, rect.y + guides.h * areaScale]}
              stroke="#f43f5e"
              strokeWidth={1}
              dash={[4, 3]}
            />
          )}
          {marquee && (
            <Rect
              x={rect.x + Math.min(marquee.x1, marquee.x2) * areaScale}
              y={rect.y + Math.min(marquee.y1, marquee.y2) * areaScale}
              width={Math.abs(marquee.x2 - marquee.x1) * areaScale}
              height={Math.abs(marquee.y2 - marquee.y1) * areaScale}
              fill="rgba(59,99,246,0.08)"
              stroke="#3b63f6"
              strokeWidth={1}
            />
          )}
        </Layer>

        {/* Selection transformer */}
        <Layer>
          <Transformer
            ref={transformerRef}
            rotateEnabled
            anchorSize={9}
            anchorCornerRadius={2}
            anchorStroke="#2544eb"
            anchorFill="#ffffff"
            borderStroke="#2544eb"
            rotateAnchorOffset={24}
            onTransformStart={() => useDesignerStore.getState().beginTransform()}
            onTransformEnd={handleTransformEnd}
            boundBoxFunc={(oldBox, newBox) =>
              newBox.width < 4 || newBox.height < 4 ? oldBox : newBox
            }
          />
        </Layer>
      </Stage>

      {/* Inline text editing */}
      {editingElement && editingElement.type === 'text' && (
        <TextEditOverlay
          value={editingElement.text}
          onCommit={(text) => {
            useDesignerStore
              .getState()
              .updateElement(editingElement.id, { text }, { history: true });
            setEditingTextId(null);
          }}
          onCancel={() => setEditingTextId(null)}
        />
      )}

      {/* Canvas toolbar overlays */}
      <div className="absolute left-3 top-3 flex flex-col gap-1.5">
        <button
          onClick={() => setShowGrid((v) => !v)}
          className={clsx(
            'flex h-8 w-8 items-center justify-center rounded-lg border shadow-card backdrop-blur transition-colors',
            showGrid
              ? 'border-gray-900 bg-gray-900 text-white'
              : 'border-gray-200 bg-white/90 text-gray-500 hover:text-gray-900',
          )}
          title="Toggle grid"
        >
          <Grid3x3 className="h-4 w-4" />
        </button>
      </div>

      {/* Status chip. Constrained to the viewport so it never wraps or clips. */}
      <div className="pointer-events-none absolute inset-x-3 bottom-3 flex justify-center">
        {overflow ? (
          <span className="flex max-w-full items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50/95 px-2.5 py-1.5 text-2xs font-medium text-amber-800 shadow-card backdrop-blur">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">Artwork extends past the safe print area</span>
          </span>
        ) : (
          <span className="max-w-full truncate whitespace-nowrap rounded-lg border border-gray-200 bg-white/90 px-2.5 py-1.5 text-2xs tabular text-gray-500 shadow-card backdrop-blur">
            {areaConfig.name} · {areaConfig.width}×{areaConfig.height}px
            {areaConfig.physicalWidthIn
              ? ` · ${areaConfig.physicalWidthIn}″×${areaConfig.physicalHeightIn}″`
              : ''}
            <span className="hidden sm:inline"> · hold Space to pan</span>
          </span>
        )}
      </div>
    </div>
  );
}

function TextEditOverlay({
  value,
  onCommit,
  onCancel,
}: {
  value: string;
  onCommit: (text: string) => void;
  onCancel: () => void;
}) {
  const [text, setText] = useState(value);
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-gray-950/40 p-6 backdrop-blur-[2px] animate-fade-in">
      <div className="w-full max-w-md rounded-xl bg-white p-4 shadow-overlay animate-scale-in">
        <p className="label">Edit text</p>
        <textarea
          autoFocus
          className="input min-h-24 font-medium"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) onCommit(text);
            if (e.key === 'Escape') onCancel();
          }}
        />
        <div className="mt-3 flex justify-end gap-2">
          <button className="btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-primary" onClick={() => onCommit(text)}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

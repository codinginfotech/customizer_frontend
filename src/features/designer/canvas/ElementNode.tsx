import { memo } from 'react';
import { Ellipse, Group, Image as KImage, Line, Rect, Text, TextPath } from 'react-konva';
import type Konva from 'konva';
import type { DesignElement, ShapeElement, ShadowEffect } from '@cpd/shared';
import { renderedText } from '@cpd/shared';
import { getCachedImage } from '../../../utils/areaRenderer';
import { elementSize } from '../../../utils/designMath';
import { layoutTextArc } from '../../../utils/textArc';

/** Konva shadow props from the shared shadow effect. */
function shadowProps(shadow: ShadowEffect | null | undefined) {
  if (!shadow) return {};
  return {
    shadowColor: shadow.color,
    shadowBlur: shadow.blur,
    shadowOffsetX: shadow.offsetX,
    shadowOffsetY: shadow.offsetY,
    shadowOpacity: shadow.opacity,
  };
}

function polygonPoints(sides: number, w: number, h: number): number[] {
  const pts: number[] = [];
  for (let i = 0; i < sides; i += 1) {
    const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
    pts.push(w / 2 + (w / 2) * Math.cos(angle), h / 2 + (h / 2) * Math.sin(angle));
  }
  return pts;
}

function starPoints(points: number, inner: number, w: number, h: number): number[] {
  const pts: number[] = [];
  for (let i = 0; i < points * 2; i += 1) {
    const angle = (Math.PI * i) / points - Math.PI / 2;
    const f = i % 2 === 0 ? 1 : inner;
    pts.push(w / 2 + (w / 2) * f * Math.cos(angle), h / 2 + (h / 2) * f * Math.sin(angle));
  }
  return pts;
}

function ShapeContent({ el }: { el: ShapeElement }) {
  const common = {
    fill: el.fill || undefined,
    stroke: el.stroke || undefined,
    strokeWidth: el.stroke ? el.strokeWidth : 0,
    ...shadowProps(el.shadow),
  };
  switch (el.shape) {
    case 'rect':
      return <Rect width={el.width} height={el.height} cornerRadius={el.cornerRadius} {...common} />;
    case 'circle':
      return (
        <Ellipse
          x={el.width / 2}
          y={el.height / 2}
          radiusX={el.width / 2}
          radiusY={el.height / 2}
          {...common}
        />
      );
    case 'triangle':
      return (
        <Line
          points={[el.width / 2, 0, el.width, el.height, 0, el.height]}
          closed
          {...common}
        />
      );
    case 'line':
      return (
        <Line
          points={[0, el.height / 2, el.width, el.height / 2]}
          stroke={el.stroke || el.fill}
          strokeWidth={Math.max(el.strokeWidth, 2)}
          lineCap="round"
        />
      );
    case 'polygon':
      return <Line points={polygonPoints(el.sides, el.width, el.height)} closed {...common} />;
    case 'star':
      return (
        <Line
          points={starPoints(el.points, el.innerRadiusRatio, el.width, el.height)}
          closed
          {...common}
        />
      );
    default:
      return null;
  }
}

interface ElementNodeProps {
  el: DesignElement;
  onSelect: (id: string, shiftKey: boolean) => void;
  onRegister: (id: string, node: Konva.Group | null) => void;
  onDragStart: (id: string) => void;
  onDragMove: (id: string, x: number, y: number) => void;
  onDragEnd: (id: string, x: number, y: number) => void;
  onTextDblClick?: (id: string) => void;
}

/**
 * One design element on the Konva stage. The outer Group carries position,
 * rotation and opacity (what the Transformer manipulates); the inner Group
 * applies horizontal/vertical flips around the element's own box.
 */
export const ElementNode = memo(function ElementNode({
  el,
  onSelect,
  onRegister,
  onDragStart,
  onDragMove,
  onDragEnd,
  onTextDblClick,
}: ElementNodeProps) {
  if (el.visible === false) return null;
  const { width, height } = elementSize(el);

  let content: JSX.Element | null = null;
  if (el.type === 'text') {
    const arc = el.text.includes('\n') ? null : layoutTextArc(el);
    const strokeExtras =
      el.stroke && el.strokeWidth > 0
        ? { stroke: el.stroke, strokeWidth: el.strokeWidth, fillAfterStrokeEnabled: true }
        : {};
    content = arc ? (
      <TextPath
        data={arc.pathData}
        text={renderedText(el).split('\n')[0]}
        fontFamily={el.fontFamily}
        fontSize={el.fontSize}
        fontStyle={`${el.fontStyle === 'italic' ? 'italic ' : ''}${el.fontWeight}`}
        letterSpacing={el.letterSpacing}
        fill={el.fill}
        {...strokeExtras}
        {...shadowProps(el.shadow)}
        listening={false}
      />
    ) : (
      <Text
        text={renderedText(el)}
        width={el.width}
        fontFamily={el.fontFamily}
        fontSize={el.fontSize}
        fontStyle={`${el.fontStyle === 'italic' ? 'italic ' : ''}${el.fontWeight}`}
        textDecoration={el.underline ? 'underline' : ''}
        letterSpacing={el.letterSpacing}
        lineHeight={el.lineHeight}
        align={el.align}
        fill={el.fill}
        {...strokeExtras}
        {...shadowProps(el.shadow)}
        listening={false}
      />
    );
  } else if (el.type === 'image') {
    const img = getCachedImage(el.src);
    content = img ? (
      <KImage
        image={img}
        width={el.width}
        height={el.height}
        crop={el.crop ? { x: el.crop.x, y: el.crop.y, width: el.crop.width, height: el.crop.height } : undefined}
        {...shadowProps(el.shadow)}
        listening={false}
      />
    ) : (
      <Rect
        width={el.width}
        height={el.height}
        fill="#f1f5f9"
        stroke="#cbd5e1"
        dash={[6, 4]}
        listening={false}
      />
    );
  } else if (el.type === 'shape') {
    content = <ShapeContent el={el} />;
  }

  return (
    <Group
      id={el.id}
      name="design-element"
      ref={(node) => onRegister(el.id, node)}
      x={el.x}
      y={el.y}
      rotation={el.rotation}
      opacity={el.opacity}
      draggable={!el.locked}
      onMouseDown={(e) => onSelect(el.id, e.evt.shiftKey)}
      onTap={() => onSelect(el.id, false)}
      onDragStart={() => onDragStart(el.id)}
      onDragMove={(e) => onDragMove(el.id, e.target.x(), e.target.y())}
      onDragEnd={(e) => onDragEnd(el.id, e.target.x(), e.target.y())}
      onDblClick={() => el.type === 'text' && onTextDblClick?.(el.id)}
      onDblTap={() => el.type === 'text' && onTextDblClick?.(el.id)}
    >
      {/* invisible hit rect so empty/sparse content is still selectable */}
      <Rect width={width} height={height} fill="transparent" />
      <Group
        x={el.flipX ? width : 0}
        y={el.flipY ? height : 0}
        scaleX={el.flipX ? -1 : 1}
        scaleY={el.flipY ? -1 : 1}
      >
        {content}
      </Group>
    </Group>
  );
});

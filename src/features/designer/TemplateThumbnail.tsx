import { useEffect, useRef } from 'react';
import type { DesignArea } from '@cpd/shared';
import type { DesignTemplate } from '../../types/catalog';
import { onImageLoaded, renderAreaToCanvas } from '../../utils/areaRenderer';

/** Renders a template's elements onto a small canvas thumbnail. */
export function TemplateThumbnail({ template }: { template: DesignTemplate }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    function draw() {
      const canvas = ref.current;
      if (!canvas) return;
      const { canvas: c, elements } = template.templateJson;
      const area: DesignArea = { areaKey: 'preview', elements: elements as DesignArea['elements'] };
      const scale = 140 / Math.max(c.width, c.height);
      renderAreaToCanvas(canvas, area, c.width, c.height, { background: '#ffffff', scale });
    }
    draw();
    return onImageLoaded(draw);
  }, [template]);

  if (template.previewImage) {
    return (
      <img
        src={template.previewImage}
        alt={template.name}
        className="aspect-square w-full bg-white object-contain"
        loading="lazy"
      />
    );
  }
  return <canvas ref={ref} className="aspect-square w-full bg-white object-contain" />;
}

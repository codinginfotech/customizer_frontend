/**
 * Product mockup SVGs mark their colorable regions with a sentinel fill —
 * either the literal token `#PRODUCTCOLOR` or the neutral default `#e9e5df`
 * (a valid color, so the same file also looks right as a plain <img> on
 * product cards). We fetch the SVG text, substitute the selected color, and
 * serve it as a data URL. Results are cached per (url,color).
 */
const cache = new Map<string, string>();
const svgTextCache = new Map<string, Promise<string>>();

const COLOR_TOKEN = /#PRODUCTCOLOR|#e9e5df/gi;

async function fetchSvgText(url: string): Promise<string> {
  let promise = svgTextCache.get(url);
  if (!promise) {
    promise = fetch(url).then((r) => {
      if (!r.ok) throw new Error(`Failed to load mockup ${url}`);
      return r.text();
    });
    svgTextCache.set(url, promise);
  }
  return promise;
}

export async function tintedMockupUrl(url: string, color: string): Promise<string> {
  const key = `${url}|${color}`;
  const cached = cache.get(key);
  if (cached) return cached;
  if (!url.endsWith('.svg')) return url; // raster mockups are used as-is
  try {
    const text = await fetchSvgText(url);
    const tinted = text.replace(COLOR_TOKEN, color);
    const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(tinted)}`;
    cache.set(key, dataUrl);
    return dataUrl;
  } catch {
    return url;
  }
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src.slice(0, 80)}`));
    img.src = src;
  });
}

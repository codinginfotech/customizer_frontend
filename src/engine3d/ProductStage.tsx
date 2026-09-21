import { Component, ReactNode, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { ContactShadows, OrbitControls, PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';
import toast from 'react-hot-toast';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { modelConfigurationSchema, type CameraView } from '@cpd/shared';
import { useDesignerStore } from '../stores/designerStore';
import { ProductModel } from './ProductModel';
import { PrimitiveModel } from '../features/designer/preview/PrimitiveModel';
import { CameraRig, LightingRig, viewToPosition, type CameraRequest } from './rigs';
import { MockupPreview } from '../features/designer/preview/MockupPreview';

const THUMB_VIEW_FALLBACKS: Record<string, CameraView> = {
  front: { azimuth: 0, polar: 82, zoom: 1 },
  right: { azimuth: 90, polar: 82, zoom: 1 },
  back: { azimuth: 180, polar: 82, zoom: 1 },
  left: { azimuth: -90, polar: 82, zoom: 1 },
};

/**
 * Captures small per-view renders (front/right/back/left) once the model is
 * framed — powering the preview panel's view-thumbnail strip. Renders happen
 * off-RAF into the live GL context and the camera is restored immediately,
 * so the user never sees the capture pass.
 */
function ViewThumbnailCapturer({
  modelUrl,
  fit,
  views,
}: {
  modelUrl: string;
  fit: { distance: number; center: THREE.Vector3 } | null;
  views: Record<string, CameraView>;
}) {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  const camera = useThree((s) => s.camera);
  const captured = useRef<string | null>(null);

  useEffect(() => {
    if (!fit || captured.current === modelUrl) return;
    const timer = setTimeout(() => {
      if (captured.current === modelUrl) return;
      captured.current = modelUrl;
      const savedPosition = camera.position.clone();
      const savedQuaternion = camera.quaternion.clone();
      const thumbs: Record<string, string> = {};
      for (const name of ['front', 'right', 'back', 'left']) {
        const view = views[name] ?? THUMB_VIEW_FALLBACKS[name];
        camera.position.copy(viewToPosition(view, fit.center, fit.distance));
        camera.lookAt(fit.center);
        gl.render(scene, camera);
        const source = gl.domElement;
        const thumb = document.createElement('canvas');
        const size = 132;
        thumb.width = size;
        thumb.height = size;
        const ctx = thumb.getContext('2d')!;
        const crop = Math.min(source.width, source.height);
        ctx.drawImage(source, (source.width - crop) / 2, (source.height - crop) / 2, crop, crop, 0, 0, size, size);
        thumbs[name] = thumb.toDataURL('image/webp', 0.8);
      }
      camera.position.copy(savedPosition);
      camera.quaternion.copy(savedQuaternion);
      useDesignerStore.getState().setViewThumbs(thumbs);
    }, 1400);
    return () => clearTimeout(timer);
  }, [fit, modelUrl, views, gl, scene, camera]);

  return null;
}

class ModelErrorBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

const FALLBACK_VIEW: CameraView = { azimuth: 28, polar: 78, zoom: 1 };

/**
 * The Product3DEngine stage: adaptive-quality canvas, configured lighting,
 * fitted camera with animated named views, part-click selection, and the
 * universal GLB renderer (primitives remain a dev/onboarding fallback only).
 */
export function ProductStage({ technicalView = false }: { technicalView?: boolean }) {
  const model = useDesignerStore((s) => s.product?.model ?? null);
  const cameraRequestState = useDesignerStore((s) => s.cameraRequest);
  const subject = useRef<THREE.Group | null>(null);
  const controls = useRef<OrbitControlsImpl | null>(null);
  const [dpr, setDpr] = useState<[number, number]>([1, 2]);
  const [autoRotate, setAutoRotate] = useState(true);
  const [fitDistance, setFitDistance] = useState(2.4);
  const [fitInfo, setFitInfo] = useState<{ distance: number; center: THREE.Vector3 } | null>(null);

  const config = useMemo(() => {
    if (!model) return null;
    const parsed = modelConfigurationSchema.safeParse(model.configuration);
    return parsed.success ? parsed.data : null;
  }, [model]);

  const request: CameraRequest | null = useMemo(() => {
    if (!cameraRequestState || !config) return null;
    const view = config.cameraViews[cameraRequestState.view] ?? FALLBACK_VIEW;
    return { view, nonce: cameraRequestState.nonce, instant: cameraRequestState.instant };
  }, [cameraRequestState, config]);

  if (!model || !config) return <MockupPreview />;

  function handlePartClick(info: { mesh: string; areaKey: string | null; label: string | null }) {
    const state = useDesignerStore.getState();
    let areaKey = info.areaKey;
    if (!areaKey && info.label) {
      const byLabel = state.product?.printAreas.find(
        (a) => a.name.toLowerCase() === info.label!.toLowerCase(),
      );
      areaKey = byLabel?.key ?? null;
    }
    if (areaKey && areaKey !== state.activeAreaKey) {
      state.setActiveArea(areaKey);
      const areaName = state.product?.printAreas.find((a) => a.key === areaKey)?.name ?? areaKey;
      toast(`Editing: ${areaName}`, { duration: 1400, icon: '🎯' });
    } else if (info.label && !areaKey) {
      toast(info.label, { duration: 1000 });
    }
  }

  return (
    <div className="relative h-full w-full">
      <ModelErrorBoundary fallback={<MockupPreview />}>
        <Canvas
          shadows
          dpr={dpr}
          camera={{ position: [1.2, 0.8, 2.6], fov: 38 }}
          gl={{ antialias: true, preserveDrawingBuffer: true }}
          className="!touch-none"
        >
          <PerformanceMonitor
            onDecline={() => setDpr([1, 1.25])}
            onIncline={() => setDpr([1, 2])}
          />
          <LightingRig preset={config.lighting} />
          <Suspense fallback={null}>
            <group ref={subject}>
              {model.modelType === 'GLTF' && model.modelUrl ? (
                <ProductModel
                  url={model.modelUrl}
                  config={config}
                  technicalView={technicalView}
                  onPartClick={handlePartClick}
                />
              ) : (
                <PrimitiveModel config={config} />
              )}
            </group>
            <ContactShadows position={[0, -0.95, 0]} opacity={0.45} scale={8} blur={2.6} far={2.4} />
          </Suspense>
          <OrbitControls
            ref={controls as never}
            enablePan
            enableDamping
            dampingFactor={0.08}
            autoRotate={autoRotate}
            autoRotateSpeed={0.9}
            onStart={() => setAutoRotate(false)}
            minDistance={fitDistance * 0.35}
            maxDistance={fitDistance * 3}
          />
          <CameraRig
            subject={subject}
            controls={controls}
            request={request}
            onFitted={(distance, center) => {
              setFitDistance(distance);
              setFitInfo({ distance, center });
            }}
          />
          {model.modelType === 'GLTF' && model.modelUrl && (
            <ViewThumbnailCapturer modelUrl={model.modelUrl} fit={fitInfo} views={config.cameraViews} />
          )}
        </Canvas>
      </ModelErrorBoundary>
      <span className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-medium text-white/70 backdrop-blur">
        Drag to rotate · scroll to zoom · click a part to edit it
      </span>
    </div>
  );
}

/** Screenshot of the current 3D framing (used for thumbnails/previews). */
export function captureStageScreenshot(container: HTMLElement | null): string | null {
  const canvas = container?.querySelector('canvas');
  if (!canvas) return null;
  try {
    return canvas.toDataURL('image/webp', 0.85);
  } catch {
    return null;
  }
}

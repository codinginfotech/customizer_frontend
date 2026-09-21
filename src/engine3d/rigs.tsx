import { MutableRefObject, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import type { CameraView, LightingPreset } from '@cpd/shared';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

/**
 * EnvironmentManager — procedural studio environment (RoomEnvironment baked
 * via PMREM). Fully local; no runtime network fetches (§30).
 */
export function StudioEnvironment({ intensity = 1 }: { intensity?: number }) {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const target = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = target.texture;
    return () => {
      scene.environment = null;
      target.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  useEffect(() => {
    scene.environmentIntensity = intensity;
    return () => {
      scene.environmentIntensity = 1;
    };
  }, [scene, intensity]);
  return null;
}

/** LightingManager — named studio presets from product configuration (§29). */
const LIGHTING_PRESETS: Record<LightingPreset, { env: number; key: number; fill: number; rim: number }> = {
  studio: { env: 1.0, key: 0.85, fill: 0.15, rim: 0.35 },
  soft: { env: 1.15, key: 0.45, fill: 0.25, rim: 0.15 },
  product: { env: 1.0, key: 0.8, fill: 0.3, rim: 0.45 },
  high_contrast: { env: 0.5, key: 1.5, fill: 0.05, rim: 0.6 },
  neutral: { env: 1.0, key: 0.35, fill: 0.2, rim: 0.0 },
  dark_studio: { env: 0.35, key: 0.95, fill: 0.05, rim: 0.65 },
};

export function LightingRig({ preset = 'studio' }: { preset?: LightingPreset }) {
  const p = LIGHTING_PRESETS[preset] ?? LIGHTING_PRESETS.studio;
  return (
    <>
      <StudioEnvironment intensity={p.env} />
      <directionalLight
        position={[3, 6, 4]}
        intensity={p.key}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0002}
      />
      {p.fill > 0 && <directionalLight position={[-4, 2, 3]} intensity={p.fill} />}
      {p.rim > 0 && <directionalLight position={[-2, 4, -5]} intensity={p.rim} />}
    </>
  );
}

/**
 * CameraManager — frames the loaded product from its bounding sphere and
 * animates smoothly between named orbit views (front/back/left/right/top/…).
 * A user drag cancels any in-flight transition; nothing ever teleports (§12).
 */
export interface CameraRequest {
  view: CameraView;
  nonce: number;
  instant?: boolean;
}

interface CameraRigProps {
  subject: MutableRefObject<THREE.Group | null>;
  controls: MutableRefObject<OrbitControlsImpl | null>;
  request: CameraRequest | null;
  /** Called once the model is measured — fit distance + center for framing. */
  onFitted?: (fitDistance: number, center: THREE.Vector3) => void;
}

export function viewToPosition(view: CameraView, center: THREE.Vector3, fit: number): THREE.Vector3 {
  const r = fit * (view.zoom ?? 1);
  const polar = THREE.MathUtils.degToRad(view.polar ?? 80);
  const azimuth = THREE.MathUtils.degToRad(view.azimuth);
  return new THREE.Vector3(
    center.x + r * Math.sin(polar) * Math.sin(azimuth),
    center.y + r * Math.cos(polar),
    center.z + r * Math.sin(polar) * Math.cos(azimuth),
  );
}

export function CameraRig({ subject, controls, request, onFitted }: CameraRigProps) {
  const camera = useThree((s) => s.camera);
  const fitted = useRef<{ center: THREE.Vector3; fit: number } | null>(null);
  const goal = useRef<{ position: THREE.Vector3; nonce: number } | null>(null);
  const [, setReady] = useState(false);

  // Cancel transitions on user interaction.
  useEffect(() => {
    const c = controls.current;
    if (!c) return;
    const cancel = () => {
      goal.current = null;
    };
    c.addEventListener('start', cancel);
    return () => c.removeEventListener('start', cancel);
  });

  useFrame((_, delta) => {
    const group = subject.current;
    if (!group) return;

    if (!fitted.current && group.children.length > 0) {
      const box = new THREE.Box3().setFromObject(group);
      if (!box.isEmpty()) {
        const sphere = box.getBoundingSphere(new THREE.Sphere());
        const fov = THREE.MathUtils.degToRad((camera as THREE.PerspectiveCamera).fov ?? 38);
        const fit = (sphere.radius / Math.sin(fov / 2)) * 1.12;
        fitted.current = { center: sphere.center.clone(), fit };
        onFitted?.(fit, sphere.center.clone());
        setReady(true);
      }
    }
    const fit = fitted.current;
    if (!fit) return;

    if (request && goal.current?.nonce !== request.nonce) {
      const position = viewToPosition(request.view, fit.center, fit.fit);
      if (request.instant) {
        camera.position.copy(position);
        controls.current?.target.copy(fit.center);
        controls.current?.update();
        goal.current = { position, nonce: request.nonce };
      } else {
        goal.current = { position, nonce: request.nonce };
      }
    }

    if (goal.current) {
      const lambda = 5.5;
      camera.position.x = THREE.MathUtils.damp(camera.position.x, goal.current.position.x, lambda, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, goal.current.position.y, lambda, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, goal.current.position.z, lambda, delta);
      const c = controls.current;
      if (c) {
        c.target.x = THREE.MathUtils.damp(c.target.x, fit.center.x, lambda, delta);
        c.target.y = THREE.MathUtils.damp(c.target.y, fit.center.y, lambda, delta);
        c.target.z = THREE.MathUtils.damp(c.target.z, fit.center.z, lambda, delta);
        c.update();
      }
      if (camera.position.distanceTo(goal.current.position) < 0.004) {
        goal.current = null;
      }
    }
  });

  return null;
}

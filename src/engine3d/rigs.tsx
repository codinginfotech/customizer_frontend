import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import type { CameraView, LightingPreset } from '@cpd/shared';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

/* -------------------------------------------------------------------------- *
 * Studio environment
 *
 * Product photography reads as "real" mostly because of what the surface
 * reflects: broad, soft, rectangular sources with falloff — not point lights.
 * Three's RoomEnvironment is a grey box, which gives fabric a flat, plasticky
 * response. So we build an actual softbox rig as a small scene of emissive
 * planes and bake it through PMREM. Still fully local — no HDRI download
 * (§30) — but it produces the elongated specular roll-off that sells sheen.
 * -------------------------------------------------------------------------- */

interface Softbox {
  /** width, height of the emitter */
  size: [number, number];
  position: [number, number, number];
  /** linear radiance — values above 1 are intentional (the PMREM target is HDR) */
  intensity: number;
  color: string;
}

/** A four-source softbox rig, scaled for a ~1.2m subject at the origin. */
const SOFTBOXES: Softbox[] = [
  // Key — large, high, camera-right/front. Does most of the shaping.
  { size: [5, 7], position: [5.5, 3.4, 5.2], intensity: 5.2, color: '#fff6ec' },
  // Fill — broader and dimmer on the opposite side, slightly cool.
  { size: [7, 7], position: [-6.2, 1.6, 4.2], intensity: 1.5, color: '#e8eefc' },
  // Rim / kicker — narrow strip behind, separates the subject from the ground.
  { size: [1.6, 9], position: [-3.6, 4.2, -6.5], intensity: 6.5, color: '#ffffff' },
  // Overhead bounce — fills shoulders and upward-facing surfaces.
  { size: [9, 9], position: [0, 7.5, 0.5], intensity: 1.1, color: '#ffffff' },
];

/**
 * Builds the environment scene. Emitters use MeshBasicMaterial so their colour
 * *is* their radiance — PMREM samples them directly, no lighting pass needed.
 */
function buildStudioScene(): { scene: THREE.Scene; dispose: () => void } {
  const scene = new THREE.Scene();
  const disposables: Array<{ dispose: () => void }> = [];

  // Surrounding shell, so nothing ever reflects pure black.
  const shellGeo = new THREE.BoxGeometry(30, 30, 30);
  const shellMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color('#0f1013'),
    side: THREE.BackSide,
  });
  scene.add(new THREE.Mesh(shellGeo, shellMat));
  disposables.push(shellGeo, shellMat);

  // Dim warm floor bounce — keeps the underside from going dead.
  const floorGeo = new THREE.PlaneGeometry(24, 24);
  const floorMat = new THREE.MeshBasicMaterial({ color: new THREE.Color('#2a2622') });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -6;
  scene.add(floor);
  disposables.push(floorGeo, floorMat);

  for (const box of SOFTBOXES) {
    const geo = new THREE.PlaneGeometry(box.size[0], box.size[1]);
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(box.color).multiplyScalar(box.intensity),
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(...box.position);
    mesh.lookAt(0, 0, 0);
    scene.add(mesh);
    disposables.push(geo, mat);
  }

  return { scene, dispose: () => disposables.forEach((d) => d.dispose()) };
}

export function StudioEnvironment({ intensity = 1 }: { intensity?: number }) {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const studio = buildStudioScene();
    // A low sigma keeps softbox shapes readable in the sharper reflections.
    const target = pmrem.fromScene(studio.scene, 0.02, 0.1, 60);
    scene.environment = target.texture;
    studio.dispose();
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

/* -------------------------------------------------------------------------- *
 * Lighting presets
 * -------------------------------------------------------------------------- */

interface LightingParams {
  env: number;
  key: number;
  fill: number;
  rim: number;
  /** Renderer exposure — the preset's overall "stop". */
  exposure: number;
}

const LIGHTING_PRESETS: Record<LightingPreset, LightingParams> = {
  studio: { env: 1.0, key: 1.5, fill: 0.25, rim: 0.6, exposure: 1.15 },
  soft: { env: 1.2, key: 0.8, fill: 0.4, rim: 0.25, exposure: 1.2 },
  product: { env: 1.05, key: 1.4, fill: 0.45, rim: 0.7, exposure: 1.1 },
  high_contrast: { env: 0.55, key: 2.6, fill: 0.08, rim: 1.0, exposure: 1.0 },
  neutral: { env: 1.1, key: 0.6, fill: 0.35, rim: 0.0, exposure: 1.15 },
  dark_studio: { env: 0.4, key: 1.7, fill: 0.08, rim: 1.1, exposure: 1.05 },
};

/** Drives renderer exposure from the active preset. */
function ExposureRig({ exposure }: { exposure: number }) {
  const gl = useThree((s) => s.gl);
  useEffect(() => {
    const previous = gl.toneMappingExposure;
    gl.toneMappingExposure = exposure;
    return () => {
      gl.toneMappingExposure = previous;
    };
  }, [gl, exposure]);
  return null;
}

export function LightingRig({ preset = 'studio' }: { preset?: LightingPreset }) {
  const p = LIGHTING_PRESETS[preset] ?? LIGHTING_PRESETS.studio;

  // A tight shadow frustum around the subject keeps the contact shadow crisp
  // instead of the mushy default 100-unit box.
  const shadowCam = useMemo(() => ({ near: 0.5, far: 20, extent: 3 }), []);

  return (
    <>
      <StudioEnvironment intensity={p.env} />
      <ExposureRig exposure={p.exposure} />
      <directionalLight
        position={[3.2, 5.4, 4.2]}
        intensity={p.key}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
        shadow-camera-near={shadowCam.near}
        shadow-camera-far={shadowCam.far}
        shadow-camera-left={-shadowCam.extent}
        shadow-camera-right={shadowCam.extent}
        shadow-camera-top={shadowCam.extent}
        shadow-camera-bottom={-shadowCam.extent}
      />
      {p.fill > 0 && <directionalLight position={[-4.5, 1.8, 3.4]} intensity={p.fill} />}
      {p.rim > 0 && <directionalLight position={[-2.4, 3.6, -5.2]} intensity={p.rim} />}
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
  const settleCounter = useRef(0);
  const userTookOver = useRef(false);
  const handledNonce = useRef<number | null>(null);
  const [, setReady] = useState(false);

  // Cancel transitions on user interaction — and never auto-frame again once
  // the user has taken the camera, or re-fitting fights every drag.
  useEffect(() => {
    const c = controls.current;
    if (!c) return;
    const cancel = () => {
      goal.current = null;
      userTookOver.current = true;
    };
    c.addEventListener('start', cancel);
    return () => c.removeEventListener('start', cancel);
  });

  useFrame((_, delta) => {
    const group = subject.current;
    if (!group) return;

    // Re-measure periodically, not just once. A model's real size only exists
    // after its geometry has loaded AND any import transform has been baked,
    // and glTF materials/textures can resolve later still. Fitting once on the
    // first frame that has children left imported assets framed for their
    // pre-transform size — i.e. zoomed into the hem.
    // …but only while the model is still settling, and never after the user
    // has grabbed the camera. An always-on re-fit re-frames mid-drag, which
    // reads as "I can't rotate it".
    settleCounter.current += 1;
    const settling = settleCounter.current < 240; // ~4s at 60fps
    const shouldMeasure =
      !userTookOver.current && (!fitted.current || (settling && settleCounter.current % 20 === 0));
    if (shouldMeasure && group.children.length > 0) {
      const box = new THREE.Box3().setFromObject(group);
      if (!box.isEmpty()) {
        const sphere = box.getBoundingSphere(new THREE.Sphere());
        const cam = camera as THREE.PerspectiveCamera;
        const vFov = THREE.MathUtils.degToRad(cam.fov ?? 38);
        // The preview dock is portrait, so its horizontal field of view is the
        // narrower of the two. Fitting to the vertical FOV alone frames a tall
        // garment correctly but runs a wide product — a plate, a box, a mug —
        // straight off both sides of the panel.
        const hFov = 2 * Math.atan(Math.tan(vFov / 2) * (cam.aspect || 1));
        const fit = (sphere.radius / Math.sin(Math.min(vFov, hFov) / 2)) * 1.12;
        const previous = fitted.current;
        // Only re-frame on a material change, so this never fights the user's
        // orbiting or a camera transition already in flight.
        const changed =
          !previous ||
          Math.abs(fit - previous.fit) / Math.max(fit, previous.fit) > 0.05 ||
          previous.center.distanceTo(sphere.center) > sphere.radius * 0.1;
        if (changed) {
          fitted.current = { center: sphere.center.clone(), fit };
          onFitted?.(fit, sphere.center.clone());
          if (previous) {
            // Already framed once — glide to the corrected framing.
            const view: CameraView = { azimuth: 28, polar: 78, zoom: 1 };
            goal.current = {
              position: viewToPosition(view, sphere.center, fit),
              nonce: -settleCounter.current,
            };
          }
          setReady(true);
        }
      }
    }
    const fit = fitted.current;
    if (!fit) return;

    // Track the handled nonce separately from the live goal. Testing
    // `goal.current?.nonce` instead meant that as soon as the transition
    // finished and cleared the goal, the next frame saw `undefined !== nonce`
    // and re-issued it — re-targeting the same view forever and undoing every
    // drag, so the product could never be orbited away from a named view.
    if (request && handledNonce.current !== request.nonce) {
      handledNonce.current = request.nonce;
      const position = viewToPosition(request.view, fit.center, fit.fit);
      if (request.instant) {
        camera.position.copy(position);
        controls.current?.target.copy(fit.center);
        controls.current?.update();
        goal.current = null;
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

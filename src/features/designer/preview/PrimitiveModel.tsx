import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';
import type { ModelConfiguration } from '@cpd/shared';
import { useDesignerStore } from '../../../stores/designerStore';
import { useAreaTextures } from './useAreaTextures';

/**
 * Parametric placeholder models for products without an uploaded GLB.
 * Each primitive kind exposes named "meshes" that mesh bindings map print
 * areas onto — the same contract a real GLTF model uses, so replacing a
 * primitive with a GLB later is purely a data change.
 */

interface PartProps {
  texture?: THREE.CanvasTexture;
  color: string;
  metalness: number;
  roughness: number;
}

function panelMaterial({ texture, color, metalness, roughness }: PartProps) {
  return (
    <meshStandardMaterial
      map={texture ?? undefined}
      color={texture ? '#ffffff' : color}
      metalness={metalness}
      roughness={roughness}
    />
  );
}

interface ApparelProps {
  W: number;
  H: number;
  D: number;
  productColor: string;
  roughness: number;
  texFor: (mesh: string) => THREE.CanvasTexture | undefined;
}

/**
 * Garment torso built from an extruded 2D outline — sloped shoulders, neck
 * dip, gentle waist taper and a curved hem — with beveled edges and tapered
 * cylindrical sleeves. Reads as a shirt from every orbit angle.
 */
function ApparelModel({ W, H, D, productColor, roughness, texFor }: ApparelProps) {
  const torsoGeometry = useMemo(() => {
    const s = new THREE.Shape();
    const w = W / 2;
    const h = H / 2;
    s.moveTo(-0.17 * W, h * 0.96); // left neck point
    s.quadraticCurveTo(0, h * 0.78, 0.17 * W, h * 0.96); // neck dip
    s.lineTo(w * 0.98, h * 0.78); // right shoulder tip
    s.lineTo(w * 0.88, h * 0.28); // right armpit
    s.quadraticCurveTo(w * 0.82, -h * 0.2, w * 0.9, -h * 0.9); // right side (waist taper)
    s.quadraticCurveTo(0, -h * 1.02, -w * 0.9, -h * 0.9); // curved hem
    s.quadraticCurveTo(-w * 0.82, -h * 0.2, -w * 0.88, h * 0.28); // left side
    s.lineTo(-w * 0.98, h * 0.78); // left shoulder tip
    s.closePath();
    const geometry = new THREE.ExtrudeGeometry(s, {
      depth: D * 0.72,
      bevelEnabled: true,
      bevelThickness: D * 0.14,
      bevelSize: D * 0.14,
      bevelSegments: 5,
      curveSegments: 24,
    });
    geometry.translate(0, 0, -D * 0.36);
    geometry.computeVertexNormals();
    return geometry;
  }, [W, H, D]);

  useEffect(() => () => torsoGeometry.dispose(), [torsoGeometry]);

  const fabric = { color: productColor, metalness: 0, roughness };
  const frontZ = D * 0.36 + D * 0.14; // extrude half-depth + bevel
  const sleeveLen = H * 0.34;
  const sleeveR = W * 0.15;

  const sleeve = (side: -1 | 1, texture?: THREE.CanvasTexture) => (
    <group
      position={[side * W * 0.9, H * 0.34, 0]}
      rotation={[0, 0, side * -0.85]}
    >
      {/* tapered upper-arm sleeve, slightly flattened front-to-back */}
      <mesh castShadow scale={[1, 1, 0.78]} position={[0, -sleeveLen * 0.4, 0]}>
        <cylinderGeometry args={[sleeveR, sleeveR * 0.86, sleeveLen, 24]} />
        <meshStandardMaterial {...fabric} />
      </mesh>
      <mesh position={[0, -sleeveLen * 0.9, 0]} scale={[1, 1, 0.78]}>
        <cylinderGeometry args={[sleeveR * 0.86, sleeveR * 0.86, 0.02, 24]} />
        <meshStandardMaterial color={productColor} roughness={roughness} />
      </mesh>
      {/* sleeve print panel */}
      {texture && (
        <mesh position={[0, -sleeveLen * 0.42, sleeveR * 0.78 + 0.004]}>
          <planeGeometry args={[sleeveR * 1.35, sleeveLen * 0.72]} />
          <meshStandardMaterial map={texture} metalness={0} roughness={roughness} />
        </mesh>
      )}
    </group>
  );

  return (
    <group>
      <mesh geometry={torsoGeometry} castShadow>
        <meshStandardMaterial {...fabric} />
      </mesh>
      {/* ribbed collar following the neckline */}
      <mesh position={[0, H * 0.44, 0]} rotation={[1.25, 0, 0]}>
        <torusGeometry args={[W * 0.175, 0.026, 12, 48]} />
        <meshStandardMaterial color={productColor} roughness={Math.min(1, roughness + 0.05)} />
      </mesh>
      {sleeve(-1, texFor('left_sleeve'))}
      {sleeve(1, texFor('right_sleeve'))}
      {/* front / back / pocket design panels */}
      <mesh position={[0, -H * 0.06, frontZ + 0.005]}>
        <planeGeometry args={[W * 0.78, H * 0.84]} />
        {panelMaterial({ color: productColor, metalness: 0, roughness, texture: texFor('front') })}
      </mesh>
      <mesh position={[0, -H * 0.04, -(frontZ + 0.005)]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[W * 0.78, H * 0.86]} />
        {panelMaterial({ color: productColor, metalness: 0, roughness, texture: texFor('back') })}
      </mesh>
      {texFor('pocket') && (
        <mesh position={[0, -H * 0.3, frontZ + 0.009]}>
          <planeGeometry args={[W * 0.52, H * 0.19]} />
          {panelMaterial({ color: productColor, metalness: 0, roughness, texture: texFor('pocket') })}
        </mesh>
      )}
    </group>
  );
}

export function PrimitiveModel({ config }: { config: ModelConfiguration }) {
  const productColor = useDesignerStore((s) => s.productColor);
  const areaKeys = useMemo(
    () => config.meshBindings.map((b) => b.areaKey),
    [config.meshBindings],
  );
  const textures = useAreaTextures(areaKeys);

  const texFor = (meshName: string) => {
    const binding = config.meshBindings.find((b) => b.mesh === meshName);
    return binding ? textures.get(binding.areaKey) : undefined;
  };

  const kind = config.primitive?.kind ?? 'flat';
  const W = config.primitive?.width ?? 1;
  const H = config.primitive?.height ?? 1;
  const D = config.primitive?.depth ?? 0.3;
  const mat = { color: productColor, metalness: config.metalness, roughness: config.roughness };

  switch (kind) {
    case 'apparel':
      return (
        <ApparelModel
          W={W}
          H={H}
          D={D}
          productColor={productColor}
          roughness={config.roughness}
          texFor={texFor}
        />
      );

    case 'mug': {
      const r = W / 2;
      // Glazed-ceramic finish: clearcoat + env reflections make the glaze
      // read as real porcelain, especially on dark colors.
      const ceramic = { clearcoat: 0.9, clearcoatRoughness: 0.22, roughness: 0.32, metalness: 0.0 };
      return (
        <group>
          {/* printable wrap (leaves a seam gap by the handle) */}
          <mesh castShadow>
            <cylinderGeometry args={[r, r * 0.96, H, 64, 1, true, Math.PI * 0.08, Math.PI * 1.84]} />
            <meshPhysicalMaterial
              map={texFor('body')}
              color={texFor('body') ? '#ffffff' : productColor}
              {...ceramic}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* seam strip + inner wall */}
          <mesh>
            <cylinderGeometry args={[r - 0.003, r * 0.96 - 0.003, H, 64, 1, true]} />
            <meshPhysicalMaterial color={productColor} {...ceramic} side={THREE.DoubleSide} />
          </mesh>
          {/* rolled rim */}
          <mesh position={[0, H / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[r - 0.012, 0.016, 16, 64]} />
            <meshPhysicalMaterial color={productColor} {...ceramic} />
          </mesh>
          {/* coffee-colored inside surface */}
          <mesh position={[0, H / 2 - 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[r - 0.03, 48]} />
            <meshStandardMaterial color="#241a12" roughness={0.25} />
          </mesh>
          {/* rounded base edge + bottom */}
          <mesh position={[0, -H / 2 + 0.015, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[r * 0.96 - 0.016, 0.018, 16, 64]} />
            <meshPhysicalMaterial color={productColor} {...ceramic} />
          </mesh>
          <mesh position={[0, -H / 2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[r * 0.96, 48]} />
            <meshPhysicalMaterial color={productColor} {...ceramic} />
          </mesh>
          {/* handle: vertical half-torus bulging out on +x, opening toward the mug */}
          <mesh position={[r + 0.02, 0, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow>
            <torusGeometry args={[H * 0.28, 0.048, 18, 48, Math.PI]} />
            <meshPhysicalMaterial color={productColor} {...ceramic} />
          </mesh>
        </group>
      );
    }

    case 'bottle':
    case 'cylinder': {
      const r = W / 2;
      const bodyH = kind === 'bottle' ? H * 0.62 : H;
      const labelH = bodyH * 0.75;
      const front = texFor('front') ?? texFor('body') ?? texFor('wrap');
      const back = texFor('back');
      return (
        <group>
          <mesh castShadow>
            <cylinderGeometry args={[r, r, bodyH, 48]} />
            <meshStandardMaterial color={productColor} metalness={mat.metalness} roughness={mat.roughness} />
          </mesh>
          {front && (
            <mesh position={[0, kind === 'bottle' ? -H * 0.08 : 0, 0]}>
              <cylinderGeometry
                args={[r + 0.003, r + 0.003, labelH, 48, 1, true, Math.PI * 1.28, Math.PI * 0.94]}
              />
              <meshStandardMaterial map={front} metalness={0.05} roughness={0.6} side={THREE.DoubleSide} transparent />
            </mesh>
          )}
          {back && (
            <mesh position={[0, kind === 'bottle' ? -H * 0.08 : 0, 0]}>
              <cylinderGeometry
                args={[r + 0.003, r + 0.003, labelH, 48, 1, true, Math.PI * 0.28, Math.PI * 0.94]}
              />
              <meshStandardMaterial map={back} metalness={0.05} roughness={0.6} side={THREE.DoubleSide} transparent />
            </mesh>
          )}
          {kind === 'bottle' && (
            <>
              <mesh position={[0, bodyH / 2 + H * 0.09, 0]}>
                <cylinderGeometry args={[r * 0.55, r, H * 0.18, 48]} />
                <meshStandardMaterial color={productColor} metalness={mat.metalness} roughness={mat.roughness} />
              </mesh>
              <mesh position={[0, bodyH / 2 + H * 0.24, 0]} castShadow>
                <cylinderGeometry args={[r * 0.42, r * 0.42, H * 0.14, 32]} />
                <meshStandardMaterial color="#2b2f36" metalness={0.3} roughness={0.5} />
              </mesh>
            </>
          )}
        </group>
      );
    }

    case 'pan': {
      const r = W / 2;
      return (
        <group rotation={[-1.15, 0, 0]}>
          {/* body (shallow open cylinder) */}
          <mesh castShadow>
            <cylinderGeometry args={[r, r * 0.94, H, 48, 1, true]} />
            <meshStandardMaterial color={productColor} metalness={0.5} roughness={0.45} side={THREE.DoubleSide} />
          </mesh>
          {/* printable base (underside, facing the camera thanks to tilt) */}
          <mesh position={[0, -H / 2 - 0.001, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <circleGeometry args={[r * 0.94, 48]} />
            <meshStandardMaterial
              map={texFor('base')}
              color={texFor('base') ? '#ffffff' : productColor}
              metalness={0.25}
              roughness={0.55}
            />
          </mesh>
          {/* inner surface */}
          <mesh position={[0, -H / 2 + 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[r * 0.93, 48]} />
            <meshStandardMaterial color="#3a3f45" metalness={0.35} roughness={0.5} />
          </mesh>
          {/* handle */}
          <mesh position={[r + W * 0.32, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <capsuleGeometry args={[0.045, W * 0.55, 6, 14]} />
            <meshStandardMaterial color="#1c1e22" roughness={0.7} />
          </mesh>
        </group>
      );
    }

    case 'box':
    case 'flat':
    default: {
      const designMesh = config.meshBindings[0]?.mesh ?? 'front';
      return (
        <group>
          <RoundedBox args={[W, H, Math.max(D, 0.04)]} radius={Math.min(0.05, D / 2)} smoothness={3} castShadow>
            {panelMaterial({ ...mat })}
          </RoundedBox>
          <mesh position={[0, 0, Math.max(D, 0.04) / 2 + 0.003]}>
            <planeGeometry args={[W * 0.94, H * 0.94]} />
            {panelMaterial({ ...mat, texture: texFor(designMesh) })}
          </mesh>
        </group>
      );
    }
  }
}

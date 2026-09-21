import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import type { ModelConfiguration } from '@cpd/shared';
import { useDesignerStore } from '../../../stores/designerStore';
import { meshKey } from '../../../engine3d/meshNames';
import { useAreaTextures } from './useAreaTextures';

/**
 * Real product models: loads a GLB/GLTF uploaded by an admin and applies
 * the design textures to the meshes named in the model configuration.
 *
 * Contract for model authors:
 *  - Meshes listed in `meshBindings` receive the design texture for their
 *    print area (the mesh's UVs decide how the area canvas wraps).
 *  - Meshes listed in `colorMeshes` are tinted with the selected color.
 */
export function GltfModel({ url, config }: { url: string; config: ModelConfiguration }) {
  const { scene } = useGLTF(url);
  const productColor = useDesignerStore((s) => s.productColor);
  const areaKeys = useMemo(() => config.meshBindings.map((b) => b.areaKey), [config.meshBindings]);
  const textures = useAreaTextures(areaKeys);

  // Clone so repeated mounts/color changes never mutate the GLTF cache.
  const cloned = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    cloned.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return;
      obj.castShadow = true;
      const name = meshKey(obj.name);
      const binding = config.meshBindings.find((b) => meshKey(b.mesh) === name);
      if (binding) {
        const texture = textures.get(binding.areaKey);
        if (texture) {
          texture.flipY = false; // GLTF UV convention
          obj.material = new THREE.MeshStandardMaterial({
            map: texture,
            metalness: config.metalness,
            roughness: config.roughness,
          });
        }
      } else if (config.colorMeshes.some((m) => meshKey(m) === name)) {
        const material = (obj.material as THREE.MeshStandardMaterial).clone();
        material.color = new THREE.Color(productColor);
        obj.material = material;
      }
    });
  }, [cloned, config, textures, productColor]);

  return <primitive object={cloned} />;
}

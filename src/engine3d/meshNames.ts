import { PropertyBinding } from 'three';

/**
 * GLTFLoader passes every node name through `PropertyBinding.sanitizeNodeName`,
 * which turns whitespace into underscores and strips the characters reserved by
 * the animation-binding syntax. A mesh authored as `PAnts High ply_0_node007__0`
 * therefore arrives as `PAnts_High_ply_0_node007__0`, while the model
 * configuration — generated from the raw glTF — still holds the original.
 *
 * Comparing the two directly fails silently: the mesh falls out of
 * `colorMeshes`, `materials` and `meshBindings` at once, so the garment keeps
 * its baked appearance and never takes the selected product colour.
 *
 * Normalise both sides through this before matching. Sanitising an already
 * sanitised name is a no-op, so runtime names can be passed through too.
 */
export function meshKey(name: string | null | undefined): string {
  return name ? PropertyBinding.sanitizeNodeName(name) : '';
}

/** Re-key a configuration record whose keys are raw glTF mesh names. */
export function byMeshKey<T>(record: Record<string, T> | undefined): Map<string, T> {
  const map = new Map<string, T>();
  for (const [mesh, value] of Object.entries(record ?? {})) map.set(meshKey(mesh), value);
  return map;
}

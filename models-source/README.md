# Raw model sources

Unprocessed GLB downloads that the rigged models in `public/models/` were
built from. Kept for re-rigging; nothing serves or ships this folder
(it is outside `public/` and listed in `.dockerignore`).

To turn one into a product model, run the auto-rigger in the app, then:

    npx tsx backend/tools/apply-rig.ts <slug> /models/<name>.glb <rig.json>

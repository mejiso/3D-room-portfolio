# Blender Model Export

Export `sofiaroomblend.blend` from Blender as:

```text
public/models/sofiaroom.glb
```

Recommended Blender export settings:

- Format: `glTF Binary (.glb)`
- Include: `Selected Objects` off, unless you intentionally select the full room
- Transform: `+Y Up` / default glTF orientation
- Geometry: apply modifiers
- Materials: export materials
- Images: automatic or embedded

After the file exists at that path, create `.env.local` in the project root with:

```text
VITE_ROOM_MODEL_URL=/models/sofiaroom.glb
```

Restart the Vite dev server. The app will then use your Blender room instead of the procedural fallback room.

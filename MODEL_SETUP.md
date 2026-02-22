# 3D Model Setup Instructions

## How to Add the F1 Car Model

1. **Download an F1 Car Model**
   - Visit https://sketchfab.com/ or https://free3d.com/
   - Search for "F1 car" or "Formula 1 car"
   - Download a model in GLB format (preferably with a CC0 or commercial license)

2. **Model Requirements**
   - Format: GLB (Binary glTF)
   - Filename: f1-car.glb
   - Size: Under 10MB for web performance

3. **Placement**
   - Save the file to: `/public/models/f1-car.glb`

4. **Model Structure (Optional)**
   For best results, the model should have meshes named:
   - `body` or `chassis` - Main car body
   - `wing` or `accent` - Wing components
   - `light` or `led` - Light components

## Alternative: Use a Placeholder Model

If you can't find a suitable F1 model, you can use any car model:
1. Rename the file to `f1-car.glb`
2. Place it in `/public/models/`
3. The viewer will work with any 3D model in GLB format

## Viewing the Model

After placing the model file:
1. Start the development server: `npm run dev`
2. Visit: http://localhost:3000/model-viewer

## Troubleshooting

- If the model doesn't appear, check the browser console for errors
- Ensure the file is in the correct location: `/public/models/f1-car.glb`
- Verify the file is in GLB format
- Check that the file size is reasonable (under 10MB)
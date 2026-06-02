import { Billboard, ContactShadows, Float, Html, OrbitControls, PerspectiveCamera, Text, Text3D, useGLTF, useProgress, useTexture } from '@react-three/drei';
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import { Suspense, useLayoutEffect, useMemo, useRef, useState, type ComponentType, type CSSProperties } from 'react';
import { ACESFilmicToneMapping, Box3, CanvasTexture, DoubleSide, EdgesGeometry, LineBasicMaterial, LineSegments, MathUtils, Mesh as ThreeMesh, MeshStandardMaterial, MeshToonMaterial, Plane, PlaneGeometry, RepeatWrapping, SRGBColorSpace, Vector3, type Color, type Group, type Material, type Mesh, type MeshBasicMaterial, type Object3D, type Texture } from 'three';
import { FlaskConical, Laptop, Music2, Trophy } from 'lucide-react';
import { homeCamera, portfolioSections, sectionById, type PortfolioSection, type SectionId } from '../data/portfolioSections';
import textFontUrl from 'three/examples/fonts/helvetiker_bold.typeface.json?url';

type RoomSceneProps = {
  activeSection: PortfolioSection | null;
  isMusicPlaying: boolean;
  nightMode: boolean;
  onReady?: () => void;
  onPlaceHotspot?: (point: [number, number, number]) => void;
  onPlaceVinyl?: (point: [number, number, number]) => void;
  onMoveVinyl: (position: [number, number, number]) => void;
  onSelect: (section: PortfolioSection) => void;
  musicHotspotPosition?: [number, number, number];
  trophyHotspotPosition?: [number, number, number];
  vinylPlacementMode: boolean;
  vinylPosition: [number, number, number];
};

const blenderModelUrl = import.meta.env.VITE_ROOM_MODEL_URL || '';
const blenderSceneScale = 1;
const blenderWoodSurfaceNames = new Set([
  'Cube.099',
  'Cube099',
  'Cube.139',
  'Cube',
  'Cube.010',
  'Cube.083',
  'Cube.014',
  'Cube.011',
  'Cube.015',
  'Cube.021',
  'Cube.081',
  'Cube.091',
  'Cube.092',
  'Cube.093',
  'Cube.026',
  'Cube.005',
  'Cube.087',
  'Cube.082',
  'Cube.013',
  'Cube.014',
  'Cube.016',
  'Cube.017',
  'Cube.018',
  'Cube.019',
  'Cube.020',
  'Cube.030',
  'Cube.031',
  'Cube.032',
  'Cube.033',
  'Cube.057',
  'Cube.059',
  'Cube.062',
  'Cube.065',
  'Cube.069',
  'Cube.148',
  'Cube.149',
  'Cube.150',
  'Cube.151',
  'Cube.152',
  'Cube.153',
  'Cube.154',
  'Cube.156',
  'Cube.157',
  'Cube.159',
  'Cube.160',
  'Cube.161',
  'Cube.164',
  'Cube.167',
  'Cube.171',
]);
const blenderWoodMaterialNames = new Set([
  'Material.030',
  'Material.034',
  'Material.035',
  'Material.036',
  'Material.037',
  'Material.038',
  'Material.039',
  'Material.040',
  'Material.042',
  'Material.043',
  'Material.045',
  'Material.046',
  'Material.047',
  'Material.050',
  'Material.053',
  'Material.057',
  'Material.068',
  'Material.067',
  'Material.077',
  'Material.092',
  'Material.097',
  'Material.098',
  'Material.099',
  'Material.100',
]);
const blenderWhiteWoodSurfaceNames = new Set([
  'bookshelf',
  'desk.001',
  'wallshelf1',
  'wallshelf2',
  'Cube.008',
  'Cube.009',
  'Cube.018',
  'Cube.204',
]);
const blenderWhiteWoodMaterialNames = new Set([
  'Material.003',
  'Material.069',
  'Material.070',
  'Material.071',
]);
const blenderHiddenSurfaceNames = new Set([
  'bed',
  'Cube.124',
  'Cube.075',
  'Cube.024',
  'Cube.027',
  'Cube.028',
  'Cube.029',
  'Cube.089',
  'Cube.002',
  'Cube.042',
  'IMG_6014',
  'IMG_6014.001',
  'IMG_6014.002',
]);
const blenderHiddenMaterialNames = new Set([
  'Material.002',
  'Material.026',
  'Material.027',
  'Material.091',
  'IMG_6014',
  'IMG_6014.001',
  'IMG_6014.002',
]);
const blenderFurSurfaceNames = new Set(['rug', 'Sphere']);
const blenderFurMaterialNames = new Set(['Material.014']);
const blenderWindowCutoutSurfaceNames = new Set(['Cube.038', 'Cube.002']);
const blenderWindowCutoutMaterialNames = new Set(['Material.011']);
const blenderWallSurfaceNames = new Set(['Plane.007']);
const blenderWallMaterialNames = new Set(['Material.001']);
const blenderReplacedBookSurfaceNames = new Set([
  'Cube.013',
  'Cube.014',
  'Cube.016',
  'Cube.017',
  'Cube.018',
  'Cube.019',
  'Cube.020',
  'Cube.065',
  'Cube.066',
  'Cube.067',
]);
const blenderBookSurfaceNames = new Set([
  'Cube.003',
  'Cube.009',
  'Cube.012',
  'Cube.013',
  'Cube.014',
  'Cube.016',
  'Cube.017',
  'Cube.018',
  'Cube.019',
  'Cube.020',
  'Cube.025',
  'Cube.030',
  'Cube.031',
  'Cube.032',
  'Cube.033',
  'Cube.050',
  'Cube.051',
  'Cube.052',
  'Cube.053',
  'Cube.054',
  'Cube.055',
  'Cube.056',
  'Cube.057',
  'Cube.059',
  'Cube.060',
  'Cube.061',
  'Cube.062',
  'Cube.063',
  'Cube.064',
  'Cube.065',
  'Cube.066',
  'Cube.067',
  'Cube.068',
  'Cube.069',
  'Cube.084',
  'Cube.085',
  'Cube.086',
  'Cube.087',
  'Cube.088',
  'Cube.090',
  'Cube.091',
  'Cube.092',
  'Cube.093',
  'Cube.094',
  'Cube.095',
  'Cube.096',
  'Cube.097',
  'Cube.098',
  'Cube.100',
  'Cube.101',
  'Cube.102',
  'Cube.103',
  'Cube.104',
  'Cube.105',
  'Cube.106',
  'Cube.107',
  'Cube.108',
  'Cube.109',
  'Cube.110',
  'Cube.111',
  'Cube.112',
  'Cube.113',
  'Cube.114',
  'Cube.115',
  'Cube.116',
  'Cube.117',
  'Cube.118',
  'Cube.119',
  'Cube.120',
  'Cube.121',
  'Cube.122',
  'Cube.123',
]);
const horizontalBookSurfaceNames = new Set([
  'Cube.003',
  'Cube.009',
  'Cube.012',
  'Cube.054',
  'Cube.055',
  'Cube.056',
  'Cube.100',
  'Cube.119',
  'Cube.120',
  'Cube.121',
  'Cube.122',
  'Cube.123',
]);
const blenderHotspots: Array<{
  sectionId: SectionId;
  point: [number, number, number];
  cameraPosition: [number, number, number];
  lookAt?: [number, number, number];
}> = [
    {
      sectionId: 'experience',
      point: [-7.14, 5.65, -2.42],
      cameraPosition: [5.8, 13.2, -8.6],
    },
    {
      sectionId: 'personal',
      point: [3.815, 4.308, -7.339],
      cameraPosition: [8.6, 13.4, 2.4],
      lookAt: [3.8, 2.7, -7.25],
    },
    {
      sectionId: 'achievements',
      point: [2.85, 4.62, -7.16],
      cameraPosition: [8.2, 12.9, 1.85],
      lookAt: [3.08, 3.18, -7.18],
    },
    {
      sectionId: 'research',
      point: [8.939, 10.503, 7.376],
      cameraPosition: [16.2, 14.2, 1.4],
    },
    {
      sectionId: 'funfacts',
      point: [-0.792, 9.269, 8.818],
      cameraPosition: [5.2, 12.4, 2.8],
    },
  ];
const blenderHotspotBySection = new Map(blenderHotspots.map((hotspot) => [hotspot.sectionId, hotspot]));
const blenderHomeCamera = {
  position: [28, 26, -28] as [number, number, number],
  lookAt: [0.5, 5.2, 1.2] as [number, number, number],
};

const hotspotIconMap: Record<SectionId, ComponentType<{ className?: string; style?: CSSProperties }>> = {
  experience: Laptop,
  personal: Music2,
  achievements: Trophy,
  research: FlaskConical,
  funfacts: (props) => (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <text x="12" y="18" textAnchor="middle" fontSize="22" fontWeight="800" fontFamily="Arial, Helvetica, sans-serif" fill="currentColor">?</text>
    </svg>
  ),
  education: Laptop,
  projects: Laptop,
};
const bookTextureCache = new Map<string, Texture>();
const bookMaterialCache = new Map<string, MeshToonMaterial>();
const bookSpineMaterialCache = new Map<string, MeshToonMaterial>();
const pastelBookMaterialCache = new Map<string, MeshToonMaterial>();
const cartoonMaterialCache = new Map<string, MeshToonMaterial>();
const edgeGeometryCache = new Map<string, EdgesGeometry>();
const edgeLineMaterial = new LineBasicMaterial({
  color: '#5c4b5c',
  transparent: true,
  opacity: 0.24,
  depthTest: true,
});

function createWoodTexture({
  baseColors,
  grainColor,
  highlightColor,
}: {
  baseColors: [string, string, string, string];
  grainColor: string;
  highlightColor: string;
}) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;

  const context = canvas.getContext('2d');
  if (!context) return null;

  const baseGradient = context.createLinearGradient(0, 0, canvas.width, 0);
  baseGradient.addColorStop(0, baseColors[0]);
  baseGradient.addColorStop(0.35, baseColors[1]);
  baseGradient.addColorStop(0.7, baseColors[2]);
  baseGradient.addColorStop(1, baseColors[3]);
  context.fillStyle = baseGradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < canvas.height; y += 34) {
    context.fillStyle = y % 68 === 0 ? grainColor : highlightColor;
    context.fillRect(0, y, canvas.width, 2);
  }

  for (let y = 0; y < canvas.height; y += 9) {
    const wave = Math.sin(y * 0.08) * 10;
    context.beginPath();
    context.moveTo(0, y);
    for (let x = 0; x <= canvas.width; x += 12) {
      context.lineTo(x, y + Math.sin((x + wave) * 0.045) * 3);
    }
    context.strokeStyle = y % 27 === 0 ? grainColor : grainColor.replace(/[\d.]+\)$/, '0.07)');
    context.lineWidth = y % 27 === 0 ? 1.4 : 0.8;
    context.stroke();
  }

  for (let i = 0; i < 56; i += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radiusX = 8 + Math.random() * 18;
    const radiusY = 1.5 + Math.random() * 4;

    context.beginPath();
    context.ellipse(x, y, radiusX, radiusY, Math.random() * Math.PI, 0, Math.PI * 2);
    context.strokeStyle = grainColor.replace(/[\d.]+\)$/, '0.08)');
    context.lineWidth = 1;
    context.stroke();
  }

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(5, 5);
  texture.needsUpdate = true;
  return texture;
}

function createWoodMaterial(texture: Texture, color = '#f0d7ad') {
  const map = texture.clone();
  map.needsUpdate = true;

  return new MeshToonMaterial({
    map,
    color,
  });
}

function createFurTexture({
  baseColor,
  strandColor,
}: {
  baseColor: string;
  strandColor: string;
}) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;

  const context = canvas.getContext('2d');
  if (!context) return null;

  context.fillStyle = baseColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 1800; i += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const length = 3 + Math.random() * 10;
    const angle = -0.8 + Math.random() * 1.6;

    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
    context.strokeStyle = i % 4 === 0 ? 'rgba(255, 255, 255, 0.42)' : strandColor;
    context.lineWidth = 0.7 + Math.random() * 0.8;
    context.stroke();
  }

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(5, 5);
  texture.needsUpdate = true;
  return texture;
}

function createFurMaterial(texture: Texture, color = '#fbf4ed') {
  const map = texture.clone();
  map.needsUpdate = true;

  return new MeshToonMaterial({
    map,
    color,
  });
}

function createShelfPortraitTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 320;

  const context = canvas.getContext('2d');
  if (!context) return null;

  const background = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  background.addColorStop(0, '#ffe6ef');
  background.addColorStop(1, '#d9eef0');
  context.fillStyle = background;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = '#f7f0df';
  context.fillRect(18, 18, canvas.width - 36, canvas.height - 36);

  context.strokeStyle = '#6f8f6a';
  context.lineWidth = 8;
  context.lineCap = 'round';
  context.beginPath();
  context.moveTo(128, 254);
  context.quadraticCurveTo(122, 210, 132, 166);
  context.stroke();

  context.fillStyle = '#9bcf93';
  context.beginPath();
  context.ellipse(104, 216, 22, 10, -0.55, 0, Math.PI * 2);
  context.ellipse(154, 202, 24, 11, 0.52, 0, Math.PI * 2);
  context.fill();

  const petalColors = ['#ffabc7', '#ffd0df', '#f5aebd', '#ffc0d4', '#ffdaea'];
  const petalAngles = [0, 1.26, 2.52, 3.78, 5.04];
  petalAngles.forEach((angle, index) => {
    context.save();
    context.translate(128 + Math.cos(angle) * 30, 132 + Math.sin(angle) * 28);
    context.rotate(angle);
    context.fillStyle = petalColors[index];
    context.beginPath();
    context.ellipse(0, 0, 18, 32, 0, 0, Math.PI * 2);
    context.fill();
    context.restore();
  });

  context.fillStyle = '#f4d38a';
  context.beginPath();
  context.ellipse(128, 132, 22, 22, 0, 0, Math.PI * 2);
  context.fill();

  context.strokeStyle = 'rgba(107, 82, 97, 0.32)';
  context.lineWidth = 3;
  context.beginPath();
  context.arc(128, 132, 13, 0.2, Math.PI * 1.5);
  context.stroke();

  context.strokeStyle = 'rgba(120, 86, 104, 0.26)';
  context.lineWidth = 3;
  context.strokeRect(18, 18, canvas.width - 36, canvas.height - 36);

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function createCartoonMaterial(sourceMaterial: Material) {
  const cacheKey = sourceMaterial.uuid;
  const cachedMaterial = cartoonMaterialCache.get(cacheKey);
  if (cachedMaterial) return cachedMaterial;

  const source = sourceMaterial as Material & {
    color?: Color;
    map?: Texture | null;
  };
  const color = source.color?.clone();
  color?.offsetHSL(0, 0.08, 0.02);

  const material = new MeshToonMaterial({
    color: color ?? '#f6d8c8',
    map: source.map ?? undefined,
  });

  material.name = sourceMaterial.name;
  material.transparent = sourceMaterial.transparent;
  material.opacity = sourceMaterial.opacity;
  material.side = sourceMaterial.side;
  cartoonMaterialCache.set(cacheKey, material);
  return material;
}

function hashString(value: string) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }

  return hash;
}

function createBookSpineTexture(seedName: string) {
  const cachedTexture = bookTextureCache.get(seedName);
  if (cachedTexture) return cachedTexture;

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 512;

  const context = canvas.getContext('2d');
  if (!context) return null;

  const palette = ['#1e6f78', '#9c463f', '#5b6f3f', '#6e4f8f', '#b77835', '#314f79', '#7a334d'];
  const accentPalette = ['#f4d38a', '#f6eee0', '#c6d8d2', '#f1b7a9'];
  const hash = hashString(seedName);
  const baseColor = palette[hash % palette.length];
  const accentColor = accentPalette[(hash >> 3) % accentPalette.length];

  context.fillStyle = baseColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const shade = context.createLinearGradient(0, 0, canvas.width, 0);
  shade.addColorStop(0, 'rgba(0, 0, 0, 0.24)');
  shade.addColorStop(0.14, 'rgba(255, 255, 255, 0.16)');
  shade.addColorStop(0.5, 'rgba(255, 255, 255, 0.04)');
  shade.addColorStop(1, 'rgba(0, 0, 0, 0.18)');
  context.fillStyle = shade;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = 'rgba(255, 248, 232, 0.9)';
  context.fillRect(16, 0, 8, canvas.height);
  context.fillRect(canvas.width - 25, 0, 7, canvas.height);

  context.fillStyle = accentColor;
  const topBand = 68 + (hash % 34);
  const bottomBand = 348 + ((hash >> 2) % 42);
  context.fillRect(34, topBand, canvas.width - 68, 18);
  context.fillRect(34, bottomBand, canvas.width - 68, 15);

  context.fillStyle = 'rgba(255, 250, 236, 0.86)';
  for (let line = 0; line < 4; line += 1) {
    const width = 68 + ((hash >> (line + 5)) % 62);
    context.fillRect(52, 148 + line * 28, width, 6);
  }

  context.fillStyle = 'rgba(35, 29, 28, 0.2)';
  context.fillRect(canvas.width - 5, 0, 3, canvas.height);

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.needsUpdate = true;
  bookTextureCache.set(seedName, texture);
  return texture;
}

function getBookBaseColor(seedName: string) {
  const palette = ['#1e6f78', '#9c463f', '#5b6f3f', '#6e4f8f', '#b77835', '#314f79', '#7a334d'];
  return palette[hashString(seedName) % palette.length];
}

function createBookMaterial(seedName: string) {
  const cachedMaterial = bookMaterialCache.get(seedName);
  if (cachedMaterial) return cachedMaterial;

  const baseColor = getBookBaseColor(seedName);
  const material = createPastelBookMaterial(`book-${baseColor}`, baseColor);
  material.name = `${seedName}-book-cover`;
  bookMaterialCache.set(seedName, material);
  return material;
}

function createPastelBookMaterial(seedName: string, baseColor: string) {
  const cacheKey = `${baseColor}-${hashString(seedName) % 3}`;
  const cachedMaterial = pastelBookMaterialCache.get(cacheKey);
  if (cachedMaterial) return cachedMaterial;

  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 256;

  const context = canvas.getContext('2d');
  if (!context) return new MeshToonMaterial({ color: baseColor });

  const hash = hashString(seedName);
  context.fillStyle = baseColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const shade = context.createLinearGradient(0, 0, canvas.width, 0);
  shade.addColorStop(0, 'rgba(80, 64, 72, 0.16)');
  shade.addColorStop(0.16, 'rgba(255, 255, 255, 0.2)');
  shade.addColorStop(0.7, 'rgba(255, 255, 255, 0.05)');
  shade.addColorStop(1, 'rgba(80, 64, 72, 0.12)');
  context.fillStyle = shade;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = 'rgba(255, 250, 238, 0.88)';
  context.fillRect(8, 0, 6, canvas.height);
  context.fillRect(canvas.width - 15, 0, 5, canvas.height);

  context.fillStyle = 'rgba(96, 76, 90, 0.28)';
  context.fillRect(17, 36 + (hash % 14), canvas.width - 34, 9);
  context.fillRect(17, 177 + ((hash >> 2) % 17), canvas.width - 34, 8);

  context.fillStyle = 'rgba(255, 252, 244, 0.94)';
  for (let line = 0; line < 4; line += 1) {
    const width = 37 + ((hash >> (line + 4)) % 31);
    context.fillRect(25, 73 + line * 16, width, 4);
  }

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.needsUpdate = true;

  const material = new MeshToonMaterial({
    map: texture,
    color: '#ffffff',
  });
  material.name = `${seedName}-pastel-book`;
  pastelBookMaterialCache.set(cacheKey, material);
  return material;
}

function isTopBookshelfBook(mesh: Mesh) {
  mesh.geometry.computeBoundingBox();

  const bounds = mesh.geometry.boundingBox?.clone();
  if (!bounds) return false;

  const size = new Vector3();
  bounds.getSize(size);
  size.multiply(mesh.scale);

  const isInTopShelfBand =
    mesh.position.x > 7.2 &&
    mesh.position.x < 10.2 &&
    mesh.position.y > 12.8 &&
    mesh.position.y < 14.2 &&
    mesh.position.z > 7.0 &&
    mesh.position.z < 8.2;
  const isBookSized = size.x < 1.4 && size.y < 1.5 && size.z < 1;

  return isInTopShelfBand && isBookSized;
}

function createBookSpineMaterial(seedName: string) {
  const cachedMaterial = bookSpineMaterialCache.get(seedName);
  if (cachedMaterial) return cachedMaterial;

  const texture = createBookSpineTexture(seedName);
  const material = new MeshToonMaterial({
    map: texture ?? undefined,
    color: '#ffffff',
  });
  material.name = `${seedName}-book-spine`;
  bookSpineMaterialCache.set(seedName, material);
  return material;
}

function removeBookSpineDetails(mesh: Mesh) {
  const details = mesh.children.filter((child) => child.name.startsWith('book-spine-detail'));

  details.forEach((child) => {
    mesh.remove(child);

    const detailMesh = child as ThreeMesh;
    detailMesh.geometry?.dispose();

    if (Array.isArray(detailMesh.material)) {
      detailMesh.material.forEach((material) => material.dispose());
    } else {
      detailMesh.material?.dispose();
    }
  });
}

function attachBookSpineDetail(mesh: Mesh) {
  mesh.geometry.computeBoundingBox();

  const bounds = mesh.geometry.boundingBox?.clone() ?? new Box3();
  const size = new Vector3();
  const center = new Vector3();
  bounds.getSize(size);
  bounds.getCenter(center);

  if (size.x === 0 || size.y === 0 || size.z === 0) return;

  removeBookSpineDetails(mesh);

  const isWallShelfBook = mesh.position.x < -5;
  const isHorizontalBook = horizontalBookSurfaceNames.has(mesh.name);
  const faceOffset = 0.004;
  const material = createBookSpineMaterial(`${mesh.name}-attached-spine`);
  material.side = DoubleSide;
  material.polygonOffset = true;
  material.polygonOffsetFactor = -1;
  material.polygonOffsetUnits = -1;

  const faceHeight = isHorizontalBook
    ? Math.max(size.y * (isWallShelfBook ? 1.35 : 1.7), isWallShelfBook ? 0.02 : 0.04)
    : size.y * 0.96;

  const addDetail = (geometry: PlaneGeometry, position: [number, number, number], rotationY = 0) => {
    const detail = new ThreeMesh(geometry, material);
    detail.name = 'book-spine-detail';
    detail.renderOrder = 2;
    detail.position.set(...position);
    detail.rotation.y = rotationY;
    mesh.add(detail);
  };

  addDetail(new PlaneGeometry(size.x * 0.96, faceHeight), [center.x, center.y, bounds.min.z - faceOffset]);
  addDetail(new PlaneGeometry(size.x * 0.96, faceHeight), [center.x, center.y, bounds.max.z + faceOffset]);
  addDetail(new PlaneGeometry(size.z * 0.96, faceHeight), [bounds.min.x - faceOffset, center.y, center.z], Math.PI / 2);
  addDetail(new PlaneGeometry(size.z * 0.96, faceHeight), [bounds.max.x + faceOffset, center.y, center.z], Math.PI / 2);
}

function attachCartoonEdges(mesh: Mesh) {
  if (mesh.name.startsWith('book-spine-detail')) return;

  const existingEdges = mesh.children.filter((child) => child.name === 'cartoon-edge-lines');

  existingEdges.forEach((child) => {
    mesh.remove(child);
  });

  let edges = edgeGeometryCache.get(mesh.geometry.uuid);
  if (!edges) {
    edges = new EdgesGeometry(mesh.geometry, 36);
    edgeGeometryCache.set(mesh.geometry.uuid, edges);
  }

  const lines = new LineSegments(edges, edgeLineMaterial);
  lines.name = 'cartoon-edge-lines';
  lines.renderOrder = 3;
  lines.scale.setScalar(1.002);
  mesh.add(lines);
}

function createWindowCutoutWallMaterial(sourceMaterial?: Material) {
  const material = (sourceMaterial?.clone() ??
    new MeshStandardMaterial({
      color: '#fffdfb',
      roughness: 0.88,
    })) as Material & {
      color?: { set: (color: string) => unknown };
      depthWrite: boolean;
      needsUpdate: boolean;
      polygonOffset: boolean;
      polygonOffsetFactor: number;
      polygonOffsetUnits: number;
    };

  material.color?.set('#fffdfb');
  material.depthWrite = true;
  material.polygonOffset = true;
  material.polygonOffsetFactor = 1;
  material.polygonOffsetUnits = 1;

  material.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader.replace(
      '#include <common>',
      '#include <common>\nvarying vec3 vWindowWorldPosition;',
    );
    shader.vertexShader = shader.vertexShader.replace(
      '#include <worldpos_vertex>',
      '#include <worldpos_vertex>\nvWindowWorldPosition = worldPosition.xyz;',
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <common>',
      '#include <common>\nvarying vec3 vWindowWorldPosition;',
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <clipping_planes_fragment>',
      `#include <clipping_planes_fragment>
      bool insideWindowDepth = vWindowWorldPosition.x > -8.78 && vWindowWorldPosition.x < -8.0;
      bool insideLowerPane = vWindowWorldPosition.y > 6.64 && vWindowWorldPosition.y < 9.56;
      bool insideUpperPane = vWindowWorldPosition.y > 9.88 && vWindowWorldPosition.y < 12.78;
      bool insideLeftPane = vWindowWorldPosition.z > -2.68 && vWindowWorldPosition.z < -0.72;
      bool insideRightPane = vWindowWorldPosition.z > -0.52 && vWindowWorldPosition.z < 1.44;

      if (insideWindowDepth && (insideLowerPane || insideUpperPane) && (insideLeftPane || insideRightPane)) {
        discard;
      }`,
    );
  };

  material.needsUpdate = true;
  return material;
}

export function RoomScene({
  activeSection,
  isMusicPlaying,
  nightMode,
  onReady,
  onPlaceHotspot,
  onPlaceVinyl,
  onMoveVinyl,
  onSelect,
  musicHotspotPosition,
  trophyHotspotPosition,
  vinylPlacementMode,
  vinylPosition,
}: RoomSceneProps) {
  const hasBlenderModel = Boolean(blenderModelUrl);
  const cameraHome = hasBlenderModel ? blenderHomeCamera : homeCamera;
  const focusedSection = useMemo(() => {
    if (!hasBlenderModel || !activeSection) return activeSection;
    const hotspot = blenderHotspotBySection.get(activeSection.id);
    if (!hotspot) return null;
    const customPoint = activeSection.id === 'personal' && musicHotspotPosition
      ? musicHotspotPosition
      : activeSection.id === 'achievements' && trophyHotspotPosition
        ? trophyHotspotPosition
        : hotspot.point;
    const customLookAt = activeSection.id === 'personal'
      ? [vinylPosition[0] - 0.48, vinylPosition[1] + (hasBlenderModel ? 0.76 : 0.32), vinylPosition[2] + 0.34] as [number, number, number]
      : hotspot.lookAt ?? customPoint;
    const customCameraPosition = activeSection.id === 'personal' && hasBlenderModel
      ? [7.35, 4.9, -0.32] as [number, number, number]
      : hotspot.cameraPosition;

    return {
      ...activeSection,
      cameraPosition: customCameraPosition,
      lookAt: customLookAt,
    };
  }, [activeSection, hasBlenderModel, musicHotspotPosition, trophyHotspotPosition, vinylPosition]);

  return (
    <Canvas
      shadows="soft"
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => {
        gl.toneMapping = ACESFilmicToneMapping;
        gl.toneMappingExposure = nightMode ? 0.76 : hasBlenderModel ? 0.86 : 0.94;
      }}
    >
      <color attach="background" args={[nightMode ? '#2f3b52' : '#fff0f4']} />
      <SceneExposure exposure={nightMode ? 0.76 : hasBlenderModel ? 0.86 : 0.94} />
      <fog
        attach="fog"
        args={[
          nightMode ? '#44516a' : '#fff0f4',
          hasBlenderModel ? (nightMode ? 96 : 112) : (nightMode ? 7 : 8),
          hasBlenderModel ? (nightMode ? 172 : 178) : (nightMode ? 16 : 17),
        ]}
      />
      <PerspectiveCamera makeDefault fov={42} position={cameraHome.position} />
      <Suspense fallback={<RoomLoadingScreen label="Loading" />}>
        <CameraRig activeSection={focusedSection} homeView={cameraHome} />
        <RoomLights nightMode={nightMode} />
        {hasBlenderModel ? (
          <>
            <BlenderRoomModel
              onReady={onReady}
              onPlaceHotspot={onPlaceHotspot}
              onPlaceVinyl={onPlaceVinyl}
              vinylPlacementMode={vinylPlacementMode}
            />
            <BlenderOpenWindowFrame />
            <BlenderBedBlankets />
            <BlenderTopBookshelfBooks />
            <BlenderIntroWallText />
            <BlenderShelfPortrait />
            <BlenderDeskWallStickyNotes />
            <BlenderTopShelfWallArtwork />
          </>
        ) : (
          <RoomShell onPlaceVinyl={onPlaceVinyl} vinylPlacementMode={vinylPlacementMode} />
        )}
        {hasBlenderModel ? (
          <BlenderHotspots
            activeSection={activeSection}
            musicHotspotPosition={musicHotspotPosition}
            onSelect={onSelect}
            trophyHotspotPosition={trophyHotspotPosition}
          />
        ) : (
          <Furniture activeSection={activeSection} onSelect={onSelect} />
        )}
        <VinylRecord
          isMusicPlaying={isMusicPlaying}
          hasBlenderModel={hasBlenderModel}
          onPlaceHotspot={onPlaceHotspot}
          onMove={onMoveVinyl}
          position={vinylPosition}
        />
        <ContactShadows position={[0, 0.015, 0]} opacity={nightMode ? 0.08 : 0.16} scale={9} blur={3.4} far={4} />
      </Suspense>
      <OrbitControls
        makeDefault
        target={cameraHome.lookAt}
        minDistance={hasBlenderModel ? 8 : 3.5}
        maxDistance={hasBlenderModel ? 110 : 10}
        minPolarAngle={hasBlenderModel ? Math.PI / 5.2 : Math.PI / 5}
        maxPolarAngle={hasBlenderModel ? Math.PI / 2.45 : Math.PI / 2.08}
        minAzimuthAngle={hasBlenderModel ? Math.PI * 0.58 : undefined}
        maxAzimuthAngle={hasBlenderModel ? Math.PI * 0.95 : undefined}
        enablePan={false}
      />
    </Canvas>
  );
}

function SceneExposure({ exposure }: { exposure: number }) {
  const gl = useThree((state) => state.gl);

  useLayoutEffect(() => {
    gl.toneMappingExposure = exposure;
  }, [exposure, gl]);

  return null;
}

function BlenderHotspots({
  activeSection,
  musicHotspotPosition,
  onSelect,
  trophyHotspotPosition,
}: {
  activeSection: PortfolioSection | null;
  musicHotspotPosition?: [number, number, number];
  onSelect: (section: PortfolioSection) => void;
  trophyHotspotPosition?: [number, number, number];
}) {
  return (
    <group>
      {blenderHotspots.map((hotspot) => {
        const point = hotspot.sectionId === 'personal' && musicHotspotPosition
          ? musicHotspotPosition
          : hotspot.sectionId === 'achievements' && trophyHotspotPosition
            ? trophyHotspotPosition
            : hotspot.point;

        return (
          <BlenderHotspot
            key={hotspot.sectionId}
            active={activeSection?.id === hotspot.sectionId}
            section={sectionById[hotspot.sectionId]}
            point={point}
            showLabel={!activeSection}
            onSelect={onSelect}
          />
        );
      })}
    </group>
  );
}

function VinylRecord({
  isMusicPlaying,
  hasBlenderModel,
  onPlaceHotspot,
  onMove,
  position,
}: {
  isMusicPlaying: boolean;
  hasBlenderModel: boolean;
  onPlaceHotspot?: (point: [number, number, number]) => void;
  onMove: (position: [number, number, number]) => void;
  position: [number, number, number];
}) {
  const record = useRef<Group>(null);
  const notes = useMemo(
    () => ['♪', '♫', '♩', '♪', '♫'].map((note, index) => ({
      note,
      angle: index * 1.26,
      radius: 0.46 + (index % 2) * 0.28,
      offset: index * 0.19,
      size: 0.5 + (index % 3) * 0.08,
      color: ['#f5aebd', '#c0cdf6', '#aee0ef', '#f3d89c', '#d6c1f2'][index],
    })),
    [],
  );
  const scale = hasBlenderModel ? 1.95 : 0.62;

  useFrame((_, delta) => {
    if (!record.current || !isMusicPlaying) return;
    record.current.rotation.y -= delta * 2.9;
  });

  return (
    <group position={position} scale={scale}>
      <group rotation={[0, -0.38, 0]}>
        <mesh castShadow receiveShadow position={[0.08, -0.045, -0.02]} rotation={[0, 0.38, 0]}>
          <boxGeometry args={[1.42, 0.045, 1.42]} />
          <meshToonMaterial color="#f8d8e5" />
        </mesh>
        <mesh receiveShadow position={[0.08, -0.017, -0.02]} rotation={[0, 0.38, 0]}>
          <boxGeometry args={[1.18, 0.018, 1.18]} />
          <meshToonMaterial color="#fff8ef" transparent opacity={0.72} />
        </mesh>
      </group>
      <group ref={record} rotation={[0, 0.18, 0]}>
        <mesh castShadow receiveShadow position={[0, 0, 0]}>
          <cylinderGeometry args={[0.72, 0.72, 0.08, 64]} />
          <meshToonMaterial color="#292433" />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0.058, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.72, 0.018, 8, 88]} />
          <meshToonMaterial color="#fff8ef" />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0.052, 0]}>
          <cylinderGeometry args={[0.28, 0.28, 0.035, 42]} />
          <meshToonMaterial color="#f5aebd" />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0.075, 0]}>
          <cylinderGeometry args={[0.075, 0.075, 0.045, 28]} />
          <meshToonMaterial color="#fff8ef" />
        </mesh>
        {[0.42, 0.56, 0.66].map((radius) => (
          <mesh key={radius} position={[0, 0.094, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, 0.008, 8, 80]} />
            <meshToonMaterial color="#605467" transparent opacity={0.58} />
          </mesh>
        ))}
      </group>

      {notes.map((particle) => (
        <MusicNoteParticle
          key={`${particle.note}-${particle.offset}`}
          isMusicPlaying={isMusicPlaying}
          {...particle}
        />
      ))}
    </group>
  );
}

function MusicNoteParticle({
  angle,
  color,
  isMusicPlaying,
  note,
  offset,
  radius,
  size,
}: {
  angle: number;
  color: string;
  isMusicPlaying: boolean;
  note: string;
  offset: number;
  radius: number;
  size: number;
}) {
  const group = useRef<Group>(null);
  const material = useRef<MeshBasicMaterial>(null);
  const shadowMaterial = useRef<MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
    if (!group.current || !material.current) return;

    if (!isMusicPlaying) {
      material.current.opacity = MathUtils.lerp(material.current.opacity, 0, 0.16);
      if (shadowMaterial.current) {
        shadowMaterial.current.opacity = MathUtils.lerp(shadowMaterial.current.opacity, 0, 0.16);
      }
      return;
    }

    const progress = (clock.elapsedTime * 0.26 + offset) % 1;
    const driftAngle = angle + progress * 0.7;
    group.current.position.set(
      Math.cos(driftAngle) * (radius + progress * 0.42),
      0.58 + progress * 1.65,
      Math.sin(driftAngle) * (radius + progress * 0.42),
    );
    group.current.rotation.y = -driftAngle + Math.PI / 2;
    group.current.scale.setScalar(0.92 + progress * 0.58);
    material.current.opacity = 0.3 + Math.sin(progress * Math.PI) * 0.36;
    if (shadowMaterial.current) {
      shadowMaterial.current.opacity = 0.16 + Math.sin(progress * Math.PI) * 0.2;
    }
  });

  return (
    <group ref={group}>
      <Billboard>
        <Text fontSize={size * 1.08} anchorX="center" anchorY="middle" position={[0.018, -0.018, -0.01]}>
          {note}
          <meshBasicMaterial ref={shadowMaterial} color="#5c4b5c" transparent opacity={0} depthWrite={false} />
        </Text>
        <Text fontSize={size} anchorX="center" anchorY="middle">
          {note}
          <meshBasicMaterial ref={material} color={color} transparent opacity={0} depthWrite={false} />
        </Text>
      </Billboard>
    </group>
  );
}

function BlenderHotspot({
  active,
  section,
  point,
  showLabel,
  onSelect,
}: {
  active: boolean;
  section: PortfolioSection;
  point: [number, number, number];
  showLabel: boolean;
  onSelect: (section: PortfolioSection) => void;
}) {
  const group = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const pulse = hovered || active ? 1.1 + Math.sin(clock.elapsedTime * 5) * 0.035 : 0.92;
    group.current.scale.setScalar(MathUtils.lerp(group.current.scale.x, pulse, 0.18));
  });

  return (
    <Float speed={2} rotationIntensity={0} floatIntensity={0.8}>
      <group
        ref={group}
        position={point}
        onClick={(event) => {
          event.stopPropagation();
          onSelect(section);
        }}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => {
          setHovered(false);
        }}
      >
        <mesh>
          <sphereGeometry args={[0.42, 28, 18]} />
          <meshStandardMaterial
            color={section.color}
            emissive={section.color}
            emissiveIntensity={hovered || active ? 0.42 : 0.2}
            transparent
            opacity={hovered || active ? 0.42 : 0.26}
            roughness={0.35}
          />
        </mesh>
        {showLabel ? (
          <Html center position={[0, section.id === 'funfacts' ? 0.42 : 0.52, 0]} distanceFactor={20} zIndexRange={[20, 0]}>
            <button
              type="button"
              className={`grid h-10 w-10 place-items-center rounded-full border shadow-lg transition ${hovered || active
                ? 'border-white bg-pink-200 text-ink shadow-pink-200/45'
                : 'border-pink-200/90 bg-ink/80 text-paper shadow-pink-200/20 hover:bg-pink-200 hover:text-ink'
                }`}
              onClick={(event) => {
                event.stopPropagation();
                onSelect(section);
              }}
              title={section.title}
              aria-label={section.title}
            >
              {(() => {
                const Icon = hotspotIconMap[section.id];
                return <Icon className={`floating-icon h-5 w-5 ${hovered || active ? 'text-ink' : 'text-pink-200'}`} />;
              })()}
            </button>
          </Html>
        ) : null}
      </group>
    </Float>
  );
}

function BlenderRoomModel({
  onReady,
  onPlaceHotspot,
  onPlaceVinyl,
  vinylPlacementMode,
}: {
  onReady?: () => void;
  onPlaceHotspot?: (point: [number, number, number]) => void;
  onPlaceVinyl?: (point: [number, number, number]) => void;
  vinylPlacementMode: boolean;
}) {
  const { scene } = useGLTF(blenderModelUrl) as { scene: Group };
  const [isPrepared, setIsPrepared] = useState(false);
  const preparedScene = useRef<Group | null>(null);
  const woodTexture = useMemo(
    () =>
      createWoodTexture({
        baseColors: ['#e6d4bc', '#f6ead6', '#d8c4a8', '#fff2dc'],
        grainColor: 'rgba(128, 103, 75, 0.09)',
        highlightColor: 'rgba(255, 250, 238, 0.34)',
      }),
    [],
  );
  const whiteWoodTexture = useMemo(
    () =>
      createWoodTexture({
        baseColors: ['#e8dfcf', '#fff7e8', '#d5c8b6', '#fffaf0'],
        grainColor: 'rgba(124, 106, 83, 0.13)',
        highlightColor: 'rgba(255, 255, 255, 0.36)',
      }),
    [],
  );
  const furTexture = useMemo(
    () =>
      createFurTexture({
        baseColor: '#fffaf5',
        strandColor: 'rgba(204, 186, 166, 0.22)',
      }),
    [],
  );

  useLayoutEffect(() => {
    if (!woodTexture || !whiteWoodTexture || !furTexture) return;
    if (preparedScene.current === scene) {
      setIsPrepared(true);
      onReady?.();
      return;
    }

    setIsPrepared(false);

    scene.traverse((object: Object3D) => {
      if ('castShadow' in object) object.castShadow = true;
      if ('receiveShadow' in object) object.receiveShadow = true;

      const mesh = object as Mesh;
      if (mesh.isMesh) {
        if (
          isTopBookshelfBook(mesh) ||
          blenderReplacedBookSurfaceNames.has(mesh.name) ||
          blenderReplacedBookSurfaceNames.has(mesh.geometry.name)
        ) {
          mesh.visible = false;
          return;
        }

        const objectMatchesBookSurface =
          blenderBookSurfaceNames.has(mesh.name) || blenderBookSurfaceNames.has(mesh.geometry.name);

        if (!objectMatchesBookSurface && blenderHiddenSurfaceNames.has(mesh.name)) {
          mesh.visible = false;
          return;
        }

        if (
          !objectMatchesBookSurface &&
          (Array.isArray(mesh.material)
            ? mesh.material.some((material) => blenderHiddenMaterialNames.has(material.name))
            : blenderHiddenMaterialNames.has(mesh.material.name))
        ) {
          mesh.visible = false;
          return;
        }

        if (objectMatchesBookSurface) {
          mesh.material = Array.isArray(mesh.material)
            ? mesh.material.map((_, index) => createBookMaterial(`${mesh.name}-${index}`))
            : createBookMaterial(mesh.name);
          attachBookSpineDetail(mesh);
          attachCartoonEdges(mesh);
          return;
        }

        const objectMatchesWindowCutoutSurface =
          blenderWindowCutoutSurfaceNames.has(mesh.name) || blenderWindowCutoutSurfaceNames.has(mesh.geometry.name);
        const objectMatchesWallSurface =
          blenderWallSurfaceNames.has(mesh.name) || blenderWallSurfaceNames.has(mesh.geometry.name);

        if (objectMatchesWindowCutoutSurface) {
          mesh.renderOrder = -1;
          mesh.material = Array.isArray(mesh.material)
            ? mesh.material.map((material) => createWindowCutoutWallMaterial(material))
            : createWindowCutoutWallMaterial(mesh.material);
          return;
        }

        if (objectMatchesWallSurface) {
          mesh.material = Array.isArray(mesh.material)
            ? mesh.material.map(() => new MeshToonMaterial({ color: '#fffdfb' }))
            : new MeshToonMaterial({ color: '#fffdfb' });
          attachCartoonEdges(mesh);
          return;
        }

        const objectMatchesFurSurface =
          blenderFurSurfaceNames.has(mesh.name) || blenderFurSurfaceNames.has(mesh.geometry.name);

        if (objectMatchesFurSurface) {
          mesh.material = Array.isArray(mesh.material)
            ? mesh.material.map(() => createFurMaterial(furTexture, '#eadfd4'))
            : createFurMaterial(furTexture, '#eadfd4');
          attachCartoonEdges(mesh);
          return;
        }

        const objectMatchesWoodSurface =
          blenderWoodSurfaceNames.has(mesh.name) || blenderWoodSurfaceNames.has(mesh.geometry.name);
        const objectMatchesWhiteWoodSurface =
          blenderWhiteWoodSurfaceNames.has(mesh.name) || blenderWhiteWoodSurfaceNames.has(mesh.geometry.name);

        if (objectMatchesWhiteWoodSurface) {
          mesh.material = Array.isArray(mesh.material)
            ? mesh.material.map(() => createWoodMaterial(whiteWoodTexture, '#eadfd0'))
            : createWoodMaterial(whiteWoodTexture, '#eadfd0');
          attachCartoonEdges(mesh);
          return;
        }

        if (objectMatchesWoodSurface) {
          mesh.material = Array.isArray(mesh.material)
            ? mesh.material.map(() => createWoodMaterial(woodTexture, '#f4e4cd'))
            : createWoodMaterial(woodTexture, '#f4e4cd');
          attachCartoonEdges(mesh);
          return;
        }

        mesh.material = Array.isArray(mesh.material)
          ? mesh.material.map((material) =>
            blenderWhiteWoodMaterialNames.has(material.name)
              ? createWoodMaterial(whiteWoodTexture, '#eadfd0')
              : blenderWindowCutoutMaterialNames.has(material.name)
                ? createWindowCutoutWallMaterial(material)
                : blenderWallMaterialNames.has(material.name)
                  ? new MeshToonMaterial({ color: '#fffdfb' })
                  : blenderFurMaterialNames.has(material.name)
                    ? createFurMaterial(furTexture, '#eadfd4')
                    : blenderWoodMaterialNames.has(material.name)
                      ? createWoodMaterial(woodTexture, '#f4e4cd')
                      : createCartoonMaterial(material),
          )
          : blenderWhiteWoodMaterialNames.has(mesh.material.name)
            ? createWoodMaterial(whiteWoodTexture, '#eadfd0')
            : blenderWindowCutoutMaterialNames.has(mesh.material.name)
              ? createWindowCutoutWallMaterial(mesh.material)
              : blenderWallMaterialNames.has(mesh.material.name)
                ? new MeshToonMaterial({ color: '#fffdfb' })
                : blenderFurMaterialNames.has(mesh.material.name)
                  ? createFurMaterial(furTexture, '#eadfd4')
                  : blenderWoodMaterialNames.has(mesh.material.name)
                    ? createWoodMaterial(woodTexture, '#f4e4cd')
                    : createCartoonMaterial(mesh.material);
        attachCartoonEdges(mesh);
      }
    });
    preparedScene.current = scene;
    setIsPrepared(true);
    onReady?.();
  }, [furTexture, onReady, scene, whiteWoodTexture, woodTexture]);

  if (!isPrepared) return <RoomLoadingScreen label="Loading" />;

  return (
    <primitive
      object={scene}
      position={[0, 0, 0]}
      scale={blenderSceneScale}
      onClick={(event: ThreeEvent<MouseEvent>) => {
        if (!vinylPlacementMode && !onPlaceHotspot) return;
        event.stopPropagation();
        const point: [number, number, number] = [
          Number(event.point.x.toFixed(3)),
          Number(event.point.y.toFixed(3)),
          Number(event.point.z.toFixed(3)),
        ];

        if (vinylPlacementMode && onPlaceVinyl) {
          onPlaceVinyl(point);
          return;
        }

        onPlaceHotspot?.(point);
      }}
    />
  );
}

const topBookshelfBooks: Array<{
  color: string;
  position: [number, number, number];
  scale: [number, number, number];
  tilt?: number;
}> = [
    { position: [7.82, 13.45, 7.54], scale: [0.16, 1.1, 0.72], color: '#f5aebd', tilt: 0.04 },
    { position: [8, 13.5, 7.54], scale: [0.16, 1.22, 0.72], color: '#b7dfc8' },
    { position: [8.18, 13.44, 7.54], scale: [0.16, 1.08, 0.72], color: '#c0cdf6', tilt: -0.04 },
    { position: [8.36, 13.5, 7.54], scale: [0.16, 1.18, 0.72], color: '#f3d89c' },
    { position: [9.36, 13.1, 7.54], scale: [1.1, 0.16, 0.72], color: '#d6c1f2' },
    { position: [9.36, 13.26, 7.54], scale: [1.04, 0.16, 0.72], color: '#aee0ef' },
    { position: [9.36, 13.42, 7.54], scale: [0.98, 0.16, 0.72], color: '#f4bcae' },
  ];

function BlenderTopBookshelfBooks() {
  return (
    <group>
      {topBookshelfBooks.map(({ color, position, scale, tilt = 0 }) => (
        <mesh key={`${position.join('-')}-${color}`} castShadow receiveShadow position={position} rotation={[0, 0, tilt]}>
          <boxGeometry args={scale} />
          <primitive attach="material" object={createPastelBookMaterial(`${position.join('-')}-${color}`, color)} />
        </mesh>
      ))}
    </group>
  );
}

function BlenderIntroWallText() {
  const letters = useMemo(() => 'hello, i am sofia'.split(''), []);
  const letterWidths = useMemo(
    () =>
      letters.map((letter) => {
        if (letter === ' ') return 0.28;
        if (letter === ',') return 0.34;
        if (letter === 'i' || letter === 'l') return 0.28;
        if (letter === 'm') return 0.66;
        if (letter === 'w') return 0.7;
        if (letter === 'a' || letter === 'o' || letter === 's') return 0.46;
        if (letter === 'e') return 0.5;
        if (letter === 'h' || letter === 'f' || letter === 't' || letter === 'r') return 0.44;
        return 0.42;
      }),
    [letters],
  );
  const spacing = 0.22;
  const letterPositions = useMemo(() => {
    const positions: number[] = [];
    let current = 0;
    letters.forEach((_, index) => {
      positions.push(current);
      const extraAfter = letters[index + 1] === ',' ? 0.2 : letters[index] === ',' ? -0.08 : 0;
      current += letterWidths[index] + spacing + extraAfter;
    });
    return positions;
  }, [letters, letterWidths]);
  const totalWidth = letterPositions[letterPositions.length - 1] + letterWidths[letterWidths.length - 1];
  const xOffset = -(totalWidth / 2);
  const letterRefs = useRef<Array<Group | null>>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useFrame(({ clock }) => {
    letterRefs.current.forEach((group, index) => {
      if (!group) return;
      const isHovered = hoveredIndex === index;
      const freq = 6; // normal bounce frequency
      const targetY = Math.sin(clock.elapsedTime * freq + index * 0.5) * 0.12 + 0.04;
      const hoverScale = 1.08;

      if (isHovered) {
        // immediate response on hover: set position/scale directly
        group.position.y = targetY;
        group.scale.setScalar(hoverScale);
      } else {
        // smooth return when not hovered
        group.position.y = MathUtils.lerp(group.position.y, 0, 0.28);
        const s = MathUtils.lerp(group.scale.x, 1, 0.18);
        group.scale.setScalar(s);
      }
    });
  });

  return (
    <group position={[-0.05, 12.24, 8.74]} rotation={[0, Math.PI, 0.025]}>
      <group>
        {letters.map((letter, index) => (
          <group
            key={`${letter}-${index}`}
            ref={(ref) => {
              letterRefs.current[index] = ref;
            }}
            position={[xOffset + letterPositions[index], 0, 0]}
            onPointerOver={(event) => {
              event.stopPropagation();
              setHoveredIndex(index);
            }}
            onPointerOut={() => setHoveredIndex(null)}
          >
            {letter !== ' ' ? (
              <>
                <Text3D
                  castShadow
                  receiveShadow
                  font={textFontUrl}
                  size={0.88}
                  height={0.2}
                  curveSegments={6}
                  bevelEnabled
                  bevelSize={0.012}
                  bevelThickness={0.018}
                  position={[0, -0.05, -0.08]}
                >
                  {letter}
                  <meshToonMaterial color="#c792ac" />
                </Text3D>
                <Text3D
                  castShadow
                  receiveShadow
                  font={textFontUrl}
                  size={0.88}
                  height={0.22}
                  curveSegments={6}
                  bevelEnabled
                  bevelSize={0.014}
                  bevelThickness={0.02}
                  position={[0, 0, 0.02]}
                >
                  {letter}
                  <meshToonMaterial color="#f9d6e4" />
                </Text3D>
              </>
            ) : null}
          </group>
        ))}
      </group>
    </group>
  );
}

function BlenderShelfPortrait() {
  const portraitTexture = useMemo(() => createShelfPortraitTexture(), []);

  return (
    <group position={[-8.29, 8.6, -4.12]} rotation={[0, Math.PI / 2, 0]}>
      <mesh>
        <planeGeometry args={[0.72, 0.78]} />
        <meshToonMaterial map={portraitTexture ?? undefined} side={DoubleSide} />
      </mesh>
    </group>
  );
}

function RoomLoadingScreen({ label }: { label: string }) {
  useProgress();

  return (
    <Html fullscreen>
      <div className="room-loading-screen">
        <div className="room-loading-panel">
          <div className="room-loading-label">
            {label}
            <span className="loading-dot">.</span>
            <span className="loading-dot">.</span>
            <span className="loading-dot">.</span>
          </div>
        </div>
      </div>
    </Html>
  );
}

const stickyNoteSpecs: Array<{
  color: string;
  lines: string[];
  position: [number, number, number];
  rotation?: [number, number, number];
}> = [
    {
      color: '#fff1a8',
      lines: ['idea', 'demo'],
      position: [-0.42, 0.24, 0],
      rotation: [0, 0, -0.08],
    },
    {
      color: '#ffc7db',
      lines: ['mix', 'fix'],
      position: [0.04, 0.34, 0.012],
      rotation: [0, 0, 0.05],
    },
    {
      color: '#bdebd1',
      lines: ['ship', 'tiny'],
      position: [0.48, 0.08, 0.024],
      rotation: [0, 0, 0.12],
    },
    {
      color: '#cbd8ff',
      lines: ['lab', 'notes'],
      position: [-0.08, -0.18, 0.036],
      rotation: [0, 0, -0.03],
    },
  ];

function StickyNoteCluster({ scale = 1 }: { scale?: number }) {
  return (
    <group scale={scale}>
      {stickyNoteSpecs.map((note) => (
        <group key={`${note.color}-${note.position.join('-')}`} position={note.position} rotation={note.rotation ?? [0, 0, 0]}>
          <mesh castShadow receiveShadow position={[0, 0, 0]}>
            <boxGeometry args={[0.34, 0.3, 0.004]} />
            <meshToonMaterial color={note.color} />
          </mesh>
          <mesh position={[0, 0.122, 0.004]} rotation={[0, 0, -0.05]}>
            <boxGeometry args={[0.16, 0.024, 0.003]} />
            <meshToonMaterial color="#fffaf0" transparent opacity={0.72} />
          </mesh>
          {note.lines.map((line, index) => (
            <Text
              key={line}
              color="#6b5261"
              fontSize={0.045}
              anchorX="center"
              anchorY="middle"
              position={[0, 0.035 - index * 0.072, 0.005]}
            >
              {line}
            </Text>
          ))}
          {[-0.085, 0, 0.085].map((x, index) => (
            <mesh key={x} position={[x, -0.11 - index * 0.012, 0.005]}>
              <boxGeometry args={[0.052, 0.008, 0.003]} />
              <meshToonMaterial color="#8c6d7b" transparent opacity={0.52} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function BlenderDeskWallStickyNotes() {
  return (
    <group position={[-8.31, 9.08, -6.1]} rotation={[0, Math.PI / 2, -0.015]}>
      <StickyNoteCluster scale={1.32} />
    </group>
  );
}

function MiniWallArtwork({
  color,
  doodle,
  position,
  rotation = [0, 0, 0],
}: {
  color: string;
  doodle: 'flower' | 'sun' | 'heart';
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[0.42, 0.34, 0.012]} />
        <meshToonMaterial color="#fffaf0" />
      </mesh>
      <mesh position={[0, 0, 0.008]}>
        <boxGeometry args={[0.34, 0.26, 0.006]} />
        <meshToonMaterial color={color} />
      </mesh>
      {doodle === 'flower' ? (
        <>
          {[0, 1.26, 2.52, 3.78, 5.04].map((angle) => (
            <mesh
              key={angle}
              position={[Math.cos(angle) * 0.055, 0.035 + Math.sin(angle) * 0.048, 0.014]}
              rotation={[0, 0, angle]}
              scale={[0.036, 0.07, 0.006]}
            >
              <sphereGeometry args={[1, 14, 8]} />
              <meshToonMaterial color="#f5aebd" />
            </mesh>
          ))}
          <mesh position={[0, 0.035, 0.018]} scale={[0.032, 0.032, 0.006]}>
            <sphereGeometry args={[1, 14, 8]} />
            <meshToonMaterial color="#f4d38a" />
          </mesh>
          <mesh position={[0, -0.045, 0.014]}>
            <boxGeometry args={[0.012, 0.12, 0.006]} />
            <meshToonMaterial color="#6f8f6a" />
          </mesh>
        </>
      ) : null}
      {doodle === 'sun' ? (
        <>
          <mesh position={[0, 0.02, 0.014]} scale={[0.07, 0.07, 0.006]}>
            <sphereGeometry args={[1, 18, 10]} />
            <meshToonMaterial color="#f4d38a" />
          </mesh>
          {Array.from({ length: 8 }, (_, index) => {
            const angle = index * (Math.PI / 4);
            return (
              <mesh
                key={angle}
                position={[Math.cos(angle) * 0.12, 0.02 + Math.sin(angle) * 0.12, 0.014]}
                rotation={[0, 0, angle]}
              >
                <boxGeometry args={[0.055, 0.01, 0.006]} />
                <meshToonMaterial color="#d99d55" />
              </mesh>
            );
          })}
        </>
      ) : null}
      {doodle === 'heart' ? (
        <>
          <mesh position={[-0.035, 0.038, 0.014]} scale={[0.054, 0.054, 0.006]}>
            <sphereGeometry args={[1, 16, 8]} />
            <meshToonMaterial color="#e8879e" />
          </mesh>
          <mesh position={[0.035, 0.038, 0.014]} scale={[0.054, 0.054, 0.006]}>
            <sphereGeometry args={[1, 16, 8]} />
            <meshToonMaterial color="#e8879e" />
          </mesh>
          <mesh position={[0, -0.018, 0.014]} rotation={[0, 0, Math.PI / 4]} scale={[0.074, 0.074, 0.006]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshToonMaterial color="#e8879e" />
          </mesh>
        </>
      ) : null}
    </group>
  );
}

function BlenderTopShelfWallArtwork() {
  return (
    <group position={[-8.31, 11.72, -5.42]} rotation={[0, Math.PI / 2, -0.01]} scale={1.32}>
      <MiniWallArtwork color="#d9eef0" doodle="flower" position={[-0.42, 0.1, 0]} rotation={[0, 0, -0.08]} />
      <MiniWallArtwork color="#ffe9b8" doodle="sun" position={[0.08, 0.22, 0.008]} rotation={[0, 0, 0.05]} />
      <MiniWallArtwork color="#f7d4e2" doodle="heart" position={[0.48, -0.08, 0.016]} rotation={[0, 0, 0.1]} />
    </group>
  );
}

function BlenderBedBlankets() {
  const cartoonBedMaterial = (color: string) => {
    const isWhite = color === '#ffffff';

    return (
      <meshToonMaterial
        color={color}
        emissive={isWhite ? '#ffffff' : color}
        emissiveIntensity={isWhite ? 0.16 : 0.03}
      />
    );
  };
  const whitePuffs: Array<[number, number, number, number, number, number]> = [
    [-0.86, -0.02, -0.66, 0.48, 0.2, 0.42],
    [-0.3, 0.03, -0.72, 0.58, 0.22, 0.44],
    [0.3, 0.02, -0.7, 0.58, 0.22, 0.42],
    [0.86, -0.02, -0.62, 0.48, 0.2, 0.4],
    [-0.92, -0.03, -0.02, 0.42, 0.18, 0.58],
    [0.92, -0.03, -0.02, 0.42, 0.18, 0.58],
    [-0.78, -0.04, 0.52, 0.5, 0.18, 0.42],
    [-0.24, -0.01, 0.62, 0.58, 0.2, 0.38],
    [0.32, -0.02, 0.58, 0.56, 0.19, 0.4],
    [0.84, -0.04, 0.48, 0.48, 0.18, 0.42],
  ];
  const pinkPuffs: Array<[number, number, number, number, number, number]> = [
    [-0.68, -0.01, -0.26, 0.48, 0.2, 0.54],
    [-0.22, 0.04, -0.3, 0.54, 0.22, 0.58],
    [0.28, 0.03, -0.28, 0.54, 0.22, 0.58],
    [0.72, -0.01, -0.22, 0.48, 0.2, 0.52],
    [-0.7, -0.02, 0.32, 0.48, 0.19, 0.5],
    [-0.22, 0.02, 0.44, 0.56, 0.21, 0.48],
    [0.28, 0.02, 0.42, 0.56, 0.21, 0.48],
    [0.74, -0.02, 0.3, 0.46, 0.19, 0.48],
  ];

  return (
    <group position={[-1.49, 1.28, 5.76]} rotation={[0, 0, 0]}>
      <mesh castShadow receiveShadow position={[0, -0.34, 0.04]}>
        <boxGeometry args={[2.05, 0.28, 1.78]} />
        {cartoonBedMaterial('#ffffff')}
      </mesh>
      {[
        [-0.96, -0.78, -0.78],
        [0.96, -0.78, -0.78],
        [-0.96, -0.78, 0.84],
        [0.96, -0.78, 0.84],
      ].map(([x, y, z]) => (
        <mesh key={`bed-leg-${x}-${z}`} castShadow receiveShadow position={[x, y, z]}>
          <cylinderGeometry args={[0.12, 0.14, 0.64, 14]} />
          {cartoonBedMaterial('#8b5d39')}
        </mesh>
      ))}
      <mesh castShadow receiveShadow position={[0, -0.08, 0.02]} scale={[2.08, 0.34, 1.86]}>
        <sphereGeometry args={[1, 42, 20]} />
        {cartoonBedMaterial('#ffffff')}
      </mesh>
      {whitePuffs.map(([x, y, z, sx, sy, sz]) => (
        <mesh key={`white-${x}-${z}`} castShadow receiveShadow position={[x, 0.12 + y, z]} scale={[sx, sy, sz]}>
          <sphereGeometry args={[1, 28, 14]} />
          {cartoonBedMaterial(z > 0.4 && x > 0.2 ? '#ffc4d8' : '#ffffff')}
        </mesh>
      ))}
      <mesh castShadow receiveShadow position={[0.86, 0.44, 0.58]} scale={[0.62, 0.2, 0.48]}>
        <sphereGeometry args={[1, 30, 16]} />
        {cartoonBedMaterial('#ffc4d8')}
      </mesh>
      <mesh castShadow receiveShadow position={[0.98, 0.16, 0.7]} scale={[0.16, 0.42, 0.46]}>
        <sphereGeometry args={[1, 24, 14]} />
        {cartoonBedMaterial('#f3aeca')}
      </mesh>
      <mesh castShadow receiveShadow position={[0.52, 0.68, 0.9]} rotation={[0, 0, -0.05]}>
        <boxGeometry args={[1.14, 0.1, 0.62]} />
        {cartoonBedMaterial('#ffc4d8')}
      </mesh>
      <mesh castShadow receiveShadow position={[0.52, 0.34, 1.16]} rotation={[0.12, 0, -0.05]}>
        <boxGeometry args={[1.08, 0.58, 0.12]} />
        {cartoonBedMaterial('#f3aeca')}
      </mesh>
      <mesh castShadow receiveShadow position={[1.12, 0.38, 0.76]} rotation={[0, 0.08, 0.04]}>
        <boxGeometry args={[0.12, 0.5, 0.62]} />
        {cartoonBedMaterial('#ffc4d8')}
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.18, 0.08]} scale={[1.92, 0.36, 1.5]}>
        <sphereGeometry args={[1, 42, 20]} />
        {cartoonBedMaterial('#f3aeca')}
      </mesh>
      {pinkPuffs.map(([x, y, z, sx, sy, sz]) => (
        <mesh key={`pink-${x}-${z}`} castShadow receiveShadow position={[x, 0.4 + y, z]} scale={[sx, sy, sz]}>
          <sphereGeometry args={[1, 28, 14]} />
          {cartoonBedMaterial('#ffc4d8')}
        </mesh>
      ))}
    </group>
  );
}

function BlenderOpenWindowFrame() {
  const woodMaterial = () => <meshStandardMaterial color="#d8b58b" roughness={0.84} />;

  return (
    <group position={[-8.22, 9.72, -0.63]}>
      <mesh castShadow receiveShadow position={[0, 3.25, 0]}>
        <boxGeometry args={[0.22, 0.22, 4.7]} />
        {woodMaterial()}
      </mesh>
      <mesh castShadow receiveShadow position={[0, -3.25, 0]}>
        <boxGeometry args={[0.22, 0.22, 4.7]} />
        {woodMaterial()}
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0, -2.34]}>
        <boxGeometry args={[0.22, 6.7, 0.22]} />
        {woodMaterial()}
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0, 2.34]}>
        <boxGeometry args={[0.22, 6.7, 0.22]} />
        {woodMaterial()}
      </mesh>
      <mesh castShadow receiveShadow position={[-0.01, 0, 0]}>
        <boxGeometry args={[0.24, 6.15, 0.16]} />
        {woodMaterial()}
      </mesh>
      <mesh castShadow receiveShadow position={[-0.01, 0, 0]}>
        <boxGeometry args={[0.24, 0.16, 4.25]} />
        {woodMaterial()}
      </mesh>
    </group>
  );
}

function CameraRig({
  activeSection,
  homeView,
}: {
  activeSection: PortfolioSection | null;
  homeView: { position: [number, number, number]; lookAt: [number, number, number] };
}) {
  const targetPosition = useMemo(
    () => new Vector3(...(activeSection?.cameraPosition ?? homeView.position)),
    [activeSection, homeView.position],
  );
  const lookAt = useMemo(() => new Vector3(...(activeSection?.lookAt ?? homeView.lookAt)), [activeSection, homeView.lookAt]);
  const currentLook = useRef(new Vector3(...homeView.lookAt));

  useFrame(({ camera, controls }, delta) => {
    const t = 1 - Math.exp(-delta * 2.8);
    camera.position.lerp(targetPosition, t);
    currentLook.current.lerp(lookAt, t);
    camera.lookAt(currentLook.current);

    const orbitControls = controls as { target?: Vector3; update?: () => void } | undefined;
    if (orbitControls?.target && orbitControls.update) {
      orbitControls.target.lerp(currentLook.current, t);
      orbitControls.update();
    }
  });

  return null;
}

function RoomLights({ nightMode }: { nightMode: boolean }) {
  return (
    <>
      <ambientLight intensity={nightMode ? 0.34 : 0.48} color={nightMode ? '#c8d8ff' : '#fff0e8'} />
      <hemisphereLight args={[nightMode ? '#7f96c0' : '#e7f3ff', nightMode ? '#5d5662' : '#d7c3a7', nightMode ? 0.68 : 0.9]} />
      <rectAreaLight
        position={[-8.06, 9.72, -0.63]}
        rotation={[0, Math.PI / 2, 0]}
        width={4.25}
        height={6.35}
        intensity={nightMode ? 0.52 : 0.28}
        color={nightMode ? '#c7d9ff' : '#f4faff'}
      />
      <directionalLight
        castShadow
        position={nightMode ? [-12, 22, -10] : [-10, 18, -8]}
        intensity={nightMode ? 0.62 : 1.12}
        color={nightMode ? '#d8e4ff' : '#fff0d6'}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.00018}
        shadow-normalBias={0.035}
        shadow-camera-near={0.5}
        shadow-camera-far={48}
        shadow-camera-left={-16}
        shadow-camera-right={16}
        shadow-camera-top={16}
        shadow-camera-bottom={-16}
      />
      <pointLight position={[-3.2, 3.15, 3.7]} intensity={nightMode ? 3.4 : 4.8} color={nightMode ? '#ffd4a8' : '#ffc98d'} distance={34} decay={0.92} />
      <pointLight position={[4.1, 5.45, -4.7]} intensity={nightMode ? 11.5 : 17} color={nightMode ? '#ffe1b3' : '#ffe7ba'} distance={14} decay={1.55} />
      <spotLight
        castShadow
        position={[2.8, 7.8, 2.4]}
        angle={0.68}
        penumbra={0.82}
        intensity={nightMode ? 4.4 : 6}
        color={nightMode ? '#ffe6bf' : '#fff5df'}
        distance={13}
        decay={2}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.00012}
      />
    </>
  );
}

function RoomShell({
  onPlaceVinyl,
  vinylPlacementMode,
}: {
  onPlaceVinyl?: (point: [number, number, number]) => void;
  vinylPlacementMode: boolean;
}) {
  const renderTexture = useTexture('/roomrender_1png.png');

  return (
    <group>
      <mesh
        receiveShadow
        position={[0, -0.04, 0]}
        onClick={(event) => {
          if (!vinylPlacementMode || !onPlaceVinyl) return;
          event.stopPropagation();
          onPlaceVinyl([
            Number(event.point.x.toFixed(3)),
            Number(event.point.y.toFixed(3)),
            Number(event.point.z.toFixed(3)),
          ]);
        }}
      >
        <boxGeometry args={[7.2, 0.08, 6.6]} />
        <meshStandardMaterial color="#cba46f" roughness={0.72} />
      </mesh>
      <mesh receiveShadow position={[0, 1.75, -3.25]}>
        <boxGeometry args={[7.2, 3.6, 0.1]} />
        <meshStandardMaterial color="#d9cdb9" roughness={0.84} />
      </mesh>
      <mesh receiveShadow position={[-3.6, 1.75, 0]}>
        <boxGeometry args={[0.1, 3.6, 6.6]} />
        <meshStandardMaterial color="#cfc6b8" roughness={0.86} />
      </mesh>
      <mesh receiveShadow position={[3.6, 0.55, -2.15]}>
        <boxGeometry args={[0.1, 1.16, 2.2]} />
        <meshStandardMaterial color="#ded4c2" roughness={0.86} />
      </mesh>
      <mesh position={[1.75, 2.02, -3.18]} rotation={[0, 0, 0]}>
        <planeGeometry args={[1.76, 0.99]} />
        <meshStandardMaterial map={renderTexture} roughness={0.35} />
      </mesh>
      <mesh position={[1.75, 2.02, -3.235]}>
        <boxGeometry args={[1.92, 1.15, 0.055]} />
        <meshStandardMaterial color="#6e4f3e" roughness={0.55} />
      </mesh>
      <FallbackDeskWallStickyNotes />
      <Window />
      <Rug />
    </group>
  );
}

function Window() {
  return (
    <group position={[-2.85, 2.08, -3.16]}>
      <mesh>
        <boxGeometry args={[1.05, 1.28, 0.06]} />
        <meshStandardMaterial color="#f5ead6" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0, 0.04]}>
        <planeGeometry args={[0.88, 1.08]} />
        <meshStandardMaterial color="#b8d7db" emissive="#7bb5bd" emissiveIntensity={0.18} />
      </mesh>
      <mesh position={[0, 0, 0.08]}>
        <boxGeometry args={[0.06, 1.1, 0.04]} />
        <meshStandardMaterial color="#f5ead6" />
      </mesh>
      <mesh position={[0, 0, 0.08]}>
        <boxGeometry args={[0.9, 0.055, 0.04]} />
        <meshStandardMaterial color="#f5ead6" />
      </mesh>
    </group>
  );
}

function FallbackDeskWallStickyNotes() {
  return (
    <group position={[0.06, 2.28, -3.18]} rotation={[0, 0, 0]}>
      <StickyNoteCluster scale={0.9} />
    </group>
  );
}

function Rug() {
  return (
    <mesh receiveShadow position={[0.65, 0.025, 0.55]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[1.45, 56]} />
      <meshStandardMaterial color="#cc756d" roughness={0.9} />
    </mesh>
  );
}

function Furniture({
  activeSection,
  onSelect,
}: {
  activeSection: PortfolioSection | null;
  onSelect: (section: PortfolioSection) => void;
}) {
  const showLabels = !activeSection;

  return (
    <group>
      <Desk section={portfolioSections[0]} onSelect={onSelect} showLabel={showLabels} />
      <Whiteboard section={portfolioSections[1]} onSelect={onSelect} showLabel={showLabels} />
      <ProstheticDisplay section={portfolioSections[2]} onSelect={onSelect} showLabel={showLabels} />
      <ProjectStation section={portfolioSections[3]} onSelect={onSelect} showLabel={showLabels} />
      <Bookshelf section={portfolioSections[4]} onSelect={onSelect} showLabel={showLabels} />
      <MusicKeyboard section={portfolioSections[5]} onSelect={onSelect} showLabel={showLabels} />
      <Bed />
      <Plant />
    </group>
  );
}

type InteractiveProps = {
  section: PortfolioSection;
  onSelect: (section: PortfolioSection) => void;
  children: React.ReactNode;
  position?: [number, number, number];
  showLabel?: boolean;
};

function InteractiveObject({ section, onSelect, children, position = [0, 0, 0], showLabel = true }: InteractiveProps) {
  const group = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const lift = hovered ? 0.045 + Math.sin(clock.elapsedTime * 4) * 0.012 : 0;
    group.current.position.y = MathUtils.lerp(group.current.position.y, position[1] + lift, 0.18);
  });

  const select = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onSelect(section);
  };

  return (
    <group
      ref={group}
      position={position}
      onClick={select}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => {
        setHovered(false);
      }}
    >
      {children}
      {showLabel ? (
        <Html center position={[0, 0.72, 0]} distanceFactor={7.5} occlude>
          <button
            className="rounded-full border border-white/70 bg-ink/80 px-3 py-1 text-xs font-semibold text-paper shadow-lg transition hover:border-pink-200 hover:bg-pink-200 hover:text-ink"
            onClick={(event) => {
              event.stopPropagation();
              onSelect(section);
            }}
          >
            {section.objectName}
          </button>
        </Html>
      ) : null}
    </group>
  );
}

function Desk({
  section,
  onSelect,
  showLabel,
}: {
  section: PortfolioSection;
  onSelect: (section: PortfolioSection) => void;
  showLabel: boolean;
}) {
  return (
    <group position={[0.55, 0, -1.55]}>
      <mesh castShadow receiveShadow position={[0, 0.68, 0]}>
        <boxGeometry args={[2.15, 0.16, 0.82]} />
        <meshStandardMaterial color="#8b6248" roughness={0.62} />
      </mesh>
      {[-0.88, 0.88].map((x) =>
        [-0.28, 0.28].map((z) => (
          <mesh key={`${x}-${z}`} castShadow position={[x, 0.33, z]}>
            <boxGeometry args={[0.11, 0.68, 0.11]} />
            <meshStandardMaterial color="#5a3c2e" roughness={0.7} />
          </mesh>
        )),
      )}
      <InteractiveObject section={section} onSelect={onSelect} showLabel={showLabel} position={[0.08, 0.84, 0.02]}>
        <mesh castShadow rotation={[-0.12, 0, 0]} position={[0, 0.04, 0.12]}>
          <boxGeometry args={[0.9, 0.055, 0.58]} />
          <meshStandardMaterial color="#23272f" roughness={0.5} metalness={0.25} />
        </mesh>
        <mesh castShadow position={[0, 0.38, -0.18]} rotation={[0.33, 0, 0]}>
          <boxGeometry args={[0.92, 0.56, 0.045]} />
          <meshStandardMaterial color="#1c2028" roughness={0.42} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0.39, -0.207]} rotation={[0.33, 0, 0]}>
          <planeGeometry args={[0.78, 0.43]} />
          <meshStandardMaterial color="#8fd3d7" emissive="#2d7d83" emissiveIntensity={0.45} />
        </mesh>
      </InteractiveObject>
    </group>
  );
}

function Whiteboard({
  section,
  onSelect,
  showLabel,
}: {
  section: PortfolioSection;
  onSelect: (section: PortfolioSection) => void;
  showLabel: boolean;
}) {
  return (
    <InteractiveObject section={section} onSelect={onSelect} showLabel={showLabel} position={[-2.55, 1.48, -3.06]}>
      <mesh castShadow>
        <boxGeometry args={[1.55, 0.95, 0.06]} />
        <meshStandardMaterial color="#f6f1e8" roughness={0.4} />
      </mesh>
      {[
        [-0.44, 0.18, '#f2c94c'],
        [0.2, 0.13, '#88c0d0'],
        [0.48, -0.22, '#e08e79'],
      ].map(([x, y, color]) => (
        <mesh key={`${x}-${y}`} position={[x as number, y as number, 0.045]}>
          <boxGeometry args={[0.28, 0.22, 0.012]} />
          <meshStandardMaterial color={color as string} roughness={0.78} />
        </mesh>
      ))}
      <Text position={[0, -0.33, 0.048]} fontSize={0.085} color="#465046" anchorX="center">
        RAG + KG + secure embedded AI
      </Text>
    </InteractiveObject>
  );
}

function ProstheticDisplay({
  section,
  onSelect,
  showLabel,
}: {
  section: PortfolioSection;
  onSelect: (section: PortfolioSection) => void;
  showLabel: boolean;
}) {
  return (
    <group position={[-2.55, 0, 0.32]}>
      <mesh castShadow receiveShadow position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.38, 0.48, 0.9, 28]} />
        <meshStandardMaterial color="#6f7f64" roughness={0.66} />
      </mesh>
      <InteractiveObject section={section} onSelect={onSelect} showLabel={showLabel} position={[0, 1.05, 0]}>
        <mesh castShadow rotation={[0.2, 0, -0.3]} position={[0, 0.22, 0]}>
          <capsuleGeometry args={[0.09, 0.7, 8, 16]} />
          <meshStandardMaterial color="#f1d3bd" roughness={0.52} />
        </mesh>
        <mesh castShadow rotation={[0.2, 0.28, 0.18]} position={[0.13, -0.18, 0.04]}>
          <capsuleGeometry args={[0.055, 0.36, 8, 16]} />
          <meshStandardMaterial color="#e7b796" roughness={0.56} />
        </mesh>
        <mesh castShadow position={[-0.08, -0.18, -0.02]}>
          <sphereGeometry args={[0.13, 18, 16]} />
          <meshStandardMaterial color="#2d7d83" roughness={0.42} metalness={0.15} />
        </mesh>
      </InteractiveObject>
    </group>
  );
}

function ProjectStation({
  section,
  onSelect,
  showLabel,
}: {
  section: PortfolioSection;
  onSelect: (section: PortfolioSection) => void;
  showLabel: boolean;
}) {
  return (
    <group position={[2.55, 0, -1.45]}>
      <mesh castShadow receiveShadow position={[0, 0.58, 0]}>
        <boxGeometry args={[1.32, 0.13, 0.62]} />
        <meshStandardMaterial color="#73513e" roughness={0.7} />
      </mesh>
      <mesh castShadow position={[0, 1.08, -0.13]}>
        <boxGeometry args={[0.95, 0.58, 0.055]} />
        <meshStandardMaterial color="#202329" roughness={0.48} metalness={0.15} />
      </mesh>
      <mesh position={[0, 1.08, -0.165]}>
        <planeGeometry args={[0.8, 0.42]} />
        <meshStandardMaterial color="#f6b66d" emissive="#d96b5f" emissiveIntensity={0.32} />
      </mesh>
      <InteractiveObject section={section} onSelect={onSelect} showLabel={showLabel} position={[0.02, 0.72, 0.18]}>
        <mesh castShadow>
          <boxGeometry args={[0.62, 0.12, 0.28]} />
          <meshStandardMaterial color="#242833" roughness={0.52} />
        </mesh>
        <mesh castShadow position={[-0.24, 0.08, 0]}>
          <cylinderGeometry args={[0.075, 0.075, 0.035, 24]} />
          <meshStandardMaterial color="#aeb7c7" roughness={0.45} />
        </mesh>
        <mesh castShadow position={[0.24, 0.08, 0]}>
          <cylinderGeometry args={[0.075, 0.075, 0.035, 24]} />
          <meshStandardMaterial color="#cc756d" roughness={0.45} />
        </mesh>
      </InteractiveObject>
    </group>
  );
}

function Bookshelf({
  section,
  onSelect,
  showLabel,
}: {
  section: PortfolioSection;
  onSelect: (section: PortfolioSection) => void;
  showLabel: boolean;
}) {
  const bookColors = ['#2d7d83', '#d96b5f', '#586b4f', '#8a5f9e', '#bf7f3f'];

  return (
    <InteractiveObject section={section} onSelect={onSelect} showLabel={showLabel} position={[-1.5, 0.05, -2.62]}>
      <mesh castShadow receiveShadow position={[0, 0.82, 0]}>
        <boxGeometry args={[1.45, 1.62, 0.32]} />
        <meshStandardMaterial color="#7a563f" roughness={0.66} />
      </mesh>
      {[0.34, 0.82, 1.29].map((y) => (
        <mesh key={y} castShadow position={[0, y, 0.18]}>
          <boxGeometry args={[1.36, 0.055, 0.12]} />
          <meshStandardMaterial color="#4b3328" roughness={0.7} />
        </mesh>
      ))}
      {Array.from({ length: 18 }, (_, index) => {
        const row = Math.floor(index / 6);
        const col = index % 6;
        return (
          <mesh key={index} castShadow position={[-0.52 + col * 0.19, 0.52 + row * 0.45, 0.26]}>
            <boxGeometry args={[0.12, 0.32 + (index % 3) * 0.035, 0.08]} />
            <meshStandardMaterial color={bookColors[index % bookColors.length]} roughness={0.72} />
          </mesh>
        );
      })}
    </InteractiveObject>
  );
}

function MusicKeyboard({
  section,
  onSelect,
  showLabel,
}: {
  section: PortfolioSection;
  onSelect: (section: PortfolioSection) => void;
  showLabel: boolean;
}) {
  return (
    <InteractiveObject section={section} onSelect={onSelect} showLabel={showLabel} position={[1.1, 0.58, 0.92]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.3, 0.16, 0.46]} />
        <meshStandardMaterial color="#242424" roughness={0.5} />
      </mesh>
      {Array.from({ length: 12 }, (_, index) => (
        <mesh key={index} castShadow position={[-0.55 + index * 0.1, 0.1, 0.03]}>
          <boxGeometry args={[0.07, 0.035, 0.31]} />
          <meshStandardMaterial color="#f7f1e8" roughness={0.36} />
        </mesh>
      ))}
      {[1, 2, 4, 5, 6, 8, 9, 11].map((index) => (
        <mesh key={index} castShadow position={[-0.58 + index * 0.1, 0.13, -0.055]}>
          <boxGeometry args={[0.045, 0.055, 0.17]} />
          <meshStandardMaterial color="#111317" roughness={0.5} />
        </mesh>
      ))}
    </InteractiveObject>
  );
}

function Bed() {
  return (
    <group position={[2.55, 0, 1.55]}>
      <mesh castShadow receiveShadow position={[0, 0.34, 0]}>
        <boxGeometry args={[1.85, 0.38, 1.95]} />
        <meshStandardMaterial color="#ddd2c3" roughness={0.82} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.6, -0.12]} scale={[0.98, 0.14, 0.78]}>
        <sphereGeometry args={[1, 32, 16]} />
        <meshStandardMaterial color="#fff4e8" roughness={0.92} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.74, -0.38]} scale={[0.84, 0.16, 0.54]}>
        <sphereGeometry args={[1, 32, 16]} />
        <meshStandardMaterial color="#eab5c7" roughness={0.9} />
      </mesh>
      <mesh castShadow position={[-0.48, 0.76, 0.5]} scale={[0.34, 0.13, 0.24]}>
        <sphereGeometry args={[1, 24, 12]} />
        <meshStandardMaterial color="#fff8ef" roughness={0.94} />
      </mesh>
      <mesh castShadow position={[0.34, 0.75, 0.46]} scale={[0.32, 0.12, 0.22]}>
        <sphereGeometry args={[1, 24, 12]} />
        <meshStandardMaterial color="#fff8ef" roughness={0.94} />
      </mesh>
    </group>
  );
}

function Plant() {
  return (
    <Float speed={1.4} rotationIntensity={0.04} floatIntensity={0.05}>
      <group position={[-3.05, 0, 2.22]}>
        <mesh castShadow position={[0, 0.28, 0]}>
          <cylinderGeometry args={[0.22, 0.28, 0.48, 24]} />
          <meshStandardMaterial color="#b76e4c" roughness={0.7} />
        </mesh>
        {[0, 1.7, 3.4, 5.1].map((rotation) => (
          <mesh key={rotation} castShadow position={[0, 0.76, 0]} rotation={[0.65, rotation, 0.2]}>
            <coneGeometry args={[0.16, 0.7, 18]} />
            <meshStandardMaterial color="#526b45" roughness={0.64} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

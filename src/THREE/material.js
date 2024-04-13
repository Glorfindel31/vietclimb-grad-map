import * as THREE from 'three';

export const hoverMaterial = new THREE.MeshPhongMaterial({
    color: 0xfcba03,
    emissive: 0xfcba03,
    emissiveIntensity: 1.8,
});
export const wallMaterial = new THREE.MeshPhongMaterial({
    color: 0xebdeb9,
    specular: 0xffffff,
    shininess: 0,
    shadowSide: THREE.DoubleSide,
});
export const matsMaterial = new THREE.MeshPhongMaterial({
    color: 0x8a8a8a,
    specular: 0xffffff,
    shininess: 100,
    shadowSide: THREE.DoubleSide,
});

export const defaultMaterial = new THREE.MeshStandardMaterial({color: 0xf5426c});

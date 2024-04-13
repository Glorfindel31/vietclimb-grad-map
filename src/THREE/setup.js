import * as THREE from 'three';

export const scene = new THREE.Scene();
export const mouse = new THREE.Vector2();
export const raycaster = new THREE.Raycaster();

export function lightSetup() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // soft white light

    const pointLight01 = new THREE.PointLight(0xffffff, 600, 800);
    pointLight01.position.set(-5, 20, -10); // Adjust position as needed
    pointLight01.castShadow = true;
    pointLight01.shadow.mapSize.width = 1500; // default is 512
    pointLight01.shadow.mapSize.height = 1500; // default is 512
    pointLight01.shadow.camera.near = 0.2; // default
    pointLight01.shadow.camera.far = 10; // default

    return {
        ambientLight,
        pointLight01,
    };
}

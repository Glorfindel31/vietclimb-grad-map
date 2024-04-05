<script setup lang="js">
import * as THREE from 'three';
import { onMounted, onUnmounted, ref } from 'vue';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
let camera, renderer, mesh, controls;

const mapContainer = ref(null);
// Function to handle window resize
const onWindowResize = () => {
    // Update camera aspect ratio
    camera.aspect = mapContainer.value.clientWidth / mapContainer.value.clientHeight;
    camera.updateProjectionMatrix();

    // Update renderer size
    renderer.setSize(mapContainer.value.clientWidth, mapContainer.value.clientHeight);
};

onMounted(() => {
    // Create a camera
    camera = new THREE.PerspectiveCamera(
        20,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    // Create a renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0x545454, 1);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(mapContainer.value.clientWidth, mapContainer.value.clientHeight);

    // Append the renderer to the container element
    if (mapContainer.value) {
        mapContainer.value.appendChild(renderer.domElement);
        renderer.setSize(mapContainer.value.clientWidth, mapContainer.value.clientHeight);

        // Create OrbitControls
        controls = new OrbitControls(camera, renderer.domElement);

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 1); // soft white light
        scene.add(ambientLight);

        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xbdf4ff, 0.5);
        directionalLight.position.set(1, 1, 2); // Adjust position as needed
        scene.add(directionalLight);

        // Load the GLTF model
        const loader = new GLTFLoader();
        loader.load('/VCmapThreeJS.glb', (gltf) => {
            console.log('Model loaded successfully');

            // Add the model to the scene
            scene.add(gltf.scene);

            // Calculate the bounding box of the entire scene to find its center
            const boundingBox = new THREE.Box3().setFromObject(gltf.scene);
            const center = boundingBox.getCenter(new THREE.Vector3());


            gltf.scene.position.sub(center);

            // Set the OrbitControls target to the new center of the scene
            controls.target.set(0, 0, 0);
            controls.update();

            // Example camera position adjustment
            // Adjust these values as needed to position the camera correctly
            camera.position.set(40, 37, 41); // Example position, adjust as needed
            camera.lookAt(controls.target); // Make the camera look at the new target

            // Apply shaders
            gltf.scene.traverse((child) => {
                if (child.isMesh) {
                    console.log('Geometry name:', child.name);

                    if (child.name === 'G-Object004') {
                        child.material = new THREE.MeshPhongMaterial({
                            color: 0xffecc7,
                            specular: 0xffffff,
                            shininess: 0,
                        });
                    } else if (child.name === 'G-Object005') {
                        child.material = new THREE.MeshPhongMaterial({
                            color: 0x3b3b3b,
                            specular: 0xffffff,
                            shininess: 100,
                        });
                    } else {
                        child.material = new THREE.MeshStandardMaterial({ color: 0x808080 });
                    }
                }
            });


            // Animation loop
            const animate = () => {
                requestAnimationFrame(animate);

                // Render the scene
                renderer.render(scene, camera);
            };

            animate();
        }, undefined, (error) => {
            console.error('An error while loading the model');
        });



        // Add event listener for window resize
        window.addEventListener('resize', onWindowResize);
    }
});

onUnmounted(() => {
    // Clean up
    if (mapContainer.value) {
        mapContainer.value.removeChild(renderer.domElement);
    }
    renderer.dispose(); // Correctly dispose of the renderer

    // Correctly dispose of geometries and materials in the scene
    scene.traverse((object) => {
        if (object.geometry) {
            object.geometry.dispose();
        }
        if (object.material) {
            if (Array.isArray(object.material)) {
                object.material.forEach((material) => material.dispose());
            } else {
                object.material.dispose();
            }
        }
    });

    // Remove event listener for window resize
    window.removeEventListener('resize', onWindowResize);
});
</script>

<template>
    <div class="min-w-full min-h-full border rounded-lg p-4">
        <div ref="mapContainer" class="w-full h-[80vh] overflow-hidden flex justify-center items-center"></div>
    </div>
</template>

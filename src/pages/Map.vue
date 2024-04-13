<script setup lang="js">
import * as THREE from 'three';
import { onMounted, onUnmounted, ref } from 'vue';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { hoverMaterial, wallMaterial, matsMaterial, defaultMaterial } from '@/THREE/material'
import { scene, raycaster, mouse, lightSetup } from '@/THREE/setup'

let camera, renderer, mesh, controls, hoverMesh;
const mapContainer = ref(null);
const mouseBox = ref(null);

// Function to handle window resize
const onWindowResize = () => {
    // Update camera aspect ratio
    camera.aspect = mapContainer.value.clientWidth / mapContainer.value.clientHeight;
    camera.updateProjectionMatrix();

    // Update renderer size
    renderer.setSize(mapContainer.value.clientWidth, mapContainer.value.clientHeight);
};

//Mouse over function
function onMouseMove(event) {
    function textBeautifier(string) {
        return string.replace(/\d+/g, '') // Remove all digits
            .replace(/_/g, ' ') // Replace underscores with spaces
            .replace(/\b\w/g, function (l) { return l.toUpperCase() }) // Capitalize the first letter of each word
            .replace(/\s\w/g, function (l) { return l.toLowerCase() }) // Ensure the rest of the letters are in lowercase
            .replace(/([A-Z])/g, ' $1') // Add a space before each capital letter (excluding the first letter)
            .trim(); // Remove any leading or trailing spaces
    }
    // Normalize mouse position to -1 to +1 range
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0 && intersects[0].object.name !== '10Mats') {
        // Get the first intersected mesh
        const mesh = intersects[0].object;
        if (hoverMesh && hoverMesh !== mesh) {
            hoverMesh.material = wallMaterial
        }
        mesh.material = hoverMaterial;
        hoverMesh = mesh;
        const windowX = event.clientX;
        const windowY = event.clientY;
        const boxWidth = mouseBox.value.offsetWidth;
        const boxHeight = mouseBox.value.offsetHeight;

        let hoverX = windowX + 20; // Adjust offset as needed
        let hoverY = windowY + 10; // Adjust offset as needed

        // Prevent hover box from going off screen
        if (hoverX + boxWidth > window.innerWidth) {
            hoverX = windowX - boxWidth - 10; // Adjust offset as needed
        }
        if (hoverY + boxHeight > window.innerHeight) {
            hoverY = windowY - boxHeight - 10; // Adjust offset as needed
        }
        mouseBox.value.style.left = `${hoverX}px`;
        mouseBox.value.style.top = `${hoverY}px`;
        mouseBox.value.style.visibility = 'visible';
        mouseBox.value.textContent = textBeautifier(mesh.name)
    } else {
        if (hoverMesh) {
            hoverMesh.material = wallMaterial;
            hoverMesh = null;
        }
        mouseBox.value.style.visibility = 'hidden';
    }
}

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
    renderer.setClearColor(0x171717, 0.7);
    renderer.setPixelRatio(window.devicePixelRatio * 1.5);
    renderer.setSize(mapContainer.value.clientWidth, mapContainer.value.clientHeight);
    renderer.shadowMap.enabled = true;

    const composer = new EffectComposer(renderer);
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.2, // Strength
        0.1, // Radius
        0.95 // Threshold
    );
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // Append the renderer to the container element
    if (mapContainer.value) {
        mapContainer.value.appendChild(renderer.domElement);
        renderer.setSize(mapContainer.value.clientWidth, mapContainer.value.clientHeight);
        // Create OrbitControls
        controls = new OrbitControls(camera, renderer.domElement);
        // Add ambient light
        const { ambientLight, pointLight01 } = lightSetup()
        scene.add(ambientLight);
        scene.add(pointLight01);
        // Load the GLTF model
        const loader = new GLTFLoader();
        loader.load('/VCmapThreeJS.glb', (gltf) => {
            // Add the model to the scene
            scene.add(gltf.scene);
            // Calculate the bounding box of the entire scene to find its center
            const boundingBox = new THREE.Box3().setFromObject(gltf.scene);
            const center = boundingBox.getCenter(new THREE.Vector3());

            gltf.scene.position.sub(center);
            // Set the OrbitControls target to the new center of the scene
            controls.target.set(0, 0, 0);
            controls.update();

            // Camera position adjustment
            camera.position.set(40, 37, 41);
            camera.lookAt(controls.target);
            // Apply shaders
            gltf.scene.traverse((child) => {
                if (child.isMesh) {
                    if (child.name !== '10Mats') {
                        child.material = wallMaterial;
                        child.castShadow = true;
                    } else if (child.name === '10Mats') {
                        child.material = matsMaterial;
                        child.receiveShadow = true;
                    } else {
                        child.material = defaultMaterial;
                        child.receiveShadow = true;
                    }
                }
            });
        }, undefined, (error) => {
            console.error('An error while loading the model');
        });
        // Add event listener
        window.addEventListener('resize', onWindowResize);
        renderer.domElement.addEventListener('mousemove', onMouseMove, false);
    }
    // Animation camera
    const animate = () => {
        requestAnimationFrame(animate);
        composer.render()
    };

    animate();
});

onUnmounted(() => {
    // Clean up
    if (mapContainer.value) {
        mapContainer.value.removeChild(renderer.domElement);
    }
    renderer.dispose();
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
    window.removeEventListener('resize', onWindowResize);
    renderer.domElement.removeEventListener('mousemove', onMouseMove, false);
});
</script>

<template>
    <div class="min-w-full min-h-full border rounded-lg p-4">
        <h2 class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            3D Gym's Map</h2>
        <blockquote class="mt-6 border-l-2 pl-6 italic mb-4">
            In the case you are not familiar with the gym's zones
        </blockquote>

        <div ref="mapContainer" class="w-full h-[70vh] overflow-hidden flex justify-center items-center"></div>
    </div>
    <div class="border border-foreground absolute z-50 top-0 left-0 px-4 py-2 rounded-sm bg-background" ref="mouseBox"
        id="mouseBox" style="visibility: hidden"></div>
</template>

<script setup lang="js">
import * as THREE from 'three';
import { onMounted, onUnmounted, ref } from 'vue';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js'

let camera, renderer, mesh, controls;


let hoverMesh = null;
const mapContainer = ref(null);
const scene = new THREE.Scene();

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const hoverMaterial = new THREE.MeshPhongMaterial({
    color: 0xfcba03,
    emissive: 0xfcba03,
    emissiveIntensity: 1.8,
});
const wallMaterial = new THREE.MeshPhongMaterial({
    color: 0xebdeb9,
    specular: 0xffffff,
    shininess: 0,
    shadowSide: THREE.DoubleSide,
});
const matsMaterial = new THREE.MeshPhongMaterial({
    color: 0x8a8a8a,
    specular: 0xffffff,
    shininess: 100,
    shadowSide: THREE.DoubleSide,
});

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
    } else {
        if (hoverMesh) {
            hoverMesh.material = wallMaterial;
            hoverMesh = null;
        }
    }
}

// Function to revert the material of all meshes to their original state
function revertMaterials() {
    if (hoverMesh) {
        hoverMesh.material = wallMaterial;
        hoverMesh = null; // Reset the hoveredMesh variable
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

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x171717, 0.7);
    renderer.setPixelRatio(window.devicePixelRatio * 2);
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
    const fxaaPass = new ShaderPass(FXAAShader);
    fxaaPass.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
    fxaaPass.renderToScreen = true;
    composer.addPass(renderScene);
    composer.addPass(bloomPass);
    composer.addPass(fxaaPass);

    // Append the renderer to the container element
    if (mapContainer.value) {
        mapContainer.value.appendChild(renderer.domElement);
        renderer.setSize(mapContainer.value.clientWidth, mapContainer.value.clientHeight);


        // Create OrbitControls
        controls = new OrbitControls(camera, renderer.domElement);

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.4); // soft white light



        // Add point light
        const pointLight01 = new THREE.PointLight(0xffffff, 600, 800);
        pointLight01.position.set(-5, 20, -10); // Adjust position as needed
        pointLight01.castShadow = true;
        pointLight01.shadow.mapSize.width = 1500; // default is 512
        pointLight01.shadow.mapSize.height = 1500; // default is 512
        pointLight01.shadow.camera.near = 0.2; // default
        pointLight01.shadow.camera.far = 10; // default

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
                        child.mateiral = THREE.SmoothShading;
                        child.receiveShadow = true;
                    } else {
                        child.material = new THREE.MeshStandardMaterial({ color: 0xf5426c });
                        child.receiveShadow = true;
                    }
                }
            });

            // Animation camera
            const animate = () => {
                requestAnimationFrame(animate);

                // Render the scene
                // renderer.render(scene, camera);
                composer.render()
            };

            animate();
        }, undefined, (error) => {
            console.error('An error while loading the model');
        });

        // Add event listener
        window.addEventListener('resize', onWindowResize);
        renderer.domElement.addEventListener('mousemove', onMouseMove, false);
        window.addEventListener('mouseleave', revertMaterials, false);

    }
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
    window.removeEventListener('mouseleave', revertMaterials, false);

});
</script>

<template>
    <div class="min-w-full min-h-full border rounded-lg p-4">
        <div ref="mapContainer" class="w-full h-[80vh] overflow-hidden flex justify-center items-center"></div>
    </div>
</template>

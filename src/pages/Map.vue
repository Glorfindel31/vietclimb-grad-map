<script setup lang="js">
      import * as THREE from 'three';
      import { onMounted, onUnmounted, ref } from 'vue';
      import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
      import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

      const scene = new THREE.Scene();
      let camera, renderer, mesh, controls;

      const mapContainer = ref(null);

      onMounted(() => {
          // Create a camera
          camera = new THREE.PerspectiveCamera(
              50,
              window.innerWidth / window.innerHeight,
              0.1,
              1000
          );
          camera.position.z = 20;

         // Create a renderer
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);

    // Append the renderer to the container element
    if (mapContainer.value) {
          mapContainer.value.appendChild(renderer.domElement);
      }

          // Create OrbitControls
          controls = new OrbitControls(camera, renderer.domElement);

          // Add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 4); // soft white light
      scene.add(ambientLight);

      // Add directional light
      const directionalLight = new THREE.DirectionalLight(0xFFA500, 3);
      directionalLight.position.set(1, 1, 1); // Adjust position as needed
      scene.add(directionalLight);

          // Load the GLTF model
          const loader = new GLTFLoader();
          loader.load('/VCmapThreeJS.glb', (gltf) => {
              console.log('Model loaded successfully');
              // Apply a grey material to the model
              gltf.scene.traverse((child) => {
                  if (child.isMesh) {
                      child.material = new THREE.MeshStandardMaterial({ color: 0x808080 });
                  }
              });

              // Add the model to the scene
              scene.add(gltf.scene);

              // Animation loop
              const animate = () => {
                  requestAnimationFrame(animate);

                  // Render the scene
                  renderer.render(scene, camera);
              };

              animate();
          },  undefined, (error) => {
              console.error('An error while loading the model')
          }
      );

      // Function to handle window resize
      const onWindowResize = () => {
          // Update camera aspect ratio
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();

          // Update renderer size
          renderer.setSize(window.innerWidth, window.innerHeight);
      };

      // Add event listener for window resize
      window.addEventListener('resize', onWindowResize);

      });

      onUnmounted(() => {
          // Clean up
          document.body.removeChild(renderer.domElement);
          renderer.dispose();
          scene.dispose();
          camera.dispose();
          controls.dispose();

          // Remove event listener for window resize
      window.removeEventListener('resize', onWindowResize);
      });
</script>

<template>
    <div class="min-w-full min-h-full border rounded-lg">
        <div
            ref="mapContainer"
            class="w-full h-[80vh] overflow-hidden p-4 relative"></div>
    </div>
</template>

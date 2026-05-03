// scene3d.js - Interactive 3D Background using Three.js

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('bg-3d');
    if (!canvas) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create Particles (Representing data / mining nodes)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 700;
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);

    // Colors: Waffles Tech / Corporate Theme (Blueish and Greenish)
    const color1 = new THREE.Color('#1d4ed8'); // primary
    const color2 = new THREE.Color('#10b981'); // accent

    for(let i = 0; i < particlesCount * 3; i+=3) {
        // Position
        posArray[i] = (Math.random() - 0.5) * 100;     // x
        posArray[i+1] = (Math.random() - 0.5) * 100;   // y
        posArray[i+2] = (Math.random() - 0.5) * 50;    // z

        // Mixed Colors
        const mixRatio = Math.random();
        const mixedColor = color1.clone().lerp(color2, mixRatio);
        
        colorsArray[i] = mixedColor.r;
        colorsArray[i+1] = mixedColor.g;
        colorsArray[i+2] = mixedColor.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

    // Material
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    // Animation Loop
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        // Smooth mouse follow
        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;

        particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
        particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);
        
        // Base slow rotation
        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.z += 0.0005;

        // Wave effect
        const positions = particlesGeometry.attributes.position.array;
        for(let i = 0; i < particlesCount; i++) {
            const i3 = i * 3;
            const x = particlesGeometry.attributes.position.array[i3];
            // Make them bounce slightly on Y axis based on X and time
            particlesGeometry.attributes.position.array[i3 + 1] += Math.sin(elapsedTime + x) * 0.01;
        }
        particlesGeometry.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
    }

    animate();

    // Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});

"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeDMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    
    // Initial size (can be zero if flexbox hasn't calculated yet)
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 15, 20);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(30, 20, 60, 40);
    const material = new THREE.MeshBasicMaterial({
        color: 0xffaa00, // Bright golden orange
        wireframe: true,
        transparent: true,
        opacity: 0.8
    });

    // Store original vertices for animation
    const originalPositions = new Float32Array(geometry.attributes.position.array);

    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2; // Lay flat on XZ plane
    plane.position.set(0, 0, 0);
    scene.add(plane);

    const light = new THREE.PointLight(0xD4AF37, 2, 10);
    light.position.set(2, 2, 2);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    let animationFrameId: number;

    function animate() {
        animationFrameId = requestAnimationFrame(animate);
        
        const time = Date.now() * 0.0005;
        
        // Animate terrain vertices to simulate flyover/data scanning
        const positions = geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            const x = originalPositions[i];
            const y = originalPositions[i + 1];
            // Complex noise-like wave
            positions[i + 2] = 
                Math.sin(x * 0.3 + time) * 1.5 + 
                Math.cos(y * 0.2 + time * 0.8) * 1.5 +
                Math.sin((x + y) * 0.5 - time) * 0.5;
        }
        geometry.attributes.position.needsUpdate = true;
        
        plane.rotation.z = Math.sin(time * 0.2) * 0.1; // Slow camera pan effect
        
        renderer.render(scene, camera);
    }

    animate();

    const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
            const w = entry.contentRect.width;
            const h = entry.contentRect.height;
            if (w === 0 || h === 0) continue;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        }
    });
    resizeObserver.observe(container);

    return () => {
        resizeObserver.disconnect();
        cancelAnimationFrame(animationFrameId);
        if (containerRef.current) {
            containerRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full"></div>;
}

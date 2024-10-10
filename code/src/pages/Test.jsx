import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three'; // Assurez-vous d'importer THREE

function RotatingLogo() {
  const logoRef = useRef();
  const texture = useTexture('icone.png'); // Remplace par le chemin de ton logo

  // Rotation automatique du logo
  useFrame(() => {
    logoRef.current.rotation.y += 0.01; // Ajuste la vitesse de rotation ici
  });

  return (
    <mesh ref={logoRef}>
      {/* Utilisation d'un plan (plat) */}
      <planeGeometry args={[3, 3]} /> {/* Ajuste les dimensions du plan selon la taille de ton logo */}
      <meshBasicMaterial 
        map={texture} 
        transparent={true} 
        side={THREE.DoubleSide} // Matériau pour afficher des deux côtés
      />
    </mesh>
  );
}

export default function App() {
  return (
    <Canvas gl={{ alpha: true }} style={{ height: '100vh', width: '100vw' }}>
      {/* Contrôles pour manipuler la caméra avec la souris */}
      <OrbitControls enableZoom={false} />
      <ambientLight intensity={0.5} /> {/* Lumière douce */}
      <RotatingLogo />
    </Canvas>
  );
}
"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Text } from "@react-three/drei";

function VirtualRestaurant() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#4f46e5" />
      </mesh>
      
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[1, 1, 1, 32]} />
        <meshStandardMaterial color="#8b5cf6" />
      </mesh>

      <mesh position={[0, 0.5, -2]}>
        <capsuleGeometry args={[0.5, 1, 4, 8]} />
        <meshStandardMaterial color="#ec4899" />
      </mesh>
      
      <Text position={[0, 2, -2]} fontSize={0.3} color="white">
        Hello! What would you like?
      </Text>
    </group>
  );
}

export default function XRScene() {
  return (
    <Canvas camera={{ position: [0, 1.5, 4], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <VirtualRestaurant />
      <OrbitControls 
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 2.1}
      />
      <Environment preset="city" />
    </Canvas>
  );
}

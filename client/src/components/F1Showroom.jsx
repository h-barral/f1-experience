import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { motion } from 'framer-motion';

// --- LE COEUR DE L'HOLOGRAMME (Les Particules) ---
const HologramParticles = (props) => {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 })); // 5000 points dans une sphère

  useFrame((state, delta) => {
    // Rotation constante
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
    // Effet de "respiration" (pulsation)
    ref.current.scale.x = ref.current.scale.y = ref.current.scale.z = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#e10600" // Rouge F1
          size={0.02}    // Taille des points
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
    </group>
  );
};

// --- LE CERCLE ORBITAL (Anneau autour) ---
const OrbitalRing = () => {
    const ref = useRef();
    useFrame((state, delta) => {
        ref.current.rotation.z += delta / 5;
    });
    return (
        <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[2, 0.02, 16, 100]} /> {/* Rayon, Epaisseur */}
            <meshBasicMaterial color="#ffffff" opacity={0.2} transparent />
        </mesh>
    )
}


// --- LA SCÈNE GLOBALE ---
const F1Showroom = () => {
  return (
    <div className="w-full h-[500px] md:h-[700px] relative bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-hidden rounded-b-[3rem] border-b border-white/10 my-12">
      
      {/* TITRE & SOUS-TITRE */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none text-center w-full px-4">
        <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-f1-red to-white uppercase italic drop-shadow-[0_0_15px_rgba(225,6,0,0.5)]"
        >
            F1 Télémétrie
        </motion.h2>
        <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 text-sm md:text-lg mt-4 font-mono tracking-wider uppercase"
        >
            Analyse de données en temps réel • <span className="text-f1-red animate-pulse">LIVE</span>
        </motion.p>
      </div>

      {/* CANVAS 3D (L'Hologramme) */}
      <Canvas camera={{ position: [0, 0, 5] }}>
        {/* Lumière d'ambiance */}
        <ambientLight intensity={0.5} />
        
        {/* L'Hologramme Central */}
        <HologramParticles />
        
        {/* Anneaux Orbitaux pour le style */}
        <OrbitalRing />
        <group rotation={[Math.PI / 4, Math.PI / 4, 0]}>
            <OrbitalRing />
        </group>

        {/* Effet de "Brouillard" pour fondre le tout */}
        <fog attach="fog" args={['#000000', 3, 10]} />

        {/* Contrôles (juste pour le petit effet de mouvement de la souris) */}
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>

      {/* UI DE "DATA" POUR LE STYLE */}
      <div className="absolute bottom-8 left-8 pointer-events-none font-mono text-[10px] text-f1-red/60 hidden md:block">
        <div>SYS.STATUS: OPTIMAL</div>
        <div>DATA.STREAM: 4.5 GB/S</div>
        <div>LATENCY: 12MS</div>
      </div>
      <div className="absolute bottom-8 right-8 pointer-events-none hidden md:block">
        <div className="flex gap-1">
            <div className="w-2 h-2 bg-f1-red animate-pulse"></div>
            <div className="w-2 h-2 bg-f1-red/50 animate-pulse delay-75"></div>
            <div className="w-2 h-2 bg-f1-red/20 animate-pulse delay-150"></div>
        </div>
      </div>

    </div>
  );
};

export default F1Showroom;
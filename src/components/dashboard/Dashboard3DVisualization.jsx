import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

// Animated particle network visualization
function ParticleNetwork() {
  const pointsRef = useRef();
  const linesRef = useRef();
  const groupRef = useRef();

  // Generate particle positions
  const particles = useMemo(() => {
    const temp = [];
    const particleCount = 75;

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 2 + Math.random() * 1.5;

      temp.push({
        position: new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi),
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.002,
          (Math.random() - 0.5) * 0.002,
          (Math.random() - 0.5) * 0.002,
        ),
      });
    }
    return temp;
  }, []);

  // Animate particles
  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current || !groupRef.current) return;

    const time = state.clock.getElapsedTime();

    // Rotate entire group slowly
    groupRef.current.rotation.y = time * 0.1;
    groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;

    // Update particle positions
    const positions = pointsRef.current.geometry.attributes.position.array;

    particles.forEach((particle, i) => {
      particle.position.add(particle.velocity);

      // Boundary check - keep particles in sphere
      if (particle.position.length() > 4) {
        particle.velocity.multiplyScalar(-1);
      }

      positions[i * 3] = particle.position.x;
      positions[i * 3 + 1] = particle.position.y;
      positions[i * 3 + 2] = particle.position.z;
    });

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Update connection lines
    const linePositions = [];
    const maxDistance = 1.5;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const distance = particles[i].position.distanceTo(
          particles[j].position,
        );

        if (distance < maxDistance) {
          linePositions.push(
            particles[i].position.x,
            particles[i].position.y,
            particles[i].position.z,
            particles[j].position.x,
            particles[j].position.y,
            particles[j].position.z,
          );
        }
      }
    }

    if (linesRef.current && linePositions.length > 0) {
      linesRef.current.geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(linePositions, 3),
      );
    }
  });

  const particlePositions = useMemo(() => {
    const positions = new Float32Array(particles.length * 3);
    particles.forEach((particle, i) => {
      positions[i * 3] = particle.position.x;
      positions[i * 3 + 1] = particle.position.y;
      positions[i * 3 + 2] = particle.position.z;
    });
    return positions;
  }, [particles]);

  return (
    <group ref={groupRef}>
      {/* Particle points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.25}
          color="#d9572b"
          sizeAttenuation
          transparent
          opacity={0.9}
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial
          color="#d9572b"
          transparent
          opacity={0.35}
          linewidth={2}
        />
      </lineSegments>
    </group>
  );
}

export default function Dashboard3DVisualization() {
  return (
    <div className="bg-primary-white dark:bg-primary-dark-card rounded-lg border border-primary-black/10 dark:border-primary-white/10 overflow-hidden mb-8">
      <div className="p-6 border-b border-primary-black/10 dark:border-primary-white/10">
        <h3 className="text-lg font-bold text-primary-black dark:text-primary-white">
          Network Activity
        </h3>
        <p className="text-sm text-primary-black/60 dark:text-primary-white/60 mt-1">
          Real-time data flow visualization
        </p>
      </div>

      <div className="relative" style={{ height: "400px" }}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          className="bg-transparent"
        >
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1.2} />

          <ParticleNetwork />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI - Math.PI / 4}
          />
        </Canvas>

        {/* Overlay stats */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
          <div className="bg-primary-white/90 dark:bg-primary-dark-card/90 backdrop-blur-sm rounded-lg px-4 py-2 border border-primary-black/10 dark:border-primary-white/10">
            <p className="text-xs text-primary-black/60 dark:text-primary-white/60">
              Active Nodes
            </p>
            <p className="text-lg font-bold text-primary-orange-strong">50</p>
          </div>
          <div className="bg-primary-white/90 dark:bg-primary-dark-card/90 backdrop-blur-sm rounded-lg px-4 py-2 border border-primary-black/10 dark:border-primary-white/10">
            <p className="text-xs text-primary-black/60 dark:text-primary-white/60">
              Connections
            </p>
            <p className="text-lg font-bold text-primary-orange-strong">128</p>
          </div>
          <div className="bg-primary-white/90 dark:bg-primary-dark-card/90 backdrop-blur-sm rounded-lg px-4 py-2 border border-primary-black/10 dark:border-primary-white/10">
            <p className="text-xs text-primary-black/60 dark:text-primary-white/60">
              Latency
            </p>
            <p className="text-lg font-bold text-primary-orange-strong">24ms</p>
          </div>
        </div>
      </div>
    </div>
  );
}

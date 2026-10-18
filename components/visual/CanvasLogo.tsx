"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, PresentationControls, useGLTF } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { caminho } from "@/lib/caminho";

/**
 * A PARTE PESADA da logo 3D: three.js, fiber e drei (~230 kB).
 *
 * Fica num arquivo separado de propósito. O Logo3D só importa este
 * módulo quando vai realmente montar o canvas — assim o three.js não
 * entra no carregamento inicial da página.
 */
const ARQUIVO = caminho("/3d/logo.glb");

// Materiais por nome (vêm do .mtl original)
function criarMateriais() {
  const cromado = new THREE.MeshStandardMaterial({ color: "#dfe6f2", metalness: 1, roughness: 0.16 });
  const neon = new THREE.MeshStandardMaterial({
    color: "#4fa3ff", emissive: "#2f86ff", emissiveIntensity: 2.2, toneMapped: false,
    transparent: true, opacity: 0.92,
  });
  const no = (cor: string) =>
    new THREE.MeshStandardMaterial({ color: cor, emissive: cor, emissiveIntensity: 1.4, roughness: 0.25, toneMapped: false });
  return {
    chrome: cromado,
    neon_blue_glass: neon,
    node_green_glass: no("#19b36b"),
    node_blue_glass: no("#2f7dff"),
    node_orange_glass: no("#f2821f"),
    gradient_glass_bar: new THREE.MeshStandardMaterial({ color: "#9fc7ff", metalness: 0.6, roughness: 0.2, emissive: "#1d4f9a", emissiveIntensity: 0.6 }),
  } as Record<string, THREE.Material>;
}

function Modelo() {
  const { scene } = useGLTF(ARQUIVO);
  const grupo = useRef<THREE.Group>(null);
  const materiais = useMemo(criarMateriais, []);

  const objeto = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        const nome = (m.material as THREE.Material).name;
        m.material = materiais[nome] ?? materiais.chrome;
      }
    });
    // centraliza (o modelo original começa em y=0)
    const caixa = new THREE.Box3().setFromObject(clone);
    const centro = caixa.getCenter(new THREE.Vector3());
    clone.position.sub(centro);
    return clone;
  }, [scene, materiais]);

  // balança de um lado pro outro, sempre voltando a ficar de frente
  useFrame(({ clock }) => {
    if (grupo.current) grupo.current.rotation.y = Math.sin(clock.elapsedTime * 0.45) * 0.55;
  });

  return (
    <group ref={grupo} scale={3.1}>
      <primitive object={objeto} />
    </group>
  );
}

export default function CanvasLogo({ visivel }: { visivel: boolean }) {
  return (
      <Canvas
        className="relative !touch-pan-y"
        frameloop={visivel ? "always" : "never"}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 32 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        aria-label="Logo da fracttini.labs em 3D. Arraste para girar."
        role="img"
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} />
        <Suspense fallback={null}>
          <PresentationControls
            global={false}
            cursor
            snap
            speed={1.4}
            polar={[-0.35, 0.35]}
            azimuth={[-0.9, 0.9]}
          >
            <Float speed={1.6} rotationIntensity={0.35} floatIntensity={0.6}>
              <Modelo />
            </Float>
          </PresentationControls>
          <Environment resolution={256}>
            <Lightformer form="rect" intensity={5} color="#4fa3ff" position={[-4, 2, 3]} scale={[4, 6, 1]} />
            <Lightformer form="rect" intensity={4} color="#ffffff" position={[4, 3, 2]} scale={[3, 3, 1]} />
            <Lightformer form="ring" intensity={1.5} color="#f2821f" position={[0, -3, 3]} scale={2} />
            <Lightformer form="rect" intensity={3} color="#ffffff" position={[0, 0, 6]} scale={[6, 2, 1]} />
            <Lightformer form="rect" intensity={1} color="#19b36b" position={[3, -2, -3]} scale={[3, 2, 1]} />
          </Environment>
        </Suspense>
      </Canvas>
  );
}

// Sem preload: o .glb é buscado quando este módulo carrega, já depois
// da primeira interação.

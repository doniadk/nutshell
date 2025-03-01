import { Canvas } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  OrbitControls,
  SpotLight,
} from "@react-three/drei";
import { Suspense } from "react";
import CountryModel from "./CountryModel";

function CountryDisplay({ country }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Canvas camera={{ fov: 45, position: [-1, 2, 3] }}>
        {/* Suspense shows a loading spinner while the model is fetched */}
        <Suspense>
          <ambientLight intensity={0.5} />
          <SpotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <Environment preset="warehouse" />
          {/* 
            Pass isSelected={true} if you want to auto-rotation in CountryModel.
          */}
          <CountryModel country={country} isSelected={true} />
          <ContactShadows
            position={[0, -3, 0]}
            blur={10}
            scale={100}
            far={5}
            color={"black"}
          />
        </Suspense>
        <OrbitControls enablePan enableZoom />
      </Canvas>
    </div>
  );
}

export default CountryDisplay;

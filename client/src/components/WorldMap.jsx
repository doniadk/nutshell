import { Canvas } from "@react-three/fiber";
import { OrbitControls, Svg } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import { useMemo } from "react";
import * as THREE from "three";

const WorldMap = () => {
  const svgMap = useLoader(SVGLoader, "/worldHigh.svg");

  {
    /*useMemo: Optimizes performance by memoizing the shapes so they don’t re-calculate on every render*/
  }
  {
    /*coverting SVG paths into 3d shapes*/
  }
  const shapes = useMemo(() => {
    const paths = svgMap.paths;

    {
      /*flattens the result into a new array*/
    }
    return paths.flatMap((path) =>
      path.toShapes(true).map((shape) => ({
        shape,
        color: path.color || "gray",
      }))
    );
  }, [svgMap]);

  {
    /* 3D Country Shapes*/
  }
  const Country = ({ shape, color }) => {
    return (
      <mesh>
        {/* bevelEnabled: false = no rounded edges*/}
        <extrudeGeometry args={[shape, { depth: 3, bevelEnabled: false }]} />
        <meshStandardMaterial color={color} />
      </mesh>
    );
  };

  return (
    <Canvas camera={{ position: [10, 10, 1000], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      {/* iterate over the shapes array*/}
      {/*for each shape, a Country component is
      rendered*/}
      {shapes.map(({ shape, color }, index) => (
        <Country key={index} shape={shape} color={color} />
      ))}
    </Canvas>
  );
};

export default WorldMap;

import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

const CountryModel = (countryID) => {
  if (!countryID) return null; // if nothing is selected

  const { scene } = useGLTF(GLTFLoader, `/countries/${countryID}.glb`);
  return <primitive object={scene} />;
};

const CountryDisplay = ({ selectedCountry }) => {
  return (
    <Canvas>
      {selectedCountry && <CountryModel countryID={selectedCountry} />}
    </Canvas>
  );
};

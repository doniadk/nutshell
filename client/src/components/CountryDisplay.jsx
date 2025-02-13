import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import CountryMap from "./CountryMap";

const countryID = CountryMap.selectedCountry;

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

export default CountryDisplay;

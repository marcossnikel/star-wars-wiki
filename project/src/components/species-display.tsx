import axios from "axios";
import { useEffect, useState } from "react";

type Specie = {
  specieId: string;
  average_height: string;
  average_lifespan: string;
  classification: string;
  created: string;
  designation: string;
  edited: string;
  eye_colors: string;
  hair_colors: string;
  skin_colors: string;
  homeworld: string;
  language: string;
  name: string;
};

export default function SpeciesDisplay({ specieId }: { specieId: string }) {
  const [species, setSpecies] = useState<Specie>();

  useEffect(() => {
    const fetchSpecies = async () => {
      await axios
        .get(`https://swapi.dev/api/species/${specieId}/`)
        .then((res) => {
          setSpecies(res.data);
        });
    };

    fetchSpecies();
  }, [specieId]);

  return (
    <div>
      {species ? (
        <div>
          <p className="text-lg font-mono text-white ">
            {" "}
            <strong>Specie Name:</strong> {species.name}
          </p>
          <p className="text-lg font-mono text-white">
            {" "}
            <strong>Average Height:</strong> {species.average_height}
          </p>
          <p className="text-lg font-mono text-white">
            <strong>Skin Colors:</strong> {species.skin_colors}
          </p>
          <p className="text-lg font-mono text-white">
            <strong>Average Lifespan:</strong> {species.average_lifespan}
          </p>
          <p className="text-lg font-mono text-white">
            <strong>Classification:</strong> {species.classification}
          </p>
          <p className="text-lg font-mono text-white">
            <strong>Hair Colors :</strong> {species.hair_colors}
          </p>
          <p className="text-lg font-mono text-white">
            <strong>Designation:</strong> {species.designation}
          </p>
          <p className="text-lg font-mono text-white">
            <strong>Eye Colors:</strong> {species.eye_colors}
          </p>
          <p className="text-lg font-mono text-white">
            <strong>Language:</strong> {species.language}
          </p>
        </div>
      ) : (
        <p>No Specie !!</p>
      )}
    </div>
  );
}

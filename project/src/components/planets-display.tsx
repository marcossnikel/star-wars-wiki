import axios from "axios";
import { useEffect, useState } from "react";
type HomeWorld = {
  climate: string;
  created: string;
  diameter: string;
  edited: string;
  gravity: string;
  name: string;
  orbital_period: string;
  population: string;
  rotation_period: string;
  surface_water: string;
  terrain: string;
  url: string;
};

export default function PlanetsDisplay({ planetId }: { planetId: string }) {
  const [homeWorld, setHomeWorld] = useState<HomeWorld>();

  useEffect(() => {
    const fetchHomeWorld = async () => {
      await axios
        .get(`https://swapi.dev/api/planets/${planetId}/`)
        .then((res) => {
          setHomeWorld(res.data);
        });
    };

    fetchHomeWorld();
  }, [planetId]);

  return (
    <div>
      {homeWorld ? (
        <div>
          <p>
            {" "}
            <strong>Planet Name:</strong> {homeWorld.name}
          </p>
          <p>
            {" "}
            <strong>Planet Gravity:</strong> {homeWorld.gravity}
          </p>
          <p>
            {" "}
            <strong>Planet Climate:</strong> {homeWorld.climate}
          </p>
          <p>
            {" "}
            <strong>Planet Created:</strong> {homeWorld.created}
          </p>
          <p>
            {" "}
            <strong>Planet Diameter:</strong> {homeWorld.diameter}
          </p>
          <p>
            {" "}
            <strong>Planet Edited:</strong> {homeWorld.edited}
          </p>
          <p>
            {" "}
            <strong>Planet Orbital Period:</strong> {homeWorld.orbital_period}
          </p>
          <p>
            {" "}
            <strong>Planet Population:</strong> {homeWorld.population}
          </p>
          <p>
            {" "}
            <strong>Planet Rotation Period:</strong> {homeWorld.rotation_period}
          </p>
          <p>
            {" "}
            <strong>Planet Terrain:</strong> {homeWorld.terrain}
          </p>
          <p>
            {" "}
            <strong>Planet Surface Water:</strong> {homeWorld.surface_water}
          </p>
        </div>
      ) : (
        <p>No Homeworld Information</p>
      )}
    </div>
  );
}

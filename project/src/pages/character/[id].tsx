import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Species from "../../components/species-display";
import Homeworld from "../../components/planets-display";
import Movies from "../../components/movies-display";
import Image from "next/image";
import { getImagePath } from "../../utils/get-image-path";

interface Character {
  name: string;
  species: [];
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  url: string;
  skin_color: string;
  homeworld: string;
  films: [];
}
export default function CharacterDetailsPage() {
  const router = useRouter();

  const [characterDetails, setCharacterDetails] = useState<Character>();

  useEffect(() => {
    if (router.query.id) {
      fetchCharacterById();
    }
  }, [router.query.id]);

  const fetchCharacterById = async () => {
    console.log("query", router.query.id);

    await axios
      .get(`https://swapi.dev/api/people/${router.query.id}/`)
      .then((response) => {
        setCharacterDetails(response.data);
        console.log(characterDetails);
      });
  };
  return (
    <div className="w-full min-h-screen bg-starwars flex items-center justify-center p-10">
      {characterDetails ? (
        <div className="p-4 bg-gray-300 border rounded-lg border-red-600 opacity-80 max-w-xl mx-auto">
          <div className="flex flex-col gap-2 justify-center ">
            <h1 className="text-lg text-center mb-2 font-bold">
              {characterDetails.name}
            </h1>

            <Image
              src={getImagePath(characterDetails.name)}
              alt={characterDetails.name}
              className="w-auto h-auto"
              width={200}
              height={200}
            />

            <p className="text-lg">
              <strong>Birth year</strong>: {characterDetails.birth_year}
            </p>
            <p className="text-lg">
              <strong>Eye color:</strong> {characterDetails.eye_color}
            </p>
            <p className="text-lg">
              <strong>Gender:</strong> {characterDetails.gender}
            </p>
            <p className="text-lg">
              <strong>Hair Color:</strong> {characterDetails.hair_color}
            </p>
            <p className="text-lg  ">
              <strong>Height:</strong>
              {characterDetails.height}
            </p>
            <p className="text-lg  ">
              <strong>Mass:</strong> {characterDetails.mass}
            </p>
            <p className="text-lg  ">
              <strong>Skin Color:</strong> {characterDetails.skin_color}
            </p>
            <p className="text-lg my-4">
              <strong>Character Homeworld Information:</strong>
              <span className="font-normal">
                <Homeworld
                  planetId={`${characterDetails.homeworld.split("/").at(-2)}`}
                />
              </span>
            </p>
            <p className="text-lg">
              <strong>Character Movies Apperance Information: </strong>
              <span className="font-normal">
                {characterDetails.films.map((movieUrl: string, index) => (
                  <Movies
                    key={index}
                    movieId={`${movieUrl.split("/").at(-2)}`}
                  />
                ))}
              </span>
            </p>

            <p className="text-lg  ">
              {characterDetails.species.map((specieUrl: string, index) => (
                <Species
                  key={index}
                  specieId={`${specieUrl.split("/").at(-2)}`}
                />
              ))}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading....</p>
      )}
    </div>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import Species from "../components/species-display";
import Image from "next/image";
import { getImagePath } from "../utils/get-image-path";
import { useRouter } from "next/router";

type Character = {
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
};

export default function Main() {
  const [characterData, setCharacterData] = useState<Character[] | null>(null);

  const { query, isReady } = useRouter();
  const search = query.search ?? "";

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(
          `https://swapi.dev/api/people${
            search !== "" ? `?search=${search}` : ""
          }`
        );
        setCharacterData(response.data.results);
        console.log(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    if (isReady) {
      fetchCharacters();
    }
  }, [search, isReady]);

  return (
    <div className="flex flex-col justify-center items-center max-w-7xl mx-auto p-6">
      <Image
        src="/assets/logo.png"
        alt="starwars logo"
        width={400}
        height={200}
        className="rounded-lg"
      />
      <h1 className="text-white text-center text-3xl text-bold font-mono mt-2">
        Character Wiki
      </h1>
      <br />

      <form>
        <input
          placeholder="character name + enter"
          name="search"
          defaultValue={search}
          type="text"
          className="p-4 justify-center border border-yellow-300 rounded-lg h-10 w-96"
        />
      </form>

      {characterData ? (
        <div className="flex flex-col md:grid md:grid-cols-3 gap-2 items-stretch justify-center w-full">
          {characterData.map((character) => (
            <Link
              key={character.name}
              href={`/character/${character.url.split("/").at(-2)}`}
              passHref
            >
              <div className="hover:translate-y-2 hover:transition-all h-full border-x-2 bg-gray-400 border border-yellow-300 mt-5 rounded-lg flex items-center justify-center">
                <div className="text-center flex flex-col ">
                  <Image
                    src={getImagePath(character.name)}
                    alt={character.name}
                    className="w-auto h-auto"
                    width={300}
                    height={300}
                  />
                  <p className="text-lg text-white font-mono">
                    Name: {character.name}
                  </p>
                  <p className="text-lg text-white font-mono">
                    Birth Year: {character.birth_year}
                  </p>
                  {character.species.length > 0 ? (
                    <>
                      {character.species.map((specieUrl: string, index) => (
                        <Species
                          key={index}
                          specieId={`${specieUrl.split("/").at(-2)}`}
                        />
                      ))}
                    </>
                  ) : (
                    <p className="text-xs text-white font-semibold font-mono underline">
                      Species not provided by API!
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

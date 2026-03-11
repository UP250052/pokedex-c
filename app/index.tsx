import { useEffect, useState } from "react";
import { ScrollView, TextInput } from "react-native";
import PokemonCard from "../components/PokemonCards";
import { SearchBar } from "react-native-screens";
import pokemon from "./pokemon";

interface Pokemon {
  name: string;
  url: string;
}

export default function Index() {

  const [results, setResults] = useState<Pokemon[]>([]);

  useEffect(() => {
    console.log("Entre en pantalla ");
    getPokemons();
  }, []);

  const getPokemons = async () => {
    try {
      const URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
      const response = await fetch(URL, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data.results);
      } else {
        console.log("Bad request ");
      }
    } catch (error) {
      console.log("Error en la petición");
    }
  };

  const filterPokemons = (text: string) => {
    if (text === "") {
      getPokemons();
      return;
    }else{
      const arrayFiltered = results.filter(item => item.name.includes(text.toLowerCase()));
      setResults(arrayFiltered);
    }
    
  }

  return (
    <ScrollView>
          <TextInput
        placeholder="Search Pokemon"
        onChangeText={filterPokemons}
      />

      {results.map((item) => {
        return (
          <PokemonCard
            key={item.name}
            name={item.name}
            url={item.url}
          ></PokemonCard>
        );
      })}
    </ScrollView>
  );
}

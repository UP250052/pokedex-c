import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import PokemonCard from "../components/PokemonCards";

export default function Index() {

    const [results, setResults] = useState <any[]>([]);
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

  return (
    <View>
      {results.map((item) => {
        return <PokemonCard 
        key={item.name} 
        name={item.name} 
        url ={item.url}>

        </PokemonCard>;
      })}
    </View>
  );
}

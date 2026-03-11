    import { useLocalSearchParams } from "expo-router";
    import React, { useEffect, useState } from "react";
    import { Text, View } from "react-native";

    interface PokemonInfo {
    name: string;
    }

    export default function PokemonDetailScreen() {
    const [info, setInfo] = useState<any | null>(null);
    const params = useLocalSearchParams();

    useEffect(() => {
        getInfo();
    }, []);

    const getInfo = async () => {
        const URL = `https://pokeapi.co/api/v2/pokemon/${params.name}`;
        const response = await fetch(URL);
        
        if (response.ok) {
        const data = await response.json();
        setInfo(data);
        } else {
        console.log("Bad request");
        }
    };

    return (
        <View>
        <Text>{params.name}</Text>
        <Text>{JSON.stringify(info)}</Text>
        </View>
    );
    }

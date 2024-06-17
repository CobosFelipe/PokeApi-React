import { useEffect, useState } from "react";
import { PokemonContext } from "./PokemonContext";
import { useForm } from "../hook/useForm";

export const PokemonProvider = ({ children }) => {
  const [allPokemons, setallPokemons] = useState([]);
  const [globalPokemons, setglobalPokemons] = useState([]);
  const [offset, setoffset] = useState(0);

  // Utilizar CustomHook - useForm
  const {valueSearch, onInputChange, onResetForm} = useForm({
    valueSearch: ''
  })

  // Estados simples
  const [loading, setloading] = useState(true);
  const [active, setactive] = useState(false);

  // Llamar 24 pokemons a la API
  const getAllPokemons = async (limit = 24) => {
    const baseURL = "https://pokeapi.co/api/v2/";

    const res = await fetch(`${baseURL}pokemon?limit=${limit}&offset=${offset}`);
    const data = await res.json();

    const promises = data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const data = await res.json();
      return data;
    });

    const results = await Promise.all(promises);

    setallPokemons([...allPokemons, ...results]);
    setloading(false);
  };

  // Llamar todos los pokemons
  const getGloblalPokemons = async () => {
    const baseURL = "https://pokeapi.co/api/v2/";

    const res = await fetch(`${baseURL}pokemon?limit=100000&offset=0`);
    const data = await res.json();

    const promises = data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const data = await res.json();
      return data;
    });

    const results = await Promise.all(promises);

    setglobalPokemons(results);
    setloading(false);
  };

  // Llamar a un pokemon por Id
  const getPokemonId = async (id) => {
    const baseURL = "https://pokeapi.co/api/v2/";

    const res = await fetch(`${baseURL}pokemon/${id}`);
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    getAllPokemons();
  }, [offset]);

  useEffect(() => {
    getGloblalPokemons();
  }, []);

  // Btn cargar mas
  const onClickLoadMore = () =>{
    setoffset(offset + 24)
  }

  // Filter Function + State
	const [typeSelected, setTypeSelected] = useState({
		grass: false,
		normal: false,
		fighting: false,
		flying: false,
		poison: false,
		ground: false,
		rock: false,
		bug: false,
		ghost: false,
		steel: false,
		fire: false,
		water: false,
		electric: false,
		psychic: false,
		ice: false,
		dragon: false,
		dark: false,
		fairy: false,
		unknow: false,
		shadow: false,
	});

	const [filteredPokemons, setfilteredPokemons] = useState([]);

	const handleCheckbox = e => {
		setTypeSelected({
			...typeSelected,
			[e.target.name]: e.target.checked,
		});

		if (e.target.checked) {
			const filteredResults = globalPokemons.filter(pokemon =>
				pokemon.types
					.map(type => type.type.name)
					.includes(e.target.name)
			);
			setfilteredPokemons([...filteredPokemons, ...filteredResults]);
		} else {
			const filteredResults = filteredPokemons.filter(
				pokemon =>
					!pokemon.types
						.map(type => type.type.name)
						.includes(e.target.name)
			);
			setfilteredPokemons([...filteredResults]);
		}
	};

  return (
    <PokemonContext.Provider
      value={{
        valueSearch,
        onInputChange,
        onResetForm,
        allPokemons,
        globalPokemons,
        getPokemonId,
        onClickLoadMore,
        loading,
        setloading,
        active,
        setactive,
        handleCheckbox,
        filteredPokemons,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

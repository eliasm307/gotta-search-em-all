import React from 'react';

import { ChangePokemonIndex, PokemonProps } from '../../shared/types';

interface Props {
    changePokemonIndex: ChangePokemonIndex;
    pokemon?: PokemonProps;
    pokemonIndex: number;
}

const SearchByName = ({ pokemon, pokemonIndex, changePokemonIndex }: Props) => {
    /*
  if (!pokemon) {
        return <div></div>;
    }

    const {
        pokemonData: { types, stats, moves, weight, height },
        evolutionSprites,
        evolutionNames,
    } = pokemon;
    */

    return <Container></Container>;
};

export default SearchByName;

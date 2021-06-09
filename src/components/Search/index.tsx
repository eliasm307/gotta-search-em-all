import React from 'react';

import { ChangePokemonIndex, PokemonProps } from '../shared/types';
import SearchByName from './SearchByName/SearchByName';
import Container from './SearchStyles';

interface Props {
    changePokemonIndex: ChangePokemonIndex;
    pokemon?: PokemonProps;
    pokemonIndex: number;
}

const Search = ({ pokemon, pokemonIndex, changePokemonIndex }: Props) => {
    // todo add selector

    return (
        <Container>
            <SearchByName pokemonIndex={pokemonIndex} changePokemonIndex={changePokemonIndex} pokemon={pokemon} />
        </Container>
    );
};

export default Search;

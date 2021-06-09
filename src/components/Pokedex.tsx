import React from 'react';

import { css, Global } from '@emotion/core';
import styled from '@emotion/styled';

import pikachu from '../assets/pikachu.png';
import { usePokemon, useProgressiveImage } from '../hooks';
import Divider from './Divider';
import LeftPanel from './LeftPanel';
import Container from './PokedexStyles';
import RightPanel from './RightPanel';
import { Loading } from './shared';

const Row = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 20px;
`;

const Pokedex = () => {
    const { pokemon, pokemonIndex, loading, changePokemonIndex } = usePokemon();
    const loadedImage = useProgressiveImage(`/backgrounds/${getBackground()}.jpg`);

    if (loading) {
        return <Loading noBackground />;
    }

    function getBackground() {
        // pokemonIndex is guaranteed to be above 0
        if (pokemonIndex < 152 && pokemon?.pokemonData.name) {
            return pokemon?.pokemonData.name;
        }

        return 'pikachu';
    }

    return (
        <Container>
            <Global
                styles={css`
                    body {
                        background-image: url(${loadedImage || pikachu});
                    }
                `}
            />
            <Row>
                <div className="inner-container">
                    <LeftPanel pokemon={pokemon} pokemonIndex={pokemonIndex} />
                    <Divider />
                    <RightPanel pokemon={pokemon} pokemonIndex={pokemonIndex} changePokemonIndex={changePokemonIndex} />
                </div>
                <div className="inner-container">
                    <h2>
                        <span className="red">search'em</span> by name
                    </h2>
                </div>
            </Row>
        </Container>
    );
};

export default Pokedex;

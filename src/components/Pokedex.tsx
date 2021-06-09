import React, { useEffect } from 'react';

import { css, Global } from '@emotion/core';

import pikachu from '../assets/pikachu.png';
import { usePokemon, useProgressiveImage } from '../hooks';
import Divider from './Divider';
import LeftPanel from './LeftPanel';
import Container from './PokedexStyles';
import RightPanel from './RightPanel';
import { Loading } from './shared';

const Pokedex = () => {
    const { pokemon, pokemonIndex, loading, changePokemonIndex } = usePokemon();
    const loadedImage = useProgressiveImage(`/backgrounds/${getBackground()}.jpg`);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            switch (e.code) {
                case 'ArrowLeft':
                case 'ArrowDown':
                    changePokemonIndex(pokemonIndex - 1);
                    break;

                case 'ArrowRight':
                case 'ArrowUp':
                    changePokemonIndex(pokemonIndex + 1);
                    break;

                default:
                // do nothing
            }
        };

        document.addEventListener('keyup', handler);

        return () => document.removeEventListener('keyup', handler);
    }, [changePokemonIndex, pokemonIndex]);

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
            <div className="inner-container">
                <LeftPanel pokemon={pokemon} pokemonIndex={pokemonIndex} />
                <Divider />
                <RightPanel pokemon={pokemon} pokemonIndex={pokemonIndex} changePokemonIndex={changePokemonIndex} />
            </div>
        </Container>
    );
};

export default Pokedex;

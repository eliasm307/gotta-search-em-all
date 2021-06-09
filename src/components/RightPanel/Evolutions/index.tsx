import React from 'react';

import { ChangePokemonIndex } from '../../shared/types';
import EvolutionSprite from './EvolutionSprite';
import Container from './styles';

interface EvolutionProps {
    changePokemonIndex: ChangePokemonIndex;
    evolutionNames: string[];
    evolutionSprites: string[];
}

const Evolutions = ({ evolutionSprites, evolutionNames, changePokemonIndex }: EvolutionProps) => {
    const evolutionSpritesJSX: React.ReactNode[] = evolutionSprites.map((sprite, index) => {
        const stage = 'I'.repeat(index);
        const name = evolutionNames[index];

        return (
            <EvolutionSprite
                key={stage}
                image={sprite}
                stage={stage}
                name={name}
                changePokemonIndex={changePokemonIndex}
            />
        );
    });

    return <Container>{evolutionSpritesJSX}</Container>;
};

export default Evolutions;

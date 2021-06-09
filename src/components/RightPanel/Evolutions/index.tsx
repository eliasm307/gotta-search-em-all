import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactTooltip from 'react-tooltip';

import { ChangePokemonIndex, PokemonProps, SpeciesDataProps, TypeProps } from '../../shared/types';
import EvolutionSprite from './EvolutionSprite';
import Container from './styles';

interface Props {
    changePokemonIndex: ChangePokemonIndex;
    evolutionNames: string[];
    evolutionSprites: string[];
}

interface PokemonPreviewData {
    name: string;
    shortDesc: string;
    types: TypeProps[];
}

interface FormDescription {
    description: string;
    language: { name: 'en'; url: string };
}

interface SpeciesData extends SpeciesDataProps {
    form_descriptions: FormDescription[];
}

const isPokemonPreviewData = (value: unknown): value is PokemonPreviewData => {
    const { name, shortDesc, types } = value as PokemonPreviewData;

    // ts to notify of any schema changes ie ts will throw an error if schema changes and predicate isnt updated
    ((): PokemonPreviewData => ({ name, shortDesc, types }))();

    const hasName = typeof name === 'string';
    const hasTypes = Array.isArray(types);
    const hasShortDesc = typeof shortDesc === 'string';

    return hasName && hasTypes && hasShortDesc;
};

// todo extract to global constant
const pokemonAPI = 'https://pokeapi.co/api/v2/';

interface PreviewDataViewProps {
    data?: PokemonPreviewData;
}

const PreviewDataView = ({ data }: PreviewDataViewProps) => {
    if (!data) return <>Loading</>;

    const { name, shortDesc, types } = data;

    return (
        <>
            <div>Name: {name} </div>
            <div>Description: {shortDesc}</div>
            <div>Types: {types.length}</div>
        </>
    );
};

const usePreviewData = () => {
    const loadPokemonPreviewData = useCallback(async (pokemonName: string): Promise<PokemonPreviewData | undefined> => {
        const pokemonOutputData: any | undefined = await fetch(`${pokemonAPI}pokemon/${pokemonName}`).then((response) =>
            response.json(),
        );

        if (!pokemonOutputData) {
            console.warn(`There was an issue getting pokemon data for pokemon with name ${pokemonName}`);
            return;
        }

        // todo type this properly and account for undefineds
        const speciesRequest = pokemonOutputData?.species?.url;

        const speciesData: SpeciesData = await fetch(speciesRequest).then((response) => response.json());

        const formDescription = speciesData.form_descriptions.find((desc) => desc.language.name === 'en');

        const { name, types } = pokemonOutputData;

        const previewData: PokemonPreviewData = {
            name,
            types,
            shortDesc: formDescription?.description || 'No english description',
        };

        return previewData;
    }, []);

    const [previewData, setPreviewData] = useState<(PokemonPreviewData | undefined)[] | undefined>(undefined);

    // load evolution pokemon data
    useEffect(() => {
        const previewDataPromises = evolutionNames.map((name) => loadPokemonPreviewData(name));

        Promise.all(previewDataPromises).then((data) => {
            setPreviewData(data);
        });
    }, [evolutionNames, loadPokemonPreviewData]);
};

const Evolutions = ({ evolutionSprites, evolutionNames, changePokemonIndex }: Props) => {
    const evolutionSpritesJSX: React.ReactNode[] = useMemo(
        () =>
            evolutionSprites.map((sprite, index) => {
                const stage = 'I'.repeat(index + 1);
                const name = evolutionNames[index];
                const data = previewData && previewData[index];
                console.log({ stage, name, data });
                return (
                    <>
                        <div key={stage} data-tip={stage} data-for={stage}>
                            <EvolutionSprite
                                image={sprite}
                                stage={stage}
                                name={name}
                                changePokemonIndex={changePokemonIndex}
                            />
                        </div>
                        <ReactTooltip id={stage} place="right" effect="float" type="light">
                            xsx
                            <PreviewDataView data={data} />
                        </ReactTooltip>
                    </>
                );
            }),
        [changePokemonIndex, evolutionNames, evolutionSprites],
    );

    return <Container>{evolutionSpritesJSX}</Container>;
};

export default Evolutions;

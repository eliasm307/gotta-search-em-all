export interface PokemonProps {
    evolutionNames: string[];
    evolutionSprites: string[];
    pokemonData: {
        name: string;
        sprites: {
            back_female: string | null;
            back_shiny_female: string | null;
            back_default: string | null;
            front_female: string | null;
            front_shiny_female: string | null;
            back_shiny: string | null;
            front_default: string | null;
            front_shiny: string | null;
            [key: string]: string | null;
        };
        types: TypeProps[];
        stats: Stat[];
        moves: MovesProps[];
        weight: number;
        height: number;
    };
    pokemonDescriptions: string[];
    speciesData: SpeciesDataProps;
}

export interface SpeciesDataProps {
    evolution_chain: {
        url: string;
    };
    flavor_text_entries: FlavorTextEntriesProps[];
}

interface FlavorTextEntriesProps {
    flavor_text: string;
    language: {
        name: string;
    };
}

export interface TypeProps {
    type: {
        name: string;
    };
}

export interface Stat {
    base_stat: number;
    stat: {
        name: string;
    };
}

export interface MovesProps {
    move: {
        name: string;
        url: string;
    };
    version_group_details: VersionGroupDetails[];
}

export interface VersionGroupDetails {
    level_learned_at: number;
    move_learn_method: {
        name: string;
    };
}

export interface MoveInfoProps {
    accuracy: number;
    damageClass: string;
    effectDescription: string;
    learnMethod: string;
    learnedAt: string | number;
    moveDescription: string;
    name: string;
    power: number;
    pp: number;
    type: string;
}

// functions

export type ChangePokemonIndex = (newIndex: number) => void;

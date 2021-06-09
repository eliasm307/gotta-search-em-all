import React, { useCallback, useEffect, useState } from 'react';

import { faUndo, faVenus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button, PokeBall } from '../../shared';
import Container, { ShinyButton } from './styles';
import { SpriteProps, SpritesProps } from './types';

interface SpriteComponentProps {
    name: string;
    sprites?: SpritesProps;

    [key: string]: any;
}

const Sprite = ({ sprites, name }: SpriteComponentProps) => {
    const [sprite, setSprite] = useState<SpriteProps>({
        front: true,
        female: false,
        shiny: false,
    });
    const [src, setSrc] = useState<string | null>('');
    const [error, setError] = useState(false);

    const buildImage = useCallback(({ front, shiny, female }: SpriteProps): string => {
        const direction = front ? 'front' : 'back';
        const light = shiny ? '_shiny' : '_default';
        const gender = female ? '_female' : '';

        if (light === '_default' && gender === '_female') {
            return direction + gender;
        }
        return direction + light + gender;
    }, []);

    useEffect(() => {
        if (sprites) {
            const source = buildImage(sprite);
            setSrc(sprites[source]);
        }
    }, [sprite, sprites, buildImage]);

    const handleChange = useCallback(
        (attribute: string) => {
            // make a copy and update its state
            const spriteCopy = { ...sprite, [attribute]: !sprite[attribute] };
            const source = buildImage(spriteCopy);

            // run the bounce animiation if there is no avaliable sprite
            if (sprites && !sprites[source]) {
                setError(true);
                return setTimeout(() => {
                    setError(false);
                }, 500);
            }

            return setSprite({ ...sprite, [attribute]: !sprite[attribute] });
        },
        [sprite, sprites, buildImage],
    );

    const changeToShiny = useCallback(() => handleChange('shiny'), [handleChange]);

    // registers change to shiny shortcut listener
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === 's') changeToShiny();
        };
        document.addEventListener('keyup', handler);

        return () => document.removeEventListener('keyup', handler);
    }, [changeToShiny]);

    const renderScreen = useCallback(() => {
        if (src) {
            return <img src={src} alt={name} />;
        }

        return <PokeBall nameClass="bigScreen" />;
    }, [name, src]);

    return (
        <Container error={error}>
            {renderScreen()}
            <div className="controls">
                <Button active={sprite.female} onClick={() => handleChange('female')} aria-label="Change Gender">
                    <FontAwesomeIcon icon={faVenus} />
                </Button>

                <ShinyButton active={sprite.shiny} onClick={changeToShiny} aria-label="Change to Shiny">
                    <div className="button">
                        <span className="button__mask"></span>
                        <span className="button__text">Shiny</span>
                        <span className="button__text button__text--bis">Shiny</span>
                    </div>
                </ShinyButton>

                <Button active={!sprite.front} onClick={() => handleChange('front')} aria-label="Change front">
                    <FontAwesomeIcon icon={faUndo} />
                </Button>
            </div>
        </Container>
    );
};

export default Sprite;

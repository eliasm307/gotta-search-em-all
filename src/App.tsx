import Footer from 'components/Footer';
import { ThemeProvider } from 'emotion-theming';
import React from 'react';

import { Global } from '@emotion/core';
import styled from '@emotion/styled';

import Container from './AppStyles';
import Pokedex from './components/Pokedex';
import { theme } from './components/shared';
import globalStyles from './globaStyles';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Global styles={globalStyles} />

                <div>
                    <h1>
                        Gotta <span className="red">search'em</span> all
                    </h1>
                    <Pokedex />
                    <Footer />
                </div>
            </Container>
        </ThemeProvider>
    );
};

export default App;

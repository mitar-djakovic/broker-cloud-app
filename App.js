import React from 'react';
import { Provider } from 'react-redux';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { store } from './src/store/index';

import AppLayout from "./src/components/AppLayout";

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PaperProvider theme={theme}>
                    <AppLayout />
                </PaperProvider>
            </Provider>
        );
    }
}

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#009788',
        accent: 'yellow',
    },
};
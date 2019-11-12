import React from "react";
import { View, Text } from 'react-native';

class Favorites extends React.Component {
    static navigationOptions = {
        title: 'Favorites',
        headerStyle: {
            backgroundColor: '#009688',
        },
        headerTintColor: '#FFF',
    };

    render() {
        return(
            <View>
                <Text>Favorites</Text>
            </View>
        )
    }
};

export default Favorites;
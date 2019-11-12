import React from "react";
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

class Search extends React.Component {
    static navigationOptions = {
        title: 'Market Search',
        headerStyle: {
            backgroundColor: '#009688',
        },
        headerTintColor: '#FFF',      
    };

    render() {
        return(
            <ScrollView style={styles.container}>
                <TextInput 
                />
            </ScrollView>
        )
    }
};

export default Search;

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
});
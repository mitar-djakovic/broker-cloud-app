import React from "react";
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { getChart } from '../actions/components/search';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Details extends React.Component {
    constructor() {
        super();
        this.state = {
            
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.displayName,
            headerStyle: {
                backgroundColor: '#009688',
            },
            headerTintColor: '#FFF', 
        }
    }
    
    componentDidMount() {
        const { getChart, access_token } = this.props;
        const { id } = this.props.navigation.state.params;

        getChart(access_token, id);
    }
    render() {
        const { chartData } = this.props;
        // console.log(chartData)
        return(
            <ScrollView style={styles.container}>
                <View style={styles.chartContainer}>
                    <Text style={styles.price}>${this.props.navigation.state.params.price}</Text>
                </View>
                <View style={styles.aboutContainer}>
                    <Text style={styles.title}>About</Text>
                    <Text>{this.props.navigation.state.params.description}</Text>
                </View>
                <View style={styles.newsContainer}>
                    <Text style={styles.title}>News</Text>
                </View>
            </ScrollView>
        )
    }
};

const mapStateToProps = ({ 
    login: { access_token },
    search: { chartData }
}) => ({
    access_token,
    chartData
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getChart
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Details);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chartContainer: {
        height: 200,
        width: '100%',
    },
    price: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 25
    },
    aboutContainer: {
        width: '100%',
        padding: 20,
    },
    title: {
        color: '#009688',
        fontSize: 20,
        marginBottom: 8
    },
    newsContainer: {
        width: '100%',
        padding: 20
    }
});
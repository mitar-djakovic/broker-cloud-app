import React from "react";
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { getChart, getNews } from '../actions/components/search';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-native-paper';

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
        const { getChart, getNews, access_token } = this.props;
        const { id } = this.props.navigation.state.params;

        // getChart(access_token, id);
        getNews(access_token);
    }
    render() {
        const { chartData, news, newsLoading, newsError } = this.props;
        
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
                    {newsError.length ? <Text style={styles.newsError}>{newsError}</Text> : null}
                </View>
                <Button
                    loading={newsLoading ? 'loading' : null}
                >
                    {newsLoading ? null : 'Show More'}
                </Button>
            </ScrollView>
        )
    }
};

const mapStateToProps = ({ 
    login: { access_token },
    search: { chartData, news, newsLoading, newsError }
}) => ({
    access_token,
    chartData,
    news,
    newsLoading,
    newsError
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getChart,
    getNews
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
    },
    newsError: {
        textAlign: 'center'
    }
});
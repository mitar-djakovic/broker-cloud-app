import React from "react";
import { 
    View, 
    Text, 
    ScrollView, 
    StyleSheet, 
    TextInput 
} from 'react-native';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { autoSearch, filterData, addFavorites } from '../actions/components/search';

class Search extends React.Component {
    static navigationOptions = {
        title: 'Market Search',
        headerStyle: {
            backgroundColor: '#009688',
        },
        headerTintColor: '#FFF',      
    };

    constructor() {
        super();
        this.state = {
            currency: '',
        }; 
    }

    componentDidMount() {
        const { autoSearch, access_token } = this.props;
        
        autoSearch(access_token);
    };

    handleSearch = (currency) => {
        const { filterData } = this.props;

        this.setState({
            currency
        }, () => {
            filterData(currency)
        });
    };

    addToFavorites = (symbolId) => {
        const { addFavorites, access_token } = this.props;

        addFavorites(access_token, symbolId);
    };

    render() {
        const { currency } = this.state;
        const { data, filteredData, dataLoading } = this.props;
        
        return(
            <View style={styles.container}>
                <View style={styles.searchSection}>
                    <Ionicons 
                        name='search'
                        size={20}
                        color='rgba(0, 0, 0, 0.22)'
                    />
                    <TextInput
                        style={styles.inputSearch} 
                        placeholder='Search here'
                        name='currency'
                        value={currency}
                        onChangeText={(currency) => this.handleSearch(currency)}
                    />
                    {
                        currency.length ?
                            <Ionicons 
                                name='remove'
                                size={20}
                                color='rgba(0, 0, 0, 0.22)'
                                onPress={(currency) => this.setState({currency: ''})}
                            /> : null
                    }
                </View>
                {
                    dataLoading ?
                        <Ionicons 
                            name='spinner'
                            size={24}
                            color='#009688'
                            style={{
                                textAlign: 'center',
                                position: 'relative',
                                top: '40%'
                            }}
                        />
                    : null
                }
                <ScrollView style={styles.scrollSection}>
                    {
                        dataLoading === false && currency.length && filteredData.length ?
                            filteredData.map(currency => (
                                <View 
                                    key={currency.id} 
                                    style={styles.currency}
                                >
                                    <View style={styles.currencyInfo}>
                                        <Text 
                                            onPress={() => this.props.navigation.navigate('Details', {
                                                displayName: currency.displayName,
                                                price: currency.price.bid,
                                                description: currency.baseInstrument.description,
                                                id: currency.id 
                                            })} 
                                        >
                                            {currency.displayName}
                                        </Text>
                                        <Text>${currency.price.bid}</Text>
                                    </View>
                                    <View>
                                        <Ionicons 
                                            name='heart'
                                            size={20}
                                            color='rgba(0, 0, 0, 0.22)'
                                            style={{ 
                                                paddingLeft: 10, 
                                                paddingRight: 20 
                                            }}
                                            onPress={() => this.addToFavorites()}
                                        />
                                    </View>
                                </View>
                            ))
                        :
                            data.map(currency => (
                                <View 
                                    key={currency.id} 
                                    style={styles.currency}
                                >
                                    <View style={styles.currencyInfo}>
                                        <Text 
                                            onPress={() => this.props.navigation.navigate('Details', {
                                                displayName: currency.displayName,
                                                price: currency.price.bid,
                                                description: currency.baseInstrument.description,
                                                id: currency.id 
                                            })} 
                                        >
                                            {currency.displayName}
                                        </Text>
                                        <Text>${currency.price.bid}</Text>
                                    </View>
                                    <View>
                                        <Ionicons 
                                            name='heart'
                                            size={20}
                                            color='rgba(0, 0, 0, 0.22)'
                                            style={{ 
                                                paddingLeft: 10, 
                                                paddingRight: 10 
                                            }}
                                            onPress={() => this.addToFavorites(currency.id)}
                                        />
                                    </View>
                                </View>
                            ))
                            
                    }
                </ScrollView>
            </View>
        )
    }
};

const mapStateToProps = ({ 
    login: { access_token },
    search: { data, filteredData, dataLoading }
}) => ({
    access_token,
    data,
    filteredData,
    dataLoading
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    autoSearch,
    filterData,
    addFavorites
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Search);

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#FFFEFD',
        flex: 1,
    },
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        paddingLeft: 10,
        backgroundColor: '#FAFAFA',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        width: '98%',
        marginLeft: '1%',
        marginRight: '1%',
        marginBottom: 15,
    },
    inputSearch: {
        backgroundColor: 'transparent',
        width: '80%',
        marginLeft: 10,
    },
    scrollSection: {
        height: '80%',
        width: '100%',
    },
    currency: {
        width: '100%',
        padding: 14,
        marginTop: 2,
        marginBottom: 2,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.22)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    currencyInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
    }
});
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
import { autoSearch, filterData, addFavorites, getFavorites } from '../actions/components/search';

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
        const { autoSearch, access_token, getFavorites } = this.props;
        
        autoSearch(access_token);
        getFavorites(access_token);
    };

    handleSearch = (currency) => {
        const { filterData } = this.props;

        this.setState({
            currency
        }, () => {
            filterData(currency)
        });
    };

    handleFollowUnfollowFavorite = (symbolId) => {
        const { addFavorites, access_token, autoSearch, getFavorites, favorites } = this.props;

        addFavorites(access_token, symbolId, true);
        getFavorites(access_token);
    };

    handleColor = (id) => {
        const { favorites } = this.props;

        return favorites.map(fav => {
            if (fav.id === id) {
                return '#FF00C9'
            } else {
                return 'rgba(0, 0, 0, 0.22)'
            }
        })
    }

    render() {
        const { currency } = this.state;
        const { 
            data, filteredData, dataLoading, addFavoriteLoading, 
            addFavoriteStatus, favorites, getFavorites, access_token 
        } = this.props;
        
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
                    : 
                    <ScrollView style={styles.scrollSection}>
                        {
                            currency.length && filteredData.length ?
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
                                                color={this.handleColor(currency.id)}
                                                style={{ 
                                                    paddingLeft: 10, 
                                                    paddingRight: 20 
                                                }}
                                                onPress={() => this.handleFollowUnfollowFavorite(currency.id, getFavorites(access_token))}
                                            />
                                        </View>
                                    </View>
                                ))
                            :
                                data.map(currency => {
                                    return (
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
                                                    color={this.handleColor(currency.id)}
                                                    style={{ 
                                                        paddingLeft: 10, 
                                                        paddingRight: 10 
                                                    }}
                                                    onPress={() => this.handleFollowUnfollowFavorite(currency.id)}
                                                />
                                            </View>
                                        </View>
                                    )
                            })
                        }
                    </ScrollView>
                }
                {
                    addFavoriteLoading ?
                        <View style={styles.follwoUnfollowFavorite}>
                            <Text>{addFavoriteStatus}</Text>
                        </View> 
                    : null
                }
            </View>
        )
    }
};

const mapStateToProps = ({ 
    login: { access_token },
    search: { data, filteredData, dataLoading, addFavoriteLoading, addFavoriteStatus, favorites }
}) => ({
    access_token,
    data,
    filteredData,
    dataLoading,
    addFavoriteLoading,
    addFavoriteStatus,
    favorites
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    autoSearch,
    filterData,
    addFavorites,
    getFavorites
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Search);

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#FFFEFD',
        flex: 1,
    },
    searchSection: {
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
        paddingTop: 10,
        paddingBottom: 10
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
    },
    follwoUnfollowFavorite: {
        width: '100%',
        position: 'absolute',
        marginLeft: 20,
        padding: 10,
        borderRadius: 5,
        bottom: 10,
        backgroundColor: '#009688',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        justifyContent: 'center'
    }
});
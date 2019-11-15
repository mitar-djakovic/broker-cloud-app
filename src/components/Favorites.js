import React from "react";
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFavorites, addFavorites } from '../actions/components/search';
import Ionicons from 'react-native-vector-icons/FontAwesome';

class Favorites extends React.Component {
    static navigationOptions = {
        title: 'Favorites',
        headerStyle: {
            backgroundColor: '#009688',
        },
        headerTintColor: '#FFF',
    };

    componentDidMount() {
        const { access_token, getFavorites } = this.props;
        console.log('TOKEN ===>', access_token);

        getFavorites(access_token)
    }

    handleFollowUnfollowFavorite = (symbolId) => {
        const { addFavorites, access_token, getFavorites } = this.props;

        addFavorites(access_token, symbolId, false, () => {
            console.log('jel ovo radi')
            getFavorites
        });
    };

    render() {
        const { favorites, favoritesLoading, addFavoriteLoading} = this.props;
        console.log('FAVORITES', favorites)
        return(
            <View style={styles.container}>
                {
                    favoritesLoading ?
                        <Ionicons 
                            name='spinner'
                            size={24}
                            color='#009688'
                            style={{
                                textAlign: 'center',
                                position: 'relative',
                                top: '40%'
                            }}
                        /> : null
                }
                {
                    favoritesLoading === false ? 
                        <ScrollView 
                            style={styles.scrollSection} 
                        >
                            {
                                favorites.length === 0 ? 
                                    <Text style={styles.noFav}>No Favorites</Text> :
                                    favorites.map(fav => (
                                        <View 
                                            key={fav.id} 
                                            style={styles.currency}
                                        >
                                            <View style={styles.currencyInfo}>
                                                <Text 
                                                    onPress={() => this.props.navigation.navigate('Details', {
                                                        displayName: fav.displayName,
                                                        price: fav.price.bid,
                                                        description: fav.baseInstrument.description,
                                                        id: fav.id 
                                                    })} 
                                                >
                                                    {fav.displayName}
                                                </Text>
                                                <Text>${fav.price.bid}</Text>
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
                                                    onPress={() => this.handleFollowUnfollowFavorite(fav.id)}
                                                />
                                            </View>
                                        </View>
                                    ))
                            }
                        </ScrollView> : null
                }
                {
                    addFavoriteLoading ?
                        <View style={styles.follwoUnfollowFavorite}>
                            <Text>LOL</Text>
                        </View> 
                    : null
                }
            </View>
        )
    }
};

const mapStateToProps = ({ 
    login: { access_token },
    search: { favorites, favoritesLoading, favoritesError, addFavoriteLoading }
}) => ({
    access_token,
    favorites,
    favoritesLoading,
    favoritesError,
    addFavoriteLoading
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getFavorites,
    addFavorites
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);

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
        width: '90%',
    },
    noFav: {
        textAlign: 'center',
        fontSize: 30,
        color: '#009688',
        marginTop: '50%'
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
    }
});
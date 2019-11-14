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
import { autoSearch } from '../actions/components/search';

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
    }

    addToFavorites = () => {

    }

    render() {
        const { currency } = this.state;
        const { data } = this.props;

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
                        onChangeText={(currency) => this.setState({currency})}
                    />
                </View>
                <ScrollView style={styles.scrollSection}>
                    {
                        data.length > 0 ? data.map(currency => {
                            console.log(currency)
                            return(
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
                                        />
                                    </View>
                                </View>
                            )
                        }) : null
                    }
                </ScrollView>
            </View>
        )
    }
};

const mapStateToProps = ({ 
    login: { access_token },
    search: { data }
}) => ({
    access_token,
    data
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    autoSearch
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
        width: '100%',
        marginLeft: 10
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
    }
});
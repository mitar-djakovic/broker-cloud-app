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
            currency: ''
        }; 
    }

    componentDidMount() {
        const { autoSearch, access_token } = this.props;
        console.log('auto search raadi');   
        autoSearch(access_token);
    }

    render() {
        const { currency } = this.state;

        return(
            <ScrollView style={styles.container}>
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
            </ScrollView>
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
    },
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 8,
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
        marginBottom: 5
    },
    inputSearch: {
        backgroundColor: 'transparent',
        width: '100%',
        marginLeft: 10
    }
});
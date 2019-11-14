import React from "react";
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFavorites } from '../actions/components/search';

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

    render() {
        const { favorites } = this.props;
        console.log('FAVORITES', favorites)
        return(
            <View>
                <Text>Favorites</Text>
            </View>
        )
    }
};

const mapStateToProps = ({ 
    login: { access_token },
    search: { favorites }
}) => ({
    access_token,
    favorites
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getFavorites
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
import React from 'react';
import { 
    StyleSheet, 
    Text, 
    KeyboardAvoidingView, 
    View
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { login } from '../actions/components/login';


class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            username: 'mitar-djakovic2401993@hotmail.com',
            password: 'Qwer1234',
            // username: '',
            // password: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { login } = this.props;
        console.log(this.state.username, this.state.password);
        login(this.state.username, this.state.password);
        // .then(access_token => {
        //     search(access_token);
        // });
    }
    render() {
        const { loading, error, errorMsg } = this.props;
        const { username, password } = this.state;

        return (
            <KeyboardAvoidingView 
                //contentContainerStyle={} 
                // behavior='padding' 
                style={styles.container}
            >
                <Text style={styles.welcome}>Welcome</Text>
                <View style={styles.inputContainer}>
                    <TextInput 
                        style={styles.inputOne}
                        label='Email'
                        onChangeText={(username) => this.setState({username})}
                        name='username'
                        value={this.state.username}
                        error={username.length && password.length & error || username.length <= 0 && error}
                    />
                    {
                        username.length <= 0 && error ?
                            <Text style={{ color: '#FF0033' }}>
                                Username is required
                            </Text> : null
                    }
                    <TextInput 
                        style={styles.inputTwo}
                        label='Password'
                        onChangeText={(password) => this.setState({password})}
                        name="password"
                        value={this.state.password}
                        secureTextEntry={true}
                        error={username.length && password.length & error || password.length <= 0 && error}
                    />
                    {
                        password.length <= 0 && error ?
                            <Text style={{ color: '#FF0033' }}>
                                Password is required
                            </Text> : null
                    }
                    {
                        username.length && password.length & error ? 
                            <Text style={styles.errorMsg}>Wrong E-Mail or Password</Text> : null
                    }
                    <Button
                        style={styles.button} 
                        mode="contained" 
                        onPress={this.handleSubmit}
                    >
                        {loading ? 'loading...' : 'Sign in'}
                    </Button>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = ({ login: { loading, error, errorMsg } }) => ({
    loading,
    error,
    errorMsg
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    login
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width:'80%',
        marginLeft: '10%',
        marginRight: '10%',
        justifyContent: 'flex-end',
        paddingBottom: 80
    },
    inputContainer: {
        width: '100%',
        position: 'relative',
    },
    welcome: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#555',
        position: 'absolute',
        top: 160
    },
    inputOne: {
        width: '100%',
        backgroundColor: 'transparent',
        marginBottom: 20,
    },
    inputTwo: {
        width: '100%',
        backgroundColor: '#fff',
        backgroundColor: 'transparent',
    },
    errorMsg: {
        color: '#FF0033',
        textAlign: 'center',
        paddingTop: 10
    },
    button: {
        width: '100%',
        borderRadius: 2,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 130
    }
});

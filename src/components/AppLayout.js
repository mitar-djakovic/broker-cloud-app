import React from "react";
import { connect } from "react-redux";
import Login from './Login';
import Home from './Home';

class AppLayout extends React.Component {
    render() {
        const { logged } = this.props;

        return  logged ? <Home /> : <Login />;
    }
}

const mapStateToProps = ({ login: { logged } }) => ({
    logged,
});

export default connect(mapStateToProps)(AppLayout);
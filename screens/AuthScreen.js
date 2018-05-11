import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AuthScreen extends Component {
  componentDidMount() {
    this.props.fbLogin();
    // AsyncStorage.removeItem('fb_token');
    this.onAuthComplete(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  onAuthComplete = props => {
    if (props.token) {
      this.props.navigation.navigate('map');
    }
  };

  render() {
    return <View />;
  }
}

const mapStateToProps = ({ auth: { token } }) => {
  return {
    token,
  };
};

export default connect(mapStateToProps, actions)(AuthScreen);

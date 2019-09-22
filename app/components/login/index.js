import React from 'react';
import {View, ScrollView, StyleSheet, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import AppLogo from '../logo/AppLogo';
import LoginForm from './LoginForm';
import {getTokens, setTokens} from '../../utils/helper';
import {autoSignIn} from '../../store/actions/userAuthAction';

class Login extends React.Component {
  state = {
    isLoading: true,
  };

  goNext = () => {
    this.props.navigation.navigate('App');
  };

  componentDidMount = () => {
    getTokens(values => {
      if (values[0][1] === null) {
        this.setState({isLoading: false});
      } else {
        this.props.autoSignIn(values[1][1]).then(() => {
          if (!this.props.User.auth.token) {
            this.setState({isLoading: false});
          } else {
            setTokens(this.props.User.auth, () => {
              this.goNext();
            });
          }
        });
      }
    });
  };

  render() {
    return this.state.isLoading === true ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    ) : (
      <ScrollView style={styles.container}>
        <View>
          <AppLogo width="170" height="150" />
          <LoginForm goNext={this.goNext} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#1D428A',
    padding: 50,
  },
});

const mapStateToProps = state => {
  return {
    User: state.userReducer,
  };
};

const dispatchToProps = dispatch => {
  return bindActionCreators({autoSignIn}, dispatch);
};

export default connect(
  mapStateToProps,
  dispatchToProps,
)(Login);

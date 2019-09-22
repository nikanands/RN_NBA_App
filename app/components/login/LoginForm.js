import React from 'react';
import {View, Text, Button, StyleSheet, Platform} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import FormInput from '../../utils/formInput';
import LoginValidation from '../../utils/loginValidation';
import {signUp, signIn} from '../../store/actions/userAuthAction';
import {setTokens} from '../../utils/helper';

class LoginForm extends React.Component {
  state = {
    type: 'Login',
    action: 'Login',
    actionMode: 'I want to register',
    hasErrors: false,
    form: {
      email: {
        value: '',
        valid: false,
        type: 'textinput',
        rules: {
          isRequired: true,
          isEmail: true,
        },
      },
      password: {
        value: '',
        valid: false,
        type: 'textinput',
        rules: {
          isRequired: true,
          minLength: 6,
        },
      },
      confirmPassword: {
        value: '',
        valid: false,
        type: 'textinput',
        rules: {
          confirmPassword: 'password',
        },
      },
    },
  };

  onUpdateInput = (name, value) => {
    let newForm = this.state.form;
    newForm[name].value = value;

    //rules
    let rules = newForm[name].rules;
    let valid = LoginValidation(value, rules, newForm);

    newForm[name].valid = valid;

    //State Change
    this.setState({
      form: newForm,
    });
  };

  handleConfirmPassword = () => {
    return this.state.type !== 'Login' ? (
      <FormInput
        placeholder="Confirm Password"
        placeholderTextColor="#cecece"
        color="#cecece"
        type={this.state.form.confirmPassword.type}
        value={this.state.form.confirmPassword.value}
        onChangeText={value => this.onUpdateInput('confirmPassword', value)}
        secureTextEntry
      />
    ) : null;
  };

  handleErrors = () => {
    return this.state.hasErrors !== false ? (
      <View style={styles.errorWrapper}>
        <Text style={styles.errorText}>Please check your info</Text>
      </View>
    ) : null;
  };

  manageAccess = () => {
    if (!this.props.User.auth.uid) {
      this.setState({hasErrors: true});
    } else {
      setTokens(this.props.User.auth, () => {
        this.setState({hasErrors: false});
        this.props.goNext();
      });
    }
  };

  onLogin = () => {
    let isFormValid = true;
    let formToSubmit = {};
    const newForm = this.state.form;

    for (let key in newForm) {
      //LOGIN
      if (this.state.type === 'Login') {
        if (key !== 'confirmPassword') {
          isFormValid = isFormValid && newForm[key].valid;
          formToSubmit[key] = newForm[key].value;
        }
      } else {
        //REGISTER
        isFormValid = isFormValid && newForm[key].valid;
        formToSubmit[key] = newForm[key].value;
      }
    }

    if (isFormValid) {
      if (this.state.type === 'Login') {
        this.props.signIn(formToSubmit).then(() => {
          this.manageAccess();
        })
        .catch(err => {
          return false;
        });
      } else {
        this.props.signUp(formToSubmit).then(() => {
          this.manageAccess();
        })
        .catch(err => {
          return false;
        });
      }
    } else {
      this.setState({hasErrors: true});
    }
  };

  onRegister = () => {
    let type = this.state.type;

    this.setState({
      type: type !== 'Login' ? 'Login' : 'Register',
      action: type !== 'Login' ? 'Login' : 'Register',
      actionMode: type !== 'Login' ? 'Register' : 'I want to Login',
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <FormInput
          placeholder="Enter Your Email"
          placeholderTextColor="#cecece"
          color="#cecece"
          type={this.state.form.email.type}
          value={this.state.form.email.value}
          autoCapitalize={'none'}
          autoFocus={true}
          keyboadrdType={'email-address'}
          onChangeText={value => this.onUpdateInput('email', value)}
        />
        <FormInput
          placeholder="Enter Your Password"
          placeholderTextColor="#cecece"
          color="#cecece"
          type={this.state.form.password.type}
          value={this.state.form.password.value}
          onChangeText={value => this.onUpdateInput('password', value)}
          secureTextEntry
        />
        {this.handleConfirmPassword()}
        {this.handleErrors()}

        <View style={styles.button}>
          <Button title={this.state.action} onPress={this.onLogin} />
          <Button title={this.state.actionMode} onPress={this.onRegister} />
          <Button title="I'll do it later" onPress={this.props.goNext} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorWrapper: {
    marginTop: 10,
    alignItems: 'flex-start',
  },
  errorText: {
    fontSize: 18,
    color: 'tomato',
    // textAlign: 'left',
  },
  button: {
    ...Platform.select({
      ios: {
        marginBottom: 0,
      },
      android: {
        marginBottom: 10,
        marginTop: 10,
      },
    }),
  },
});

const mapStateToProps = state => {
  return {
    User: state.userReducer,
  };
};

const dispatchToProps = dispatch => {
  return bindActionCreators({signUp, signIn}, dispatch);
};

export default connect(
  mapStateToProps,
  dispatchToProps,
)(LoginForm);

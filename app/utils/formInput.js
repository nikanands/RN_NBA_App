import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

const FormInput = props => {
  let template = null;

  switch (props.type) {
    case 'textinput':
      template = (
        <TextInput {...props} style={[styles.input, props.overridestyle]} />
      );
      break;
    default:
      template;
  }
  return template;
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    fontSize: 16,
    padding: 5,
    marginTop: 10,
  }
});

export default FormInput;


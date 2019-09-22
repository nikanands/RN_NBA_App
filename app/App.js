import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import RootRouter from './routes';

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <RootRouter />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

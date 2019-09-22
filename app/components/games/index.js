import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import Moment from 'moment';

import {gamesAction} from '../../store/actions/gamesAction';

class Games extends React.Component {
  componentDidMount = () => {
    this.props.dispatch(gamesAction());
  };

  showGames = gameList => (
    gameList.games ? 
      gameList.games.map(game => (
        <TouchableOpacity
          key={game.id}
          onPress={() => this.props.navigation.navigate('GameArticle', {
            ...game
          })}
        >
          <View style={styles.gameContainer}>
            <View style={styles.gameBox}>
              <Image 
                source={{uri: `${game.awayData.logo}`}}
                style={{width: 80, height: 80}}
                resizeMode="contain"
              />
              <Text>{game.awayData.wins} - {game.awayData.loss}</Text>
            </View>
            <View style={styles.gameBox}>
              <Text>{game.time}</Text>
              <Text>{Moment(game.date).format('d MMMM')}</Text>
            </View>
            <View style={styles.gameBox}>
              <Image 
                source={{uri: `${game.localData.logo}`}}
                style={{width: 80, height: 80}}
                resizeMode="contain"
              />
              <Text>{game.localData.wins} - {game.localData.loss}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))
    : null
  )

  render() {
    return (
      <ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            flexWrap: 'nowrap',
          }}>
          {this.showGames(this.props.Games)}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  gameContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#fff',
    shadowColor: '#ddd',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    borderRadius: 2,
  },
  gameBox: {
    width: '33.3%',
    height: 100,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const mapStateToProps = state => {
  console.log(state);
  return {
    Games: state.gamesReducer,
  };
};

export default connect(mapStateToProps)(Games);


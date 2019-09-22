import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  View,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import Moment from 'moment';

import {getNewsAction} from '../../store/actions/newsAction';

class News extends React.Component {
  componentDidMount = () => {
    this.props.dispatch(getNewsAction());
  };

  getNewsArticles = news =>
    news.articles
      ? news.articles.map(article => (
          <TouchableOpacity
            key={article.id}
            onPress={() =>
              this.props.navigation.navigate('NewsArticle', {
                ...article,
              })
            }>
            <View style={styles.cardContainer}>
              <View>
                <Image
                  style={{
                    height: 150,
                    justifyContent: 'space-around',
                  }}
                  source={{
                    uri:
                      'https://upload.wikimedia.org/wikipedia/commons/5/5d/Basketball_match_Greece_vs_France_on_02_September_2017_50.jpg',
                  }}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.contentCard}>
                <Text style={styles.cardTitle}>{article.title}</Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.cardFooterTeam}>{article.team} - </Text>
                  <Text style={styles.cardFooterDate}>
                    Posted at {Moment(article.date).format('d MMMM')}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))
      : null;

  render() {
    return <ScrollView>{this.getNewsArticles(this.props.News)}</ScrollView>;
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    margin: 10,
    shadowColor: '#ddd',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    borderRadius: 2,
  },
  contentCard: {
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardTitle: {
    color: '#232323',
    fontSize: 16,
    padding: 10,
  },
  cardFooter: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e6e6e6',
    padding: 10,
  },
  cardFooterTeam: {
    color: '#828282',
    fontSize: 12,
  },
  cardFooterDate: {
    color: '#828282',
    fontSize: 12,
  }
});

const mapStateToProps = state => {
  return {
    News: state.newsReducer,
  };
};

export default connect(mapStateToProps)(News);

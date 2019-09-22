import React from 'react';
import {ScrollView, StyleSheet, Image, View, Text} from 'react-native';
import Moment from 'moment';

const formatText = content => {
  const text = content.replace(/<p>/g, '').replace(/<\/p>/g, '');
  return text;
};

const NewsArticle = props => {
  const params = props.navigation.state.params;
  return (
    <ScrollView>
      <Image
        style={{height: 250}}
        source={{
          uri:
            'https://upload.wikimedia.org/wikipedia/commons/5/5d/Basketball_match_Greece_vs_France_on_02_September_2017_50.jpg',
        }}
        resizeMode="cover"
      />
      <View style={styles.articleContainer}>
        <Text style={styles.articleTitle}>{params.title}</Text>
        <Text style={styles.articleData}>
          {params.team} - Posted at {Moment(params.date).format('d MMMM')}
        </Text>
      </View>
      <View style={styles.articleContent}>
        <Text style={styles.articleText}>{formatText(params.content)}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  articleContainer: {
    padding: 10,
  },
  articleTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#323232',
  },
  articleData: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#828282',
  },
  articleContent: {
    marginTop: 30,
    padding: 10,
  },
  articleText: {
    fontSize: 14,
    lineHeight: 20,
  }
});

export default NewsArticle;
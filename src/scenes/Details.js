import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

class Details extends React.Component {
  render() {
    const {artistInfo} = this.props.route.params;
    return (
      <View style={styles.container}>
        {this.renderTopContainer(artistInfo)}
        <View style={styles.border} />
        {this.renderBottomContainer(artistInfo)}
      </View>
    );
  }

  renderTopContainer(artistInfo) {
    return (
      <View style={styles.subContainer}>
        <View>{this.renderImage(artistInfo.artworkUrl60)}</View>
        <View style={styles.artistName}>
          <Text style={styles.artistFont}>{artistInfo.artistName}</Text>
          <Text style={styles.artistFont}>Track Id: {artistInfo.artistId}</Text>
          <Text style={styles.artistFont}>
            Genre: {artistInfo.primaryGenreName}
          </Text>
        </View>
      </View>
    );
  }

  renderBottomContainer(artistInfo) {
    return (
      <View style={styles.artistName}>
        <Text
          style={styles.artistFont}
          numberOfLines={1}
          ellipsizeMode={'tail'}>
          Collection Name: {artistInfo.collectionName}
        </Text>
        <Text style={styles.artistFont}>
          Track Name: {artistInfo.trackName}
        </Text>
        <Text style={styles.artistFont}>
          Censored: {artistInfo.trackCensoredName}
        </Text>
        <Text style={styles.artistFont}>
          Collection Price: {artistInfo.collectionPrice}
        </Text>
        <Text style={styles.artistFont}>
          Release Date: {artistInfo.releaseDate}
        </Text>
        <Text style={styles.artistFont}>Country: {artistInfo.country}</Text>
      </View>
    );
  }

  renderImage(uri) {
    return <Image source={{uri}} style={styles.image} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    borderWidth: 3,
    borderColor: '#BBBBBB',
  },
  artistName: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  artistFont: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '600',
  },
  border: {
    marginTop: 15,
    backgroundColor: 'skyblue',
    height: 30,
  },
});

export default Details;

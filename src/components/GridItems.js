import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default class GridItems extends Component {
  render() {
    const {artistName, artworkUrl100, trackName} = this.props.details;
    const selectedStyle = this.props.isSelected
      ? styles.activeBorder
      : styles.inactiveBorder;
    return (
      <TouchableOpacity
        style={[styles.container, selectedStyle]}
        onPress={this.props.onPressTile}>
        {this.renderImage(artworkUrl100)}
        {this.renderText('Artist Name', artistName)}
        {this.renderText('Track Name', trackName)}
      </TouchableOpacity>
    );
  }

  renderImage(uri) {
    return <Image source={{uri}} style={styles.image} />;
  }

  renderText(title, name) {
    return (
      <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.textStyle}>
        {title}: <Text style={{fontWeight: '400'}}>{name}</Text>
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  activeBorder: {
    borderColor: '#fcd672',
    borderWidth: 2,
  },
  container: {
    shadowColor: 'black',
    shadowOffset: {height: 0, width: 0},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderRadius: 6,
    elevation: 1,
    borderColor: 'red',
    margin: 5,
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderWidth: 1,
  },
  image: {
    height: 100,
    width: 100,
  },
  inactiveBorder: {
    borderColor: 'transparent',
  },
  textStyle: {
    fontSize: 14,
    fontWeight: '600',
    paddingTop: 5,
  },
});

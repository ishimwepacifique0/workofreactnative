import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
Icon

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');

  const clearSearch = () => {
    setSearchText('');
  };

  return (
    <View style={styles.container}>
      <Icon name="search" size={20} color="#666" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={searchText}
        placeholderTextColor="rgba(0, 0, 0, 0.4)"
        placeholderStyle={styles.placeholder}
        onChangeText={setSearchText}
      />
        <Icon name="tune-variant" type="material-community" color="#bcbcbc" size={20} style={styles.icon}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f3fe',
    borderRadius: 50,
    paddingHorizontal: 10,
    marginVertical:20,
    marginHorizontal: 20,
  },

  input: {
    flex: 1,
    height: 50,
    marginLeft: 10,
    fontSize: 16,
    borderRadius: 80,
  },
  icon: {
    padding: 10,
  },
  placeholder: {
    fontSize: 20,
    fontWeight:'bold'
  },
});

export default SearchBar;

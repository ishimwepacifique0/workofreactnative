import React from 'react';
import {FlatList, StyleSheet, Text,ImageBackground, View,StatusBar} from 'react-native';

const styles = StyleSheet.create({
  container: {
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

const App = () => {
  const url = "https://legacy.reactjs.org/logo-og.png"
  return (
    <>
     <ImageBackground source={{uri:url}} resizeMode='cover' imageStyle={{width:400,height:900}}>
          <Text style={{color:'white'}}>
            Hello World
          </Text>
  
        </ImageBackground>
        <StatusBar barStyle="light-content"/>
    </>
       
  );
};

export default App;
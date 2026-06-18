import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function BottomTab({ onHome, onSearch, onProfile }) {
  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={onHome}>
        <Text style={styles.icon}>🏠</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onSearch}>
        <Text style={styles.icon}>🔍</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onProfile}>
        <Text style={styles.icon}>👤</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

container:{
  marginTop:'auto',
  backgroundColor:'#2d6b9a',
  borderRadius:18,
  paddingVertical:18,
  flexDirection:'row',
  justifyContent:'space-around'
},

icon:{
  fontSize:22,
  color:'#fff'
}

});

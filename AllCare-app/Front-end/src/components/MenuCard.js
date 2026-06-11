import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function MenuCard({ icon, title, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      
      <Text style={styles.icon}>
        {icon}
      </Text>

      <Text style={styles.title}>
        {title}
      </Text>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

card:{
  width:110,
  height:110,
  backgroundColor:'#fff',
  borderRadius:16,
  justifyContent:'center',
  alignItems:'center',
  marginBottom:30,

  // sombra
  shadowColor:'#000',
  shadowOpacity:0.1,
  shadowOffset:{width:0,height:2},
  elevation:3
},

icon:{
  fontSize:42
},

title:{
  marginTop:8,
  textAlign:'center',
  fontSize:12,
  fontWeight:'500'
}

});

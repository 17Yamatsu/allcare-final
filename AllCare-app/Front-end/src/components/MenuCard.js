import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
 const isImage = typeof icon === "number";

export default function MenuCard({ icon, title, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      
     {isImage ? (
        <Image style={styles.icon} source={icon} />
      ) : (
        <Text style={styles.iconText}>{icon}</Text>
      )}
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
  backgroundColor:'#ffffff',
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
 height:50,
 width:50,
},
iconText:{
  fontSize:42,
},

title:{
  marginTop:8,
  textAlign:'center',
  fontSize:12,
  fontWeight:'500'
}

});

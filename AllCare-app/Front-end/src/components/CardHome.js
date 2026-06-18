import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

export default function ProCard({foto, nome, job, nav}){
    return(
        <TouchableOpacity onPress={nav}>
        <View style={stylish.card}>
            <View style={stylish.rating}>
                <FontAwesome6 name="star" size={10} color="white" />
                <Text style={stylish.ratingText}>{(Math.random() * 2 + 3).toFixed(1)}</Text>
            </View>
            <Image source={foto} style={stylish.img}/>
                <Text style={stylish.name}>{nome}</Text>
                <View style={stylish.jobcont}>
                    {job.map((item, index) => <Text key={index} style={stylish.job}>{'\u2022'}{item}</Text>)}
                </View>
            </View>
        </TouchableOpacity>
    )
}

const stylish = StyleSheet.create({
    card: {
        backgroundColor: '#0091ff',
        borderRadius: 20,
        alignItems: 'center',
        marginBottom: 12,
        flex: 1,
        width: '100%',
        position: 'relative',
        padding: 12,
    },
    img:{
        top: 5,
        width: '98%',
        height: 250,
        borderRadius: 20,
        marginBottom: 8,
    },
    name:{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        
    },
    jobcont:{
        width: '100%',
        margin: 8
    },
    job: {
        fontSize: 18,
        color: 'lightgray',
        paddingHorizontal: 8

    },
    rating: {
  position: 'absolute',
  top: 10,
  right: 10,
  backgroundColor: 'rgba(0,0,0,0.6)',
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 12,
  flexDirection: 'row',
  alignItems: 'center',
  zIndex: 1,
},
ratingText: {
  color: 'white',
  marginLeft: 4,
  fontWeight: 'bold',
  fontSize: 12,
},


})
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

export default function ProCard({foto, nome, job, nav}){
    return(
        <TouchableOpacity onPress={nav}>
        <View style={stylish.card}>
            <Image source={{uri:foto}} style={stylish.img}/>
            
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
        backgroundColor: 'rgb(255, 255, 255)',
        borderRadius: 20,
        alignItems: 'center',
        marginBottom: 12,
        flex: 1,
        width: '100%',
    },
    img:{
        
        width: '100%',
        height: 165,
        borderRadius: 20,
        marginBottom: 8,
    },
    name:{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
        
    },
    jobcont:{
        width: '100%',
        margin: 8
    },
    job: {
        fontSize: 18,
        color: 'gray',
        paddingHorizontal: 8

    }

})
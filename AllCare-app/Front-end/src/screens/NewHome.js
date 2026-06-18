import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ImageBackground,
} from "react-native";
import {BlurView} from 'expo-blur';
import ProCard from "../components/CardHome";
import { FontAwesome6 } from "@expo/vector-icons";

const prof = [
    {id: 1, name: 'Amanda Abreu', photo: require('../images/moça2.avif'), spec: ['Enfermeira de Idosos', 'Cuidados Paliativos']},
    {id: 2, name: 'Pedro Cipoli', photo: require('../images/moço3.jpg'), spec: ['Enfermeiro Infantil', 'Cuidador de PCD Infantil']},
    {id: 3, name: 'Adriano Ponte', photo: require('../images/moço1.jpeg'), spec: ['Idosos e PCD Adulto', 'Cuidador de Idosos']},
]

export default function NewHome({navigation, route}) {
    const user = route?.params?.user || { usr_id: null, usr_name: "Usuário Teste" };

  function open(screenName, profissional) {
    navigation.navigate(screenName, { user, profissional });
  }

return(
<SafeAreaView style={stylesi.base}>
    <ScrollView contentContainerStyle={{flexGrow:1}}>
          
          <View style={styles.header}>
            <View>
          <TouchableOpacity style={styles.voltar} onPress={() => navigation.navigate("Home", { user })}>
            <FontAwesome6 name="arrow-left" size={16} color="black" /> <Text style={styles.voltarTexto}>Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.logo}>AllCare</Text>
                      <Text style={styles.subtitle}>Cuidando de quem você ama</Text>
                      <TouchableOpacity onPress={() => navigation.navigate("Profile", { user })}>
                          <Text style={styles.userText}>Olá, <Text style={styles.userTextBold}>{user?.usr_name || "Usuário Teste"}</Text></Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("Profile", { user })}>
                      <View style={styles.avatar}><FontAwesome6 name="user" size={24} color="white" /></View>
                </TouchableOpacity>
        </View>
      
        
        <View style={stylesi.scrcontent}>
           <FlatList
           data={prof}
           keyExtractor={(item) => item.id}
           renderItem={({item})=>
            <ProCard
            nome={item.name}
            foto={item.photo}
            job={item.spec}
            nav={() => open("ScheduleAppointment", item)}
            />
            }
        />
        </View>
    </ScrollView>
</SafeAreaView>
)
}

const stylesi = StyleSheet.create({
    base: {
        backgroundColor: 'rgb(32,99,149)',
        justifyContent:'center',
        flex: 1,
    },
    header: {

        margin: 12,
        height: '20%',
        backgroundColor: 'white',
        oppacity: 0.8,
        borderRadius: 20,
    },
    scrcontent: {
        paddingTop: 22,
        backgroundColor: 'white',
        fontSize: 15,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingLeft: 58,
        paddingRight: 58,
        flex: 1,
        minHeight: '100%',
        
    },
    imgstyle:{
        height: 160,
        width: 165,
        borderRadius: 20
    },
    

})

function Card({ icon, title, onPress, highlighted }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        highlighted && styles.cardHighlighted,
        pressed && styles.cardPressed,
      ]}
    >
      <Text style={styles.cardIcon}>{icon}</Text>
      <Text style={[styles.cardText, highlighted && styles.cardTextHighlighted]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#85CEF5" },
  container: { paddingBottom: 110 },
  header: { backgroundColor: "white", borderBottomLeftRadius: 22, borderBottomRightRadius: 22, padding: 24, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 22 },
  logo: { fontSize: 38, fontWeight: "bold", color: "#1d9afa" },
  subtitle: { color: "#0091ff" },
  userText: { color: "#000000", marginTop: 8, fontSize: 18},
  userTextBold: { fontWeight: "bold", color: "#000000", fontSize: 20 },
  avatar: { width: 86, height: 86, borderRadius: 28, backgroundColor: "#3d3d3d", alignItems: "center", justifyContent: "center" },  
  avatarText: { fontSize: 24 },
  grid: { padding: 24, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", gap: 16 },
  card: { width: "46%", minHeight: 130, backgroundColor: "#fff", borderRadius: 18, alignItems: "center", justifyContent: "center", padding: 12, shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 8, elevation: 3, cursor: "pointer" },
  cardPressed: { opacity: 0.75, transform: [{ scale: 0.99 }] },
  cardHighlighted: { borderWidth: 3, borderColor: "#2563EB" },
  cardIcon: { fontSize: 38, marginBottom: 12 },
  cardText: { textAlign: "center", color: "#0F2A44", fontWeight: "bold", fontSize: 13 },
  cardTextHighlighted: { color: "#2563EB" },
  bottomTab: { position: "absolute", bottom: 2, left: 2, right: 2, borderRadius: 22, paddingVertical: 12, flexDirection: "row", justifyContent: "space-around" },
  bottomButton: { padding: 10 },
  bottomIcon: { fontSize: 22 },
   voltar: {
    width: 'auto',
    height: 'auto',
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
    flexDirection: "row",
    gap: 6,
    
  },
voltarTexto: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
});
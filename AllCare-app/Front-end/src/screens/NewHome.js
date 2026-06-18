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
    {id: 1, name: 'Ana Clara', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Serinus_canaria_-Parque_Rural_del_Nublo%2C_Gran_Canaria%2C_Spain_-male-8a.jpg/1920px-Serinus_canaria_-Parque_Rural_del_Nublo%2C_Gran_Canaria%2C_Spain_-male-8a.jpg', spec: ['Enfermeira de Idosos', 'Cuidados Paliativos']},
    {id: 2, name: 'Pedro Silva', photo: 'https://picsum.photos/201', spec: ['Enfermeiro Infantil', 'Cuidador de PCD Infantil']},
    {id: 3, name: 'Marina Carla', photo: 'https://picsum.photos/202', spec: ['Idosos e PCD Adulto', 'Cuidadora de Idosos']},
]

export default function NewHome({navigation, route}) {
    const user = route?.params?.user || { usr_id: null, usr_name: "Usuário Teste" };

  function open(screenName, profissional) {
    navigation.navigate(screenName, { user, profissional });
  }

return(
<SafeAreaView style={stylesi.base}>
    <ScrollView contentContainerStyle={{flexGrow:1}}>
          <View style={stylesi.header}>
          <View style={styles.header}>
            <View>
          <TouchableOpacity style={styles.voltar} onPress={() => navigation.navigate("Home", { user })}>
            <FontAwesome6 name="arrow-left" size={16} color="white" /> <Text style={styles.voltarTexto}>Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.logo}>AllCare</Text>
          <Text style={styles.subtitle}>Cuidando de quem você ama</Text>
          
          <TouchableOpacity onPress={() => navigation.navigate("Profile", { user })}>
            <Text style={styles.userText}>Olá, <Text style={styles.userTextBold}>{user?.usr_name || "Usuário Teste"}</Text></Text>
          </TouchableOpacity>
          </View> 
          <TouchableOpacity onPress={() => navigation.navigate("Profile", { user })}>
          <View style={styles.avatar}><Text style={styles.avatarText}>👤</Text></View>
        </TouchableOpacity>
        </View>
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
        backgroundColor: '#27272725',
        oppacity: 0.8,
        borderRadius: 20,
    },
    scrcontent: {
        backgroundColor: '#272727',
        fontSize: 15,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 8,
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
  header: { height: '100%', backgroundColor: "#272727", borderRadius: 22, padding: 24, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  logo: { fontSize: 38, fontWeight: "bold", color: "#74bef7" },
  subtitle: { color: "#74bef7" },
  userText: { color: "#ffffff", marginTop: 8, fontSize: 18},
  userTextBold: { fontWeight: "bold", color: "#fff", fontSize: 20 },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: "#E6F2FF", alignItems: "center", justifyContent: "center" },
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
    color: "white",
    fontWeight: "bold",
  },
});
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ImageBackground,
} from "react-native";
import {MaterialIcons, FontAwesome6} from '@expo/vector-icons';
import { BlurView } from "expo-blur";
 

export default function HomeScreen({ navigation, route }) {
  const user = route?.params?.user || { usr_id: null, usr_name: "Usuário Teste" };

  function open(screenName) {
    navigation.navigate(screenName, { user });
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        
        <View style={styles.header}>
          <View>
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
    
        <View style={styles.grid}>
          <Card icon="calendar-plus" title="AGENDE SUA CONSULTA" onPress={() => open("NewHome")} />
          <Card icon="calendar" title="MEUS AGENDAMENTOS" onPress={() => open("MyAppointments")} />
          <Card icon="calendar-check" title="HISTÓRICO DE ATENDIMENTO" onPress={() => open("History")} />
          <Card icon="star" title="AVALIAÇÃO DO ATENDIMENTO" onPress={() => open("Review")} />
          <Card icon="envelope" title="CHAT DE NEGOCIAÇÃO" onPress={() => open("Chat")} />
          <Card icon="people-roof" title="FAMÍLIA" onPress={() => open("Family")} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Card({ icon, title, onPress, highlighted }) {
  const isImage = typeof icon !== "string";
  return (

    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        highlighted && styles.cardHighlighted,
        pressed && styles.cardPressed,
      ]}
      >
        {/*<Image style={styles.cardIcon} source={isImage ? icon : undefined} />*/}
        <FontAwesome6 name={icon} size={62} color="black" style={{marginBottom: 12}}/>
      <Text style={[styles.cardText, highlighted && styles.cardTextHighlighted]}>{title}</Text>
    </Pressable>

  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "rgb(32,99,149)" },
  container: { paddingBottom: 110 },
  header: { backgroundColor: "#ffffff", borderBottomLeftRadius: 22, borderBottomRightRadius: 22, padding: 24, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  logo: { fontSize: 38, fontWeight: "bold", color: "#1d9afa" },
  subtitle: { color: "#0091ff" },
  userText: { color: "#000000", marginTop: 8, fontSize: 18},
  userTextBold: { fontWeight: "bold", color: "#000000", fontSize: 20 },
  avatar: { width: 86, height: 86, borderRadius: 28, backgroundColor: "#3d3d3d", alignItems: "center", justifyContent: "center" },
  avatarText: { fontSize: 24 },
  grid: { padding: 24, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", gap: 16 },
  card: { backgroundColor: "#ffffff", width: "46%", minHeight: 130, borderRadius: 18, alignItems: "center", justifyContent: "center", padding: 12, shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 8, elevation: 3, cursor: "pointer" },
  cardPressed: { opacity: 0.75, transform: [{ scale: 0.99 }] },
  cardHighlighted: { borderWidth: 3, borderColor: "#2563EB" },
  cardIcon: { height: 100, width: 100,  },
  cardText: { textAlign: "center", color: "#000000", fontWeight: "bold", fontSize: 15 },
  cardTextHighlighted: { color: "#2563EB" },
  bottomTab: { position: "absolute", bottom: 2, left: 2, right: 2, borderRadius: 22, paddingVertical: 12, flexDirection: "row", justifyContent: "space-around" },
  bottomButton: { padding: 10 },
  bottomIcon: { fontSize: 22 },
  backg: {
    width: '100%',
    height: '100%',
},
presseda: {
  width: '100%',
  height: '100%',
 alignItems: "center", 
 justifyContent: "center"
}
});

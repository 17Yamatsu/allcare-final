import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

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
            <Text style={styles.userText}>Olá, {user?.usr_name || "Usuário Teste"}</Text>
          </View>
          <View style={styles.avatar}><Text style={styles.avatarText}>👤</Text></View>
        </View>

        <View style={styles.grid}>
          <Card icon="🩺" title="AGENDE SUA CONSULTA" onPress={() => open("ScheduleAppointment")} />
          <Card icon="📋" title="MEUS AGENDAMENTOS" onPress={() => open("MyAppointments")} />
          <Card icon="📅" title="HISTÓRICO DE ATENDIMENTO" onPress={() => open("History")} />
          <Card icon="⭐" title="AVALIAÇÃO DO ATENDIMENTO" onPress={() => open("Review")} />
          <Card icon="💬" title="CHAT DE NEGOCIAÇÃO" onPress={() => open("Chat")} highlighted />
          <Card icon="👨‍👩‍👧" title="FAMÍLIA" onPress={() => open("Family")} />
        </View>
      </ScrollView>

      <View style={styles.bottomTab}>
  <TouchableOpacity onPress={() => navigation.navigate("Home")}>
    <Text style={styles.bottomIcon}>🏠</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => navigation.navigate("MyAppointments")}>
    <Text style={styles.bottomIcon}>📋</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
    <Text style={styles.bottomIcon}>👤</Text>
  </TouchableOpacity>
</View>
    </SafeAreaView>
  );
}

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
  header: { backgroundColor: "#fff", borderBottomLeftRadius: 22, borderBottomRightRadius: 22, padding: 24, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  logo: { fontSize: 38, fontWeight: "bold", color: "#24577D" },
  subtitle: { color: "#24577D" },
  userText: { color: "#64748B", marginTop: 8, fontWeight: "bold" },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: "#E6F2FF", alignItems: "center", justifyContent: "center" },
  avatarText: { fontSize: 24 },
  grid: { padding: 24, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", gap: 16 },
  card: { width: "46%", minHeight: 130, backgroundColor: "#fff", borderRadius: 18, alignItems: "center", justifyContent: "center", padding: 12, shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 8, elevation: 3, cursor: "pointer" },
  cardPressed: { opacity: 0.75, transform: [{ scale: 0.99 }] },
  cardHighlighted: { borderWidth: 3, borderColor: "#2563EB" },
  cardIcon: { fontSize: 38, marginBottom: 12 },
  cardText: { textAlign: "center", color: "#0F2A44", fontWeight: "bold", fontSize: 13 },
  cardTextHighlighted: { color: "#2563EB" },
  bottomTab: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#2D6B9A", borderTopLeftRadius: 22, borderTopRightRadius: 22, paddingVertical: 12, flexDirection: "row", justifyContent: "space-around" },
  bottomButton: { padding: 10 },
  bottomIcon: { fontSize: 22 },
});

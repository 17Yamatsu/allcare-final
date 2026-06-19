import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function ProfileScreen({ navigation, route }) {
const user = route?.params?.user || { usr_id: null, usr_name: "Usuário Teste" };

  function open(screenName) {
    navigation.navigate(screenName, { user });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.voltar}
          onPress={() => navigation.navigate("Home", { user })}
        >
          <Text style={styles.voltarTexto}>←</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>Perfil do Usuário</Text>
        <Text style={styles.subtitulo}>Informações da conta AllCare</Text>
      </View>

      <View style={styles.cardPerfil}>
        <View style={styles.avatar}>
          <Text style={styles.avatarTexto}>👤</Text>
        </View>

        <Text style={styles.nome}>{user?.usr_name || "Usuário Teste"}</Text>
        <Text style={styles.email}>{user?.usr_email || "teste@allcare.com"}</Text>
        <Text style={styles.tipo}>Tipo de usuário: Contratante</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Nome completo</Text>
        <Text style={styles.valor}>{user?.usr_name || "Usuário Teste"}</Text>

        <Text style={styles.label}>E-mail</Text>
        <Text style={styles.valor}>{user?.usr_email || "teste@allcare.com"}</Text>

        <Text style={styles.label}>Perfil</Text>
        <Text style={styles.valor}>{user?.usr_profile || "Contratante"}</Text>
      </View>

      <TouchableOpacity
        style={styles.botaoHome}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.textoBotao}>Voltar para Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#85CEF5",
  },

  header: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },

  voltar: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#EAF4FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  voltarTexto: {
    fontSize: 26,
    color: "#2563EB",
    fontWeight: "bold",
  },

  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0B2D4D",
  },

  subtitulo: {
    fontSize: 14,
    color: "#24577D",
    marginTop: 4,
  },

  cardPerfil: {
    backgroundColor: "#FFFFFF",
    margin: 20,
    borderRadius: 18,
    padding: 24,
    alignItems: "center",
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#EAF4FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  avatarTexto: {
    fontSize: 42,
  },

  nome: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0B2D4D",
  },

  email: {
    fontSize: 14,
    color: "#24577D",
    marginTop: 4,
  },

  tipo: {
    fontSize: 14,
    color: "#2563EB",
    fontWeight: "bold",
    marginTop: 8,
  },

  infoBox: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    borderRadius: 18,
    padding: 20,
  },

  label: {
    fontSize: 13,
    color: "#666",
    marginTop: 12,
  },

  valor: {
    fontSize: 16,
    color: "#0B2D4D",
    fontWeight: "bold",
    marginTop: 3,
  },

  botaoHome: {
    backgroundColor: "#2563EB",
    margin: 20,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  textoBotao: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

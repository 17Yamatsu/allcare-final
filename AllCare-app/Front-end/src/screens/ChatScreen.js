import React, { useEffect, useRef, useState } from "react";
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { getChatMessages, sendChatMessage } from "../services/api";

export default function ChatScreen({ navigation }) {
  const [usuarioAtual, setUsuarioAtual] = useState("Contratante");
  const [mensagem, setMensagem] = useState("");
  const [valor, setValor] = useState("");
  const [mensagens, setMensagens] = useState([]);
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  async function carregarMensagens() {
    try {
      const data = await getChatMessages();
      setMensagens(data);
      setTimeout(() => listRef.current?.scrollToEnd?.({ animated: true }), 150);
    } catch (error) {
      Alert.alert("Erro", error.message || "Não foi possível carregar o chat.");
    }
  }

  useEffect(() => {
    carregarMensagens();
  }, []);

  async function enviarMensagem() {
    const texto = mensagem.trim();
    if (!texto) return;

    const valorDigitado = valor.trim();
    const valorLimpo = valorDigitado
      .replace(/R\$/gi, "")
      .replace(/\s/g, "")
      .replace(/\./g, "")
      .replace(",", ".")
      .replace(/[^0-9.]/g, "");

    const valorNumerico = valorLimpo ? Number(valorLimpo) : null;

    const textoFinal = valorDigitado
      ? `${texto}\nProposta de valor: R$ ${valorDigitado}`
      : texto;

    try {
      setLoading(true);
      const response = await sendChatMessage({
        autor: usuarioAtual,
        mensagem: textoFinal,
        valorNegociado: Number.isFinite(valorNumerico) ? valorNumerico : null,
      });
      setMensagens((old) => [...old, response.item]);
      setMensagem("");
      setValor("");
      setTimeout(() => listRef.current?.scrollToEnd?.({ animated: true }), 150);
    } catch (error) {
      Alert.alert("Erro", error.message || "Não foi possível enviar a mensagem.");
    } finally {
      setLoading(false);
    }
  }

  function renderItem({ item }) {
    const isCurrent = item.autor === usuarioAtual;
    return (
      <View style={[styles.bubble, isCurrent ? styles.bubbleRight : styles.bubbleLeft]}>
        <Text style={styles.author}>{item.autor}</Text>
        <Text style={styles.message}>{item.mensagem}</Text>
        <Text style={styles.time}>{new Date(item.criado_em).toLocaleString("pt-BR")}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Chat de Negociação</Text>
          <Text style={styles.subtitle}>Contratante e cuidador negociam valores e horários</Text>
        </View>
      </View>

      <View style={styles.selector}>
        <Choice selected={usuarioAtual === "Contratante"} label="Contratante" onPress={() => setUsuarioAtual("Contratante")} />
        <Choice selected={usuarioAtual === "Cuidador"} label="Cuidador" onPress={() => setUsuarioAtual("Cuidador")} />
      </View>

      <FlatList
        ref={listRef}
        data={mensagens}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      <View style={styles.inputArea}>
        <TextInput
          style={styles.valueInput}
          placeholder="Valor R$"
          value={valor}
          onChangeText={setValor}
          keyboardType="decimal-pad"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Digite uma mensagem..."
          value={mensagem}
          onChangeText={setMensagem}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={enviarMensagem} disabled={loading}>
          <Text style={styles.sendText}>{loading ? "..." : "Enviar"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function Choice({ selected, label, onPress }) {
  return (
    <TouchableOpacity style={[styles.choice, selected && styles.choiceSelected]} onPress={onPress}>
      <Text style={[styles.choiceText, selected && styles.choiceTextSelected]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#E6F2FF" },
  header: { backgroundColor: "#fff", padding: 18, flexDirection: "row", alignItems: "center", gap: 14, borderBottomLeftRadius: 18, borderBottomRightRadius: 18 },
  backButton: { width: 42, height: 42, borderRadius: 12, backgroundColor: "#E6F2FF", alignItems: "center", justifyContent: "center" },
  backText: { color: "#2563EB", fontSize: 28, fontWeight: "bold" },
  title: { fontSize: 22, color: "#0F2A44", fontWeight: "bold" },
  subtitle: { color: "#51647A" },
  selector: { flexDirection: "row", padding: 16, gap: 10 },
  choice: { flex: 1, padding: 12, borderRadius: 14, borderWidth: 1, borderColor: "#2563EB", alignItems: "center", backgroundColor: "#fff" },
  choiceSelected: { backgroundColor: "#2563EB" },
  choiceText: { color: "#2563EB", fontWeight: "bold" },
  choiceTextSelected: { color: "#fff" },
  list: { padding: 16, paddingBottom: 20 },
  bubble: { maxWidth: "82%", padding: 12, borderRadius: 16, marginBottom: 10, shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  bubbleRight: { backgroundColor: "#DCFCE7", alignSelf: "flex-end" },
  bubbleLeft: { backgroundColor: "#fff", alignSelf: "flex-start" },
  author: { fontWeight: "bold", color: "#1E3A5F", marginBottom: 4 },
  message: { color: "#0F172A", lineHeight: 20 },
  time: { color: "#64748B", fontSize: 10, marginTop: 6, textAlign: "right" },
  inputArea: { flexDirection: "row", gap: 8, padding: 12, backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: "#D6E4FF", alignItems: "center" },
  valueInput: { width: 88, backgroundColor: "#F4F7FB", borderColor: "#D6E4FF", borderWidth: 1, borderRadius: 14, padding: 12 },
  textInput: { flex: 1, maxHeight: 90, backgroundColor: "#F4F7FB", borderColor: "#D6E4FF", borderWidth: 1, borderRadius: 14, padding: 12 },
  sendButton: { backgroundColor: "#2563EB", borderRadius: 14, paddingVertical: 14, paddingHorizontal: 16 },
  sendText: { color: "#fff", fontWeight: "bold" },
});

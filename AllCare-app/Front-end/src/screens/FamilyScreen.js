import React, { useCallback, useState } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { createFamilyMember, deleteFamilyMember, getFamilyMembers } from "../services/api";

export default function FamilyScreen({ navigation, route }) {
  const user = route?.params?.user;
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ nome: "João Familiar", parentesco: "Filho", telefone: "11999999999", email: "familiar@email.com", observacoes: "Contato principal." });
  const load = useCallback(async () => { try { setItems(await getFamilyMembers()); } catch(e){ Alert.alert("Erro", e.message); } }, []);
  useFocusEffect(useCallback(()=>{ load(); }, [load]));
  function update(k,v){ setForm(o=>({...o,[k]:v})); }
  async function save(){ try { await createFamilyMember({ ...form, usuario_id: user?.usr_id || null }); Alert.alert("Sucesso", "Familiar cadastrado."); load(); } catch(e){ Alert.alert("Erro", e.message); } }
  async function remove(id){ try { await deleteFamilyMember(id); load(); } catch(e){ Alert.alert("Erro", e.message); } }
  return <SafeAreaView style={styles.screen}><ScrollView contentContainerStyle={styles.container}><Back navigation={navigation}/><Text style={styles.title}>Família</Text><Text style={styles.subtitle}>Cadastre contatos familiares vinculados ao paciente.</Text><View style={styles.form}><Input label="Nome" value={form.nome} onChangeText={(v)=>update('nome',v)}/><Input label="Parentesco" value={form.parentesco} onChangeText={(v)=>update('parentesco',v)}/><Input label="E-mail" value={form.email} onChangeText={(v)=>update('email',v)}/><Input label="Observações" value={form.observacoes} onChangeText={(v)=>update('observacoes',v)} multiline/><Button title="Adicionar familiar" onPress={save}/></View>{items.map(item=><View key={item.id} style={styles.card}><Text style={styles.cardTitle}>{item.nome}</Text><Text>{item.parentesco}</Text><Text>✉️ {item.email}</Text><Text>{item.observacoes}</Text><TouchableOpacity style={styles.deleteButton} onPress={()=>remove(item.id)}><Text style={styles.deleteText}>Excluir</Text></TouchableOpacity></View>)}</ScrollView></SafeAreaView>;
}
function Input(props){return <View style={styles.field}><Text style={styles.label}>{props.label}</Text><TextInput style={[styles.input,props.multiline&&styles.textArea]} {...props}/></View>}
function Button({title,onPress}){return <TouchableOpacity style={styles.button} onPress={onPress}><Text style={styles.buttonText}>{title}</Text></TouchableOpacity>}
function Back({navigation}){return <TouchableOpacity style={styles.back} onPress={()=>navigation.goBack()}><Text style={styles.backText}>← Voltar</Text></TouchableOpacity>}
const styles=StyleSheet.create({screen:{flex:1,backgroundColor:"#EAF6FF", padding:10},container:{padding:20,paddingBottom:40},back:{alignSelf:"flex-start",marginBottom:12},backText:{color:"#2563EB",fontWeight:"bold"},title:{fontSize:28,fontWeight:"bold",color:"#0F2A44"},subtitle:{color:"#52677A",marginBottom:16},form:{backgroundColor:"#fff",borderRadius:18,padding:16,marginBottom:16},field:{marginBottom:10},label:{fontWeight:"bold",marginBottom:4,color:"#0F2A44"},input:{backgroundColor:"#F8FBFF",borderRadius:12,borderWidth:1,borderColor:"#CFE3FF",padding:12},textArea:{minHeight:80,textAlignVertical:"top"},button:{backgroundColor:"#2563EB",borderRadius:14,padding:14,alignItems:"center"},buttonText:{color:"#fff",fontWeight:"bold"},card:{backgroundColor:"#fff",borderRadius:18,padding:16,marginBottom:14},cardTitle:{fontSize:18,fontWeight:"bold",color:"#0F2A44"},deleteButton:{backgroundColor:"#DC2626",borderRadius:12,padding:10,alignSelf:"flex-start",marginTop:10},deleteText:{color:"#fff",fontWeight:"bold"}});

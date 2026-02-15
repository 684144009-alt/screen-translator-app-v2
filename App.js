// App.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { translateGameText } from './services'; 

export default function App() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('ผลลัพธ์การแปลจะแสดงที่นี่...');
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!inputText) return;
    setLoading(true);
    setTranslatedText('กำลังแปล...');
    
    // โยงไปเรียกฟังก์ชันที่เราเขียนไว้ใน services.js
    const result = await translateGameText(inputText);
    
    setTranslatedText(result);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🎮 Screen Translator v2</Text>
      
      <TextInput
        style={styles.input}
        placeholder="พิมพ์ข้อความภาษาอังกฤษ หรือ ญี่ปุ่น..."
        value={inputText}
        onChangeText={setInputText}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleTranslate} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>ทดสอบแปลภาษา</Text>}
      </TouchableOpacity>

      <View style={styles.resultBox}>
        <Text style={styles.resultText}>{translatedText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4', padding: 20, justifyContent: 'center' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 10, fontSize: 16, height: 100, marginBottom: 15, borderWidth: 1, borderColor: '#ddd' },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 20 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  resultBox: { backgroundColor: '#333', padding: 20, borderRadius: 10, minHeight: 100, justifyContent: 'center' },
  resultText: { color: '#fff', fontSize: 18, textAlign: 'center' },
});
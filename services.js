// services.js

// ลบ gsk_... ออกไปก่อน แล้วใส่คำว่า API_KEY_HIDDEN แทน
const GROQ_API_KEY = 'API_KEY_HIDDEN';

export async function translateGameText(textToTranslate) {
  if (!textToTranslate || textToTranslate.trim() === '') return '';

  const prompt = `Translate the following gaming text to Thai concisely and naturally. Output ONLY the translated text, nothing else: "${textToTranslate}"`;

  try {
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // 🔴 แก้ไขชื่อโมเดลเป็นตัวล่าสุดของ Groq
        model: 'llama-3.1-8b-instant', 
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
      })
    });

    if (groqResponse.ok) {
      const data = await groqResponse.json();
      return data.choices[0].message.content.trim();
    } else {
      // 🟢 เพิ่มตัวดักจับ Error เพื่อดูว่า Groq บ่นเรื่องอะไร
      const errorData = await groqResponse.json();
      console.log('🔥 Groq Error Details:', JSON.stringify(errorData, null, 2));
      return `Error ${groqResponse.status}: กรุณาเช็ก Terminal`;
    }

  } catch (error) {
    console.log('Fetch Error:', error);
    return 'Error: การเชื่อมต่อล้มเหลว';
  }
}

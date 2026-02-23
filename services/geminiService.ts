
import { GoogleGenAI } from "@google/genai";

const TEXT_MODEL = 'gemini-3-flash-preview';

// Instantiates AI client right before use to ensure up-to-date API key
export async function getBattleNarrative(activity: any): Promise<{ narrative: string, rank: string }> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: TEXT_MODEL,
      contents: `Transforme esta atividade física em um relatório técnico cyberpunk: ${JSON.stringify(activity)}. 
      Retorne um JSON com: 
      "narrative": (uma descrição de no máximo 20 palavras usando termos como 'neural link', 'bio-metria', 'setor', 'eficiência de dados', 'sincronização'),
      "rank": (S, A, B ou C baseado na performance - S é elite, C é iniciante).`,
      config: { responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || '{"narrative": "Sincronização concluída no setor.", "rank": "A"}');
  } catch (error) {
    return { narrative: "Dados processados com sucesso.", rank: "B" };
  }
}

// Instantiates AI client right before use for narrative commentary
export async function getNarratorCommentary(userStats: any): Promise<string> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: TEXT_MODEL,
      contents: `Com base nas estatísticas: ${JSON.stringify(userStats)}, dê um comentário curto de incentivo técnico estilo Cyberpunk (IA de sistema). Foco em Neural Sync e evolução de Fase.`,
    });
    return response.text || "Aguardando próxima sincronização.";
  } catch (error) {
    return "Mantenha o link ativo, Operator.";
  }
}

// Instantiates AI client right before use for gamification reasoning
export async function simulateGamificationStep(context: any): Promise<string> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: TEXT_MODEL,
      contents: `Analise este log de performance no sistema Funpace:
      Contexto: ${JSON.stringify(context)}
      Explique a lógica técnica de atribuição de Funits e como isso otimiza o Neural Sync do Operator. 
      Use tom de IA de sistema cibernético.`,
    });
    return response.text || "Dados de gamificação analisados.";
  } catch (error) {
    return "Erro no fluxo de dados.";
  }
}

// Edits an image with cyberpunk style using Gemini 2.5 Flash Image
export async function editImage(base64Image: string, prompt: string, mimeType: string = 'image/png'): Promise<string | null> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const cleanBase64 = base64Image.includes(',') ? base64Image.split(',')[1] : base64Image;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: cleanBase64, mimeType: mimeType } },
          { text: `Edite esta imagem com estilo cyberpunk futurista, HUD digital e neon para o Funpace: ${prompt}.` }
        ]
      }
    });

    // Iterates through all parts to find the image part as per guidelines
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) return `data:${mimeType};base64,${part.inlineData.data}`;
    }
    return null;
  } catch (error) {
    return null;
  }
}

// Validates Strava activities against active missions using AI audit
export async function validateStravaActivity(activity: any, missions: any[]): Promise<{ validated: boolean, funits: number }> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: TEXT_MODEL,
      contents: `Valide esta atividade do Strava: ${JSON.stringify(activity)} em relação às missões: ${JSON.stringify(missions)}.
      Retorne um JSON indicando se é válida ("validated": boolean) e quantos Funits deve ganhar ("funits": number).`,
      config: { responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || '{"validated": true, "funits": 50}');
  } catch (error) {
    return { validated: true, funits: 50 };
  }
}

// Validates manual workouts with user notes and returns bonus status
export async function validateManualWorkout(workout: any, note: string): Promise<{ success: boolean, bonus: number }> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: TEXT_MODEL,
      contents: `Valide este treino manual: ${JSON.stringify(workout)} com a nota do usuário: "${note}".
      Retorne um JSON indicando sucesso ("success": boolean) e bônus de Funits ("bonus": number).`,
      config: { responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || '{"success": true, "bonus": 10}');
  } catch (error) {
    return { success: true, bonus: 0 };
  }
}

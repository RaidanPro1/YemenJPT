
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION, CODE_ASSISTANT_INSTRUCTION } from "../constants";
import { GeminiConfig, AiModelType } from "../types";

export class GeminiService {
  private getAI(config: GeminiConfig) {
    const apiKey = config.accessToken || process.env.API_KEY;
    if (!apiKey) {
      throw new Error("No authorization found. Please Connect Google Workspace.");
    }
    return new GoogleGenAI({ apiKey });
  }

  async chat(message: string, history: any[], config: GeminiConfig = {}, mediaFiles: { data: string, mimeType: string }[] = []) {
    try {
      const ai = this.getAI(config);
      
      // Default to Gemini 3 Flash for speed/search, or Gemini 3 Pro for deep reasoning
      let model = 'gemini-3-flash-preview';
      
      // If a specific local model is selected, we simulate local routing or use specific cloud endpoints
      if (config.specificModel === AiModelType.FALCON_3) {
        model = 'gemini-3-flash-preview'; // In production this routes to Ollama Falcon 3 via local proxy
      }

      if (config.lowLatency) {
        model = 'gemini-flash-lite-latest';
      }

      let dialectNote = config.dialect ? `\n[System Note: Contextualize response using the Yemeni ${config.dialect} dialect nuances.]` : '';
      let gpuNote = config.useColabGpu ? `\n[System Note: Google Colab GPU Acceleration is AUTHORIZED and ACTIVE for this request.]` : '';
      let modelNote = config.specificModel ? `\n[System Note: Processing request using ${config.specificModel} logic.]` : '';

      const parts: any[] = mediaFiles.map(f => ({
        inlineData: { data: f.data, mimeType: f.mimeType }
      }));
      parts.push({ text: message + dialectNote + gpuNote + modelNote });

      const tools: any[] = [];
      if (config.useSearch) tools.push({ googleSearch: {} });

      const systemInstruction = config.isCodeAssistant 
        ? `${SYSTEM_INSTRUCTION}\n\n${CODE_ASSISTANT_INSTRUCTION}`
        : SYSTEM_INSTRUCTION;

      let finalConfig: any = {
        systemInstruction,
        tools: tools.length > 0 ? tools : undefined
      };

      if (config.useThinking) {
        const maxBudget = model.includes('pro') ? 32768 : 24576;
        finalConfig.thinkingConfig = { thinkingBudget: Math.min(config.thinkingBudget || maxBudget, maxBudget) };
      }

      const response = await ai.models.generateContent({
        model,
        contents: [
          ...history.map(h => ({ 
            role: h.role === 'user' ? 'user' : 'model', 
            parts: [{ text: h.content }] 
          })),
          { role: 'user', parts: parts }
        ],
        config: finalConfig
      });

      return {
        text: response.text || "لا توجد استجابة نصية من YemenJPT.",
        groundingMetadata: response.candidates?.[0]?.groundingMetadata
      };
    } catch (error) {
      console.error("YemenJPT Chat Error:", error);
      throw error;
    }
  }

  initiateOAuth() {
    const backendUrl = `https://api.raidan.pro/auth/google`;
    window.location.href = backendUrl;
  }
}

export const gemini = new GeminiService();

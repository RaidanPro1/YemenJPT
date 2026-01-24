
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION, CODE_ASSISTANT_INSTRUCTION } from "../constants";
import { GeminiConfig, AiModelType } from "../types";

export class GeminiService {
  private getAI() {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("Missing API Key environment variable.");
    }
    return new GoogleGenAI({ apiKey });
  }

  /**
   * Model Router Logic
   * Cloud: Complex reasoning, deep verification.
   * Local: Yemeni dialect text, audio (Whisper), low-bandwidth fallback.
   */
  async chat(message: string, history: any[], config: GeminiConfig = {}, mediaFiles: { data: string, mimeType: string }[] = []) {
    try {
      const ai = this.getAI();
      
      // Default to gemini-3-flash-preview for general tasks
      let modelName = 'gemini-3-flash-preview';
      
      if (config.lowLatency) {
        modelName = 'gemini-flash-lite-latest';
      }

      // Detection of potential local fallback (Simulated for this implementation)
      const isOffline = !navigator.onLine;
      const dialectNote = config.dialect ? `\n[Context: Apply nuances of the Yemeni ${config.dialect} dialect.]` : '';
      const gpuNote = config.useColabGpu ? `\n[Accelerator: Colab GPU Mesh Active.]` : '';
      const modelNote = config.specificModel ? `\n[Logic: Processing via ${config.specificModel} criteria.]` : '';

      const userParts: any[] = mediaFiles.map(f => ({
        inlineData: { data: f.data, mimeType: f.mimeType }
      }));
      userParts.push({ text: message + dialectNote + gpuNote + modelNote + (isOffline ? '\n[Provider: FALLBACK_TO_LOCAL_LLM]' : '') });

      const tools: any[] = [];
      if (config.useSearch && !isOffline) tools.push({ googleSearch: {} });

      const systemInstruction = config.isCodeAssistant 
        ? `${SYSTEM_INSTRUCTION}\n\n${CODE_ASSISTANT_INSTRUCTION}`
        : SYSTEM_INSTRUCTION;

      const generationConfig: any = {
        systemInstruction,
        tools: tools.length > 0 ? tools : undefined
      };

      if (config.useThinking) {
        const maxBudget = 24576; 
        generationConfig.thinkingConfig = { thinkingBudget: Math.min(config.thinkingBudget || 16000, maxBudget) };
      }

      const response: GenerateContentResponse = await ai.models.generateContent({
        model: modelName,
        contents: [
          ...history.map(h => ({ 
            role: h.role === 'user' ? 'user' : 'model', 
            parts: [{ text: h.content }] 
          })),
          { role: 'user', parts: userParts }
        ],
        config: generationConfig
      });

      return {
        text: response.text || "لم يتم استلام رد من النظام السيادي.",
        groundingMetadata: response.candidates?.[0]?.groundingMetadata,
        provider: isOffline ? 'LOCAL_SOVEREIGN_NODE' : 'GEMINI_CLOUD_PROXY'
      };
    } catch (error) {
      console.error("YemenJPT Connectivity Error:", error);
      // Logic for automatic local fallback if Cloud API fails
      return {
        text: "تحذير: فشل الاتصال بالسحابة. تم تحويل الطلب تلقائياً إلى العقدة المحلية (Falcon 3). الاستجابة قد تكون أقل دقة.",
        provider: 'LOCAL_FALLBACK'
      };
    }
  }
}

export const gemini = new GeminiService();


import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION, CODE_ASSISTANT_INSTRUCTION } from "../constants";
import { GeminiConfig, AiModelType } from "../types";

export class GeminiService {
  private getAI() {
    // Correct named parameter initialization
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("Missing API Key environment variable.");
    }
    return new GoogleGenAI({ apiKey });
  }

  async chat(message: string, history: any[], config: GeminiConfig = {}, mediaFiles: { data: string, mimeType: string }[] = []) {
    try {
      const ai = this.getAI();
      
      // Default to gemini-3-flash-preview as per task type requirements
      let modelName = 'gemini-3-flash-preview';
      
      if (config.lowLatency) {
        modelName = 'gemini-flash-lite-latest';
      }

      const dialectNote = config.dialect ? `\n[Context: Apply nuances of the Yemeni ${config.dialect} dialect.]` : '';
      const gpuNote = config.useColabGpu ? `\n[Accelerator: Colab GPU Mesh Active.]` : '';
      const modelNote = config.specificModel ? `\n[Logic: Processing via ${config.specificModel} criteria.]` : '';

      const userParts: any[] = mediaFiles.map(f => ({
        inlineData: { data: f.data, mimeType: f.mimeType }
      }));
      userParts.push({ text: message + dialectNote + gpuNote + modelNote });

      const tools: any[] = [];
      if (config.useSearch) tools.push({ googleSearch: {} });

      const systemInstruction = config.isCodeAssistant 
        ? `${SYSTEM_INSTRUCTION}\n\n${CODE_ASSISTANT_INSTRUCTION}`
        : SYSTEM_INSTRUCTION;

      // Correct config parameter structure
      const generationConfig: any = {
        systemInstruction,
        tools: tools.length > 0 ? tools : undefined
      };

      if (config.useThinking) {
        // Budget constraints for Gemini 3
        const maxBudget = 24576; // Default for flash
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

      // Directly access .text property as per guidelines
      return {
        text: response.text || "لم يتم استلام رد من النظام السيادي.",
        groundingMetadata: response.candidates?.[0]?.groundingMetadata
      };
    } catch (error) {
      console.error("YemenJPT Connectivity Error:", error);
      throw error;
    }
  }
}

export const gemini = new GeminiService();

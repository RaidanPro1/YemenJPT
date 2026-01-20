
import { GoogleGenAI, Modality, Type } from "@google/genai";
import { SYSTEM_INSTRUCTION, CODE_ASSISTANT_INSTRUCTION } from "../constants";
import { AiProviderType } from "../types";

export interface GeminiConfig {
  useThinking?: boolean;
  useSearch?: boolean;
  useMaps?: boolean;
  lowLatency?: boolean;
  thinkingBudget?: number;
  provider?: AiProviderType;
  isCodeAssistant?: boolean;
  specificModel?: string;
}

export class GeminiService {
  private getAI() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async chat(message: string, history: any[], config: GeminiConfig = {}, mediaFiles: { data: string, mimeType: string }[] = []) {
    try {
      const ai = this.getAI();
      
      // Feature-based model selection according to user instructions
      let model = config.specificModel || 'gemini-3-pro-preview';
      
      if (config.lowLatency && !config.specificModel) {
        model = 'gemini-2.5-flash-lite-latest';
      } else if (config.useSearch && !config.specificModel) {
        model = 'gemini-3-flash-preview';
      } else if (config.useMaps && !config.specificModel) {
        model = 'gemini-2.5-flash';
      } else if (mediaFiles.some(f => f.mimeType.startsWith('audio')) && !config.specificModel) {
        model = 'gemini-3-flash-preview';
      } else if (mediaFiles.some(f => f.mimeType.startsWith('video')) && !config.specificModel) {
        model = 'gemini-3-pro-preview';
      } else if (mediaFiles.some(f => f.mimeType.startsWith('image')) && !config.specificModel) {
        model = 'gemini-3-pro-preview';
      }

      const parts: any[] = mediaFiles.map(f => ({
        inlineData: { data: f.data, mimeType: f.mimeType }
      }));
      parts.push({ text: message });

      const tools: any[] = [];
      if (config.useSearch) tools.push({ googleSearch: {} });
      if (config.useMaps) tools.push({ googleMaps: {} });

      const systemInstruction = config.isCodeAssistant 
        ? `${SYSTEM_INSTRUCTION}\n\n${CODE_ASSISTANT_INSTRUCTION}`
        : SYSTEM_INSTRUCTION;

      // Thinking Budget Logic
      let finalConfig: any = {
        systemInstruction,
        tools: tools.length > 0 ? tools : undefined
      };

      if (config.useThinking && (model.includes('gemini-3') || model.includes('gemini-2.5'))) {
        finalConfig.thinkingConfig = { thinkingBudget: config.thinkingBudget || 32768 };
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
        text: response.text || "لا توجد استجابة نصية.",
        groundingMetadata: response.candidates?.[0]?.groundingMetadata
      };
    } catch (error) {
      console.error("Gemini Chat Error:", error);
      throw error;
    }
  }

  async generateImage(prompt: string, config: { size: string, aspectRatio: string }) {
    try {
      const ai = this.getAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: { parts: [{ text: prompt }] },
        config: {
          imageConfig: { 
            aspectRatio: config.aspectRatio as any, 
            imageSize: config.size as any 
          }
        }
      });

      const part = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
      return part?.inlineData?.data ? `data:image/png;base64,${part.inlineData.data}` : null;
    } catch (error) {
      console.error("Image Gen Error:", error);
      return null;
    }
  }
}

export const gemini = new GeminiService();

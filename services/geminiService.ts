
import { GoogleGenAI } from "@google/genai";
import { Tone, Length } from '../types';

export interface BlogGenerationParams {
  topic: string;
  outline: string;
  tone: Tone;
  length: Length;
}

// Assume API_KEY is set in the environment.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

function constructPrompt(params: BlogGenerationParams): string {
  const { topic, outline, tone, length } = params;

  return `
    You are an expert content creator and blog writer. Your task is to generate a high-quality, engaging, and well-structured blog post based on the provided specifications.

    **Blog Post Topic:**
    "${topic}"

    **Tone of Voice:**
    ${tone}

    **Desired Length:**
    ${length}

    **Outline/Key Points to Cover:**
    ${outline || "Based on the topic, please create a logical and compelling structure for the blog post."}

    **Output Format Instructions:**
    - Generate the content in clean, semantic HTML format.
    - Use appropriate tags like <h1> for the main title, <h2> for main sections, <h3> for sub-sections, <p> for paragraphs, <ul> and <li> for lists, <strong> for emphasis, etc.
    - Do NOT include <html>, <head>, or <body> tags. The output should be only the HTML content for the blog post itself.
    - Ensure the blog post is well-written, coherent, and adheres strictly to the specified topic, tone, and length.
    - The main title should be an <h1> tag and should be a creative and engaging title based on the topic.
  `;
}

export async function generateBlogPost(params: BlogGenerationParams): Promise<string> {
    if (!params.topic) {
        throw new Error("Blog topic cannot be empty.");
    }
    
    const model = 'gemini-2.5-flash';
    const prompt = constructPrompt(params);

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
        });

        const htmlContent = response.text;
        
        if (!htmlContent) {
            throw new Error("Received an empty response from the AI. Please try again.");
        }

        return htmlContent.trim();
    } catch (error) {
        console.error("Error generating blog post:", error);
        throw new Error("Failed to generate blog post. The API call failed.");
    }
}

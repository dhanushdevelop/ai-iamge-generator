import OpenAI from 'openai';
import { z } from 'zod';

const configSchema = z.object({
  apiKey: z.string().min(1, 'OpenAI API key is required'),
});

export type Config = z.infer<typeof configSchema>;

export class OpenAIService {
  private client: OpenAI;

  constructor(config: Config) {
    const validated = configSchema.parse(config);
    this.client = new OpenAI({
      apiKey: validated.apiKey,
      dangerouslyAllowBrowser: true
    });
  }

  async generateImage(prompt: string): Promise<string> {
    try {
      const response = await this.client.images.generate({
        model: "dall-e-3",
        prompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
        response_format: "url",
      });

      if (!response.data[0]?.url) {
        throw new Error('No image URL received from OpenAI');
      }

      return response.data[0].url;
    } catch (error) {
      if (error instanceof OpenAI.APIError) {
        throw new Error(`OpenAI API error: ${error.message}`);
      }
      throw error;
    }
  }
}
import { useState } from 'react';
import { OpenAIService, type Config } from '../lib/openai';

export function useOpenAI(config: Config) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const service = new OpenAIService(config);

  const generateImage = async (prompt: string): Promise<string | null> => {
    try {
      setIsLoading(true);
      setError(null);
      return await service.generateImage(prompt);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateImage,
    error,
    isLoading,
  };
}
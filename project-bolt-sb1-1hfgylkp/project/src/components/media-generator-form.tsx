import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { Button } from './ui/button';
import { useOpenAI } from '../hooks/useOpenAI';

type MediaType = 'image' | 'video';

interface MediaGeneratorFormProps {
  onGenerated: (url: string) => void;
}

export function MediaGeneratorForm({ onGenerated }: MediaGeneratorFormProps) {
  const [prompt, setPrompt] = useState('');
  const [mediaType, setMediaType] = useState<MediaType>('image');
  
  const { generateImage, error, isLoading } = useOpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mediaType === 'video') {
      alert('Video generation is not yet implemented');
      return;
    }

    const imageUrl = await generateImage(prompt);
    if (imageUrl) {
      onGenerated(imageUrl);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-6">
      <div className="space-y-2">
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">
          Enter your prompt
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full min-h-[100px] p-3 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder="Describe what you want to generate..."
          required
        />
      </div>

      <div className="flex gap-4">
        <Button
          type="button"
          variant={mediaType === 'image' ? 'primary' : 'outline'}
          onClick={() => setMediaType('image')}
        >
          Generate Image
        </Button>
        <Button
          type="button"
          variant={mediaType === 'video' ? 'primary' : 'outline'}
          onClick={() => setMediaType('video')}
        >
          Generate Video
        </Button>
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        <Wand2 className="w-4 h-4 mr-2" />
        {isLoading ? 'Generating...' : 'Generate'}
      </Button>
    </form>
  );
}
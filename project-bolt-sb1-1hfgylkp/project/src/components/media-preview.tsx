import React from 'react';
import { ImageIcon, VideoIcon } from 'lucide-react';

interface MediaPreviewProps {
  type: 'image' | 'video';
  url?: string;
}

export function MediaPreview({ type, url }: MediaPreviewProps) {
  if (!url) {
    return (
      <div className="w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
        {type === 'image' ? (
          <ImageIcon className="w-12 h-12 text-gray-400" />
        ) : (
          <VideoIcon className="w-12 h-12 text-gray-400" />
        )}
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg overflow-hidden">
      {type === 'image' ? (
        <img src={url} alt="Generated content" className="w-full h-auto" />
      ) : (
        <video src={url} controls className="w-full h-auto" />
      )}
    </div>
  );
}
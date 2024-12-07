import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { MediaGeneratorForm } from './components/media-generator-form';
import { MediaPreview } from './components/media-preview';

function App() {
  const [generatedUrl, setGeneratedUrl] = useState<string>();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">AI Media Generator</h1>
          </div>
          <p className="text-lg text-gray-600">
            Transform your ideas into stunning images and videos using AI
          </p>
        </header>

        <main className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Generate Media</h2>
                <MediaGeneratorForm onGenerated={setGeneratedUrl} />
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Preview</h2>
                <MediaPreview type="image" url={generatedUrl} />
              </div>
            </div>
          </div>

          <section className="mt-12 text-center">
            <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Enter Your Prompt',
                  description: 'Describe what you want to create in detail'
                },
                {
                  title: 'Choose Format',
                  description: 'Select between image or video generation'
                },
                {
                  title: 'Generate',
                  description: 'Let AI bring your vision to life'
                }
              ].map((step, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    {index + 1}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
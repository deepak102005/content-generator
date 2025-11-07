import React, { useState, useCallback } from 'react';
import { BlogForm, type FormState } from './components/BlogForm';
import { ResultDisplay } from './components/ResultDisplay';
import { generateBlogPost } from './services/geminiService';
import { Tone, Length } from './types';
import { SparklesIcon } from './components/icons/SparklesIcon';

const App: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    topic: 'The Future of Renewable Energy',
    outline: '1. Introduction to renewable energy sources\n2. Current trends and innovations\n3. Challenges and solutions\n4. Future outlook and predictions',
    tone: Tone.INFORMATIVE,
    length: Length.MEDIUM,
  });

  const [generatedHtml, setGeneratedHtml] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setGeneratedHtml('');

    try {
      const result = await generateBlogPost(formState);
      setGeneratedHtml(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [formState]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-200 font-sans">
      <header className="bg-white dark:bg-slate-950/70 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <SparklesIcon className="h-8 w-8 text-indigo-500" />
              <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
                AI Blog Content Generator
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <BlogForm
                formState={formState}
                setFormState={setFormState}
                onGenerate={handleGenerate}
                isLoading={isLoading}
              />
            </div>
          </div>
          <div className="lg:col-span-8">
             <ResultDisplay
                htmlContent={generatedHtml}
                isLoading={isLoading}
                error={error}
              />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
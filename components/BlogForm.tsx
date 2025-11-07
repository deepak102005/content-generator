
import React from 'react';
import { Tone, Length } from '../types';
import { TONES, LENGTHS } from '../constants';
import { WandIcon } from './icons/WandIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';

export interface FormState {
  topic: string;
  outline: string;
  tone: Tone;
  length: Length;
}

interface BlogFormProps {
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  onGenerate: () => void;
  isLoading: boolean;
}

export const BlogForm: React.FC<BlogFormProps> = ({ formState, setFormState, onGenerate, isLoading }) => {
  const handleChange = <T,>(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value as T,
    }));
  };

  return (
    <div className="bg-white dark:bg-slate-950/70 backdrop-blur-lg rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 space-y-6">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
        Configure Your Blog Post
      </h2>

      <div className="space-y-1.5">
        <label htmlFor="topic" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Topic
        </label>
        <input
          type="text"
          id="topic"
          name="topic"
          value={formState.topic}
          onChange={handleChange<string>}
          placeholder="e.g., The Impact of AI on Modern Art"
          className="block w-full rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          disabled={isLoading}
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="outline" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Outline (Optional)
        </label>
        <textarea
          id="outline"
          name="outline"
          rows={5}
          value={formState.outline}
          onChange={handleChange<string>}
          placeholder="Enter key points, one per line..."
          className="block w-full rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          disabled={isLoading}
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="tone" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Tone
        </label>
        <select
          id="tone"
          name="tone"
          value={formState.tone}
          onChange={handleChange<Tone>}
          className="block w-full rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          disabled={isLoading}
        >
          {TONES.map(tone => (
            <option key={tone} value={tone}>{tone}</option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="length" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Length
        </label>
        <select
          id="length"
          name="length"
          value={formState.length}
          onChange={handleChange<Length>}
          className="block w-full rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          disabled={isLoading}
        >
          {LENGTHS.map(length => (
            <option key={length} value={length}>{length}</option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={onGenerate}
        disabled={isLoading}
        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900 disabled:bg-indigo-400 dark:disabled:bg-indigo-800 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? (
          <>
            <SpinnerIcon className="animate-spin -ml-1 mr-3 h-5 w-5" />
            Generating...
          </>
        ) : (
          <>
            <WandIcon className="-ml-1 mr-2 h-5 w-5" />
            Generate Content
          </>
        )}
      </button>
    </div>
  );
};


import React from 'react';

interface ResultDisplayProps {
  htmlContent: string;
  isLoading: boolean;
  error: string;
}

const SkeletonLoader: React.FC = () => (
  <div className="space-y-6 animate-pulse">
    <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-md w-3/4 skeleton"></div>
    <div className="space-y-3">
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-md skeleton"></div>
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-md w-5/6 skeleton"></div>
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-md w-4/6 skeleton"></div>
    </div>
    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-md w-1/2 skeleton"></div>
    <div className="space-y-3">
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-md w-5/6 skeleton"></div>
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-md skeleton"></div>
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-md w-4/6 skeleton"></div>
    </div>
  </div>
);

const Placeholder: React.FC = () => (
    <div className="text-center py-20">
      <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h3 className="mt-2 text-sm font-medium text-slate-900 dark:text-slate-200">No content generated yet</h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Fill out the form and click "Generate Content" to see the result.</p>
    </div>
)

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ htmlContent, isLoading, error }) => {
  const renderContent = () => {
    if (isLoading) {
      return <SkeletonLoader />;
    }
    if (error) {
      return (
        <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
               <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-300">Error</h3>
              <div className="mt-2 text-sm text-red-700 dark:text-red-400">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (htmlContent) {
      return (
        <article 
          className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-indigo-600 dark:prose-a:text-indigo-400 hover:prose-a:text-indigo-500"
          // This is safe because we are generating the HTML ourselves via a trusted API
          // and have instructed it not to include any scripts.
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      );
    }
    return <Placeholder />;
  };

  return (
    <div className="bg-white dark:bg-slate-950/70 backdrop-blur-lg rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 sm:p-8 min-h-[calc(100vh-15rem)]">
      {renderContent()}
    </div>
  );
};

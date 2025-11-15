"use client";

import { useState } from "react";
import { useCreateNote } from "@/src/hooks/useCreateNote";

interface AddNoteModalProps {
  onClose: () => void;
}

export default function AddNoteModal({ onClose }: AddNoteModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    title: "",
    content: "",
  });

  const createNote = useCreateNote();

  const handleCreate = () => {

    setValidationErrors({ title: "", content: "" });

   
    if (title.trim().length < 3) {
      setValidationErrors(prev => ({ 
        ...prev, 
        title: "Title must be at least 3 characters" 
      }));
      return;
    }

   
    if (content.trim().length < 10) {
      setValidationErrors(prev => ({ 
        ...prev, 
        content: "Content must be at least 10 characters" 
      }));
      return;
    }

    createNote.mutate(
      { note_title: title, note_content: content },
      { onSuccess: () => onClose() }
    );
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl transform animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
       
        <div className="relative px-8 pt-8 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2.5 rounded-xl">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Create New Note</h2>
              <p className="text-sm text-gray-500">Capture your thoughts and ideas</p>
            </div>
          </div>
          
       
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-8 py-6 space-y-5">
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Note Title
            </label>
            <input
              className={`w-full border ${validationErrors.title ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-purple-200'} rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:border-transparent transition-all duration-200`}
              placeholder="Enter a descriptive title..."
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setValidationErrors(prev => ({ ...prev, title: "" }));
              }}
            />
            {validationErrors.title && (
              <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {validationErrors.title}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Content
            </label>
            <textarea
              rows={8}
              className={`w-full border ${validationErrors.content ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-purple-200'} rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:border-transparent transition-all duration-200 resize-none`}
              placeholder="Start writing your note..."
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setValidationErrors(prev => ({ ...prev, content: "" }));
              }}
            />
            {validationErrors.content && (
              <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {validationErrors.content}
              </p>
            )}
            <p className="mt-1.5 text-xs text-gray-500">
              {content.length} characters
            </p>
          </div>
        </div>

        <div className="px-8 py-6 bg-gray-50 rounded-b-3xl flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            disabled={createNote.isPending}
            className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
          >
            {createNote.isPending ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Create Note
              </>
            )}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
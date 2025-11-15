"use client";

import { useState, useEffect } from "react";
import { useUpdateNote } from "@/src/hooks/useUpdateNote";
import { useDeleteNote } from "@/src/hooks/useDeleteNote";


interface NoteModalProps {
  note: {
    note_id: string;
    note_title: string;
    note_content: string;
  };
  onClose: () => void;
}

export default function NoteModal({ note, onClose }: NoteModalProps) {
  const [title, setTitle] = useState(note.note_title);
  const [content, setContent] = useState(note.note_content);
  const [hasChanges, setHasChanges] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    title: "",
    content: "",
  });

  const updateNote = useUpdateNote();
  const deleteNote = useDeleteNote();

  useEffect(() => {
    setHasChanges(
      title !== note.note_title || content !== note.note_content
    );
  }, [title, content, note]);

  const handleSave = () => {
    
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

    updateNote.mutate(
      {
        note_id: note.note_id,
        note_title: title,
        note_content: content,
      },
      { onSuccess: () => onClose() }
    );
  };

  const handleDelete = () => {
    deleteNote.mutate(note.note_id, { onSuccess: onClose });
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl transform animate-slideUp overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        <div className="relative px-8 pt-8 pb-6 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
         
          <div className="flex items-start gap-4 mb-3">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2.5 rounded-xl flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            
            <div className="flex-1">
              <label className="block text-xs font-semibold text-purple-700 mb-2">
                Note Title
              </label>
              <input
                type="text"
                className={`w-full text-2xl font-bold text-gray-800 bg-white/50 border ${validationErrors.title ? 'border-red-400' : 'border-purple-200'} rounded-xl px-4 py-2 focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-transparent transition-all duration-200`}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setValidationErrors(prev => ({ ...prev, title: "" }));
                }}
                placeholder="Untitled Note"
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
          </div>

         
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-all"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

        
          {hasChanges && (
            <div className="absolute top-8 right-16 flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              Unsaved changes
            </div>
          )}
        </div>

       
        <div className="p-8">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Content
          </label>
          <textarea
            className={`w-full h-96 border ${validationErrors.content ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-purple-200'} rounded-xl p-4 text-gray-800 focus:outline-none focus:ring-4 focus:border-transparent transition-all duration-200 resize-none font-mono text-sm leading-relaxed`}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              setValidationErrors(prev => ({ ...prev, content: "" }));
            }}
            placeholder="Start writing your note content..."
          />
          {validationErrors.content && (
            <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {validationErrors.content}
            </p>
          )}
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-gray-500">
              {content.length} characters
            </p>
            {hasChanges && (
              <p className="text-xs text-orange-600 font-medium">
                Remember to save your changes
              </p>
            )}
          </div>
        </div>

      
        <div className="px-8 py-6 bg-gray-50 rounded-b-3xl flex justify-between items-center">
          
          <div>
            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-5 py-2.5 bg-white border border-red-200 text-red-600 font-semibold rounded-xl hover:bg-red-50 hover:border-red-300 transition-all duration-200 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-sm text-red-600 font-medium">Are you sure?</span>
                <button
                  onClick={handleDelete}
                  disabled={deleteNote.isPending}
                  className="px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600 transition-all disabled:opacity-60"
                >
                  {deleteNote.isPending ? "Deleting..." : "Yes, delete"}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

       
          <button
            onClick={handleSave}
            disabled={!hasChanges || updateNote.isPending}
            className={`px-6 py-2.5 font-semibold rounded-xl transition-all duration-200 flex items-center gap-2 ${
              hasChanges 
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5" 
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            } disabled:opacity-60 disabled:transform-none`}
          >
            {updateNote.isPending ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Changes
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
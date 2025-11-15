"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/src/store/authStore";
import { useFetchNotes } from "@/src/hooks/useFetchNotes";
import Navbar from "@/components/navbar/Navbar";
import NoteModal from "@/components/navbar/notes/NoteModal";
import AddNoteModal from "@/components/navbar/notes/AddNoteModal";

export default function NotesPage() {
  const router = useRouter();
  const { token, hydrated, email } = useAuthStore();

  const displayName = email ? email.split("@")[0] : "User";

  const { data: notes, isLoading } = useFetchNotes();

  const [selectedNote, setSelectedNote] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);

  useEffect(() => {
    if (hydrated && !token) router.push("/signin");
  }, [token, hydrated]);

  if (!hydrated) return null;

  const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return "";
    try {
      return new Date(dateStr).toLocaleString();
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <>
      <Navbar />

      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
        <div className="px-6 py-8 max-w-7xl mx-auto">
       
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">
                Welcome back, <span className="font-semibold text-purple-600">{displayName}</span>
              </p>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                My Notes
              </h1>
            </div>

            <button
              onClick={() => setOpenAddModal(true)}
              className="group relative px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Note
            </button>
          </div>

       
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              </div>
              <p className="mt-4 text-gray-600 font-medium">Loading your notes...</p>
            </div>
          )}

          {!isLoading && notes?.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-full p-8 mb-6">
                <svg className="w-20 h-20 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No notes yet</h3>
              <p className="text-gray-600 mb-6">Start capturing your thoughts and ideas</p>
              <button
                onClick={() => setOpenAddModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Create Your First Note
              </button>
            </div>
          )}

        
          {!isLoading && notes && notes.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note: any) => (
                <div
                  key={note.note_id}
                  onClick={() => setSelectedNote(note)}
                  className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:border-purple-200 transform hover:-translate-y-1"
                >
                
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                  
                  <div className="p-6">
                   
                    <div className="flex items-start justify-between mb-3">
                      <h2 className="text-xl font-bold text-gray-800 line-clamp-2 group-hover:text-purple-600 transition-colors">
                        {note.note_title}
                      </h2>
                      <div className="flex-shrink-0 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>

                    
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                      {note.note_content?.slice(0, 120) || "No content"}
                      {note.note_content?.length > 120 && "..."}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{formatDate(note.last_update ?? note.created_on)}</span>
                      </div>
                   
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      
      {selectedNote && (
        <NoteModal note={selectedNote} onClose={() => setSelectedNote(null)} />
      )}

   
      {openAddModal && (
        <AddNoteModal onClose={() => setOpenAddModal(false)} />
      )}
    </>
  );
}
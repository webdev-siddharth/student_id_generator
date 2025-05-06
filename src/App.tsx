import React from 'react';
import { StudentForm } from './components/StudentForm';
import { IDCard } from './components/IDCard';
import { Student } from './types';
import { INITIAL_STUDENT, TEMPLATES } from './constants';
import { GraduationCap } from 'lucide-react';

function App() {
  const [student, setStudent] = React.useState<Student | null>(null);
  const [template, setTemplate] = React.useState(TEMPLATES[0].id);
  const [savedCards, setSavedCards] = React.useState<Student[]>(() => {
    const saved = localStorage.getItem('savedCards');
    return saved ? JSON.parse(saved) : [];
  });

  const handleSubmit = (newStudent: Student) => {
    setStudent(newStudent);
    setSavedCards((prev) => {
      const updated = [newStudent, ...prev];
      localStorage.setItem('savedCards', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="w-12 h-12 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">
            Student ID Generator
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Create beautiful, professional student ID cards in seconds
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Student Information</h2>
            <StudentForm
              student={student || INITIAL_STUDENT}
              onSubmit={handleSubmit}
            />
          </div>

          {student && (
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">ID Card Preview</h2>
                <select
                  value={template}
                  onChange={(e) => setTemplate(e.target.value as any)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  {TEMPLATES.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} Template
                    </option>
                  ))}
                </select>
              </div>
              <IDCard student={student} template={template} />
            </div>
          )}
        </div>

        {savedCards.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Previously Generated Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedCards.map((savedStudent, index) => (
                <div
                  key={index}
                  className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={savedStudent.photo}
                      alt={savedStudent.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{savedStudent.name}</h3>
                      <p className="text-sm text-gray-500">
                        Class {savedStudent.class}-{savedStudent.division}
                      </p>
                      <button
                        onClick={() => {
                          setStudent(savedStudent);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
                      >
                        Load Card
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { toPng } from 'html-to-image';
import { Download, AlertTriangle } from 'lucide-react';
import { Student, Template } from '../types';

interface Props {
  student: Student;
  template: Template['id'];
}

export function IDCard({ student, template }: Props) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (cardRef.current) {
      const dataUrl = await toPng(cardRef.current);
      const link = document.createElement('a');
      link.download = `${student.name}-id-card.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  const ModernTemplate = () => (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-xl text-white">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">{student.name}</h2>
          <p className="text-indigo-200">Roll No: {student.rollNumber}</p>
        </div>
        <img
          src={student.photo}
          alt={student.name}
          className="w-24 h-24 rounded-lg object-cover border-4 border-white"
        />
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-indigo-200">Class</p>
          <p className="font-semibold">{student.class}-{student.division}</p>
        </div>
        <div>
          <p className="text-indigo-200">Rack Number</p>
          <p className="font-semibold">{student.rackNumber}</p>
        </div>
        <div>
          <p className="text-indigo-200">Bus Route</p>
          <p className="font-semibold">{student.busRoute}</p>
        </div>
      </div>

      {student.allergies.length > 0 && (
        <div className="mt-4 bg-red-500 bg-opacity-20 p-2 rounded-lg flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          <div>
            <p className="text-sm font-semibold">Allergies</p>
            <p className="text-sm">{student.allergies.join(', ')}</p>
          </div>
        </div>
      )}

      <div className="mt-4 flex justify-between items-end">
        <QRCodeSVG
          value={student.rollNumber}
          size={80}
          level="H"
          className="bg-white p-1 rounded"
        />
        <img
          src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&fit=crop"
          alt="School Logo"
          className="w-16 h-16 object-contain"
        />
      </div>
    </div>
  );

  const ClassicTemplate = () => (
    <div className="bg-white border-4 border-blue-800 p-6 rounded-lg">
      <div className="text-center border-b-2 border-blue-800 pb-4">
        <img
          src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&fit=crop"
          alt="School Logo"
          className="w-20 h-20 mx-auto object-contain"
        />
        <h1 className="text-2xl font-bold text-blue-800 mt-2">UNITY SCHOOL</h1>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex-1">
          <h2 className="text-xl font-bold">{student.name}</h2>
          <p className="text-gray-600">Roll No: {student.rollNumber}</p>
          <p className="text-gray-600">Class: {student.class}-{student.division}</p>
        </div>
        <img
          src={student.photo}
          alt={student.name}
          className="w-24 h-24 rounded-full object-cover border-2 border-blue-800"
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="font-semibold">Rack Number</p>
          <p>{student.rackNumber}</p>
        </div>
        <div>
          <p className="font-semibold">Bus Route</p>
          <p>{student.busRoute}</p>
        </div>
      </div>

      {student.allergies.length > 0 && (
        <div className="mt-4 bg-red-50 border border-red-200 p-2 rounded">
          <div className="flex items-center text-red-700">
            <AlertTriangle className="w-4 h-4 mr-1" />
            <p className="font-semibold">Allergies:</p>
          </div>
          <p className="text-sm text-red-600">{student.allergies.join(', ')}</p>
        </div>
      )}

      <div className="mt-4 flex justify-center">
        <QRCodeSVG
          value={student.rollNumber}
          size={100}
          level="H"
          className="bg-white p-2 border border-gray-200 rounded"
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div
        ref={cardRef}
        className="w-[400px] mx-auto shadow-xl"
      >
        {template === 'modern' ? <ModernTemplate /> : <ClassicTemplate />}
      </div>
      
      <button
        onClick={handleDownload}
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        <Download className="w-5 h-5 mr-2" />
        Download ID Card
      </button>
    </div>
  );
}
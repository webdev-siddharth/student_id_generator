import React from 'react';
import Select from 'react-select';
import { Upload } from 'lucide-react';
import { Student } from '../types';
import {
  CLASS_OPTIONS,
  DIVISION_OPTIONS,
  ALLERGY_OPTIONS,
  BUS_ROUTES,
} from '../constants';

interface Props {
  student: Student;
  onSubmit: (student: Student) => void;
}

export function StudentForm({ student, onSubmit }: Props) {
  const [formData, setFormData] = React.useState<Student>(student);
  const [previewUrl, setPreviewUrl] = React.useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewUrl(base64String);
        setFormData((prev) => ({ ...prev, photo: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Roll Number
          </label>
          <input
            type="text"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Class
            </label>
            <Select
              options={CLASS_OPTIONS}
              value={CLASS_OPTIONS.find((o) => o.value === formData.class)}
              onChange={(option) =>
                setFormData((prev) => ({
                  ...prev,
                  class: option?.value || '',
                }))
              }
              className="mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Division
            </label>
            <Select
              options={DIVISION_OPTIONS}
              value={DIVISION_OPTIONS.find((o) => o.value === formData.division)}
              onChange={(option) =>
                setFormData((prev) => ({
                  ...prev,
                  division: option?.value || '',
                }))
              }
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Allergies
          </label>
          <Select
            isMulti
            options={ALLERGY_OPTIONS}
            value={ALLERGY_OPTIONS.filter((o) =>
              formData.allergies.includes(o.value)
            )}
            onChange={(options) =>
              setFormData((prev) => ({
                ...prev,
                allergies: options.map((o) => o.value),
              }))
            }
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Photo Upload
          </label>
          <div className="mt-1 flex items-center space-x-4">
            <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
              <span className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <Upload className="w-5 h-5 mr-2" />
                Upload Photo
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="sr-only"
                required
              />
            </label>
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="h-20 w-20 object-cover rounded-full"
              />
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Rack Number
          </label>
          <input
            type="text"
            name="rackNumber"
            value={formData.rackNumber}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Bus Route
          </label>
          <Select
            options={BUS_ROUTES}
            value={BUS_ROUTES.find((o) => o.value === formData.busRoute)}
            onChange={(option) =>
              setFormData((prev) => ({
                ...prev,
                busRoute: option?.value || '',
              }))
            }
            className="mt-1"
          />
        </div>
      </div>

      <div className="pt-5">
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Generate ID Card
        </button>
      </div>
    </form>
  );
}
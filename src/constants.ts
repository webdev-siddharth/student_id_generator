export const CLASS_OPTIONS = [
  { value: '1', label: 'Class 1' },
  { value: '2', label: 'Class 2' },
  { value: '3', label: 'Class 3' },
  { value: '4', label: 'Class 4' },
  { value: '5', label: 'Class 5' },
];

export const DIVISION_OPTIONS = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
];

export const ALLERGY_OPTIONS = [
  { value: 'peanuts', label: 'Peanuts' },
  { value: 'dairy', label: 'Dairy' },
  { value: 'eggs', label: 'Eggs' },
  { value: 'gluten', label: 'Gluten' },
  { value: 'shellfish', label: 'Shellfish' },
];

export const BUS_ROUTES = [
  { value: 'R1', label: 'Route 1 - North' },
  { value: 'R2', label: 'Route 2 - South' },
  { value: 'R3', label: 'Route 3 - East' },
  { value: 'R4', label: 'Route 4 - West' },
];

export const TEMPLATES: Template[] = [
  { id: 'modern', name: 'Modern' },
  { id: 'classic', name: 'Classic' },
];

export const INITIAL_STUDENT: Student = {
  name: '',
  rollNumber: '',
  class: '',
  division: '',
  allergies: [],
  photo: '',
  rackNumber: '',
  busRoute: '',
};
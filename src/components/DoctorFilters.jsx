import React from 'react';

const CONSULTATION_TYPES = [
  { label: 'Video Consult', value: 'video' },
  { label: 'In Clinic', value: 'clinic' },
];

const SPECIALTIES = [
  'General Physician',
  'Dermatologist',
  'Cardiologist',
  'Pediatrician',
  'Orthopedic',
  'Neurologist',
];

const SORT_OPTIONS = [
  { label: 'Fees (Low to High)', value: 'fees_asc' },
  { label: 'Experience (High to Low)', value: 'exp_desc' },
];

export const ConsultationTypeFilter = ({ consultationType, setConsultationType }) => (
  <div className="relative p-8 rounded-[2rem] bg-gradient-to-br from-blue-400/50 to-blue-600/50 backdrop-blur-4xl border border-white/20 shadow-2xl shadow-blue-400/30 hover:shadow-blue-500/40 transition-all duration-300 text-white overflow-hidden">
    <div className="absolute inset-0 bg-white/10 rounded-[2rem] opacity-5 pointer-events-none"></div>
    <h3 className="font-extrabold mb-6 text-2xl tracking-wider drop-shadow-lg">Consultation Type</h3>
    {CONSULTATION_TYPES.map(type => (
      <label key={type.value} className="block mb-4 cursor-pointer hover:scale-105 transition-transform">
        <input
          type="radio"
          name="consultationType"
          value={type.value}
          checked={consultationType === type.value}
          onChange={() => setConsultationType(type.value)}
          className="mr-3 accent-white"
        />
        {type.label}
      </label>
    ))}
    <button
      className="mt-6 text-sm underline hover:text-gray-100 hover:scale-105 transition-transform"
      onClick={() => setConsultationType('')}
    >
      Clear
    </button>
  </div>
);

export const SpecialtiesFilter = ({ specialties, toggleSpecialty, clearSpecialties }) => (
  <div className="relative p-8 rounded-[2rem] bg-gradient-to-br from-purple-400/50 to-purple-600/50 backdrop-blur-4xl border border-white/20 shadow-2xl shadow-purple-400/30 hover:shadow-purple-500/40 transition-all duration-300 text-white overflow-hidden">
    <div className="absolute inset-0 bg-white/10 rounded-[2rem] opacity-5 pointer-events-none"></div>
    <h3 className="font-extrabold mb-6 text-2xl tracking-wider drop-shadow-lg">Specialties</h3>
    {SPECIALTIES.map(spec => (
      <label key={spec} className="block mb-4 cursor-pointer hover:scale-105 transition-transform">
        <input
          type="checkbox"
          value={spec}
          checked={specialties.includes(spec)}
          onChange={() => toggleSpecialty(spec)}
          className="mr-3 accent-white"
        />
        {spec}
      </label>
    ))}
    <button
      className="mt-6 text-sm underline hover:text-gray-100 hover:scale-105 transition-transform"
      onClick={clearSpecialties}
    >
      Clear
    </button>
  </div>
);

export const SortOptionsFilter = ({ sortOption, setSortOption, clearSortOption }) => (
  <div className="relative p-8 rounded-[2rem] bg-gradient-to-br from-green-400/50 to-green-600/50 backdrop-blur-4xl border border-white/20 shadow-2xl shadow-green-400/30 hover:shadow-green-500/40 transition-all duration-300 text-white overflow-hidden">
    <div className="absolute inset-0 bg-white/10 rounded-[2rem] opacity-5 pointer-events-none"></div>
    <h3 className="font-extrabold mb-6 text-2xl tracking-wider drop-shadow-lg">Sort By</h3>
    <select
      className="w-full rounded-lg px-4 py-3 mt-3 text-black bg-white/80 backdrop-blur-md shadow-inner focus:outline-none focus:ring-2 focus:ring-green-300 border border-green-300"
      value={sortOption}
      onChange={e => setSortOption(e.target.value)}
    >
      <option value="">Select</option>
      {SORT_OPTIONS.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    <button
      className="mt-6 text-sm underline hover:text-gray-100 hover:scale-105 transition-transform"
      onClick={clearSortOption}
    >
      Clear
    </button>
  </div>
);

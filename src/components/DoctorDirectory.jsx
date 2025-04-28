import React, { useState, useEffect } from 'react';
import { ConsultationTypeFilter, SpecialtiesFilter, SortOptionsFilter } from './DoctorFilters';

const API_URL = 'https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json';

const DoctorDirectory = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [consultationType, setConsultationType] = useState('');
  const [specialties, setSpecialties] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  // Fetch doctors data
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(err => console.error('Failed to fetch doctors:', err));
  }, []);

  // Update suggestions based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      return;
    }
    const filtered = doctors
      .filter(doc => doc.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 3);
    setSuggestions(filtered);
  }, [searchTerm, doctors]);

  // Filter and sort doctors based on filters and search
  useEffect(() => {
    let filtered = [...doctors];

    // Filter by search term
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by consultation type
    if (consultationType) {
      if (consultationType === 'video') {
        filtered = filtered.filter(doc => doc.video_consult === true);
      } else if (consultationType === 'clinic') {
        filtered = filtered.filter(doc => doc.in_clinic === true);
      }
    }

    // Filter by specialties
    if (specialties.length > 0) {
      filtered = filtered.filter(doc =>
        doc.specialities.some(spec => specialties.includes(spec.name))
      );
    }

    // Sort
    if (sortOption === 'fees_asc') {
      filtered.sort((a, b) => {
        const feeA = parseInt(a.fees.replace(/[^\d]/g, '')) || 0;
        const feeB = parseInt(b.fees.replace(/[^\d]/g, '')) || 0;
        return feeA - feeB;
      });
    } else if (sortOption === 'exp_desc') {
      filtered.sort((a, b) => {
        const expA = parseInt(a.experience) || 0;
        const expB = parseInt(b.experience) || 0;
        return expB - expA;
      });
    }

    setFilteredDoctors(filtered);
  }, [doctors, searchTerm, consultationType, specialties, sortOption]);

  // Handle search submit (Enter or suggestion click)
  const handleSearchSubmit = (term) => {
    setSearchTerm(term);
    setSuggestions([]);
  };

  // Handle specialty checkbox toggle
  const toggleSpecialty = (spec) => {
    if (specialties.includes(spec)) {
      setSpecialties(specialties.filter(s => s !== spec));
    } else {
      setSpecialties([...specialties, spec]);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          className="w-full rounded-lg px-4 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 border border-gray-300"
          placeholder="Search doctors by name..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleSearchSubmit(searchTerm);
            }
          }}
        />
        {suggestions.length > 0 && (
          <ul className="absolute bg-white border border-gray-300 w-full mt-1 rounded-lg shadow-lg z-10 max-h-40 overflow-auto">
            {suggestions.map(s => (
              <li
                key={s.id}
                className="px-4 py-2 hover:bg-blue-200 cursor-pointer rounded"
                onClick={() => handleSearchSubmit(s.name)}
              >
                {s.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/*filters*/}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <ConsultationTypeFilter consultationType={consultationType} setConsultationType={setConsultationType} />
        <SpecialtiesFilter specialties={specialties} toggleSpecialty={toggleSpecialty} clearSpecialties={() => setSpecialties([])} />
        <SortOptionsFilter sortOption={sortOption} setSortOption={setSortOption} clearSortOption={() => setSortOption('')} />
      </div>

      {/* Doctor List */}
      <div>
        {filteredDoctors.length === 0 ? (
          <p className="text-center text-gray-500">No doctors found.</p>
        ) : (
          <ul className="space-y-6">
            {filteredDoctors.map(doc => (
              <li
                key={doc.id}
                className="border border-gray-300 rounded-lg p-6 shadow-lg hover:shadow-2xl transition flex space-x-6 bg-gradient-to-r from-white to-blue-50"
              >
                <img
                  src={doc.photo}
                  alt={doc.name}
                  className="w-28 h-28 rounded-lg object-cover shadow-md"
                />
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-blue-900">{doc.name}</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    {doc.doctor_introduction || 'No introduction available.'}
                  </p>
                  <p className="text-sm mb-1">
                    <span className="font-semibold">Specialty:</span>{' '}
                    {doc.specialities.map(s => s.name).join(', ')}
                  </p>
                  <p className="text-sm mb-1">
                    <span className="font-semibold">Experience:</span> {doc.experience}
                  </p>
                  <p className="text-sm mb-1">
                    <span className="font-semibold">Consultation Fee:</span> {doc.fees}
                  </p>
                  <p className="text-sm mb-1">
                    <span className="font-semibold">Languages:</span> {doc.languages.join(', ')}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Clinic:</span> {doc.clinic?.name}, {doc.clinic?.address?.locality}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DoctorDirectory;

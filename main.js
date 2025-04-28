const apiUrl = 'https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json';

let doctors = [];
let filteredDoctors = [];
let specialtiesSet = new Set();

const searchInput = document.getElementById('searchInput');
const autocompleteList = document.getElementById('autocompleteList');
const consultationRadios = document.getElementsByName('consultationType');
const specialtiesContainer = document.getElementById('specialtiesContainer');
const sortSelect = document.getElementById('sortSelect');
const doctorList = document.getElementById('doctorList');

// Utility to get URL query parameters as an object
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    search: params.get('search') || '',
    consultationType: params.get('consultationType') || '',
    specialties: params.get('specialties') ? params.get('specialties').split(',') : [],
    sort: params.get('sort') || '',
  };
}

// Utility to update URL query parameters without reloading
function updateQueryParams(params) {
  const url = new URL(window.location);
  Object.keys(params).forEach(key => {
    if (Array.isArray(params[key])) {
      if (params[key].length > 0) {
        url.searchParams.set(key, params[key].join(','));
      } else {
        url.searchParams.delete(key);
      }
    } else {
      if (params[key]) {
        url.searchParams.set(key, params[key]);
      } else {
        url.searchParams.delete(key);
      }
    }
  });
  window.history.pushState({}, '', url);
}

// Fetch doctors data from API
async function fetchDoctors() {
  try {
    const response = await fetch(apiUrl);
    doctors = await response.json();
    extractSpecialties();
    renderSpecialties();
    applyFiltersFromURL();
  } catch (error) {
    doctorList.innerHTML = '<div class="alert alert-danger">Failed to load doctors data.</div>';
  }
}

// Extract unique specialties from doctors data
function extractSpecialties() {
  specialtiesSet.clear();
  doctors.forEach(doc => {
    if (doc.specialty) {
      specialtiesSet.add(doc.specialty);
    }
  });
}

// Render specialties checkboxes
function renderSpecialties() {
  specialtiesContainer.innerHTML = '';
  const specialties = Array.from(specialtiesSet).sort();
  specialties.forEach(spec => {
    const id = 'spec-' + spec.toLowerCase().replace(/\s+/g, '-');
    const div = document.createElement('div');
    div.className = 'form-check';
    div.innerHTML = `
      <input class="form-check-input" type="checkbox" value="${spec}" id="${id}" />
      <label class="form-check-label" for="${id}">${spec}</label>
    `;
    specialtiesContainer.appendChild(div);
  });
}

// Render doctor list
function renderDoctors(list) {
  if (list.length === 0) {
    doctorList.innerHTML = '<div class="alert alert-info">No doctors found.</div>';
    return;
  }
  doctorList.innerHTML = '';
  list.forEach(doc => {
    const item = document.createElement('div');
    item.className = 'list-group-item';
    item.innerHTML = `
      <h5>${doc.name}</h5>
      <p class="mb-1"><strong>Specialty:</strong> ${doc.specialty}</p>
      <p class="mb-1"><strong>Experience:</strong> ${doc.experience} years</p>
      <p class="mb-1"><strong>Consultation Fee:</strong> $${doc.fees}</p>
      <p class="mb-0"><strong>Consultation Type:</strong> ${doc.consultationType}</p>
    `;
    doctorList.appendChild(item);
  });
}

// Filter doctors based on current filters
function filterDoctors() {
  const searchVal = searchInput.value.trim().toLowerCase();
  const consultationType = Array.from(consultationRadios).find(r => r.checked)?.value || '';
  const selectedSpecialties = Array.from(specialtiesContainer.querySelectorAll('input[type=checkbox]:checked')).map(cb => cb.value);
  const sortOption = sortSelect.value;

  filteredDoctors = doctors.filter(doc => {
    // Search filter
    if (searchVal && !doc.name.toLowerCase().includes(searchVal)) {
      return false;
    }
    // Consultation type filter
    if (consultationType && doc.consultationType !== consultationType) {
      return false;
    }
    // Specialties filter
    if (selectedSpecialties.length > 0 && !selectedSpecialties.includes(doc.specialty)) {
      return false;
    }
    return true;
  });

  // Sorting
  if (sortOption === 'feesAsc') {
    filteredDoctors.sort((a, b) => a.fees - b.fees);
  } else if (sortOption === 'experienceDesc') {
    filteredDoctors.sort((a, b) => b.experience - a.experience);
  }

  renderDoctors(filteredDoctors);
  updateQueryParams({
    search: searchVal || null,
    consultationType: consultationType || null,
    specialties: selectedSpecialties.length > 0 ? selectedSpecialties : null,
    sort: sortOption || null,
  });
}

// Autocomplete suggestions for search input
function showAutocomplete() {
  const val = searchInput.value.trim().toLowerCase();
  if (!val) {
    autocompleteList.style.display = 'none';
    return;
  }
  const suggestions = doctors
    .filter(doc => doc.name.toLowerCase().includes(val))
    .slice(0, 3)
    .map(doc => doc.name);

  if (suggestions.length === 0) {
    autocompleteList.style.display = 'none';
    return;
  }

  autocompleteList.innerHTML = '';
  suggestions.forEach(name => {
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-action';
    li.textContent = name;
    li.addEventListener('click', () => {
      searchInput.value = name;
      autocompleteList.style.display = 'none';
      filterDoctors();
    });
    autocompleteList.appendChild(li);
  });
  autocompleteList.style.display = 'block';
}

// Apply filters from URL query parameters on page load or history navigation
function applyFiltersFromURL() {
  const params = getQueryParams();

  // Set search input
  searchInput.value = params.search;

  // Set consultation type radio
  Array.from(consultationRadios).forEach(radio => {
    radio.checked = radio.value === params.consultationType;
  });
  // If none matched, select "All" (empty value)
  if (![...consultationRadios].some(r => r.checked)) {
    const allRadio = document.getElementById('consultAll');
    if (allRadio) allRadio.checked = true;
  }

  // Set specialties checkboxes
  const checkboxes = specialtiesContainer.querySelectorAll('input[type=checkbox]');
  checkboxes.forEach(cb => {
    cb.checked = params.specialties.includes(cb.value);
  });

  // Set sort select
  sortSelect.value = params.sort;

  filterDoctors();
}

// Event listeners
searchInput.addEventListener('input', () => {
  showAutocomplete();
});

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    autocompleteList.style.display = 'none';
    filterDoctors();
  }
});

document.addEventListener('click', (e) => {
  if (!autocompleteList.contains(e.target) && e.target !== searchInput) {
    autocompleteList.style.display = 'none';
  }
});

consultationRadios.forEach(radio => {
  radio.addEventListener('change', filterDoctors);
});

specialtiesContainer.addEventListener('change', filterDoctors);

sortSelect.addEventListener('change', filterDoctors);

// Handle browser back/forward navigation to apply filters from URL
window.addEventListener('popstate', () => {
  applyFiltersFromURL();
});

// Initialize
fetchDoctors();

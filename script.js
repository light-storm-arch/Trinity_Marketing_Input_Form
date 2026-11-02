// ===== Configuration =====
// Web3Forms access key — submissions are delivered to the marketing email
// registered with this key. The key is safe to expose in page source; it can
// only send to that registered address.
const WEB3FORMS_ACCESS_KEY = '7558e56e-71f7-47e8-af0f-3e7da062edd1';

// Web3Forms endpoint
const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

// ===== Property Subtype Options =====
const subtypeOptions = {
  Office: ['Office Building', 'Medical', 'Other'],
  Industrial: ['Manufacturing', 'Warehouse/Distribution', 'Flex Space', 'Data Center', 'Other'],
  Retail: ['Street Retail', 'Strip Center', 'Free Standing Building', 'Retail Pad', 'Restaurant', 'Other'],
  Multifamily: ['High-rise', 'Mid-rise', 'Low-rise/Garden', 'Mobile Home Park', 'Senior Living', 'Other'],
};

// ===== DOM References =====
const form = document.getElementById('marketingForm');
const forSaleCheck = document.getElementById('forSaleCheck');
const forLeaseCheck = document.getElementById('forLeaseCheck');
const saleSection = document.getElementById('saleSection');
const leaseSection = document.getElementById('leaseSection');
const propertyType = document.getElementById('propertyType');
const propertySubtypeGroup = document.getElementById('propertySubtypeGroup');
const propertySubtype = document.getElementById('propertySubtype');
const otherSubtypeGroup = document.getElementById('otherSubtypeGroup');
const landUseGroup = document.getElementById('landUseGroup');
const buildingInfoSection = document.getElementById('buildingInfoSection');
const tmsRequiredIndicator = document.getElementById('tmsRequiredIndicator');
const addBrokerBtn = document.getElementById('addBrokerBtn');
const brokerContainer = document.getElementById('brokerContainer');
const addSuiteBtn = document.getElementById('addSuiteBtn');
const suiteContainer = document.getElementById('suiteContainer');
const layoutStyle = document.getElementById('layoutStyle');
const otherLayoutGroup = document.getElementById('otherLayoutGroup');
const leaseType = document.getElementById('leaseType');
const otherLeaseTypeGroup = document.getElementById('otherLeaseTypeGroup');
const salePriceContactBroker = document.getElementById('salePriceContactBroker');
const salePriceInput = document.getElementById('salePrice');
const leaseRateContactBroker = document.getElementById('leaseRateContactBroker');
const leaseRateInput = document.getElementById('leaseRate');

// ===== Listing Type Toggle =====
forSaleCheck.addEventListener('change', () => {
  saleSection.style.display = forSaleCheck.checked ? '' : 'none';
});

forLeaseCheck.addEventListener('change', () => {
  leaseSection.style.display = forLeaseCheck.checked ? '' : 'none';
});

// ===== Property Type Change =====
propertyType.addEventListener('change', () => {
  const type = propertyType.value;
  const isLand = type === 'Land';

  // Building info section
  if (isLand) {
    buildingInfoSection.style.display = 'none';
  } else {
    buildingInfoSection.style.display = '';
  }

  // TMS required indicator
  tmsRequiredIndicator.style.display = isLand ? '' : 'none';

  // Subtype dropdown
  if (type && type !== 'Land') {
    propertySubtypeGroup.style.display = '';
    propertySubtype.innerHTML = '<option value="">Select Subtype</option>';
    subtypeOptions[type].forEach(opt => {
      const option = document.createElement('option');
      option.value = opt;
      option.textContent = opt;
      propertySubtype.appendChild(option);
    });
    otherSubtypeGroup.style.display = 'none';
  } else {
    propertySubtypeGroup.style.display = 'none';
    otherSubtypeGroup.style.display = 'none';
  }

  // Land use field
  landUseGroup.style.display = isLand ? '' : 'none';

  // Asset-class-specific fields
  document.querySelectorAll('.asset-class-fields').forEach(el => el.style.display = 'none');
  if (type === 'Office') document.getElementById('officeFields').style.display = '';
  if (type === 'Industrial') document.getElementById('industrialFields').style.display = '';
  if (type === 'Retail') document.getElementById('retailFields').style.display = '';
});

// ===== Subtype "Other" Toggle =====
propertySubtype.addEventListener('change', () => {
  otherSubtypeGroup.style.display = propertySubtype.value === 'Other' ? '' : 'none';
});

// ===== Layout Style "Other" Toggle =====
layoutStyle.addEventListener('change', () => {
  otherLayoutGroup.style.display = layoutStyle.value === 'Other' ? '' : 'none';
});

// ===== Lease Type "Other" Toggle =====
leaseType.addEventListener('change', () => {
  otherLeaseTypeGroup.style.display = leaseType.value === 'Other' ? '' : 'none';
});

// ===== Contact Broker Toggles =====
salePriceContactBroker.addEventListener('change', () => {
  if (salePriceContactBroker.checked) {
    salePriceInput.value = 'Contact Broker for Pricing';
    salePriceInput.readOnly = true;
  } else {
    salePriceInput.value = '';
    salePriceInput.readOnly = false;
  }
});

leaseRateContactBroker.addEventListener('change', () => {
  if (leaseRateContactBroker.checked) {
    leaseRateInput.value = 'Contact Broker for Pricing';
    leaseRateInput.readOnly = true;
  } else {
    leaseRateInput.value = '';
    leaseRateInput.readOnly = false;
  }
});

// ===== Add/Remove Brokers =====
let brokerCount = 1;
addBrokerBtn.addEventListener('click', () => {
  brokerCount++;
  const row = document.createElement('div');
  row.className = 'broker-row';
  row.innerHTML = `
    <input type="text" class="form-input broker-input" name="broker_${brokerCount}" placeholder="Broker Name">
    <input type="email" class="form-input broker-email" name="brokerEmail_${brokerCount}" placeholder="Broker Email" required>
    <span class="broker-badge additional-badge">Additional</span>
    <button type="button" class="btn-remove-broker" title="Remove broker">&times;</button>
  `;
  row.querySelector('.btn-remove-broker').addEventListener('click', () => row.remove());
  brokerContainer.appendChild(row);
});

// ===== Add/Remove Suites =====
let suiteCount = 1;
addSuiteBtn.addEventListener('click', () => {
  suiteCount++;
  const card = document.createElement('div');
  card.className = 'suite-card';
  const idx = suiteCount - 1;
  card.innerHTML = `
    <div class="suite-header">
      <h4>Suite ${suiteCount}</h4>
      <button type="button" class="btn-remove-suite">Remove</button>
    </div>
    <div class="form-row">
      <div class="form-group flex-1">
        <label class="form-label">Suite Name <span class="required-indicator">*</span></label>
        <input type="text" class="form-input" name="suiteName_${idx}" placeholder="e.g. Suite ${suiteCount}00">
      </div>
      <div class="form-group flex-1">
        <label class="form-label">Size (SF) <span class="required-indicator">*</span></label>
        <input type="text" class="form-input" name="suiteSize_${idx}" placeholder="e.g. 2,500">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group flex-1">
        <label class="form-label">Floor</label>
        <input type="text" class="form-input" name="suiteFloor_${idx}">
      </div>
      <div class="form-group flex-1">
        <label class="form-label">Rate <span class="required-indicator">*</span></label>
        <input type="text" class="form-input" name="suiteRate_${idx}" placeholder="e.g. $18.00/SF">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group flex-1">
        <label class="form-label">Lease Type <span class="required-indicator">*</span></label>
        <select class="form-input form-select" name="suiteLeaseType_${idx}">
          <option value="">Select Lease Type</option>
          <option value="NNN">NNN</option>
          <option value="Modified Gross">Modified Gross</option>
          <option value="Gross">Gross</option>
          <option value="Modified Net">Modified Net</option>
          <option value="Full Service">Full Service</option>
          <option value="Ground Lease">Ground Lease</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div class="form-group flex-1">
        <label class="form-label">Minimum Divisible</label>
        <input type="text" class="form-input" name="suiteMinDivisible_${idx}" placeholder="SF">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group flex-1">
        <label class="form-label">Maximum Contiguous</label>
        <input type="text" class="form-input" name="suiteMaxContiguous_${idx}" placeholder="SF">
      </div>
      <div class="form-group flex-1"></div>
    </div>
  `;
  card.querySelector('.btn-remove-suite').addEventListener('click', () => {
    card.remove();
    renumberSuites();
  });
  suiteContainer.appendChild(card);
});

function renumberSuites() {
  const cards = suiteContainer.querySelectorAll('.suite-card');
  cards.forEach((card, i) => {
    card.querySelector('h4').textContent = `Suite ${i + 1}`;
  });
}

// ===== Form Validation =====
function validateForm() {
  let valid = true;
  const errors = [];

  // Clear previous error states
  document.querySelectorAll('.form-input.error').forEach(el => el.classList.remove('error'));
  document.querySelectorAll('.validation-msg.show').forEach(el => el.classList.remove('show'));

  // Listing type
  if (!forSaleCheck.checked && !forLeaseCheck.checked) {
    document.getElementById('listingTypeError').classList.add('show');
    valid = false;
    errors.push('Select at least one listing type');
  }

  // Required basic fields
  const requiredFields = [
    { id: 'streetAddress', label: 'Street Address' },
    { id: 'zipCode', label: 'Zip Code' },
    { id: 'city', label: 'City' },
    { id: 'state', label: 'State' },
    { id: 'county', label: 'County' },
    { id: 'locationDescription', label: 'Location Description' },
    { id: 'propertyHighlights', label: 'Property Highlights' },
    { id: 'zoning', label: 'Zoning' },
    { id: 'zoningJurisdiction', label: 'Zoning Jurisdiction' },
    { id: 'lotSize', label: 'Lot Size' },
  ];

  // Primary broker
  const primaryBroker = document.querySelector('[name="brokerPrimary"]');
  if (!primaryBroker.value.trim()) {
    primaryBroker.classList.add('error');
    valid = false;
    errors.push('Primary Broker is required');
  }

  // Broker emails
  const brokerEmails = brokerContainer.querySelectorAll('.broker-email');
  brokerEmails.forEach((input) => {
    if (!input.value.trim() || !input.validity.valid) {
      input.classList.add('error');
      valid = false;
      errors.push('A valid email is required for each broker');
    }
  });

  requiredFields.forEach(({ id, label }) => {
    const el = document.getElementById(id);
    if (!el.value.trim()) {
      el.classList.add('error');
      valid = false;
      errors.push(`${label} is required`);
    }
  });

  // Property type
  if (!propertyType.value) {
    propertyType.classList.add('error');
    valid = false;
    errors.push('Property Type is required');
  }

  const type = propertyType.value;

  // TMS required for land
  if (type === 'Land') {
    const tms = document.getElementById('tmsNumber');
    if (!tms.value.trim()) {
      tms.classList.add('error');
      valid = false;
      errors.push('TMS# is required for Land');
    }
  }

  // Building size required if not land
  if (type && type !== 'Land') {
    const bs = document.getElementById('buildingSize');
    if (!bs.value.trim()) {
      bs.classList.add('error');
      valid = false;
      errors.push('Building Size is required');
    }
  }

  // Subtype required if applicable
  if (type && type !== 'Land') {
    if (!propertySubtype.value) {
      propertySubtype.classList.add('error');
      valid = false;
      errors.push('Property Subtype is required');
    }
    if (propertySubtype.value === 'Other') {
      const otherInput = document.getElementById('otherSubtype');
      if (!otherInput.value.trim()) {
        otherInput.classList.add('error');
        valid = false;
        errors.push('Please specify the property subtype');
      }
    }
  }

  // Land use required
  if (type === 'Land') {
    const landUse = document.getElementById('landUse');
    if (!landUse.value.trim()) {
      landUse.classList.add('error');
      valid = false;
      errors.push('Land Use is required');
    }
  }

  // Sale section validation
  if (forSaleCheck.checked) {
    const saleDesc = document.getElementById('saleDescription');
    const salePrice = document.getElementById('salePrice');
    if (!saleDesc.value.trim()) {
      saleDesc.classList.add('error');
      valid = false;
      errors.push('Sale Description is required');
    }
    if (!salePrice.value.trim()) {
      salePrice.classList.add('error');
      valid = false;
      errors.push('Sale Price is required');
    }
  }

  // Lease section validation
  if (forLeaseCheck.checked) {
    const leaseDesc = document.getElementById('leaseDescription');
    const leaseRateEl = document.getElementById('leaseRate');
    const leaseTypeEl = document.getElementById('leaseType');
    const spacesAvail = document.getElementById('numSpacesAvailable');

    if (!leaseDesc.value.trim()) {
      leaseDesc.classList.add('error');
      valid = false;
      errors.push('Lease Description is required');
    }
    if (!leaseRateEl.value.trim()) {
      leaseRateEl.classList.add('error');
      valid = false;
      errors.push('Lease Rate is required');
    }
    if (!leaseTypeEl.value) {
      leaseTypeEl.classList.add('error');
      valid = false;
      errors.push('Lease Type is required');
    }
    if (leaseTypeEl.value === 'Other') {
      const otherLT = document.getElementById('otherLeaseType');
      if (!otherLT.value.trim()) {
        otherLT.classList.add('error');
        valid = false;
        errors.push('Please specify the lease type');
      }
    }
    if (!spacesAvail.value.trim()) {
      spacesAvail.classList.add('error');
      valid = false;
      errors.push('# of Spaces Available is required');
    }

    // Suite validation
    const suiteCards = suiteContainer.querySelectorAll('.suite-card');
    suiteCards.forEach((card, i) => {
      const name = card.querySelector(`[name^="suiteName"]`);
      const size = card.querySelector(`[name^="suiteSize"]`);
      const rate = card.querySelector(`[name^="suiteRate"]`);
      const lt = card.querySelector(`[name^="suiteLeaseType"]`);
      if (name && !name.value.trim()) { name.classList.add('error'); valid = false; }
      if (size && !size.value.trim()) { size.classList.add('error'); valid = false; }
      if (rate && !rate.value.trim()) { rate.classList.add('error'); valid = false; }
      if (lt && !lt.value) { lt.classList.add('error'); valid = false; }
    });
  }

  // Priority
  const priorityEl = document.getElementById('priority');
  if (!priorityEl.value) {
    priorityEl.classList.add('error');
    valid = false;
    errors.push('Priority is required');
  }

  // Scroll to first error
  if (!valid) {
    const firstError = document.querySelector('.form-input.error, .validation-msg.show');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  return valid;
}

// ===== Build Email Fields =====
// Each entry becomes its own labeled row in the Web3Forms email, in order.
// Section entries act as dividers; blank optional fields are left out.
function buildEmailFields() {
  const fields = {};
  const val = (id) => document.getElementById(id)?.value?.trim() || '';
  const radio = (name) => {
    const checked = document.querySelector(`input[name="${name}"]:checked`);
    return checked ? checked.value : '';
  };
  const section = (title) => { fields[`■ ${title}`] = '────────────────────'; };
  const add = (label, value) => { if (value) fields[label] = value; };
  const withUnit = (value, unit) => (value ? `${value} ${unit}` : '');

  // Listing Type
  const types = [];
  if (forSaleCheck.checked) types.push('For Sale');
  if (forLeaseCheck.checked) types.push('For Lease');
  section('LISTING TYPE');
  add('Listing Type', types.join(' | '));

  // Basic Info
  section('BASIC INFORMATION');
  const brokerRows = brokerContainer.querySelectorAll('.broker-row');
  brokerRows.forEach((row, i) => {
    const name = row.querySelector('.broker-input')?.value.trim() || '';
    const email = row.querySelector('.broker-email')?.value.trim() || '';
    if (name) {
      add(i === 0 ? 'Primary Broker' : `Broker ${i + 1}`, email ? `${name} — ${email}` : name);
    }
  });
  add('Street Address', val('streetAddress'));
  add('City / State / Zip', `${val('city')}, ${val('state')} ${val('zipCode')}`);
  add('County', val('county'));
  add('Submarket', val('submarket'));
  add('Location Description', val('locationDescription'));
  add('Property Highlights', val('propertyHighlights'));

  // Property Info
  section('PROPERTY INFORMATION');
  const type = val('propertyType');
  add('Property Type', type);
  if (type === 'Land') {
    add('Land Use', val('landUse'));
  } else if (val('propertySubtype')) {
    add('Subtype', val('propertySubtype') === 'Other' ? val('otherSubtype') : val('propertySubtype'));
  }
  add('Property Name', val('propertyName'));
  add('Zoning', val('zoning'));
  add('Zoning Jurisdiction', val('zoningJurisdiction'));
  add('Lot Size', withUnit(val('lotSize'), 'AC'));
  add('TMS#', val('tmsNumber'));

  // Building Info (if not land)
  if (type !== 'Land') {
    section('BUILDING INFORMATION');
    add('Building Size', withUnit(val('buildingSize'), 'SF'));
    add('Building Class', val('buildingClass'));
    add('Occupancy Rate', val('occupancyRate'));
    add('Tenancy', val('tenancy'));
    add('Number of Floors', val('numberOfFloors'));
    add('Year Built', val('yearBuilt'));
    add('Year Last Renovated', val('yearRenovated'));
    add('Frontage', withUnit(val('frontage'), 'ft'));
    add('Frontage Street', val('frontageStreet'));
    add('Vehicles per Day', val('vehiclesPerDay'));

    // Asset-class specific
    if (type === 'Office') {
      section('OFFICE DETAILS');
      add('# of Offices', val('numOffices'));
      add('# of Bathrooms', val('numBathrooms'));
      add('# of Breakrooms', val('numBreakrooms'));
      add('Shared Entry', radio('sharedEntry'));
      add('Shared Amenities', radio('sharedAmenities'));
      add('# of Work Stations', val('numWorkstations'));
      add('Parking Ratio', val('parkingRatio'));
      add('Layout Style', val('layoutStyle') === 'Other' ? val('otherLayout') : val('layoutStyle'));
    }

    if (type === 'Industrial') {
      section('INDUSTRIAL DETAILS');
      add('Office Space', withUnit(val('officeSpace'), 'SF'));
      add('Utilities', val('utilities'));
      add('# of Dock Doors', val('numDockDoors'));
      add('Dock Door Description', val('dockDoorDescription'));
      add('# of Drive-In Doors', val('numDriveInDoors'));
      add('Min. Clear Height', val('minClearHeight'));
      add('Max. Clear Height', val('maxClearHeight'));
      add('Floor Thickness', val('floorThickness'));
    }

    if (type === 'Retail') {
      section('RETAIL DETAILS');
      add('Current Use', val('currentUse'));
      add('Potential Uses', val('potentialUses'));
      add('# of Parking Spaces', val('numParkingSpaces'));
      add('Space Condition', val('spaceCondition'));
    }
  }

  // Sale Info
  if (forSaleCheck.checked) {
    section('SALE INFORMATION');
    add('Sale Description', val('saleDescription'));
    add('Price', val('salePrice'));
    add('NOI', val('noi'));
    add('Cap Rate', val('capRate'));
  }

  // Lease Info
  if (forLeaseCheck.checked) {
    section('LEASE INFORMATION');
    if (document.getElementById('subleaseCheck').checked) add('Sublease', 'Yes');
    add('Lease Description', val('leaseDescription'));
    add('Lease Rate', val('leaseRate'));
    add('Rate Basis', radio('rateBasis'));
    add('Lease Type', val('leaseType') === 'Other' ? val('otherLeaseType') : val('leaseType'));
    add('# of Spaces Available', val('numSpacesAvailable'));

    // Suites — one row per suite
    const suiteCards = suiteContainer.querySelectorAll('.suite-card');
    suiteCards.forEach((card, i) => {
      const get = (prefix) => card.querySelector(`[name^="${prefix}"]`)?.value.trim() || '';
      const parts = [
        get('suiteName'),
        withUnit(get('suiteSize'), 'SF'),
        get('suiteFloor') && `Floor ${get('suiteFloor')}`,
        get('suiteRate'),
        get('suiteLeaseType'),
        get('suiteMinDivisible') && `Min. Divisible ${get('suiteMinDivisible')} SF`,
        get('suiteMaxContiguous') && `Max. Contiguous ${get('suiteMaxContiguous')} SF`,
      ].filter(Boolean);
      add(`Suite ${i + 1}`, parts.join(' · '));
    });
  }

  // E-Blast & Priority
  section('E-BLAST & PRIORITY');
  add('E-Blast', radio('eblast'));
  add('Priority', val('priority'));

  return fields;
}

// ===== Build Email Subject =====
function buildEmailSubject() {
  const types = [];
  if (forSaleCheck.checked) types.push('Sale');
  if (forLeaseCheck.checked) types.push('Lease');
  const address = document.getElementById('streetAddress').value.trim();
  const propType = propertyType.value || 'Property';
  return `Marketing Request: ${address} - ${propType} For ${types.join(' & ')}`;
}

// ===== Form Submit =====
form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  const submitBtn = document.getElementById('submitBtn');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  // Primary broker email becomes the Reply-To so marketing can reply directly.
  // (CC is a paid Web3Forms feature; all broker emails are listed in the body.)
  const primaryBrokerEmail = brokerContainer.querySelector('.broker-email')?.value.trim() || '';

  // Build Web3Forms payload
  const payload = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: buildEmailSubject(),
    from_name: 'Trinity Marketing Input Form',
    replyto: primaryBrokerEmail,
    ...buildEmailFields(),
  };

  // Send via Web3Forms
  fetch(WEB3FORMS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json().then((data) => {
      // Web3Forms reports failures via `success: false`, so check it
      // rather than trusting the HTTP status alone.
      if (!response.ok || !data.success) {
        throw new Error(data.message || `HTTP ${response.status}`);
      }
      return data;
    }))
    .then(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit to Marketing';
      const modal = document.getElementById('successModal');
      modal.querySelector('.modal-icon').textContent = '\u2713';
      modal.querySelector('.modal-icon').style.background = '#059669';
      modal.querySelector('h3').textContent = 'Form Submitted Successfully';
      modal.querySelector('p').textContent =
        'Your marketing request has been sent to the marketing team.';
      modal.style.display = 'flex';
      form.reset();
      // Hide conditional sections after reset
      saleSection.style.display = 'none';
      leaseSection.style.display = 'none';
      document.querySelectorAll('.asset-class-fields').forEach(el => el.style.display = 'none');
      propertySubtypeGroup.style.display = 'none';
      otherSubtypeGroup.style.display = 'none';
      landUseGroup.style.display = 'none';
    })
    .catch((error) => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit to Marketing';
      const modal = document.getElementById('successModal');
      modal.querySelector('.modal-icon').textContent = '!';
      modal.querySelector('.modal-icon').style.background = '#dc2626';
      modal.querySelector('h3').textContent = 'Submission Failed';
      modal.querySelector('p').textContent =
        'There was an error sending your request. Please try again or contact the marketing team directly.';
      modal.style.display = 'flex';
      console.error('Web3Forms error:', error);
    });
});

// ===== Clear Error on Input =====
document.addEventListener('input', (e) => {
  if (e.target.classList.contains('error')) {
    e.target.classList.remove('error');
  }
});

document.addEventListener('change', (e) => {
  if (e.target.classList.contains('error')) {
    e.target.classList.remove('error');
  }
});

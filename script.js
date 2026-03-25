// ===== Configuration =====
// Marketing recipient email — FormSubmit delivers to this address.
// After your first submission, FormSubmit will send a confirmation email.
// Once confirmed, you can replace the email below with the alias hash
// they provide to keep the address hidden from the page source.
const MARKETING_EMAIL = 'e298bb80442144a8f3a2542b6844c51e;

// FormSubmit endpoint
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${MARKETING_EMAIL}`;

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

// ===== Build Email Body (HTML) =====
function buildEmailBody() {
  const val = (id) => document.getElementById(id)?.value?.trim() || '';
  const radio = (name) => {
    const checked = document.querySelector(`input[name="${name}"]:checked`);
    return checked ? checked.value : '';
  };
  const esc = (s) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  // Style constants
  const fontFamily = "font-family: Arial, Helvetica, sans-serif;";
  const sectionHeader = `style="${fontFamily} font-size:16px; font-weight:700; color:#1e3a5f; margin:0; padding:10px 0 6px 0; border-bottom:2px solid #2563eb; text-transform:uppercase; letter-spacing:0.5px;"`;
  const fieldLabel = `style="${fontFamily} color:#64748b; font-size:13px; margin:0; padding:2px 0 0 0;"`;
  const fieldValue = `style="${fontFamily} color:#1e293b; font-size:14px; margin:0 0 8px 0;"`;
  const subHeader = `style="${fontFamily} font-size:14px; font-weight:600; color:#334155; margin:12px 0 4px 0;"`;

  let html = `<div style="${fontFamily} max-width:640px; margin:0 auto; background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; overflow:hidden;">`;

  // Header banner
  const types = [];
  if (forSaleCheck.checked) types.push('For Sale');
  if (forLeaseCheck.checked) types.push('For Lease');
  html += `<div style="background:linear-gradient(135deg,#1e3a5f,#2563eb); padding:24px 28px;">
    <h1 style="${fontFamily} color:#ffffff; font-size:20px; margin:0;">Marketing Request</h1>
    <p style="${fontFamily} color:#93c5fd; font-size:14px; margin:6px 0 0 0;">${esc(types.join(' & '))}</p>
  </div>`;

  // Body padding
  html += `<div style="padding:24px 28px;">`;

  // --- Section helper ---
  function section(title) {
    html += `<h2 ${sectionHeader}>${esc(title)}</h2>`;
  }
  function field(label, value) {
    if (!value) return;
    html += `<p ${fieldLabel}>${esc(label)}</p><p ${fieldValue}>${esc(value)}</p>`;
  }

  // BASIC INFORMATION
  section('Basic Information');
  const brokerRows = brokerContainer.querySelectorAll('.broker-row');
  brokerRows.forEach((row, i) => {
    const nameInput = row.querySelector('.broker-input');
    const emailInput = row.querySelector('.broker-email');
    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    if (name) {
      field(`Broker ${i + 1}${i === 0 ? ' (Primary)' : ''}`, `${name} — ${email}`);
    }
  });
  field('Address', val('streetAddress'));
  field('City / State / Zip', `${val('city')}, ${val('state')} ${val('zipCode')}`);
  field('County', val('county'));
  field('Submarket', val('submarket'));
  field('Location Description', val('locationDescription'));
  field('Property Highlights', val('propertyHighlights'));

  // PROPERTY INFORMATION
  section('Property Information');
  const type = val('propertyType');
  field('Property Type', type);
  if (type === 'Land') {
    field('Land Use', val('landUse'));
  } else if (val('propertySubtype')) {
    const sub = val('propertySubtype') === 'Other' ? val('otherSubtype') : val('propertySubtype');
    field('Subtype', sub);
  }
  field('Property Name', val('propertyName'));
  field('Zoning', val('zoning'));
  field('Zoning Jurisdiction', val('zoningJurisdiction'));
  field('Lot Size', val('lotSize') ? `${val('lotSize')} AC` : '');
  field('TMS#', val('tmsNumber'));

  // BUILDING INFORMATION
  if (type !== 'Land') {
    section('Building Information');
    field('Building Size', val('buildingSize') ? `${val('buildingSize')} SF` : '');
    field('Building Class', val('buildingClass'));
    field('Occupancy Rate', val('occupancyRate'));
    field('Tenancy', val('tenancy'));
    field('Number of Floors', val('numberOfFloors'));
    field('Year Built', val('yearBuilt'));
    field('Year Last Renovated', val('yearRenovated'));
    field('Frontage', val('frontage') ? `${val('frontage')} ft` : '');
    field('Frontage Street', val('frontageStreet'));
    field('Vehicles per Day', val('vehiclesPerDay'));

    // Asset-class specific
    if (type === 'Office') {
      html += `<p ${subHeader}>Office Details</p>`;
      field('# of Offices', val('numOffices'));
      field('# of Bathrooms', val('numBathrooms'));
      field('# of Breakrooms', val('numBreakrooms'));
      field('Shared Entry', radio('sharedEntry'));
      field('Shared Amenities', radio('sharedAmenities'));
      field('# of Work Stations', val('numWorkstations'));
      field('Parking Ratio', val('parkingRatio'));
      const layout = val('layoutStyle') === 'Other' ? val('otherLayout') : val('layoutStyle');
      field('Layout Style', layout);
    }

    if (type === 'Industrial') {
      html += `<p ${subHeader}>Industrial Details</p>`;
      field('Office Space', val('officeSpace') ? `${val('officeSpace')} SF` : '');
      field('Utilities', val('utilities'));
      field('# of Dock Doors', val('numDockDoors'));
      field('Dock Door Description', val('dockDoorDescription'));
      field('# of Drive-In Doors', val('numDriveInDoors'));
      field('Min. Clear Height', val('minClearHeight'));
      field('Max. Clear Height', val('maxClearHeight'));
      field('Floor Thickness', val('floorThickness'));
    }

    if (type === 'Retail') {
      html += `<p ${subHeader}>Retail Details</p>`;
      field('Current Use', val('currentUse'));
      field('Potential Uses', val('potentialUses'));
      field('# of Parking Spaces', val('numParkingSpaces'));
      field('Space Condition', val('spaceCondition'));
    }
  }

  // SALE INFORMATION
  if (forSaleCheck.checked) {
    section('Sale Information');
    field('Sale Description', val('saleDescription'));
    field('Price', val('salePrice'));
    field('NOI', val('noi'));
    field('Cap Rate', val('capRate'));
  }

  // LEASE INFORMATION
  if (forLeaseCheck.checked) {
    section('Lease Information');
    if (document.getElementById('subleaseCheck').checked) {
      html += `<p style="${fontFamily} color:#dc2626; font-weight:700; font-size:14px; margin:8px 0;">⚑ SUBLEASE</p>`;
    }
    field('Lease Description', val('leaseDescription'));
    field('Lease Rate', val('leaseRate'));
    field('Rate Basis', radio('rateBasis'));
    const lt = val('leaseType') === 'Other' ? val('otherLeaseType') : val('leaseType');
    field('Lease Type', lt);
    field('# of Spaces Available', val('numSpacesAvailable'));

    // Suites
    const suiteCards = suiteContainer.querySelectorAll('.suite-card');
    if (suiteCards.length > 0) {
      html += `<p ${subHeader}>Available Suites</p>`;
      suiteCards.forEach((card, i) => {
        const getName = (prefix) => {
          const input = card.querySelector(`[name^="${prefix}"]`);
          return input ? input.value.trim() : '';
        };
        html += `<div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:12px 16px; margin:8px 0;">`;
        html += `<p style="${fontFamily} font-weight:600; color:#1e3a5f; font-size:14px; margin:0 0 6px 0;">Suite ${i + 1}</p>`;
        field('Name', getName('suiteName'));
        field('Size', getName('suiteSize') ? `${getName('suiteSize')} SF` : '');
        field('Floor', getName('suiteFloor'));
        field('Rate', getName('suiteRate'));
        field('Lease Type', getName('suiteLeaseType'));
        field('Min. Divisible', getName('suiteMinDivisible') ? `${getName('suiteMinDivisible')} SF` : '');
        field('Max. Contiguous', getName('suiteMaxContiguous') ? `${getName('suiteMaxContiguous')} SF` : '');
        html += `</div>`;
      });
    }
  }

  // E-BLAST
  const eblast = radio('eblast');
  if (eblast) {
    section('E-Blast');
    html += `<p ${fieldValue}>${esc(eblast)}</p>`;
  }

  // PRIORITY
  section('Priority');
  const priority = val('priority');
  const priorityColor = priority === 'Rush' ? '#dc2626' : priority === 'High' ? '#ea580c' : '#16a34a';
  html += `<p style="${fontFamily} display:inline-block; background:${priorityColor}; color:#fff; padding:4px 14px; border-radius:12px; font-size:13px; font-weight:600; margin:8px 0;">${esc(priority)}</p>`;

  // Close body + wrapper
  html += `</div></div>`;
  return html;
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

  // Collect broker emails for CC
  const brokerEmailInputs = brokerContainer.querySelectorAll('.broker-email');
  const ccEmails = [];
  brokerEmailInputs.forEach((input) => {
    if (input.value.trim()) ccEmails.push(input.value.trim());
  });

  // Build FormSubmit payload (HTML email)
  const payload = {
    _subject: buildEmailSubject(),
    _cc: ccEmails.join(','),
    _template: 'table',
    _captcha: 'false',
    message: buildEmailBody(),
  };

  // Send via FormSubmit AJAX
  fetch(FORMSUBMIT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit to Marketing';
      const modal = document.getElementById('successModal');
      modal.querySelector('.modal-icon').textContent = '\u2713';
      modal.querySelector('.modal-icon').style.background = '#059669';
      modal.querySelector('h3').textContent = 'Form Submitted Successfully';
      modal.querySelector('p').textContent =
        'Your marketing request has been sent. The marketing team and all listed brokers will receive a copy.';
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
      console.error('FormSubmit error:', error);
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

// ===== Configuration =====
// TODO: Replace with the actual marketing email address
const MARKETING_EMAIL = 'astrom@trinity-partners.com';

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

// ===== Build Email Body =====
function buildEmailBody() {
  const lines = [];
  const sep = '─'.repeat(40);
  const val = (id) => document.getElementById(id)?.value?.trim() || '';
  const radio = (name) => {
    const checked = document.querySelector(`input[name="${name}"]:checked`);
    return checked ? checked.value : '';
  };

  // Listing Type
  const types = [];
  if (forSaleCheck.checked) types.push('For Sale');
  if (forLeaseCheck.checked) types.push('For Lease');
  lines.push('LISTING TYPE');
  lines.push(sep);
  lines.push(types.join(' | '));
  lines.push('');

  // Basic Info
  lines.push('BASIC INFORMATION');
  lines.push(sep);

  // Brokers
  const brokerRows = brokerContainer.querySelectorAll('.broker-row');
  brokerRows.forEach((row, i) => {
    const nameInput = row.querySelector('.broker-input');
    const emailInput = row.querySelector('.broker-email');
    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    if (name) {
      lines.push(`Broker ${i + 1}: ${name}${i === 0 ? ' (Primary)' : ''} — ${email}`);
    }
  });

  lines.push(`Address: ${val('streetAddress')}`);
  lines.push(`City: ${val('city')}, ${val('state')} ${val('zipCode')}`);
  lines.push(`County: ${val('county')}`);
  if (val('submarket')) lines.push(`Submarket: ${val('submarket')}`);
  lines.push(`Location Description: ${val('locationDescription')}`);
  lines.push(`Property Highlights: ${val('propertyHighlights')}`);
  lines.push('');

  // Property Info
  lines.push('PROPERTY INFORMATION');
  lines.push(sep);
  const type = val('propertyType');
  lines.push(`Property Type: ${type}`);
  if (type === 'Land') {
    lines.push(`Land Use: ${val('landUse')}`);
  } else if (val('propertySubtype')) {
    const sub = val('propertySubtype') === 'Other' ? val('otherSubtype') : val('propertySubtype');
    lines.push(`Subtype: ${sub}`);
  }
  if (val('propertyName')) lines.push(`Property Name: ${val('propertyName')}`);
  lines.push(`Zoning: ${val('zoning')}`);
  lines.push(`Zoning Jurisdiction: ${val('zoningJurisdiction')}`);
  lines.push(`Lot Size: ${val('lotSize')} AC`);
  if (val('tmsNumber')) lines.push(`TMS#: ${val('tmsNumber')}`);
  lines.push('');

  // Building Info (if not land)
  if (type !== 'Land') {
    lines.push('BUILDING INFORMATION');
    lines.push(sep);
    lines.push(`Building Size: ${val('buildingSize')} SF`);
    if (val('buildingClass')) lines.push(`Building Class: ${val('buildingClass')}`);
    if (val('occupancyRate')) lines.push(`Occupancy Rate: ${val('occupancyRate')}`);
    if (val('tenancy')) lines.push(`Tenancy: ${val('tenancy')}`);
    if (val('numberOfFloors')) lines.push(`Number of Floors: ${val('numberOfFloors')}`);
    if (val('yearBuilt')) lines.push(`Year Built: ${val('yearBuilt')}`);
    if (val('yearRenovated')) lines.push(`Year Last Renovated: ${val('yearRenovated')}`);
    if (val('frontage')) lines.push(`Frontage: ${val('frontage')} ft`);
    if (val('frontageStreet')) lines.push(`Frontage Street: ${val('frontageStreet')}`);
    if (val('vehiclesPerDay')) lines.push(`Vehicles per Day: ${val('vehiclesPerDay')}`);

    // Asset-class specific
    if (type === 'Office') {
      lines.push('');
      lines.push('  Office Details:');
      if (val('numOffices')) lines.push(`  # of Offices: ${val('numOffices')}`);
      if (val('numBathrooms')) lines.push(`  # of Bathrooms: ${val('numBathrooms')}`);
      if (val('numBreakrooms')) lines.push(`  # of Breakrooms: ${val('numBreakrooms')}`);
      if (radio('sharedEntry')) lines.push(`  Shared Entry: ${radio('sharedEntry')}`);
      if (radio('sharedAmenities')) lines.push(`  Shared Amenities: ${radio('sharedAmenities')}`);
      if (val('numWorkstations')) lines.push(`  # of Work Stations: ${val('numWorkstations')}`);
      if (val('parkingRatio')) lines.push(`  Parking Ratio: ${val('parkingRatio')}`);
      const layout = val('layoutStyle') === 'Other' ? val('otherLayout') : val('layoutStyle');
      if (layout) lines.push(`  Layout Style: ${layout}`);
    }

    if (type === 'Industrial') {
      lines.push('');
      lines.push('  Industrial Details:');
      if (val('officeSpace')) lines.push(`  Office Space: ${val('officeSpace')} SF`);
      if (val('utilities')) lines.push(`  Utilities: ${val('utilities')}`);
      if (val('numDockDoors')) lines.push(`  # of Dock Doors: ${val('numDockDoors')}`);
      if (val('dockDoorDescription')) lines.push(`  Dock Door Description: ${val('dockDoorDescription')}`);
      if (val('numDriveInDoors')) lines.push(`  # of Drive-In Doors: ${val('numDriveInDoors')}`);
      if (val('minClearHeight')) lines.push(`  Min. Clear Height: ${val('minClearHeight')}`);
      if (val('maxClearHeight')) lines.push(`  Max. Clear Height: ${val('maxClearHeight')}`);
      if (val('floorThickness')) lines.push(`  Floor Thickness: ${val('floorThickness')}`);
    }

    if (type === 'Retail') {
      lines.push('');
      lines.push('  Retail Details:');
      if (val('currentUse')) lines.push(`  Current Use: ${val('currentUse')}`);
      if (val('potentialUses')) lines.push(`  Potential Uses: ${val('potentialUses')}`);
      if (val('numParkingSpaces')) lines.push(`  # of Parking Spaces: ${val('numParkingSpaces')}`);
      if (val('spaceCondition')) lines.push(`  Space Condition: ${val('spaceCondition')}`);
    }

    lines.push('');
  }

  // Sale Info
  if (forSaleCheck.checked) {
    lines.push('SALE INFORMATION');
    lines.push(sep);
    lines.push(`Sale Description: ${val('saleDescription')}`);
    lines.push(`Price: ${val('salePrice')}`);
    if (val('noi')) lines.push(`NOI: ${val('noi')}`);
    if (val('capRate')) lines.push(`Cap Rate: ${val('capRate')}`);
    lines.push('');
  }

  // Lease Info
  if (forLeaseCheck.checked) {
    lines.push('LEASE INFORMATION');
    lines.push(sep);
    if (document.getElementById('subleaseCheck').checked) {
      lines.push('** SUBLEASE **');
    }
    lines.push(`Lease Description: ${val('leaseDescription')}`);
    lines.push(`Lease Rate: ${val('leaseRate')}`);
    if (radio('rateBasis')) lines.push(`Rate Basis: ${radio('rateBasis')}`);
    const lt = val('leaseType') === 'Other' ? val('otherLeaseType') : val('leaseType');
    lines.push(`Lease Type: ${lt}`);
    lines.push(`# of Spaces Available: ${val('numSpacesAvailable')}`);

    // Suites
    const suiteCards = suiteContainer.querySelectorAll('.suite-card');
    if (suiteCards.length > 0) {
      lines.push('');
      lines.push('  Available Suites:');
      suiteCards.forEach((card, i) => {
        const getName = (prefix) => {
          const input = card.querySelector(`[name^="${prefix}"]`);
          return input ? input.value.trim() : '';
        };
        lines.push(`  --- Suite ${i + 1} ---`);
        lines.push(`  Name: ${getName('suiteName')}`);
        lines.push(`  Size: ${getName('suiteSize')} SF`);
        if (getName('suiteFloor')) lines.push(`  Floor: ${getName('suiteFloor')}`);
        lines.push(`  Rate: ${getName('suiteRate')}`);
        lines.push(`  Lease Type: ${getName('suiteLeaseType')}`);
        if (getName('suiteMinDivisible')) lines.push(`  Min. Divisible: ${getName('suiteMinDivisible')} SF`);
        if (getName('suiteMaxContiguous')) lines.push(`  Max. Contiguous: ${getName('suiteMaxContiguous')} SF`);
      });
    }
    lines.push('');
  }

  // E-Blast
  const eblast = radio('eblast');
  if (eblast) {
    lines.push('E-BLAST');
    lines.push(sep);
    lines.push(eblast);
    lines.push('');
  }

  // Priority
  lines.push('PRIORITY');
  lines.push(sep);
  lines.push(val('priority'));

  return lines.join('\n');
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

  const subject = encodeURIComponent(buildEmailSubject());
  const body = encodeURIComponent(buildEmailBody());

  // Collect broker emails for CC
  const brokerEmailInputs = brokerContainer.querySelectorAll('.broker-email');
  const ccEmails = [];
  brokerEmailInputs.forEach((input) => {
    if (input.value.trim()) ccEmails.push(input.value.trim());
  });
  const ccParam = ccEmails.length > 0 ? `&cc=${encodeURIComponent(ccEmails.join(','))}` : '';

  // Use mailto link to open the user's email client
  const mailtoLink = `mailto:${MARKETING_EMAIL}?subject=${subject}${ccParam}&body=${body}`;

  // Check if mailto body is too long (some email clients have limits around 2000 chars in URL)
  // If so, copy to clipboard and show modal with instructions
  if (mailtoLink.length > 2000) {
    // Try to open mailto with just subject, copy body to clipboard
    const shortMailto = `mailto:${MARKETING_EMAIL}?subject=${subject}${ccParam}`;

    // Copy body to clipboard
    const emailBody = buildEmailBody();
    navigator.clipboard.writeText(emailBody).then(() => {
      window.location.href = shortMailto;
      showCopyModal();
    }).catch(() => {
      // Fallback: try the full mailto anyway
      window.location.href = mailtoLink;
      document.getElementById('successModal').style.display = 'flex';
    });
  } else {
    window.location.href = mailtoLink;
    document.getElementById('successModal').style.display = 'flex';
  }
});

function showCopyModal() {
  const modal = document.getElementById('successModal');
  modal.querySelector('h3').textContent = 'Email Client Opened';
  modal.querySelector('p').textContent =
    'The form content has been copied to your clipboard. Your email client should open shortly — please paste (Ctrl+V / Cmd+V) the content into the email body.';
  modal.style.display = 'flex';
}

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

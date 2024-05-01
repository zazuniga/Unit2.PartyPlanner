// Define API endpoints
const baseURL = 'https://example.com/api';
const partiesEndpoint = `${baseURL}/parties`;

// Function to fetch party data from API
async function fetchParties() {
  try {
    const response = await fetch(partiesEndpoint);
    if (!response.ok) {
      throw new Error('Failed to fetch party data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
}

// Function to add a new party to API
async function addPartyToAPI(party) {
  try {
    const response = await fetch(partiesEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(party),
    });
    if (!response.ok) {
      throw new Error('Failed to add party');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
}

// Function to delete a party from API
async function deletePartyFromAPI(partyId) {
  try {
    const response = await fetch(`${partiesEndpoint}/${partyId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete party');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
}

// Function to render party data on the page
function renderParties(parties) {
  const partyList = document.getElementById('partyList');
  partyList.innerHTML = '';
  parties.forEach(party => {
    const partyItem = document.createElement('li');
    partyItem.textContent = `${party.name} - ${party.date} at ${party.time} - ${party.location} (${party.description})`;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteParty(party.id));
    partyItem.appendChild(deleteButton);
    partyList.appendChild(partyItem);
  });
}

// Function for handling form submission
async function handleFormSubmit(event) {
  event.preventDefault();
  const eventName = document.getElementById('eventName').value;
  const eventDateTime = document.getElementById('eventDateTime').value;
  const eventLocation = document.getElementById('eventLocation').value;
  const eventDescription = document.getElementById('eventDescription').value;
  const newParty = {
    name: eventName,
    date: eventDateTime.split('T')[0],
    time: eventDateTime.split('T')[1],
    location: eventLocation,
    description: eventDescription
  };
  try {
    await addPartyToAPI(newParty);
    const updatedParties = await fetchParties();
    renderParties(updatedParties);
    event.target.reset();
  } catch (error) {
    console.error(error.message);
  }
}

// Function to delete a party
async function deleteParty(partyId) {
  try {
    await deletePartyFromAPI(partyId);
    const updatedParties = await fetchParties();
    renderParties(updatedParties);
  } catch (error) {
    console.error(error.message);
  }
}

// Fetch party data from the API and render it when page loads
window.addEventListener('load', async () => {
  try {
    const parties = await fetchParties();
    renderParties(parties);
  } catch (error) {
    console.error(error.message);
  }
});

// Add event listener to the form
const eventForm = document.querySelector('form');
eventForm.addEventListener('submit', handleFormSubmit);

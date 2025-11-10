document.addEventListener('DOMContentLoaded', () => {
    
    const moodButtons = document.querySelectorAll('.mood-btn');
    const notesInput = document.getElementById('notes-input');
    const saveButton = document.getElementById('save-btn');
    const moodLog = document.getElementById('mood-log');
    
    const API_URL = 'http://localhost:8080/api/moods';

    let selectedMood = null;

    // --- 1. Event Listeners ---

    // Handle mood button clicks
    moodButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'selected' class from all buttons
            moodButtons.forEach(btn => btn.classList.remove('selected'));
            // Add 'selected' class to the clicked button
            button.classList.add('selected');
            // Store the selected mood
            selectedMood = button.getAttribute('data-mood');
        });
    });

    // Handle save button click
    saveButton.addEventListener('click', () => {
        if (!selectedMood) {
            alert('Please select a mood first!');
            return;
        }

        const newEntry = {
            mood: selectedMood,
            notes: notesInput.value
        };

        saveMoodEntry(newEntry);
    });

    // --- 2. API Functions ---

    // Function to save a new entry
    async function saveMoodEntry(entry) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(entry)
            });
            
            if (response.ok) {
                // Reset form and reload entries
                selectedMood = null;
                notesInput.value = '';
                moodButtons.forEach(btn => btn.classList.remove('selected'));
                loadMoodEntries(); // Reload the list to show the new one
            } else {
                console.error('Failed to save entry');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Function to load all entries from the backend
    async function loadMoodEntries() {
        try {
            const response = await fetch(API_URL);
            const entries = await response.json();
            
            // Clear the current log
            moodLog.innerHTML = '';
            
            // Display each entry
            entries.forEach(entry => {
                const entryElement = document.createElement('div');
                entryElement.classList.add('log-entry');
                
                // Format the timestamp
                const timestamp = new Date(entry.timestamp).toLocaleString();
                
                entryElement.innerHTML = `
                    <h3>Mood: ${entry.mood}</h3>
                    ${entry.notes ? `<p>"${entry.notes}"</p>` : ''}
                    <span>${timestamp}</span>
                `;
                moodLog.appendChild(entryElement);
            });

        } catch (error) {
            console.error('Error loading entries:', error);
        }
    }

    // --- 3. Initial Load ---
    // Load all entries when the page first opens
    loadMoodEntries();
    
});
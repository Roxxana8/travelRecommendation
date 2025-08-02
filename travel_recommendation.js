let travelData = {};

// Load the data from the JSON file
fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        travelData = data;
        console.log("Travel data loaded:", travelData);
    })
    .catch(error => {
        console.error("Error loading travel data:", error);
    });

function searchDestinations() {
    const input = document.getElementById('searchInput').value.toLowerCase().trim();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = "";

    if (!input) {
        resultsDiv.innerHTML = "<p style='color: #d63384;'>Please enter a search term 💡</p>";
        return;
    }

    let results = [];

    // Search beaches
    if (travelData.beaches) {
        const beachMatches = travelData.beaches.filter(item =>
            item.name.toLowerCase().includes(input) ||
            input.includes("beach")
        );
        results.push(...beachMatches);
    }

    // Search temples
    if (travelData.temples) {
        const templeMatches = travelData.temples.filter(item =>
            item.name.toLowerCase().includes(input) ||
            input.includes("temple")
        );
        results.push(...templeMatches);
    }

    // Search countries and cities
    if (travelData.countries) {
        travelData.countries.forEach(country => {
            const countryNameMatch = country.name.toLowerCase().includes(input);
            const cityMatches = country.cities.filter(city =>
                city.name.toLowerCase().includes(input)
            );

            if (countryNameMatch) {
                // Add all cities in the matched country
                results.push(...country.cities);
            } else if (cityMatches.length > 0) {
                results.push(...cityMatches);
            }
        });
    }

    if (results.length === 0) {
        resultsDiv.innerHTML = "<p style='color: #d63384;'>No dreamy destinations found 😢</p>";
        return;
    }

    // Display results
       results.forEach(place => {
        const card = `
            <div style="background-color: #ffe4e1; padding: 1rem; margin: 1rem auto; max-width: 600px; border-radius: 10px; box-shadow: 0 4px 8px rgba(255, 192, 203, 0.3);">
                <h2 style="color: #8b005d;">${place.name}</h2>
                <img src="${place.imageUrl}" alt="${place.name}" style="width: 100%; border-radius: 8px; margin: 0.5rem 0;">
                <p style="color: #6d214f;">${place.description}</p>
            </div>
        `;
        resultsDiv.innerHTML += card;
    });

} 

// Clear search
function clearResults() {
    document.getElementById('searchInput').value = "";
    document.getElementById('results').innerHTML = "";
}

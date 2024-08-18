// Function to fetch access token from an API
async function getAccessToken() {
    // Replace with your actual API endpoint
    const url = 'https://api.example.com/oauth/token';
    
    // Replace with your actual request payload
    const payload = {
        grant_type: 'client_credentials',
        client_id: 'your_client_id',
        client_secret: 'your_client_secret'
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        console.log("Your (temporary) access_token:", data.access_token);

        return data.access_token;

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

// Example usage
getAccessToken().then(access_token => {
    // You can use the access token here
    console.log("Received access_token:", access_token);
});

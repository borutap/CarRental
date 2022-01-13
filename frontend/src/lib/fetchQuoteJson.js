export default async function fetchQuoteJson(baseApiUrl, vehicleId) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // TODO prawdziwe body
        body: JSON.stringify({
            age: 20,
            yearsOfHavingDriverLicense: 5,
            rentDuration: 1,
            location: "test",
            currentlyRentedCount: 0,
            overallRentedCount: 0
        }),
    };
    console.log(`${baseApiUrl}/vehicle/${vehicleId}`);

    try {
        const response = await fetch(
            `${baseApiUrl}/vehicle/${vehicleId}`,
            requestOptions
        );
        const quoteJson = await response.json();
        return quoteJson;
    } catch (e) {
        throw new Error("Can't fetch quote: " + e.message);
    } 
}
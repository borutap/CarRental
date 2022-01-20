export default async function fetchQuoteJson(
    baseApiUrl,
    age,
    yearsOfHavingDriverLicense,
    rentDuration,
    location,
    vehicleId,
    isRentalOurs
) {    
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${
                isRentalOurs
                    ? localStorage.getItem('access_token')
                    : localStorage.getItem('t_access_token')
            }`,
        },
        // TODO prawdziwe body
        body: JSON.stringify({
            age: age,
            yearsOfHavingDriverLicense: yearsOfHavingDriverLicense,
            rentDuration: rentDuration,
            location: location,
            currentlyRentedCount: 0,
            overallRentedCount: 0,
        }),
    };
    console.log(requestOptions.body);
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

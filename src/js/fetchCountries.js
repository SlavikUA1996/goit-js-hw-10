export function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/all?fields=name,flags`)
        .then(response => {
        if (response.ok) {
            return response.json();   
            }
            
            throw new Error(response.statusText);
    })
}
const fs = require('fs');

async function fetchDesignators() {
    const req = await fetch('https://www4.icao.int/doc8643/External/AircraftTypes', {
        credentials: 'omit',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:108.0) Gecko/20100101 Firefox/108.0',
            Accept: 'application/json, text/javascript, */*; q=0.01',
            'Accept-Language': 'en-US,en;q=0.5',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'Sec-GPC': '1',
            Pragma: 'no-cache',
            'Cache-Control': 'no-cache',
        },
        referrer: 'https://www.icao.int/',
        method: 'POST',
        mode: 'cors',
    });

    let json = await req.json();

    // Write the JSON to a file
    fs.writeFileSync('./db.json', JSON.stringify(json), (err) => {
        if (err) {
            console.log('Error writing file', err);
        } else {
            console.log('Successfully wrote file');
        }
    });
}

fetchDesignators();

async function testSearch() {
    try {
        console.log('Testing search API...');
        const res = await fetch('http://localhost:3000/api/search/suggest?q=a');
        const data = await res.json();
        console.log('Status:', res.status);
        console.log('Data:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error fetching search API:', error);
    }
}

testSearch();

// Test script for userdetails endpoint
const testData = {
    fullName: "Test User",
    role: "CEO",
    companyName: "Test Company",
    address: "123 Test Street",
    state: "Test State",
    city: "Test City",
    postcode: "123456",
    contactsize: 100,
    industrytype: "Technology"
};

console.log("Testing userdetails endpoint with data:");
console.log(JSON.stringify(testData, null, 2));

fetch("http://localhost:8001/api/v1/userinfo/userdetails", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(testData),
    credentials: "include"
})
    .then(res => res.json())
    .then(data => {
        console.log("\n✅ Success Response:");
        console.log(JSON.stringify(data, null, 2));
    })
    .catch(err => {
        console.error("\n❌ Error:");
        console.error(err);
    });

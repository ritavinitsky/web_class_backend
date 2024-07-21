const bcrypt = require('bcrypt');

(async () => {
    const testPassword = "1234"; // Plaintext password
    const hashedPassword = "$2b$10$O.iwWDPz9MPm.r0thcvruev0Ejxa.1IXdOvwiZW9U2VixPZFCSGEi"; // Example stored hash

    // Test hashing and comparison
    const isPasswordValid = await bcrypt.compare(testPassword, hashedPassword);
    console.log("Password valid?:", isPasswordValid); // Should print true if hashes match
})();
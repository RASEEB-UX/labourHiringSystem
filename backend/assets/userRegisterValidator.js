const validateUserData = (req, res, next) => {
    const { username, age, address, email, mobile, password,gender} = req.body;

    // Check if any required field is missing
    if (!username || !age || !address || !email || !mobile || !password  || !gender ) {
        return res.status(400).json({ error: "Required fields are missing." });
    }
    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format." });
    }

    // Check mobile number format (example: 10 digits)
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobile)) {
        return res.status(400).json({ error: "Invalid mobile number format." });
    }
    // Optionally, you can also check the type of the photo field
    if (!(req.files && req.files.photo) && !req.body.photo) {
        return res.status(400).json({ error: "photo required" });
    }
    req.body.userType = 'user'
    // If all required fields are present and valid, move to the next middleware
    next()
};
module.exports = validateUserData

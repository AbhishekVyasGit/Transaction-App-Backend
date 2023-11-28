const isValidPhoneNumber = (phoneNum) => /^\d{10}$/.test(phoneNum);
module.exports = isValidPhoneNumber;
const crypto = require("crypto");
const hashService = require("./hashService");

class AuthServices {
  async createOtp() {
    const otp = crypto.randomInt(1000, 9999);
    return otp;
  }
  async verifyOtp(hashedOtp, data) {
    let computedHash = await hashService.hashOtp(data);
    // console.log({ computedHash, data });
    return computedHash === hashedOtp;
  }
}

module.exports = new AuthServices();

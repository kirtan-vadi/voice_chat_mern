const hashService = require("../services/hash-service")
const otpService = require("../services/otp-service")

class AuthController {
    async sendOtp(req, res) {
        //logic
        const { phone } = req.body
        if (!phone) {
            res.status(400).json({ message: "phone field is requires" })
        }
        const otp = await otpService.generateOtp()
        //hash
        const ttl = 1000 * 60 * 2 //2 minute
        const expires = Date.now() + ttl
        const data = `${phone}.${otp}.${expires}`
        const hash = hashService.hashOtp(data)

        //send Otp
        try {
            await otpService.sendBySms(phone, otp)
            return res.json({
                hash: `${hash}.${expires}`,
                phone,
            })
        } catch (error) {
            console.log(err)
            res.status(500), json({ message: "message sending failed" })
        }
        res.json({ hash: hash })
    }

    verifyOtp(req, res) {
        const { otp, hash, phone } = req.body;
        if (!otp || !hash || !phone) {
            res.status(400).json({ message: 'All fields are required' });
        }

        const [hashedOtp, expires] = hash.split('.');
        if (Date.now() > expires) {
            res.status(400).json({ message: 'OTP expired ' });
        }

        const data = `${phone}.${otp}.${expires}`;

        const isValid = otpService.verifyOtp(hashedOtp, data);

        if (!isValid) {
            res.status(400).json({ message: 'Invalid OTP' });
        }
        let user;
        let accessToken;
        let refreshToken;
    }



}

module.exports = new AuthController()

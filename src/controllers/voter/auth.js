const Validator = require('../../utils/validators.js');
const VoterService = require('../../services/voter.js');
const AuthService = require('../../services/auth.js');

const voterServiceInstance = new VoterService();

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const validInput = Validator.inputValidation({ email, password });
        console.log(validInput);
        if (!validInput.isInputValid) {
            return res.status(400).json({ message: validInput.msg });
        }
        
        const emailExists = await VoterService.getVoterByEmail(email);
        if (!emailExists) {
            return res.status(401).json({ message: "Email not found, try signing-up first" });
        }
        
        const isPassCorrect = await AuthService.authenticateByPassword(emailExists.id, password);
        if (!isPassCorrect.isPasswordValid) {
            return res.status(401).json({ message: "Password is incorrect" });
        }
        
        const accessToken = await AuthService.createToken(emailExists);
        console.log(accessToken);
        return res.status(200).json({
            message: "Login successful",
            accessToken,
            user: emailExists
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    const checkInput = Validator.inputValidation({ name, email, password });
    if (!checkInput.isInputValid) {
        return res.status(400).json({ message: checkInput.msg });
    }
    
    const ifEmailExists = await VoterService.getVoterByEmail(email);
    if (ifEmailExists) {
        return res.status(400).json({ message: "User with this email already exists, try signing up with another email" });
    } else {
        const response = await voterServiceInstance.createVoter(req.body);
        return res.status(200).json(response);
    }
};

module.exports = { login, signup };

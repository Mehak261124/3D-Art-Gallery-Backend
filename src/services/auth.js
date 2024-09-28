const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { VOTER, SECRET_KEY } = require("../utils/constants");
const prisma = require("../config/database");

class AuthService {

    static async createToken(userData) {
        let payload = { id: userData.id };
        let accesses = [];
        const voter = await prisma.voter.findUnique({ where: { id: userData.id } });
        if (voter) {
          accesses = [...accesses, VOTER];
        }

        return jwt.sign(payload, SECRET_KEY, { algorithm: "HS256" });
    }

    static async authenticateByPassword(id, passwordInput) {
        const voter = await prisma.voter.findUnique({ where: { id } });
        const isPasswordValid = bcrypt.compareSync(passwordInput, voter.password);
        return { isPasswordValid };
    }
}

module.exports = AuthService;
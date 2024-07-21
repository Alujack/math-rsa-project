class RSA {
    constructor(p, q) {
        this.p = BigInt(p);
        this.q = BigInt(q);
        this.n = this.p * this.q;
        this.phi = (this.p - 1n) * (this.q - 1n);
        this.e = 65537n;
        this.d = this.modInverse(this.e, this.phi);
    }
    modInverse(e, phi) {
        let [a, b, u] = [0n, phi, 1n];
        while (e > 0n) {
            let q = b / e;
            [e, a, b, u] = [b % e, u, e, a - q * u];
        }
        if (b === 1n) {
            return (a + phi) % phi;
        }
        throw new Error('No modular inverse found');
    }
    charToNum(char) {
        return char.charCodeAt(0);
    }
    numToChar(num) {
        return String.fromCharCode(num);
    }
    encryptChar(char) {
        const num = BigInt(this.charToNum(char));
        const encryptedNum = this.modPow(num, this.e, this.n);
        return encryptedNum.toString().padStart(6, ' ');
    }
    decryptChar(encryptedChar) {
        const num = BigInt(encryptedChar.trim());
        const decryptedNum = this.modPow(num, this.d, this.n);
        return this.numToChar(Number(decryptedNum));
    }
    encrypt(message) {
        const encryptedMessage = message.split('').map(char => {
            const encryptedChar = this.encryptChar(char);
            return encryptedChar;
        }).join(' ');
        return encryptedMessage;
    }
    decrypt(encryptedMessage) {
        const chunks = encryptedMessage.trim().split(/\s+/);
        const decryptedMessage = chunks.map(chunk => {
            const decryptedChar = this.decryptChar(chunk);
            return decryptedChar;
        }).join('');
        return decryptedMessage;
    }

    modPow(base, exp, mod) {
        let result = 1n;
        base = base % mod;
        while (exp > 0n) {
            if (exp % 2n === 1n) {
                result = (result * base) % mod;
            }
            base = (base * base) % mod;
            exp = exp >> 1n;
        }
        return result;
    }
}
export default RSA;
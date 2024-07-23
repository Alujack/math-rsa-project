class CaesarCipher {
  constructor(shift) {
    this.shift = shift;
  }

  charToNum(char) {
    return char.charCodeAt(0);
  }

  numToChar(num) {
    return String.fromCharCode(num);
  }

  // Encrypt a single character
  encryptChar(char) {
    const num = this.charToNum(char);
    let encryptedNum;

    // Handle uppercase letters
    if (char >= 'A' && char <= 'Z') {
      encryptedNum = ((num - 65 + this.shift) % 26 + 26) % 26 + 65;
    }
    // Handle lowercase letters
    else if (char >= 'a' && char <= 'z') {
      encryptedNum = ((num - 97 + this.shift) % 26 + 26) % 26 + 97;
    }
    // Handle numbers
    else if (char >= '0' && char <= '9') {
      encryptedNum = ((num - 48 + this.shift) % 10 + 10) % 10 + 48;
    }
    // Handle special characters (e.g., !@#$%^&*)
    else {
      // Define the range of special characters
      const specialChars = ' !@#$%^&*(){}[]';
      const index = specialChars.indexOf(char);
      if (index !== -1) {
        const newIndex = (index + this.shift) % specialChars.length;
        encryptedNum = specialChars.charCodeAt(newIndex);
      } else {
        encryptedNum = num;  // Unhandled characters
      }
    }

    return this.numToChar(encryptedNum);
  }

  // Decrypt a single character
  decryptChar(char) {
    const num = this.charToNum(char);
    let decryptedNum;

    // Handle uppercase letters
    if (char >= 'A' && char <= 'Z') {
      decryptedNum = ((num - 65 - this.shift + 26) % 26 + 26) % 26 + 65;
    }
    // Handle lowercase letters
    else if (char >= 'a' && char <= 'z') {
      decryptedNum = ((num - 97 - this.shift + 26) % 26 + 26) % 26 + 97;
    }
    // Handle numbers
    else if (char >= '0' && char <= '9') {
      decryptedNum = ((num - 48 - this.shift + 10) % 10 + 10) % 10 + 48;
    }
    // Handle special characters (e.g., !@#$%^&*)
    else {
      // Define the range of special characters
      const specialChars = ' !@#$%^&*(){}[]';
      const index = specialChars.indexOf(char);
      if (index !== -1) {
        const newIndex = (index - this.shift + specialChars.length) % specialChars.length;
        decryptedNum = specialChars.charCodeAt(newIndex);
      } else {
        decryptedNum = num;  // Unhandled characters
      }
    }

    return this.numToChar(decryptedNum);
  }

  // Encrypt a message
  encrypt(message) {
    const encryptedMessage = message.split('').map(char => this.encryptChar(char)).join('');
    return encryptedMessage;
  }

  // Decrypt a message
  decrypt(encryptedMessage) {
    const decryptedMessage = encryptedMessage.split('').map(char => this.decryptChar(char)).join('');
    return decryptedMessage;
  }
}

export default CaesarCipher;

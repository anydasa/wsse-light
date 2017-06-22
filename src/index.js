import Utf8 from 'crypto-js/enc-utf8';
import Base64 from 'crypto-js/enc-base64';
import SHA1 from 'crypto-js/sha1';

class Wsse {

  generateNonce() {
    const nonce = Math.random().toString(36).substring(2);
    return Utf8.parse(nonce).toString(Base64);
  }

  generatePasswordDigest(nonce, createdDate, encodedPassword) {
    const nonce64 = Base64.parse(nonce);
    const digest = nonce64.concat(Utf8.parse(createdDate).concat(Utf8.parse(encodedPassword)));
    return SHA1(digest).toString(Base64);
  }

  getWSSEHeader(username, password, createdDate) {
    const nonce = this.generateNonce();
    const passwordDigest = this.generatePasswordDigest(nonce, createdDate, password);
    return 'UsernameToken Username="'+username+'", PasswordDigest="'+passwordDigest+'", Nonce="'+nonce+'", Created="'+createdDate+'"';
  }

}

export default Wsse
class TokenStorage {
  static key = 'token';

  static setItemInLocalStorage(token) {
    const serialized = JSON.stringify(token);
    localStorage.setItem(this.key, serialized);
  }

  static getItemFromLocalStorage() {
    return JSON.parse(localStorage.getItem(this.key));
  }

  static removeItemInLocalStorage() {
    localStorage.removeItem(this.key);
  }

}

export default TokenStorage;

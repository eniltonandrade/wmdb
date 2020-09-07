export class User {
    constructor(
        public id: number,
        public email: string,
        // tslint:disable-next-line: variable-name
        private _token: string,
        // tslint:disable-next-line: variable-name
        private _tokenExpirationDate: Date
    ) { }

    get token() {
        if (!this._tokenExpirationDate || this._tokenExpirationDate <= new Date()) {
            return null;
        } else {
            return this._token;
        }
    }

    get tokenDuration() {
        if (!this.token) {
            return 0;
        }
        return this._tokenExpirationDate.getTime() - new Date().getTime();
    }
}
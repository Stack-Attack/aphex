import decode from 'jwt-decode';

//note: this authorization is not implemented yet and does not hook into the API we will be using.
//just a skeleton right now

class AuthService {

    constructor(domain){
        this.domain = domain || 'http://localhost:8080'; // API server domain
        this.fetch = this.fetch.bind(this);
        this.login = this.login.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }

    login(username, password){
        //get a token from the API server using the fetch API

        return this.fetch('${this.domain}/login', {
           method: 'POST',
           body: JSON.stringify({
               username,
               password
           })
        }).then(res => {
            this.setToken(res.token); //set the token in localstorage
            return Promise.resolve(res);
        });

    }

    loggedIn(){
        //checks if there is a saved token and it's still valid
        const token = this.getToken(); //get token from localstorage
        return !!token && !this.isTokenExpired(token);
    }

    isTokenExpired(token){
        try{
            const decoded = decode(token);
            if(decoded.exp < Date.now() / 1000){ //get if token is expired
                return true;
            }
            else{
                return false;
            }
        }
        catch(err){
            return false;
        }
    }

    setToken(idToken){
        //saves user token to localstorage
        localStorage.setItem('id_token', idToken);
    }

    getToken(){
        //retrieves user token from localstorage
        return localStorage.getItem('id_token');
    }

    logout(){
        //clear user token and profile data from localstorage
        localStorage.removeItem('id_token');
    }

    getProfile(){
        //using jwt-decode npm package to decode the token
        return decode(this.getToken());
    }

    fetch(url, options){
        //performs api calls sending the required authentication headers

        const headers = {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }

        //setting authorization header

        if(this.loggedIn()){
            headers['Authorization'] = 'Bearer ' + this.getToken();
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json());
    }

    _checkStatus(response){
        //raises an error in case response status is not a success
        if(response.status >= 200 && response.status < 300){
            return response;
        }
        else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    }
}

export default AuthService;
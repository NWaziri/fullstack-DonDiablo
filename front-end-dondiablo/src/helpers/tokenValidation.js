import jwtDecode from "jwt-decode";

const validToken = (jwt_token) => {
    try {
        const decoded = jwtDecode(jwt_token);
        const unixExpireTimeStamp = decoded.exp;
        const currentTimeStamp = new Date().getTime();
        const currentUnixTimeStamp = Math.round(currentTimeStamp/1000)

        if (unixExpireTimeStamp - currentUnixTimeStamp > 0) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.log(e)
    }

}

export default validToken;
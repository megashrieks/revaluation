export default () => {
    let auth = localStorage.getItem("auth");
    if (!!auth) {
        auth = JSON.parse(auth);
        return auth.token;
    } else {
        return null;
    }
}
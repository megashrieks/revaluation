export default (token) => {
    localStorage.setItem("auth", JSON.stringify({ token: token }));
}
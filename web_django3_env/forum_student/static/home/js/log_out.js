function logOut() {
    document.cookie = 'user' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.href = "/";
}
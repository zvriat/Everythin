const CLIENT_ID = "793965405144-a1akoa0tfq4n75grpu1hnrfujkaldaht.apps.googleusercontent.com";

const REDIRECT_URI =
    "https://zvriat.github.io/Everythin/callback.html";

document.getElementById("loginBtn").onclick = () => {

    const scope = encodeURIComponent("openid email profile");

    const url =
        "https://accounts.google.com/o/oauth2/v2/auth" +
        "?client_id=" + CLIENT_ID +
        "&redirect_uri=" + encodeURIComponent(REDIRECT_URI) +
        "&response_type=token" +
        "&scope=" + scope;

    window.location.href = url;
};
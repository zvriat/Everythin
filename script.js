const CLIENT_ID = "793965405144-a1akoa0tfq4n75grpu1hnrfujkaldaht.apps.googleusercontent.com";

const REDIRECT_URI =
    "https://zvriat.github.io/Everythin/callback.html";

const loginSection = document.getElementById("loginSection");
const profileSection = document.getElementById("profileSection");

const avatar = document.getElementById("avatar");
const nameText = document.getElementById("name");

// ================= LOGIN REDIRECT =================
document.getElementById("loginBtn").onclick = () => {

    const scope = encodeURIComponent("openid email profile");

    window.location.href =
        "https://accounts.google.com/o/oauth2/v2/auth" +
        "?client_id=" + CLIENT_ID +
        "&redirect_uri=" + encodeURIComponent(REDIRECT_URI) +
        "&response_type=token" +
        "&scope=" + scope;
};

// ================= CHECK LOGIN =================
function loadUser() {

    const user = JSON.parse(localStorage.getItem("google_user"));

    if (user) {

        loginSection.style.display = "none";
        profileSection.style.display = "block";

        avatar.src = user.picture;
        nameText.innerText = user.name;

    } else {

        loginSection.style.display = "block";
        profileSection.style.display = "none";

    }
}

// ================= LOGOUT =================
document.getElementById("logoutBtn").onclick = () => {

    localStorage.removeItem("google_user");
    loadUser();

};

// run on page load
loadUser();
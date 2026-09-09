/*
    NearLink Authentication
    ------------------------
    Frontend prototype authentication using localStorage.

    Flow:
    Create Account → NearLink App
    Login → NearLink App

    IMPORTANT:
    This is suitable for demos/prototypes only.
    Do NOT use localStorage for real production passwords.
*/

const USERS_KEY = "nearlinkUsers";
const CURRENT_USER_KEY = "nearlinkCurrentUser";
const LOGIN_KEY = "nearlinkLoggedIn";


/* =========================
   HELPERS
========================= */

function getUsers() {
    try {
        return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch (error) {
        console.error("Unable to read NearLink users:", error);
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function showMessage(message, type) {
    const box = document.getElementById("authMessage");

    if (!box) return;

    box.textContent = message;
    box.className = "auth-message show " + type;
}

function clearMessage() {
    const box = document.getElementById("authMessage");

    if (!box) return;

    box.textContent = "";
    box.className = "auth-message";
}

function normalizeEmail(email) {
    return email.trim().toLowerCase();
}


/*
    Go directly to the NearLink service.

    signup.html and login.html are inside /pages,
    so app.html is in the same folder.
*/
function redirectToApp() {
    window.location.href = "app.html";
}


/* =========================
   PASSWORD VISIBILITY
========================= */

function setupPasswordToggles() {

    const buttons = document.querySelectorAll(".password-toggle");

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            const targetId = button.getAttribute("data-target");
            const input = document.getElementById(targetId);

            if (!input) return;

            if (input.type === "password") {

                input.type = "text";
                button.textContent = "Hide";
                button.setAttribute("aria-label", "Hide password");

            } else {

                input.type = "password";
                button.textContent = "Show";
                button.setAttribute("aria-label", "Show password");
            }
        });

    });
}


/* =========================
   PASSWORD STRENGTH
========================= */

function calculatePasswordStrength(password) {

    let score = 0;

    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
}

function setupPasswordStrength() {

    const password = document.getElementById("signupPassword");
    const progress = document.getElementById("strengthProgress");
    const label = document.getElementById("passwordStrength");

    if (!password || !progress || !label) return;

    password.addEventListener("input", function () {

        const value = password.value;
        const score = calculatePasswordStrength(value);

        let width = 0;
        let text = "Password strength";

        if (value.length === 0) {

            width = 0;
            text = "Password strength";

        } else if (score <= 2) {

            width = 30;
            text = "Weak password";

        } else if (score === 3) {

            width = 60;
            text = "Medium password";

        } else if (score === 4) {

            width = 80;
            text = "Strong password";

        } else {

            width = 100;
            text = "Very strong password";
        }

        progress.style.width = width + "%";
        label.textContent = text;
    });
}


/* =========================
   SIGNUP
========================= */

function setupSignup() {

    const form = document.getElementById("signupForm");

    if (!form) return;

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        clearMessage();

        const firstName =
            document.getElementById("firstName").value.trim();

        const lastName =
            document.getElementById("lastName").value.trim();

        const email =
            normalizeEmail(
                document.getElementById("signupEmail").value
            );

        const phone =
            document.getElementById("signupPhone").value.trim();

        const password =
            document.getElementById("signupPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const acceptTerms =
            document.getElementById("acceptTerms").checked;

        const signupBtn =
            document.getElementById("signupBtn");


        /* =========================
           VALIDATION
        ========================= */

        if (!firstName || !lastName) {

            showMessage(
                "Please enter your first and last name.",
                "error"
            );

            return;
        }

        if (!email) {

            showMessage(
                "Please enter your email address.",
                "error"
            );

            return;
        }

        if (password.length < 8) {

            showMessage(
                "Password must contain at least 8 characters.",
                "error"
            );

            return;
        }

        if (password !== confirmPassword) {

            showMessage(
                "Passwords do not match.",
                "error"
            );

            return;
        }

        if (!acceptTerms) {

            showMessage(
                "Please accept the terms and conditions.",
                "error"
            );

            return;
        }


        /* =========================
           CHECK EXISTING ACCOUNT
        ========================= */

        const users = getUsers();

        const existingUser = users.find(function (user) {
            return user.email === email;
        });

        if (existingUser) {

            showMessage(
                "An account with this email already exists. Please login instead.",
                "error"
            );

            return;
        }


        /* =========================
           CREATE USER
        ========================= */

        const newUser = {

            id: "NL-" + Date.now(),

            firstName: firstName,

            lastName: lastName,

            email: email,

            phone: phone,

            password: password,

            createdAt: new Date().toISOString()

        };


        users.push(newUser);

        saveUsers(users);


        /* =========================
           AUTOMATIC LOGIN
        ========================= */

        const safeUser = {

            id: newUser.id,

            firstName: newUser.firstName,

            lastName: newUser.lastName,

            email: newUser.email,

            phone: newUser.phone

        };


        localStorage.setItem(
            CURRENT_USER_KEY,
            JSON.stringify(safeUser)
        );

        localStorage.setItem(
            LOGIN_KEY,
            "true"
        );


        /* =========================
           SUCCESS STATE
        ========================= */

        if (signupBtn) {

            signupBtn.disabled = true;

            signupBtn.textContent = "Account Created ✓";

        }


        showMessage(
            "Account created successfully! Opening NearLink...",
            "success"
        );


        /*
            Give the success message a moment
            before opening the app.
        */

        setTimeout(function () {

            redirectToApp();

        }, 700);

    });
}


/* =========================
   LOGIN
========================= */

function setupLogin() {

    const form = document.getElementById("loginForm");

    if (!form) return;

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        clearMessage();

        const email =
            normalizeEmail(
                document.getElementById("loginEmail").value
            );

        const password =
            document.getElementById("loginPassword").value;

        const rememberCheckbox =
            document.getElementById("rememberMe");

        const rememberMe =
            rememberCheckbox
                ? rememberCheckbox.checked
                : false;

        const loginBtn =
            document.getElementById("loginBtn");


        /* =========================
           VALIDATION
        ========================= */

        if (!email || !password) {

            showMessage(
                "Please enter your email and password.",
                "error"
            );

            return;
        }


        /* =========================
           FIND USER
        ========================= */

        const users = getUsers();

        const user = users.find(function (account) {

            return (
                account.email === email &&
                account.password === password
            );

        });


        if (!user) {

            showMessage(
                "Incorrect email or password.",
                "error"
            );

            return;
        }


        /* =========================
           SAVE CURRENT USER
        ========================= */

        const safeUser = {

            id: user.id,

            firstName: user.firstName,

            lastName: user.lastName,

            email: user.email,

            phone: user.phone

        };


        localStorage.setItem(
            CURRENT_USER_KEY,
            JSON.stringify(safeUser)
        );

        localStorage.setItem(
            LOGIN_KEY,
            "true"
        );


        /* =========================
           REMEMBER ME
        ========================= */

        if (rememberMe) {

            localStorage.setItem(
                "nearlinkRememberMe",
                "true"
            );

        } else {

            localStorage.removeItem(
                "nearlinkRememberMe"
            );
        }


        /* =========================
           SUCCESS STATE
        ========================= */

        if (loginBtn) {

            loginBtn.disabled = true;

            loginBtn.textContent = "Login successful ✓";

        }


        showMessage(
            "Welcome back, " + user.firstName + "! Opening NearLink...",
            "success"
        );


        /* =========================
           OPEN APP
        ========================= */

        setTimeout(function () {

            redirectToApp();

        }, 700);

    });
}


/* =========================
   FORGOT PASSWORD
========================= */

function setupForgotPassword() {

    const button = document.getElementById("forgotPassword");

    if (!button) return;

    button.addEventListener("click", function () {

        const emailInput =
            document.getElementById("loginEmail");

        const email =
            emailInput
                ? normalizeEmail(emailInput.value)
                : "";

        if (!email) {

            showMessage(
                "Enter your email address first.",
                "error"
            );

            if (emailInput) {
                emailInput.focus();
            }

            return;
        }


        const users = getUsers();

        const user = users.find(function (account) {

            return account.email === email;

        });


        if (!user) {

            showMessage(
                "No account was found with this email.",
                "error"
            );

            return;
        }


        showMessage(
            "Password reset is not connected yet. For this prototype, contact support to reset your password.",
            "error"
        );

    });
}


/* =========================
   AUTO LOGIN CHECK
========================= */

function checkExistingLogin() {

    const isLoggedIn =
        localStorage.getItem(LOGIN_KEY) === "true";

    /*
        Don't redirect automatically from
        the authentication pages.

        The app itself should decide whether
        a user is authenticated.
    */

    if (isLoggedIn) {
        console.log("NearLink user session detected.");
    }
}


/* =========================
   START
========================= */

document.addEventListener("DOMContentLoaded", function () {

    setupPasswordToggles();

    setupPasswordStrength();

    setupSignup();

    setupLogin();

    setupForgotPassword();

    checkExistingLogin();

    console.log(
        "NearLink authentication loaded successfully."
    );

});
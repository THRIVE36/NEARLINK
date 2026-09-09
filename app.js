/* =========================================================
   NEARLINK — APP DASHBOARD JAVASCRIPT
   Complete animated dashboard controller
   Works with pages/app.html + css/style.css
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       1. AUTHENTICATION
    ========================================================= */

    const loggedIn = localStorage.getItem("nearlinkLoggedIn");
    const currentUserRaw =
        localStorage.getItem("nearlinkCurrentUser");

    const dashboard = document.getElementById("dashboard");

    /*
       Only protect the actual dashboard.
       Landing page, login page and signup page are not protected.
    */

    if (
        dashboard &&
        (loggedIn !== "true" || !currentUserRaw)
    ) {
        window.location.href = "login.html";
        return;
    }

    let currentUser = null;

    try {
        currentUser = currentUserRaw
            ? JSON.parse(currentUserRaw)
            : null;
    } catch (error) {
        console.warn(
            "NearLink: Could not read saved user.",
            error
        );

        currentUser = null;
    }


    /* =========================================================
       2. HELPERS
    ========================================================= */

    const $ = (selector) =>
        document.querySelector(selector);

    const $$ = (selector) =>
        document.querySelectorAll(selector);


    function showMessage(message, type = "info") {

        const messageBox = $("#messageBox");

        if (!messageBox) return;

        messageBox.textContent = message;

        messageBox.className = "message-box";

        messageBox.classList.add(
            `message-${type}`
        );

        requestAnimationFrame(() => {
            messageBox.classList.add("show");
        });

        clearTimeout(
            window.nearLinkMessageTimer
        );

        window.nearLinkMessageTimer =
            setTimeout(() => {

                messageBox.classList.remove(
                    "show"
                );

            }, 3500);
    }


    function smoothScrollTo(element) {

        if (!element) return;

        element.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }


    function highlight(element) {

        if (!element) return;

        if (element.animate) {

            element.animate(
                [
                    {
                        transform: "scale(1)",
                        boxShadow:
                            "0 0 0 rgba(37,99,235,0)"
                    },
                    {
                        transform: "scale(1.015)",
                        boxShadow:
                            "0 0 0 6px rgba(37,99,235,.10)"
                    },
                    {
                        transform: "scale(1)",
                        boxShadow:
                            "0 0 0 rgba(37,99,235,0)"
                    }
                ],
                {
                    duration: 550,
                    easing: "ease-out"
                }
            );
        }
    }


    function pulse(element) {

        if (!element) return;

        element.animate(
            [
                {
                    transform: "scale(1)"
                },
                {
                    transform: "scale(.96)"
                },
                {
                    transform: "scale(1)"
                }
            ],
            {
                duration: 220,
                easing: "ease-out"
            }
        );
    }


    /* =========================================================
       SERVICE NAVIGATION
    ========================================================= */

    function openNearLinkService(service) {

        if (!service) return;

        pulse(
            document.activeElement
        );

        /*
           app.html and service.html are in the same
           pages folder, so this path is correct.
        */

        window.location.href =
            `service.html?service=${encodeURIComponent(service)}`;
    }


    /* =========================================================
       3. USER PROFILE
    ========================================================= */

    const welcomeHeading =
        $(".welcome-text h1");

    const profileAvatar =
        $("#profileAvatar");


    if (currentUser) {

        const firstName =
            currentUser.firstName || "User";

        const lastName =
            currentUser.lastName || "";


        if (welcomeHeading) {

            welcomeHeading.textContent =
                `Welcome back 👋 ${firstName}`;
        }


        if (profileAvatar) {

            const firstInitial =
                firstName
                    .charAt(0)
                    .toUpperCase();

            const lastInitial =
                lastName
                    ? lastName
                        .charAt(0)
                        .toUpperCase()
                    : "";


            profileAvatar.textContent =
                firstInitial + lastInitial;
        }
    }


    /* =========================================================
       4. MOBILE NAVIGATION
    ========================================================= */

    const menuToggle =
        $("#menuToggle");

    const navLinks =
        $(".nav-links");


    if (menuToggle && navLinks) {

        menuToggle.addEventListener(
            "click",
            () => {

                navLinks.classList.toggle(
                    "active"
                );

                const opened =
                    navLinks.classList.contains(
                        "active"
                    );


                menuToggle.setAttribute(
                    "aria-expanded",
                    opened ? "true" : "false"
                );


                pulse(menuToggle);
            }
        );


        $$(".nav-links a").forEach(
            link => {

                link.addEventListener(
                    "click",
                    () => {

                        navLinks.classList.remove(
                            "active"
                        );

                        menuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );
                    }
                );
            }
        );
    }


    /* =========================================================
       5. NAVBAR SCROLL EFFECT
    ========================================================= */

    const nav = $("nav");


    function updateNavbar() {

        if (!nav) return;

        if (window.scrollY > 20) {

            nav.classList.add("scrolled");

        } else {

            nav.classList.remove("scrolled");
        }
    }


    window.addEventListener(
        "scroll",
        updateNavbar,
        {
            passive: true
        }
    );


    updateNavbar();


    /* =========================================================
       6. SMOOTH ANCHOR LINKS
    ========================================================= */

    $$('a[href^="#"]').forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute("href");


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) return;


                    event.preventDefault();

                    smoothScrollTo(target);

                    highlight(target);
                }
            );
        }
    );


    /* =========================================================
       7. GLOBAL SEARCH
    ========================================================= */

    const searchInput =
        $("#globalSearch");

    const searchButton =
        $("#globalSearchBtn");


    const serviceMap = {

        ride: "ride",
        rides: "ride",
        transport: "ride",
        transportation: "ride",
        taxi: "ride",
        car: "ride",

        repair: "repair",
        repairs: "repair",
        phone: "repair",
        laptop: "repair",
        mechanic: "repair",
        fixing: "repair",
        fix: "repair",

        shop: "shop",
        shops: "shop",
        shopping: "shop",
        product: "shop",
        products: "shop",
        clothes: "shop",
        cloth: "shop",

        food: "food",
        restaurant: "food",
        restaurants: "food",
        meal: "food",
        meals: "food",

        delivery: "delivery",
        deliver: "delivery",
        package: "delivery",
        packages: "delivery",
        courier: "delivery",

        health: "health",
        healthcare: "health",
        doctor: "health",
        hospital: "health",
        pharmacy: "health",
        medicine: "health",

        home: "home",
        cleaning: "home",
        plumber: "home",
        plumbing: "home",

        talent: "talent",
        designer: "talent",
        developer: "talent",
        tutor: "talent",
        photographer: "talent"
    };


    function performSearch() {

        if (!searchInput) return;


        const originalQuery =
            searchInput.value.trim();


        const query =
            originalQuery.toLowerCase();


        if (!query) {

            searchInput.classList.add(
                "search-error"
            );


            showMessage(
                "What are you looking for? Try food, repairs, rides or shopping.",
                "info"
            );


            searchInput.focus();

            return;
        }


        let matchedService = null;


        for (
            const keyword in serviceMap
        ) {

            if (query.includes(keyword)) {

                matchedService =
                    serviceMap[keyword];

                break;
            }
        }


        if (matchedService) {

            showMessage(
                `Opening ${matchedService} service...`,
                "success"
            );


            setTimeout(() => {

                openNearLinkService(
                    matchedService
                );

            }, 250);


            return;
        }


        /*
           Generic search.
        */

        const discover =
            $("#discover");


        if (discover) {

            smoothScrollTo(discover);

            highlight(discover);
        }


        showMessage(
            `Searching NearLink for "${originalQuery}"...`,
            "info"
        );
    }


    if (searchButton) {

        searchButton.addEventListener(
            "click",
            () => {

                pulse(searchButton);

                performSearch();
            }
        );
    }


    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            event => {

                if (event.key === "Enter") {

                    event.preventDefault();

                    performSearch();
                }
            }
        );


        searchInput.addEventListener(
            "input",
            () => {

                searchInput.classList.remove(
                    "search-error"
                );
            }
        );
    }


    /* =========================================================
       8. QUICK SERVICE CARDS
    ========================================================= */

    $$(".quick-card").forEach(
        (card, index) => {

            card.style.animationDelay =
                `${Math.min(index * 70, 420)}ms`;


            card.addEventListener(
                "click",
                () => {

                    pulse(card);


                    const service =
                        card.dataset.service;


                    if (!service) {

                        showMessage(
                            "This service is not configured yet.",
                            "info"
                        );

                        return;
                    }


                    /*
                       Open the actual service page.
                    */

                    openNearLinkService(
                        service
                    );
                }
            );
        }
    );


    /* =========================================================
       9. DISCOVERY CARDS
    ========================================================= */

    $$(".discovery-card").forEach(
        (card, index) => {

            card.style.animationDelay =
                `${Math.min(index * 80, 450)}ms`;


            card.addEventListener(
                "click",
                () => {

                    pulse(card);


                    const service =
                        card.dataset.service;


                    if (!service) {

                        showMessage(
                            "This service is not configured yet.",
                            "info"
                        );

                        return;
                    }


                    openNearLinkService(
                        service
                    );
                }
            );
        }
    );


    /* =========================================================
       10. FEATURED PROVIDERS
    ========================================================= */

    $$(".provider-card").forEach(
        (card, index) => {

            card.style.animationDelay =
                `${Math.min(index * 80, 450)}ms`;
        }
    );


    /* =========================================================
       FEATURED PROVIDER ACTIONS
    ========================================================= */

    $$(".provider-card").forEach(
        card => {

            const button =
                card.querySelector(
                    ".provider-action"
                );


            if (!button) return;


            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    if (button.disabled) return;


                    pulse(button);


                    const providerName =
                        card.querySelector("h3")
                            ?.textContent
                            .trim()
                            .toLowerCase() || "";


                    let service = "ride";


                    /*
                       SafeRide
                    */

                    if (
                        providerName.includes(
                            "saferide"
                        )
                    ) {

                        service = "ride";
                    }


                    /*
                       QuickFix Repairs
                    */

                    else if (
                        providerName.includes(
                            "quickfix"
                        )
                    ) {

                        service = "repair";
                    }


                    /*
                       Campus Bites
                    */

                    else if (
                        providerName.includes(
                            "campus bites"
                        )
                    ) {

                        service = "food";
                    }


                    /*
                       Navigate to the real
                       service experience.
                    */

                    openNearLinkService(
                        service
                    );
                }
            );
        }
    );


    /* =========================================================
       11. LOCATION
    ========================================================= */

    const locationElement =
        $("#userLocation");

    const changeLocationButton =
        $("#changeLocationBtn");


    const savedLocation =
        localStorage.getItem(
            "nearlinkLocation"
        );


    if (
        locationElement &&
        savedLocation
    ) {

        locationElement.textContent =
            savedLocation;
    }


    if (changeLocationButton) {

        changeLocationButton.addEventListener(
            "click",
            () => {

                pulse(changeLocationButton);


                const current =
                    locationElement?.textContent ||
                    "";


                const location =
                    prompt(
                        "Enter your city or area:",
                        current === "Your location"
                            ? ""
                            : current
                    );


                if (
                    !location ||
                    !location.trim()
                ) {
                    return;
                }


                const cleanLocation =
                    location.trim();


                localStorage.setItem(
                    "nearlinkLocation",
                    cleanLocation
                );


                if (locationElement) {

                    locationElement.textContent =
                        cleanLocation;


                    locationElement.animate(
                        [
                            {
                                opacity: 0,
                                transform:
                                    "translateY(5px)"
                            },
                            {
                                opacity: 1,
                                transform:
                                    "translateY(0)"
                            }
                        ],
                        {
                            duration: 350,
                            easing: "ease-out"
                        }
                    );
                }


                showMessage(
                    `Location changed to ${cleanLocation}.`,
                    "success"
                );
            }
        );
    }


    /* =========================================================
       12. AI ASSISTANT
    ========================================================= */

    const aiInput =
        $("#aiInput");

    const aiButton =
        $("#aiBtn");

    const aiResponse =
        $("#aiResponse");


    function askNearLinkAI() {

        if (
            !aiInput ||
            !aiResponse
        ) {
            return;
        }


        const question =
            aiInput.value
                .trim()
                .toLowerCase();


        if (!question) {

            aiResponse.textContent =
                "Tell me what you need and I'll help you find the right NearLink service.";


            aiResponse.animate(
                [
                    {
                        opacity: 0
                    },
                    {
                        opacity: 1
                    }
                ],
                {
                    duration: 350
                }
            );


            return;
        }


        let response =
            "I can help you find local services. Try asking about rides, repairs, food, shopping, delivery, health or student services.";


        if (
            question.includes("ride") ||
            question.includes("transport") ||
            question.includes("taxi") ||
            question.includes("car")
        ) {

            response =
                "🚗 You need transportation. NearLink can help you find local rides and transportation providers.";

        }

        else if (
            question.includes("repair") ||
            question.includes("phone") ||
            question.includes("laptop") ||
            question.includes("fix")
        ) {

            response =
                "🔧 It sounds like you need a repair service. Try NearLink Repairs to find phone, laptop and other local repair providers.";

        }

        else if (
            question.includes("food") ||
            question.includes("eat") ||
            question.includes("restaurant") ||
            question.includes("meal")
        ) {

            response =
                "🍔 Looking for food? NearLink can connect you with nearby food vendors, restaurants and local sellers.";

        }

        else if (
            question.includes("shop") ||
            question.includes("buy") ||
            question.includes("product") ||
            question.includes("cloth") ||
            question.includes("clothes")
        ) {

            response =
                "🛍️ You are looking for something to buy. NearLink Shopping will help you discover products from local sellers.";

        }

        else if (
            question.includes("deliver") ||
            question.includes("package") ||
            question.includes("send") ||
            question.includes("courier")
        ) {

            response =
                "📦 You need a delivery service. NearLink Delivery can connect you with local delivery providers.";

        }

        else if (
            question.includes("doctor") ||
            question.includes("health") ||
            question.includes("hospital") ||
            question.includes("medicine") ||
            question.includes("pharmacy")
        ) {

            response =
                "❤️ For health-related needs, NearLink can help you discover nearby healthcare services.";

        }

        else if (
            question.includes("home") ||
            question.includes("cleaning") ||
            question.includes("plumber")
        ) {

            response =
                "🏠 You need help at home. NearLink can connect you with nearby home service providers.";

        }

        else if (
            question.includes("talent") ||
            question.includes("designer") ||
            question.includes("developer") ||
            question.includes("tutor")
        ) {

            response =
                "💼 NearLink Talent helps you find local freelancers, designers, developers, tutors and other skilled people.";

        }

        else if (
            question.includes("student") ||
            question.includes("campus") ||
            question.includes("school")
        ) {

            response =
                "🎓 Student Mode is designed to help students find affordable food, rides, services and local providers.";
        }


        aiResponse.style.opacity =
            "0";

        aiResponse.style.transform =
            "translateY(8px)";


        aiResponse.textContent =
            response;


        requestAnimationFrame(() => {

            aiResponse.style.transition =
                "opacity .35s ease, transform .35s ease";

            aiResponse.style.opacity =
                "1";

            aiResponse.style.transform =
                "translateY(0)";
        });


        aiResponse.animate(
            [
                {
                    opacity: 0,
                    transform:
                        "translateY(12px)"
                },
                {
                    opacity: 1,
                    transform:
                        "translateY(0)"
                }
            ],
            {
                duration: 420,
                easing:
                    "cubic-bezier(.22,1,.36,1)"
            }
        );
    }


    if (aiButton) {

        aiButton.addEventListener(
            "click",
            () => {

                pulse(aiButton);

                askNearLinkAI();
            }
        );
    }


    if (aiInput) {

        aiInput.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    askNearLinkAI();
                }
            }
        );
    }


    /* =========================================================
       13. STUDENT MODE
    ========================================================= */

    const studentButton =
        $("#studentModeBtn");


    function openStudentMode() {

        if (!studentButton) return;


        const studentSection =
            $("#student");


        if (!studentSection) {

            showMessage(
                "Student Mode section could not be found.",
                "info"
            );

            return;
        }


        pulse(studentButton);


        const existingPanel =
            document.getElementById(
                "studentModePanel"
            );


        if (existingPanel) {

            smoothScrollTo(
                existingPanel
            );

            highlight(
                existingPanel
            );

            return;
        }


        const panel =
            document.createElement("div");


        panel.id =
            "studentModePanel";

        panel.className =
            "student-mode-panel";


        panel.innerHTML = `

            <div class="student-mode-header">

                <div>

                    <span class="student-badge">
                        🎓 STUDENT MODE
                    </span>

                    <h3>
                        Everything students need, nearby.
                    </h3>

                    <p>
                        Discover affordable services, food,
                        rides, repairs and opportunities around you.
                    </p>

                </div>

                <button
                    type="button"
                    class="student-close-btn"
                    id="closeStudentMode"
                    aria-label="Close Student Mode"
                >
                    ×
                </button>

            </div>


            <div class="student-service-grid">

                <button
                    type="button"
                    class="student-service-card"
                    data-student-service="food"
                >

                    <span class="student-service-icon">
                        🍔
                    </span>

                    <div>

                        <strong>
                            Student Food
                        </strong>

                        <small>
                            Affordable meals near campus
                        </small>

                    </div>

                    <span class="student-arrow">
                        →
                    </span>

                </button>


                <button
                    type="button"
                    class="student-service-card"
                    data-student-service="ride"
                >

                    <span class="student-service-icon">
                        🚗
                    </span>

                    <div>

                        <strong>
                            Campus Rides
                        </strong>

                        <small>
                            Find convenient local transport
                        </small>

                    </div>

                    <span class="student-arrow">
                        →
                    </span>

                </button>


                <button
                    type="button"
                    class="student-service-card"
                    data-student-service="repair"
                >

                    <span class="student-service-icon">
                        🔧
                    </span>

                    <div>

                        <strong>
                            Repairs
                        </strong>

                        <small>
                            Phone, laptop and device repairs
                        </small>

                    </div>

                    <span class="student-arrow">
                        →
                    </span>

                </button>


                <button
                    type="button"
                    class="student-service-card"
                    data-student-service="delivery"
                >

                    <span class="student-service-icon">
                        📦
                    </span>

                    <div>

                        <strong>
                            Student Delivery
                        </strong>

                        <small>
                            Send and receive packages easily
                        </small>

                    </div>

                    <span class="student-arrow">
                        →
                    </span>

                </button>


                <button
                    type="button"
                    class="student-service-card"
                    data-student-service="shop"
                >

                    <span class="student-service-icon">
                        🛍️
                    </span>

                    <div>

                        <strong>
                            Student Marketplace
                        </strong>

                        <small>
                            Find products from nearby sellers
                        </small>

                    </div>

                    <span class="student-arrow">
                        →
                    </span>

                </button>


                <button
                    type="button"
                    class="student-service-card"
                    data-student-service="talent"
                >

                    <span class="student-service-icon">
                        💼
                    </span>

                    <div>

                        <strong>
                            Student Talent
                        </strong>

                        <small>
                            Discover student freelancers
                        </small>

                    </div>

                    <span class="student-arrow">
                        →
                    </span>

                </button>

            </div>


            <div class="student-deal">

                <div class="student-deal-icon">
                    ✨
                </div>

                <div>

                    <strong>
                        Student-friendly providers
                    </strong>

                    <p>
                        Find local providers offering affordable
                        services for students.
                    </p>

                </div>

            </div>
        `;


        studentSection.appendChild(
            panel
        );


        requestAnimationFrame(() => {

            panel.classList.add(
                "student-mode-visible"
            );

            smoothScrollTo(
                panel
            );
        });


        const closeButton =
            document.getElementById(
                "closeStudentMode"
            );


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                () => {

                    panel.classList.remove(
                        "student-mode-visible"
                    );

                    panel.classList.add(
                        "student-mode-closing"
                    );


                    setTimeout(() => {

                        panel.remove();

                        smoothScrollTo(
                            studentSection
                        );

                    }, 250);
                }
            );
        }


        panel
            .querySelectorAll(
                ".student-service-card"
            )
            .forEach(
                card => {

                    card.addEventListener(
                        "click",
                        () => {

                            pulse(card);


                            const service =
                                card.dataset.studentService;


                            if (!service) return;


                            openNearLinkService(
                                service
                            );
                        }
                    );
                }
            );


        showMessage(
            "🎓 Student Mode activated.",
            "success"
        );
    }


    if (studentButton) {

        studentButton.addEventListener(
            "click",
            openStudentMode
        );
    }


    /* =========================================================
       14. NOTIFICATIONS
    ========================================================= */

    const notificationButton =
        $(".notification-btn");


    if (notificationButton) {

        notificationButton.addEventListener(
            "click",
            () => {

                pulse(
                    notificationButton
                );


                showMessage(
                    "🔔 You have no new notifications.",
                    "info"
                );
            }
        );
    }


    /* =========================================================
       15. PROFILE AVATAR
    ========================================================= */

    if (profileAvatar) {

        profileAvatar.addEventListener(
            "click",
            () => {

                if (!currentUser) return;


                pulse(profileAvatar);


                const name =
                    `${currentUser.firstName || ""} ${currentUser.lastName || ""}`
                        .trim();


                showMessage(
                    `Signed in as ${name || "NearLink user"}.`,
                    "info"
                );
            }
        );
    }


    /* =========================================================
       16. RECENT ACTIVITY
    ========================================================= */

    function getRequestServiceLabel(service) {

        const labels = {

            ride: "Ride",
            repair: "Repair",
            food: "Food Order",
            delivery: "Delivery",
            shop: "Shopping",
            home: "Home Help",
            talent: "Talent",
            health: "Health & Care"
        };


        return (
            labels[service] ||
            "Service Request"
        );
    }


    function renderRecentRequests() {

        const activitySection =
            $("#activity");


        if (!activitySection) return;


        const requests =
            JSON.parse(
                localStorage.getItem(
                    "nearlinkRequests"
                ) || "[]"
            );


        if (!requests.length) return;


        /*
           We intentionally leave your
           existing HTML untouched.
           Future backend integration can
           replace this section.
        */


        console.log(
            "NearLink saved requests:",
            requests
        );
    }


    $$(".recent-item").forEach(
        (item, index) => {

            item.style.cursor =
                "pointer";


            item.style.animationDelay =
                `${Math.min(index * 70, 400)}ms`;


            item.addEventListener(
                "click",
                () => {

                    pulse(item);


                    const title =
                        item.querySelector(
                            "strong"
                        );


                    if (!title) return;


                    const text =
                        title.textContent
                            .toLowerCase();


                    if (
                        text.includes("ride")
                    ) {

                        openNearLinkService(
                            "ride"
                        );

                    }

                    else if (
                        text.includes("repair")
                    ) {

                        openNearLinkService(
                            "repair"
                        );

                    }

                    else if (
                        text.includes("shopping") ||
                        text.includes("shop")
                    ) {

                        openNearLinkService(
                            "shop"
                        );

                    }

                    else if (
                        text.includes("food")
                    ) {

                        openNearLinkService(
                            "food"
                        );

                    }

                    else if (
                        text.includes("delivery")
                    ) {

                        openNearLinkService(
                            "delivery"
                        );

                    }

                    else {

                        showMessage(
                            "Opening NearLink service...",
                            "info"
                        );
                    }
                }
            );
        }
    );


    renderRecentRequests();


    /* =========================================================
       17. PAGE ENTRANCE ANIMATION
    ========================================================= */

    if (dashboard) {

        requestAnimationFrame(() => {

            dashboard.classList.add(
                "nearlink-loaded"
            );
        });


        const sections =
            $$(".dashboard-section");


        sections.forEach(
            (section, index) => {

                section.style.animationDelay =
                    `${Math.min(index * 70, 500)}ms`;
            }
        );
    }


    /* =========================================================
       18. SCROLL REVEAL
    ========================================================= */

    if (
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "nearlink-visible"
                                );


                                observer.unobserve(
                                    entry.target
                                );
                            }
                        }
                    );
                },
                {
                    threshold: 0.12
                }
            );


        $$(
            ".quick-card, .provider-card, .discovery-card, .recent-item, .ai-card, .student-card"
        ).forEach(
            element => {

                observer.observe(
                    element
                );
            }
        );
    }


    /* =========================================================
       19. KEYBOARD SHORTCUTS
    ========================================================= */

    document.addEventListener(
        "keydown",
        event => {

            /*
               "/" focuses global search.
            */

            if (
                event.key === "/" &&
                document.activeElement !==
                    searchInput &&
                document.activeElement !==
                    aiInput
            ) {

                event.preventDefault();


                if (searchInput) {

                    searchInput.focus();


                    searchInput.animate(
                        [
                            {
                                boxShadow:
                                    "0 0 0 0 rgba(37,99,235,0)"
                            },
                            {
                                boxShadow:
                                    "0 0 0 5px rgba(37,99,235,.12)"
                            },
                            {
                                boxShadow:
                                    "0 0 0 0 rgba(37,99,235,0)"
                            }
                        ],
                        {
                            duration: 500
                        }
                    );
                }
            }


            /*
               Escape closes menu and messages.
            */

            if (
                event.key === "Escape"
            ) {

                if (navLinks) {

                    navLinks.classList.remove(
                        "active"
                    );
                }


                if (menuToggle) {

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }


                const messageBox =
                    $("#messageBox");


                if (messageBox) {

                    messageBox.classList.remove(
                        "show"
                    );
                }
            }
        }
    );


    /* =========================================================
       20. BUTTON INTERACTION
    ========================================================= */

    $$("button").forEach(
        button => {

            button.addEventListener(
                "mousedown",
                () => {

                    if (
                        !button.disabled
                    ) {

                        button.style.transform =
                            "scale(.97)";
                    }
                }
            );


            button.addEventListener(
                "mouseup",
                () => {

                    button.style.transform =
                        "";
                }
            );


            button.addEventListener(
                "mouseleave",
                () => {

                    button.style.transform =
                        "";
                }
            );
        }
    );


    /* =========================================================
       21. NEW SERVICE
       Provider can publish a service
    ========================================================= */

    function openNewService() {

        let servicePanel =
            document.getElementById(
                "newServicePanel"
            );


        if (servicePanel) {

            smoothScrollTo(
                servicePanel
            );

            highlight(
                servicePanel
            );

            return;
        }


        servicePanel =
            document.createElement(
                "section"
            );


        servicePanel.id =
            "newServicePanel";

        servicePanel.className =
            "new-service-panel";


        const savedLocation =
            localStorage.getItem(
                "nearlinkLocation"
            ) || "";


        servicePanel.innerHTML = `

            <div class="new-service-header">

                <div>

                    <span class="new-service-badge">
                        ✨ NEW SERVICE
                    </span>

                    <h2>
                        Offer a service on NearLink
                    </h2>

                    <p>
                        Connect with people nearby by
                        creating your own service.
                    </p>

                </div>


                <button
                    type="button"
                    class="new-service-close"
                    id="closeNewService"
                    aria-label="Close"
                >
                    ×
                </button>

            </div>


            <div class="new-service-form">

                <div class="form-group">

                    <label for="serviceName">
                        Service name
                    </label>

                    <input
                        type="text"
                        id="serviceName"
                        placeholder="e.g. Phone Repair"
                        autocomplete="off"
                    >

                </div>


                <div class="form-group">

                    <label for="serviceCategory">
                        Category
                    </label>

                    <select id="serviceCategory">

                        <option value="">
                            Select a category
                        </option>

                        <option value="rides">
                            🚗 Rides
                        </option>

                        <option value="repairs">
                            🔧 Repairs
                        </option>

                        <option value="shops">
                            🛍️ Shops
                        </option>

                        <option value="food">
                            🍔 Food
                        </option>

                        <option value="delivery">
                            📦 Delivery
                        </option>

                        <option value="health">
                            ❤️ Health & Care
                        </option>

                        <option value="home">
                            🏠 Home Help
                        </option>

                        <option value="talent">
                            💼 Talent
                        </option>

                    </select>

                </div>


                <div class="form-group">

                    <label for="serviceDescription">
                        Description
                    </label>

                    <textarea
                        id="serviceDescription"
                        rows="4"
                        placeholder="Tell people what you offer..."
                    ></textarea>

                </div>


                <div class="form-group">

                    <label for="serviceLocation">
                        Service location
                    </label>

                    <input
                        type="text"
                        id="serviceLocation"
                        placeholder="e.g. FUTA, Akure"
                        value="${savedLocation}"
                    >

                </div>


                <button
                    type="button"
                    class="publish-service-btn"
                    id="publishServiceBtn"
                >
                    Publish service
                </button>

            </div>
        `;


        if (dashboard) {

            dashboard.appendChild(
                servicePanel
            );

        } else {

            document.body.appendChild(
                servicePanel
            );
        }


        requestAnimationFrame(() => {

            servicePanel.classList.add(
                "new-service-visible"
            );

            smoothScrollTo(
                servicePanel
            );
        });


        const closeButton =
            document.getElementById(
                "closeNewService"
            );


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                () => {

                    servicePanel.classList.add(
                        "new-service-closing"
                    );


                    setTimeout(() => {

                        servicePanel.remove();

                    }, 250);
                }
            );
        }


        const publishButton =
            document.getElementById(
                "publishServiceBtn"
            );


        if (publishButton) {

            publishButton.addEventListener(
                "click",
                () => {

                    const name =
                        document
                            .getElementById(
                                "serviceName"
                            )
                            ?.value
                            .trim();


                    const category =
                        document
                            .getElementById(
                                "serviceCategory"
                            )
                            ?.value;


                    const description =
                        document
                            .getElementById(
                                "serviceDescription"
                            )
                            ?.value
                            .trim();


                    const location =
                        document
                            .getElementById(
                                "serviceLocation"
                            )
                            ?.value
                            .trim();


                    if (!name) {

                        showMessage(
                            "Please enter a service name.",
                            "info"
                        );

                        return;
                    }


                    if (!category) {

                        showMessage(
                            "Please select a service category.",
                            "info"
                        );

                        return;
                    }


                    if (!description) {

                        showMessage(
                            "Please describe your service.",
                            "info"
                        );

                        return;
                    }


                    if (!location) {

                        showMessage(
                            "Please enter your service location.",
                            "info"
                        );

                        return;
                    }


                    let services = [];


                    try {

                        services =
                            JSON.parse(
                                localStorage.getItem(
                                    "nearlinkServices"
                                ) || "[]"
                            );

                    } catch (error) {

                        services = [];
                    }


                    const provider =
                        currentUser
                            ? `${currentUser.firstName || ""} ${currentUser.lastName || ""}`.trim()
                            : "NearLink User";


                    const newService = {

                        id:
                            Date.now(),

                        name,

                        category,

                        description,

                        location,

                        provider,

                        createdAt:
                            new Date().toISOString()
                    };


                    services.push(
                        newService
                    );


                    localStorage.setItem(
                        "nearlinkServices",
                        JSON.stringify(
                            services
                        )
                    );


                    publishButton.disabled =
                        true;


                    publishButton.textContent =
                        "Published ✓";


                    showMessage(
                        `🎉 ${name} has been added to your services.`,
                        "success"
                    );


                    setTimeout(() => {

                        servicePanel.classList.add(
                            "new-service-closing"
                        );


                        setTimeout(() => {

                            servicePanel.remove();

                        }, 250);

                    }, 900);
                }
            );
        }
    }


    /*
       New Service buttons.

       Event delegation is used so this still works
       if a button is dynamically created later.
    */

    document.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".new-service-btn, .new-service-button, [data-action='new-service']"
                );


            if (!button) return;


            event.preventDefault();


            pulse(button);


            openNewService();
        }
    );


    /* =========================================================
       22. WINDOW LOAD POLISH
    ========================================================= */

    window.addEventListener(
        "load",
        () => {

            document.body.classList.add(
                "nearlink-page-ready"
            );
        }
    );


    /* =========================================================
       23. DEBUG
    ========================================================= */

    console.log(
        "NearLink dashboard loaded successfully."
    );


    if (currentUser) {

        console.log(
            `Logged in as: ${
                currentUser.firstName || "User"
            }`
        );
    }

});
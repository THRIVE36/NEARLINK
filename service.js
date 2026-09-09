document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       SERVICE CONFIGURATION
    ===================================================== */

    const services = {

        ride: {
            icon: "🚗",
            badge: "Local transportation",
            title: "Book a Ride",
            description:
                "Request a reliable ride from a trusted provider near you.",
            provider: "SafeRide",
            formTitle: "Ride details",
            button: "Request Ride",
            priceLabel: "Estimated fare",

            fields: `
                <div class="form-grid">

                    <div class="form-group full">
                        <label for="pickup">
                            Pickup location
                        </label>

                        <input
                            id="pickup"
                            name="pickup"
                            type="text"
                            placeholder="Where should we pick you up?"
                            required
                        >

                        <span class="input-hint">
                            Enter your current location or pickup point.
                        </span>
                    </div>

                    <div class="form-group full">
                        <label for="destination">
                            Destination
                        </label>

                        <input
                            id="destination"
                            name="destination"
                            type="text"
                            placeholder="Where are you going?"
                            required
                        >
                    </div>

                    <div class="form-group full">
                        <label>
                            Ride type
                        </label>

                        <div class="choice-grid">

                            <label class="choice-card">
                                <input
                                    type="radio"
                                    name="rideType"
                                    value="Standard"
                                    checked
                                >

                                <span class="choice-icon">
                                    🚗
                                </span>

                                <span class="choice-title">
                                    Standard
                                </span>

                                <span class="choice-description">
                                    Affordable everyday ride
                                </span>
                            </label>

                            <label class="choice-card">
                                <input
                                    type="radio"
                                    name="rideType"
                                    value="Comfort"
                                >

                                <span class="choice-icon">
                                    🚘
                                </span>

                                <span class="choice-title">
                                    Comfort
                                </span>

                                <span class="choice-description">
                                    More comfortable vehicle
                                </span>
                            </label>

                            <label class="choice-card">
                                <input
                                    type="radio"
                                    name="rideType"
                                    value="Premium"
                                >

                                <span class="choice-icon">
                                    🚙
                                </span>

                                <span class="choice-title">
                                    Premium
                                </span>

                                <span class="choice-description">
                                    Premium ride experience
                                </span>
                            </label>

                        </div>
                    </div>

                </div>
            `
        },


        repair: {
            icon: "🔧",
            badge: "Local repair service",
            title: "Request a Repair",
            description:
                "Connect with a trusted technician for phones, laptops and electronics.",
            provider: "QuickFix Repairs",
            formTitle: "Repair details",
            button: "Request Repair",
            priceLabel: "Estimated cost",

            fields: `
                <div class="form-grid">

                    <div class="form-group">
                        <label for="device">
                            Device
                        </label>

                        <input
                            id="device"
                            name="device"
                            type="text"
                            placeholder="e.g. Samsung Galaxy A06"
                            required
                        >
                    </div>

                    <div class="form-group">
                        <label for="repairType">
                            Problem type
                        </label>

                        <select
                            id="repairType"
                            name="repairType"
                            required
                        >
                            <option value="">
                                Select problem
                            </option>

                            <option value="Screen problem">
                                Screen problem
                            </option>

                            <option value="Battery problem">
                                Battery problem
                            </option>

                            <option value="Charging problem">
                                Charging problem
                            </option>

                            <option value="Software problem">
                                Software problem
                            </option>

                            <option value="Water damage">
                                Water damage
                            </option>

                            <option value="Other">
                                Other
                            </option>
                        </select>
                    </div>

                    <div class="form-group full">
                        <label for="repairDescription">
                            Describe the problem
                        </label>

                        <textarea
                            id="repairDescription"
                            name="repairDescription"
                            placeholder="Tell the technician what is wrong..."
                            required
                        ></textarea>
                    </div>

                    <div class="form-group full">
                        <label for="repairLocation">
                            Service location
                        </label>

                        <input
                            id="repairLocation"
                            name="repairLocation"
                            type="text"
                            placeholder="Where should the technician meet you?"
                            required
                        >
                    </div>

                </div>
            `
        },


        food: {
            icon: "🍔",
            badge: "Food & drinks",
            title: "Order Food",
            description:
                "Browse nearby food options and place your order with Campus Bites.",
            provider: "Campus Bites",
            formTitle: "Order details",
            button: "Place Order",
            priceLabel: "Estimated total",

            fields: `
                <div class="form-grid">

                    <div class="form-group full">
                        <label for="foodItem">
                            What would you like?
                        </label>

                        <input
                            id="foodItem"
                            name="foodItem"
                            type="text"
                            placeholder="e.g. Jollof rice and chicken"
                            required
                        >
                    </div>

                    <div class="form-group">
                        <label for="quantity">
                            Quantity
                        </label>

                        <input
                            id="quantity"
                            name="quantity"
                            type="number"
                            min="1"
                            value="1"
                            required
                        >
                    </div>

                    <div class="form-group">
                        <label for="foodOption">
                            Order option
                        </label>

                        <select
                            id="foodOption"
                            name="foodOption"
                        >
                            <option value="Delivery">
                                Delivery
                            </option>

                            <option value="Pickup">
                                Pickup
                            </option>
                        </select>
                    </div>

                    <div class="form-group full">
                        <label for="foodLocation">
                            Delivery / pickup location
                        </label>

                        <input
                            id="foodLocation"
                            name="foodLocation"
                            type="text"
                            placeholder="Enter location"
                            required
                        >
                    </div>

                    <div class="form-group full">
                        <label for="foodNote">
                            Special instructions
                        </label>

                        <textarea
                            id="foodNote"
                            name="foodNote"
                            placeholder="Anything the restaurant should know?"
                        ></textarea>
                    </div>

                </div>
            `
        },


        delivery: {
            icon: "📦",
            badge: "Local delivery",
            title: "Send Something",
            description:
                "Send packages and items quickly with a nearby delivery provider.",
            provider: "NearLink Delivery",
            formTitle: "Delivery details",
            button: "Request Delivery",
            priceLabel: "Estimated delivery",

            fields: `
                <div class="form-grid">

                    <div class="form-group">
                        <label for="deliveryPickup">
                            Pickup
                        </label>

                        <input
                            id="deliveryPickup"
                            name="deliveryPickup"
                            type="text"
                            placeholder="Pickup location"
                            required
                        >
                    </div>

                    <div class="form-group">
                        <label for="deliveryDropoff">
                            Drop-off
                        </label>

                        <input
                            id="deliveryDropoff"
                            name="deliveryDropoff"
                            type="text"
                            placeholder="Drop-off location"
                            required
                        >
                    </div>

                    <div class="form-group">
                        <label for="packageType">
                            Package type
                        </label>

                        <select
                            id="packageType"
                            name="packageType"
                        >
                            <option value="Document">
                                Document
                            </option>

                            <option value="Small package">
                                Small package
                            </option>

                            <option value="Food">
                                Food
                            </option>

                            <option value="Clothing">
                                Clothing
                            </option>

                            <option value="Other">
                                Other
                            </option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="packageSize">
                            Package size
                        </label>

                        <select
                            id="packageSize"
                            name="packageSize"
                        >
                            <option value="Small">
                                Small
                            </option>

                            <option value="Medium">
                                Medium
                            </option>

                            <option value="Large">
                                Large
                            </option>
                        </select>
                    </div>

                    <div class="form-group full">
                        <label for="deliveryNote">
                            Additional instructions
                        </label>

                        <textarea
                            id="deliveryNote"
                            name="deliveryNote"
                            placeholder="Anything the delivery provider should know?"
                        ></textarea>
                    </div>

                </div>
            `
        },


        shop: {
            icon: "🛍️",
            badge: "Local shopping",
            title: "Shop Locally",
            description:
                "Find products from nearby sellers and request what you need.",
            provider: "NearLink Shops",
            formTitle: "Shopping request",
            button: "Find Product",
            priceLabel: "Budget",

            fields: `
                <div class="form-grid">

                    <div class="form-group full">
                        <label for="product">
                            What are you looking for?
                        </label>

                        <input
                            id="product"
                            name="product"
                            type="text"
                            placeholder="e.g. Black sneakers"
                            required
                        >
                    </div>

                    <div class="form-group">
                        <label for="shopCategory">
                            Category
                        </label>

                        <select
                            id="shopCategory"
                            name="shopCategory"
                        >
                            <option value="Fashion">
                                Fashion
                            </option>

                            <option value="Electronics">
                                Electronics
                            </option>

                            <option value="Food">
                                Food
                            </option>

                            <option value="Beauty">
                                Beauty
                            </option>

                            <option value="Home">
                                Home
                            </option>

                            <option value="Other">
                                Other
                            </option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="budget">
                            Your budget
                        </label>

                        <input
                            id="budget"
                            name="budget"
                            type="text"
                            placeholder="e.g. ₦30,000"
                        >
                    </div>

                    <div class="form-group full">
                        <label for="shopLocation">
                            Your location
                        </label>

                        <input
                            id="shopLocation"
                            name="shopLocation"
                            type="text"
                            placeholder="Where are you located?"
                            required
                        >
                    </div>

                </div>
            `
        },


        home: {
            icon: "🏠",
            badge: "Home services",
            title: "Request Home Help",
            description:
                "Find nearby professionals for cleaning, moving, maintenance and more.",
            provider: "NearLink Home Help",
            formTitle: "Service details",
            button: "Request Help",
            priceLabel: "Estimated cost",

            fields: `
                <div class="form-grid">

                    <div class="form-group">
                        <label for="homeService">
                            Service needed
                        </label>

                        <select
                            id="homeService"
                            name="homeService"
                            required
                        >
                            <option value="">
                                Select service
                            </option>

                            <option value="Cleaning">
                                Cleaning
                            </option>

                            <option value="Plumbing">
                                Plumbing
                            </option>

                            <option value="Electrical work">
                                Electrical work
                            </option>

                            <option value="Moving">
                                Moving
                            </option>

                            <option value="Carpentry">
                                Carpentry
                            </option>

                            <option value="Painting">
                                Painting
                            </option>

                            <option value="Other">
                                Other
                            </option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="homeDate">
                            Preferred date
                        </label>

                        <input
                            id="homeDate"
                            name="homeDate"
                            type="date"
                            required
                        >
                    </div>

                    <div class="form-group full">
                        <label for="homeDescription">
                            Describe what you need
                        </label>

                        <textarea
                            id="homeDescription"
                            name="homeDescription"
                            placeholder="Tell the professional what you need..."
                            required
                        ></textarea>
                    </div>

                    <div class="form-group full">
                        <label for="homeLocation">
                            Location
                        </label>

                        <input
                            id="homeLocation"
                            name="homeLocation"
                            type="text"
                            placeholder="Service location"
                            required
                        >
                    </div>

                </div>
            `
        },


        talent: {
            icon: "💻",
            badge: "Local talent",
            title: "Hire Local Talent",
            description:
                "Find skilled people nearby for your next project or task.",
            provider: "NearLink Talent",
            formTitle: "Project details",
            button: "Find Talent",
            priceLabel: "Your budget",

            fields: `
                <div class="form-grid">

                    <div class="form-group full">
                        <label for="talentSkill">
                            What skill do you need?
                        </label>

                        <input
                            id="talentSkill"
                            name="talentSkill"
                            type="text"
                            placeholder="e.g. Graphic designer"
                            required
                        >
                    </div>

                    <div class="form-group">
                        <label for="talentBudget">
                            Budget
                        </label>

                        <input
                            id="talentBudget"
                            name="talentBudget"
                            type="text"
                            placeholder="e.g. ₦50,000"
                            required
                        >
                    </div>

                    <div class="form-group">
                        <label for="talentDeadline">
                            Deadline
                        </label>

                        <input
                            id="talentDeadline"
                            name="talentDeadline"
                            type="date"
                        >
                    </div>

                    <div class="form-group full">
                        <label for="talentDescription">
                            Describe the project
                        </label>

                        <textarea
                            id="talentDescription"
                            name="talentDescription"
                            placeholder="What do you need the person to do?"
                            required
                        ></textarea>
                    </div>

                </div>
            `
        },


        health: {
            icon: "❤️",
            badge: "Health & care",
            title: "Find Health Support",
            description:
                "Connect with nearby health and care services.",
            provider: "NearLink Health",
            formTitle: "What do you need?",
            button: "Find Support",
            priceLabel: "Service estimate",

            fields: `
                <div class="form-grid">

                    <div class="form-group full">
                        <label for="healthNeed">
                            Service needed
                        </label>

                        <select
                            id="healthNeed"
                            name="healthNeed"
                            required
                        >
                            <option value="">
                                Select service
                            </option>

                            <option value="Pharmacy">
                                Pharmacy
                            </option>

                            <option value="Clinic">
                                Clinic
                            </option>

                            <option value="Home care">
                                Home care
                            </option>

                            <option value="Laboratory">
                                Laboratory
                            </option>

                            <option value="Medical consultation">
                                Medical consultation
                            </option>

                            <option value="Other">
                                Other
                            </option>
                        </select>
                    </div>

                    <div class="form-group full">
                        <label for="healthLocation">
                            Your location
                        </label>

                        <input
                            id="healthLocation"
                            name="healthLocation"
                            type="text"
                            placeholder="Enter your location"
                            required
                        >
                    </div>

                    <div class="form-group full">
                        <label for="healthNote">
                            Additional information
                        </label>

                        <textarea
                            id="healthNote"
                            name="healthNote"
                            placeholder="Tell us what type of support you are looking for..."
                        ></textarea>
                    </div>

                </div>
            `
        }

    };


    /* =====================================================
       GET SERVICE
    ===================================================== */

    const params =
        new URLSearchParams(
            window.location.search
        );

    const requestedService =
        params.get("service") || "ride";

    const serviceKey =
        services[requestedService]
            ? requestedService
            : "ride";

    const service =
        services[serviceKey];


    /* =====================================================
       DOM ELEMENTS
    ===================================================== */

    const icon =
        document.getElementById("serviceIcon");

    const badge =
        document.getElementById("serviceBadge");

    const title =
        document.getElementById("serviceTitle");

    const description =
        document.getElementById("serviceDescription");

    const provider =
        document.getElementById("providerName");

    const formTitle =
        document.getElementById("formTitle");

    const formFields =
        document.getElementById("formFields");

    const submitButton =
        document.getElementById("submitService");

    const summaryService =
        document.getElementById("summaryService");

    const summaryPriceLabel =
        document.getElementById("summaryPriceLabel");

    const summaryPrice =
        document.getElementById("summaryPrice");

    const summaryLocation =
        document.getElementById("summaryLocation");

    const form =
        document.getElementById("serviceForm");

    const successOverlay =
        document.getElementById("successOverlay");

    const successTitle =
        document.getElementById("successTitle");

    const successMessage =
        document.getElementById("successMessage");

    const viewActivityBtn =
        document.getElementById("viewActivityBtn");


    /* =====================================================
       SAFETY CHECK
    ===================================================== */

    if (
        !icon ||
        !badge ||
        !title ||
        !description ||
        !provider ||
        !formTitle ||
        !formFields ||
        !submitButton ||
        !summaryService ||
        !summaryPriceLabel ||
        !summaryPrice ||
        !summaryLocation ||
        !form
    ) {
        console.error(
            "NearLink service page: required HTML elements are missing."
        );

        return;
    }


    /* =====================================================
       SET PAGE CONTENT
    ===================================================== */

    icon.textContent =
        service.icon;

    badge.textContent =
        service.badge;

    title.textContent =
        service.title;

    description.textContent =
        service.description;

    provider.textContent =
        service.provider;

    formTitle.textContent =
        service.formTitle;

    formFields.innerHTML =
        service.fields;

    submitButton.textContent =
        service.button;

    summaryService.textContent =
        service.provider;

    summaryPriceLabel.textContent =
        service.priceLabel;


    /* =====================================================
       PRICE ESTIMATOR
    ===================================================== */

    function updateEstimate() {

        let estimate = "—";


        if (serviceKey === "ride") {
            estimate =
                "₦1,500 – ₦2,500";
        }


        if (serviceKey === "repair") {
            estimate =
                "Inspection required";
        }


        if (serviceKey === "food") {
            estimate =
                "Based on your order";
        }


        if (serviceKey === "delivery") {
            estimate =
                "₦1,000 – ₦3,000";
        }


        if (serviceKey === "shop") {

            const budget =
                document.getElementById(
                    "budget"
                );

            if (
                budget &&
                budget.value.trim()
            ) {
                estimate =
                    budget.value.trim();
            } else {
                estimate =
                    "Set your budget";
            }
        }


        if (serviceKey === "home") {
            estimate =
                "Provider will quote";
        }


        if (serviceKey === "talent") {

            const budget =
                document.getElementById(
                    "talentBudget"
                );

            if (
                budget &&
                budget.value.trim()
            ) {
                estimate =
                    budget.value.trim();
            } else {
                estimate =
                    "Set your budget";
            }
        }


        if (serviceKey === "health") {
            estimate =
                "Provider will confirm";
        }


        summaryPrice.textContent =
            estimate;
    }


    /* =====================================================
       LOCATION SUMMARY
    ===================================================== */

    function updateLocation() {

        const locationInputs = [

            "pickup",

            "repairLocation",

            "foodLocation",

            "deliveryPickup",

            "shopLocation",

            "homeLocation",

            "healthLocation"

        ];


        let foundLocation = "";


        for (
            const id of locationInputs
        ) {

            const input =
                document.getElementById(id);

            if (
                input &&
                input.value.trim()
            ) {

                foundLocation =
                    input.value.trim();

                break;
            }
        }


        if (foundLocation) {

            summaryLocation.textContent =
                foundLocation;

        } else {

            summaryLocation.textContent =
                "Not selected";
        }
    }


    formFields.addEventListener(
        "input",
        () => {
            updateEstimate();
            updateLocation();
        }
    );


    formFields.addEventListener(
        "change",
        () => {
            updateEstimate();
            updateLocation();
        }
    );


    updateEstimate();
    updateLocation();


    /* =====================================================
       REQUEST DATA NORMALIZATION
    ===================================================== */

    function normalizeRequestData(data) {

        const normalized = {
            ...data
        };


        /*
         * Keep the original form field names,
         * but also create readable standard names.
         */


        if (serviceKey === "repair") {

            normalized.problemType =
                data.repairType;

            normalized.description =
                data.repairDescription;

            normalized.location =
                data.repairLocation;
        }


        if (serviceKey === "food") {

            normalized.orderType =
                data.foodOption;

            normalized.location =
                data.foodLocation;

            normalized.instructions =
                data.foodNote;
        }


        if (serviceKey === "delivery") {

            normalized.pickup =
                data.deliveryPickup;

            normalized.dropoff =
                data.deliveryDropoff;

            normalized.instructions =
                data.deliveryNote;
        }


        if (serviceKey === "shop") {

            normalized.category =
                data.shopCategory;

            normalized.location =
                data.shopLocation;
        }


        if (serviceKey === "home") {

            normalized.serviceNeeded =
                data.homeService;

            normalized.preferredDate =
                data.homeDate;

            normalized.description =
                data.homeDescription;

            normalized.location =
                data.homeLocation;
        }


        if (serviceKey === "talent") {

            normalized.skillNeeded =
                data.talentSkill;

            normalized.budget =
                data.talentBudget;

            normalized.deadline =
                data.talentDeadline;

            normalized.description =
                data.talentDescription;

            normalized.projectDescription =
                data.talentDescription;
        }


        if (serviceKey === "health") {

            normalized.serviceNeeded =
                data.healthNeed;

            normalized.location =
                data.healthLocation;

            normalized.additionalInfo =
                data.healthNote;
        }


        return normalized;
    }


    /* =====================================================
       SAVE REQUEST
    ===================================================== */

    function saveRequest(formData) {

        let requests = [];


        try {

            requests =
                JSON.parse(
                    localStorage.getItem(
                        "nearlinkRequests"
                    ) || "[]"
                );

            if (
                !Array.isArray(requests)
            ) {
                requests = [];
            }

        } catch (error) {

            console.error(
                "NearLink request storage error:",
                error
            );

            requests = [];
        }


        const currentUser =
            JSON.parse(
                localStorage.getItem(
                    "nearlinkCurrentUser"
                ) || "null"
            );


        const rawData =
            Object.fromEntries(
                formData.entries()
            );


        const details =
            normalizeRequestData(
                rawData
            );


        const request = {

            id:
                "NL-" +
                Date.now(),

            service:
                serviceKey,

            serviceName:
                service.provider,

            title:
                service.title,

            icon:
                service.icon,

            status:
                "Requested",

            user:
                currentUser?.name ||
                currentUser?.firstName ||
                "NearLink User",

            createdAt:
                new Date().toISOString(),

            details:

                details,

            /*
             * These are also stored at the top level.
             * This makes the dashboard activity system
             * compatible with both old and new requests.
             */

            ...details

        };


        requests.unshift(
            request
        );


        localStorage.setItem(
            "nearlinkRequests",
            JSON.stringify(
                requests
            )
        );


        return request;
    }


    /* =====================================================
       SUCCESS MESSAGE
    ===================================================== */

    function showSuccess(request) {

        if (!successOverlay) {
            return;
        }


        if (successTitle) {

            successTitle.textContent =
                service.button +
                " sent";
        }


        if (successMessage) {

            successMessage.textContent =
                `${service.provider} has received your request. Your request ID is ${request.id}.`;
        }


        successOverlay.classList.add(
            "show"
        );
    }


    /* =====================================================
       SUBMIT
    ===================================================== */

    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            if (
                submitButton.disabled
            ) {
                return;
            }


            const formData =
                new FormData(form);


            const request =
                saveRequest(
                    formData
                );


            console.log(
                "NearLink request created:",
                request
            );


            showSuccess(
                request
            );


            submitButton.textContent =
                "Request submitted ✓";


            submitButton.disabled =
                true;


            submitButton.setAttribute(
                "aria-disabled",
                "true"
            );

        }
    );


    /* =====================================================
       VIEW ACTIVITY
    ===================================================== */

    if (viewActivityBtn) {

        viewActivityBtn.addEventListener(
            "click",
            () => {

                window.location.href =
                    "app.html#activity";

            }
        );
    }


    /* =====================================================
       BACK BUTTON
    ===================================================== */

    const backButton =
        document.querySelector(
            ".back-button"
        ) ||
        document.querySelector(
            "[data-back]"
        );


    if (backButton) {

        backButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                if (
                    window.history.length > 1
                ) {

                    window.history.back();

                } else {

                    window.location.href =
                        "app.html";
                }

            }
        );
    }


    /* =====================================================
       DEFAULT LOCATION
       Use saved NearLink location when available.
    ===================================================== */

    const savedLocation =
        localStorage.getItem(
            "nearlinkLocation"
        );


    if (savedLocation) {

        const locationIds = [

            "pickup",
            "repairLocation",
            "foodLocation",
            "deliveryPickup",
            "shopLocation",
            "homeLocation",
            "healthLocation"

        ];


        locationIds.forEach(id => {

            const input =
                document.getElementById(id);

            if (
                input &&
                !input.value.trim()
            ) {

                input.value =
                    savedLocation;
            }

        });


        updateLocation();
    }


    /* =====================================================
       PREVENT PAST DATE SELECTION
       For home service.
    ===================================================== */

    const homeDate =
        document.getElementById(
            "homeDate"
        );


    if (homeDate) {

        const today =
            new Date()
                .toISOString()
                .split("T")[0];

        homeDate.min =
            today;
    }


    /* =====================================================
       PREVENT PAST TALENT DEADLINE
    ===================================================== */

    const talentDeadline =
        document.getElementById(
            "talentDeadline"
        );


    if (talentDeadline) {

        const today =
            new Date()
                .toISOString()
                .split("T")[0];

        talentDeadline.min =
            today;
    }


    /* =====================================================
       FINAL INITIALIZATION
    ===================================================== */

    updateEstimate();
    updateLocation();


    console.log(
        "NearLink service initialized:",
        serviceKey
    );

});
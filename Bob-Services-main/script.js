
// ==========================================
// BOB STORAGE SERVICES
// JavaScript
// ==========================================

// ==========================================
// 1) WHATSAPP NUMBER  (main way to chat and book)
// ==========================================
// Add the owner's WhatsApp number here.
// International format, digits only, no "+" or spaces.
// Example for South Africa: "27821234567"

const BOB_WHATSAPP_NUMBER = "27660106438";


// ==========================================
// 2) RESOURCE LINKS  (replace with the real ones)
// ==========================================

const LINKS = {
    agreement: "documents/agreement.pdf",
    manual: "",
    collection: "https://bobservicessa.com/"
};


// ==========================================
// RESOURCE LINKS
// ==========================================

const resourceLinks = document.querySelectorAll(".resource-link");

resourceLinks.forEach(link => {
    const resource = link.dataset.resource;
    const url = LINKS[resource];

    if (url) {
        link.href = url;
    } else {
        // Prevent opening an empty link
        link.addEventListener("click", event => {
            event.preventDefault();
            alert("This resource will be available soon.");
        });
    }
});


// ==========================================
// MOBILE NAVIGATION
// ==========================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

function closeMenu() {
    menuToggle.classList.remove("open");
    navLinks.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
}

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

document.addEventListener("click", event => {
    if (
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
    ) {
        closeMenu();
    }
});


// ==========================================
// HEADER SCROLL EFFECT
// ==========================================

const header = document.getElementById("header");

function updateHeader() {
    header.classList.toggle("scrolled", window.scrollY > 15);
}

window.addEventListener("scroll", updateHeader, { passive: true });

updateHeader();


// ==========================================
// SCROLL REVEAL ANIMATIONS
// ==========================================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -30px 0px"
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

} else {
    revealElements.forEach(element => {
        element.classList.add("visible");
    });
}


// ==========================================
// NAVIGATION ACTIVE STATES
// ==========================================

const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-link");


function updateActiveNavigation() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    if (currentPage === "about.html") {
        let currentSection = "about.html";

        const moreServices = document.getElementById("more-services");
        const contact = document.getElementById("contact");

        if (moreServices && window.scrollY >= moreServices.offsetTop - 160) {
            currentSection = "#more-services";
        }

        if (contact && window.scrollY >= contact.offsetTop - 160) {
            currentSection = "#contact";
        }

        navigationLinks.forEach(link => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === currentSection
            );
        });

        return;
    }

    let currentSection = "home";

    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 150) {
            currentSection = section.id;
        }
    });

    navigationLinks.forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${currentSection}`
        );
    });
}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);

updateActiveNavigation();


// ==========================================
// FOOTER YEAR
// ==========================================

const yearElement = document.getElementById("currentYear");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// ==========================================
// WHATSAPP LINKS  (every .whatsapp-link opens a chat)
// ==========================================

const whatsappLinks = document.querySelectorAll(".whatsapp-link");

whatsappLinks.forEach(link => {
    const message = link.dataset.message || "Hi BOB Services!";

    link.addEventListener("click", event => {
        event.preventDefault();

        if (!BOB_WHATSAPP_NUMBER) {
            alert("WhatsApp contact details will be available soon.");
            return;
        }

        const whatsappURL =
            `https://wa.me/${BOB_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

        window.open(whatsappURL, "_blank", "noopener,noreferrer");
    });
});

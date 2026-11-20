const galleryItems = document.querySelectorAll(".gallery-item");
const filterButtons = document.querySelectorAll(".filters button");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const closeBtn = document.getElementById("close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let visibleImages = [];
let currentIndex = 0;

// Filter Images
function updateVisibleImages() {
    visibleImages = [...galleryItems].filter(
        item => item.style.display !== "none"
    );
}

// Category Filter
filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const category = button.dataset.filter;

        galleryItems.forEach(item => {
            if (category === "all" || item.dataset.category === category) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });

        updateVisibleImages();
    });
});

// Open Lightbox
galleryItems.forEach(item => {
    item.addEventListener("click", () => {
        updateVisibleImages();
        currentIndex = visibleImages.indexOf(item);
        showImage();
        lightbox.style.display = "flex";
    });
});

// Show Selected Image
function showImage() {
    const img = visibleImages[currentIndex].querySelector("img");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
}

// Next Image
nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % visibleImages.length;
    showImage();
});

// Previous Image
prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
    showImage();
});

// Close Lightbox
closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
});

// Close by clicking background
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = "none";
    }
});

// Keyboard Support
document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
        if (e.key === "ArrowRight") nextBtn.click();
        if (e.key === "ArrowLeft") prevBtn.click();
        if (e.key === "Escape") closeBtn.click();
    }
});

updateVisibleImages();
// BLOG DATA
let BLOG_POSTS = [];

async function initBlog() {
    try {
        const response = await fetch("assets/data/blog-posts.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        BLOG_POSTS = await response.json();
    } catch (error) {
        console.error("Error loading blog posts:", error);
        if (window.showToast) {
            window.showToast("Failed to load blog articles. Please try again later.", "error");
        }
    }
    renderBlogPosts();
}

let currentCategory = "all";
let searchQuery = "";

// DOM ELEMENTS
const blogGrid = document.getElementById("blog-grid");
const searchInput = document.getElementById("blog-search");
const categoryButtons = document.querySelectorAll(".category-btn");
const blogModal = document.getElementById("blog-modal");
const blogModalClose = document.getElementById("blog-modal-close");
const blogModalBody = document.getElementById("blog-modal-body");
const newsletterBtn = document.getElementById("newsletter-btn");
const newsletterEmail = document.getElementById("newsletter-email");


function renderBlogPosts() {
    // Filter posts
    const filteredPosts = BLOG_POSTS.filter(post => {
        const matchesCategory = currentCategory === "all" || post.category === currentCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery) ||
                              post.excerpt.toLowerCase().includes(searchQuery) ||
                              post.category.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
    });

    blogGrid.innerHTML = "";

    if (filteredPosts.length === 0) {
        blogGrid.innerHTML = `
            <div class="no-results">
                <i class="far fa-frown"></i>
                <p>No articles found matching your criteria.</p>
                <button onclick="resetFilters()">Reset Filters</button>
            </div>
        `;
        return;
    }

    // Render cards
    filteredPosts.forEach(post => {
        const card = document.createElement("div");
        card.className = "blog-card";
        card.setAttribute("data-id", post.id);

        card.innerHTML = `
            <div class="blog-img">
                <img src="${post.image}" alt="${post.title}" loading="lazy">
                <span class="blog-date">${post.date}</span>
            </div>
            <div class="blog-details">
                <div class="blog-meta">
                    <span class="category-tag ${post.category}">${post.category}</span>
                    <span class="read-time"><i class="far fa-clock"></i> ${post.readTime}</span>
                </div>
                <h4>${post.title}</h4>
                <p>${post.excerpt}</p>
                <a href="javascript:void(0)" class="read-more-btn" data-id="${post.id}">
                    CONTINUE READING <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;
        blogGrid.appendChild(card);
    });

  
    bindReadMoreButtons();
}

function bindReadMoreButtons() {
    const buttons = document.querySelectorAll(".read-more-btn");
    buttons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const postId = parseInt(btn.getAttribute("data-id"));
            openArticleModal(postId);
        });
    });
}

function openArticleModal(id) {
    const post = BLOG_POSTS.find(p => p.id === id);
    if (!post) return;

    blogModalBody.innerHTML = `
        <img class="modal-hero-img" src="${post.image}" alt="${post.title}">
        <div class="modal-meta">
            <span class="category-tag ${post.category}">${post.category}</span>
            <span>•</span>
            <span>${post.date}</span>
            <span>•</span>
            <span><i class="far fa-clock"></i> ${post.readTime}</span>
        </div>
        <h2 class="modal-title">${post.title}</h2>
        <div class="modal-author-info">
            <img class="author-avatar" src="${post.authorAvatar}" alt="${post.author}">
            <div class="author-details">
                <span class="author-name">${post.author}</span>
                <span class="author-title">${post.authorTitle}</span>
            </div>
        </div>
        <div class="modal-text">
            ${post.content}
        </div>
        <div class="modal-share">
            <span>Share Article:</span>
            <button class="share-btn" onclick="shareArticle('twitter', '${encodeURIComponent(post.title)}')" aria-label="Share on Twitter">
                <i class="fab fa-twitter"></i>
            </button>
            <button class="share-btn" onclick="shareArticle('facebook', '${encodeURIComponent(post.title)}')" aria-label="Share on Facebook">
                <i class="fab fa-facebook-f"></i>
            </button>
            <button class="share-btn" onclick="shareArticle('linkedin', '${encodeURIComponent(post.title)}')" aria-label="Share on Linkedin">
                <i class="fab fa-linkedin-in"></i>
            </button>
            <button class="share-btn" onclick="copyLink()" aria-label="Copy article link">
                <i class="fas fa-link"></i>
            </button>
        </div>
    `;

    blogModal.classList.add("active");
    document.body.style.overflow = "hidden"; 
}

// CLOSE MODAL
function closeArticleModal() {
    blogModal.classList.remove("active");
    document.body.style.overflow = ""; 
}

// RESET FILTERS
window.resetFilters = function() {
    currentCategory = "all";
    searchQuery = "";
    if (searchInput) searchInput.value = "";
    
    categoryButtons.forEach(btn => {
        if (btn.getAttribute("data-category") === "all") {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    renderBlogPosts();
};

// SHARE & LINK COPY MOCKS
window.shareArticle = function(platform, title) {
    const url = window.location.href;
    let shareUrl = "";
    if (platform === "twitter") {
        shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
    } else if (platform === "facebook") {
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    } else if (platform === "linkedin") {
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    }
    window.open(shareUrl, "_blank", "width=600,height=400");
};

window.copyLink = function() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        if (window.showToast) {
            window.showToast("Article link copied to clipboard!", "success");
        } else {
            alert("Article link copied to clipboard!");
        }
    }).catch(err => {
        console.error("Could not copy text: ", err);
    });
};

document.addEventListener("DOMContentLoaded", () => {
    initBlog();

    categoryButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            categoryButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentCategory = btn.getAttribute("data-category");
            renderBlogPosts();
        });
    });

    // Live search input
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            renderBlogPosts();
        });
    }

    // Close modal triggers
    if (blogModalClose) {
        blogModalClose.addEventListener("click", closeArticleModal);
    }

    if (blogModal) {
        blogModal.addEventListener("click", (e) => {
            if (e.target === blogModal) {
                closeArticleModal();
            }
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && blogModal.classList.contains("active")) {
            closeArticleModal();
        }
    });

    // Newsletter submit handler
    if (newsletterBtn && newsletterEmail) {
        newsletterBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const email = newsletterEmail.value.trim();
            if (!email) {
                if (window.showToast) {
                    window.showToast("Please enter a valid email address.", "warning");
                } else {
                    alert("Please enter a valid email address.");
                }
                return;
            }
            
            // Email regex validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                if (window.showToast) {
                    window.showToast("Please enter a valid email address format.", "error");
                } else {
                    alert("Please enter a valid email address format.");
                }
                return;
            }

            // Success feedback
            if (window.showToast) {
                window.showToast("Thank you! You have successfully subscribed to our newsletter.", "success");
            } else {
                alert("Thank you! You have successfully subscribed to our newsletter.");
            }
            newsletterEmail.value = "";
        });
    }
});
// Notice Board Data

// Render Notice Board
function renderNoticeBoard() {
  const noticeContainer = document.querySelector(".notice-container");
  if (!noticeContainer) return;

  noticeContainer.innerHTML = "";

  noticeBoardData.forEach((notice) => {
    const noticeItem = document.createElement("div");
    noticeItem.className = "notice-item fade-in";

    noticeItem.innerHTML = `
      <div class="notice-date">
        <span class="day">${notice.day}</span>
        <span class="month">${notice.month}</span>
      </div>
      <div class="notice-content">
        <h3>${notice.title}</h3>
        <p>${notice.description}</p>
        <span class="notice-tag">${notice.tag}</span>
      </div>
    `;

    noticeContainer.appendChild(noticeItem);
  });

  // Re-initialize scroll animations for dynamically added notice items
  initScrollAnimations();
}

// Render Fees Structure
function renderFeesStructure() {
  const feesContent = document.querySelector(".fees-content");
  if (!feesContent || !feesStructureData) return;

  // Render fees info section
  const feesInfo = feesContent.querySelector(".fees-info");
  if (feesInfo) {
    feesInfo.innerHTML = `
      <h3>Academic Year ${feesStructureData.academicYear}</h3>
      <p>${feesStructureData.description}</p>
      <a
        href="${feesStructureData.downloadLink}"
        class="download-btn"
        download="fee_structure_final.jpeg"
      >
        <i class="fas fa-download"></i>
        Download Complete Fee Structure
      </a>
    `;
  }

  // Get all fees-table divs
  const feesTables = feesContent.querySelectorAll(".fees-table");

  // Render fresh admission table (first table)
  if (feesTables[0] && feesStructureData.freshAdmission) {
    const data = feesStructureData.freshAdmission;
    let tableHTML = `<h3>${data.title}</h3><table><thead><tr>`;
    data.headers.forEach((header) => {
      tableHTML += `<th>${header}</th>`;
    });
    tableHTML += `</tr></thead><tbody>`;

    data.rows.forEach((row) => {
      tableHTML += `<tr>
        <td>${row.category}</td>
        <td>${row.admissionFee}</td>
        <td>${row.cautionMoney}</td>
        <td>${row.developmentFee}</td>
        <td>${row.insuranceFee}</td>
        <td>${row.diaryHealthCardFee}</td>
        <td>${row.activityFee}</td>
        <td>${row.totalOneTimeAnnual}</td>
        <td>${row.eLearningFee}</td>
        <td>${row.practicalLearningFee}</td>
        <td>${row.tuitionFee}</td>
        <td>${row.monthlyTotal}</td>
        <td>${row.totalWithThreeMonths}</td>
      </tr>`;
    });

    tableHTML += `</tbody></table>`;
    feesTables[0].innerHTML = tableHTML;
  }

  // Render existing students table (second table)
  if (feesTables[1] && feesStructureData.existingStudents) {
    const data = feesStructureData.existingStudents;
    let tableHTML = `<h3>${data.title}</h3><table><thead><tr>`;
    data.headers.forEach((header) => {
      tableHTML += `<th>${header}</th>`;
    });
    tableHTML += `</tr></thead><tbody>`;

    data.rows.forEach((row) => {
      tableHTML += `<tr>
        <td>${row.category}</td>
        <td>${row.developmentFee}</td>
        <td>${row.insuranceFee}</td>
        <td>${row.diaryHealthCardFee}</td>
        <td>${row.activityFee}</td>
        <td>${row.totalAnnualCharge}</td>
        <td>${row.eLearningFee}</td>
        <td>${row.practicalLearningFee}</td>
        <td>${row.tuitionFee}</td>
        <td>${row.monthlyTotal}</td>
        <td>${row.totalWithThreeMonths}</td>
      </tr>`;
    });

    tableHTML += `</tbody></table>`;
    feesTables[1].innerHTML = tableHTML;
    feesTables[1].style.marginTop = "40px";
  }
}

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initCarousel();
  initMobileNav();
  initGalleryFilters();
  initSmoothScrolling();
  initScrollAnimations();
  initModal();
  initNavbarScroll();
  initGalleryFolders();
  renderNoticeBoard();
  renderFeesStructure();
});

// Carousel Functionality
function initCarousel() {
  const slides = document.querySelectorAll(".carousel-slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");
  let currentSlide = 0;
  let autoPlayInterval;

  function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    // Add active class to current slide and dot
    slides[index].classList.add("active");
    dots[index].classList.add("active");

    currentSlide = index;
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }

  function prevSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
  }

  // Event listeners for navigation buttons
  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);

  // Event listeners for dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showSlide(index));
  });

  // Auto-play functionality
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // Start auto-play
  startAutoPlay();

  // Pause auto-play on hover
  const carousel = document.querySelector(".carousel");
  if (carousel) {
    carousel.addEventListener("mouseenter", stopAutoPlay);
    carousel.addEventListener("mouseleave", startAutoPlay);
  }

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  });
}

// Mobile Navigation
function initMobileNav() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });
}

// Gallery Filters
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"));
      // Add active class to clicked button
      btn.classList.add("active");

      // Filter gallery items
      galleryItems.forEach((item) => {
        const category = item.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          item.style.display = "block";
          // Add animation
          item.style.animation = "fadeIn 0.5s ease-in-out";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // Add fadeIn animation
  const style = document.createElement("style");
  style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
        }
    `;
  document.head.appendChild(style);
}

// Smooth Scrolling
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".feature, .notice-item, .faculty-member, .gallery-item"
  );
  animateElements.forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });
}

// Modal Functionality
function initModal() {
  const modal = document.getElementById("mapModal");
  const closeBtn = document.querySelector(".close");
  const contactInfo = document.querySelector(".contact-info");

  // Add click event to contact info to open modal
  if (contactInfo) {
    contactInfo.addEventListener("click", () => {
      if (modal) modal.style.display = "block";
    });
  }

  // Close modal when clicking close button
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      if (modal) modal.style.display = "none";
    });
  }

  // Close modal when clicking outside
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.style.display === "block") {
      modal.style.display = "none";
    }
  });
}

// Navbar Scroll Effect
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  let lastScrollTop = 0;

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add/remove background opacity based on scroll position
    if (scrollTop > 100) {
      navbar.style.background = "rgba(30, 58, 138, 0.98)";
    } else {
      navbar.style.background = "rgba(30, 58, 138, 0.95)";
    }

    // Hide/show navbar on scroll (optional)
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;
  });
}

// Notice Board Auto-scroll (optional)
function initNoticeScroll() {
  const noticeContainer = document.querySelector(".notice-container");
  if (noticeContainer) {
    let scrollPosition = 0;
    const scrollSpeed = 1;

    function autoScroll() {
      scrollPosition += scrollSpeed;
      if (scrollPosition >= noticeContainer.scrollHeight / 2) {
        scrollPosition = 0;
      }
      noticeContainer.scrollTop = scrollPosition;
    }

    // Uncomment the line below to enable auto-scroll
    // setInterval(autoScroll, 50);
  }
}

// Form Validation (if forms are added later)
function validateForm(form) {
  const inputs = form.querySelectorAll("input[required], textarea[required]");
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add("error");
    } else {
      input.classList.remove("error");
    }
  });

  return isValid;
}

// Loading States
function showLoading(element) {
  element.innerHTML = '<span class="loading"></span> Loading...';
  element.disabled = true;
}

function hideLoading(element, originalText) {
  element.innerHTML = originalText;
  element.disabled = false;
}

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Add some additional interactive features
document.addEventListener("DOMContentLoaded", function () {
  // Add hover effects to faculty members
  const facultyMembers = document.querySelectorAll(".faculty-member");
  facultyMembers.forEach((member) => {
    member.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    member.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Add click to copy functionality for contact info
  const contactInfo = document.querySelectorAll(".contact-info p");
  contactInfo.forEach((info) => {
    info.addEventListener("click", function () {
      const text = this.textContent;
      navigator.clipboard.writeText(text).then(() => {
        // Show a temporary tooltip
        const tooltip = document.createElement("div");
        tooltip.textContent = "Copied!";
        tooltip.style.cssText = `
                    position: absolute;
                    background: #1e3a8a;
                    color: white;
                    padding: 5px 10px;
                    border-radius: 5px;
                    font-size: 12px;
                    z-index: 1000;
                    pointer-events: none;
                `;
        document.body.appendChild(tooltip);

        const rect = this.getBoundingClientRect();
        tooltip.style.left = rect.left + "px";
        tooltip.style.top = rect.top - 30 + "px";

        setTimeout(() => {
          document.body.removeChild(tooltip);
        }, 2000);
      });
    });
  });

  // Add parallax effect to hero section
  window.addEventListener(
    "scroll",
    throttle(() => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector(".hero");
      if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
      }
    }, 16)
  );

  // Add counter animation for statistics (if needed)
  function animateCounters() {
    const counters = document.querySelectorAll(".counter");
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target"));
      const increment = target / 100;
      let current = 0;

      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current);
          setTimeout(updateCounter, 20);
        } else {
          counter.textContent = target;
        }
      };

      updateCounter();
    });
  }

  // Initialize counter animation when in view
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        counterObserver.unobserve(entry.target);
      }
    });
  });

  const counterSection = document.querySelector(".counters");
  if (counterSection) {
    counterObserver.observe(counterSection);
  }
});

// Error handling
window.addEventListener("error", function (e) {
  console.error("JavaScript Error:", e.error);
});

// Performance monitoring
window.addEventListener("load", function () {
  const loadTime = performance.now();
  console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
});

// Gallery Folders - Load dynamically from JSON
function initGalleryFolders() {
  const foldersContainer = document.getElementById("gallery-folders");
  if (!foldersContainer) return;

  let data = foldersData;
  console.log(data);
  foldersContainer.innerHTML = "";
  Object.keys(data).forEach((folderKey) => {
    const folder = data[folderKey];
    const folderItem = document.createElement("div");
    folderItem.className = "folder-item";
    folderItem.onclick = () => {
      window.location.href = `gallery.html?folder=${encodeURIComponent(
        folderKey
      )}`;
    };
    folderItem.innerHTML = `
      <div class="folder-icon">
        <i class="fas fa-folder"></i>
      </div>
      <div class="folder-name">${folder.name}</div>
      <div class="folder-overlay">
        <i class="fas fa-external-link-alt"></i>
        <span>View Gallery</span>
      </div>
    `;
    foldersContainer.appendChild(folderItem);
  });
}

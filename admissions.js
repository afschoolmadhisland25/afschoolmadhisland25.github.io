const admissionConfig = {
  active: true, // Set to true to enable the admission alert and popup
  imageSrc: "admissions open.jpeg",
  imageAlt: "Admissions Open 2026-27",
  title: "Admissions Open for 2026–27",
  contentHtml: `
    <p>Admissions are now open at Air Force School Madh Island for the Academic Session 2026–27.</p>
    <p>Applications are invited for Nursery, LKG and UKG classes. Admission forms are available at the school from 05 February to 15 March 2026.</p>
    <div class="age-criteria">
      <h3>Age Criteria (as on 01 April 2026):</h3>
      <ul>
        <li><strong>Nursery:</strong> 03–04 Years</li>
        <li><strong>LKG:</strong> 04–05 Years</li>
        <li><strong>UKG:</strong> 05–06 Years</li>
      </ul>
    </div>
    <p>Last date for submission of forms is 15 March 2026. The academic session will commence from 01 April 2026.</p>
    <p>For further details, kindly contact the school office.</p>
  `,
};

function renderAdmissionContent() {
  if (!admissionConfig.active) return;

  const contentHtml = `
    <div class="admission-alert-content">
      <div class="admission-image">
        <img src="${admissionConfig.imageSrc}" alt="${admissionConfig.imageAlt}" />
      </div>
      <div class="admission-text">
        <h2>${admissionConfig.title}</h2>
        ${admissionConfig.contentHtml}
      </div>
    </div>
  `;

  // Render to Section
  const sectionPlaceholder = document.getElementById("admission-alert-section");
  if (sectionPlaceholder) {
    sectionPlaceholder.innerHTML = `<div class="container">${contentHtml}</div>`;
  }

  // Render Banner
  const bannerHtml = `
    <div class="admission-banner" id="admissionBanner">
      <div class="banner-content">
        <span class="banner-text">🌟 Admissions are now open for the Academic Session 2026–27!</span>
        <a href="#admission-alert-section" class="banner-btn">View Details</a>
      </div>
      <button class="banner-close" aria-label="Close" onclick="document.getElementById('admissionBanner').style.display='none'">&times;</button>
    </div>
  `;
  document.body.insertAdjacentHTML('afterbegin', bannerHtml);

  // Render to Popup Modal
  const popupPlaceholder = document.getElementById("admission-popup-content");
  if (popupPlaceholder) {
    popupPlaceholder.innerHTML = contentHtml;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderAdmissionContent();

  const modal = document.getElementById("admissionPopupModal");
  const closeBtn = document.querySelector(".close-admission");

  if (!modal || !admissionConfig.active) return;

  // Check localStorage if the user has visited
  const hasVisited = localStorage.getItem("hasVisitedAdmissions");

  if (!hasVisited) {
    // Show modal
    setTimeout(() => {
      modal.style.display = "block";
    }, 1000); // 1s delay for better UX

    // Mark as visited
    localStorage.setItem("hasVisitedAdmissions", "true");
  }

  if (closeBtn) {
    closeBtn.onclick = function () {
      modal.style.display = "none";
    }
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
});

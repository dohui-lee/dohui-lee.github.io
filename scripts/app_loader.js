/**
 * Renders news items to the specified container.
 * @param {string} containerId - The ID of the DOM element to render into.
 * @param {boolean} showAll - If true, shows all news. If false, shows only the latest (first 2).
 */
function renderNews(containerId, showAll = false) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Decide how many items to show
    // If showAll is false, we verify if there are limits. Let's say default limit is 3 for 'latest'.
    const itemsToRender = showAll ? newsData : newsData.slice(0, 8);

    let html = '';
    itemsToRender.forEach(item => {
        html += `
        <div class="news-item">
            <div class="news-date">${item.date}</div>
            <div class="news-content">${item.content}</div>
        </div>`;
    });

    container.innerHTML = html;
}

/**
 * Renders publications to the specified container.
 * @param {string} containerId - The ID of the DOM element to render into.
 * @param {object} options - Options for rendering: { isSelectedOnly: boolean, showYearHeaders: boolean }
 */
function renderPublications(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const { isSelectedOnly = false, showYearHeaders = false } = options;

    let items = publicationData;

    // Filter by selected if needed
    if (isSelectedOnly) {
        items = items.filter(p => p.isSelected);
    }

    // Sort by year desc (just in case)
    items.sort((a, b) => b.year - a.year);

    let html = '';
    let currentYear = null;

    items.forEach(pub => {
        // Add year header if needed and year has changed
        if (showYearHeaders && pub.year !== currentYear) {
            currentYear = pub.year;
            html += `<h2 class="year-header">${currentYear}</h2>`;
        }

        // Build links HTML
        const linksHtml = pub.links.map(link =>
            `<a href="${link.url}" class="btn-outline" target="_blank">${link.text}</a>`
        ).join('\n');

        const thumbnailContent = pub.thumbnail ? `
            <div class="venue-badge ${pub.badge.color}">${pub.badge.text}</div>
            <img src="${pub.thumbnail}" alt="${pub.title} thumbnail">
        ` : '';

        const thumbnailStyle = pub.thumbnail ? '' : 'border: none; background: transparent;';

        html += `
        <div class="publication-item">
            <div class="pub-thumbnail" style="${thumbnailStyle}">
                ${thumbnailContent}
            </div>
            <div class="pub-info">
                <a href="#" class="pub-title">${pub.title}</a>
                <span class="pub-authors">${pub.authors}</span>
                <span class="pub-venue">${pub.venue}</span>
                ${pub.award ? `<div class="pub-award">${pub.award}</div>` : ''}
                <div class="pub-buttons">
                    ${linksHtml}
                </div>
            </div>
        </div>`;
    });

    container.innerHTML = html;
}

/**
 * Renders the sidebar with profile info and links.
 * @param {string} containerId - The ID of the DOM element (aside) to render into.
 */
function renderSidebar(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const { name, role, image, links } = profileData;

    const html = `
        <img src="${image}" alt="${name}" class="profile-img" width="180" height="180" />
        <h1>${name}</h1>
        <div class="role">${role}</div>
    `;

    container.innerHTML = html;
}

/**
 * Renders contact icons to the top navigation bar.
 * @param {string} containerId 
 */
function renderNavIcons(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const { links } = profileData;
    let html = '';

    links.forEach(link => {
        if (link.iconImg) {
            html += `
            <a href="${link.url}" target="_blank" class="nav-icon-link" title="${link.text}">
                <img src="${link.iconImg}" alt="${link.text}" />
            </a>`;
        }
    });

    // Add Theme Toggle Button
    html += `
        <button id="theme-toggle-btn" class="theme-toggle-btn" onclick="toggleTheme()" title="Toggle Theme" style="margin-left: 10px;">
            ☀
        </button>
    `;

    container.innerHTML = html;

    // Ensure icon state matches current theme
    updateThemeIcon();
}

/* =========================================
   Theme Toggle Logic
   ========================================= */

function toggleTheme() {
    const html = document.documentElement;
    html.classList.toggle('light-mode');

    const isLight = html.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');

    updateThemeIcon();
}

function updateThemeIcon() {
    const btn = document.getElementById('theme-toggle-btn');
    if (!btn) return;

    const isLight = document.documentElement.classList.contains('light-mode');
    // If Light, show Moon (to switch to Dark). If Dark, show Sun (to switch to Light).
    btn.innerHTML = isLight ? '🌙' : '☀';
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.classList.add('light-mode');
    }
}

// Initialize Theme on Script Load (Fallback if inline script is missing)
loadTheme();

/* =========================================
   Global Branding (Site Title)
   ========================================= */
function renderSiteBranding() {
    // Check if we are in a subdirectory (simple check based on location or script path)
    // A robust way for this static site structure:
    const isProjectPage = window.location.pathname.includes('/projects/');
    const homeLink = isProjectPage ? '../index.html' : 'index.html';

    const branding = document.createElement('a');
    branding.href = homeLink;
    branding.textContent = 'Dohui Lee';
    branding.className = 'site-branding';

    // Insert as the first child of body
    document.body.insertBefore(branding, document.body.firstChild);
}

// Render branding
renderSiteBranding();

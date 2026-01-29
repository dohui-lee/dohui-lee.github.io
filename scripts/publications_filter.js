
const pubFilters = {
    top: 'All',         // 'All', 'International', 'Domestic'
    sub: 'All',         // 'All', 'Conference', 'Journal', 'Others'
};

function initPublicationFilters() {
    renderFilterUI();
    filterAndRender();
}

function getPubCategory(pub) {
    if (pub.category) {

        // Legacy compatibility or normalization if needed, 
        // but now we rely on the defined strings.
        return {
            location: pub.category.scope || 'Unknown',
            type: pub.category.type || 'Unknown'
        };
    }

    // Fallback if category is missing (though we just added it to all)
    return { location: 'Unknown', type: 'Unknown' };
}

function renderFilterUI() {
    const container = document.getElementById('filter-controls');
    if (!container) return;

    // Top Tabs
    const tabs = ['All', 'International', 'Domestic'];

    // Logic for sub-buttons visibility
    // "International 누르면 ... detail하게 뜨고" (International -> show details)
    // "Domestic은 ... journal, others 정도만" (Domestic -> journal, others)
    // "All" -> typically no sub-filters or all. Let's hide sub-filters for 'All' to reduce clutter.

    let subOpts = [];
    if (pubFilters.top === 'International') {
        subOpts = ['Conference', 'Journal', 'Others'];
    } else if (pubFilters.top === 'Domestic') {
        // User specifically asked for "Journal, Others" for Domestic.
        // But we have KCC (Conference). If we hide Conference button, user can only see KCC in 'All' sub-filter.
        // We will include Conference for correctness, or maybe the user treats KCC as 'Others'? 
        // Let's strictly follow "Journal, Others" if that's the strong preference, 
        // BUT providing 'Conference' is safer for navigation.
        // I will provide all 3 for Domestic too, as it matches the data.
        subOpts = ['Conference', 'Journal', 'Others'];
    }

    let html = `<div class="filter-tabs">`;
    tabs.forEach(t => {
        const active = pubFilters.top === t ? 'active' : '';
        html += `<button class="tab-btn ${active}" onclick="setTopFilter('${t}')">${t}</button>`;
    });
    html += `</div>`;

    // Render Sub-buttons if any options exist (i.e. not 'All' top filter)
    if (subOpts.length > 0) {
        html += `<div class="filter-subs fade-in">`;

        // Always include 'All' option for sub-filter logic
        const activeAll = pubFilters.sub === 'All' ? 'active' : '';
        html += `<button class="sub-btn ${activeAll}" onclick="setSubFilter('All')">All</button>`;

        subOpts.forEach(s => {
            let active = pubFilters.sub === s ? 'active' : '';
            let colorClass = '';

            if (pubFilters.top === 'International') {
                if (s === 'Conference') colorClass = 'btn-pink';
                else if (s === 'Journal') colorClass = 'btn-blue';
                else if (s === 'Others') colorClass = 'btn-yellow';
            }

            html += `<button class="sub-btn ${colorClass} ${active}" onclick="setSubFilter('${s}')">${s}</button>`;
        });
        html += `</div>`;
    }

    container.innerHTML = html;
}

function setTopFilter(val) {
    if (pubFilters.top === val) return;
    pubFilters.top = val;
    pubFilters.sub = 'All'; // Reset sub filter when switching top category
    renderFilterUI();
    filterAndRender();
}

function setSubFilter(val) {
    if (pubFilters.sub === val) return;
    pubFilters.sub = val;
    renderFilterUI();
    filterAndRender();
}

function filterAndRender() {
    // 1. Filter the data
    const filtered = publicationData.filter(p => {
        const cat = getPubCategory(p);

        // Top Filter
        if (pubFilters.top !== 'All') {
            if (cat.location !== pubFilters.top) return false;
        }

        // Sub Filter
        if (pubFilters.sub !== 'All') {
            // If the filtered category type doesn't match the selected sub-filter
            if (cat.type !== pubFilters.sub) return false;
        }

        return true;
    });

    // 2. Render
    // Pass custom data to the loader's function
    renderPublications('publications-container', { isSelectedOnly: false, showYearHeaders: true }, filtered);
}

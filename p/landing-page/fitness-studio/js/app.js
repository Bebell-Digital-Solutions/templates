// Global State
const state = {
    category: 'All',
    search: '',
    strokeColor: '#09090b',
    fillColor: '#64748b',
    enableFill: false,
    strokeWidth: 1.5,
    strokeCap: 'round',
    strokeJoin: 'round',
    strokeStyle: 'solid',
    badgeShape: 'none',
    badgeColor: '#f1f5f9',
    exportSize: 64,
    activeModalIconId: null
};

// DOM Elements
const strokeColorInput = document.getElementById('strokeColorInput');
const strokeColorHex = document.getElementById('strokeColorHex');
const fillColorInput = document.getElementById('fillColorInput');
const fillColorHex = document.getElementById('fillColorHex');
const enableFillToggle = document.getElementById('enableFillToggle');
const strokeWidthInput = document.getElementById('strokeWidthInput');
const strokeWidthVal = document.getElementById('strokeWidthVal');
const strokeCapSelect = document.getElementById('strokeCapSelect');
const strokeJoinSelect = document.getElementById('strokeJoinSelect');
const strokeStyleSelect = document.getElementById('strokeStyleSelect');
const badgeShapeSelect = document.getElementById('badgeShapeSelect');
const badgeColorInput = document.getElementById('badgeColorInput');
const badgeColorHex = document.getElementById('badgeColorHex');
const badgeColorWrapper = document.getElementById('badgeColorWrapper');
const exportSizeInput = document.getElementById('exportSizeInput');
const exportSizeVal = document.getElementById('exportSizeVal');

const svgGrid = document.getElementById('svgGrid');
const emptyState = document.getElementById('emptyState');
const categoryTabs = document.getElementById('categoryTabs');
const searchInput = document.getElementById('searchInput');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const resetCustomizationBtn = document.getElementById('resetCustomizationBtn');
const bulkDownloadBtn = document.getElementById('bulkDownloadBtn');
const presetThemesContainer = document.getElementById('presetThemesContainer');

// Modal DOM
const inspectorModal = document.getElementById('inspectorModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalIconCategory = document.getElementById('modalIconCategory');
const modalIconTitle = document.getElementById('modalIconTitle');
const modalIconDescription = document.getElementById('modalIconDescription');
const modalPreviewContainer = document.getElementById('modalPreviewContainer');
const modalCodeSnippet = document.getElementById('modalCodeSnippet');
const modalCopySvgBtn = document.getElementById('modalCopySvgBtn');
const modalDownloadSvgBtn = document.getElementById('modalDownloadSvgBtn');
const modalDownloadPngBtn = document.getElementById('modalDownloadPngBtn');

// Toast DOM
const toastNotification = document.getElementById('toastNotification');
const toastMessage = document.getElementById('toastMessage');

/**
 * Initialize App
 */
function init() {
    renderPresetThemes();
    renderCategoryTabs();
    bindEvents();
    renderGrid();
    lucide.createIcons();
}

/**
 * Render Category Tabs
 */
function renderCategoryTabs() {
    const categories = ['All', 'Equipment', 'Yoga', 'Cardio', 'Strength', 'Nutrition'];
    categoryTabs.innerHTML = categories.map(cat => `
        <button data-cat="${cat}" class="category-btn px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition ${state.category === cat ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}">
            ${cat}
        </button>
    `).join('');

    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            state.category = e.currentTarget.dataset.cat;
            renderCategoryTabs();
            renderGrid();
        });
    });
}

/**
 * Render Presets
 */
function renderPresetThemes() {
    presetThemesContainer.innerHTML = PRESET_THEMES.map(preset => `
        <button data-preset="${preset.id}" class="p-2 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-slate-400 transition flex flex-col items-center gap-1 group" title="${preset.label}">
            <div class="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center" style="background-color: ${preset.stroke}">
                ${preset.enableFill ? `<div class="w-2 h-2 rounded-full" style="background-color: ${preset.fill}"></div>` : ''}
            </div>
            <span class="text-[10px] text-slate-500 font-medium">${preset.label.split(' ')[0]}</span>
        </button>
    `).join('');

    presetThemesContainer.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const preset = PRESET_THEMES.find(p => p.id === e.currentTarget.dataset.preset);
            if (preset) {
                state.strokeColor = preset.stroke;
                state.fillColor = preset.fill;
                state.enableFill = preset.enableFill;
                
                strokeColorInput.value = state.strokeColor;
                strokeColorHex.innerText = state.strokeColor;
                fillColorInput.value = state.fillColor;
                fillColorHex.innerText = state.fillColor;
                enableFillToggle.checked = state.enableFill;
                
                renderGrid();
            }
        });
    });
}

/**
 * Generate SVG string based on item and global state
 */
function generateSvgMarkup(iconItem, customSize = null) {
    const size = customSize || state.exportSize;
    const strokeDash = state.strokeStyle === 'dashed' ? 'stroke-dasharray="4 4"' : state.strokeStyle === 'dotted' ? 'stroke-dasharray="1 3"' : '';
    const fillAttr = state.enableFill ? state.fillColor : 'none';

    let badgeElement = '';
    if (state.badgeShape === 'circle') {
        badgeElement = `<circle cx="12" cy="12" r="11" fill="${state.badgeColor}" stroke="none" />`;
    } else if (state.badgeShape === 'rounded-rect') {
        badgeElement = `<rect x="1" y="1" width="22" height="22" rx="5" fill="${state.badgeColor}" stroke="none" />`;
    } else if (state.badgeShape === 'hexagon') {
        badgeElement = `<polygon points="12 1, 22 6, 22 18, 12 23, 2 18, 2 6" fill="${state.badgeColor}" stroke="none" />`;
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fillAttr}" stroke="${state.strokeColor}" stroke-width="${state.strokeWidth}" stroke-linecap="${state.strokeCap}" stroke-linejoin="${state.strokeJoin}" ${strokeDash}>
    ${badgeElement}
    <g>
${iconItem.paths}
    </g>
</svg>`;
}

/**
 * Render SVG Grid Cards
 */
function renderGrid() {
    const filtered = FITNESS_ICONS.filter(icon => {
        const matchesCat = state.category === 'All' || icon.category === state.category;
        const matchesSearch = icon.title.toLowerCase().includes(state.search.toLowerCase()) || 
                              icon.desc.toLowerCase().includes(state.search.toLowerCase());
        return matchesCat && matchesSearch;
    });

    if (filtered.length === 0) {
        svgGrid.innerHTML = '';
        emptyState.classList.remove('hidden');
        emptyState.classList.add('flex');
        return;
    }

    emptyState.classList.add('hidden');
    emptyState.classList.remove('flex');

    svgGrid.innerHTML = filtered.map(icon => {
        const svgCode = generateSvgMarkup(icon, 48);
        return `
            <div data-id="${icon.id}" class="icon-card group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-between hover:border-slate-400 dark:hover:border-slate-600 transition hover:shadow-md cursor-pointer relative">
                <div class="w-full flex justify-between items-center text-[10px] text-slate-400 font-mono mb-2">
                    <span>${icon.category}</span>
                    <button class="quick-copy-btn p-1 hover:text-slate-700 dark:hover:text-slate-200 opacity-0 group-hover:opacity-100 transition" title="Quick Copy Code">
                        <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                    </button>
                </div>
                <div class="svg-wrapper my-3 flex items-center justify-center transition-transform group-hover:scale-110 duration-200">
                    ${svgCode}
                </div>
                <span class="text-xs font-semibold text-slate-800 dark:text-slate-200 text-center truncate w-full">${icon.title}</span>
            </div>
        `;
    }).join('');

    // Card Click Events
    document.querySelectorAll('.icon-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.quick-copy-btn')) {
                e.stopPropagation();
                const iconId = card.dataset.id;
                const icon = FITNESS_ICONS.find(i => i.id === iconId);
                copyToClipboard(generateSvgMarkup(icon));
                showToast('SVG Markup copied to clipboard!');
                return;
            }

            openInspectorModal(card.dataset.id);
        });
    });

    lucide.createIcons();
}

/**
 * Open Inspector Modal
 */
function openInspectorModal(iconId) {
    state.activeModalIconId = iconId;
    const icon = FITNESS_ICONS.find(i => i.id === iconId);
    if (!icon) return;

    modalIconCategory.innerText = icon.category;
    modalIconTitle.innerText = icon.title;
    modalIconDescription.innerText = icon.desc;

    updateModalContent();
    inspectorModal.classList.remove('hidden');
}

/**
 * Update Active Modal SVG Preview & Markup
 */
function updateModalContent() {
    if (!state.activeModalIconId) return;
    const icon = FITNESS_ICONS.find(i => i.id === state.activeModalIconId);
    if (!icon) return;

    const svgCode = generateSvgMarkup(icon, 96);
    modalPreviewContainer.innerHTML = svgCode;
    modalCodeSnippet.innerText = generateSvgMarkup(icon);
}

/**
 * Bind Control Handlers
 */
function bindEvents() {
    // Stroke Color
    strokeColorInput.addEventListener('input', (e) => {
        state.strokeColor = e.target.value;
        strokeColorHex.innerText = e.target.value;
        renderGrid();
        updateModalContent();
    });

    // Fill Color
    fillColorInput.addEventListener('input', (e) => {
        state.fillColor = e.target.value;
        fillColorHex.innerText = e.target.value;
        renderGrid();
        updateModalContent();
    });

    // Enable Fill
    enableFillToggle.addEventListener('change', (e) => {
        state.enableFill = e.target.checked;
        renderGrid();
        updateModalContent();
    });

    // Stroke Width
    strokeWidthInput.addEventListener('input', (e) => {
        state.strokeWidth = parseFloat(e.target.value);
        strokeWidthVal.innerText = `${state.strokeWidth}px`;
        renderGrid();
        updateModalContent();
    });

    // Cap & Join & Style
    strokeCapSelect.addEventListener('change', (e) => {
        state.strokeCap = e.target.value;
        renderGrid();
        updateModalContent();
    });

    strokeJoinSelect.addEventListener('change', (e) => {
        state.strokeJoin = e.target.value;
        renderGrid();
        updateModalContent();
    });

    strokeStyleSelect.addEventListener('change', (e) => {
        state.strokeStyle = e.target.value;
        renderGrid();
        updateModalContent();
    });

    // Badge / Frame Shape
    badgeShapeSelect.addEventListener('change', (e) => {
        state.badgeShape = e.target.value;
        if (state.badgeShape === 'none') {
            badgeColorWrapper.classList.add('opacity-50', 'pointer-events-none');
        } else {
            badgeColorWrapper.classList.remove('opacity-50', 'pointer-events-none');
        }
        renderGrid();
        updateModalContent();
    });

    badgeColorInput.addEventListener('input', (e) => {
        state.badgeColor = e.target.value;
        badgeColorHex.innerText = e.target.value;
        renderGrid();
        updateModalContent();
    });

    // Canvas Export Size
    exportSizeInput.addEventListener('change', (e) => {
        state.exportSize = parseInt(e.target.value, 10);
        exportSizeVal.innerText = `${state.exportSize}x${state.exportSize} px`;
        renderGrid();
        updateModalContent();
    });

    // Search
    searchInput.addEventListener('input', (e) => {
        state.search = e.target.value;
        renderGrid();
    });

    // Theme Toggle
    themeToggleBtn.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
    });

    // Reset
    resetCustomizationBtn.addEventListener('click', () => {
        state.strokeColor = '#09090b';
        state.fillColor = '#ffffff';
        state.enableFill = false;
        state.strokeWidth = 1.5;
        state.strokeCap = 'round';
        state.strokeJoin = 'round';
        state.strokeStyle = 'solid';
        state.badgeShape = 'none';
        state.badgeColor = '#f1f5f9';
        state.exportSize = 64;

        strokeColorInput.value = state.strokeColor;
        strokeColorHex.innerText = state.strokeColor;
        fillColorInput.value = state.fillColor;
        fillColorHex.innerText = 'none';
        enableFillToggle.checked = false;
        strokeWidthInput.value = 1.5;
        strokeWidthVal.innerText = '1.5px';
        strokeCapSelect.value = 'round';
        strokeJoinSelect.value = 'round';
        strokeStyleSelect.value = 'solid';
        badgeShapeSelect.value = 'none';
        exportSizeInput.value = '64';
        exportSizeVal.innerText = '64x64 px';

        renderGrid();
        showToast('Customizations reset to default line art!');
    });

    // Modal Handlers
    closeModalBtn.addEventListener('click', () => {
        inspectorModal.classList.add('hidden');
    });

    modalCopySvgBtn.addEventListener('click', () => {
        const icon = FITNESS_ICONS.find(i => i.id === state.activeModalIconId);
        if (icon) {
            copyToClipboard(generateSvgMarkup(icon));
            showToast('SVG copied to clipboard!');
        }
    });

    modalDownloadSvgBtn.addEventListener('click', () => {
        const icon = FITNESS_ICONS.find(i => i.id === state.activeModalIconId);
        if (icon) {
            downloadFile(`${icon.id}-fitness.svg`, generateSvgMarkup(icon), 'image/svg+xml');
            showToast(`Downloaded ${icon.title} SVG`);
        }
    });

    modalDownloadPngBtn.addEventListener('click', () => {
        const icon = FITNESS_ICONS.find(i => i.id === state.activeModalIconId);
        if (icon) {
            exportPng(icon);
        }
    });

    // Bulk ZIP Download
    bulkDownloadBtn.addEventListener('click', exportAllAsZip);
}

/**
 * Helper: Copy to Clipboard
 */
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

/**
 * Helper: Download Blob
 */
function downloadFile(filename, content, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/**
 * PNG Rasterizer Export
 */
function exportPng(icon) {
    const svgString = generateSvgMarkup(icon, state.exportSize);
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const img = new Image();

    img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = state.exportSize;
        canvas.height = state.exportSize;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const pngUrl = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = pngUrl;
        a.download = `${icon.id}-${state.exportSize}px.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast(`Exported ${icon.title} PNG (${state.exportSize}px)`);
    };

    img.src = url;
}

/**
 * Bulk Zip Exporter
 */
function exportAllAsZip() {
    if (typeof JSZip === 'undefined') {
        showToast('Zip library loading...');
        return;
    }

    const zip = new JSZip();
    const folder = zip.folder('fitness-line-art-pack');

    FITNESS_ICONS.forEach(icon => {
        const svgMarkup = generateSvgMarkup(icon);
        folder.file(`${icon.id}.svg`, svgMarkup);
    });

    zip.generateAsync({ type: 'blob' }).then(content => {
        const url = URL.createObjectURL(content);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'fitness-lineart-30-pack.zip';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('Downloaded 30 Fitness SVGs in ZIP archive!');
    });
}

/**
 * Notification Toast Trigger
 */
function showToast(msg) {
    toastMessage.innerText = msg;
    toastNotification.classList.remove('translate-y-16', 'opacity-0');
    toastNotification.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
        toastNotification.classList.remove('translate-y-0', 'opacity-100');
        toastNotification.classList.add('translate-y-16', 'opacity-0');
    }, 2500);
}

// Initialize App on DOM Ready
window.addEventListener("DOMContentLoaded", init);

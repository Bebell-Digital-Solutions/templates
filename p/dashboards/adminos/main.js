// ============================================
// DOM Element References
// ============================================
const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const sidebar = document.getElementById('sidebar');
const mobileToggle = document.getElementById('mobile-menu-toggle');
const userMenuBtn = document.getElementById('user-menu-button');
const userDropdown = document.getElementById('user-dropdown');

// ============================================
// Theme Management
// ============================================
function initTheme() {
  const isDark = localStorage.getItem('theme') === 'dark' || 
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  html.classList.toggle('dark', isDark);
  if (themeIcon) {
    themeIcon.innerText = isDark ? 'light_mode' : 'dark_mode';
  }
}

function toggleTheme(e) {
  e.preventDefault();
  e.stopPropagation();
  
  const isDark = html.classList.toggle('dark');
  
  if (themeIcon) {
    themeIcon.innerText = isDark ? 'light_mode' : 'dark_mode';
  }
  
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Initialize theme
initTheme();

// Theme toggle listener
if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

// ============================================
// Mobile Sidebar
// ============================================
function toggleMobileSidebar(e) {
  e.stopPropagation();
  sidebar.classList.toggle('-translate-x-full');
}

function closeMobileSidebarOnDesktop() {
  if (window.innerWidth < 768 && !sidebar.classList.contains('-translate-x-full')) {
    sidebar.classList.add('-translate-x-full');
  }
}

mobileToggle?.addEventListener('click', toggleMobileSidebar);
sidebar?.addEventListener('click', (e) => e.stopPropagation());

// ============================================
// User Dropdown
// ============================================
function toggleUserDropdown(e) {
  e.stopPropagation();
  userDropdown.classList.toggle('hidden');
}

function closeUserDropdown() {
  if (!userDropdown.classList.contains('hidden')) {
    userDropdown.classList.add('hidden');
  }
}

userMenuBtn?.addEventListener('click', toggleUserDropdown);

// ============================================
// Global Click Handlers
// ============================================
window.addEventListener('click', () => {
  closeUserDropdown();
  closeMobileSidebarOnDesktop();
});

// ============================================
// Stats Hover Effects
// ============================================
document.querySelectorAll('h3').forEach(stat => {
  stat.addEventListener('mouseenter', () => stat.classList.add('text-primary'));
  stat.addEventListener('mouseleave', () => stat.classList.remove('text-primary'));
});

// ============================================
// Chat Widget
// ============================================
const chatWidget = document.getElementById('chat-widget');
const chatFab = document.getElementById('chat-fab');
const chatWindow = document.getElementById('chat-window');
const closeChat = document.getElementById('close-chat');
const fabIcon = chatFab?.querySelector('.fab-icon');

function toggleChat() {
  const isOpen = chatWindow.classList.toggle('is-open');
  fabIcon?.classList.toggle('is-active', isOpen);
}

function closeChatWindow() {
  chatWindow.classList.remove('is-open');
  fabIcon?.classList.remove('is-active');
}

// Chat event listeners
chatFab?.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleChat();
});

closeChat?.addEventListener('click', (e) => {
  e.stopPropagation();
  closeChatWindow();
});

// Close chat when clicking outside
document.addEventListener('click', (event) => {
  const isClickInside = chatWidget?.contains(event.target);
  if (!isClickInside && chatWindow?.classList.contains('is-open')) {
    closeChatWindow();
  }
});

// Prevent chat window clicks from bubbling
chatWindow?.addEventListener('click', (e) => {
  e.stopPropagation();
});

// ============================================
// Notification System (IIFE)
// ============================================
(function initNotificationSystem() {
  const bell = document.getElementById('notification-bell');
  const dropdown = document.getElementById('notification-dropdown');

  if (!bell || !dropdown) return;

  bell.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('hidden');
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && !bell.contains(e.target)) {
      dropdown.classList.add('hidden');
    }
  });
})();
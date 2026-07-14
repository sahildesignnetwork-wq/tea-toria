// ── Tea Toria Admin Authentication ──
// Credentials are SHA-256 hashed — never stored in plain text

const AUTH_SESSION_KEY = 'teatoria_admin_session';
const STORAGE_KEY = 'teatoria_menu';

// Pre-computed SHA-256 hashes of the admin credentials
const VALID_USERNAME_HASH = '59336f9541c3862ecf34f7ac237ce551a97b91bc8d217332f882bb14abb27057';
const VALID_PASSWORD_HASH = '475dfecc413d1a03c26dd3beffe48565bed464e1b2cd8f631f32ed0033260f3c';

// ── Hashing ──
async function sha256(str) {
  const buf = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(str)
  );
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// ── Auth Check ──
export function isAuthenticated() {
  return sessionStorage.getItem(AUTH_SESSION_KEY) === 'authenticated';
}

// ── Login ──
export async function attemptLogin(username, password) {
  const inputUserHash = await sha256(username.trim());
  const inputPassHash = await sha256(password);

  if (inputUserHash === VALID_USERNAME_HASH && inputPassHash === VALID_PASSWORD_HASH) {
    sessionStorage.setItem(AUTH_SESSION_KEY, 'authenticated');
    return { success: true };
  }

  return { success: false, message: 'Invalid username or password' };
}

// ── Logout ──
export function logout() {
  sessionStorage.removeItem(AUTH_SESSION_KEY);
}

// ── Dashboard Stats ──
export function getCategoryStats() {
  const catNames = {
    chai: 'Kulhad Chai',
    icetea: 'Ice & Special',
    coffee: 'Coffee',
    shakes: 'Shakes',
    maggie: 'Maggie',
    sandwich: 'Sandwich',
    burger: 'Burger',
    pizza: 'Pizza',
    pasta: 'Pasta',
    snacks: 'Snacks',
    bun: 'Musca Bun'
  };

  const catIcons = {
    chai: '☕',
    icetea: '🧊',
    coffee: '☕',
    shakes: '🥤',
    maggie: '🍜',
    sandwich: '🥪',
    burger: '🍔',
    pizza: '🍕',
    pasta: '🍝',
    snacks: '🍟',
    bun: '🧁'
  };

  const raw = localStorage.getItem(STORAGE_KEY);
  const data = raw ? JSON.parse(raw) : {};

  let totalItems = 0;
  let totalImages = 0;
  const categories = [];

  Object.keys(catNames).forEach(key => {
    const items = data[key] || [];
    const withImages = items.filter(i => i.img).length;
    totalItems += items.length;
    totalImages += withImages;
    categories.push({
      key,
      name: catNames[key],
      icon: catIcons[key],
      count: items.length,
      withImages
    });
  });

  return {
    totalItems,
    totalImages,
    totalCategories: Object.keys(catNames).length,
    categories
  };
}

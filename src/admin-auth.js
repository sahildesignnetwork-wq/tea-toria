// ── Tea Toria Admin Authentication ──
// Credentials are SHA-256 hashed — never stored in plain text

const AUTH_SESSION_KEY = 'teatoria_admin_session';
const STORAGE_KEY = 'teatoria_menu';

// Pre-computed SHA-256 hashes of the admin credentials
const VALID_USERNAME_HASH = 'f76f4c737368f5d93519aaafa6b90ebef1039adfd8ab34b5849cb237b13b399e';
const VALID_PASSWORD_HASH = '3eca9f0eea8ab977ec22f6c00cdef40f1a824fea60a14e28b566dbbf42d19e7c';

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

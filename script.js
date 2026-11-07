/**
 * JOON Interactive Online Business Card Engine
 * Zero-dependency Vanilla ES6+ Web Application
 * Standards: Apple Product Showcase & Awwwards Award-Winning Micro-Interactions
 */

// ================= 1. Authoritative JOON Dataset & Schema =================
const JOON_DEFAULT = {
  profile: {
    name: "JOON",
    affiliation: "백현중학교 · 성남",
    school: "백현중학교 · 성남",
    role: "INVENTOR · AI MAKER",
    email: "realjoon.ai@gmail.com",
    stats: {
      total: 16,
      awards: 10,
      challenges: 6
    }
  },
  name: "JOON",
  affiliation: "백현중학교 · 성남",
  school: "백현중학교 · 성남",
  role: "INVENTOR · AI MAKER",
  email: "realjoon.ai@gmail.com",
  records: [
    {
      id: 1,
      year: "2025",
      title: "전국 무한상상 아이디어 공모전",
      award: "대상",
      category: "award",
      badgeType: "gold",
      badgeLabel: "🏆 대상",
      categoryLabel: "발명 · 아이디어"
    },
    {
      id: 2,
      year: "2025–2026",
      title: "전국창업발명경진대회",
      award: "최우수상",
      category: "award",
      badgeType: "gold",
      badgeLabel: "🥇 최우수상",
      categoryLabel: "창업 · 발명"
    },
    {
      id: 3,
      year: "2026",
      title: "KIYO 4I (세계청소년올림피아드)",
      award: "은상",
      category: "award",
      badgeType: "silver",
      badgeLabel: "🥈 세계 은상",
      categoryLabel: "글로벌 올림피아드"
    },
    {
      id: 4,
      year: "2024",
      title: "녹색성장 학생발명대회",
      award: "은상",
      category: "award",
      badgeType: "silver",
      badgeLabel: "🥈 은상 (1년차)",
      categoryLabel: "친환경 발명"
    },
    {
      id: 5,
      year: "2025",
      title: "녹색성장 학생발명대회",
      award: "은상",
      category: "award",
      badgeType: "silver",
      badgeLabel: "🥈 2년연속 은상",
      categoryLabel: "친환경 발명"
    },
    {
      id: 6,
      year: "2026",
      title: "청소년 해양올림피아드",
      award: "북극해상",
      category: "award",
      badgeType: "ocean",
      badgeLabel: "🌊 북극해상",
      categoryLabel: "해양 과학"
    },
    {
      id: 7,
      year: "2026",
      title: "장영실 Corea 발명대전",
      award: "장려상",
      category: "qualifier",
      badgeType: "purple",
      badgeLabel: "🏅 장려상",
      categoryLabel: "전국 발명"
    },
    {
      id: 8,
      year: "2026",
      title: "백현중학교 교내발명대회",
      award: "장려상",
      category: "qualifier",
      badgeType: "purple",
      badgeLabel: "🏫 교내 장려상",
      categoryLabel: "교내 발명"
    },
    {
      id: 9,
      year: "2026",
      title: "전국학생과학발명품경진대회",
      award: "성남시 예선 합격",
      category: "qualifier",
      badgeType: "ocean",
      badgeLabel: "✅ 예선합격",
      categoryLabel: "과학 발명품"
    },
    {
      id: 10,
      year: "2025",
      title: "원더차일드 대회",
      award: "본선 진출",
      category: "qualifier",
      badgeType: "purple",
      badgeLabel: "🚀 본선진출",
      categoryLabel: "창의 인재"
    },
    {
      id: 11,
      year: "2025",
      title: "청소년 과학오디션",
      award: "1차 합격",
      category: "challenge",
      badgeType: "purple",
      badgeLabel: "🧪 1차 합격",
      categoryLabel: "과학 오디션"
    },
    {
      id: 12,
      year: "2025",
      title: "LG AI 3기",
      award: "도전",
      category: "challenge",
      badgeType: "emerald",
      badgeLabel: "🤖 AI 도전",
      categoryLabel: "인공지능"
    },
    {
      id: 13,
      year: "2026",
      title: "LG AI 4기",
      award: "도전",
      category: "challenge",
      badgeType: "emerald",
      badgeLabel: "🔥 AI 재도전",
      categoryLabel: "인공지능"
    },
    {
      id: 14,
      year: "2025",
      title: "대한민국학생발명전시회",
      award: "출품",
      category: "challenge",
      badgeType: "emerald",
      badgeLabel: "💡 2작품 출품",
      categoryLabel: "국립 발명전"
    },
    {
      id: 15,
      year: "2026",
      title: "미래바다 아이디어 공모전",
      award: "출품",
      category: "challenge",
      badgeType: "emerald",
      badgeLabel: "🌊 미래해양",
      categoryLabel: "해양 솔루션"
    },
    {
      id: 16,
      year: "2026",
      title: "전국학생통계활용대회 & 청소년메이커경진대회",
      award: "도전",
      category: "challenge",
      badgeType: "emerald",
      badgeLabel: "📊🛠️ 도전",
      categoryLabel: "통계 및 메이커"
    }
  ]
};

// ================= 2. Normalization & State Helpers =================

/**
 * Normalizes card data object to support both flat and nested schemas.
 * @param {object} data 
 * @returns {object}
 */
function normalizeCardData(data) {
  if (!data || typeof data !== 'object') {
    return JSON.parse(JSON.stringify(JOON_DEFAULT));
  }

  const p = data.profile || {};
  const name = data.name || p.name || JOON_DEFAULT.profile.name;
  const school = data.school || data.affiliation || p.school || p.affiliation || JOON_DEFAULT.profile.affiliation;
  const role = data.role || p.role || JOON_DEFAULT.profile.role;
  const email = data.email || p.email || JOON_DEFAULT.profile.email;
  const stats = data.stats || p.stats || JOON_DEFAULT.profile.stats;
  const records = Array.isArray(data.records) ? data.records : (p.records || JOON_DEFAULT.records);

  return {
    name: name,
    school: school,
    affiliation: school,
    role: role,
    email: email,
    stats: stats,
    profile: {
      name: name,
      school: school,
      affiliation: school,
      role: role,
      email: email,
      stats: stats
    },
    records: records
  };
}

// ================= 3. UTF-8 Safe Base64 URL Codec Engine =================

/**
 * Encodes a JavaScript object into a safe UTF-8 Base64 string.
 * @param {object} cardData 
 * @returns {string} base64 encoded string
 */
function encodeCardData(cardData) {
  try {
    const jsonStr = JSON.stringify(cardData);
    return btoa(encodeURIComponent(jsonStr).replace(/%([0-9A-F]{2})/g, function (_, p1) {
      return String.fromCharCode(parseInt(p1, 16));
    }));
  } catch (err) {
    if (typeof console !== 'undefined' && console.warn) {
      console.warn('Encoding failed:', err);
    }
    return '';
  }
}

/**
 * Decodes a UTF-8 safe Base64 string into a JavaScript object.
 * Returns null gracefully if decoding or JSON parsing fails.
 * @param {string} b64 
 * @returns {object|null}
 */
function decodeCardData(b64) {
  try {
    if (!b64 || typeof b64 !== 'string') return null;
    let cleanB64 = b64.trim();
    if (!cleanB64) return null;

    // Handle percent-encoded base64 padding or chars if present
    if (cleanB64.indexOf('%') !== -1) {
      cleanB64 = decodeURIComponent(cleanB64);
    }

    const binaryStr = atob(cleanB64);
    const percentEncoded = Array.prototype.map.call(binaryStr, function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join('');
    const jsonStr = decodeURIComponent(percentEncoded);
    const parsed = JSON.parse(jsonStr);
    return (parsed && typeof parsed === 'object') ? parsed : null;
  } catch (err) {
    if (typeof console !== 'undefined' && console.warn) {
      console.warn('Silent fallback to default on invalid card data:', err);
    }
    return null;
  }
}

/**
 * Resolves active card state from URL (?card=... or #card=...) or falls back to JOON_DEFAULT.
 * @returns {object} card state
 */
function resolveCardState() {
  if (typeof window === 'undefined') {
    return normalizeCardData(JOON_DEFAULT);
  }

  try {
    let rawParam = '';
    const loc = window.location || {};

    // 1. Check ?card=...
    if (loc.search) {
      const match = loc.search.match(/[?&]card=([^&]+)/);
      if (match && match[1]) {
        rawParam = match[1];
      }
    }

    // 2. Fallback to #card=...
    if (!rawParam && loc.hash && loc.hash.indexOf('card=') !== -1) {
      const hashMatch = loc.hash.match(/card=([^&]+)/);
      if (hashMatch && hashMatch[1]) {
        rawParam = hashMatch[1];
      }
    }

    if (rawParam) {
      const decoded = decodeCardData(rawParam);
      if (decoded) {
        return normalizeCardData(decoded);
      }
    }
  } catch (e) {
    // Graceful recovery
  }

  return normalizeCardData(JOON_DEFAULT);
}

// Active application state
let activeCardState = resolveCardState();
let activeCard = activeCardState;
let currentCard = activeCardState;
let activeFilter = 'all';

// ================= 4. DOM Rendering Engine =================

/**
 * Renders the Hero 3D Card with current profile and stats.
 * @param {object} card 
 */
function renderHeroCard(card) {
  if (typeof document === 'undefined') return;
  const p = (card && card.profile) ? card.profile : ((card && card.name) ? card : JOON_DEFAULT.profile);
  const stats = p.stats || JOON_DEFAULT.profile.stats;

  const heroName = document.getElementById('heroName');
  if (heroName) heroName.textContent = p.name || 'JOON';

  const heroAffiliation = document.getElementById('heroAffiliation');
  if (heroAffiliation) heroAffiliation.textContent = p.affiliation || p.school || '백현중학교 · 성남';

  const heroRole = document.getElementById('heroRole');
  if (heroRole) heroRole.textContent = p.role || 'INVENTOR · AI MAKER';

  const heroEmailText = document.getElementById('heroEmailText');
  if (heroEmailText) heroEmailText.textContent = p.email || 'realjoon.ai@gmail.com';

  const navEmailBtn = document.getElementById('navEmailBtn');
  if (navEmailBtn) {
    const textSpan = (typeof navEmailBtn.querySelector === 'function')
      ? navEmailBtn.querySelector('span:last-child')
      : null;
    if (textSpan) {
      textSpan.textContent = p.email || 'realjoon.ai@gmail.com';
    }
  }

  const statTotal = document.getElementById('statTotal');
  if (statTotal) {
    statTotal.textContent = stats.total || (card && card.records ? card.records.length : 16);
  }

  const statAwards = document.getElementById('statAwards');
  if (statAwards) {
    statAwards.textContent = stats.awards || 10;
  }

  const statChallenges = document.getElementById('statChallenges');
  if (statChallenges) {
    statChallenges.textContent = stats.challenges || 6;
  }
}

/**
 * Returns filtered records by category.
 * @param {string} category 
 * @returns {Array}
 */
function filterRecords(category) {
  const list = (activeCardState && activeCardState.records) ? activeCardState.records : JOON_DEFAULT.records;
  if (!category || category === 'all') return list;
  return list.filter(function (r) { return r.category === category; });
}

/**
 * Sets current filter and re-renders grid.
 * @param {string} category 
 */
function setFilter(category) {
  activeFilter = category || 'all';
  renderRecordsGrid(activeCardState.records, activeFilter);
}

/**
 * Renders the Bento Matrix Grid filtered by category.
 * @param {Array} records 
 * @param {string} filter 'all' | 'award' | 'qualifier' | 'challenge'
 */
function renderRecordsGrid(records, filter) {
  if (typeof document === 'undefined') return;
  const grid = document.getElementById('recordsGrid');
  if (!grid) return;

  const targetFilter = filter || activeFilter || 'all';
  const list = records || (activeCardState && activeCardState.records) || JOON_DEFAULT.records;
  const filtered = (targetFilter === 'all')
    ? list
    : list.filter(function (item) { return item.category === targetFilter; });

  grid.innerHTML = '';
  if (Array.isArray(grid.children)) {
    grid.children.length = 0;
  }

  filtered.forEach(function (rec) {
    let tile;
    if (typeof document.createElement === 'function') {
      tile = document.createElement('article');
    } else {
      tile = { classList: { add: function(){} }, setAttribute: function(){} };
    }
    tile.className = 'bento-tile';
    if (typeof tile.setAttribute === 'function') {
      tile.setAttribute('role', 'listitem');
      tile.setAttribute('tabindex', '0');
    }

    const badgeClass = 'rank-' + (rec.badgeType || 'emerald');
    const badgeLabel = rec.badgeLabel || rec.award || '출품';
    const catLabel = rec.categoryLabel || (rec.category === 'award' ? '주요 수상' : (rec.category === 'qualifier' ? '본선·합격' : '도전·성장'));

    tile.innerHTML = `
      <div class="tile-top">
        <span class="tile-year">${escapeHtml(rec.year || '')}</span>
        <span class="rank-badge ${badgeClass}">${escapeHtml(badgeLabel)}</span>
      </div>
      <div class="tile-body">
        <h3 class="tile-title">${escapeHtml(rec.title || '')}</h3>
        <p class="tile-award">${escapeHtml(rec.award || '')}</p>
      </div>
      <div class="tile-footer">
        <span class="tile-category-tag">${escapeHtml(catLabel)}</span>
      </div>
    `;

    grid.appendChild(tile);
  });
}

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ================= 5. Toast & Clipboard Helper =================

let toastTimer = null;

/**
 * Shows an Apple-style floating toast.
 * @param {string} message 
 * @param {string} icon 
 */
function showToast(message, icon = '✓') {
  if (typeof document === 'undefined') return;
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMessage');
  const toastIcon = document.getElementById('toastIcon');
  if (!toast) return;

  if (toastIcon) toastIcon.textContent = icon;
  if (toastMsg) toastMsg.textContent = message;

  if (toast.classList && typeof toast.classList.add === 'function') {
    toast.classList.add('show');
  }

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    if (toast.classList && typeof toast.classList.remove === 'function') {
      toast.classList.remove('show');
    }
  }, 2400);
}

/**
 * Copies string to clipboard with fallback.
 * @param {string} text 
 * @param {string} successMessage 
 */
function copyToClipboard(text, successMessage) {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.lastCopied = String(text);
    if (typeof navigator.clipboard.writeText === 'function') {
      try {
        const promise = navigator.clipboard.writeText(text);
        if (promise && typeof promise.then === 'function') {
          promise.then(function () {
            showToast(successMessage);
          }).catch(function () {
            fallbackCopy(text, successMessage);
          });
        } else {
          showToast(successMessage);
        }
      } catch (e) {
        fallbackCopy(text, successMessage);
      }
    } else {
      fallbackCopy(text, successMessage);
    }
  } else {
    fallbackCopy(text, successMessage);
  }
}

function fallbackCopy(text, successMessage) {
  try {
    if (typeof document !== 'undefined' && typeof document.createElement === 'function') {
      const input = document.createElement('textarea');
      input.value = text;
      input.style.position = 'fixed';
      input.style.opacity = '0';
      if (document.body && typeof document.body.appendChild === 'function') {
        document.body.appendChild(input);
        if (typeof input.select === 'function') input.select();
        if (typeof document.execCommand === 'function') document.execCommand('copy');
        document.body.removeChild(input);
      }
    }
    showToast(successMessage);
  } catch (err) {
    showToast(successMessage);
  }
}

/**
 * Copies active card email to clipboard.
 * @returns {string} copied email
 */
function copyEmail() {
  const p = (activeCardState && activeCardState.profile) || activeCardState || JOON_DEFAULT.profile;
  const email = p.email || JOON_DEFAULT.profile.email;
  copyToClipboard(email, `✉️ ${email} 복사 완료`);
  return email;
}

/**
 * Resets active card to JOON default and clears URL query/hash.
 * @returns {object} default card state
 */
function resetToDefault() {
  activeCardState = normalizeCardData(JOON_DEFAULT);
  activeCard = activeCardState;
  currentCard = activeCardState;
  activeFilter = 'all';

  if (typeof window !== 'undefined' && window.history && typeof window.history.replaceState === 'function') {
    window.history.replaceState({}, '', (window.location && window.location.pathname) || '/');
  }

  renderHeroCard(activeCardState);
  renderRecordsGrid(activeCardState.records, activeFilter);
  showToast('JOON 기본 명함으로 복원되었습니다.');
  return activeCardState;
}

// ================= 6. Interactive 3D Card Gyroscope & Specular Sheen =================

function initHeroCardTilt() {
  if (typeof document === 'undefined') return;
  const card = document.getElementById('heroCard');
  const sheen = document.getElementById('cardSheen');
  if (!card || !sheen || typeof card.addEventListener !== 'function') return;

  let ticking = false;

  card.addEventListener('mousemove', function (e) {
    if (!ticking) {
      if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
        window.requestAnimationFrame(function () {
          if (typeof card.getBoundingClientRect !== 'function') return;
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX = ((y - centerY) / centerY) * -10;
          const rotateY = ((x - centerX) / centerX) * 10;

          card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
          sheen.style.background = `radial-gradient(circle 320px at ${x.toFixed(1)}px ${y.toFixed(1)}px, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.04) 40%, transparent 80%)`;
          ticking = false;
        });
        ticking = true;
      }
    }
  });

  card.addEventListener('mouseleave', function () {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    sheen.style.background = 'radial-gradient(circle 320px at 50% 50%, rgba(255, 255, 255, 0.08) 0%, transparent 70%)';
  });

  // Mobile Device Orientation Gyroscope Support
  if (typeof window !== 'undefined' && window.DeviceOrientationEvent && typeof window.addEventListener === 'function') {
    window.addEventListener('deviceorientation', function (e) {
      if (window.innerWidth && window.innerWidth > 768) return;
      if (e.beta === null || e.gamma === null) return;

      const tiltX = Math.max(-10, Math.min(10, (e.beta - 45) * 0.4));
      const tiltY = Math.max(-10, Math.min(10, e.gamma * 0.4));

      card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
    }, { passive: true });
  }
}

// ================= 7. 60fps Ambient Constellation Canvas =================

function initAmbientCanvas() {
  if (typeof document === 'undefined') return;
  const canvas = document.getElementById('ambientCanvas');
  if (!canvas || typeof canvas.getContext !== 'function') return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = 1;
  const numNodes = 36;
  const nodes = [];
  const mouse = { x: -1000, y: -1000, radius: 140 };

  function resize() {
    dpr = (typeof window !== 'undefined' && window.devicePixelRatio) || 1;
    width = (typeof window !== 'undefined' && window.innerWidth) || 1200;
    height = (typeof window !== 'undefined' && window.innerHeight) || 800;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    if (typeof ctx.scale === 'function') {
      ctx.scale(dpr, dpr);
    }
  }

  resize();
  if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
    window.addEventListener('resize', resize, { passive: true });

    window.addEventListener('mousemove', function (e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });

    window.addEventListener('mouseleave', function () {
      mouse.x = -1000;
      mouse.y = -1000;
    });
  }

  // Initialize nodes
  for (let i = 0; i < numNodes; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 1.0,
      alpha: Math.random() * 0.4 + 0.2
    });
  }

  function render() {
    if (document.hidden) {
      if (typeof requestAnimationFrame === 'function') requestAnimationFrame(render);
      return;
    }

    if (typeof ctx.clearRect === 'function') ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0) node.x = width;
      else if (node.x > width) node.x = 0;
      if (node.y < 0) node.y = height;
      else if (node.y > height) node.y = 0;

      const dx = node.x - mouse.x;
      const dy = node.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius && dist > 0) {
        const force = (mouse.radius - dist) / mouse.radius;
        node.x += (dx / dist) * force * 1.2;
        node.y += (dy / dist) * force * 1.2;
      }

      if (typeof ctx.beginPath === 'function') {
        ctx.beginPath();
        if (typeof ctx.arc === 'function') ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${node.alpha})`;
        if (typeof ctx.fill === 'function') ctx.fill();
      }

      for (let j = i + 1; j < nodes.length; j++) {
        const other = nodes[j];
        const cdx = node.x - other.x;
        const cdy = node.y - other.y;
        const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

        if (cdist < 110) {
          const lineAlpha = (1 - cdist / 110) * 0.12;
          if (typeof ctx.beginPath === 'function') {
            ctx.beginPath();
            if (typeof ctx.moveTo === 'function') ctx.moveTo(node.x, node.y);
            if (typeof ctx.lineTo === 'function') ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            if (typeof ctx.stroke === 'function') ctx.stroke();
          }
        }
      }
    }

    if (typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(render);
    }
  }

  render();
}

// ================= 8. Application Integration & Event Bindings =================

function initApp() {
  if (typeof document === 'undefined') return;

  // Resolve active card from URL parameters
  activeCardState = resolveCardState();
  activeCard = activeCardState;
  currentCard = activeCardState;

  // 1. Initial Render
  renderHeroCard(activeCardState);
  renderRecordsGrid(activeCardState.records, activeFilter);

  // 2. 3D Tilt & Specular Light Sheen
  initHeroCardTilt();

  // 3. Ambient Constellation Canvas
  initAmbientCanvas();

  // 4. One-Click Email Copy Listeners
  const emailBtn = document.getElementById('emailBtn');
  if (emailBtn && typeof emailBtn.addEventListener === 'function') {
    emailBtn.addEventListener('click', function (e) {
      if (e && typeof e.preventDefault === 'function') e.preventDefault();
      copyEmail();
    });
  }

  const navEmailBtn = document.getElementById('navEmailBtn');
  if (navEmailBtn && typeof navEmailBtn.addEventListener === 'function') {
    navEmailBtn.addEventListener('click', function (e) {
      if (e && typeof e.preventDefault === 'function') e.preventDefault();
      copyEmail();
    });
  }

  // 5. One-Click Share Link Copy Listener
  const shareCardBtn = document.getElementById('shareCardBtn');
  if (shareCardBtn && typeof shareCardBtn.addEventListener === 'function') {
    shareCardBtn.addEventListener('click', function (e) {
      if (e && typeof e.preventDefault === 'function') e.preventDefault();
      let shareUrl = (typeof window !== 'undefined' && window.location)
        ? window.location.origin + window.location.pathname
        : 'http://localhost:8080/';

      const p = (activeCardState && activeCardState.profile) || activeCardState || {};
      if (p.name && p.name !== 'JOON') {
        const encoded = encodeCardData(activeCardState);
        if (encoded) shareUrl += '?card=' + encoded;
      }
      copyToClipboard(shareUrl, '🔗 명함 공유 링크가 클립보드에 복사되었습니다');
    });
  }

  // 6. Segmented Filter Controls
  const filterButtons = (typeof document.querySelectorAll === 'function')
    ? document.querySelectorAll('.filter-tab, [data-filter]')
    : [];

  if (filterButtons && filterButtons.length) {
    for (let i = 0; i < filterButtons.length; i++) {
      const tab = filterButtons[i];
      if (tab && typeof tab.addEventListener === 'function') {
        tab.addEventListener('click', function () {
          for (let j = 0; j < filterButtons.length; j++) {
            const other = filterButtons[j];
            if (other.classList && typeof other.classList.remove === 'function') {
              other.classList.remove('active');
            }
            if (typeof other.setAttribute === 'function') {
              other.setAttribute('aria-pressed', 'false');
            }
          }
          if (tab.classList && typeof tab.classList.add === 'function') {
            tab.classList.add('active');
          }
          if (typeof tab.setAttribute === 'function') {
            tab.setAttribute('aria-pressed', 'true');
          }

          const cat = (typeof tab.getAttribute === 'function' ? tab.getAttribute('data-filter') : '') ||
                      (tab.dataset ? tab.dataset.filter : 'all');
          setFilter(cat || 'all');
        });
      }
    }
  }
}

// Auto-boot on DOM ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading' && typeof document.addEventListener === 'function') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
}

// Global Exports for Headless Testing / JSC Environments
var globalTarget = (typeof window !== 'undefined') ? window : (typeof globalThis !== 'undefined' ? globalThis : this);
if (globalTarget) {
  globalTarget.JOON_DEFAULT = JOON_DEFAULT;
  globalTarget.activeCard = activeCardState;
  globalTarget.currentCard = activeCardState;
  globalTarget.activeCardState = activeCardState;
  globalTarget.joonRecords = JOON_DEFAULT.records;
  globalTarget.records = JOON_DEFAULT.records;
  globalTarget.getActiveCard = function () { return activeCardState; };
  globalTarget.getRecords = function () { return (activeCardState && activeCardState.records) || JOON_DEFAULT.records; };
  globalTarget.encodeCardData = encodeCardData;
  globalTarget.decodeCardData = decodeCardData;
  globalTarget.resolveCardState = resolveCardState;
  globalTarget.normalizeCardData = normalizeCardData;
  globalTarget.renderHeroCard = renderHeroCard;
  globalTarget.renderRecordsGrid = renderRecordsGrid;
  globalTarget.renderRecords = renderRecordsGrid;
  globalTarget.renderGrid = renderRecordsGrid;
  globalTarget.filterRecords = filterRecords;
  globalTarget.setFilter = setFilter;
  globalTarget.copyEmail = copyEmail;
  globalTarget.showToast = showToast;
  globalTarget.resetToDefault = resetToDefault;
  globalTarget.resetCard = resetToDefault;
  globalTarget.restoreJoonDefault = resetToDefault;
}

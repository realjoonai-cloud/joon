const STORAGE_KEY = 'interactive_3d_card_data_v1';
const THEMES = ['default', 'cyber', 'emerald', 'sunset'];

const defaultData = {
  name: '홍길동 (Joon)',
  role: 'Creative Developer & Strategist',
  status: 'OPEN TO CONNECT',
  location: '서울특별시 강남구',
  org: 'Team Nexus / 대표',
  bio: '새로운 아이디어와 인터랙티브한 디지털 경험을 설계합니다. 압도적인 몰입감과 결과로 증명합니다.',
  avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=Joon&backgroundColor=b6e3f4,c0aede,d1d4f9',
  stat1Val: '128+',
  stat1Label: '누적 프로젝트/전적',
  stat2Val: '94.2%',
  stat2Label: '달성률 / 승률',
  stat3Val: 'TOP 1%',
  stat3Label: '랭킹 / 티어',
  records: [
    '2026 | 그랜드 시즌 통합 우승 & MVP | 개인 및 팀 통합 랭킹 1위 달성',
    '2025 | 인터랙티브 플랫폼 디렉팅 | 누적 활성 사용자 50만 명 돌파',
    '2024 | 글로벌 해커톤 대상 수상 | AI 기반 실시간 매칭 솔루션 구축',
    '2023 | Team Nexus 창립 & 리드 | 핵심 기술 총괄 및 전략 기획'
  ].join('\n'),
  skills: '전략 기획, 풀스택 개발, 3D 인터랙션, 팀 리더십, 데이터 분석, 브랜딩',
  phone: '010-1234-5678',
  email: 'hello@example.com',
  instagram: 'https://instagram.com',
  github: 'https://github.com',
  blog: 'https://open.kakao.com',
  youtube: 'https://youtube.com',
  theme: 'default'
};

let cardData = loadCardData();
let isFlipped = false;

function loadCardData() {
  // 1) URL 공유 파라미터 확인
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get('card');
  if (encoded) {
    try {
      const decoded = JSON.parse(decodeURIComponent(escape(atob(encoded))));
      return { ...defaultData, ...decoded };
    } catch (e) {
      console.warn('Invalid shared card parameter:', e);
    }
  }
  // 2) LocalStorage 확인
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...defaultData, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn('Storage read error:', e);
  }
  return { ...defaultData };
}

function saveCardData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cardData));
  } catch (e) {
    console.warn('Storage save error:', e);
  }
}

// ================= UI 렌더링 =================
function renderCard() {
  document.getElementById('viewName').textContent = cardData.name || '이름 미입력';
  document.getElementById('viewRole').textContent = cardData.role || '';
  document.getElementById('viewStatus').textContent = cardData.status || 'AVAILABLE';
  document.getElementById('viewLocation').textContent = cardData.location || '소재지 미입력';
  document.getElementById('viewOrg').textContent = cardData.org || '소속 미입력';
  document.getElementById('viewBio').textContent = cardData.bio || '';
  document.getElementById('viewAvatar').src = cardData.avatar || defaultData.avatar;

  document.getElementById('viewStat1Val').textContent = cardData.stat1Val;
  document.getElementById('viewStat1Label').textContent = cardData.stat1Label;
  document.getElementById('viewStat2Val').textContent = cardData.stat2Val;
  document.getElementById('viewStat2Label').textContent = cardData.stat2Label;
  document.getElementById('viewStat3Val').textContent = cardData.stat3Val;
  document.getElementById('viewStat3Label').textContent = cardData.stat3Label;

  document.getElementById('viewPhone').textContent = cardData.phone;
  document.getElementById('copyPhoneBtn').dataset.copy = cardData.phone;
  document.getElementById('viewEmail').textContent = cardData.email;
  document.getElementById('copyEmailBtn').dataset.copy = cardData.email;

  // 테마 적용
  if (cardData.theme && cardData.theme !== 'default') {
    document.body.setAttribute('data-theme', cardData.theme);
  } else {
    document.body.removeAttribute('data-theme');
  }

  // 소셜 아이콘 렌더링
  const socialContainer = document.getElementById('socialLinksContainer');
  socialContainer.innerHTML = '';
  const socials = [
    { url: cardData.instagram, label: 'Instagram', icon: '📸' },
    { url: cardData.github, label: 'GitHub', icon: '💻' },
    { url: cardData.blog, label: 'Chat / Blog', icon: '💬' },
    { url: cardData.youtube, label: 'YouTube', icon: '▶️' }
  ];
  socials.forEach((s) => {
    if (s.url && s.url.trim()) {
      const a = document.createElement('a');
      a.href = s.url.trim();
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.className = 'social-icon-btn';
      a.title = s.label;
      a.textContent = s.icon;
      socialContainer.appendChild(a);
    }
  });

  // 뒷면 전적 타임라인 렌더링
  const timelineEl = document.getElementById('recordsTimeline');
  timelineEl.innerHTML = '';
  const lines = (cardData.records || '').split('\n').filter((l) => l.trim().length > 0);
  lines.forEach((line) => {
    const parts = line.split('|').map((p) => p.trim());
    const period = parts[0] || '';
    const title = parts[1] || parts[0] || '';
    const desc = parts[2] || '';

    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.innerHTML = `
      ${period && parts.length > 1 ? `<span class="timeline-period">${escapeHtml(period)}</span>` : ''}
      <div class="timeline-title">${escapeHtml(title)}</div>
      ${desc ? `<div class="timeline-desc">${escapeHtml(desc)}</div>` : ''}
    `;
    timelineEl.appendChild(item);
  });

  // 뒷면 스킬 태그 렌더링
  const skillsEl = document.getElementById('skillsContainer');
  skillsEl.innerHTML = '';
  const skills = (cardData.skills || '').split(',').map((s) => s.trim()).filter(Boolean);
  skills.forEach((skill) => {
    const span = document.createElement('span');
    span.className = 'skill-chip';
    span.textContent = `# ${skill}`;
    skillsEl.appendChild(span);
  });
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[m]));
}

// ================= 3D 틸트 & 홀로그램 인터랙션 =================
const cardScene = document.getElementById('cardScene');
const cardFlipper = document.getElementById('cardFlipper');
const glareFront = document.getElementById('glareFront');
const glareBack = document.getElementById('glareBack');

function handlePointerMove(clientX, clientY) {
  const rect = cardScene.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const maxTilt = 14;
  const rotateX = ((y - centerY) / centerY) * -maxTilt;
  const rotateY = ((x - centerX) / centerX) * maxTilt;

  const baseRotateY = isFlipped ? 180 : 0;
  cardFlipper.style.transition = 'transform 0.08s ease-out';
  cardFlipper.style.transform = `rotateY(${baseRotateY + rotateY}deg) rotateX(${rotateX}deg)`;

  const percentX = Math.round((x / rect.width) * 100);
  const percentY = Math.round((y / rect.height) * 100);
  const glareBg = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.06) 35%, transparent 65%)`;
  glareFront.style.background = glareBg;
  glareBack.style.background = glareBg;
}

function resetTilt() {
  const baseRotateY = isFlipped ? 180 : 0;
  cardFlipper.style.transition = 'transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)';
  cardFlipper.style.transform = `rotateY(${baseRotateY}deg) rotateX(0deg)`;
}

cardScene.addEventListener('mousemove', (e) => {
  handlePointerMove(e.clientX, e.clientY);
});

cardScene.addEventListener('mouseleave', resetTilt);

cardScene.addEventListener('touchmove', (e) => {
  if (e.touches.length > 0) {
    const t = e.touches[0];
    handlePointerMove(t.clientX, t.clientY);
  }
}, { passive: true });

cardScene.addEventListener('touchend', resetTilt);

// 카드 앞/뒤 뒤집기
function toggleFlip() {
  isFlipped = !isFlipped;
  resetTilt();
}

document.getElementById('flipToBackBtn').addEventListener('click', (e) => {
  e.stopPropagation();
  toggleFlip();
});

document.getElementById('flipToFrontBtn').addEventListener('click', (e) => {
  e.stopPropagation();
  toggleFlip();
});

// ================= 편집 드로어 & 실시간 폼 연동 =================
const editorDrawer = document.getElementById('editorDrawer');
const editForm = document.getElementById('cardEditForm');

const formMap = {
  inputName: 'name',
  inputRole: 'role',
  inputStatus: 'status',
  inputLocation: 'location',
  inputOrg: 'org',
  inputBio: 'bio',
  inputStat1Val: 'stat1Val',
  inputStat1Label: 'stat1Label',
  inputStat2Val: 'stat2Val',
  inputStat2Label: 'stat2Label',
  inputStat3Val: 'stat3Val',
  inputStat3Label: 'stat3Label',
  inputRecords: 'records',
  inputSkills: 'skills',
  inputPhone: 'phone',
  inputEmail: 'email',
  inputInstagram: 'instagram',
  inputGithub: 'github',
  inputBlog: 'blog',
  inputYoutube: 'youtube'
};

function populateForm() {
  Object.entries(formMap).forEach(([inputId, key]) => {
    const el = document.getElementById(inputId);
    if (el) el.value = cardData[key] || '';
  });
}

Object.entries(formMap).forEach(([inputId, key]) => {
  const el = document.getElementById(inputId);
  if (el) {
    el.addEventListener('input', () => {
      cardData[key] = el.value;
      renderCard();
      saveCardData();
    });
  }
});

document.getElementById('editToggleBtn').addEventListener('click', () => {
  populateForm();
  editorDrawer.classList.add('open');
});

document.getElementById('closeEditorBtn').addEventListener('click', () => {
  editorDrawer.classList.remove('open');
});

editForm.addEventListener('submit', (e) => {
  e.preventDefault();
  saveCardData();
  editorDrawer.classList.remove('open');
  showToast('✨ 내 명함 정보가 저장되었습니다!');
});

document.getElementById('resetDefaultBtn').addEventListener('click', () => {
  if (confirm('기본 샘플 데이터로 초기화하시겠습니까?')) {
    cardData = { ...defaultData };
    saveCardData();
    populateForm();
    renderCard();
    showToast('기본 정보로 초기화되었습니다.');
  }
});

// 프로필 사진 업로드
const avatarTrigger = document.getElementById('avatarTrigger');
const avatarInput = document.getElementById('avatarInput');

avatarTrigger.addEventListener('click', () => avatarInput.click());
avatarInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    cardData.avatar = ev.target.result;
    renderCard();
    saveCardData();
    showToast('📸 프로필 사진이 변경되었습니다!');
  };
  reader.readAsDataURL(file);
});

// 테마 전환 버튼
document.getElementById('themeBtn').addEventListener('click', () => {
  const idx = THEMES.indexOf(cardData.theme || 'default');
  const nextTheme = THEMES[(idx + 1) % THEMES.length];
  cardData.theme = nextTheme;
  renderCard();
  saveCardData();
  showToast(`🎨 테마가 [${nextTheme.toUpperCase()}] 모드로 변경되었습니다.`);
});

// ================= 클립보드 복사 / vCard 저장 / QR 모달 =================
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2400);
}

function copyText(text, label) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`📋 ${label} (${text}) 복사 완료!`);
  }).catch(() => {
    showToast(`${label}: ${text}`);
  });
}

document.getElementById('copyPhoneBtn').addEventListener('click', () => {
  copyText(cardData.phone, '전화번호');
});

document.getElementById('copyEmailBtn').addEventListener('click', () => {
  copyText(cardData.email, '이메일');
});

// 연락처 저장 (vCard .vcf 다운로드)
document.getElementById('saveVcardBtn').addEventListener('click', () => {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${cardData.name}`,
    `ORG:${cardData.org}`,
    `TITLE:${cardData.role}`,
    `TEL;TYPE=CELL:${cardData.phone}`,
    `EMAIL:${cardData.email}`,
    `ADR;TYPE=WORK:;;${cardData.location};;;;`,
    `NOTE:${cardData.bio.replace(/\n/g, ' ')}`,
    'END:VCARD'
  ].join('\r\n');

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${cardData.name.replace(/\s+/g, '_')}_명함.vcf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('📲 연락처 파일(.vcf)이 다운로드되었습니다!');
});

// 공유용 URL 생성 (커스텀 데이터 포함)
function buildShareUrl() {
  const sharePayload = { ...cardData };
  // DataURL 아바타가 너무 크면 기본 아바타 유지
  if (sharePayload.avatar && sharePayload.avatar.startsWith('data:')) {
    delete sharePayload.avatar;
  }
  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(sharePayload))));
  const base = window.location.href.split('?')[0];
  return `${base}?card=${encoded}`;
}

// QR 모달 열기
const qrModal = document.getElementById('qrModal');
document.getElementById('qrOpenBtn').addEventListener('click', () => {
  const shareUrl = buildShareUrl();
  const qrApi = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(shareUrl)}`;
  document.getElementById('qrImage').src = qrApi;
  qrModal.classList.add('open');
});

document.getElementById('closeQrBtn').addEventListener('click', () => {
  qrModal.classList.remove('open');
});

qrModal.addEventListener('click', (e) => {
  if (e.target === qrModal) qrModal.classList.remove('open');
});

document.getElementById('shareCardBtn').addEventListener('click', () => {
  const shareUrl = buildShareUrl();
  navigator.clipboard.writeText(shareUrl).then(() => {
    showToast('🔗 내 명함 공유 링크가 클립보드에 복사되었습니다!');
  });
});

// ================= 배경 파티클 애니메이션 =================
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = Array.from({ length: 38 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 2.2 + 0.6,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4,
    alpha: Math.random() * 0.55 + 0.15
  }));

  function draw() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// 초기 실행
renderCard();
initParticles();

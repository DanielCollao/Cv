(function () {
  var ROLES = ['Ingeniero en Informática', 'Desarrollo de agentes de IA', 'Técnico en Electricidad', 'Ayudante de Electromecánico'];

  var EXP = [
    { id: 'xtreme', when: '2026', role: 'Ayudante de Electromecánico', org: 'Xtreme Servicios Maquinarias y Equipos SpA', area: 'elec', detail: 'Apoyo en trabajos electromecánicos de mantención y reparación de maquinarias y equipos.' },
    { id: 'aigentz', when: '2025 · Práctica profesional', role: 'Desarrollo de agente de IA', org: 'Aigentz SpA', area: 'tec', detail: 'Práctica profesional de Ingeniería en Informática, desarrollando un agente de inteligencia artificial.' },
    { id: 'salud', when: '2025', role: 'Mantención y ayudante eléctrico', org: 'Salud Municipal de Los Andes', area: 'elec', detail: 'Mantención general y apoyo en trabajos eléctricos en dependencias de salud municipal.' },
    { id: 'soseval', when: '2020 · Verano', role: 'Valijero – peoneta', org: 'Soseval SpA', area: 'otro', detail: 'Apoyo en carga, descarga y reparto como parte del equipo de distribución.' },
    { id: 'cormecanica', when: '2019 – 2020 · Práctica', role: 'Técnico en Electricidad', org: 'Cormecánica', area: 'elec', detail: 'Práctica laboral de Técnico Nivel Medio en Electricidad.' }
  ];
  var EXP_FILTERS = [['all', 'Todo'], ['tec', 'Tecnología'], ['elec', 'Electricidad'], ['otro', 'Otros']];

  var CERTS = [
    ['Análisis y planificación de requerimientos informáticos', 'gestion'],
    ['Programación de software', 'dev'],
    ['Análisis y desarrollo de modelos de datos', 'datos'],
    ['Gestión de proyectos informáticos', 'gestion'],
    ['Inteligencia de negocios', 'datos'],
    ['Internacional en inglés intermedio alto', 'idioma'],
    ['Calidad de software', 'dev'],
    ['Arquitectura de software', 'dev']
  ];
  var CERT_FILTERS = [['all', 'Todas'], ['dev', 'Desarrollo'], ['datos', 'Datos'], ['gestion', 'Gestión'], ['idioma', 'Idiomas']];
  var AREA = { dev: 'Desarrollo', datos: 'Datos', gestion: 'Gestión', idioma: 'Idiomas' };

  var state = { exp: 'all', open: 'aigentz', cert: 'all' };

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function renderFilters(box, list, key, after) {
    box.innerHTML = '';
    list.forEach(function (f) {
      var b = el('button', 'pill', f[1]);
      b.type = 'button';
      b.setAttribute('aria-pressed', String(state[key] === f[0]));
      b.addEventListener('click', function () { state[key] = f[0]; renderFilters(box, list, key, after); after(); });
      box.appendChild(b);
    });
  }

  function renderExp() {
    var box = document.getElementById('expList');
    box.innerHTML = '';
    EXP.filter(function (e) { return state.exp === 'all' || e.area === state.exp; }).forEach(function (e) {
      var open = state.open === e.id;
      var b = el('button', 'job lift' + (open ? ' open' : ''));
      b.type = 'button';
      b.setAttribute('aria-expanded', String(open));
      var top = el('span', 'job-top');
      top.appendChild(el('span', 'tag', e.when));
      var plus = el('span', 'plus', '+');
      plus.setAttribute('aria-hidden', 'true');
      top.appendChild(plus);
      b.appendChild(top);
      b.appendChild(el('span', 'job-role', e.role));
      b.appendChild(el('span', 'job-org', e.org));
      b.appendChild(el('span', 'job-detail', e.detail));
      b.addEventListener('click', function () { state.open = open ? null : e.id; renderExp(); });
      box.appendChild(b);
    });
  }

  function renderCerts() {
    var box = document.getElementById('certList');
    box.innerHTML = '';
    CERTS.forEach(function (c, i) {
      if (state.cert !== 'all' && c[1] !== state.cert) return;
      var card = el('div', 'cert lift');
      var top = el('span', 'cert-top');
      top.appendChild(el('span', 'cert-n', '0' + (i + 1)));
      top.appendChild(el('span', 'cert-a', 'Duoc UC · ' + AREA[c[1]]));
      card.appendChild(top);
      card.appendChild(el('span', 'cert-t', c[0]));
      box.appendChild(card);
    });
  }

  renderFilters(document.getElementById('expFilters'), EXP_FILTERS, 'exp', renderExp);
  renderFilters(document.getElementById('certFilters'), CERT_FILTERS, 'cert', renderCerts);
  renderExp();
  renderCerts();

  // Roles rotativos
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) {
    var i = 0, roleBox = document.getElementById('role').parentNode;
    setInterval(function () {
      i = (i + 1) % ROLES.length;
      var s = el('span', 'fade', ROLES[i]);
      s.id = 'role';
      roleBox.replaceChildren(s);
    }, 2600);
  }

  // Copiar correo
  var copyBtn = document.getElementById('copyBtn');
  var t;
  copyBtn.addEventListener('click', function () {
    var done = function () {
      copyBtn.textContent = '¡Correo copiado!';
      clearTimeout(t);
      t = setTimeout(function () { copyBtn.textContent = 'Copiar correo'; }, 2000);
    };
    if (navigator.clipboard) navigator.clipboard.writeText('danielcollao09@gmail.com').then(done, done);
    else done();
  });
})();

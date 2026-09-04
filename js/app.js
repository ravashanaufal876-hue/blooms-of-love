/* app.js — Digibouquet-style + A-Z bouquet studio */
(() => {
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];

  const LS_KEY = 'blooms-of-love:v3-digibouquet';
  const LS_GARDEN = 'blooms-garden:v1';
  const MAP_FONT = { dancing:'font-dancing', vibes:'font-vibes', playfair:'font-playfair' };
  const MAP_CARD = { ivory:'card-ivory', parchment:'card-parchment', blush:'card-blush', botanical:'card-botanical', midnight:'card-midnight' };
  const SAMPLES = [
    `Sayangku,\n\nHari ini aku ingin bilang — kamu adalah alasan aku percaya cinta itu lembut dan kuat di waktu yang sama. Terima kasih sudah sabar, sudah jadi tawa di hariku, dan sudah mengajarkanku arti pulang.\n\nBuket ini kecil, tapi setiap bunganya adalah janji: aku akan menjagamu, merayakan mimpimu, dan mencintaimu tanpa jeda. 🌹\n\nPeluk hangat,\nAku`,
    `Untukmu yang paling aku sayang,\n\nKalau rindu punya warna, warnanya adalah kamu. Kalau cinta punya wangi, wanginya seperti harum bunga yang mekar pagi ini.\n\nAku tak selalu pandai merangkai kata, tapi percayalah — setiap detik aku bersyukur memilikimu. 💐✨\n\nSelamanya,\nAku`,
    `Hai cintaku,\n\nKamu ingat janji kita untuk saling menguatkan? Hari ini aku menepatinya lagi lewat buket ini. Semoga kelopaknya mengingatkanmu: seberat apa pun hari, kita mekar bersama.\n\nI love you, more and more. 💌`
  ];

  const state = {
    bouquet: [],
    wrapper:'kraft',
    ribbon:'rose',
    greenery:'leafy',
    cardStyle:'ivory',
    mode:'color',
    letter:{ recipient:'For My Beloved', message:'', sender:'Dari Aku yang Selalu Mencintaimu', font:'dancing' },
    filterLetter:'', search:'',
    envelopeOpen:false,
    step:1,
    garden: []
  };

  const el = {
    petalsBg: $('#petalsBg'),
    flowerGrid: $('#flowerGrid'),
    alphabetBar: $('#alphabetBar'),
    searchInput: $('#searchInput'),
    catalogInfo: $('#catalogInfo'),
    bouquetCount: $('#bouquetCount'),
    bouquetStage: $('#bouquetStage'),
    bouquetFlowers: $('#bouquetFlowers'),
    wrapperLayer: $('#wrapperLayer'),
    ribbonEl: $('#ribbonEl'),
    greeneryLayer: $('#greeneryLayer'),
    emptyHint: $('#emptyHint'),
    bouquetList: $('#bouquetList'),
    recipientInput: $('#recipientInput'),
    messageInput: $('#messageInput'),
    senderInput: $('#senderInput'),
    fontPills: $('#fontPills'),
    letterTo: $('#letterTo'),
    letterBody: $('#letterBody'),
    letterFrom: $('#letterFrom'),
    letterPaper: $('#letterPaper'),
    envelope: $('#envelope'),
    sealHint: $('#sealHint'),
    previewOverlay: $('#previewOverlay'),
    previewBouquet: $('#previewBouquet'),
    previewBouquetMeta: $('#previewBouquetMeta'),
    previewTo: $('#previewTo'),
    previewLetterTo: $('#previewLetterTo'),
    previewLetterBody: $('#previewLetterBody'),
    previewLetterFrom: $('#previewLetterFrom'),
    previewLetterPaper: $('#previewLetterPaper'),
    shareLinkInput: $('#shareLinkInput'),
    toast: $('#toast'),
    heroBouquetPreview: $('#heroBouquetPreview'),
    heroLetterPreview: $('#heroLetterPreview'),
    gardenGrid: $('#gardenGrid'),
  };

  let uidCounter = 1;

  function init(){
    const fromURL = loadFromURL();
    if(!fromURL) loadFromLS();
    else showToast('Hadiah dibuka dari link 💌');
    loadGarden();

    el.recipientInput.value = state.letter.recipient;
    el.messageInput.value = state.letter.message || el.messageInput.value;
    if(!state.letter.message) state.letter.message = el.messageInput.value;
    el.senderInput.value = state.letter.sender;
    syncFontPills();
    syncCardStyle();
    syncMode();
    syncGreenery();

    buildAlphabet();
    bindEvents();
    renderAll();
    updateShareLink();
    goStep(state.step || 1);
    spawnAmbientPetals();
    renderHeroPreview();
    // Jika dibuka via link share (?gift=), langsung tampilkan mode hadiah ala Digibouquet — biar pacar tidak lihat editor
    if(fromURL){
      // delay sedikit biar DOM siap, lalu auto-buka preview + sembunyikan hero/stepper untuk kesan hadiah bersih
      setTimeout(()=>{
        const openPreview = window._openPreview || null;
        if(openPreview) openPreview();
        else {
          const ov = document.getElementById('previewOverlay');
          if(ov){ ov.classList.add('open'); ov.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
        }
        document.documentElement.classList.add('gift-mode');
        showToast('Hadiah dibuka 💌 — klik ✕ untuk lihat studio');
      }, 450);
    }
  }

  // persistence
  function saveToLS(){
    try{ localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch(e){}
  }
  function loadFromLS(){
    try{
      const raw = localStorage.getItem(LS_KEY);
      if(!raw) return;
      const p = JSON.parse(raw);
      if(Array.isArray(p.bouquet)) state.bouquet = p.bouquet;
      if(p.wrapper) state.wrapper = p.wrapper;
      if(p.ribbon) state.ribbon = p.ribbon;
      if(p.greenery) state.greenery = p.greenery;
      if(p.cardStyle) state.cardStyle = p.cardStyle;
      if(p.mode) state.mode = p.mode;
      if(p.letter) Object.assign(state.letter, p.letter);
      if(p.step) state.step = p.step;
      const maxUid = Math.max(0, ...state.bouquet.map(b=> Number(b.uid)||0));
      uidCounter = maxUid + 1;
    } catch(e){}
  }
  function saveGarden(){
    try{ localStorage.setItem(LS_GARDEN, JSON.stringify(state.garden)); } catch(e){}
  }
  function loadGarden(){
    try{
      const raw = localStorage.getItem(LS_GARDEN);
      if(raw) state.garden = JSON.parse(raw);
    } catch(e){ state.garden=[]; }
  }
  function compressPayload(obj){
    const json = JSON.stringify(obj);
    // pakai LZ-String kalau ada (hasil ~40% lebih pendek dari base64 biasa)
    if(window.LZString && window.LZString.compressToEncodedURIComponent){
      return 'lz:' + window.LZString.compressToEncodedURIComponent(json);
    }
    return btoa(unescape(encodeURIComponent(json)));
  }
  function decompressPayload(str){
    if(str.startsWith('lz:')){
      if(window.LZString && window.LZString.decompressFromEncodedURIComponent){
        const dec = window.LZString.decompressFromEncodedURIComponent(str.slice(3));
        if(dec) return dec;
      }
      return null;
    }
    try{ return decodeURIComponent(escape(atob(str))); } catch(e){ return null; }
  }
  function encodeStateToURL(){
    // slim: uid tidak ikut (diregenerate saat load), angka dibulatkan biar payload pendek
    const slimBouquet = state.bouquet.map(b=>[
      b.flowerId,
      Math.round(Number(b.x)*10)/10,
      Math.round(Number(b.y)*10)/10,
      Math.round(Number(b.scale)*100)/100,
      Math.round(Number(b.rotation))
    ]);
    const payload = compressPayload({
      b:slimBouquet, w:state.wrapper, r:state.ribbon, g:state.greenery, cs:state.cardStyle, m:state.mode, l:state.letter
    });
    const url = new URL(location.href.split('?')[0].split('#')[0]);
    url.searchParams.set('gift', payload);
    // clean garden etc
    return url.toString();
  }
  function loadFromURL(){
    const sp = new URLSearchParams(location.search);
    const g = sp.get('gift');
    if(!g) return false;
    try{
      const raw = decompressPayload(g);
      if(!raw) return false;
      const data = JSON.parse(raw);
      if(Array.isArray(data.b)){
        // dukung 2 format: lama (array of object) & baru slim (array of array)
        if(data.b.length && Array.isArray(data.b[0])){
          state.bouquet = data.b.map((a,i)=>({ uid:String(i+1), flowerId:a[0], x:Number(a[1]), y:Number(a[2]), scale:Number(a[3]), rotation:Number(a[4]) }));
        } else {
          state.bouquet = data.b;
        }
      }
      if(data.w) state.wrapper = data.w;
      if(data.r) state.ribbon = data.r;
      if(data.g) state.greenery = data.g;
      if(data.cs) state.cardStyle = data.cs;
      if(data.m) state.mode = data.m;
      if(data.l) Object.assign(state.letter, data.l);
      uidCounter = Math.max(1, ...state.bouquet.map(b=> Number(b.uid)||0)) + 1;
      state.step = 4;
      return true;
    } catch(e){ return false; }
  }

  // helpers
  function showToast(msg){
    el.toast.textContent = msg;
    el.toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(()=> el.toast.classList.remove('show'), 2200);
  }
  function playClickSound(){
    try{
      const ctx = new (window.AudioContext||window.webkitAudioContext)();
      const o = ctx.createOscillator(); const g = ctx.createGain();
      o.type='sine'; o.frequency.value=880; g.gain.value=0.06;
      o.connect(g); g.connect(ctx.destination);
      o.start(); g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime+0.22);
      setTimeout(()=>{o.stop(); ctx.close();}, 240);
    } catch(e){}
  }

  // stepper
  function goStep(n){
    state.step = n;
    $$('.step-panel').forEach(p=> p.classList.toggle('active', Number(p.dataset.panel)===n));
    $$('.stepper .step').forEach(s=> s.classList.toggle('active', Number(s.dataset.step)===n));
    // scroll into view
    const target = $(`[data-panel="${n}"]`);
    if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
    saveToLS();
  }

  function buildAlphabet(){
    const letters = ['','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    el.alphabetBar.innerHTML = letters.map(l=>{
      const label = l==='' ? 'Semua' : l;
      const cls = l===state.filterLetter ? 'alpha-btn active' : 'alpha-btn';
      return `<button class="${cls}" data-letter="${l}" type="button">${label}</button>`;
    }).join('');
  }
  function getFilteredFlowers(){
    const q = state.search.trim().toLowerCase();
    return window.FLOWERS.filter(f=>{
      const okLetter = !state.filterLetter || f.letter===state.filterLetter;
      const okSearch = !q || (`${f.name} ${f.meaning} ${f.desc}`.toLowerCase().includes(q));
      return okLetter && okSearch;
    });
  }
  function renderCatalog(){
    const list = getFilteredFlowers();
    el.catalogInfo.textContent = `${list.length} / 26`;
    if(list.length===0){
      el.flowerGrid.innerHTML = `<div class="muted" style="grid-column:1/-1; text-align:center; padding:18px; background:white; border:1px dashed var(--line-strong); border-radius:16px">Tidak ada bunga yang cocok. Coba kata kunci lain.</div>`;
      return;
    }
    el.flowerGrid.innerHTML = list.map(f=>{
      const inBouquet = state.bouquet.filter(b=>b.flowerId===f.id).length;
      return `
      <article class="flower-card" data-id="${f.id}">
        <div class="flower-visual">${window.flowerSVG(f, 92)}</div>
        <div class="flower-meta">
          <div style="display:flex; align-items:center; gap:6px">
            <span style="width:24px;height:24px;border-radius:999px;background:${f.color};color:white;display:grid;place-items:center;font-size:11px;font-weight:800">${f.letter}</span>
            <h3>${f.name}</h3>
          </div>
          <div class="latin">${f.id} • ${f.letter}</div>
        </div>
        <div class="badge-meaning">💬 ${f.meaning}</div>
        <p class="flower-desc">${f.desc}</p>
        <div class="flower-actions">
          <button class="btn-add ${inBouquet?'added':''}" data-add="${f.id}" type="button">${inBouquet?`✓ ${inBouquet} di buket`:'+ Tambah ke Buket'}</button>
        </div>
      </article>`;
    }).join('');
  }

  function syncMode(){
    document.body.classList.toggle('mono', state.mode==='mono');
    el.bouquetStage.classList.toggle('mono', state.mode==='mono');
    el.previewBouquet.classList.toggle('mono', state.mode==='mono');
    el.heroBouquetPreview.classList.toggle('mono', state.mode==='mono');
    $$('.mode-btn').forEach(b=> b.classList.toggle('active', b.dataset.mode===state.mode));
    $('#modeHint').textContent = state.mode==='mono' ? 'Mono: quiet & editorial' : 'Color: lush & celebratory';
  }
  function syncGreenery(){
    $$('#greeneryChoices .chip').forEach(x=> x.classList.toggle('active', x.dataset.greenery===state.greenery));
    if(el.greeneryLayer){
      el.greeneryLayer.className = 'greenery-layer show ' + state.greenery;
      if(window.greenerySVG) el.greeneryLayer.innerHTML = window.greenerySVG(state.greenery);
    }
  }
  function syncCardStyle(){
    $$('#cardStyles .card-style').forEach(x=> x.classList.toggle('active', x.dataset.card===state.cardStyle));
    // letter paper class
    const cls = MAP_CARD[state.cardStyle] || 'card-ivory';
    el.letterPaper.className = 'letter-paper ' + cls;
    el.previewLetterPaper.className = 'letter-paper ' + cls;
  }

  function renderBouquetStage(){
    const n = state.bouquet.length;
    el.bouquetCount.textContent = `${n} bunga • ${state.greenery} • ${state.wrapper}`;
    el.emptyHint.classList.toggle('hidden', n>0);
    el.wrapperLayer.className = 'wrapper-layer ' + state.wrapper;
    el.ribbonEl.className = 'ribbon ' + state.ribbon;
    // greenery visibility handled by syncGreenery
    el.bouquetFlowers.innerHTML = '';
    state.bouquet.forEach((item, idx)=>{
      const f = window.FLOWERS.find(x=>x.id===item.flowerId);
      if(!f) return;
      const d = document.createElement('div');
      d.className = 'bloom';
      d.dataset.uid = item.uid;
      d.style.left = item.x + '%';
      d.style.top = item.y + '%';
      d.style.transform = `translate(-50%,-50%) rotate(${item.rotation}deg) scale(${item.scale})`;
      d.style.zIndex = String(10 + idx);
      d.innerHTML = `${window.flowerSVG(f, 74)}<button class="remove" title="Hapus" data-remove="${item.uid}" type="button">×</button>`;
      enableDrag(d, item);
      el.bouquetFlowers.appendChild(d);
    });
    renderHeroPreview();
  }

  function renderBouquetList(){
    if(state.bouquet.length===0){
      el.bouquetList.innerHTML = `<div class="muted" style="text-align:center; padding:8px; font-size:12px">Belum ada bunga. Tambahkan dari katalog.</div>`;
      return;
    }
    el.bouquetList.innerHTML = state.bouquet.map(item=>{
      const f = window.FLOWERS.find(x=>x.id===item.flowerId);
      return `
      <div class="bouquet-item" data-uid="${item.uid}">
        <div class="thumb">${window.flowerSVG(f, 26)}</div>
        <div>
          <h4>${f.name} <span class="muted" style="font-weight:500">• ${f.meaning}</span></h4>
          <p>${f.letter} • ${Math.round(item.rotation)}° • ×${item.scale.toFixed(2)}</p>
        </div>
        <div class="spacer"></div>
        <input class="range" type="range" min="0.7" max="1.35" step="0.05" value="${item.scale}" data-scale="${item.uid}" aria-label="Skala" />
        <button class="mini-btn" data-rot="-15" data-uid="${item.uid}" type="button">↺</button>
        <button class="mini-btn" data-rot="15" data-uid="${item.uid}" type="button">↻</button>
        <button class="mini-btn" data-remove="${item.uid}" type="button" style="background:var(--ink); color:white; border-color:var(--ink)">×</button>
      </div>`;
    }).join('');
  }

  function renderLetter(){
    el.letterTo.textContent = state.letter.recipient || '—';
    el.letterFrom.textContent = state.letter.sender || '—';
    el.letterBody.textContent = state.letter.message || 'Tulis pesanmu di editor — akan muncul di sini ✨';
    el.letterBody.className = 'letter-body ' + (MAP_FONT[state.letter.font] || 'font-dancing');
    $('#previewLetterTo').textContent = el.letterTo.textContent;
    $('#previewLetterFrom').textContent = el.letterFrom.textContent;
    $('#previewLetterBody').textContent = el.letterBody.textContent;
    $('#previewLetterBody').className = 'letter-body ' + (MAP_FONT[state.letter.font] || 'font-dancing');
    $('#previewTo').textContent = (state.letter.recipient||'Beloved').replace(/^For\s+/i,'');
    el.heroLetterPreview.textContent = (state.letter.message||'').slice(0,120) + ((state.letter.message||'').length>120?'…':'') || 'Untukmu — mekar pelan, indah, tak pernah layu. 🌸';
  }

  function renderHeroPreview(){
    if(!el.heroBouquetPreview) return;
    if(state.bouquet.length===0){
      el.heroBouquetPreview.innerHTML = `<div class="muted" style="text-align:center; padding:18px; font-size:12px">Preview buket akan muncul di sini<br/>Pilih minimal 3 bunga</div>`;
      return;
    }
    el.heroBouquetPreview.innerHTML = `
      <div class="wrapper-layer ${state.wrapper}" style="width:150px;height:150px; bottom:10px; opacity:.95"></div>
      <div class="ribbon ${state.ribbon}" style="bottom:26px; width:68px; font-size:9px">WITH LOVE</div>
      <div style="position:absolute; inset:0">
        ${state.bouquet.slice(0,8).map((item, idx)=>{
          const f = window.FLOWERS.find(x=>x.id===item.flowerId);
          return `<div style="position:absolute; left:${item.x}%; top:${item.y}%; transform:translate(-50%,-50%) rotate(${item.rotation}deg) scale(${Math.min(item.scale,1)*0.62}); z-index:${10+idx}">${window.flowerSVG(f, 64)}</div>`;
        }).join('')}
      </div>
    `;
  }

  function renderPreviewBouquet(){
    const n = state.bouquet.length;
    if(n===0){
      el.previewBouquet.innerHTML = `<div class="muted" style="text-align:center; padding:18px">Buket kosong — tambahkan bunga dulu 🌷</div>`;
      el.previewBouquetMeta.textContent = 'Buket kosong';
      return;
    }
    const _gSVG = (window.greenerySVG) ? window.greenerySVG(state.greenery) : '';
    el.previewBouquet.innerHTML = `
      <div class="greenery-layer show ${state.greenery}" style="left:50%; top:42%; transform:translate(-50%,-50%); width:300px; height:280px; opacity:1">${_gSVG}</div>
      <div class="wrapper-layer ${state.wrapper}" style="width:230px;height:230px; bottom:22px"></div>
      <div class="ribbon ${state.ribbon}" style="bottom:62px; width:88px">WITH LOVE</div>
      <div class="bouquet-flowers" style="position:absolute; inset:0">
        ${state.bouquet.map((item, idx)=>{
          const f = window.FLOWERS.find(x=>x.id===item.flowerId);
          return `<div style="position:absolute; left:${item.x}%; top:${item.y}%; transform:translate(-50%,-50%) rotate(${item.rotation}deg) scale(${item.scale}); z-index:${10+idx}; filter:drop-shadow(0 8px 14px rgba(0,0,0,.12))">${window.flowerSVG(f, 84)}</div>`;
        }).join('')}
      </div>`;
    const names = state.bouquet.map(b=> window.FLOWERS.find(f=>f.id===b.flowerId).name).join(', ');
    el.previewBouquetMeta.textContent = `${n} bunga • ${names} • ${state.greenery} • ${state.wrapper} • ${state.ribbon} • ${state.mode}`;
  }

  function renderGarden(){
    if(!el.gardenGrid) return;
    if(state.garden.length===0){
      el.gardenGrid.innerHTML = `<div class="muted" style="grid-column:1/-1; text-align:center; padding:18px; background:white; border:1px dashed var(--line-strong); border-radius:14px">Garden masih kosong. Simpan buket pertamamu — nanti muncul di sini seperti Digibouquet Garden 🌿</div>`;
      return;
    }
    el.gardenGrid.innerHTML = state.garden.map((g, idx)=>{
      const names = (g.bouquet||[]).slice(0,3).map(b=> (window.FLOWERS.find(f=>f.id===b.flowerId)||{}).name || b.flowerId).join(', ');
      return `
      <div class="garden-card" data-garden="${idx}" role="button" tabindex="0">
        <div class="garden-thumb">
          <div style="position:relative; width:160px; height:140px">
            <div class="wrapper-layer ${g.wrapper||'kraft'}" style="width:120px;height:120px; bottom:6px"></div>
            <div class="ribbon ${g.ribbon||'rose'}" style="bottom:14px; width:60px; font-size:8px">WITH LOVE</div>
            <div style="position:absolute; inset:0">
              ${(g.bouquet||[]).slice(0,6).map((item, i)=>{
                const f = window.FLOWERS.find(x=>x.id===item.flowerId);
                if(!f) return '';
                return `<div style="position:absolute; left:${item.x}%; top:${item.y}%; transform:translate(-50%,-50%) rotate(${item.rotation}deg) scale(${item.scale*0.55})">${window.flowerSVG(f, 52)}</div>`;
              }).join('')}
            </div>
          </div>
        </div>
        <div class="garden-meta">
          <strong>${g.title||`Bouquet #${idx+1}`}</strong>
          <p>${names||'—'} • ${g.cardStyle||'ivory'} • ${g.mode||'color'}</p>
          <p style="margin-top:6px; font-size:11px">Untuk: ${g.letter?.recipient||'—'} — ${ (g.letter?.message||'').slice(0,56)}${(g.letter?.message||'').length>56?'…':''}</p>
        </div>
      </div>`;
    }).join('');
  }

  function renderAll(){
    buildAlphabet();
    renderCatalog();
    renderBouquetStage();
    renderBouquetList();
    renderLetter();
    renderPreviewBouquet();
    renderGarden();
    updateShareLink();
    syncMode();
    syncGreenery();
    syncCardStyle();
  }

  function addToBouquet(flowerId){
    const x = 38 + Math.random()*24;
    const y = 26 + Math.random()*28;
    const rotation = (Math.random()*40 - 20);
    const scale = 0.92 + Math.random()*0.18;
    state.bouquet.push({ uid: String(uidCounter++), flowerId, x, y, scale: Number(scale.toFixed(2)), rotation: Number(rotation.toFixed(1)) });
    playClickSound();
    saveToLS();
    renderAll();
    burstSparkles(x,y);
    showToast('Bunga ditambahkan 🌸');
    if(state.bouquet.length===3) showToast('Cantik! Lanjut atur greenery di Step 2 →');
  }
  function removeFromBouquet(uid){
    state.bouquet = state.bouquet.filter(b=> String(b.uid)!==String(uid));
    saveToLS();
    renderAll();
    showToast('Bunga dihapus');
  }

  function enableDrag(node, item){
    let startX=0,startY=0,origX=0,origY=0,drag=false;
    const onDown = (e)=>{
      if(e.target.closest('.remove')) return;
      drag=true;
      const pt = e.touches? e.touches[0] : e;
      startX = pt.clientX; startY = pt.clientY;
      origX = item.x; origY = item.y;
      node.style.zIndex = '99';
      e.preventDefault();
    };
    const onMove = (e)=>{
      if(!drag) return;
      const rect = el.bouquetStage.getBoundingClientRect();
      const pt = e.touches? e.touches[0] : e;
      const dx = pt.clientX - startX;
      const dy = pt.clientY - startY;
      const dxPct = dx / rect.width * 100;
      const dyPct = dy / rect.height * 100;
      item.x = Math.min(92, Math.max(8, origX + dxPct));
      item.y = Math.min(78, Math.max(6, origY + dyPct));
      node.style.left = item.x + '%';
      node.style.top = item.y + '%';
    };
    const onUp = ()=>{
      if(!drag) return;
      drag=false; node.style.zIndex='';
      saveToLS();
      renderBouquetList();
      renderPreviewBouquet();
      renderHeroPreview();
      updateShareLink();
    };
    node.addEventListener('mousedown', onDown);
    node.addEventListener('touchstart', onDown, {passive:false});
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, {passive:false});
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
  }

  function syncFontPills(){
    $$('#fontPills .font-pill').forEach(b=>{
      b.classList.toggle('active', b.dataset.font===state.letter.font);
    });
  }
  function updateShareLink(){
    const link = encodeStateToURL();
    if(el.shareLinkInput) el.shareLinkInput.value = link;
  }

  // effects
  function burstSparkles(xPct, yPct){
    for(let i=0;i<6;i++){
      const s=document.createElement('div'); s.className='sparkle';
      s.style.left = `calc(${xPct}% + ${(Math.random()*40-20)}px)`; s.style.top = `calc(${yPct}% + ${(Math.random()*40-20)}px)`;
      el.bouquetFlowers.appendChild(s);
      setTimeout(()=> s.remove(), 1600);
    }
  }
  function fallingPetals(count=18){
    for(let i=0;i<count;i++){
      const p=document.createElement('div'); p.className='petal';
      const left = Math.random()*100;
      const delay = Math.random()*0.6;
      const dur = 3 + Math.random()*2.6;
      const size = 10 + Math.random()*12;
      p.style.left = left+'vw';
      p.style.animationDuration = dur+'s';
      p.style.animationDelay = delay+'s';
      p.style.width = size+'px'; p.style.height = (size*1.25)+'px';
      p.style.background = ['#E88D9C','#F4B5C2','#D4A373','#F8BBD0','#111'][Math.floor(Math.random()*5)];
      if(state.mode==='mono') p.style.background = '#111';
      p.style.opacity = String(0.13 + Math.random()*0.18);
      el.petalsBg.appendChild(p);
      setTimeout(()=> p.remove(), (dur+delay)*1000 + 200);
    }
  }
  function spawnAmbientPetals(){
    setInterval(()=> fallingPetals(2), 2600);
  }

  function bindEvents(){
    el.searchInput.addEventListener('input', (e)=>{
      state.search = e.target.value;
      renderCatalog();
    });
    el.alphabetBar.addEventListener('click', (e)=>{
      const b = e.target.closest('[data-letter]');
      if(!b) return;
      state.filterLetter = b.dataset.letter;
      buildAlphabet();
      renderCatalog();
      playClickSound();
    });
    el.flowerGrid.addEventListener('click', (e)=>{
      const add = e.target.closest('[data-add]');
      if(!add) return;
      addToBouquet(add.dataset.add);
    });

    // stepper
    $$('.stepper .step').forEach(btn=>{
      btn.addEventListener('click', ()=> goStep(Number(btn.dataset.step)));
    });
    $$('[data-goto]').forEach(btn=>{
      btn.addEventListener('click', ()=> goStep(Number(btn.dataset.goto)));
    });

    // mode
    $$('.mode-btn').forEach(b=>{
      b.addEventListener('click', ()=>{
        state.mode = b.dataset.mode;
        syncMode(); saveToLS(); updateShareLink(); renderPreviewBouquet(); renderGarden();
        showToast(state.mode==='mono' ? 'Mode Mono — editorial 🖤' : 'Mode Color — warm 🌸');
        playClickSound();
      });
    });
    $('#heroBuildColor').addEventListener('click', ()=>{ state.mode='color'; syncMode(); goStep(1); document.getElementById('studio').scrollIntoView({behavior:'smooth'}); saveToLS(); playClickSound(); });
    $('#heroBuildMono').addEventListener('click', ()=>{ state.mode='mono'; syncMode(); goStep(1); document.getElementById('studio').scrollIntoView({behavior:'smooth'}); saveToLS(); playClickSound(); });

    // greenery / wrapper / ribbon
    $('#greeneryChoices').addEventListener('click', (e)=>{
      const b = e.target.closest('[data-greenery]');
      if(!b) return;
      state.greenery = b.dataset.greenery;
      syncGreenery(); saveToLS(); renderPreviewBouquet(); updateShareLink(); playClickSound();
    });
    $('#wrapperChoices').addEventListener('click', (e)=>{
      const b = e.target.closest('[data-wrapper]');
      if(!b) return;
      state.wrapper = b.dataset.wrapper;
      $$('#wrapperChoices .chip').forEach(x=> x.classList.toggle('active', x.dataset.wrapper===state.wrapper));
      renderBouquetStage(); renderPreviewBouquet(); saveToLS(); updateShareLink(); playClickSound();
    });
    $('#ribbonChoices').addEventListener('click', (e)=>{
      const b = e.target.closest('[data-ribbon]');
      if(!b) return;
      state.ribbon = b.dataset.ribbon;
      $$('#ribbonChoices .chip').forEach(x=> x.classList.toggle('active', x.dataset.ribbon===state.ribbon));
      renderBouquetStage(); renderPreviewBouquet(); saveToLS(); updateShareLink(); playClickSound();
    });

    // card styles
    $('#cardStyles').addEventListener('click', (e)=>{
      const b = e.target.closest('[data-card]');
      if(!b) return;
      state.cardStyle = b.dataset.card;
      syncCardStyle(); saveToLS(); updateShareLink(); playClickSound();
    });

    // bouquet list
    el.bouquetList.addEventListener('click', (e)=>{
      const rem = e.target.closest('[data-remove]');
      if(rem){ removeFromBouquet(rem.dataset.remove); playClickSound(); return; }
      const rot = e.target.closest('[data-rot]');
      if(rot){
        const it = state.bouquet.find(x=> String(x.uid)===String(rot.dataset.uid));
        if(it){ it.rotation = (it.rotation + Number(rot.dataset.rot)) % 360; saveToLS(); renderBouquetStage(); renderBouquetList(); renderPreviewBouquet(); updateShareLink(); playClickSound(); }
      }
    });
    el.bouquetList.addEventListener('input', (e)=>{
      const r = e.target.closest('[data-scale]');
      if(!r) return;
      const it = state.bouquet.find(x=> String(x.uid)===String(r.dataset.scale));
      if(it){ it.scale = Number(r.value); renderBouquetStage(); renderPreviewBouquet(); renderHeroPreview(); saveToLS(); updateShareLink(); }
    });
    el.bouquetFlowers.addEventListener('click', (e)=>{
      const rem = e.target.closest('[data-remove]');
      if(rem){ removeFromBouquet(rem.dataset.remove); playClickSound(); }
    });

    $('#btnClearBouquet').addEventListener('click', ()=>{
      if(state.bouquet.length===0) return showToast('Buket sudah kosong');
      if(confirm('Kosongkan seluruh buket?')){ state.bouquet=[]; saveToLS(); renderAll(); showToast('Buket dikosongkan'); playClickSound(); }
    });
    $('#btnPetal').addEventListener('click', ()=>{ fallingPetals(22); burstSparkles(50,35); playClickSound(); });
    $('#btnSparkle').addEventListener('click', ()=>{ for(let i=0;i<4;i++) burstSparkles(30+Math.random()*40, 20+Math.random()*35); playClickSound(); });
    $('#btnShuffle').addEventListener('click', ()=>{
      state.bouquet.forEach(b=>{ b.x = 34+Math.random()*32; b.y= 22+Math.random()*34; b.rotation = Math.random()*60-30; });
      saveToLS(); renderBouquetStage(); renderBouquetList(); renderPreviewBouquet(); updateShareLink(); showToast('Posisi diacak 🔀'); playClickSound();
    });

    // letter
    const onLetter = ()=>{
      state.letter.recipient = el.recipientInput.value;
      state.letter.message = el.messageInput.value;
      state.letter.sender = el.senderInput.value;
      renderLetter(); saveToLS(); updateShareLink(); renderHeroPreview();
    };
    ['input','change'].forEach(ev=>{
      el.recipientInput.addEventListener(ev, onLetter);
      el.messageInput.addEventListener(ev, onLetter);
      el.senderInput.addEventListener(ev, onLetter);
    });
    el.fontPills.addEventListener('click', (e)=>{
      const p = e.target.closest('[data-font]');
      if(!p) return;
      state.letter.font = p.dataset.font;
      syncFontPills(); renderLetter(); saveToLS(); updateShareLink(); playClickSound();
    });
    $('#btnClearText').addEventListener('click', ()=>{
      el.recipientInput.value=''; el.messageInput.value=''; el.senderInput.value='';
      onLetter(); showToast('Teks dikosongkan');
    });
    $('#btnSampleText').addEventListener('click', ()=>{
      const s = SAMPLES[Math.floor(Math.random()*SAMPLES.length)];
      el.messageInput.value = s; onLetter(); showToast('Contoh pesan dimasukkan 💡'); el.messageInput.focus();
    });

    // envelope
    const toggleEnvelope = ()=>{
      state.envelopeOpen = !state.envelopeOpen;
      el.envelope.classList.toggle('open', state.envelopeOpen);
      el.sealHint.textContent = state.envelopeOpen ? 'Surat terbuka ✨' : 'Klik segel untuk buka';
      if(state.envelopeOpen){ fallingPetals(10); playClickSound(); }
      else playClickSound();
    };
    el.envelope.addEventListener('click', toggleEnvelope);
    el.envelope.addEventListener('keydown', (e)=>{ if(e.key==='Enter' || e.key===' ') { e.preventDefault(); toggleEnvelope(); }});

    // save / share / preview
    $('#btnSave').addEventListener('click', ()=>{ saveToLS(); showToast('Disimpan ke LocalStorage ✅'); playClickSound(); });
    $('#btnSaveGarden').addEventListener('click', ()=>{
      if(state.bouquet.length===0) return showToast('Isi buket dulu 🌷');
      const entry = { title: `Bouquet ${state.garden.length+1} — ${(state.letter.recipient||'My Mine').slice(0,18)}`, bouquet: JSON.parse(JSON.stringify(state.bouquet)), wrapper: state.wrapper, ribbon: state.ribbon, greenery: state.greenery, cardStyle: state.cardStyle, mode: state.mode, letter: {...state.letter}, date: new Date().toISOString() };
      state.garden.unshift(entry);
      if(state.garden.length>12) state.garden = state.garden.slice(0,12);
      saveGarden(); renderGarden(); showToast('Disimpan ke Garden 🌿'); playClickSound();
    });
    $('#btnClearGarden').addEventListener('click', ()=>{
      if(state.garden.length===0) return showToast('Garden sudah kosong');
      if(confirm('Hapus semua Garden?')){ state.garden=[]; saveGarden(); renderGarden(); showToast('Garden dikosongkan'); }
    });
    el.gardenGrid.addEventListener('click', (e)=>{
      const c = e.target.closest('[data-garden]');
      if(!c) return;
      const g = state.garden[Number(c.dataset.garden)];
      if(!g) return;
      state.bouquet = JSON.parse(JSON.stringify(g.bouquet||[]));
      state.wrapper = g.wrapper||'kraft';
      state.ribbon = g.ribbon||'rose';
      state.greenery = g.greenery||'leafy';
      state.cardStyle = g.cardStyle||'ivory';
      state.mode = g.mode||'color';
      state.letter = {...g.letter};
      // refresh inputs
      el.recipientInput.value = state.letter.recipient||'';
      el.messageInput.value = state.letter.message||'';
      el.senderInput.value = state.letter.sender||'';
      const maxUid = Math.max(0, ...state.bouquet.map(b=> Number(b.uid)||0));
      uidCounter = maxUid + 1;
      saveToLS(); renderAll(); goStep(2); showToast('Bouquet dari Garden dimuat ✨'); playClickSound();
    });

    // — short link: coba 3 provider gratis biar kebal CORS/adblock
    async function shortenViaIsGd(longUrl){
      try{
        const api = 'https://is.gd/create.php?format=json&url=' + encodeURIComponent(longUrl);
        const res = await fetch(api);
        if(!res.ok) return null;
        const j = await res.json();
        return j.shorturl || j.shortUrl || null;
      } catch(e){ return null; }
    }
    async function shortenViaTinyUrl(longUrl){
      try{
        const api = 'https://tinyurl.com/api-create.php?url=' + encodeURIComponent(longUrl);
        const res = await fetch(api);
        if(!res.ok) return null;
        const t = (await res.text()).trim();
        return (t.startsWith('http')) ? t : null;
      } catch(e){ return null; }
    }
    async function shortenViaCleanUri(longUrl){
      try{
        const res = await fetch('https://cleanuri.com/api/v1/shorten', {
          method:'POST',
          headers:{'Content-Type':'application/x-www-form-urlencoded'},
          body:'url=' + encodeURIComponent(longUrl)
        });
        if(!res.ok) return null;
        const j = await res.json();
        return j.result_url || null;
      } catch(e){ return null; }
    }
    async function shortenUrl(longUrl){
      return (await shortenViaIsGd(longUrl))
        || (await shortenViaTinyUrl(longUrl))
        || (await shortenViaCleanUri(longUrl))
        || null;
    }
    const copyLink = async (link, opts={})=>{
      const l = link || encodeStateToURL();
      const wantShort = opts.short === true;
      let toCopy = l;
      let shortUrl = null;
      if(wantShort){
        showToast('Memperpendek link... ⏳');
        shortUrl = await shortenUrl(l);
        if(shortUrl) toCopy = shortUrl;
      }
      try{
        await navigator.clipboard.writeText(toCopy);
        if(el.shareLinkInput) el.shareLinkInput.value = toCopy;
        if(wantShort && shortUrl) showToast('Link pendek disalin! 🔗✨ ' + shortUrl);
        else if(wantShort && !shortUrl) showToast('Gagal pendek, link panjang disalin 🔗');
        else showToast('Link hadiah disalin! 🔗');
      } catch{
        if(el.shareLinkInput){ el.shareLinkInput.value = toCopy; el.shareLinkInput.select(); document.execCommand('copy'); }
        showToast('Link disalin (fallback) 🔗');
      }
      // tampilkan info panjang vs pendek di console biar user tau kompresinya
      if(l !== toCopy) console.log('Long:', l.length, 'Short:', toCopy.length);
      playClickSound();
      return toCopy;
    };
    $('#btnShare').addEventListener('click', ()=> copyLink(null, {short:true}));
    $('#btnCopyPreview').addEventListener('click', ()=> copyLink(null, {short:true}));
    $('#btnCopyLink2').addEventListener('click', ()=> copyLink(el.shareLinkInput.value, {short:false}));
    // tombol extra “Perpendek” kalau user mau manual
    const btnShort = document.createElement('button');
    btnShort.type='button'; btnShort.className='btn btn-ghost btn-small'; btnShort.id='btnShortLink';
    btnShort.textContent='✨ Perpendek Link';
    btnShort.title='Bikin versi is.gd (contoh: https://is.gd/xxxx)';
    if(el.shareLinkInput && el.shareLinkInput.parentElement){
      el.shareLinkInput.parentElement.appendChild(btnShort);
      btnShort.addEventListener('click', async ()=>{
        const longUrl = encodeStateToURL();
        el.shareLinkInput.value = longUrl;
        await copyLink(longUrl, {short:true});
      });
    }

    const openPreview = ()=>{
      renderPreviewBouquet(); renderLetter(); updateShareLink();
      el.previewOverlay.classList.add('open');
      el.previewOverlay.setAttribute('aria-hidden','false');
      document.body.style.overflow='hidden';
      playClickSound(); fallingPetals(14);
    };
    const closePreview = ()=>{
      el.previewOverlay.classList.remove('open');
      el.previewOverlay.setAttribute('aria-hidden','true');
      document.body.style.overflow='';
      playClickSound();
    };
    // expose for auto-open gift link
    window._openPreview = openPreview;
    window._closePreview = closePreview;
    $('#btnPreview').addEventListener('click', openPreview);
    $('#btnGoPreview').addEventListener('click', openPreview);
    $('#btnClosePreview').addEventListener('click', closePreview);
    $('#btnClosePreview2').addEventListener('click', closePreview);
    el.previewOverlay.addEventListener('click', (e)=>{ if(e.target===el.previewOverlay) closePreview(); });
    document.addEventListener('keydown', (e)=>{ if(e.key==='Escape' && el.previewOverlay.classList.contains('open')) closePreview(); });

    $('#btnDownloadCard').addEventListener('click', ()=>{ window.print(); });
    $('#btnPetalsPreview').addEventListener('click', ()=> fallingPetals(24));
    $('#btnWhatsApp').addEventListener('click', async ()=>{
      const longUrl = encodeStateToURL();
      let url = longUrl;
      showToast('Menyiapkan link WhatsApp... ⏳');
      // coba pendekin dulu biar tidak kepanjangan di WA (seperti di screenshot)
      const short = await shortenUrl(longUrl);
      if(short) url = short;
      else {
        // fallback: kalau is.gd diblokir CORS, buka tab is.gd manual biar user bisa copy pendeknya
        console.warn('is.gd gagal, pakai long URL untuk WA');
      }
      const text = `Hai sayang 💌 Aku buatkan buket digital untukmu: ${url}`;
      window.open('https://wa.me/?text='+encodeURIComponent(text), '_blank');
      if(short) showToast('WhatsApp dibuka dengan link pendek ✨');
    });
  }

  window._bloomsState = state;
  document.addEventListener('DOMContentLoaded', init);
})();

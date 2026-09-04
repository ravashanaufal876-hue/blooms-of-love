// Database 27 Bunga A-Z + Edelweiss — source for app.js
const FLOWERS = [
  { id:'amaryllis', letter:'A', name:'Amaryllis', meaning:'Kagum & Cinta yang Membara', color:'#C0392B', accent:'#F1948A', desc:'Melambangkan kebanggaan & cinta yang tulus bersinar.' },
  { id:'babysbreath', letter:'B', name:"Baby's Breath", meaning:'Cinta Abadi & Ketulusan', color:'#F9EBEA', accent:'#E8DAEF', desc:'Seperti napas cinta yang tak pernah putus, lembut dan abadi.' },
  { id:'camellia', letter:'C', name:'Camellia', meaning:'Kekaguman & Kesempurnaan', color:'#E74C3C', accent:'#F5B7B1', desc:'Kau adalah kesempurnaan yang aku kagumi setiap hari.' },
  { id:'dahlia', letter:'D', name:'Dahlia', meaning:'Anggun & Kreatif', color:'#8E44AD', accent:'#D7BDE2', desc:'Pesona elegan yang tak pernah membosankan.' },
  { id:'echinacea', letter:'E', name:'Echinacea', meaning:'Kekuatan & Penyembuhan', color:'#E67E22', accent:'#F5CBA7', desc:'Cintamu menyembuhkan setiap lelahku.' },
  { id:'edelweiss', letter:'E', name:'Edelweiss', meaning:'Cinta Abadi & Ketulusan di Ketinggian', color:'#F5F3EF', accent:'#E8E6E1', desc:'Bunga abadi dari puncak gunung — cintaku setia meski jarak & waktu memisahkan. Seperti Edelweiss yang mekar di ketinggian, hatiku hanya untukmu.' },
  { id:'freesia', letter:'F', name:'Freesia', meaning:'Kepercayaan & Kepolosan', color:'#F1C40F', accent:'#FEF9E7', desc:'Wangi kepercayaan yang manis dan jujur.' },
  { id:'gardenia', letter:'G', name:'Gardenia', meaning:'Cinta Rahasia & Kemurnian', color:'#FEFEFE', accent:'#FDEBD0', desc:'Kemurnian hatimu adalah rumah bagiku.' },
  { id:'hydrangea', letter:'H', name:'Hydrangea', meaning:'Ketulusan Hati', color:'#5DADE2', accent:'#AED6F1', desc:'Terima kasih karena selalu mengerti aku.' },
  { id:'iris', letter:'I', name:'Iris', meaning:'Harapan & Kebijaksanaan', color:'#7D3C98', accent:'#D2B4DE', desc:'Harapanku berlabuh pada tatap matamu.' },
  { id:'jasmine', letter:'J', name:'Jasmine', meaning:'Keanggunan & Sensualitas', color:'#FFFEF7', accent:'#FCF3CF', desc:'Anggun, harum, tak terlupakan seperti dirimu.' },
  { id:'kalmia', letter:'K', name:'Kalmia', meaning:'Ambisi & Pesona', color:'#EC7063', accent:'#FADBD8', desc:'Ambisi cintaku hanya untuk membahagiakanmu.' },
  { id:'lily', letter:'L', name:'Lily', meaning:'Kesucian & Kebahagiaan', color:'#FDFEFE', accent:'#FADBD8', desc:'Kau hadirkan kebahagiaan yang suci.' },
  { id:'marigold', letter:'M', name:'Marigold', meaning:'Kehangatan & Kreativitas', color:'#F39C12', accent:'#FDEBD0', desc:'Hangatnya cintamu seperti mentari pagi.' },
  { id:'nelumbo', letter:'N', name:'Nelumbo', meaning:'Pencerahan & Keabadian', color:'#F8BBD0', accent:'#FADBD8', desc:'Lotus cinta yang mekar di atas segala badai.' },
  { id:'orchid', letter:'O', name:'Orchid', meaning:'Mewah & Kekuatan', color:'#AF7AC5', accent:'#E8DAEF', desc:'Cinta mewah yang langka, hanya untukmu.' },
  { id:'peony', letter:'P', name:'Peony', meaning:'Kebahagiaan & Keberuntungan', color:'#F48FB1', accent:'#F9EBEA', desc:'Bersamamu adalah keberuntungan terbesarku.' },
  { id:'queen', letter:'Q', name:"Queen Anne's Lace", meaning:'Suaka & Fantasi', color:'#FEFEFE', accent:'#EAF2F8', desc:'Tempat paling aman adalah pelukmu.' },
  { id:'rose', letter:'R', name:'Rose', meaning:'Cinta Sejati', color:'#C0392B', accent:'#F5B7B1', desc:'Bahasa cinta paling jujur — Aku mencintaimu.' },
  { id:'sunflower', letter:'S', name:'Sunflower', meaning:'Kesetiaan & Kekaguman', color:'#F1C40F', accent:'#FEF9E7', desc:'Aku akan selalu menghadap ke arahmu, seperti sunflower pada matahari.' },
  { id:'tulip', letter:'T', name:'Tulip', meaning:'Pernyataan Cinta Sempurna', color:'#E91E63', accent:'#F8BBD0', desc:'Cinta sempurna yang tak butuh alasan.' },
  { id:'ursinia', letter:'U', name:'Ursinia', meaning:'Keceriaan & Semangat', color:'#F39C12', accent:'#FDEBD0', desc:'Tawamu adalah semangat hariku.' },
  { id:'violet', letter:'V', name:'Violet', meaning:'Kesetiaan & Kerendahan Hati', color:'#6C3483', accent:'#D2B4DE', desc:'Setia dalam diam, cinta dalam doa.' },
  { id:'wisteria', letter:'W', name:'Wisteria', meaning:'Cinta Panjang & Kenangan', color:'#A9CCE3', accent:'#D6EAF8', desc:'Cinta yang menjuntai panjang, tak lekang waktu.' },
  { id:'xeranthemum', letter:'X', name:'Xeranthemum', meaning:'Keabadian & Kenangan', color:'#9B59B6', accent:'#D7BDE2', desc:'Kenangan bersamamu abadi selamanya.' },
  { id:'yarrow', letter:'Y', name:'Yarrow', meaning:'Penyembuhan & Perlindungan', color:'#F9E79F', accent:'#FEF9E7', desc:'Akan kujaga hatimu dengan segenap jiwaku.' },
  { id:'zinnia', letter:'Z', name:'Zinnia', meaning:'Cinta yang Tak Pernah Pudar', color:'#E74C3C', accent:'#FADBD8', desc:'Meski waktu berlalu, cintaku takkan layu.' },
];

// Realistic botanical SVG — tiap bunga beda arketipe (mawar/tulip/peony/lily/daisy/dll)
let _svgCounter = 0;
function _petalRing(n, cx, cy, rx, ry, dist, gid, stroke, sw, op){
  let s = '';
  for(let i=0;i<n;i++){
    const a = (360/n)*i;
    s += `<ellipse cx="${cx}" cy="${cy-dist}" rx="${rx}" ry="${ry}" fill="url(#${gid})" stroke="${stroke}" stroke-width="${sw}" stroke-opacity="0.55" opacity="${op}" transform="rotate(${a} ${cx} ${cy})"/>`;
  }
  return s;
}
function _veins(n, cx, cy, len, color){
  let s = '';
  for(let i=0;i<n;i++){
    const a = (360/n)*i;
    s += `<line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy-len}" stroke="${color}" stroke-width="0.5" opacity="0.35" transform="rotate(${a} ${cx} ${cy})"/>`;
  }
  return s;
}
// Tekstur kelopak: grain velvet + serat halus (di-inject otomatis via wrapper di bawah)
function _flowerTextureCoat(){
  const tid = 'tex' + (++_svgCounter);
  const cid = 'clip' + tid;
  return `<defs>`
    + `<filter id="${tid}" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="11" stitchTiles="stitch"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.55 0"/></filter>`
    + `<clipPath id="${cid}"><circle cx="50" cy="52" r="33"/></clipPath>`
    + `</defs><g clip-path="url(#${cid})">`
    + `<rect x="14" y="14" width="72" height="72" filter="url(#${tid})" opacity="0.26"/>`
    + `<g opacity="0.13" stroke="white" stroke-width="0.8" fill="none" stroke-linecap="round"><path d="M28 58 Q50 53 72 58"/><path d="M30 67 Q50 62 70 67"/><path d="M33 44 Q50 39 67 44"/><path d="M36 76 Q50 72 64 76"/></g>`
    + `<g opacity="0.09" stroke="black" stroke-width="0.7" fill="none" stroke-linecap="round"><path d="M33 53 Q50 49 67 53"/><path d="M35 72 Q50 68 65 72"/></g>`
    + `</g>`;
}
function _flowerBase(flower, size=100){
  const c = flower.color;
  const ac = flower.accent;
  const uid = ++_svgCounter;
  const gid = `g-${flower.id}-${uid}`;
  const gid2 = `g2-${flower.id}-${uid}`;
  const defs = `
    <defs>
      <radialGradient id="${gid}" cx="50%" cy="38%" r="65%">
        <stop offset="0%" stop-color="${ac}"/><stop offset="55%" stop-color="${c}" stop-opacity="0.95"/><stop offset="100%" stop-color="${c}"/>
      </radialGradient>
      <radialGradient id="${gid2}" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#FFF8DC"/><stop offset="60%" stop-color="#F7D154"/><stop offset="100%" stop-color="#C9A227"/>
      </radialGradient>
    </defs>`;
  const open = `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${defs}`;
  const isPale = ['babysbreath','gardenia','jasmine','lily','queen','edelweiss'].includes(flower.id);
  const stroke = isPale ? '#B9AE9E' : 'white';
  const halo = isPale ? `<ellipse cx="50" cy="52" rx="30" ry="30" fill="none" stroke="#EFE3D2" stroke-width="1" opacity="0.9"/>` : '';

  // Edelweiss — tetap khusus
  if(flower.id === 'edelweiss'){
    return `${open}
    <g fill="white" stroke="#C4BEB6" stroke-width="1" stroke-linejoin="round">
      <path d="M50 14 L57 37 L80 41 L60 54 L63 79 L50 63 L37 79 L40 54 L20 41 L43 37 Z" fill="url(#${gid})"/>
      <path d="M50 24 L54 36 L68 40 L56 49 L58 66 L50 57 L42 66 L44 49 L32 40 L46 36 Z" fill="white" opacity="0.9" stroke="none"/>
    </g>
    <g fill="white" opacity="0.5"><circle cx="34" cy="42" r="1.4"/><circle cx="66" cy="42" r="1.4"/><circle cx="40" cy="58" r="1.2"/><circle cx="60" cy="58" r="1.2"/><circle cx="50" cy="30" r="1"/></g>
    <circle cx="50" cy="50" r="11" fill="url(#${gid2})" stroke="#8A6D1B" stroke-width="0.8"/>
    <g fill="#8A6D1B"><circle cx="47" cy="48" r="1.1"/><circle cx="53" cy="48" r="1.1"/><circle cx="50" cy="52" r="1.1"/><circle cx="46" cy="52" r="0.9"/><circle cx="54" cy="52" r="0.9"/></g>
    </svg>`;
  }

  // ROSE / CAMELLIA / PEONY-ish ruffled — mawar berlapis + spiral tengah
  if(['rose','camellia','peony','gardenia','nelumbo','kalmia'].includes(flower.id)){
    const outer = (flower.id==='peony'||flower.id==='nelumbo') ? 9 : 6;
    const inner = (flower.id==='peony') ? 7 : 5;
    return `${open}${halo}
    <g opacity="0.9">${_petalRing(outer, 50, 52, 17, 24, 20, gid, stroke, 0.9, 0.92)}</g>
    <g opacity="0.97">${_petalRing(inner, 50, 51, 13, 18, 12, gid, stroke, 0.7, 1)}</g>
    ${_veins(outer, 50, 52, 30, '#00000022')}
    <path d="M50 38 Q58 44 55 52 Q52 60 43 58 Q36 56 38 48 Q40 41 50 38" fill="none" stroke="#00000044" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M50 43 Q54 47 52 52 Q50 56 45 55" fill="none" stroke="#00000033" stroke-width="1.1" stroke-linecap="round"/>
    <circle cx="42" cy="38" r="4" fill="white" opacity="0.35"/>
    </svg>`;
  }

  // DAHLIA / ZINNIA / MARIGOLD / XERANTHEMUM — kelopak runcing berlapis
  if(['dahlia','zinnia','marigold','xeranthemum','ursinia'].includes(flower.id)){
    let layers = '';
    layers += _petalRing(12, 50, 50, 7, 22, 22, gid, stroke, 0.8, 0.9);
    layers += _petalRing(9, 50, 50, 6.5, 17, 15, gid, stroke, 0.7, 0.98);
    layers += _petalRing(6, 50, 50, 6, 12, 9, gid, stroke, 0.6, 1);
    return `${open}${halo}<g>${layers}</g>
    <circle cx="50" cy="50" r="9" fill="url(#${gid2})" stroke="#8A6D1B" stroke-width="0.8"/>
    <g fill="#6B4E0E" opacity="0.8"><circle cx="50" cy="47" r="1.2"/><circle cx="47" cy="50" r="1.1"/><circle cx="53" cy="50" r="1.1"/><circle cx="50" cy="53" r="1.1"/></g>
    <circle cx="47" cy="46" r="1.6" fill="white" opacity="0.5"/>
    </svg>`;
  }

  // TULIP / FREESIA — cangkir 3+3
  if(['tulip','freesia'].includes(flower.id)){
    return `${open}${halo}
    <g stroke="${stroke}" stroke-width="0.9" stroke-opacity="0.6">
      <path d="M32 78 Q30 45 38 28 Q44 40 46 58 Q48 72 44 80 Z" fill="url(#${gid})"/>
      <path d="M68 78 Q70 45 62 28 Q56 40 54 58 Q52 72 56 80 Z" fill="url(#${gid})"/>
      <path d="M50 82 Q38 70 38 42 Q42 30 50 24 Q58 30 62 42 Q62 70 50 82" fill="url(#${gid})" opacity="0.96"/>
      <path d="M50 82 Q44 68 44 44" fill="none" stroke="#00000022" stroke-width="0.8"/>
      <path d="M50 82 Q56 68 56 44" fill="none" stroke="#00000022" stroke-width="0.8"/>
    </g>
    <ellipse cx="38" cy="40" rx="3" ry="8" fill="white" opacity="0.3" transform="rotate(-12 38 40)"/>
    </svg>`;
  }

  // LILY / AMARYLLIS / IRIS — 6 tepal runcing + benang sari
  if(['lily','amaryllis','iris'].includes(flower.id)){
    return `${open}${halo}
    <g stroke="${stroke}" stroke-width="0.9" stroke-opacity="0.6">
      ${_petalRing(6, 50, 52, 11, 26, 22, gid, stroke, 0.9, 0.95)}
    </g>
    ${_veins(6, 50, 52, 32, '#00000028')}
    ${flower.id==='iris' ? `<circle cx="50" cy="52" r="5" fill="#F1C40F" opacity="0.9"/>` : ''}
    <g stroke="#6B4E0E" stroke-width="1" stroke-linecap="round">
      <line x1="50" y1="52" x2="42" y2="40"/><line x1="50" y1="52" x2="58" y2="40"/><line x1="50" y1="52" x2="50" y2="38"/>
    </g>
    <g fill="#5B3A0E"><circle cx="42" cy="40" r="1.8"/><circle cx="58" cy="40" r="1.8"/><circle cx="50" cy="38" r="1.8"/></g>
    <circle cx="40" cy="36" r="3" fill="white" opacity="0.35"/>
    </svg>`;
  }

  // SUNFLOWER — ray banyak + disk besar
  if(['sunflower'].includes(flower.id)){
    return `${open}
    <g>${_petalRing(16, 50, 50, 6, 24, 24, gid, '#8A6D1B', 0.7, 1)}</g>
    <g>${_petalRing(12, 50, 50, 6, 19, 18, gid, '#8A6D1B', 0.6, 1)}</g>
    <circle cx="50" cy="50" r="15" fill="#5B3A0E"/><circle cx="50" cy="50" r="12" fill="url(#${gid2})" opacity="0.9"/>
    <g fill="#5B3A0E" opacity="0.85"><circle cx="45" cy="47" r="1.3"/><circle cx="55" cy="47" r="1.3"/><circle cx="50" cy="52" r="1.3"/><circle cx="46" cy="53" r="1.1"/><circle cx="54" cy="53" r="1.1"/></g>
    </svg>`;
  }

  // DAISY lace — queen / yarrow / echinacea cone
  if(['queen','yarrow','echinacea','jasmine','violet','wisteria','hydrangea','babysbreath'].includes(flower.id)){
    if(flower.id==='babysbreath'){
      let dots = '';
      const pts = [[50,45],[40,50],[60,50],[45,60],[55,60],[50,35],[35,40],[65,40],[38,68],[62,68]];
      pts.forEach(([x,y],i)=>{ dots += `<g><line x1="50" y1="75" x2="${x}" y2="${y}" stroke="#8AA86B" stroke-width="0.8"/><circle cx="${x}" cy="${y}" r="${4.5-(i%3)}" fill="white" stroke="#C9BFB0" stroke-width="0.9"/><circle cx="${x-1}" cy="${y-1}" r="1" fill="white"/></g>`; });
      return `${open}<g>${dots}</g></svg>`;
    }
    if(flower.id==='hydrangea'){
      let fl = '';
      const pts = [[38,40],[50,36],[62,40],[34,52],[46,50],[58,50],[66,52],[40,62],[52,62],[62,62]];
      pts.forEach(([x,y])=>{ fl += `<g transform="translate(${x} ${y})"><circle cx="0" cy="-3" r="4" fill="url(#${gid})" stroke="${stroke}" stroke-width="0.7"/><circle cx="-3.5" cy="1" r="4" fill="url(#${gid})" stroke="${stroke}" stroke-width="0.7"/><circle cx="3.5" cy="1" r="4" fill="url(#${gid})" stroke="${stroke}" stroke-width="0.7"/><circle cx="0" cy="3.5" r="3.4" fill="url(#${gid})" stroke="${stroke}" stroke-width="0.7"/><circle cx="0" cy="0" r="1.4" fill="#F1C40F"/></g>`; });
      return `${open}${halo}<g>${fl}</g></svg>`;
    }
    if(flower.id==='wisteria'){
      let fl = '';
      for(let i=0;i<7;i++){ const y = 28+i*9; const w = 12-i*1.2;
        fl += `<ellipse cx="50" cy="${y}" rx="${w}" ry="6" fill="url(#${gid})" stroke="${stroke}" stroke-width="0.6" opacity="0.95"/>`; }
      return `${open}<path d="M50 18 L50 88" stroke="#5C7F5E" stroke-width="1.6"/>${fl}<circle cx="50" cy="24" r="3" fill="white" opacity="0.4"/></svg>`;
    }
    if(flower.id==='violet'){
      return `${open}${halo}
      <g stroke="${stroke}" stroke-width="0.8" stroke-opacity="0.6">
        <ellipse cx="42" cy="36" rx="10" ry="13" fill="url(#${gid})" transform="rotate(-18 42 36)"/>
        <ellipse cx="58" cy="36" rx="10" ry="13" fill="url(#${gid})" transform="rotate(18 58 36)"/>
        <ellipse cx="38" cy="60" rx="11" ry="14" fill="url(#${gid})" transform="rotate(-24 38 60)"/>
        <ellipse cx="62" cy="60" rx="11" ry="14" fill="url(#${gid})" transform="rotate(24 62 60)"/>
        <ellipse cx="50" cy="66" rx="11" ry="13" fill="url(#${gid})"/>
      </g>
      <circle cx="50" cy="52" r="4.5" fill="url(#${gid2})" stroke="#8A6D1B" stroke-width="0.7"/>
      </svg>`;
    }
    if(flower.id==='jasmine'){
      return `${open}${halo}<g>${_petalRing(5, 50, 52, 10, 20, 18, gid, stroke, 0.9, 0.98)}</g>
      <circle cx="50" cy="52" r="5" fill="url(#${gid2})"/><circle cx="50" cy="52" r="2" fill="#8A6D1B"/></svg>`;
    }
    // queen / yarrow / echinacea default daisy
    const cone = (flower.id==='echinacea');
    return `${open}${halo}<g>${_petalRing(13, 50, 52, 5.5, 21, 21, gid, stroke, 0.8, 0.96)}</g>
    ${cone
      ? `<ellipse cx="50" cy="52" rx="8" ry="11" fill="#8A5A1B"/><ellipse cx="50" cy="49" rx="6" ry="8" fill="url(#${gid2})"/>`
      : `<circle cx="50" cy="52" r="9" fill="url(#${gid2})" stroke="#8A6D1B" stroke-width="0.8"/><g fill="#6B4E0E"><circle cx="48" cy="50" r="1"/><circle cx="52" cy="51" r="1"/><circle cx="50" cy="54" r="1"/></g>`}
    </svg>`;
  }

  // ORCHID — bibir khas
  if(['orchid'].includes(flower.id)){
    return `${open}${halo}
    <g fill="url(#${gid})" stroke="${stroke}" stroke-width="0.8" stroke-opacity="0.6">
      <ellipse cx="50" cy="32" rx="11" ry="15"/>
      <ellipse cx="32" cy="44" rx="13" ry="11" transform="rotate(-24 32 44)"/>
      <ellipse cx="68" cy="44" rx="13" ry="11" transform="rotate(24 68 44)"/>
      <ellipse cx="36" cy="64" rx="12" ry="14" transform="rotate(-18 36 64)"/>
      <ellipse cx="64" cy="64" rx="12" ry="14" transform="rotate(18 64 64)"/>
    </g>
    <path d="M50 52 Q44 62 40 70 Q50 74 60 70 Q56 62 50 52" fill="#7A1C4E" stroke="white" stroke-width="0.7"/>
    <circle cx="50" cy="52" r="3.4" fill="#F1C40F" stroke="#8A6D1B" stroke-width="0.7"/>
    </svg>`;
  }

  // LOTUS extra glow sudah di rose; fallback generic 8-petal bertekstur
  return `${open}${halo}
  <g opacity="0.95">${_petalRing(8, 50, 52, 13, 22, 20, gid, stroke, 0.85, 0.96)}</g>
  <g opacity="1">${_petalRing(5, 50, 51, 10, 15, 11, gid, stroke, 0.7, 1)}</g>
  ${_veins(8, 50, 52, 28, '#00000020')}
  <circle cx="50" cy="52" r="8" fill="url(#${gid2})" stroke="#8A6D1B" stroke-width="0.8"/>
  <circle cx="47" cy="49" r="1.5" fill="white" opacity="0.6"/>
  </svg>`;
}
// === JALUR REALISTIS: watercolor transparan ala Digibouquet (pauwee CDN, teruji 200 OK) ===
// 12 aset asli: orchid/tulip/dahlia/anemone/carnation/zinnia/ranunculus/sunflower/lily/daisy/peony/rose
const PAUWEE_BASE = 'https://assets.pauwee.com/color/flowers';
const FLOWER_IMG_MAP = {
  amaryllis:'lily', babysbreath:'daisy', camellia:'rose', dahlia:'dahlia',
  echinacea:'anemone', edelweiss:'daisy', freesia:'ranunculus', gardenia:'peony',
  hydrangea:'peony', iris:'lily', jasmine:'daisy', kalmia:'carnation',
  lily:'lily', marigold:'zinnia', nelumbo:'peony', orchid:'orchid',
  peony:'peony', queen:'daisy', rose:'rose', sunflower:'sunflower',
  tulip:'tulip', ursinia:'zinnia', violet:'anemone', wisteria:'orchid',
  xeranthemum:'carnation', yarrow:'daisy', zinnia:'zinnia'
};
function flowerImgURL(flower){ return `img/flowers/${flower.id}.png`; }
function flowerImgFallbackURL(fid){ return `${PAUWEE_BASE}/${FLOWER_IMG_MAP[fid] || 'rose'}.webp`; }
window._pauweeFallback = flowerImgFallbackURL;
// Fallback: kalau CDN offline, pakai SVG botanis lama (_flowerBase + tekstur)
window._flowerSVGfallback = function(fid, size){
  try{
    const f = (window.FLOWERS||[]).find(x=>x.id===fid) || {id:fid, color:'#E88D9C', accent:'#FADBD8'};
    const base = _flowerBase(f, size||80);
    if(fid === 'babysbreath') return base;
    return base.replace('</svg>', _flowerTextureCoat() + '</svg>');
  }catch(e){ return ''; }
};
// Wrapper: lokal dulu (27 file distinct) -> pauwee CDN -> SVG botanis. Tidak pernah kotak rusak.
function flowerSVG(flower, size=100){
  const url = flowerImgURL(flower);
  const px = Number(size)||80;
  return `<img class="flower-img" src="${url}" width="${px}" height="${px}" alt="${flower.name}" loading="lazy" draggable="false" data-fid="${flower.id}" data-size="${px}" style="width:${px}px;height:${px}px;object-fit:contain;filter:drop-shadow(0 6px 10px rgba(0,0,0,.14));pointer-events:none" onerror="try{if(!this.dataset.fb){this.dataset.fb='1';this.src=window._pauweeFallback(this.dataset.fid)}else{this.outerHTML=window._flowerSVGfallback(this.dataset.fid,Number(this.dataset.size||80))}}catch(e){this.remove()}"/>`;
}

// === GREENERY REALISTIS: foto daun Unsplash (mask radial) + SVG rimbun di atasnya ===
const GREENERY_PHOTO = {
  leafy:'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&q=80&auto=format&fit=crop',
  fern:'https://images.unsplash.com/photo-1470058869958-2a77ade41c02?w=600&q=80&auto=format&fit=crop',
  eucalyptus:'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600&q=80&auto=format&fit=crop',
  willow:'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=600&q=80&auto=format&fit=crop'
};
function _greeneryBaseSVG(type){
  // panggil implementasi SVG rimbun yang lama (dipindah ke _greeneryBase di bawah via patch)
  return (typeof _greenerySVGcore === 'function') ? _greenerySVGcore(type) : '';
}
const _greenerySVGcore = greenerySVG;
greenerySVG = function(type){
  const photo = GREENERY_PHOTO[type] || GREENERY_PHOTO.leafy;
  const core = _greeneryBaseSVG(type);
  return `<img class="g-photo" src="${photo}" alt="${type} foliage" loading="lazy" draggable="false" onerror="this.remove()" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.5;filter:saturate(1.05);-webkit-mask-image:radial-gradient(circle at 50% 55%, black 52%, transparent 72%);mask-image:radial-gradient(circle at 50% 55%, black 52%, transparent 72%)"/>`
    + `<div class="g-svg" style="position:absolute;inset:0">${core}</div>`;
};
// Greenery & Card Styles — Digibouquet-like
const GREENERIES = [
  { id:'leafy', name:'Leafy', desc:'Penuh & hangat' },
  { id:'fern', name:'Fern', desc:'Airy & ringan' },
  { id:'eucalyptus', name:'Eucalyptus', desc:'Kalm & soft' },
  { id:'willow', name:'Willow', desc:'Menjuntai elegan' },
];
const CARD_STYLES = [
  { id:'ivory', name:'Ivory', desc:'Minimal, bersih' },
  { id:'parchment', name:'Parchment', desc:'Love letter' },
  { id:'blush', name:'Blush', desc:'Romantis' },
  { id:'botanical', name:'Botanical', desc:'Press hijau' },
  { id:'midnight', name:'Midnight', desc:'Editorial mono' },
];

// SVG daun rimbun & padat — 2 lapis (belakang gelap + depan terang) biar penuh
function greenerySVG(type){
  const common = `xmlns="http://www.w3.org/2000/svg" aria-hidden="true"`;
  if(type==='fern'){
    return `<svg viewBox="0 0 220 220" width="100%" height="100%" ${common}>
      <g fill="none" stroke="#4E6E50" stroke-width="3.5" stroke-linecap="round" opacity="0.95">
        <path d="M110 195 Q110 120 55 60"/><path d="M110 195 Q110 120 165 60"/>
        <path d="M110 195 Q95 125 30 95"/><path d="M110 195 Q125 125 190 95"/>
        <path d="M110 195 Q100 130 60 130"/><path d="M110 195 Q120 130 160 130"/>
        <path d="M110 195 L110 38"/><path d="M110 195 Q90 140 85 70"/><path d="M110 195 Q130 140 135 70"/>
      </g>
      <g fill="#4E7A50" opacity="0.95">
        <ellipse cx="55" cy="60" rx="8" ry="18" transform="rotate(-35 55 60)"/><ellipse cx="165" cy="60" rx="8" ry="18" transform="rotate(35 165 60)"/>
        <ellipse cx="30" cy="95" rx="7" ry="16" transform="rotate(-60 30 95)"/><ellipse cx="190" cy="95" rx="7" ry="16" transform="rotate(60 190 95)"/>
        <ellipse cx="60" cy="130" rx="7" ry="15" transform="rotate(-30 60 130)"/><ellipse cx="160" cy="130" rx="7" ry="15" transform="rotate(30 160 130)"/>
        <ellipse cx="110" cy="38" rx="7" ry="15"/><ellipse cx="85" cy="70" rx="6" ry="14" transform="rotate(-15 85 70)"/><ellipse cx="135" cy="70" rx="6" ry="14" transform="rotate(15 135 70)"/>
      </g>
      <g fill="#7CB47E" opacity="0.98">
        <ellipse cx="72" cy="88" rx="6" ry="14" transform="rotate(-25 72 88)"/><ellipse cx="148" cy="88" rx="6" ry="14" transform="rotate(25 148 88)"/>
        <ellipse cx="50" cy="115" rx="5.5" ry="13" transform="rotate(-45 50 115)"/><ellipse cx="170" cy="115" rx="5.5" ry="13" transform="rotate(45 170 115)"/>
        <ellipse cx="92" cy="112" rx="5.5" ry="13" transform="rotate(-18 92 112)"/><ellipse cx="128" cy="112" rx="5.5" ry="13" transform="rotate(18 128 112)"/>
        <ellipse cx="98" cy="60" rx="5" ry="12" transform="rotate(-10 98 60)"/><ellipse cx="122" cy="60" rx="5" ry="12" transform="rotate(10 122 60)"/>
        <ellipse cx="110" cy="68" rx="5.5" ry="13"/><ellipse cx="110" cy="100" rx="5.5" ry="13"/><ellipse cx="110" cy="132" rx="5.5" ry="12"/>
        <ellipse cx="80" cy="150" rx="5" ry="12" transform="rotate(-20 80 150)"/><ellipse cx="140" cy="150" rx="5" ry="12" transform="rotate(20 140 150)"/>
      </g>
    </svg>`;
  }
  if(type==='eucalyptus'){
    return `<svg viewBox="0 0 220 220" width="100%" height="100%" ${common}>
      <g fill="none" stroke="#7FA396" stroke-width="3.5" stroke-linecap="round" opacity="0.95">
        <path d="M70 198 Q65 130 58 50"/><path d="M150 198 Q155 130 162 50"/>
        <path d="M90 198 Q88 130 84 55"/><path d="M130 198 Q132 130 136 55"/><path d="M110 198 L110 35"/>
      </g>
      <g fill="#8FB5A8" stroke="#6E9386" stroke-width="1" opacity="0.95">
        <circle cx="58" cy="50" r="15"/><circle cx="162" cy="50" r="15"/><circle cx="84" cy="55" r="13"/><circle cx="136" cy="55" r="13"/>
        <circle cx="62" cy="90" r="13"/><circle cx="158" cy="90" r="13"/><circle cx="110" cy="35" r="16"/>
        <circle cx="68" cy="128" r="12"/><circle cx="152" cy="128" r="12"/>
      </g>
      <g fill="#C2D8D0" stroke="#8FB5A8" stroke-width="1" opacity="0.99">
        <circle cx="84" cy="92" r="13"/><circle cx="136" cy="92" r="13"/><circle cx="110" cy="72" r="14"/>
        <circle cx="90" cy="128" r="12"/><circle cx="130" cy="128" r="12"/><circle cx="110" cy="108" r="13"/>
        <circle cx="94" cy="162" r="11"/><circle cx="126" cy="162" r="11"/><circle cx="110" cy="142" r="12"/>
      </g>
      <g fill="white" opacity="0.4"><circle cx="104" cy="30" r="3"/><circle cx="53" cy="45" r="2.5"/><circle cx="157" cy="45" r="2.5"/><circle cx="79" cy="87" r="2.5"/><circle cx="131" cy="87" r="2.5"/></g>
    </svg>`;
  }
  if(type==='willow'){
    return `<svg viewBox="0 0 220 220" width="100%" height="100%" ${common}>
      <g fill="none" stroke-linecap="round" opacity="0.95">
        <path d="M35 35 Q28 110 36 190" stroke="#7A9A5B" stroke-width="3"/>
        <path d="M62 30 Q56 110 62 190" stroke="#7A9A5B" stroke-width="3"/>
        <path d="M88 25 Q86 110 88 192" stroke="#7A9A5B" stroke-width="3"/>
        <path d="M110 22 Q110 110 110 192" stroke="#7A9A5B" stroke-width="3.2"/>
        <path d="M132 25 Q134 110 132 192" stroke="#7A9A5B" stroke-width="3"/>
        <path d="M158 30 Q164 110 158 190" stroke="#7A9A5B" stroke-width="3"/>
        <path d="M185 35 Q192 110 184 190" stroke="#7A9A5B" stroke-width="3"/>
      </g>
      <g fill="#7FA35F" opacity="0.94">
        <ellipse cx="36" cy="80" rx="5.5" ry="16"/><ellipse cx="36" cy="115" rx="5.5" ry="16"/><ellipse cx="36" cy="150" rx="5.5" ry="15"/><ellipse cx="36" cy="180" rx="5" ry="13"/>
        <ellipse cx="62" cy="75" rx="5.5" ry="16"/><ellipse cx="62" cy="110" rx="5.5" ry="16"/><ellipse cx="62" cy="145" rx="5.5" ry="15"/><ellipse cx="62" cy="178" rx="5" ry="13"/>
        <ellipse cx="158" cy="75" rx="5.5" ry="16"/><ellipse cx="158" cy="110" rx="5.5" ry="16"/><ellipse cx="158" cy="145" rx="5.5" ry="15"/><ellipse cx="158" cy="178" rx="5" ry="13"/>
        <ellipse cx="184" cy="80" rx="5.5" ry="16"/><ellipse cx="184" cy="115" rx="5.5" ry="16"/><ellipse cx="184" cy="150" rx="5.5" ry="15"/><ellipse cx="184" cy="180" rx="5" ry="13"/>
      </g>
      <g fill="#A9C98A" opacity="0.99">
        <ellipse cx="88" cy="70" rx="5.5" ry="17"/><ellipse cx="88" cy="108" rx="5.5" ry="17"/><ellipse cx="88" cy="146" rx="5.5" ry="16"/><ellipse cx="88" cy="180" rx="5" ry="13"/>
        <ellipse cx="110" cy="66" rx="5.5" ry="18"/><ellipse cx="110" cy="105" rx="5.5" ry="18"/><ellipse cx="110" cy="144" rx="5.5" ry="17"/><ellipse cx="110" cy="180" rx="5" ry="14"/>
        <ellipse cx="132" cy="70" rx="5.5" ry="17"/><ellipse cx="132" cy="108" rx="5.5" ry="17"/><ellipse cx="132" cy="146" rx="5.5" ry="16"/><ellipse cx="132" cy="180" rx="5" ry="13"/>
      </g>
    </svg>`;
  }
  // leafy (default) — rimbun 2 lapis: belakang gelap 10 daun + depan terang 9 daun
  return `<svg viewBox="0 0 220 220" width="100%" height="100%" ${common}>
    <g fill="#5C7F5E" opacity="0.95">
      <ellipse cx="45" cy="100" rx="21" ry="36" transform="rotate(-30 45 100)"/>
      <ellipse cx="175" cy="100" rx="21" ry="36" transform="rotate(30 175 100)"/>
      <ellipse cx="65" cy="62" rx="19" ry="32" transform="rotate(-16 65 62)"/>
      <ellipse cx="155" cy="62" rx="19" ry="32" transform="rotate(16 155 62)"/>
      <ellipse cx="110" cy="40" rx="20" ry="34"/>
      <ellipse cx="30" cy="140" rx="17" ry="30" transform="rotate(-45 30 140)"/>
      <ellipse cx="190" cy="140" rx="17" ry="30" transform="rotate(45 190 140)"/>
      <ellipse cx="85" cy="140" rx="17" ry="28" transform="rotate(-12 85 140)"/>
      <ellipse cx="135" cy="140" rx="17" ry="28" transform="rotate(12 135 140)"/>
      <ellipse cx="110" cy="160" rx="18" ry="28"/>
    </g>
    <g fill="#7BA17D" stroke="#5C7F5E" stroke-width="1" opacity="0.99">
      <ellipse cx="60" cy="95" rx="18" ry="30" transform="rotate(-25 60 95)"/>
      <ellipse cx="160" cy="95" rx="18" ry="30" transform="rotate(25 160 95)"/>
      <ellipse cx="85" cy="65" rx="16" ry="27" transform="rotate(-12 85 65)"/>
      <ellipse cx="135" cy="65" rx="16" ry="27" transform="rotate(12 135 65)"/>
      <ellipse cx="110" cy="55" rx="17" ry="29"/>
      <ellipse cx="48" cy="128" rx="14" ry="25" transform="rotate(-38 48 128)"/>
      <ellipse cx="172" cy="128" rx="14" ry="25" transform="rotate(38 172 128)"/>
      <ellipse cx="92" cy="122" rx="14" ry="24"/>
      <ellipse cx="128" cy="122" rx="14" ry="24"/>
    </g>
    <g fill="none" stroke="#4E6E50" stroke-width="1.3" opacity="0.65">
      <path d="M60 68 L60 122"/><path d="M160 68 L160 122"/><path d="M110 28 L110 82"/><path d="M92 100 L92 144"/><path d="M128 100 L128 144"/>
    </g>
  </svg>`;
}

window.FLOWERS = FLOWERS;
window.flowerSVG = flowerSVG;
window.greenerySVG = greenerySVG;
window.GREENERIES = GREENERIES;
window.CARD_STYLES = CARD_STYLES;

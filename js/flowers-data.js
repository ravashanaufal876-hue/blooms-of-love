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

// helper untuk buat SVG inline — warna diambil dari flower.color/accent
let _svgCounter = 0;
function flowerSVG(flower, size=100){
  const c = flower.color;
  const ac = flower.accent;
  const uid = ++_svgCounter;
  // Edelweiss: rendering khusus — bintang putih woolly khas Edelweiss Alpen (ID unik biar tidak bentrok di bouquet)
  if(flower.id === 'edelweiss'){
    const gid = `g-edelweiss-${uid}`;
    const fid = `woolly-${uid}`;
    return `
  <svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <radialGradient id="${gid}" cx="50%" cy="50%" r="55%">
        <stop offset="0%" stop-color="#FFFFFF"/>
        <stop offset="100%" stop-color="#E8E6E1"/>
      </radialGradient>
      <filter id="${fid}"><feTurbulence baseFrequency="0.9" numOctaves="2" result="t"/><feDisplacementMap in="SourceGraphic" in2="t" scale="0.6"/></filter>
    </defs>
    <g fill="url(#${gid})" stroke="#C4BEB6" stroke-width="1" stroke-linejoin="round" opacity="0.98">
      <path d="M50 18 L56 38 L78 42 L59 54 L62 78 L50 63 L38 78 L41 54 L22 42 L44 38 Z" />
      <path d="M50 24 L54 36 L68 40 L56 49 L58 66 L50 57 L42 66 L44 49 L32 40 L46 36 Z" fill="white" opacity="0.95" stroke="none"/>
    </g>
    <g fill="white" opacity="0.55">
      <circle cx="36" cy="44" r="1.1"/><circle cx="64" cy="44" r="1.1"/><circle cx="42" cy="58" r="1"/><circle cx="58" cy="58" r="1"/><circle cx="50" cy="34" r="0.9"/>
    </g>
    <g>
      <circle cx="50" cy="50" r="13.5" fill="#F9E79F" stroke="#D4A373" stroke-width="1"/>
      <circle cx="50" cy="50" r="9" fill="#F7D154" stroke="#C9A227" stroke-width="0.7"/>
      <g fill="#F1C40F" stroke="#B8941A" stroke-width="0.4">
        <circle cx="50" cy="46.5" r="2.2"/><circle cx="46.2" cy="49.2" r="2"/><circle cx="53.8" cy="49.2" r="2"/>
        <circle cx="47.5" cy="53.5" r="1.9"/><circle cx="52.5" cy="53.5" r="1.9"/>
      </g>
      <circle cx="48.2" cy="47.8" r="1" fill="white" opacity="0.85"/>
    </g>
  </svg>`;
  }
  // Deteksi bunga putih/pucat yang sebelumnya terlihat transparan di background putih bucket
  const isPale = ['babysbreath','gardenia','jasmine','lily','queen'].includes(flower.id);
  const gid = `g-${flower.id}-${uid}`;
  // Untuk bunga pucat, pakai stroke lebih gelap + halo tipis biar kontras di canvas putih
  const petalStroke = isPale ? '#C9BFB0' : 'white';
  const petalStrokeOp = isPale ? '0.95' : '0.35';
  const petalStrokeW = isPale ? '1.15' : '0.8';
  const halo = isPale ? `<circle cx="50" cy="50" r="19.5" fill="none" stroke="#EFE8DE" stroke-width="0.9" opacity="0.9"/>` : '';
  return `
  <svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <radialGradient id="${gid}" cx="50%" cy="45%" r="50%">
        <stop offset="0%" stop-color="${ac}" />
        <stop offset="100%" stop-color="${c}" />
      </radialGradient>
    </defs>
    ${halo}
    <g opacity="0.98">
      <ellipse cx="50" cy="28" rx="16" ry="22" fill="url(#${gid})" stroke="${petalStroke}" stroke-opacity="${petalStrokeOp}" stroke-width="${petalStrokeW}"/>
      <ellipse cx="50" cy="28" rx="16" ry="22" fill="url(#${gid})" transform="rotate(60 50 50)" stroke="${petalStroke}" stroke-opacity="${petalStrokeOp}" stroke-width="${petalStrokeW}"/>
      <ellipse cx="50" cy="28" rx="16" ry="22" fill="url(#${gid})" transform="rotate(120 50 50)" stroke="${petalStroke}" stroke-opacity="${petalStrokeOp}" stroke-width="${petalStrokeW}"/>
      <ellipse cx="50" cy="28" rx="16" ry="22" fill="url(#${gid})" transform="rotate(180 50 50)" stroke="${petalStroke}" stroke-opacity="${petalStrokeOp}" stroke-width="${petalStrokeW}"/>
      <ellipse cx="50" cy="28" rx="16" ry="22" fill="url(#${gid})" transform="rotate(240 50 50)" stroke="${petalStroke}" stroke-opacity="${petalStrokeOp}" stroke-width="${petalStrokeW}"/>
      <ellipse cx="50" cy="28" rx="16" ry="22" fill="url(#${gid})" transform="rotate(300 50 50)" stroke="${petalStroke}" stroke-opacity="${petalStrokeOp}" stroke-width="${petalStrokeW}"/>
    </g>
    <circle cx="50" cy="50" r="14" fill="#F9E79F" stroke="#D4A373" stroke-width="1.2"/>
    <circle cx="50" cy="50" r="7" fill="#F1C40F" opacity="0.9"/>
    <circle cx="46" cy="47" r="2.2" fill="white" opacity="0.85"/>
  </svg>`;
}
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

// SVG daun beneran — biar greenery kelihatan, bukan cuma glow samar
function greenerySVG(type){
  const common = `xmlns="http://www.w3.org/2000/svg" aria-hidden="true"`;
  if(type==='fern'){
    return `<svg viewBox="0 0 220 220" width="100%" height="100%" ${common}>
      <g fill="none" stroke="#5A7D5A" stroke-width="3" stroke-linecap="round" opacity="0.95">
        <path d="M110 190 Q110 120 60 70"/><path d="M110 190 Q110 120 160 70"/>
        <path d="M110 190 Q100 120 40 100"/><path d="M110 190 Q120 120 180 100"/>
        <path d="M110 190 L110 50"/>
      </g>
      <g fill="#6B9A6B" opacity="0.95">
        <ellipse cx="60" cy="70" rx="7" ry="16" transform="rotate(-38 60 70)"/><ellipse cx="160" cy="70" rx="7" ry="16" transform="rotate(38 160 70)"/>
        <ellipse cx="40" cy="100" rx="6" ry="14" transform="rotate(-62 40 100)"/><ellipse cx="180" cy="100" rx="6" ry="14" transform="rotate(62 180 100)"/>
        <ellipse cx="82" cy="105" rx="6" ry="13" transform="rotate(-24 82 105)"/><ellipse cx="138" cy="105" rx="6" ry="13" transform="rotate(24 138 105)"/>
        <ellipse cx="95" cy="80" rx="5" ry="12" transform="rotate(-12 95 80)"/><ellipse cx="125" cy="80" rx="5" ry="12" transform="rotate(12 125 80)"/>
        <ellipse cx="110" cy="52" rx="6" ry="13"/>
      </g>
    </svg>`;
  }
  if(type==='eucalyptus'){
    return `<svg viewBox="0 0 220 220" width="100%" height="100%" ${common}>
      <g fill="none" stroke="#8AAFA1" stroke-width="3" stroke-linecap="round" opacity="0.95">
        <path d="M85 195 Q80 130 70 60"/><path d="M135 195 Q140 130 150 60"/><path d="M110 195 L110 45"/>
      </g>
      <g fill="#A8C3B9" stroke="#7FA396" stroke-width="1" opacity="0.98">
        <circle cx="70" cy="60" r="14"/><circle cx="150" cy="60" r="14"/><circle cx="110" cy="45" r="15"/>
        <circle cx="77" cy="100" r="12"/><circle cx="143" cy="100" r="12"/>
        <circle cx="82" cy="138" r="11"/><circle cx="138" cy="138" r="11"/>
        <circle cx="110" cy="85" r="12"/><circle cx="110" cy="120" r="11"/>
      </g>
      <g fill="white" opacity="0.35"><circle cx="105" cy="40" r="3"/><circle cx="65" cy="55" r="2.5"/><circle cx="145" cy="55" r="2.5"/></g>
    </svg>`;
  }
  if(type==='willow'){
    return `<svg viewBox="0 0 220 220" width="100%" height="100%" ${common}>
      <g fill="none" stroke-linecap="round" opacity="0.95">
        <path d="M60 40 Q50 110 58 185" stroke="#8AA86B" stroke-width="3"/>
        <path d="M110 30 Q110 110 110 190" stroke="#8AA86B" stroke-width="3"/>
        <path d="M160 40 Q170 110 162 185" stroke="#8AA86B" stroke-width="3"/>
      </g>
      <g fill="#9DBE7F" opacity="0.96">
        <ellipse cx="58" cy="90" rx="5" ry="16" transform="rotate(-8 58 90)"/><ellipse cx="58" cy="125" rx="5" ry="16" transform="rotate(8 58 125)"/><ellipse cx="58" cy="160" rx="5" ry="15"/>
        <ellipse cx="110" cy="80" rx="5" ry="17"/><ellipse cx="110" cy="118" rx="5" ry="17"/><ellipse cx="110" cy="156" rx="5" ry="16"/>
        <ellipse cx="162" cy="90" rx="5" ry="16" transform="rotate(8 162 90)"/><ellipse cx="162" cy="125" rx="5" ry="16" transform="rotate(-8 162 125)"/><ellipse cx="162" cy="160" rx="5" ry="15"/>
      </g>
    </svg>`;
  }
  // leafy (default) — penuh & hangat
  return `<svg viewBox="0 0 220 220" width="100%" height="100%" ${common}>
    <g fill="#7BA17D" stroke="#5C7F5E" stroke-width="1" opacity="0.98">
      <ellipse cx="55" cy="90" rx="20" ry="34" transform="rotate(-28 55 90)"/>
      <ellipse cx="165" cy="90" rx="20" ry="34" transform="rotate(28 165 90)"/>
      <ellipse cx="75" cy="60" rx="18" ry="30" transform="rotate(-14 75 60)"/>
      <ellipse cx="145" cy="60" rx="18" ry="30" transform="rotate(14 145 60)"/>
      <ellipse cx="110" cy="48" rx="19" ry="32"/>
      <ellipse cx="40" cy="130" rx="16" ry="28" transform="rotate(-42 40 130)"/>
      <ellipse cx="180" cy="130" rx="16" ry="28" transform="rotate(42 180 130)"/>
    </g>
    <g fill="none" stroke="#4E6E50" stroke-width="1.4" opacity="0.7">
      <path d="M55 62 L55 118"/><path d="M165 62 L165 118"/><path d="M110 18 L110 78"/>
    </g>
  </svg>`;
}

window.FLOWERS = FLOWERS;
window.flowerSVG = flowerSVG;
window.greenerySVG = greenerySVG;
window.GREENERIES = GREENERIES;
window.CARD_STYLES = CARD_STYLES;

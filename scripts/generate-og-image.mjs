import sharp from 'sharp';

const W = 1200;
const H = 630;
const BG = '#0d2b23';
const ACCENT = '#c9a962';

const PHOTO_W = 480;
const TEXT_X = 540;

// Recorte "peito para cima" na foto original de 4480x5600
const CROP = { left: 728, top: 308, width: 2856, height: 3584 };

// Vai para public/ porque a meta tag precisa de um nome de arquivo estável (o Vite não versiona esta pasta)
const OUT = 'public/og-image.jpg';

const photo = await sharp('assets/images/IMG_7031-Edit.jpg')
    .extract(CROP)
    .resize(PHOTO_W, H, { fit: 'cover', position: 'top' })
    .toBuffer();

const fade = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${PHOTO_W}" height="${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0.5" stop-color="${BG}" stop-opacity="0"/>
      <stop offset="1" stop-color="${BG}" stop-opacity="1"/>
    </linearGradient>
  </defs>
  <rect width="${PHOTO_W}" height="${H}" fill="url(#g)"/>
</svg>`);

const text = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect x="${TEXT_X}" y="238" width="60" height="4" fill="${ACCENT}"/>
  <text x="${TEXT_X}" y="306" font-family="Georgia, 'Times New Roman', serif" font-size="42" font-weight="700" fill="#ffffff">Dr. Thallys Henrique Alves</text>
  <text x="${TEXT_X}" y="354" font-family="'Segoe UI', Arial, sans-serif" font-size="24" font-weight="600" letter-spacing="1.5" fill="${ACCENT}">M&#233;dico &#183; CRM-ES 18647</text>
  <text x="${TEXT_X}" y="394" font-family="'Segoe UI', Arial, sans-serif" font-size="22" font-weight="400" fill="#ffffff" fill-opacity="0.72">Colatina &#183; Vit&#243;ria &#183; Teleconsulta</text>
</svg>`);

// Monograma do logo em branco (o arquivo original é verde escuro sobre transparente)
const mark = await sharp('assets/logo/logo-removebg-preview.png')
    .extract({ left: 145, top: 5, width: 310, height: 210 })
    .resize({ height: 64 })
    .ensureAlpha()
    .extractChannel('alpha')
    .raw()
    .toBuffer({ resolveWithObject: true });

const logo = await sharp({
    create: { width: mark.info.width, height: mark.info.height, channels: 3, background: '#ffffff' }
})
    .joinChannel(mark.data, { raw: { width: mark.info.width, height: mark.info.height, channels: 1 } })
    .png()
    .toBuffer();

await sharp({ create: { width: W, height: H, channels: 3, background: BG } })
    .composite([
        { input: photo, top: 0, left: 0 },
        { input: fade, top: 0, left: 0 },
        { input: text, top: 0, left: 0 },
        { input: logo, top: H - 64 - 60, left: W - mark.info.width - 60 }
    ])
    .jpeg({ quality: 88, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toFile(OUT);

const out = await sharp(OUT).metadata();
console.log(`${OUT} ${out.width}x${out.height}`);

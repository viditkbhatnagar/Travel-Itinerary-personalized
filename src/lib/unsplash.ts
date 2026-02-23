// ============================================================
// Curated Unsplash image URLs for Trails and Miles
// All images are high-quality, free-to-use Unsplash photos
// ============================================================

const UNSPLASH_BASE = 'https://images.unsplash.com';

// ── DESTINATION HERO + CARD IMAGES ──────────────────────────

export const DESTINATION_IMAGES: Record<string, { hero: string; card: string; gallery: string[] }> = {
  vietnam: {
    hero: `${UNSPLASH_BASE}/photo-1528360983277-13d401cdc186?w=1920&q=80`,
    card: `${UNSPLASH_BASE}/photo-1528360983277-13d401cdc186?w=800&q=75`,
    gallery: [
      `${UNSPLASH_BASE}/photo-1528360983277-13d401cdc186?w=1920&q=80`,
      `${UNSPLASH_BASE}/photo-1509030450996-dd1a26dda07a?w=1920&q=80`,
      `${UNSPLASH_BASE}/photo-1583417267826-aebc4d1537e4?w=1920&q=80`,
      `${UNSPLASH_BASE}/photo-1559592413-7cec4d0cae2b?w=1920&q=80`,
    ],
  },
  thailand: {
    hero: `${UNSPLASH_BASE}/photo-1528181304800-259b08848526?w=1920&q=80`,
    card: `${UNSPLASH_BASE}/photo-1528181304800-259b08848526?w=800&q=75`,
    gallery: [
      `${UNSPLASH_BASE}/photo-1528181304800-259b08848526?w=1920&q=80`,
      `${UNSPLASH_BASE}/photo-1508009603885-50cf7c579365?w=1920&q=80`,
      `${UNSPLASH_BASE}/photo-1552465011-b4e21bf6e79a?w=1920&q=80`,
      `${UNSPLASH_BASE}/photo-1520250497591-112f2f40a3f4?w=1920&q=80`,
    ],
  },
  indonesia: {
    hero: `${UNSPLASH_BASE}/photo-1537996194471-e657df975ab4?w=1920&q=80`,
    card: `${UNSPLASH_BASE}/photo-1537996194471-e657df975ab4?w=800&q=75`,
    gallery: [
      `${UNSPLASH_BASE}/photo-1537996194471-e657df975ab4?w=1920&q=80`,
      `${UNSPLASH_BASE}/photo-1555899434-94d1368aa7af?w=1920&q=80`,
      `${UNSPLASH_BASE}/photo-1518548419970-58e3b4079ab2?w=1920&q=80`,
      `${UNSPLASH_BASE}/photo-1573790387438-4da905039392?w=1920&q=80`,
    ],
  },
  singapore: {
    hero: `${UNSPLASH_BASE}/photo-1525625293386-3f8f99389edd?w=1920&q=80`,
    card: `${UNSPLASH_BASE}/photo-1525625293386-3f8f99389edd?w=800&q=75`,
    gallery: [
      `${UNSPLASH_BASE}/photo-1525625293386-3f8f99389edd?w=1920&q=80`,
      `${UNSPLASH_BASE}/photo-1508964942454-1a56651d54ac?w=1920&q=80`,
      `${UNSPLASH_BASE}/photo-1496939376851-89342e90adcd?w=1920&q=80`,
      `${UNSPLASH_BASE}/photo-1565967511849-76a60a516170?w=1920&q=80`,
    ],
  },
  maldives: {
    hero: `${UNSPLASH_BASE}/photo-1573843981267-be1999ff37cd?w=1920&q=80`,
    card: `${UNSPLASH_BASE}/photo-1573843981267-be1999ff37cd?w=800&q=75`,
    gallery: [
      `${UNSPLASH_BASE}/photo-1573843981267-be1999ff37cd?w=1920&q=80`,
      `${UNSPLASH_BASE}/photo-1514282401047-d79a71a590e8?w=1920&q=80`,
      `${UNSPLASH_BASE}/photo-1544550581-5f7ceaf7f992?w=1920&q=80`,
      `${UNSPLASH_BASE}/photo-1590523741831-ab7e8b8f9c7f?w=1920&q=80`,
    ],
  },
  india: {
    hero: `${UNSPLASH_BASE}/photo-1524492412937-b28074a5d7da?w=1920&q=80`,
    card: `${UNSPLASH_BASE}/photo-1524492412937-b28074a5d7da?w=800&q=75`,
    gallery: [
      `${UNSPLASH_BASE}/photo-1524492412937-b28074a5d7da?w=1920&q=80`, // Taj Mahal
      `${UNSPLASH_BASE}/photo-1587474260584-136574528ed5?w=1920&q=80`, // Delhi India Gate
      `${UNSPLASH_BASE}/photo-1599661046289-e31897846e41?w=1920&q=80`, // Jaipur Hawa Mahal
      `${UNSPLASH_BASE}/photo-1561361513-2d000a50f0dc?w=1920&q=80`, // Varanasi ghats
      `${UNSPLASH_BASE}/photo-1602216056096-3b40cc0c9944?w=1920&q=80`, // Kerala backwaters
    ],
  },
};

// ── CITY IMAGES ─────────────────────────────────────────────
// Each city has a unique image. DB heroImageUrl takes priority via resolveImage().

export const CITY_IMAGES: Record<string, string> = {
  // Vietnam
  hanoi: `${UNSPLASH_BASE}/photo-1509030450996-dd1a26dda07a?w=800&q=75`,
  'ho-chi-minh-city': `${UNSPLASH_BASE}/photo-1583417267826-aebc4d1537e4?w=800&q=75`,
  'da-nang': `${UNSPLASH_BASE}/photo-1589394815804-964ed0be2eb5?w=800&q=75`,
  'hoi-an': `${UNSPLASH_BASE}/photo-1559592413-7cec4d0cae2b?w=800&q=75`,
  'ha-long-bay': `${UNSPLASH_BASE}/photo-1573615565957-3e2f9e9e68cf?w=800&q=75`,
  // Thailand
  bangkok: `${UNSPLASH_BASE}/photo-1508009603885-50cf7c579365?w=800&q=75`,
  phuket: `${UNSPLASH_BASE}/photo-1589394815804-964ed0be2eb5?w=800&q=75`,
  // Indonesia
  bali: `${UNSPLASH_BASE}/photo-1537996194471-e657df975ab4?w=800&q=75`,
  jakarta: `${UNSPLASH_BASE}/photo-1555899434-94d1368aa7af?w=800&q=75`,
  // Singapore
  'singapore-city': `${UNSPLASH_BASE}/photo-1525625293386-3f8f99389edd?w=800&q=75`,
  // Maldives
  male: `${UNSPLASH_BASE}/photo-1514282401047-d79a71a590e8?w=800&q=75`,

  // ── India cities (matched to seed-india.ts heroImageUrls) ──
  'new-delhi': `${UNSPLASH_BASE}/photo-1587474260584-136574528ed5?w=800&q=75`,
  delhi: `${UNSPLASH_BASE}/photo-1587474260584-136574528ed5?w=800&q=75`, // alias for seed.ts slug
  jaipur: `${UNSPLASH_BASE}/photo-1599661046289-e31897846e41?w=800&q=75`, // Hawa Mahal
  agra: `${UNSPLASH_BASE}/photo-1564507592333-c60657eea523?w=800&q=75`, // Taj Mahal
  varanasi: `${UNSPLASH_BASE}/photo-1561361513-2d000a50f0dc?w=800&q=75`, // Ghats sunrise
  udaipur: `${UNSPLASH_BASE}/photo-1602216056096-3b40cc0c9944?w=800&q=75`, // Lake Palace
  jodhpur: `${UNSPLASH_BASE}/photo-1570462722484-33e35f18c947?w=800&q=75`, // Blue City
  rishikesh: `${UNSPLASH_BASE}/photo-1614605670899-47ecba60bf2a?w=800&q=75`, // Ganges/mountains
  manali: `${UNSPLASH_BASE}/photo-1626621341517-bbf3d9990a23?w=800&q=75`, // Himalayan valley
  shimla: `${UNSPLASH_BASE}/photo-1597074866923-dc0589150358?w=800&q=75`, // Colonial hill station
  'leh-ladakh': `${UNSPLASH_BASE}/photo-1660303954454-cc270a0d48c4?w=800&q=75`, // Pangong/mountains
  ladakh: `${UNSPLASH_BASE}/photo-1660303954454-cc270a0d48c4?w=800&q=75`, // alias for seed.ts slug
  mumbai: `${UNSPLASH_BASE}/photo-1570168007204-dfb528c6958f?w=800&q=75`, // Gateway of India
  goa: `${UNSPLASH_BASE}/photo-1512343879784-a960bf40e7f2?w=800&q=75`, // Beach
  kochi: `${UNSPLASH_BASE}/photo-1602158123103-d2c0a42e7b7e?w=800&q=75`, // Chinese fishing nets
  munnar: `${UNSPLASH_BASE}/photo-1598586124540-21a15e71e012?w=800&q=75`, // Tea plantations
  kerala: `${UNSPLASH_BASE}/photo-1593693397690-362cb9666fc2?w=800&q=75`, // alias for seed.ts slug
  alleppey: `${UNSPLASH_BASE}/photo-1593693397690-362cb9666fc2?w=800&q=75`, // Backwaters
  bengaluru: `${UNSPLASH_BASE}/photo-1596176530529-78163a4f7af2?w=800&q=75`, // Garden City
  mysuru: `${UNSPLASH_BASE}/photo-1600112356190-4cf24e16b4b8?w=800&q=75`, // Mysore Palace
  chennai: `${UNSPLASH_BASE}/photo-1582510003544-4d00b7f74220?w=800&q=75`, // Marina Beach area
  pondicherry: `${UNSPLASH_BASE}/photo-1580282240219-045ceed20d73?w=800&q=75`, // French Quarter
  hampi: `${UNSPLASH_BASE}/photo-1590050751718-5346f21bcc0f?w=800&q=75`, // Vijayanagara ruins (fixed — was 404)
  kolkata: `${UNSPLASH_BASE}/photo-1558431382-27e303142255?w=800&q=75`, // Victoria Memorial
  darjeeling: `${UNSPLASH_BASE}/photo-1622308644420-b20142dc993c?w=800&q=75`, // Tea gardens
  gangtok: `${UNSPLASH_BASE}/photo-1598586124540-21a15e71e012?w=800&q=75`, // Himalayan town (was dup with manali, now unique)
  shillong: `${UNSPLASH_BASE}/photo-1588083949404-c4f1ed1323b3?w=800&q=75`, // Northeast hills
  ahmedabad: `${UNSPLASH_BASE}/photo-1595658658481-d53d3f999875?w=800&q=75`, // Step wells
};

// ── CITY GALLERY IMAGES (for hero carousel — 4-6 images per city) ────

export const CITY_GALLERY_IMAGES: Record<string, string[]> = {
  // ── India ──
  'new-delhi': [
    `${UNSPLASH_BASE}/photo-1587474260584-136574528ed5?w=1920&q=80`, // India Gate
    `${UNSPLASH_BASE}/photo-1548013146-72479768bada?w=1920&q=80`, // Qutub Minar / heritage
    `${UNSPLASH_BASE}/photo-1597040663342-45b6ba1c6c0a?w=1920&q=80`, // Delhi cityscape
    `${UNSPLASH_BASE}/photo-1524492412937-b28074a5d7da?w=1920&q=80`, // Mughal architecture
    `${UNSPLASH_BASE}/photo-1606491956689-2ea866880049?w=1920&q=80`, // Street food / markets
  ],
  delhi: [ // alias
    `${UNSPLASH_BASE}/photo-1587474260584-136574528ed5?w=1920&q=80`,
    `${UNSPLASH_BASE}/photo-1548013146-72479768bada?w=1920&q=80`,
    `${UNSPLASH_BASE}/photo-1597040663342-45b6ba1c6c0a?w=1920&q=80`,
    `${UNSPLASH_BASE}/photo-1524492412937-b28074a5d7da?w=1920&q=80`,
    `${UNSPLASH_BASE}/photo-1606491956689-2ea866880049?w=1920&q=80`,
  ],
  jaipur: [
    `${UNSPLASH_BASE}/photo-1599661046289-e31897846e41?w=1920&q=80`, // Hawa Mahal
    `${UNSPLASH_BASE}/photo-1477587458883-47145ed94245?w=1920&q=80`, // City Palace / heritage
    `${UNSPLASH_BASE}/photo-1493246507139-91e8fad9978e?w=1920&q=80`, // Rajasthan desert fort
    `${UNSPLASH_BASE}/photo-1603262110263-fb0112e7cc33?w=1920&q=80`, // Amber Fort area
  ],
  agra: [
    `${UNSPLASH_BASE}/photo-1564507592333-c60657eea523?w=1920&q=80`, // Taj Mahal
    `${UNSPLASH_BASE}/photo-1524492412937-b28074a5d7da?w=1920&q=80`, // Taj Mahal angle 2
    `${UNSPLASH_BASE}/photo-1585135497273-1a86d9d4f1bd?w=1920&q=80`, // Agra Fort / heritage
    `${UNSPLASH_BASE}/photo-1548013146-72479768bada?w=1920&q=80`, // Mughal architecture
  ],
  varanasi: [
    `${UNSPLASH_BASE}/photo-1561361513-2d000a50f0dc?w=1920&q=80`, // Ghats sunrise
    `${UNSPLASH_BASE}/photo-1477587458883-47145ed94245?w=1920&q=80`, // Ganga aarti / ghats
    `${UNSPLASH_BASE}/photo-1570462722484-33e35f18c947?w=1920&q=80`, // Ancient city
    `${UNSPLASH_BASE}/photo-1606491956689-2ea866880049?w=1920&q=80`, // Street life
  ],
  udaipur: [
    `${UNSPLASH_BASE}/photo-1602216056096-3b40cc0c9944?w=1920&q=80`, // Lake Palace
    `${UNSPLASH_BASE}/photo-1595658658481-d53d3f999875?w=1920&q=80`, // City Palace steps
    `${UNSPLASH_BASE}/photo-1599661046289-e31897846e41?w=1920&q=80`, // Rajasthani architecture
    `${UNSPLASH_BASE}/photo-1493246507139-91e8fad9978e?w=1920&q=80`, // Lake / palace aerial
  ],
  jodhpur: [
    `${UNSPLASH_BASE}/photo-1570462722484-33e35f18c947?w=1920&q=80`, // Blue City
    `${UNSPLASH_BASE}/photo-1599661046289-e31897846e41?w=1920&q=80`, // Fort / heritage
    `${UNSPLASH_BASE}/photo-1493246507139-91e8fad9978e?w=1920&q=80`, // Rajasthan desert
    `${UNSPLASH_BASE}/photo-1477587458883-47145ed94245?w=1920&q=80`, // Blue houses
  ],
  rishikesh: [
    `${UNSPLASH_BASE}/photo-1614605670899-47ecba60bf2a?w=1920&q=80`, // Ganges / mountains
    `${UNSPLASH_BASE}/photo-1582510003544-4d00b7f74220?w=1920&q=80`, // River valley
    `${UNSPLASH_BASE}/photo-1506461883276-594a12b11cf3?w=1920&q=80`, // Mountain sunset
    `${UNSPLASH_BASE}/photo-1558383409-6807a60bcf5e?w=1920&q=80`, // Adventure / rafting
  ],
  manali: [
    `${UNSPLASH_BASE}/photo-1626621341517-bbf3d9990a23?w=1920&q=80`, // Himalayan valley
    `${UNSPLASH_BASE}/photo-1506461883276-594a12b11cf3?w=1920&q=80`, // Mountain pass
    `${UNSPLASH_BASE}/photo-1558383409-6807a60bcf5e?w=1920&q=80`, // Snow peaks / adventure
    `${UNSPLASH_BASE}/photo-1597074866923-dc0589150358?w=1920&q=80`, // Hill station
  ],
  shimla: [
    `${UNSPLASH_BASE}/photo-1597074866923-dc0589150358?w=1920&q=80`, // Colonial hill station
    `${UNSPLASH_BASE}/photo-1626621341517-bbf3d9990a23?w=1920&q=80`, // Mountain town
    `${UNSPLASH_BASE}/photo-1506461883276-594a12b11cf3?w=1920&q=80`, // Himalayas
    `${UNSPLASH_BASE}/photo-1622308644420-b20142dc993c?w=1920&q=80`, // Hill gardens
  ],
  'leh-ladakh': [
    `${UNSPLASH_BASE}/photo-1660303954454-cc270a0d48c4?w=1920&q=80`, // Pangong / mountains
    `${UNSPLASH_BASE}/photo-1506461883276-594a12b11cf3?w=1920&q=80`, // High pass
    `${UNSPLASH_BASE}/photo-1626621341517-bbf3d9990a23?w=1920&q=80`, // Valley monastery
    `${UNSPLASH_BASE}/photo-1558383409-6807a60bcf5e?w=1920&q=80`, // Khardung La road
  ],
  ladakh: [ // alias
    `${UNSPLASH_BASE}/photo-1660303954454-cc270a0d48c4?w=1920&q=80`,
    `${UNSPLASH_BASE}/photo-1506461883276-594a12b11cf3?w=1920&q=80`,
    `${UNSPLASH_BASE}/photo-1626621341517-bbf3d9990a23?w=1920&q=80`,
    `${UNSPLASH_BASE}/photo-1558383409-6807a60bcf5e?w=1920&q=80`,
  ],
  mumbai: [
    `${UNSPLASH_BASE}/photo-1570168007204-dfb528c6958f?w=1920&q=80`, // Gateway of India
    `${UNSPLASH_BASE}/photo-1567157577867-05ccb1388e66?w=1920&q=80`, // Marine Drive
    `${UNSPLASH_BASE}/photo-1529253355930-ddbe423a2ac7?w=1920&q=80`, // Mumbai skyline
    `${UNSPLASH_BASE}/photo-1566552881560-0be862a7c445?w=1920&q=80`, // CST station
  ],
  goa: [
    `${UNSPLASH_BASE}/photo-1512343879784-a960bf40e7f2?w=1920&q=80`, // Beach
    `${UNSPLASH_BASE}/photo-1587922546307-776227941871?w=1920&q=80`, // Goa coastline
    `${UNSPLASH_BASE}/photo-1539367628448-4bc5c9d171c8?w=1920&q=80`, // Tropical beach
    `${UNSPLASH_BASE}/photo-1580282240219-045ceed20d73?w=1920&q=80`, // Portuguese architecture
  ],
  kochi: [
    `${UNSPLASH_BASE}/photo-1602158123103-d2c0a42e7b7e?w=1920&q=80`, // Chinese fishing nets
    `${UNSPLASH_BASE}/photo-1602216056096-3b40cc0c9944?w=1920&q=80`, // Kerala waters
    `${UNSPLASH_BASE}/photo-1593693397690-362cb9666fc2?w=1920&q=80`, // Backwaters
    `${UNSPLASH_BASE}/photo-1580282240219-045ceed20d73?w=1920&q=80`, // Fort Kochi heritage
  ],
  munnar: [
    `${UNSPLASH_BASE}/photo-1598586124540-21a15e71e012?w=1920&q=80`, // Tea plantations
    `${UNSPLASH_BASE}/photo-1602216056096-3b40cc0c9944?w=1920&q=80`, // Kerala hills
    `${UNSPLASH_BASE}/photo-1593693397690-362cb9666fc2?w=1920&q=80`, // Green hills
    `${UNSPLASH_BASE}/photo-1537996194471-e657df975ab4?w=1920&q=80`, // Mountain landscape
  ],
  kerala: [ // alias
    `${UNSPLASH_BASE}/photo-1593693397690-362cb9666fc2?w=1920&q=80`,
    `${UNSPLASH_BASE}/photo-1602216056096-3b40cc0c9944?w=1920&q=80`,
    `${UNSPLASH_BASE}/photo-1602158123103-d2c0a42e7b7e?w=1920&q=80`,
    `${UNSPLASH_BASE}/photo-1598586124540-21a15e71e012?w=1920&q=80`,
  ],
  alleppey: [
    `${UNSPLASH_BASE}/photo-1593693397690-362cb9666fc2?w=1920&q=80`, // Backwaters
    `${UNSPLASH_BASE}/photo-1602216056096-3b40cc0c9944?w=1920&q=80`, // Houseboat
    `${UNSPLASH_BASE}/photo-1602158123103-d2c0a42e7b7e?w=1920&q=80`, // Kerala waterways
    `${UNSPLASH_BASE}/photo-1539367628448-4bc5c9d171c8?w=1920&q=80`, // Beach
  ],
  bengaluru: [
    `${UNSPLASH_BASE}/photo-1596176530529-78163a4f7af2?w=1920&q=80`, // Garden City
    `${UNSPLASH_BASE}/photo-1570168007204-dfb528c6958f?w=1920&q=80`, // City architecture
    `${UNSPLASH_BASE}/photo-1537996194471-e657df975ab4?w=1920&q=80`, // Park / nature
    `${UNSPLASH_BASE}/photo-1600112356190-4cf24e16b4b8?w=1920&q=80`, // Palace
  ],
  mysuru: [
    `${UNSPLASH_BASE}/photo-1600112356190-4cf24e16b4b8?w=1920&q=80`, // Mysore Palace
    `${UNSPLASH_BASE}/photo-1596176530529-78163a4f7af2?w=1920&q=80`, // Palace gardens
    `${UNSPLASH_BASE}/photo-1602216056096-3b40cc0c9944?w=1920&q=80`, // South India heritage
    `${UNSPLASH_BASE}/photo-1548013146-72479768bada?w=1920&q=80`, // Temple architecture
  ],
  chennai: [
    `${UNSPLASH_BASE}/photo-1582510003544-4d00b7f74220?w=1920&q=80`, // Marina Beach / temple
    `${UNSPLASH_BASE}/photo-1548013146-72479768bada?w=1920&q=80`, // Temple architecture
    `${UNSPLASH_BASE}/photo-1580282240219-045ceed20d73?w=1920&q=80`, // Colonial architecture
    `${UNSPLASH_BASE}/photo-1596176530529-78163a4f7af2?w=1920&q=80`, // City life
  ],
  pondicherry: [
    `${UNSPLASH_BASE}/photo-1580282240219-045ceed20d73?w=1920&q=80`, // French Quarter
    `${UNSPLASH_BASE}/photo-1582510003544-4d00b7f74220?w=1920&q=80`, // Beach / coast
    `${UNSPLASH_BASE}/photo-1539367628448-4bc5c9d171c8?w=1920&q=80`, // Seaside town
    `${UNSPLASH_BASE}/photo-1548013146-72479768bada?w=1920&q=80`, // Heritage architecture
  ],
  hampi: [
    `${UNSPLASH_BASE}/photo-1590050751718-5346f21bcc0f?w=1920&q=80`, // Vijayanagara ruins
    `${UNSPLASH_BASE}/photo-1548013146-72479768bada?w=1920&q=80`, // Temple ruins
    `${UNSPLASH_BASE}/photo-1506461883276-594a12b11cf3?w=1920&q=80`, // Sunrise / landscape
    `${UNSPLASH_BASE}/photo-1596176530529-78163a4f7af2?w=1920&q=80`, // Heritage site
  ],
  kolkata: [
    `${UNSPLASH_BASE}/photo-1558431382-27e303142255?w=1920&q=80`, // Victoria Memorial
    `${UNSPLASH_BASE}/photo-1570168007204-dfb528c6958f?w=1920&q=80`, // City heritage
    `${UNSPLASH_BASE}/photo-1580282240219-045ceed20d73?w=1920&q=80`, // Colonial architecture
    `${UNSPLASH_BASE}/photo-1606491956689-2ea866880049?w=1920&q=80`, // Street life
  ],
  darjeeling: [
    `${UNSPLASH_BASE}/photo-1622308644420-b20142dc993c?w=1920&q=80`, // Tea gardens
    `${UNSPLASH_BASE}/photo-1626621341517-bbf3d9990a23?w=1920&q=80`, // Himalayan hills
    `${UNSPLASH_BASE}/photo-1506461883276-594a12b11cf3?w=1920&q=80`, // Mountain views
    `${UNSPLASH_BASE}/photo-1597074866923-dc0589150358?w=1920&q=80`, // Hill station
  ],
  gangtok: [
    `${UNSPLASH_BASE}/photo-1598586124540-21a15e71e012?w=1920&q=80`, // Himalayan town
    `${UNSPLASH_BASE}/photo-1626621341517-bbf3d9990a23?w=1920&q=80`, // Mountain valley
    `${UNSPLASH_BASE}/photo-1622308644420-b20142dc993c?w=1920&q=80`, // Green hills
    `${UNSPLASH_BASE}/photo-1506461883276-594a12b11cf3?w=1920&q=80`, // Panoramic mountains
  ],
  shillong: [
    `${UNSPLASH_BASE}/photo-1588083949404-c4f1ed1323b3?w=1920&q=80`, // Northeast hills
    `${UNSPLASH_BASE}/photo-1598586124540-21a15e71e012?w=1920&q=80`, // Green landscape
    `${UNSPLASH_BASE}/photo-1626621341517-bbf3d9990a23?w=1920&q=80`, // Mountain town
    `${UNSPLASH_BASE}/photo-1537996194471-e657df975ab4?w=1920&q=80`, // Nature landscape
  ],
  ahmedabad: [
    `${UNSPLASH_BASE}/photo-1595658658481-d53d3f999875?w=1920&q=80`, // Step wells / heritage
    `${UNSPLASH_BASE}/photo-1572459262130-f2dfa4485024?w=1920&q=80`, // Gujarat architecture
    `${UNSPLASH_BASE}/photo-1548013146-72479768bada?w=1920&q=80`, // Heritage / temple
    `${UNSPLASH_BASE}/photo-1524492412937-b28074a5d7da?w=1920&q=80`, // Mughal architecture
  ],

  // ── SE Asia ──
  hanoi: [
    `${UNSPLASH_BASE}/photo-1509030450996-dd1a26dda07a?w=1920&q=80`,
    `${UNSPLASH_BASE}/photo-1528360983277-13d401cdc186?w=1920&q=80`,
    `${UNSPLASH_BASE}/photo-1583417267826-aebc4d1537e4?w=1920&q=80`,
    `${UNSPLASH_BASE}/photo-1559592413-7cec4d0cae2b?w=1920&q=80`,
  ],
  bangkok: [
    `${UNSPLASH_BASE}/photo-1508009603885-50cf7c579365?w=1920&q=80`,
    `${UNSPLASH_BASE}/photo-1528181304800-259b08848526?w=1920&q=80`,
    `${UNSPLASH_BASE}/photo-1552465011-b4e21bf6e79a?w=1920&q=80`,
    `${UNSPLASH_BASE}/photo-1520250497591-112f2f40a3f4?w=1920&q=80`,
  ],
  bali: [
    `${UNSPLASH_BASE}/photo-1537996194471-e657df975ab4?w=1920&q=80`,
    `${UNSPLASH_BASE}/photo-1555899434-94d1368aa7af?w=1920&q=80`,
    `${UNSPLASH_BASE}/photo-1518548419970-58e3b4079ab2?w=1920&q=80`,
    `${UNSPLASH_BASE}/photo-1573790387438-4da905039392?w=1920&q=80`,
  ],
  'singapore-city': [
    `${UNSPLASH_BASE}/photo-1525625293386-3f8f99389edd?w=1920&q=80`,
    `${UNSPLASH_BASE}/photo-1508964942454-1a56651d54ac?w=1920&q=80`,
    `${UNSPLASH_BASE}/photo-1496939376851-89342e90adcd?w=1920&q=80`,
    `${UNSPLASH_BASE}/photo-1565967511849-76a60a516170?w=1920&q=80`,
  ],
  male: [
    `${UNSPLASH_BASE}/photo-1514282401047-d79a71a590e8?w=1920&q=80`,
    `${UNSPLASH_BASE}/photo-1573843981267-be1999ff37cd?w=1920&q=80`,
    `${UNSPLASH_BASE}/photo-1544550581-5f7ceaf7f992?w=1920&q=80`,
    `${UNSPLASH_BASE}/photo-1590523741831-ab7e8b8f9c7f?w=1920&q=80`,
  ],
};

// ── CATEGORY IMAGES (India-appropriate fallbacks for POI cards) ────

export const CATEGORY_IMAGES: Record<string, string> = {
  CULTURE_HISTORY: `${UNSPLASH_BASE}/photo-1548013146-72479768bada?w=600&q=75`, // Indian temple architecture
  NATURE_LANDSCAPES: `${UNSPLASH_BASE}/photo-1506461883276-594a12b11cf3?w=600&q=75`, // Himalayan landscape
  FOOD_MARKETS: `${UNSPLASH_BASE}/photo-1606491956689-2ea866880049?w=600&q=75`, // Indian street food
  ADVENTURE_ACTIVITIES: `${UNSPLASH_BASE}/photo-1558383409-6807a60bcf5e?w=600&q=75`, // Adventure / trekking
  LUXURY_STAYS: `${UNSPLASH_BASE}/photo-1595658658481-d53d3f999875?w=600&q=75`, // Heritage palace
  ISLAND_BEACH: `${UNSPLASH_BASE}/photo-1512343879784-a960bf40e7f2?w=600&q=75`, // Indian beach (Goa)
};

// ── POI IMAGES (location-specific photos for individual points of interest) ──

export const POI_IMAGES: Record<string, string> = {
  // ── Hanoi ──
  'hanoi-old-quarter-walking-tour': `${UNSPLASH_BASE}/photo-1509030450996-dd1a26dda07a?w=600&q=75`,
  'hoan-kiem-lake': `${UNSPLASH_BASE}/photo-1583417267826-aebc4d1537e4?w=600&q=75`,
  'temple-of-literature': `${UNSPLASH_BASE}/photo-1559592413-7cec4d0cae2b?w=600&q=75`,
  'hanoi-street-food-tour': `${UNSPLASH_BASE}/photo-1559056199-641a0ac8b55e?w=600&q=75`,
  'ho-chi-minh-mausoleum': `${UNSPLASH_BASE}/photo-1528360983277-13d401cdc186?w=600&q=75`,
  'hanoi-train-street': `${UNSPLASH_BASE}/photo-1573615565957-3e2f9e9e68cf?w=600&q=75`,

  // ── Delhi ──
  'red-fort-delhi': `${UNSPLASH_BASE}/photo-1587474260584-136574528ed5?w=600&q=75`, // India Gate / Delhi heritage
  'qutub-minar': `${UNSPLASH_BASE}/photo-1548013146-72479768bada?w=600&q=75`, // Qutub Minar
  'qutub-minar-delhi': `${UNSPLASH_BASE}/photo-1548013146-72479768bada?w=600&q=75`,
  'india-gate': `${UNSPLASH_BASE}/photo-1597040663342-45b6ba1c6c0a?w=600&q=75`, // India Gate
  'india-gate-delhi': `${UNSPLASH_BASE}/photo-1597040663342-45b6ba1c6c0a?w=600&q=75`,
  'chandni-chowk': `${UNSPLASH_BASE}/photo-1606491956689-2ea866880049?w=600&q=75`, // Street market
  'chandni-chowk-delhi': `${UNSPLASH_BASE}/photo-1606491956689-2ea866880049?w=600&q=75`,
  'humayuns-tomb': `${UNSPLASH_BASE}/photo-1585135497273-1a86d9d4f1bd?w=600&q=75`, // Mughal garden tomb
  'humayuns-tomb-delhi': `${UNSPLASH_BASE}/photo-1585135497273-1a86d9d4f1bd?w=600&q=75`,
  'akshardham-temple': `${UNSPLASH_BASE}/photo-1524492412937-b28074a5d7da?w=600&q=75`, // Temple
  'akshardham-temple-delhi': `${UNSPLASH_BASE}/photo-1524492412937-b28074a5d7da?w=600&q=75`,

  // ── Jaipur ──
  'amber-fort-jaipur': `${UNSPLASH_BASE}/photo-1603262110263-fb0112e7cc33?w=600&q=75`, // Amber Fort
  'hawa-mahal-jaipur': `${UNSPLASH_BASE}/photo-1599661046289-e31897846e41?w=600&q=75`, // Hawa Mahal
  'city-palace-jaipur': `${UNSPLASH_BASE}/photo-1477587458883-47145ed94245?w=600&q=75`, // Palace
  'nahargarh-fort-jaipur': `${UNSPLASH_BASE}/photo-1493246507139-91e8fad9978e?w=600&q=75`, // Fort
  'johari-bazaar-jaipur': `${UNSPLASH_BASE}/photo-1606491956689-2ea866880049?w=600&q=75`, // Bazaar

  // ── Agra ──
  'taj-mahal-agra': `${UNSPLASH_BASE}/photo-1564507592333-c60657eea523?w=600&q=75`, // Taj Mahal
  'agra-fort-agra': `${UNSPLASH_BASE}/photo-1548013146-72479768bada?w=600&q=75`, // Agra Fort
  'mehtab-bagh-agra': `${UNSPLASH_BASE}/photo-1524492412937-b28074a5d7da?w=600&q=75`, // Mehtab Bagh
  'fatehpur-sikri-agra': `${UNSPLASH_BASE}/photo-1585135497273-1a86d9d4f1bd?w=600&q=75`, // Fatehpur Sikri

  // ── Varanasi ──
  'dashashwamedh-ghat-varanasi': `${UNSPLASH_BASE}/photo-1561361513-2d000a50f0dc?w=600&q=75`, // Main ghat
  'sunrise-boat-ride-varanasi': `${UNSPLASH_BASE}/photo-1477587458883-47145ed94245?w=600&q=75`, // Sunrise ghats
  'kashi-vishwanath-temple-varanasi': `${UNSPLASH_BASE}/photo-1570462722484-33e35f18c947?w=600&q=75`, // Temple
  'sarnath-varanasi': `${UNSPLASH_BASE}/photo-1548013146-72479768bada?w=600&q=75`, // Buddhist site
  'assi-ghat-varanasi': `${UNSPLASH_BASE}/photo-1561361513-2d000a50f0dc?w=600&q=75`, // Ghat

  // ── Udaipur ──
  'city-palace-udaipur': `${UNSPLASH_BASE}/photo-1602216056096-3b40cc0c9944?w=600&q=75`, // Palace
  'lake-pichola-boat-ride-udaipur': `${UNSPLASH_BASE}/photo-1595658658481-d53d3f999875?w=600&q=75`, // Lake
  'jagdish-temple-udaipur': `${UNSPLASH_BASE}/photo-1548013146-72479768bada?w=600&q=75`, // Temple
  'saheliyon-ki-bari-udaipur': `${UNSPLASH_BASE}/photo-1602216056096-3b40cc0c9944?w=600&q=75`, // Gardens

  // ── Jodhpur ──
  'mehrangarh-fort-jodhpur': `${UNSPLASH_BASE}/photo-1570462722484-33e35f18c947?w=600&q=75`, // Mehrangarh
  'jaswant-thada-jodhpur': `${UNSPLASH_BASE}/photo-1599661046289-e31897846e41?w=600&q=75`, // Marble cenotaph
  'toorji-ka-jhalra-jodhpur': `${UNSPLASH_BASE}/photo-1595658658481-d53d3f999875?w=600&q=75`, // Stepwell
  'clock-tower-sardar-market-jodhpur': `${UNSPLASH_BASE}/photo-1606491956689-2ea866880049?w=600&q=75`, // Market

  // ── Rishikesh ──
  'laxman-jhula-rishikesh': `${UNSPLASH_BASE}/photo-1614605670899-47ecba60bf2a?w=600&q=75`, // Suspension bridge
  'river-rafting-rishikesh': `${UNSPLASH_BASE}/photo-1558383409-6807a60bcf5e?w=600&q=75`, // Rafting
  'beatles-ashram-rishikesh': `${UNSPLASH_BASE}/photo-1582510003544-4d00b7f74220?w=600&q=75`, // Ashram
  'triveni-ghat-aarti-rishikesh': `${UNSPLASH_BASE}/photo-1506461883276-594a12b11cf3?w=600&q=75`, // Ganga aarti

  // ── Manali ──
  'rohtang-pass-manali': `${UNSPLASH_BASE}/photo-1506461883276-594a12b11cf3?w=600&q=75`, // Snow pass
  'solang-valley-manali': `${UNSPLASH_BASE}/photo-1558383409-6807a60bcf5e?w=600&q=75`, // Adventure valley
  'hadimba-temple-manali': `${UNSPLASH_BASE}/photo-1626621341517-bbf3d9990a23?w=600&q=75`, // Temple
  'old-manali-manali': `${UNSPLASH_BASE}/photo-1597074866923-dc0589150358?w=600&q=75`, // Village

  // ── Shimla ──
  'mall-road-shimla': `${UNSPLASH_BASE}/photo-1597074866923-dc0589150358?w=600&q=75`, // Colonial road
  'christ-church-shimla': `${UNSPLASH_BASE}/photo-1580282240219-045ceed20d73?w=600&q=75`, // Church
  'jakhoo-temple-shimla': `${UNSPLASH_BASE}/photo-1622308644420-b20142dc993c?w=600&q=75`, // Hill temple
  'kalka-shimla-toy-train': `${UNSPLASH_BASE}/photo-1506461883276-594a12b11cf3?w=600&q=75`, // Toy train

  // ── Ladakh ──
  'pangong-tso-lake-ladakh': `${UNSPLASH_BASE}/photo-1660303954454-cc270a0d48c4?w=600&q=75`, // Pangong Lake
  'thiksey-monastery-ladakh': `${UNSPLASH_BASE}/photo-1626621341517-bbf3d9990a23?w=600&q=75`, // Monastery
  'khardung-la-pass-ladakh': `${UNSPLASH_BASE}/photo-1506461883276-594a12b11cf3?w=600&q=75`, // High pass
  'nubra-valley-ladakh': `${UNSPLASH_BASE}/photo-1558383409-6807a60bcf5e?w=600&q=75`, // Desert valley
  'leh-palace-ladakh': `${UNSPLASH_BASE}/photo-1660303954454-cc270a0d48c4?w=600&q=75`, // Palace

  // ── Mumbai ──
  'gateway-of-india-mumbai': `${UNSPLASH_BASE}/photo-1570168007204-dfb528c6958f?w=600&q=75`, // Gateway
  'marine-drive-mumbai': `${UNSPLASH_BASE}/photo-1567157577867-05ccb1388e66?w=600&q=75`, // Marine Drive
  'elephanta-caves-mumbai': `${UNSPLASH_BASE}/photo-1548013146-72479768bada?w=600&q=75`, // Caves
  'dhobi-ghat-mumbai': `${UNSPLASH_BASE}/photo-1566552881560-0be862a7c445?w=600&q=75`, // Dhobi Ghat
  'colaba-causeway-mumbai': `${UNSPLASH_BASE}/photo-1529253355930-ddbe423a2ac7?w=600&q=75`, // Street market

  // ── Goa ──
  'anjuna-beach-goa': `${UNSPLASH_BASE}/photo-1512343879784-a960bf40e7f2?w=600&q=75`, // Beach
  'basilica-of-bom-jesus-goa': `${UNSPLASH_BASE}/photo-1580282240219-045ceed20d73?w=600&q=75`, // Church
  'dudhsagar-falls-goa': `${UNSPLASH_BASE}/photo-1537996194471-e657df975ab4?w=600&q=75`, // Waterfall
  'fort-aguada-goa': `${UNSPLASH_BASE}/photo-1587922546307-776227941871?w=600&q=75`, // Fort / coast

  // ── Kochi ──
  'chinese-fishing-nets-kochi': `${UNSPLASH_BASE}/photo-1602158123103-d2c0a42e7b7e?w=600&q=75`,
  'fort-kochi-walk': `${UNSPLASH_BASE}/photo-1580282240219-045ceed20d73?w=600&q=75`,
  'mattancherry-palace-kochi': `${UNSPLASH_BASE}/photo-1548013146-72479768bada?w=600&q=75`,
  'backwater-day-cruise-kochi': `${UNSPLASH_BASE}/photo-1602216056096-3b40cc0c9944?w=600&q=75`,

  // ── Munnar ──
  'tea-plantations-tour-munnar': `${UNSPLASH_BASE}/photo-1598586124540-21a15e71e012?w=600&q=75`,
  'eravikulam-national-park-munnar': `${UNSPLASH_BASE}/photo-1537996194471-e657df975ab4?w=600&q=75`,
  'top-station-munnar': `${UNSPLASH_BASE}/photo-1506461883276-594a12b11cf3?w=600&q=75`,

  // ── Alleppey ──
  'houseboat-overnight-alleppey': `${UNSPLASH_BASE}/photo-1593693397690-362cb9666fc2?w=600&q=75`,
  'alleppey-beach': `${UNSPLASH_BASE}/photo-1539367628448-4bc5c9d171c8?w=600&q=75`,
  'backwater-village-walk-alleppey': `${UNSPLASH_BASE}/photo-1602216056096-3b40cc0c9944?w=600&q=75`,

  // ── Bengaluru ──
  'lalbagh-botanical-garden-bengaluru': `${UNSPLASH_BASE}/photo-1596176530529-78163a4f7af2?w=600&q=75`,
  'cubbon-park-bengaluru': `${UNSPLASH_BASE}/photo-1537996194471-e657df975ab4?w=600&q=75`,
  'nandi-hills-sunrise-bengaluru': `${UNSPLASH_BASE}/photo-1506461883276-594a12b11cf3?w=600&q=75`,
  'bangalore-palace-bengaluru': `${UNSPLASH_BASE}/photo-1600112356190-4cf24e16b4b8?w=600&q=75`,

  // ── Mysuru ──
  'mysore-palace-mysuru': `${UNSPLASH_BASE}/photo-1600112356190-4cf24e16b4b8?w=600&q=75`,
  'chamundi-hills-mysuru': `${UNSPLASH_BASE}/photo-1506461883276-594a12b11cf3?w=600&q=75`,
  'brindavan-gardens-mysuru': `${UNSPLASH_BASE}/photo-1596176530529-78163a4f7af2?w=600&q=75`,
  'devaraja-market-mysuru': `${UNSPLASH_BASE}/photo-1606491956689-2ea866880049?w=600&q=75`,

  // ── Chennai ──
  'marina-beach-chennai': `${UNSPLASH_BASE}/photo-1582510003544-4d00b7f74220?w=600&q=75`,
  'kapaleeshwarar-temple-chennai': `${UNSPLASH_BASE}/photo-1548013146-72479768bada?w=600&q=75`,

  // ── Hampi ──
  'virupaksha-temple-hampi': `${UNSPLASH_BASE}/photo-1590050751718-5346f21bcc0f?w=600&q=75`,

  // ── Kolkata ──
  'victoria-memorial-kolkata': `${UNSPLASH_BASE}/photo-1558431382-27e303142255?w=600&q=75`,
  'howrah-bridge-kolkata': `${UNSPLASH_BASE}/photo-1570168007204-dfb528c6958f?w=600&q=75`,
};

// ── EXPERIENCE IMAGES ───────────────────────────────────────

export const EXPERIENCE_IMAGES: Record<string, string> = {
  'street-food-adventures': `${UNSPLASH_BASE}/photo-1559056199-641a0ac8b55e?w=800&q=75`,
  'island-hopping': `${UNSPLASH_BASE}/photo-1539367628448-4bc5c9d171c8?w=800&q=75`,
  'temple-heritage-trails': `${UNSPLASH_BASE}/photo-1548013146-72479768bada?w=800&q=75`,
  'luxury-overwater-experience': `${UNSPLASH_BASE}/photo-1573843981267-be1999ff37cd?w=800&q=75`,
  'motorbike-adventure': `${UNSPLASH_BASE}/photo-1558383409-6807a60bcf5e?w=800&q=75`,
  'urban-skyline-nightlife': `${UNSPLASH_BASE}/photo-1525625293386-3f8f99389edd?w=800&q=75`,
  // India experiences
  'rajasthan-heritage-trail': `${UNSPLASH_BASE}/photo-1599661046289-e31897846e41?w=800&q=75`,
  'kerala-backwater-cruise': `${UNSPLASH_BASE}/photo-1602216056096-3b40cc0c9944?w=800&q=75`,
  'goa-beach-hopping': `${UNSPLASH_BASE}/photo-1512343879784-a960bf40e7f2?w=800&q=75`,
  'himalayan-trekking': `${UNSPLASH_BASE}/photo-1506461883276-594a12b11cf3?w=800&q=75`,
  'south-indian-temple-trail': `${UNSPLASH_BASE}/photo-1548013146-72479768bada?w=800&q=75`,
  'indian-street-food-odyssey': `${UNSPLASH_BASE}/photo-1606491956689-2ea866880049?w=800&q=75`,
  'golden-triangle-tour': `${UNSPLASH_BASE}/photo-1524492412937-b28074a5d7da?w=800&q=75`,
  'ladakh-road-trip': `${UNSPLASH_BASE}/photo-1660303954454-cc270a0d48c4?w=800&q=75`,
  'kerala-ayurveda-retreat': `${UNSPLASH_BASE}/photo-1602158123103-d2c0a42e7b7e?w=800&q=75`,
  'wildlife-safari-india': `${UNSPLASH_BASE}/photo-1537996194471-e657df975ab4?w=800&q=75`,
  'northeast-explorer': `${UNSPLASH_BASE}/photo-1626621341517-bbf3d9990a23?w=800&q=75`,
  'varanasi-spiritual-journey': `${UNSPLASH_BASE}/photo-1561361513-2d000a50f0dc?w=800&q=75`,
  'andaman-island-escape': `${UNSPLASH_BASE}/photo-1539367628448-4bc5c9d171c8?w=800&q=75`,
  'darjeeling-tea-trail': `${UNSPLASH_BASE}/photo-1622308644420-b20142dc993c?w=800&q=75`,
  'rajasthan-desert-safari': `${UNSPLASH_BASE}/photo-1493246507139-91e8fad9978e?w=800&q=75`,
};

// ── HERO / HOMEPAGE IMAGES ──────────────────────────────────

export const HERO_IMAGES = {
  homepage: `${UNSPLASH_BASE}/photo-1507525428034-b723cf961d3e?w=1920&q=85`,
  destinations: `${UNSPLASH_BASE}/photo-1528181304800-259b08848526?w=1920&q=80`,
  visa: `${UNSPLASH_BASE}/photo-1436491865332-7a61a109db05?w=1920&q=80`,
  blog: `${UNSPLASH_BASE}/photo-1501785888041-af3ef285b470?w=1920&q=80`,
  experiences: `${UNSPLASH_BASE}/photo-1539367628448-4bc5c9d171c8?w=1920&q=80`,
  weekendGetaways: `${UNSPLASH_BASE}/photo-1506461883276-594a12b11cf3?w=1920&q=80`,
};

// ── HELPER FUNCTIONS ────────────────────────────────────────

export function getDestinationImage(slug: string, type: 'hero' | 'card' = 'card'): string {
  const images = DESTINATION_IMAGES[slug];
  if (!images) return DESTINATION_IMAGES.vietnam[type];
  return images[type];
}

export function getDestinationGallery(slug: string): string[] {
  return DESTINATION_IMAGES[slug]?.gallery ?? [];
}

export function getCityImage(slug: string): string {
  return CITY_IMAGES[slug] ?? CITY_IMAGES.hanoi;
}

export function getCityGallery(slug: string): string[] {
  return CITY_GALLERY_IMAGES[slug] ?? [];
}

export function getCategoryImage(category: string): string {
  return CATEGORY_IMAGES[category] ?? CATEGORY_IMAGES.CULTURE_HISTORY;
}

export function getPOIImage(slug: string): string | null {
  return POI_IMAGES[slug] ?? null;
}

export function getExperienceImage(slug: string): string {
  return EXPERIENCE_IMAGES[slug] ?? EXPERIENCE_IMAGES['street-food-adventures'];
}

/**
 * Resolve image: use DB image if it's a full URL, otherwise fall back to Unsplash
 */
export function resolveImage(dbImage: string | null | undefined, fallback: string): string {
  if (!dbImage) return fallback;
  if (dbImage.startsWith('http')) return dbImage;
  return fallback;
}

// ── ASYNC API-POWERED HELPERS ───────────────────────────────
// These try the Unsplash API first (if UNSPLASH_ACCESS_KEY is set),
// then fall back to the hardcoded data above.

import {
  fetchCityGallery,
  fetchCityCardImage,
  fetchPOIImage as fetchPOIImageAPI,
  fetchDestinationGallery,
} from '@/lib/services/unsplash-api';

export async function getCityImageAsync(cityName: string, slug: string): Promise<string> {
  const apiImage = await fetchCityCardImage(cityName, 'India');
  if (apiImage) return apiImage;
  return getCityImage(slug);
}

export async function getCityGalleryAsync(cityName: string, slug: string, countryName = 'India'): Promise<string[]> {
  const apiGallery = await fetchCityGallery(cityName, countryName);
  if (apiGallery.length > 0) return apiGallery;
  return getCityGallery(slug);
}

export async function getDestinationGalleryAsync(countryName: string, slug: string): Promise<string[]> {
  const apiGallery = await fetchDestinationGallery(countryName);
  if (apiGallery.length > 0) return apiGallery;
  return getDestinationGallery(slug);
}

export async function getPOIImageAsync(poiName: string, cityName: string, slug: string): Promise<string> {
  const apiImage = await fetchPOIImageAPI(poiName, cityName);
  if (apiImage) return apiImage;
  return getPOIImage(slug) ?? getCategoryImage('CULTURE_HISTORY');
}

export const categoriesData = [
  { id: "cat-1", name: "Smartphones", count: "5 products", bgImage: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500" },
  { id: "cat-2", name: "Laptops", count: "5 products", bgImage: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500" },
  { id: "cat-3", name: "Gaming", count: "5 products", bgImage: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500" },
  { id: "cat-4", name: "Cameras", count: "5 products", bgImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500" },
  { id: "cat-5", name: "Tablets", count: "5 products", bgImage: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500" },
  { id: "cat-6", name: "Smart Watches", count: "5 products", bgImage: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500" },
  { id: "cat-7", name: "TVs", count: "5 products", bgImage: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500" },
  { id: "cat-8", name: "Headphones", count: "5 products", bgImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" },
  { id: "cat-9", name: "Speakers", count: "5 products", bgImage: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500" },
  { id: "cat-10", name: "Accessories", count: "5 products", bgImage: "https://images.unsplash.com/photo-1609592424109-dd9892f1b177?w=500" },
  { id: "cat-11", name: "Home Appliances", count: "5 products", bgImage: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500" },
  { id: "cat-12", name: "Networking", count: "5 products", bgImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500" }
];

export const productsData = [
  // ==================== 1. SMARTPHONES ====================
  {
    id: "p-101",
    catId: "cat-1",
    name: "iPhone 15 Pro Max 256GB",
    brand: "Apple",
    price: 1199.00,
    oldPrice: 1299.00,
    discount: "-8%",
    rating: 4.8,
    reviews: 1205,
    badge: "FLASH SALE",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500",
    description: "The ultimate iPhone featuring a strong and lightweight titanium design, powerful A17 Pro chip, and a groundbreaking 5x Telephoto camera system."
  },
  {
    id: "p-102",
    catId: "cat-1",
    name: "Galaxy S24 Ultra 512GB",
    brand: "Samsung",
    price: 1299.00,
    oldPrice: 1399.00,
    discount: "-7%",
    rating: 4.7,
    reviews: 840,
    badge: "NEW",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500",
    description: "Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity, productivity and possibility."
  },
  {
    id: "p-103",
    catId: "cat-1",
    name: "Google Pixel 8 Pro",
    brand: "Google",
    price: 999.00,
    rating: 4.5,
    reviews: 310,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500",
    description: "The all-pro phone engineered by Google. It has the best of Google AI, the most advanced Pixel Camera ever, and can help you do more, even faster."
  },
  {
    id: "p-104",
    catId: "cat-1",
    name: "Xiaomi 14 Ultra",
    brand: "Xiaomi",
    price: 1099.00,
    rating: 4.6,
    reviews: 195,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
    description: "Co-engineered with Leica, featuring a next-generation 1-inch main camera sensor and quad-camera system for unparalleled mobile photography."
  },
  {
    id: "p-105",
    catId: "cat-1",
    name: "OnePlus 12 256GB",
    brand: "OnePlus",
    price: 799.00,
    oldPrice: 849.00,
    discount: "-6%",
    rating: 4.4,
    reviews: 412,
    image: "https://images.unsplash.com/photo-1565849511593-ed3de33d8f4d?w=500",
    description: "Redefined flagship smartphone delivering elite performance with Snapdragon 8 Gen 3, advanced 4th Gen Hasselblad Camera for Mobile, and 100W SUPERVOOC charging."
  },

  // ==================== 2. LAPTOPS ====================
  {
    id: "p-201",
    catId: "cat-2",
    name: "Galaxy Book4 Pro",
    brand: "SAMSUNG",
    price: 1299.00,
    oldPrice: 1449.00,
    discount: "-10%",
    rating: 4.5,
    reviews: 544,
    badge: "NEW",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500",
    description: "Experience premium performance with the Galaxy Book4 Pro. Engineered for excellence with cutting-edge technology, sleek design, and unmatched reliability."
  },
  {
    id: "p-202",
    catId: "cat-2",
    name: "Spectre x360",
    brand: "HP",
    price: 1399.00,
    oldPrice: 1599.00,
    discount: "-13%",
    rating: 4.6,
    reviews: 218,
    badge: "NEW",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500",
    description: "Premium 2-in-1 convertible laptop with stunning OLED display, long-lasting battery life, and high-end processing power for creators."
  },
  {
    id: "p-203",
    catId: "cat-2",
    name: "ROG Zephyrus G16",
    brand: "ASUS",
    price: 2199.00,
    oldPrice: 2399.00,
    discount: "-8%",
    rating: 4.8,
    reviews: 312,
    badge: "FLASH SALE",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500",
    description: "Thin and light gaming laptop powerhouse equipped with the latest NVIDIA RTX graphics and an ultra-fast OLED gaming display."
  },
  {
    id: "p-204",
    catId: "cat-2",
    name: "MacBook Air M3 13-inch",
    brand: "Apple",
    price: 1099.00,
    rating: 4.9,
    reviews: 1402,
    badge: "BEST SELLER",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
    description: "Strikingly thin laptop that blazes through work and play with the power of the next-generation M3 chip."
  },
  {
    id: "p-205",
    catId: "cat-2",
    name: "ASUS Zenbook 14 OLED",
    brand: "ASUS",
    price: 899.00,
    rating: 4.5,
    reviews: 410,
    image: "https://images.unsplash.com/photo-1496181130207-89941d3948d2?w=500",
    description: "Premium ultraportable laptop featuring a gorgeous 2.8K OLED HDR display, slim elegant metal body, and Intel Evo performance."
  },

  // ==================== 3. GAMING ====================
  {
    id: "p-301",
    catId: "cat-3",
    name: "PlayStation 5 Slim",
    brand: "Sony",
    price: 499.00,
    rating: 4.9,
    reviews: 2550,
    badge: "BEST SELLER",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500",
    description: "Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, and adaptive triggers."
  },
  {
    id: "p-302",
    catId: "cat-3",
    name: "Xbox Series X 1TB",
    brand: "Microsoft",
    price: 499.00,
    rating: 4.7,
    reviews: 1105,
    image: "https://images.unsplash.com/photo-1621259182978-f09e5e2ae090?w=500",
    description: "The fastest, most powerful Xbox ever. Play thousands of titles from four generations of consoles with processing power built to minimize load times."
  },
  {
    id: "p-303",
    catId: "cat-3",
    name: "Nintendo Switch OLED",
    brand: "Nintendo",
    price: 349.00,
    rating: 4.8,
    reviews: 3420,
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500",
    description: "Features a vibrant 7-inch OLED screen, a wide adjustable stand, a dock with a wired LAN port, 64 GB of internal storage, and enhanced audio."
  },
  {
    id: "p-304",
    catId: "cat-3",
    name: "ASUS ROG Ally Handheld",
    brand: "ASUS",
    price: 699.00,
    oldPrice: 749.00,
    discount: "-6%",
    rating: 4.3,
    reviews: 480,
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500",
    description: "A true Windows 11 handheld gaming machine powered by AMD's Ryzen Z1 Extreme processor, giving you access to all your PC games anywhere."
  },
  {
    id: "p-305",
    catId: "cat-3",
    name: "Razer DeathAdder V3 Pro",
    brand: "Razer",
    price: 149.00,
    rating: 4.6,
    reviews: 690,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500",
    description: "Ultra-lightweight wireless ergonomic esports gaming mouse engineered with cutting-edge optical sensors for professional accuracy."
  },

  // ==================== 4. CAMERAS ====================
  {
    id: "p-401",
    catId: "cat-4",
    name: "Sony Alpha 7 IV Mirrorless",
    brand: "Sony",
    price: 2499.00,
    rating: 4.9,
    reviews: 512,
    badge: "NEW",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
    description: "A groundbreaking full-frame mirrorless camera offering spectacular hybrid performance for both still photography and cinematic video recording."
  },
  {
    id: "p-402",
    catId: "cat-4",
    name: "Canon EOS R6 Mark II",
    brand: "Canon",
    price: 2299.00,
    rating: 4.8,
    reviews: 240,
    image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=500",
    description: "High-performance full-frame mirrorless camera that redefines speed, featuring advanced subject tracking and high-resolution imaging."
  },
  {
    id: "p-403",
    catId: "cat-4",
    name: "Fujifilm X-T5 Mirrorless",
    brand: "Fujifilm",
    price: 1699.00,
    rating: 4.7,
    reviews: 315,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500",
    description: "Classic design combined with modern photography powerhouse, featuring a high-resolution 40.2MP APS-C X-Trans CMOS 5 HR sensor."
  },
  {
    id: "p-404",
    catId: "cat-4",
    name: "GoPro HERO12 Black",
    brand: "GoPro",
    price: 399.00,
    oldPrice: 449.00,
    discount: "-11%",
    rating: 4.6,
    reviews: 1240,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500",
    description: "The best HERO camera yet with incredible image quality, even better HyperSmooth video stabilization, and massive battery life improvement."
  },
  {
    id: "p-405",
    catId: "cat-4",
    name: "DJI Osmo Pocket 3 Creator",
    brand: "DJI",
    price: 669.00,
    rating: 4.9,
    reviews: 580,
    badge: "BEST SELLER",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500",
    description: "Pocket-sized stabilized vlogging camera with a powerful 1-inch CMOS sensor, rotating touchscreen, and ultra-fast full-pixel focus."
  },

  // ==================== 5. TABLETS ====================
  {
    id: "p-501",
    catId: "cat-5",
    name: "iPad Pro 11-inch M4",
    brand: "Apple",
    price: 999.00,
    rating: 4.9,
    reviews: 430,
    badge: "NEW",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
    description: "Impossibly thin design powered by the outrageous speed and AI capabilities of the Apple M4 chip, featuring a breakthrough Tandem OLED display."
  },
  {
    id: "p-502",
    catId: "cat-5",
    name: "Galaxy Tab S9 Ultra",
    brand: "Samsung",
    price: 1199.00,
    rating: 4.7,
    reviews: 290,
    image: "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?w=500",
    description: "The absolute standard for premium Android tablets. Giant Dynamic AMOLED 2X screen, water-resistant IP68 rating, and included ultra-responsive S Pen."
  },
  {
    id: "p-503",
    catId: "cat-5",
    name: "iPad Air 11-inch M2",
    brand: "Apple",
    price: 599.00,
    rating: 4.8,
    reviews: 910,
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500",
    description: "Freshly redesigned tablet powered by the incredibly fast Apple M2 chip, offering a Liquid Retina display and versatile connectivity."
  },
  {
    id: "p-504",
    catId: "cat-5",
    name: "Lenovo Tab P12 Pro",
    brand: "Lenovo",
    price: 649.00,
    rating: 4.4,
    reviews: 115,
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500",
    description: "Elite entertainment and cinematic tablet experience featuring a brilliant 12.6-inch AMOLED display and immersive JBL quad speakers."
  },
  {
    id: "p-505",
    catId: "cat-5",
    name: "Xiaomi Pad 6 Pro",
    brand: "Xiaomi",
    price: 399.00,
    rating: 4.6,
    reviews: 340,
    image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=500",
    description: "High performance for work and play with Snapdragon 8+ Gen 1 processor, ultra-smooth 144Hz WQHD+ display, and long battery life."
  },

  // ==================== 6. SMART WATCHES ====================
  {
    id: "p-601",
    catId: "cat-6",
    name: "Apple Watch Ultra 2",
    brand: "Apple",
    price: 799.00,
    rating: 4.9,
    reviews: 820,
    badge: "BEST SELLER",
    image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=500",
    description: "The ultimate sports and adventure watch. Featuring a rugged titanium case, precision dual-frequency GPS, and up to 36 hours of active battery life."
  },
  {
    id: "p-602",
    catId: "cat-6",
    name: "Galaxy Watch 6 Classic",
    brand: "Samsung",
    price: 399.00,
    rating: 4.6,
    reviews: 1105,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500",
    description: "Timeless styling with a classic rotating bezel. Advanced health and fitness tracking to monitor body composition and personalized sleep coaching."
  },
  {
    id: "p-603",
    catId: "cat-6",
    name: "Garmin Fenix 7 Pro",
    brand: "Garmin",
    price: 799.00,
    rating: 4.8,
    reviews: 460,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    description: "Ultimate solar powered multisport GPS watch with advanced training features, a built-in LED flashlight, and long outdoor tracking stamina."
  },
  {
    id: "p-604",
    catId: "cat-6",
    name: "Google Pixel Watch 2",
    brand: "Google",
    price: 349.00,
    rating: 4.4,
    reviews: 290,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500",
    description: "Help by Google, health by Fitbit. Beautiful custom circular design, improved heart rate accuracy, and full Google Assistant safety features."
  },
  {
    id: "p-605",
    catId: "cat-6",
    name: "Amazfit GTR 4",
    brand: "Amazfit",
    price: 199.00,
    rating: 4.5,
    reviews: 730,
    image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=500",
    description: "Classic round design smart watch with dual-band circular-polarized GPS navigation, ultra-long 14-day battery life, and comprehensive fitness tracking."
  },

  // ==================== 7. TVs ====================
  {
    id: "p-701",
    catId: "cat-7",
    name: "LG C3 65\" 4K OLED TV",
    brand: "LG",
    price: 1699.00,
    rating: 4.9,
    reviews: 640,
    badge: "BEST SELLER",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500",
    description: "The ultimate gaming and cinema television, powered by the a9 AI Processor Gen6 for extraordinary picture contrast and self-lit OLED pixels."
  },
  {
    id: "p-702",
    catId: "cat-7",
    name: "Samsung S90C 65\" OLED",
    brand: "Samsung",
    price: 1599.00,
    rating: 4.8,
    reviews: 410,
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500",
    description: "Quantum Dot technology paired with premium OLED screen panels to provide mesmerizing color volume and deep blacks at high refresh rates."
  },
  {
    id: "p-703",
    catId: "cat-7",
    name: "Sony A80L 55\" Bravia OLED",
    brand: "Sony",
    price: 1399.00,
    rating: 4.7,
    reviews: 310,
    image: "https://images.unsplash.com/photo-1601944179066-297a6cb4ef35?w=500",
    description: "Cognitive Processor XR delivers deep black contrast and rich natural colors, bringing cinema directly to your living room."
  },
  {
    id: "p-704",
    catId: "cat-7",
    name: "TCL QM8 75\" Mini-LED",
    brand: "TCL",
    price: 1299.00,
    rating: 4.6,
    reviews: 580,
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500",
    description: "Massive 75-inch theater display with thousands of local dimming Mini-LED zones for mind-blowing peak brightness."
  },
  {
    id: "p-705",
    catId: "cat-7",
    name: "Hisense U8K 65\" Mini-LED",
    brand: "Hisense",
    price: 899.00,
    rating: 4.5,
    reviews: 490,
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500",
    description: "Premium performance at an unbeatable price, complete with 144Hz native refresh rate for smooth action movies and gaming."
  },

  // ==================== 8. HEADPHONES ====================
  {
    id: "p-801",
    catId: "cat-8",
    name: "Sony WH-1000XM5",
    brand: "Sony",
    price: 398.00,
    rating: 4.9,
    reviews: 4120,
    badge: "BEST SELLER",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    description: "Industry-leading wireless noise-canceling over-ear headphones with exceptional premium sound quality and crystal-clear hands-free calling."
  },
  {
    id: "p-802",
    catId: "cat-8",
    name: "Bose QuietComfort Ultra",
    brand: "Bose",
    price: 429.00,
    rating: 4.8,
    reviews: 1230,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
    description: "High-end spatial audio headphones with world-class active noise cancellation and customized sound tuning tailored to your ears."
  },
  {
    id: "p-803",
    catId: "cat-8",
    name: "AirPods Max 2",
    brand: "Apple",
    price: 549.00,
    rating: 4.7,
    reviews: 3105,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
    description: "Apple-designed dynamic driver provides high-fidelity audio, featuring advanced computational audio and immersive transparency mode."
  },
  {
    id: "p-804",
    catId: "cat-8",
    name: "Sennheiser Momentum 4",
    brand: "Sennheiser",
    price: 299.00,
    rating: 4.6,
    reviews: 840,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    description: "Audiophile-inspired acoustic performance with adaptive noise canceling and an astounding class-leading 60-hour battery life."
  },
  {
    id: "p-805",
    catId: "cat-8",
    name: "Anker Soundcore Space Q45",
    brand: "Anker",
    price: 149.00,
    rating: 4.5,
    reviews: 1940,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    description: "Incredible value double-layer diaphragm headphones reducing ambient background noise by up to 98% on long commutes."
  },

  // ==================== 9. SPEAKERS ====================
  {
    id: "p-901",
    catId: "cat-9",
    name: "JBL Flip 6 Portable",
    brand: "JBL",
    price: 129.00,
    rating: 4.8,
    reviews: 5800,
    badge: "BEST SELLER",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
    description: "Powerful, loud crystal-clear sound signature with robust IP67 waterproof and dustproof exterior body for heavy outdoor use."
  },
  {
    id: "p-902",
    catId: "cat-9",
    name: "Sonos Era 100 Smart",
    brand: "Sonos",
    price: 249.00,
    rating: 4.7,
    reviews: 630,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
    description: "Featuring next-gen acoustics and seamless Bluetooth connectivity, this smart speaker transforms any room with fine-tuned stereo."
  },
  {
    id: "p-903",
    catId: "cat-9",
    name: "Marshall Acton III",
    brand: "Marshall",
    price: 279.00,
    rating: 4.6,
    reviews: 410,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
    description: "Vintage rock-and-roll analog aesthetic housing a wide room-filling active home speaker soundstage that re-defines deep bass output."
  },
  {
    id: "p-904",
    catId: "cat-9",
    name: "Bose SoundLink Flex",
    brand: "Bose",
    price: 149.00,
    rating: 4.8,
    reviews: 2150,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
    description: "State-of-the-art utility speaker utilizing custom PositionIQ technology to automatically optimize sound based on its orientation."
  },
  {
    id: "p-905",
    catId: "cat-9",
    name: "Ultimate Ears MEGABOOM 3",
    brand: "UE",
    price: 199.00,
    rating: 4.5,
    reviews: 1340,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
    description: "Immersive 360-degree thundering bass output engineered completely dropproof and floats safely in water pools."
  },

  // ==================== 10. ACCESSORIES ====================
  {
    id: "p-1001",
    catId: "cat-10",
    name: "Logitech MX Master 3S Mouse",
    brand: "Logitech",
    price: 99.00,
    rating: 4.9,
    reviews: 3410,
    badge: "BEST SELLER",
    image: "https://images.unsplash.com/photo-1609592424109-dd9892f1b177?w=500",
    description: "An iconic ergonomic office mouse remastered for ultimate precision, click tactility, and silent scrolling mechanics."
  },
  {
    id: "p-1002",
    catId: "cat-10",
    name: "Anker Prime 20,000mAh Power Bank",
    brand: "Anker",
    price: 129.00,
    rating: 4.8,
    reviews: 820,
    image: "https://images.unsplash.com/photo-1609592424109-dd9892f1b177?w=500",
    description: "Ultra-high capacity smart charging brick outputting massive 200W simultaneous multi-device laptop battery charging speeds."
  },
  {
    id: "p-1003",
    catId: "cat-10",
    name: "Samsung T7 Shield 2TB SSD",
    brand: "Samsung",
    price: 169.00,
    rating: 4.7,
    reviews: 1150,
    image: "https://images.unsplash.com/photo-1609592424109-dd9892f1b177?w=500",
    description: "Superfast external solid-state storage ruggedized with durable rubber protection to withstand extreme field drops and water mist."
  },
  {
    id: "p-1004",
    catId: "cat-10",
    name: "Apple MagSafe Charger",
    brand: "Apple",
    price: 39.00,
    rating: 4.6,
    reviews: 4320,
    image: "https://images.unsplash.com/photo-1609592424109-dd9892f1b177?w=500",
    description: "Perfectly aligned magnetic arrays instantly lock onto wireless charging coils for seamless high-speed induction output."
  },
  {
    id: "p-1005",
    catId: "cat-10",
    name: "Elgato Stream Deck MK.2",
    brand: "Elgato",
    price: 149.00,
    rating: 4.8,
    reviews: 950,
    image: "https://images.unsplash.com/photo-1609592424109-dd9892f1b177?w=500",
    description: "15 customizable studio macro keys ready to automate streaming setups, app hotkeys, and content creation tasks instantly."
  },

  // ==================== 11. HOME APPLIANCES ====================
  {
    id: "p-1101",
    catId: "cat-11",
    name: "Dyson V15 Detect Vacuum",
    brand: "Dyson",
    price: 749.00,
    rating: 4.9,
    reviews: 1250,
    badge: "NEW",
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500",
    description: "The most powerful, intelligent cordless vacuum. Reveals invisible dust on hard floors using an integrated laser tracking head."
  },
  {
    id: "p-1102",
    catId: "cat-11",
    name: "Philips Airfryer XXL Premium",
    brand: "Philips",
    price: 249.00,
    rating: 4.8,
    reviews: 3100,
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500",
    description: "Twin TurboStar fat-removal design circulating rapid hot air currents to fry crisp healthy foods up to 90% less oil."
  },
  {
    id: "p-1103",
    catId: "cat-11",
    name: "Nespresso Vertuo Next Coffee Machine",
    brand: "Nespresso",
    price: 179.00,
    rating: 4.5,
    reviews: 4210,
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500",
    description: "Sleek automatic barcode-reading capsule brewing machine creating barista-grade crema cups at the press of a single button."
  },
  {
    id: "p-1104",
    catId: "cat-11",
    name: "iRobot Roomba j7+ Robot Vacuum",
    brand: "iRobot",
    price: 599.00,
    rating: 4.4,
    reviews: 640,
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500",
    description: "Smart obstacle-avoidance floor robot automatic home cleaning, mapping rooms perfectly and self-emptying its bin into bags."
  },
  {
    id: "p-1105",
    catId: "cat-11",
    name: "Breville Smart Oven Air Fryer",
    brand: "Breville",
    price: 349.00,
    rating: 4.7,
    reviews: 1105,
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500",
    description: "Countertop convection oven utilizing Element IQ technology to precisely roast, bake, slow-cook, and airfry foods perfectly."
  },

  // ==================== 12. NETWORKING ====================
  {
    id: "p-1201",
    catId: "cat-12",
    name: "ASUS ROG Rapture Wi-Fi 7 Router",
    brand: "ASUS",
    price: 599.00,
    rating: 4.9,
    reviews: 210,
    badge: "NEW",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500",
    description: "Next-generation ultra-fast quad-band Wi-Fi 7 beast delivering extreme 25Gbps broadband streaming for modern low-latency gaming."
  },
  {
    id: "p-1202",
    catId: "cat-12",
    name: "TP-Link Deco XE75 Mesh System",
    brand: "TP-Link",
    price: 319.00,
    rating: 4.8,
    reviews: 1450,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500",
    description: "Whole home tri-band Wi-Fi 6E mesh coverage eliminating dead zones completely up to 5,500 square feet."
  },
  {
    id: "p-1203",
    catId: "cat-12",
    name: "Netgear Nighthawk M6 Pro 5G",
    brand: "Netgear",
    price: 799.00,
    rating: 4.4,
    reviews: 185,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500",
    description: "Secure ultra-fast mobile hotspot router supporting advanced 5G bands to connect up to 32 devices simultaneously anywhere on travel."
  },
  {
    id: "p-1204",
    catId: "cat-12",
    name: "Ubiquiti UniFi Dream Router",
    brand: "Ubiquiti",
    price: 199.00,
    rating: 4.7,
    reviews: 530,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500",
    description: "Enterprise-grade home console router featuring an integrated Wi-Fi 6 access point, PoE switch ports, and visual status screen."
  },
  {
    id: "p-1205",
    catId: "cat-12",
    name: "Linksys Hydra Pro 6E",
    brand: "Linksys",
    price: 179.00,
    rating: 4.3,
    reviews: 390,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500",
    description: "Unleash high-speed multi-gigabit bands to handle extensive high-definition VR streaming without buffering congestions."
  }
];
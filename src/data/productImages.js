const U = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&h=800&q=80`;

export const categoryBgImages = {
  "cat-1": U("1511707171634-5f897ff02aa9"),
  "cat-2": U("1496181133206-80ce9b88a853"),
  "cat-3": U("1606813907291-d86efa9b94db"),
  "cat-4": U("1516035069371-29a1b244cc32"),
  "cat-5": U("1544244015-0df4b3ffc6b0"),
  "cat-6": U("1523275335684-37898b6baf30"),
  "cat-7": U("1593305841991-05c297ba4575"),
  "cat-8": U("1505740420928-5e560c06d30e"),
  "cat-9": U("1608043152269-423dbba4e7e1"),
  "cat-10": U("1527864550417-7fd91fc51a46"),
  "cat-11": U("1558317374-067fb5f30001"),
  "cat-12": U("1544197150-b99a580bb7a8"),
};

/** Product id → image matched to product name/type */
export const productImagesById = {
  // Smartphones
  "p-101": U("1695048133142-1a20484d2569"),
  "p-102": U("1610945265064-0e34e5519bbf"),
  "p-103": U("1598327105666-5b89351aff97"),
  "p-104": U("1511707171634-5f897ff02aa9"),
  "p-105": U("1565849511593-ed3de33d8f4d"),
  // Laptops
  "p-201": U("1593642632823-8f785ba67e45"),
  "p-202": U("1588872657578-7efd1f1555ed"),
  "p-203": U("1603302576837-37561b2e2302"),
  "p-204": U("1517336714731-489689fd1ca8"),
  "p-205": U("1496181130207-89941d3948d2"),
  // Gaming
  "p-301": U("1606813907291-d86efa9b94db"),
  "p-302": U("1621259182978-f09e5e2ae090"),
  "p-303": U("1578632767115-351597cf2477"),
  "p-304": U("1538481199705-c710c4e965fc"),
  "p-305": U("1527864550417-7fd91fc51a46"),
  // Cameras
  "p-401": U("1516035069371-29a1b244cc32"),
  "p-402": U("1617005082133-548c4dd27f35"),
  "p-403": U("1500648767791-00dcc994a43e"),
  "p-404": U("1526170375885-4d8ecf77b99f"),
  "p-405": U("1542751371-adc38448a05e"),
  // Tablets
  "p-501": U("1544244015-0df4b3ffc6b0"),
  "p-502": U("1589739900243-4b52cd9b104e"),
  "p-503": U("1561154464-82e9adf32764"),
  "p-504": U("1611532736597-de2d4265fba3"),
  "p-505": U("1527689368864-3a821dbccc34"),
  // Smart Watches
  "p-601": U("1434494878577-86c23bcb06b9"),
  "p-602": U("1579586337278-3befd40fd17a"),
  "p-603": U("1523275335684-37898b6baf30"),
  "p-604": U("1508685096489-7aacd43bd3b1"),
  "p-605": U("1517502884422-41eaead166d4"),
  // TVs
  "p-701": U("1593305841991-05c297ba4575"),
  "p-702": U("1593784991095-a205069470b6"),
  "p-703": U("1601944179066-297a6cb4ef35"),
  "p-704": U("1574375927738-78825d55efc1"),
  "p-705": U("1461151304267-38535e780c79"),
  // Headphones
  "p-801": U("1505740420928-5e560c06d30e"),
  "p-802": U("1546435770-a3e426bf472b"),
  "p-803": U("1484708230178-769d670d2d1b"),
  "p-804": U("1545127398-14699f923229"),
  "p-805": U("1487214766624-97f792903356"),
  // Speakers
  "p-901": U("1608043152269-423dbba4e7e1"),
  "p-902": U("1545454679459-1a40291c5ddd"),
  "p-903": U("1618366767647-81e7a174d6ae"),
  "p-904": U("1563333299-8664fedbb794"),
  "p-905": U("1558618666-fcd25c85cd64"),
  // Accessories
  "p-1001": U("1527864550417-7fd91fc51a46"),
  "p-1002": U("1609091839311-553aa69c1b42"),
  "p-1003": U("1597872200918-85831b8af916"),
  "p-1004": U("1625842260840-8c78862761d7"),
  "p-1005": U("1587825140708-dfaf72ae4b04"),
  // Home Appliances
  "p-1101": U("1558317374-067fb5f30001"),
  "p-1102": U("1626082897050-94a2e5b6d3b6"),
  "p-1103": U("1495474473867-4d947bc396b2"),
  "p-1104": U("1585657340208-ef529452276d"),
  "p-1105": U("1556909114-f6e7ad7d3136"),
  // Networking
  "p-1201": U("1606901239152-65e7d7d5c1f8"),
  "p-1202": U("1558494979-ef010299cc87"),
  "p-1203": U("1563013543-89a4d5f8ecc9"),
  "p-1204": U("1544197150-b99a580bb7a8"),
  "p-1205": U("1606901239152-65e7d7d5c1f8"),
};

export const fallbackImage = U("1496181133206-80ce9b88a853");
export const heroImage = U("1496181133206-80ce9b88a853");

export function getProductImageById(productId) {
  return productImagesById[productId] || fallbackImage;
}

/** @deprecated use getProductImageById */
export function getProductImage(catId, indexInCategory = 0) {
  const ids = Object.entries(productImagesById)
    .filter(([id]) => {
      const num = parseInt(id.replace("p-", ""), 10);
      const catNum = parseInt(catId.replace("cat-", ""), 10);
      return Math.floor(num / 100) === catNum;
    })
    .sort(([a], [b]) => parseInt(a.slice(2), 10) - parseInt(b.slice(2), 10));
  return ids[indexInCategory]?.[1] || categoryBgImages[catId] || fallbackImage;
}

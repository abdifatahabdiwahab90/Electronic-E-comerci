const U = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&h=800&q=80`;

const P = (seed) => `https://picsum.photos/seed/${seed}/800/800`;

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
  "cat-10": U("1609592424109-dd9892f1b177"),
  "cat-11": U("1558317374-067fb5f30001"),
  "cat-12": U("1544197150-b99a580bb7a8"),
};

export const categoryProductImages = {
  "cat-1": [
    U("1511707171634-5f897ff02aa9"),
    U("1592750475338-74b7b21085ab"),
    U("1695048133142-1a20484d2569"),
    U("1610945265064-0e34e5519bbf"),
    U("1598327105666-5b89351aff97"),
  ],
  "cat-2": [
    U("1496181133206-80ce9b88a853"),
    U("1517336714731-489689fd1ca8"),
    U("1496181130207-89941d3948d2"),
    U("1588872657578-7efd1f1555ed"),
    U("1603302576837-37561b2e2302"),
  ],
  "cat-3": [
    U("1606813907291-d86efa9b94db"),
    U("1621259182978-f09e5e2ae090"),
    U("1578632767115-351597cf2477"),
    U("1538481199705-c710c4e965fc"),
    U("1615663245857-ac93bb7c39e7"),
  ],
  "cat-4": [
    U("1516035069371-29a1b244cc32"),
    U("1617005082133-548c4dd27f35"),
    U("1500648767791-00dcc994a43e"),
    U("1526170375885-4d8ecf77b99f"),
    U("1542751371-adc38448a05e"),
  ],
  "cat-5": [
    U("1544244015-0df4b3ffc6b0"),
    U("1589739900243-4b52cd9b104e"),
    U("1561154464-82e9adf32764"),
    U("1611532736597-de2d4265fba3"),
    U("1527689368864-3a821dbccc34"),
  ],
  "cat-6": [
    U("1523275335684-37898b6baf30"),
    U("1434494878577-86c23bcb06b9"),
    U("1579586337278-3befd40fd17a"),
    U("1508685096489-7aacd43bd3b1"),
    U("1517502884422-41eaead166d4"),
  ],
  "cat-7": [
    U("1593305841991-05c297ba4575"),
    U("1593784991095-a205069470b6"),
    U("1601944179066-297a6cb4ef35"),
    P("tv-lg-oled"),
    P("tv-samsung-frame"),
  ],
  "cat-8": [
    U("1505740420928-5e560c06d30e"),
    U("1546435770-a3e426bf472b"),
    P("headphones-sony"),
    P("headphones-bose"),
    P("headphones-airpods"),
  ],
  "cat-9": [
    U("1608043152269-423dbba4e7e1"),
    P("speaker-jbl"),
    P("speaker-sonos"),
    P("speaker-bose"),
    P("speaker-marshall"),
  ],
  "cat-10": [
    U("1609592424109-dd9892f1b177"),
    P("accessory-mouse"),
    P("accessory-ssd"),
    P("accessory-charger"),
    P("accessory-keyboard"),
  ],
  "cat-11": [
    U("1558317374-067fb5f30001"),
    P("appliance-vacuum"),
    P("appliance-coffee"),
    P("appliance-airfryer"),
    P("appliance-blender"),
  ],
  "cat-12": [
    U("1544197150-b99a580bb7a8"),
    P("network-router"),
    P("network-mesh"),
    P("network-switch"),
    P("network-modem"),
  ],
};

export const fallbackImage = U("1496181133206-80ce9b88a853");

export const heroImage = U("1496181133206-80ce9b88a853");

export function getProductImage(catId, indexInCategory = 0) {
  const pool = categoryProductImages[catId];
  if (!pool?.length) return fallbackImage;
  return pool[indexInCategory % pool.length];
}

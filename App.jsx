import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Trash2, 
  Plus, 
  Minus, 
  Sparkles, 
  Heart, 
  Tag, 
  MessageSquare, 
  X, 
  Package, 
  SlidersHorizontal,
  Moon,
  Sun,
  MapPin,
  ClipboardCheck,
  User,
  Eye
} from 'lucide-react';

// === BASE DE DATOS DE DOJA 100% DEPURADA Y SIN DUPLICADOS ===
const PRODUCTOS_DATA = [
    // --- CATEGORÍA: MAQUILLAJE -> SUB: GLOSS ---
  { 
    id: "jojo-diary-lip-gloss", 
    nombre: "JOJO DIARY LIP GLOSS", 
    precio: 4500, 
    stock: 15, 
    sku: "DOJA-016", 
    categoria: "MAQUILLAJE", 
    subcategoria: "GLOSS", 
    descripcion: "Brillo labial ultra cristalino con envase Jojo Diary. Labios carnosos, hidratados y con destellos de luz espectaculares.",
    destacado: true,
    fallback: "💄",
    image: "https://i.postimg.cc/QMFf5Nx6/IMG-5938-scaled.jpg"
  },
  { 
    id: "gege-bear-lip-glaze-x3", 
    nombre: "GEGE BEAR LIP GLAZE X3", 
    precio: 12000, 
    stock: 8, 
    sku: "DOJA-017", 
    categoria: "MAQUILLAJE", 
    subcategoria: "GLOSS", 
    descripcion: "Set de 3 brillos labiales efecto glaze ultra hidratantes de Gege Bear. Variedad de tonos hermosos y coquetos en un solo pack.",
    destacado: true,
    fallback: "💋",
    image: "https://i.postimg.cc/BvjmDZQN/IMG-4486.jpg"
  },
  { 
    id: "labial-largo-corazon-gege-bear", 
    nombre: "Labial largo corazón GEGE BEAR", 
    precio: 5500, 
    stock: 10, 
    sku: "DOJA-018", 
    categoria: "MAQUILLAJE", 
    subcategoria: "GLOSS", 
    descripcion: "Labial retráctil de larga duración con un delicado aplicador en forma de corazón largo de la marca Gege Bear.",
    destacado: false,
    fallback: "💖",
    image: "https://i.postimg.cc/43YWt4Nv/0380b8ca-893d-464b-b196-d67f0e04d39c-0b85adbed93a79b24117373359269984-320-0.webp"
  },
  { 
    id: "gege-bear-labial-liq-osito-x3", 
    nombre: "GEGE BEAR LABIAL LIQ. OSITO X3", 
    precio: 15000, 
    stock: 5, 
    sku: "DOJA-013", 
    categoria: "MAQUILLAJE", 
    subcategoria: "GLOSS", 
    descripcion: "Set premium de 3 labiales líquidos de alta fijación con un tierno envase coleccionable en forma de Osito.",
    destacado: true,
    fallback: "🧸",
    image: "https://i.postimg.cc/5tXsv9Nn/IMG-5888-scaled.jpg"
  },
  { 
    id: "gege-bear-lip-glaze", 
    nombre: "GEGE BEAR LIP GLAZE", 
    precio: 5000, 
    stock: 14, 
    sku: "DOJA-019", 
    categoria: "MAQUILLAJE", 
    subcategoria: "GLOSS", 
    descripcion: "Brillo labial hidratante de efecto espejo de Gege Bear. Textura ligera, ultra brillante y no pegajosa.",
    destacado: false,
    fallback: "🐰",
    image: "https://i.postimg.cc/d0h5dQVM/Rojo-Crema-Moderno-Artesanal-Personalizado-Cuadrado-Sticker.png"
  },
  { 
    id: "labial-corazon-black-gege-bear", 
    nombre: "Labial corazón black GEGE BEAR", 
    precio: 5500, 
    stock: 12, 
    sku: "DOJA-007", 
    categoria: "MAQUILLAJE", 
    subcategoria: "GLOSS", 
    descripcion: "Labial hidratante con forma de corazón black de la marca Gege Bear. Aporta un brillo espectacular y una hidratación duradera.",
    destacado: false,
    fallback: "💄",
    image: "https://i.postimg.cc/0NzVm52C/9053e298-b73c-4bc8-9e3f-f53536463c2f-7238823cf1066f7be817373364165183-320-0.webp"
  },
  { 
    id: "labial-brillo-corazon-knight-gege-bear", 
    nombre: "Labial brillo Corazón knight Gege Bear", 
    precio: 6000, 
    stock: 11, 
    sku: "DOJA-011", 
    categoria: "MAQUILLAJE", 
    subcategoria: "GLOSS", 
    descripcion: "Brillo labial de edición especial Knight, con aplicador estilizado de corazón. Un brillo con reflejos holográficos únicos.",
    destacado: false,
    fallback: "🌟",
    image: "https://i.postimg.cc/fR2HJSZq/9dd4cf60-1f08-4240-89f3-4a59c4eaa396-20628dc4b829e2107917302647072613-320-0.webp"
  },
  { 
    id: "gege-bear-labial-gloss-2in1", 
    nombre: "GEGE BEAR LABIAL GLOSS 2IN1", 
    precio: 5000, 
    stock: 14, 
    sku: "DOJA-014", 
    categoria: "MAQUILLAJE", 
    subcategoria: "GLOSS", 
    descripcion: "Un producto versátil de dos lados: labial mate súper pigmentado de un extremo, y un gloss de brillo radiante en el otro.",
    destacado: false,
    fallback: "💋",
    image: "https://i.postimg.cc/fbV8XWTr/LABIAL-GLAIR-5-TONOS-GX1253.jpg"
  },
  { 
    id: "gege-bear-lip-glaze-conejo-negro", 
    nombre: "GEGE BEAR LIP GLAZE CONEJO NEGRO", 
    precio: 6000, 
    stock: 9, 
    sku: "DOJA-015", 
    categoria: "MAQUILLAJE", 
    subcategoria: "GLOSS", 
    descripcion: "Glaze labial altamente reflectante inspirado en la estética coquette del conejo negro. Brillo efecto agua.",
    destacado: false,
    fallback: "🐰",
    image: "https://i.postimg.cc/xdX6HjTx/IMG-8803-scaled.jpg"
  },

  // --- CATEGORÍA: MAQUILLAJE -> SUB: BASE CUSHION ---
  { 
    id: "base-cushion-cream-skin-gege-bear", 
    nombre: "Base cushion Cream skin Gege Bear", 
    precio: 12000, 
    stock: 11, 
    sku: "DOJA-008", 
    categoria: "MAQUILLAJE", 
    subcategoria: "BASE CUSHION", 
    descripcion: "Base cushion ultra fluida para un efecto piel de porcelana (Cream Skin). Excelente cobertura con textura ultra liviana.",
    destacado: true,
    fallback: "✨",
    image: "https://i.postimg.cc/d0h5dQtB/a7f32927-5948-40e0-a6c0-234324a05dd6-f2a9784b00b3add3a017720246635667-320-0.webp"
  },
  { 
    id: "base-cushion-lucky-gege-bear", 
    nombre: "Base cushion lucky gege bear", 
    precio: 10000, 
    stock: 11, 
    sku: "DOJA-010", 
    categoria: "MAQUILLAJE", 
    subcategoria: "BASE CUSHION", 
    descripcion: "Edición Lucky de la base cushion de Gege Bear. Ideal para retoques rápidos con acabado mate aterciopelado.",
    destacado: false,
    fallback: "⭐",
    image: "https://i.postimg.cc/P536Pvh3/1b8d2b2b-5143-4827-acfc-7f42a6aa8b71-6f617e09ff8a634a3b17720244730536-320-0.webp"
  },
  { 
    id: "gege-bear-base-cushion-repuesto", 
    nombre: "GEGE BEAR BASE CUSHION & REPUESTO", 
    precio: 12200, 
    stock: 8, 
    sku: "DOJA-012", 
    categoria: "MAQUILLAJE", 
    subcategoria: "BASE CUSHION", 
    descripcion: "Dúo pack que incluye la base cushion original y un cartucho de repuesto adicional para el doble de duración.",
    destacado: true,
    fallback: "💖",
    image: "https://i.postimg.cc/jjDMNqdk/IMG-8810-scaled.jpg"
  },

  // --- CATEGORÍA: MAQUILLAJE -> SUB: PESTAÑAS ---
  { 
    id: "pestanas-gege-bear-glue", 
    nombre: "PESTAÑAS GEGE BEAR GLUE", 
    precio: 6000, 
    stock: 11, 
    sku: "DOJA-009", 
    categoria: "MAQUILLAJE", 
    subcategoria: "PESTAÑAS", 
    descripcion: "Pegamento de pestañas de alta resistencia de Gege Bear. Secado rápido, transparente y durabilidad de larga jornada.",
    destacado: false,
    fallback: "👁️",
    image: "https://i.postimg.cc/3wktprJq/RIMEL-GX1096.jpg"
  },

  // --- CATEGORÍA: MAQUILLAJE -> SUB: SOMBRAS ---
  { 
    id: "paleta-sombras-cherry-blossom", 
    nombre: "Paleta de Sombras Cherry Blossom Gege Bear", 
    precio: 8500, 
    stock: 10, 
    sku: "DOJA-020", 
    categoria: "MAQUILLAJE", 
    subcategoria: "SOMBRAS", 
    descripcion: "Hermosa selección de 9 tonos entre mate y satinados de alta pigmentación en gama rosa y nude, ideal para looks coquette.",
    destacado: true,
    fallback: "🎨",
    image: ""
  },

  // --- CATEGORÍA: MAQUILLAJE -> SUB: RUBOR ---
  { 
    id: "kakashow-rubor", 
    nombre: "KAKASHOW RUBOR", 
    precio: 5800, 
    stock: 9, 
    sku: "DOJA-022", 
    categoria: "MAQUILLAJE", 
    subcategoria: "RUBOR", 
    descripcion: "Rubor compacto Kakashow de acabado suave y difuminado de ensueño. Aporta un tono rosado saludable a tus mejillas.",
    destacado: true,
    fallback: "🌸",
    image: "https://i.postimg.cc/zfyxWDGZ/RUBOR-199-1.jpg"
  },
  { 
    id: "rubor-gege-bear", 
    nombre: "Rubor GEGE BEAR", 
    precio: 5200, 
    stock: 11, 
    sku: "DOJA-023", 
    categoria: "MAQUILLAJE", 
    subcategoria: "RUBOR", 
    descripcion: "Rubor en polvo sedoso Gege Bear de larga duración. Alta adherencia con acabado mate aterciopelado.",
    destacado: false,
    fallback: "💖",
    image: "https://i.postimg.cc/3wktprJC/0836eaa2-eba6-465f-97e7-367a85ee5ccd-64a3f46bcac7317abe17373351491703-320-0.webp"
  },
  { 
    id: "rubor-jelly-gege-bear", 
    nombre: "Rubor jelly Gege Bear", 
    precio: 5500, 
    stock: 7, 
    sku: "DOJA-024", 
    categoria: "MAQUILLAJE", 
    subcategoria: "RUBOR", 
    descripcion: "Rubor con textura jelly ultra divertida y refrescante. Brinda un color translúcido y húmedo de aspecto muy natural.",
    destacado: false,
    fallback: "✨",
    image: "https://i.postimg.cc/3xSLd07n/0af5263a-bf94-4243-ad72-8d7d3a210391-9ba3ab9c7d47ef169617302651732478-320-0.webp"
  },

  // --- CATEGORÍA: UÑAS PRESS ON ---
  { 
    id: "unas-press-on-coquette", 
    nombre: "Uñas Press On the Gazette", 
    precio: 4500, 
    stock: 15, 
    sku: "DOJA-UN-001", 
    categoria: "UÑAS PRESS ON", 
    subcategoria: "UÑAS PRESS ON", 
    descripcion: "Uñas postizas reutilizables decoradas al estilo Coquette con pequeños moños y perlas en relieve rosa. Incluye pegamento.",
    destacado: true,
    fallback: "🎀",
    image: "https://i.postimg.cc/43jB1CYJ/Whats-App-Image-2026-04-27-at-7-25-42-PM-(1).jpg"
  },
  { 
    id: "unas-press-on-Naruto", 
    nombre: "Uñas Press On Naruto Gaara", 
    precio: 4500, 
    stock: 18, 
    sku: "DOJA-UN-002", 
    categoria: "UÑAS PRESS ON", 
    subcategoria: "UÑAS PRESS ON", 
    descripcion: "Set de uñas postizas press on inspiradas en Gaara de Naruto. Diseños premium en relieve.",
    destacado: true,
    fallback: "🐱",
    image: "https://i.postimg.cc/ZqWw3Y5S/Whats-App-Image-2026-04-27-at-7-25-36-PM-(1).jpg"
  },
  { 
    id: "unas-press-on-Helsing", 
    nombre: "Uñas Press On Anime Helsing Edition", 
    precio: 4500, 
    stock: 12, 
    sku: "DOJA-UN-003", 
    categoria: "UÑAS PRESS ON", 
    subcategoria: "UÑAS PRESS ON", 
    descripcion: "Diseños inspirados en personajes de anime con detalles holográficos y relieves 3D. Lucen increíbles y a la moda.",
    destacado: false,
    fallback: "💅",
    image: "https://i.postimg.cc/k52T8Mgq/Whats-App-Image-2026-04-27-at-7-25-36-PM-(2).jpg"
  },
  { 
    id: "unas-press-Naruto", 
    nombre: "Uñas Press On Orochimaru", 
    precio: 3800, 
    stock: 20, 
    sku: "DOJA-UN-004", 
    categoria: "UÑAS PRESS ON", 
    subcategoria: "UÑAS PRESS ON", 
    descripcion: "Set de uñas postizas press on inspiradas en Orochimaru de Naruto. Diseños premium en relieve.",
    destacado: false,
    fallback: "💅",
    image: "https://i.postimg.cc/xdX6Hj10/Whats-App-Image-2026-04-27-at-7-25-36-PM.jpg"
  },
{ 
    id: "unas-press-Elfen Lied", 
    nombre: "Uñas Press On Elfen Lied", 
    precio: 3800, 
    stock: 20, 
    sku: "DOJA-UN-004", 
    categoria: "UÑAS PRESS ON", 
    subcategoria: "UÑAS PRESS ON", 
    descripcion: "Set de uñas postizas press on inspiradas en Elfen Lied. Diseños premium en relieve.",
    destacado: false,
    fallback: "💅",
    image: "https://i.postimg.cc/1zbJKx81/Whats-App-Image-2026-04-27-at-7-25-37-PM.jpg"
  },
  { 
    id: "unas-press-Kuroshitsuji", 
    nombre: "Uñas Press On Kuroshitsuji", 
    precio: 3800, 
    stock: 20, 
    sku: "DOJA-UN-004", 
    categoria: "UÑAS PRESS ON", 
    subcategoria: "UÑAS PRESS ON", 
    descripcion: "Set de uñas postizas press on inspiradas en Kuroshitsuji. Diseños premium en relieve.",
    destacado: false,
    fallback: "💅",
    image: "https://i.postimg.cc/8C7ZWkzk/Whats-App-Image-2026-04-27-at-7-25-36-PM-(3).jpg"
  },
  // --- CATEGORÍA: ACCESORIOS (LLAVEROS) ---
  { 
    id: "llavero-tanjiro", 
    nombre: "Llavero Demon Slayer - Tanjiro", 
    precio: 4000, 
    stock: 15, 
    sku: "DOJA-ACC-001", 
    categoria: "ACCESORIOS", 
    subcategoria: "LLAVEROS", 
    descripcion: "Llavero de silicona de alta calidad con la figura coleccionable de Tanjiro Kamado. Gancho de metal reforzado.",
    destacado: true,
    fallback: "⚔️"
  },
  { 
    id: "llavero-hello-kitty", 
    nombre: "Llavero Hello Kitty", 
    precio: 4000, 
    stock: 20, 
    sku: "DOJA-ACC-002", 
    categoria: "ACCESORIOS", 
    subcategoria: "LLAVEROS", 
    descripcion: "Llavero adorable de Hello Kitty con colgantes adicionales. Perfecto para mochilas, carteras o llaves.",
    destacado: true,
    fallback: "🐱"
  },
  { 
    id: "llavero-naruto", 
    nombre: "Llavero Naruto", 
    precio: 4000, 
    stock: 12, 
    sku: "DOJA-ACC-003", 
    categoria: "ACCESORIOS", 
    subcategoria: "LLAVEROS", 
    descripcion: "Llavero de colección con la figura de Naruto Uzumaki en su modo ninja. Acabado resistente y colores vibrantes.",
    destacado: false,
    fallback: "🍥"
  },
  { 
    id: "llavero-osito", 
    nombre: "Llavero Osito", 
    precio: 4000, 
    stock: 10, 
    sku: "DOJA-ACC-004", 
    categoria: "ACCESORIOS", 
    subcategoria: "LLAVEROS", 
    descripcion: "Llavero de peluche mini de osito. Textura ultra suave y anillo de metal dorado.",
    destacado: false,
    fallback: "🧸"
  },
  { 
    id: "llavero-a", 
    nombre: "Llavero Modelo A", 
    precio: 4000, 
    stock: 8, 
    sku: "DOJA-LL-A", 
    categoria: "ACCESORIOS", 
    subcategoria: "LLAVEROS", 
    descripcion: "Llavero exclusivo de catálogo con diseño de figura del Modelo A.",
    destacado: false,
    fallback: "🔑"
  },
  { 
    id: "llavero-b", 
    nombre: "Llavero Modelo B", 
    precio: 4000, 
    stock: 12, 
    sku: "DOJA-LL-B", 
    categoria: "ACCESORIOS", 
    subcategoria: "LLAVEROS", 
    descripcion: "Llavero de goma semi-flexible con argolla metálica reforzada y mosquetón incorporado.",
    destacado: false,
    fallback: "🔑"
  },
  { 
    id: "llavero-c", 
    nombre: "Llavero Modelo C", 
    precio: 4000, 
    stock: 14, 
    sku: "DOJA-LL-C", 
    categoria: "ACCESORIOS", 
    subcategoria: "LLAVEROS", 
    descripcion: "Llavero de silicona suave Modelo C en hermosos tonos pasteles.",
    destacado: false,
    fallback: "🔑"
  },
  { 
    id: "llavero-d", 
    nombre: "Llavero Modelo D", 
    precio: 4000, 
    stock: 9, 
    sku: "DOJA-LL-D", 
    categoria: "ACCESORIOS", 
    subcategoria: "LLAVEROS", 
    descripcion: "Llavero aesthetic súper vistoso, incluye correa de silicona y cascabel decorativo.",
    destacado: false,
    fallback: "🔑"
  },
  { 
    id: "llavero-e", 
    nombre: "Llavero Modelo E", 
    precio: 4000, 
    stock: 11, 
    sku: "DOJA-LL-E", 
    categoria: "ACCESORIOS", 
    subcategoria: "LLAVEROS", 
    descripcion: "Diseño moderno ideal para enganchar en mochilas o carteras.",
    destacado: false,
    fallback: "🔑"
  },
  { 
    id: "llavero-f", 
    nombre: "Llavero Modelo F", 
    precio: 4000, 
    stock: 16, 
    sku: "DOJA-LL-F", 
    categoria: "ACCESORIOS", 
    subcategoria: "LLAVEROS", 
    descripcion: "Llavero clásico con figura de personajes de colección en tamaño pocket.",
    destacado: false,
    fallback: "🔑"
  },
  { 
    id: "llavero-g", 
    nombre: "Llavero Modelo G (Premium)", 
    precio: 5000, 
    stock: 7, 
    sku: "DOJA-LL-G", 
    categoria: "ACCESORIOS", 
    subcategoria: "LLAVEROS", 
    descripcion: "Llavero de mayor tamaño con doble dije metálico premium y mosquetón de alta calidad.",
    destacado: true,
    fallback: "👑"
  },
  { 
    id: "llavero-h", 
    nombre: "Llavero Modelo H", 
    precio: 4000, 
    stock: 10, 
    sku: "DOJA-LL-H", 
    categoria: "ACCESORIOS", 
    subcategoria: "LLAVEROS", 
    descripcion: "Hermosa combinación de colores y figuras de vinilo suaves al tacto.",
    destacado: false,
    fallback: "🔑"
  },
  { 
    id: "llavero-i", 
    nombre: "Llavero Modelo I", 
    precio: 4000, 
    stock: 5, 
    sku: "DOJA-LL-I", 
    categoria: "ACCESORIOS", 
    subcategoria: "LLAVEROS", 
    descripcion: "Llavero de silicona suave modelo I con argolla cromada plana.",
    destacado: false,
    fallback: "🔑"
  },
  { 
    id: "llavero-j", 
    nombre: "Llavero Modelo J", 
    precio: 4000, 
    stock: 6, 
    sku: "DOJA-LL-J", 
    categoria: "ACCESORIOS", 
    subcategoria: "LLAVEROS", 
    descripcion: "Variante exclusiva J con correa coquette para colgar.",
    destacado: false,
    fallback: "🔑"
  },
  { 
    id: "llavero-k", 
    nombre: "Llavero Modelo K", 
    precio: 4000, 
    stock: 8, 
    sku: "DOJA-LL-K", 
    categoria: "ACCESORIOS", 
    subcategoria: "LLAVEROS", 
    descripcion: "Llavero ultra resistente con diseño de figuras premium de colección.",
    destacado: false,
    fallback: "🔑"
  },
  { 
    id: "llavero-l", 
    nombre: "Llavero Modelo L (Premium)", 
    precio: 5000, 
    stock: 4, 
    sku: "DOJA-LL-L", 
    categoria: "ACCESORIOS", 
    subcategoria: "LLAVEROS", 
    descripcion: "Edición especial de lujo L, correa de eco-cuero pastel con herrajes dorados.",
    destacado: true,
    fallback: "👑"
  },
  { 
    id: "llavero-m", 
    nombre: "Llavero Modelo M", 
    precio: 4000, 
    stock: 12, 
    sku: "DOJA-LL-M", 
    categoria: "ACCESORIOS", 
    subcategoria: "LLAVEROS", 
    descripcion: "Último modelo de llavero clásico de silicona pastel de la colección tradicional.",
    destacado: false,
    fallback: "🔑"
  },
  { 
    id: "llavero-t", 
    nombre: "Llavero Modelo T", 
    precio: 4000, 
    stock: 15, 
    sku: "DOJA-LL-T", 
    categoria: "ACCESORIOS", 
    subcategoria: "LLAVEROS", 
    descripcion: "Variante de llavero coleccionable Modelo T en tonos rosa pastel.",
    destacado: false,
    fallback: "🔑"
  }
];

// SIMULACIÓN DE CLIENTE REGISTRADO EN DOJA (Para que no pida ubicación de nuevo)
const CLIENTE_DEFECTO = {
  name: "Valeria Gómez",
  phone: "+54 9 11 5543-2109",
  address: "Av. Del Libertador 2400, Piso 4B",
  neighborhood: "Palermo, CABA",
  coordinates: "https://maps.google.com/?q=-34.5802,-58.4051",
  homeSchedule: "Tardes (14:00 a 19:00)",
  instructions: "Dejar en portería con Martín siempre si no respondo el timbre."
};

export default function App() {
  const [role, setRole] = useState('customer'); // 'customer' (Vista Cliente) | 'admin' (Vista Administrador)
  const [tabCliente, setTabCliente] = useState('tienda'); // tienda | carrito | pedidos | perfil
  const [tabAdmin, setTabAdmin] = useState('pedidos');
  
  const [inventario, setInventario] = useState(PRODUCTOS_DATA);
  const [carrito, setCarrito] = useState([]);
  const [perfil, setPerfil] = useState(CLIENTE_DEFECTO);
  const [faseCompra, setFaseCompra] = useState('carrito');
  const [comprobanteUrl, setComprobanteUrl] = useState(null);
  const [notificacion, setNotificacion] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState('TODOS');
  const [filtroSubcategoria, setFiltroSubcategoria] = useState('TODAS');
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState("relevancia");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // Corrección: Se agregó la definición de la variable que causaba el ReferenceError.

  // Pedidos Simulados de Clientes (para probar la vista de Administrador)
  const [pedidos, setPedidos] = useState([
    {
      id: "DOJA-9481",
      clientName: "Valeria Gómez",
      phone: "+54 9 11 5543-2109",
      address: "Av. Del Libertador 2400, Piso 4B, Palermo",
      items: [
        { name: "Base cushion Cream skin Gege Bear", quantity: 1, price: 12000 }, 
        { name: "Labial brillo Corazón knight Gege Bear", quantity: 1, price: 6000 }
      ],
      total: 18000,
      status: "Pendiente de Validación",
      date: "2026-05-20 18:30",
      paymentReceipt: "https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?auto=format&fit=crop&q=80&w=600",
      schedule: "Tardes (14:00 a 19:00)",
      instructions: "Dejar en portería con Martín siempre.",
      coordinates: "https://maps.google.com/?q=-34.5802,-58.4051"
    }
  ]);

  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(pedidos[0]);
  const [editandoProductoId, setEditandoProductoId] = useState(null);
  const [urlImagenTemporal, setUrlImagenTemporal] = useState("");

  const mostrarNotificacion = (msg) => {
    setNotificacion(msg);
    setTimeout(() => setNotificacion(null), 3000);
  };

  const agregarAlCarrito = (producto) => {
    const existe = carrito.find(item => item.id === producto.id);
    if (existe) {
      setCarrito(carrito.map(item => item.id === producto.id ? { ...item, cant: item.cant + 1 } : item));
    } else {
      setCarrito([...carrito, { ...producto, cant: 1 }]);
    }
    mostrarNotificacion(`🌸 ${producto.nombre} añadido al carrito`);
  };

  const modificarCantidad = (id, delta) => {
    const actual = carrito.map(item => {
      if (item.id === id) {
        const n = item.cant + delta;
        return n > 0 ? { ...item, cant: n } : null;
      }
      return item;
    }).filter(Boolean);
    setCarrito(actual);
  };

  const obtenerTotal = () => carrito.reduce((acc, item) => acc + (item.precio * item.cant), 0);

  const finalizarPedido = () => {
    if (!comprobanteUrl) {
      mostrarNotificacion("⚠️ Sube la captura de tu transferencia.");
      return;
    }
    const nuevo = {
      id: `DOJA-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName: perfil.name,
      phone: perfil.phone,
      address: `${perfil.address}, ${perfil.neighborhood}`,
      items: carrito.map(c => ({ name: c.nombre, quantity: c.cant, price: c.precio })),
      total: obtenerTotal(),
      status: "Pendiente de Validación",
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      paymentReceipt: comprobanteUrl,
      schedule: perfil.homeSchedule,
      instructions: perfil.instructions,
      coordinates: perfil.coordinates
    };
    setPedidos([nuevo, ...pedidos]);
    setCarrito([]);
    setComprobanteUrl(null);
    setFaseCompra('exito');
    mostrarNotificacion("🚀 ¡Pedido Enviado! Controlalo en la vista Admin.");
  };

  const cambiarImagenProducto = (id, nuevaUrl) => {
    setInventario(inventario.map(p => p.id === id ? { ...p, image: nuevaUrl } : p));
    setEditandoProductoId(null);
    mostrarNotificacion("✨ Foto de producto actualizada.");
  };

  const subcategoriasDisponibles = useMemo(() => {
    const list = ["TODAS"];
    inventario.forEach(p => {
      if (filtroCategoria === "TODOS" || p.categoria === filtroCategoria) {
        if (!list.includes(p.subcategoria)) {
          list.push(p.subcategoria);
        }
      }
    });
    return list;
  }, [filtroCategoria, inventario]);

  const productosFiltrados = useMemo(() => {
    let result = [...inventario];

    if (filtroCategoria !== "TODOS") {
      result = result.filter(p => p.categoria === filtroCategoria);
    }

    if (filtroSubcategoria !== "TODAS") {
      result = result.filter(p => p.subcategoria === filtroSubcategoria);
    }

    if (busqueda.trim() !== "") {
      const q = busqueda.toLowerCase();
      result = result.filter(p => 
        p.nombre.toLowerCase().includes(q) || 
        p.sku.toLowerCase().includes(q) ||
        p.descripcion.toLowerCase().includes(q)
      );
    }

    if (orden === "precio-menor") {
      result.sort((a, b) => a.precio - b.precio);
    } else if (orden === "precio-mayor") {
      result.sort((a, b) => b.precio - a.precio);
    } else if (orden === "nombre-az") {
      result.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else {
      result.sort((a, b) => (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0));
    }

    return result;
  }, [inventario, filtroCategoria, filtroSubcategoria, busqueda, orden]);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? 'bg-zinc-950 text-zinc-100' : 'bg-[#FFF6F7] text-[#5C1B26]'}`}>
      
      {/* BARRA SUPERIOR DE SIMULACIÓN DE ROLES (RESTAURADA) */}
      <div className="bg-[#5C1B26] text-[#FFE3E7] p-3 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs font-medium sticky top-0 z-50 shadow-sm border-b border-[#7C3543]">
        <div>
          <span className="bg-[#E58B9D] text-white px-2 py-0.5 rounded font-bold mr-2 text-[10px]">CONSOLA INTEGRADA</span>
          <span>Prueba el ecosistema completo alternando el rol aquí:</span>
        </div>
        <div className="flex bg-[#40131A] p-1 rounded-lg border border-[#7C3543]">
          <button 
            onClick={() => { setRole('customer'); setTabCliente('tienda'); }} 
            className={`px-3 py-1 rounded text-[11px] transition font-bold ${role === 'customer' ? 'bg-[#E58B9D] text-white shadow-xs' : 'text-stone-300'}`}
          >
            📱 Comprar (Vista Cliente)
          </button>
          <button 
            onClick={() => { setRole('admin'); setTabAdmin('pedidos'); }} 
            className={`px-3 py-1 rounded text-[11px] transition font-bold ${role === 'admin' ? 'bg-[#E58B9D] text-white shadow-xs' : 'text-stone-300'}`}
          >
            💼 Controlar (Vista Administrador)
          </button>
        </div>
      </div>

      {/* Alerta flotante */}
      {notificacion && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#E58B9D] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-bounce border border-[#FFCAD2]">
          <Sparkles className="w-5 h-5" />
          <span className="font-bold text-xs">{notificacion}</span>
        </div>
      )}

      {/* HEADER PRINCIPAL */}
      <header className={`backdrop-blur-md border-b transition-colors duration-300 ${darkMode ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white/95 border-[#FCD3D9]'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#E58B9D] to-[#FCAEB9] flex items-center justify-center text-white shadow-md shadow-rose-200">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-black tracking-widest text-[#7C3543]">DOJA</h1>
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#E58B9D]">Maquillajes & Accesorios</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-xl border transition-colors ${
                darkMode ? 'bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-yellow-400' : 'bg-[#FFF0F2] border-[#FCD3D9] hover:bg-[#FFE3E7] text-[#8C3A48]'
              }`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {role === 'customer' && (
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 bg-gradient-to-r from-[#E58B9D] to-[#FCAEB9] hover:from-[#C56B77] hover:to-[#E58B9D] text-white rounded-xl shadow-xs flex items-center gap-2 font-bold text-xs uppercase tracking-wider"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Carrito ({carrito.reduce((sum, item) => sum + item.cant, 0)})</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* CUERPO CENTRAL DE LA APLICACIÓN */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* ==================== VISTA CLIENTE ==================== */}
        {role === 'customer' && (
          <div className="space-y-6">
            
            {/* Banner Estilo Coquette */}
            <div className="bg-gradient-to-br from-[#FFF0F2] via-[#FFF5F6] to-[#FFE3E7] border border-[#FCD3D9] p-6 sm:p-10 rounded-3xl relative overflow-hidden">
              <div className="relative z-10 max-w-xl">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#E58B9D] text-white mb-4">
                  <Sparkles className="w-3 h-3" /> COMPRA SEGUNDOS EXPRESS
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#7C3543] mb-2 leading-tight">
                  Elegí lo que amás, pagá y recibilo 🌸
                </h2>
                <p className="text-xs text-[#8C3A48] font-medium leading-relaxed mb-4">
                  Tu dirección de entrega, horarios y teléfono quedan guardados automáticamente tras crear tu ficha. ¡Olvídate de detallar dónde vives en cada compra!
                </p>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setTabCliente('tienda')} className="px-4 py-2 bg-[#E58B9D] text-white rounded-xl text-xs font-bold hover:bg-[#C56B77]">Explorar Tienda</button>
                  <button onClick={() => setTabCliente('perfil')} className="px-4 py-2 bg-white text-[#7C3543] border border-[#FCD3D9] rounded-xl text-xs font-bold hover:bg-[#FFF0F2]">Mi Ficha de Envío</button>
                </div>
              </div>
              <div className="absolute right-0 bottom-0 opacity-10 text-9xl transform translate-x-10 translate-y-10 select-none">🌷</div>
            </div>

            {/* Navegación Interna Cliente */}
            <div className="flex gap-2 border-b border-[#FCD3D9] pb-1 overflow-x-auto">
              {['tienda', 'carrito', 'pedidos', 'perfil'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setTabCliente(tab); setFaseCompra('carrito'); }}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-b-2 transition ${
                    tabCliente === tab ? 'border-[#E58B9D] text-[#7C3543]' : 'border-transparent text-stone-400'
                  }`}
                >
                  {tab === 'tienda' ? '🎀 Catálogo' : tab === 'carrito' ? '🛒 Mi Carrito' : tab === 'pedidos' ? '📦 Mis Pedidos' : '📋 Mi Ficha Fija'}
                </button>
              ))}
            </div>

            {/* TAB CLIENTE: TIENDA */}
            {tabCliente === 'tienda' && (
              <div className="space-y-6 animate-fade-in">
                
                {/* Buscador & Filtros */}
                <div className="flex flex-col md:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="🔍 Buscar bases Gege Bear, gloss, sombras, press on..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="flex-1 p-3 border border-[#FCD3D9] rounded-xl text-xs bg-white text-stone-800 focus:ring-1 focus:ring-[#E58B9D] focus:outline-none placeholder-stone-400"
                  />
                  
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {['TODOS', 'MAQUILLAJE', 'UÑAS PRESS ON', 'ACCESORIOS'].map(cat => (
                      <button
                        key={cat}
                        onClick={() => { setFiltroCategoria(cat); setFiltroSubcategoria("TODAS"); }}
                        className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap border ${
                          filtroCategoria === cat ? 'bg-[#E58B9D] text-white border-transparent' : 'bg-white text-[#C56B77] border-[#FCD3D9]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subfiltros */}
                <div className="flex items-center gap-2 overflow-x-auto py-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C56B77]">Subfiltros:</span>
                  {subcategoriasDisponibles.map(sub => (
                    <button
                      key={sub}
                      onClick={() => setFiltroSubcategoria(sub)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        filtroSubcategoria === sub ? 'bg-[#FFF0F2] text-[#8C3A48] border border-[#FFD1D8]' : 'bg-white border text-stone-500'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>

                {/* Grilla de productos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {productosFiltrados.map(prod => (
                    <div key={prod.id} className="bg-white rounded-2xl border border-[#FCD3D9] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-sm transition">
                      <div className="h-40 bg-gradient-to-tr from-[#FFF0F2] to-[#FFE3E7] flex flex-col items-center justify-center p-4 relative">
                        <span className="text-4xl filter drop-shadow-sm select-none">{prod.fallback}</span>
                        <span className="absolute top-2 right-2 text-[9px] font-bold text-[#8C3A48] bg-[#FFF0F2] border px-2 py-0.5 rounded-full">{prod.sku}</span>
                      </div>
                      <div className="p-4 flex-grow flex flex-col justify-between">
                        <div className="space-y-1">
                          <h4 className="font-bold text-xs text-[#7C3543] line-clamp-1">{prod.nombre}</h4>
                          <p className="text-[10px] text-stone-500 line-clamp-2 leading-relaxed">{prod.descripcion}</p>
                        </div>
                        <div className="flex justify-between items-center pt-3 mt-3 border-t border-[#FFF0F2]">
                          <span className="text-xs font-black text-[#8C3A48]">${prod.precio.toLocaleString('es-AR')}</span>
                          <button onClick={() => agregarAlCarrito(prod)} className="bg-[#E58B9D] hover:bg-[#C56B77] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg transition">Añadir 🛒</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CLIENTE: CARRITO */}
            {tabCliente === 'carrito' && (
              <div className="max-w-xl mx-auto bg-white border border-[#FCD3D9] rounded-3xl p-5 shadow-xs space-y-4 animate-fade-in">
                {faseCompra === 'carrito' && (
                  <div className="space-y-4">
                    <h3 className="font-serif font-bold text-[#7C3543]">Tu Lista de Compra</h3>
                    {carrito.length === 0 ? (
                      <p className="text-xs text-stone-400 text-center py-6">Tu carrito está esperando que agregues productos.</p>
                    ) : (
                      <>
                        <div className="divide-y divide-[#FFF0F2] text-xs">
                          {carrito.map(item => (
                            <div key={item.id} className="py-3 flex justify-between items-center gap-3">
                              <div className="flex items-center gap-2">
                                <span className="text-xl bg-[#FFF0F2] border border-[#FCD3D9] p-1.5 rounded-lg">{item.fallback}</span>
                                <p className="font-bold text-stone-900 line-clamp-1">{item.nombre}</p>
                              </div>
                              <div className="flex items-center gap-3 shrink-0">
                                <div className="flex border rounded overflow-hidden">
                                  <button onClick={() => modificarCantidad(item.id, -1)} className="px-2 py-0.5 bg-stone-50 text-stone-500">-</button>
                                  <span className="px-2 py-0.5 font-bold">{item.cant}</span>
                                  <button onClick={() => modificarCantidad(item.id, 1)} className="px-2 py-0.5 bg-stone-50 text-stone-500">+</button>
                                </div>
                                <span className="font-bold text-stone-900 w-16 text-right">${(item.precio * item.cant).toLocaleString('es-AR')}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Ficha logística automática */}
                        <div className="bg-[#FFF0F2] p-4 rounded-xl text-xs space-y-1.5 border border-[#FFD1D8]">
                          <p className="font-bold text-[#8C3A48] uppercase text-[9px] tracking-wider">📍 Domicilio Fijo de Envío (Registrado en tu Ficha):</p>
                          <p><strong>Destinatario:</strong> {perfil.name} | {perfil.phone}</p>
                          <p><strong>Ubicación:</strong> {perfil.address}, {perfil.neighborhood}</p>
                          <p><strong>Rango Horario:</strong> {perfil.homeSchedule}</p>
                          <p className="text-stone-500 italic mt-1">"{perfil.instructions}"</p>
                        </div>

                        <div className="flex justify-between items-center pt-2 font-bold border-t">
                          <span>Total del Pedido:</span>
                          <span className="text-lg text-[#8C3A48]">${obtenerTotal().toLocaleString('es-AR')}</span>
                        </div>

                        <button onClick={() => setFaseCompra('pago')} className="w-full bg-[#E58B9D] hover:bg-[#C56B77] text-white py-3 rounded-xl text-xs font-bold shadow-xs">Avanzar al Pago Electrónico 💳</button>
                      </>
                    )}
                  </div>
                )}

                {faseCompra === 'pago' && (
                  <div className="space-y-4 animate-fade-in">
                    <button onClick={() => setFaseCompra('carrito')} className="text-xs text-stone-400 hover:underline">← Volver al carrito</button>
                    <h3 className="font-bold text-stone-900 text-sm">Paga por transferencia y sube el ticket</h3>
                    
                    <div className="bg-[#FFF0F2] p-4 rounded-xl text-xs space-y-1 border border-[#FFD1D8]">
                      <p><strong>Banco:</strong> Banco Doja Estética S.A.</p>
                      <p><strong>Alias de Cuenta:</strong> doja.beauty.shop</p>
                      <p><strong>CBU:</strong> 0000003100055432109876</p>
                      <p className="font-bold text-[#8C3A48] text-sm pt-1">Monto exacto a transferir: ${obtenerTotal().toLocaleString('es-AR')}</p>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-stone-700">Subí la captura del comprobante:</label>
                      <div className="border-2 border-dashed border-[#FCD3D9] rounded-xl p-5 text-center bg-[#FFFBFB] space-y-3">
                        {comprobanteUrl ? (
                          <div className="space-y-2">
                            <span className="text-emerald-600 font-bold text-xs block">✓ Comprobante cargado</span>
                            <img src={comprobanteUrl} alt="Comprobante" className="max-h-24 mx-auto rounded border" />
                            <button onClick={() => setComprobanteUrl(null)} className="text-[10px] text-red-500 underline block mx-auto">Cambiar imagen</button>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <span className="text-3xl block">📸</span>
                            <button
                              onClick={() => setComprobanteUrl("https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?auto=format&fit=crop&q=80&w=600")}
                              className="bg-[#7C3543] text-white text-[10px] px-3 py-1.5 rounded-lg font-bold"
                            >
                              Simular Carga de Ticket 📎
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <button 
                      onClick={finalizarPedido}
                      disabled={!comprobanteUrl}
                      className={`w-full py-3 rounded-xl text-xs font-bold text-white shadow-xs transition ${
                        comprobanteUrl ? 'bg-emerald-700 hover:bg-emerald-800' : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                      }`}
                    >
                      Confirmar y Enviar Pedido 🛵
                    </button>
                  </div>
                )}

                {faseCompra === 'exito' && (
                  <div className="p-6 text-center space-y-4 animate-fade-in">
                    <span className="text-4xl block">✨🎉</span>
                    <h3 className="font-serif font-extrabold text-[#7C3543] text-lg">¡Pedido Enviado a Doja!</h3>
                    <p className="text-xs text-stone-500 px-4">Tus cosméticos y accesorios se están preparando. Tu dirección de entrega fija y comprobante de pago entraron directo a nuestra oficina.</p>
                    <button onClick={() => { setFaseCompra('carrito'); setTabCliente('pedidos'); }} className="bg-[#E58B9D] text-white px-5 py-2 rounded-lg text-xs font-bold">Ver Estado del Envío 📦</button>
                  </div>
                )}
              </div>
            )}

            {/* TAB CLIENTE: PEDIDOS */}
            {tabCliente === 'pedidos' && (
              <div className="max-w-xl mx-auto space-y-3 animate-fade-in">
                <h3 className="font-serif font-bold text-[#7C3543] text-sm">Tus Compras</h3>
                {pedidos.map(p => (
                  <div key={p.id} className="bg-white p-4 rounded-xl border border-[#FCD3D9] shadow-xs space-y-3">
                    <div className="flex justify-between items-center border-b pb-2">
                      <div>
                        <span className="text-[10px] text-stone-400 block">{p.date}</span>
                        <span className="font-black text-sm text-[#8C3A48]">{p.id}</span>
                      </div>
                      <span className="bg-[#FFF0F2] text-[#8C3A48] text-[10px] font-black px-2.5 py-1 rounded-full border border-[#FFD1D8]">{p.status}</span>
                    </div>
                    <div className="text-xs text-stone-600">
                      <p><strong>Artículos:</strong> {p.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}</p>
                      <p><strong>Entregar en:</strong> 📍 {p.address}</p>
                    </div>
                    <div className="text-right font-black text-stone-900 text-xs">
                      Total: ${p.total.toLocaleString('es-AR')}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CLIENTE: MI PERFIL (FICHA FIJA) */}
            {tabCliente === 'perfil' && (
              <div className="max-w-xl mx-auto bg-white p-5 rounded-2xl border border-[#FCD3D9] shadow-xs space-y-4 animate-fade-in">
                <div>
                  <h3 className="font-serif font-black text-[#7C3543] text-base">Ficha de Entrega Permanente</h3>
                  <p className="text-xs text-stone-400">Guarda tus datos una sola vez. No te volveremos a pedir dirección, ubicación o rangos horarios nunca más.</p>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-stone-600 mb-1">Nombre Completo:</label>
                      <input type="text" value={perfil.name} onChange={(e) => setPerfil({...perfil, name: e.target.value})} className="w-full p-2.5 border rounded-lg bg-[#FAF8F7]" />
                    </div>
                    <div>
                      <label className="block font-bold text-stone-600 mb-1">WhatsApp de Contacto:</label>
                      <input type="text" value={perfil.phone} onChange={(e) => setPerfil({...perfil, phone: e.target.value})} className="w-full p-2.5 border rounded-lg bg-[#FAF8F7]" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-stone-600 mb-1">Dirección Exacta:</label>
                      <input type="text" value={perfil.address} onChange={(e) => setPerfil({...perfil, address: e.target.value})} className="w-full p-2.5 border rounded-lg bg-[#FAF8F7]" />
                    </div>
                    <div>
                      <label className="block font-bold text-stone-600 mb-1">Barrio / Localidad:</label>
                      <input type="text" value={perfil.neighborhood} onChange={(e) => setPerfil({...perfil, neighborhood: e.target.value})} className="w-full p-2.5 border rounded-lg bg-[#FAF8F7]" />
                    </div>
                  </div>
                  <div>
                    <label className="block font-bold text-stone-600 mb-1">Franja Horaria de Disponibilidad:</label>
                    <select value={perfil.homeSchedule} onChange={(e) => setPerfil({...perfil, homeSchedule: e.target.value})} className="w-full p-2.5 border rounded-lg bg-[#FAF8F7] bg-white">
                      <option value="Tardes (14:00 a 19:00)">Tardes (14:00 a 19:00)</option>
                      <option value="Mañanas (8:00 a 13:00)">Mañanas (8:00 a 13:00)</option>
                      <option value="Todo el día disponible">Todo el día disponible</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-stone-600 mb-1">Instrucciones Logísticas para el Repartidor:</label>
                    <textarea rows="2" value={perfil.instructions} onChange={(e) => setPerfil({...perfil, instructions: e.target.value})} className="w-full p-2.5 border rounded-lg bg-[#FAF8F7]" placeholder="Ej: timbre roto, dejar con el encargado de PB, reja de color rosa..." />
                  </div>
                  <button onClick={() => mostrarNotificacion("✅ Ficha de entrega permanente actualizada.")} className="w-full bg-[#E58B9D] text-white font-bold py-2.5 rounded-xl text-xs">Guardar Mis Datos de por Vida</button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ==================== VISTA ADMINISTRADOR ==================== */}
        {role === 'admin' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Cabecera Admin */}
            <div className="bg-[#7C3543] text-white p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="font-serif text-lg font-bold">Consola Logística de Doja</h2>
                <p className="text-xs text-[#FFE8EB]">Valida transferencias bancarias y despacha envíos automáticos sin chatear.</p>
              </div>
              <div className="flex bg-[#602D35] p-1 rounded-lg border border-[#7C3543]">
                {['pedidos', 'clientes', 'catalogo'].map(adTab => (
                  <button 
                    key={adTab}
                    onClick={() => setTabAdmin(adTab)}
                    className={`px-3 py-1.5 rounded text-xs font-bold transition ${tabAdmin === adTab ? 'bg-[#E58B9D] text-white' : 'text-stone-300'}`}
                  >
                    {adTab === 'pedidos' ? '📥 Pedidos' : adTab === 'clientes' ? '👥 Clientes Fijos' : '🖼️ Catálogo'}
                  </button>
                ))}
              </div>
            </div>

            {/* TAB ADMIN: PEDIDOS ENTRANTES */}
            {tabAdmin === 'pedidos' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Listado Izquierda */}
                <div className="md:col-span-2 space-y-3">
                  <h3 className="font-bold text-[#8C3A48] text-xs uppercase tracking-widest">Cola de Envíos en Espera</h3>
                  {pedidos.map(p => (
                    <div 
                      key={p.id}
                      onClick={() => setPedidoSeleccionado(p)}
                      className={`p-4 bg-white border rounded-xl shadow-xs cursor-pointer hover:border-[#E58B9D] transition space-y-2 ${
                        pedidoSeleccionado?.id === p.id ? 'ring-2 ring-[#E58B9D] border-transparent' : 'border-[#FCD3D9]'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-black text-stone-900 text-sm">{p.id}</span>
                        <span className="text-[9px] bg-[#FFF0F2] text-[#8C3A48] font-bold px-2 py-0.5 rounded-full border border-[#FFD1D8]">{p.status}</span>
                      </div>
                      <p className="text-xs text-stone-700"><strong>Cliente:</strong> {p.clientName} | 📞 {p.phone}</p>
                      <p className="text-xs text-stone-500 truncate">📍 <strong>Dirección guardada:</strong> {p.address}</p>
                    </div>
                  ))}
                </div>

                {/* Detalle Derecha con Ficha del Delivery (Fórmula de Éxito) */}
                <div className="bg-white p-5 rounded-2xl border border-[#FCD3D9] shadow-xs space-y-4 h-fit">
                  {pedidoSeleccionado ? (
                    <div className="space-y-4 text-xs">
                      <div className="border-b pb-2">
                        <span className="text-[#8C4A43] font-bold tracking-widest text-[9px] uppercase">Ficha para el Repartidor (Automática)</span>
                        <h4 className="text-sm font-black text-stone-900">{pedidoSeleccionado.id}</h4>
                      </div>

                      <div className="bg-[#FFF0F2] p-3 rounded-xl space-y-2 border border-[#FFD1D8] text-stone-700">
                        <p><strong>Destinatario:</strong> {pedidoSeleccionado.clientName} ({pedidoSeleccionado.phone})</p>
                        <p><strong>Domicilio:</strong> {pedidoSeleccionado.address}</p>
                        <p><strong>Horarios:</strong> {pedidoSeleccionado.schedule}</p>
                        <p className="text-[#8C4A43] italic font-semibold">" {pedidoSeleccionado.instructions} "</p>
                        <a href={pedidoSeleccionado.coordinates} target="_blank" rel="noreferrer" className="text-blue-600 font-bold block pt-1 hover:underline">🗺️ Ver Dirección en Google Maps 🔗</a>
                      </div>

                      <div className="space-y-1 bg-stone-50 p-2.5 rounded-lg border text-stone-600">
                        <p className="font-bold text-[9px] uppercase text-stone-400">Artículos:</p>
                        {pedidoSeleccionado.items.map((it, idx) => (
                          <p key={idx}>• {it.quantity}x {it.name} (${it.price.toLocaleString('es-AR')})</p>
                        ))}
                        <p className="pt-1 font-bold text-stone-900 border-t mt-1">Total: ${pedidoSeleccionado.total.toLocaleString('es-AR')}</p>
                      </div>

                      <div>
                        <p className="font-bold text-stone-600 mb-1">Comprobante de Transferencia:</p>
                        <img src={pedidoSeleccionado.paymentReceipt} alt="Comprobante Pago" className="w-full rounded-lg border max-h-36 object-cover shadow-inner" />
                      </div>

                      <div className="space-y-2 border-t pt-3">
                        <p className="font-bold text-stone-700">Actualizar Estado del Envío:</p>
                        <div className="grid grid-cols-2 gap-2">
                          <button onClick={() => { setPedidos(pedidos.map(p => p.id === pedidoSeleccionado.id ? {...p, status: 'En Camino'} : p)); mostrarNotificacion("Pedido en viaje 🛵"); }} className="bg-[#E58B9D] text-white font-bold p-2 rounded-lg text-[11px] text-center hover:bg-[#C56B77] transition">🛵 Despachado</button>
                          <button onClick={() => { setPedidos(pedidos.map(p => p.id === pedidoSeleccionado.id ? {...p, status: 'Entregado'} : p)); mostrarNotificacion("Pedido entregado 🎉"); }} className="bg-emerald-700 text-white font-bold p-2 rounded-lg text-[11px] text-center hover:bg-emerald-800 transition">✓ Entregado</button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-stone-400 text-center py-6 text-xs">Selecciona un pedido para ver la ficha.</p>
                  )}
                </div>

              </div>
            )}

            {/* TAB ADMIN: BASE DE CLIENTES REGISTRADOS */}
            {tabAdmin === 'clientes' && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-[#7C3543] text-sm">Fichas de Clientes con Domicilio Guardado</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-[#FCD3D9] space-y-2 text-xs shadow-xs">
                    <p className="font-black text-[#8C3A48] text-sm border-b pb-1">👤 Valeria Gómez</p>
                    <p><strong>WhatsApp:</strong> +54 9 11 5543-2109</p>
                    <p><strong>Ubicación Permanente:</strong> Av. Del Libertador 2400, Piso 4B, Palermo</p>
                    <p><strong>Franja horaria en casa:</strong> Tardes (14:00 a 19:00)</p>
                    <p className="bg-[#FFF0F2] text-[#8C3A48] p-2.5 rounded-lg font-bold italic">" Dejar en portería con Martín siempre si no respondo el timbre. "</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB ADMIN: GESTOR DE ENLACES DE IMÁGENES */}
            {tabAdmin === 'catalogo' && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-serif font-bold text-[#7C3543] text-sm">Gestor de Catálogo e Imágenes</h3>
                  <p className="text-xs text-stone-500">Aquí puedes ver la lista depurada sin duplicados y asignarles fotos pegando enlaces cuando desees.</p>
                </div>
                <div className="bg-white rounded-2xl border border-[#FCD3D9] p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {inventario.map(prod => (
                      <div key={prod.id} className="p-3 border border-[#FCD3D9] rounded-xl flex gap-3 items-center bg-[#FFFBFB]">
                        <span className="text-2xl bg-[#FFF0F2] border border-[#FCD3D9] p-2 rounded-lg">{prod.fallback}</span>
                        <div className="flex-grow space-y-0.5 text-xs">
                          <p className="font-bold text-stone-900 line-clamp-1">{prod.nombre}</p>
                          <p className="text-[#8C3A48] font-bold text-[11px]">${prod.precio.toLocaleString('es-AR')}</p>
                          <p className="text-stone-400 text-[9px] uppercase tracking-wider">{prod.category} - SKU: {prod.sku}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </main>
export default App;
    </div>
  );
}

export const products = [
  // --- KATEGORIA: MOTO (Oświetlenie i Mocowania) ---

  {
    id: 1,
    name: "Kierunkowskazy LED Dynamiczne (Pływające)",
    category: "moto",
    price: 89.00,
    oldPrice: 119.00,
    images: ["/assets/kierunkowskaz1.png", "/assets/kierunkowskaz2.png"],
    description: "Nowoczesne kierunkowskazy LED z efektem dynamicznym (pływającym). Zwiększają widoczność motocykla i nadają mu agresywny, nowoczesny wygląd. Idealnie komponują się z naszymi mocowaniami tablicy rejestracyjnej.",
    features: [
      "Technologia LED - wysoka jasność",
      "Efekt pływającego światła (Audi style)",
      "Elastyczne ramię odporne na złamania",
      "Wodoodporność IP67",
      "Kompatybilne z naszymi mocowaniami 3D"
    ],
    stock: 20,
    featured: true,
  },
  {
    id: 2,
    name: "Lampa LED STOP Płaska (Przyciemniana)",
    category: "moto",
    price: 69.00,
    images: ["/assets/swiatloplaskie1.png", "/assets/swiatloplaskie2.png"],
    description: "Minimalistyczna, płaska lampa tylna LED z funkcją światła pozycyjnego i STOP. Posiada przyciemniany klosz (smoke), który idealnie pasuje do customowych projektów ogonów motocyklowych.",
    features: [
      "Ultra-płaski profil",
      "Klosz typu SMOKE (przyciemniany)",
      "Mocne diody LED (Czerwone)",
      "Łatwy montaż na taśmę lub śruby",
      "Homologacja drogowa"
    ],
    stock: 15,
  },
  {
    id: 3,
    name: "Uniwersalne Mocowanie Tablicy Rejestracyjnej 3D",
    category: "moto",
    price: 149.00,
    images: ["/assets/mocowanie1.png", "/assets/mocowanie2.png", "/assets/mocowanie3.png"],
    description: "Wytrzymały uchwyt tablicy rejestracyjnej zaprojektowany i wykonany w technologii druku 3D z materiału odpornego na UV i drgania (PETG/ASA). Zaprojektowany tak, aby pasował do większości motocykli (Fender Eliminator).",
    features: [
      "Materiał klasy przemysłowej (odporny na słońce i benzynę)",
      "Regulowany kąt nachylenia",
      "Gotowe otwory pod nasze kierunkowskazy LED",
      "Miejsce na podświetlenie tablicy",
      "Lekka i sztywna konstrukcja"
    ],
    stock: 10,
  },
  {
    id: 4,
    name: "Lampka Uniwersalna LED (Oświetlenie Tablicy/Dodatkowe)",
    category: "moto",
    price: 39.00,
    images: ["/assets/swiatlouniwersalne1.png", "/assets/swiatlouniwersalne2.png"],
    description: "Mała, ale potężna lampka LED o wszechstronnym zastosowaniu. Idealna jako podświetlenie tablicy rejestracyjnej w naszym mocowaniu lub jako dyskretne oświetlenie dodatkowe.",
    features: [
      "Kompaktowe wymiary",
      "Barwa światła: Zimna biała",
      "Wodoodporna obudowa",
      "Pasuje idealnie do Mocowania Tablicy 3D"
    ],
    stock: 50,
  },

  // --- KATEGORIA: BRELOKI / GADŻETY (Klucz) ---

  {
    id: 5,
    name: "Brelok 3D / Osłona Kluczyka - Custom Design",
    category: "keychains",
    price: 49.00,
    images: ["/assets/klucz1.png", "/assets/klucz2.png", "/assets/klucz3.png"],
    description: "Unikalna nakładka na kluczyk lub brelok wykonany w technologii druku 3D. Personalizowany design, który wyróżni Twoje klucze. Kompatybilny z naszym systemem mocowań.",
    features: [
      "Wytrzymały materiał",
      "Unikalny wzór (dostępne różne kolory na zamówienie)",
      "Lekki i poręczny",
      "Oczko na kółko do kluczy w zestawie"
    ],
    stock: 30,
    featured: true,
  },

  // --- KATEGORIA: ZATYCZKI (Warianty Kolorystyczne) ---
  
  {
    id: 101,
    name: "Zatyczki Motocyklowe VibeRush - Czarne (Black)",
    category: "accessories",
    price: 59.00,
    images: ["/assets/sczarne.png", "/assets/srozmiary.png"],
    description: "Profesjonalne zatyczki do uszu redukujące szum wiatru, ale pozwalające słyszeć silnik i komunikaty drogowe. Niezbędne w długich trasach. Wersja w klasycznej czerni.",
    features: ["Filtr akustyczny", "Hipoalergiczny silikon", "Zestaw 2 rozmiarów w pudełku", "Aluminiowe etui w zestawie"],
    stock: 100,
    color: "Czarny",
    variants: [
       { id: 101, color: "Czarny", hex: "#000000" },
       { id: 102, color: "Złoty", hex: "#D4AF37" },
       { id: 103, color: "Fioletowy", hex: "#800080" },
       { id: 104, color: "Srebrny", hex: "#C0C0C0" },
       { id: 105, color: "Różowy", hex: "#FFC0CB" },
    ]
  },
  {
    id: 102,
    name: "Zatyczki Motocyklowe VibeRush - Złote (Gold)",
    category: "accessories",
    price: 59.00,
    images: ["/assets/szlote.png", "/assets/srozmiary.png"],
    description: "Profesjonalne zatyczki do uszu redukujące szum wiatru. Wersja w eleganckim kolorze złotym.",
    features: ["Filtr akustyczny", "Hipoalergiczny silikon", "Zestaw 2 rozmiarów w pudełku", "Aluminiowe etui w zestawie"],
    stock: 100,
    color: "Złoty",
    variants: [
       { id: 101, color: "Czarny", hex: "#000000" },
       { id: 102, color: "Złoty", hex: "#D4AF37" },
       { id: 103, color: "Fioletowy", hex: "#800080" },
       { id: 104, color: "Srebrny", hex: "#C0C0C0" },
       { id: 105, color: "Różowy", hex: "#FFC0CB" },
    ]
  },
  {
    id: 103,
    name: "Zatyczki Motocyklowe VibeRush - Fioletowe (Purple)",
    category: "accessories",
    price: 59.00,
    images: ["/assets/sfioletowe.png", "/assets/srozmiary.png"],
    description: "Profesjonalne zatyczki do uszu redukujące szum wiatru. Wersja w unikalnym fiolecie.",
    features: ["Filtr akustyczny", "Hipoalergiczny silikon", "Zestaw 2 rozmiarów w pudełku", "Aluminiowe etui w zestawie"],
    stock: 100,
    color: "Fioletowy",
    variants: [
       { id: 101, color: "Czarny", hex: "#000000" },
       { id: 102, color: "Złoty", hex: "#D4AF37" },
       { id: 103, color: "Fioletowy", hex: "#800080" },
       { id: 104, color: "Srebrny", hex: "#C0C0C0" },
       { id: 105, color: "Różowy", hex: "#FFC0CB" },
    ]
  },
  {
    id: 104,
    name: "Zatyczki Motocyklowe VibeRush - Srebrne (Silver)",
    category: "accessories",
    price: 59.00,
    images: ["/assets/srebrne.png", "/assets/srozmiary.png"],
    description: "Profesjonalne zatyczki do uszu redukujące szum wiatru. Wersja w kolorze srebrnym.",
    features: ["Filtr akustyczny", "Hipoalergiczny silikon", "Zestaw 2 rozmiarów w pudełku", "Aluminiowe etui w zestawie"],
    stock: 100,
    color: "Srebrny",
    variants: [
       { id: 101, color: "Czarny", hex: "#000000" },
       { id: 102, color: "Złoty", hex: "#D4AF37" },
       { id: 103, color: "Fioletowy", hex: "#800080" },
       { id: 104, color: "Srebrny", hex: "#C0C0C0" },
       { id: 105, color: "Różowy", hex: "#FFC0CB" },
    ]
  },
  {
    id: 105,
    name: "Zatyczki Motocyklowe VibeRush - Różowe (Pink)",
    category: "accessories",
    price: 59.00,
    images: ["/assets/srozowe.png", "/assets/srozmiary.png"],
    description: "Profesjonalne zatyczki do uszu redukujące szum wiatru. Wersja dla miłośniczek jednośladów w kolorze różowym.",
    features: ["Filtr akustyczny", "Hipoalergiczny silikon", "Zestaw 2 rozmiarów w pudełku", "Aluminiowe etui w zestawie"],
    stock: 100,
    color: "Różowy",
    variants: [
       { id: 101, color: "Czarny", hex: "#000000" },
       { id: 102, color: "Złoty", hex: "#D4AF37" },
       { id: 103, color: "Fioletowy", hex: "#800080" },
       { id: 104, color: "Srebrny", hex: "#C0C0C0" },
       { id: 105, color: "Różowy", hex: "#FFC0CB" },
    ]
  },
];
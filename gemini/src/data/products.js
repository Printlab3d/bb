export const products = [
  // --- KATEGORIA: MOTO ---
  {
    id: 1,
    name: "Kierunkowskazy LED Dynamiczne (Pływające)",
    category: "moto",
    price: 89.00,
    oldPrice: 119.00,
    // ZMIANA: W folderze masz migacz1.jpg
    image: "/assets/migacz1.jpg",
    images: ["/assets/migacz1.jpg", "/assets/migacz2.jpg"],
    description: "Nowoczesne kierunkowskazy LED z efektem dynamicznym (pływającym).",
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
    // ZMIANA: W folderze masz plaskie1.jpg
    image: "/assets/plaskie1.jpg",
    images: ["/assets/plaskie1.jpg", "/assets/plaskie2.jpg"],
    description: "Minimalistyczna, płaska lampa tylna LED z funkcją światła pozycyjnego i STOP.",
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
    // TO BYŁO DOBRZE: mocowanie1.jpg
    image: "/assets/mocowanie1.jpg",
    images: ["/assets/mocowanie1.jpg", "/assets/mocowanie2.jpg", "/assets/mocowanie3.jpg"],
    description: "Wytrzymały uchwyt tablicy rejestracyjnej drukowany w 3D (PETG/ASA).",
    features: [
      "Materiał klasy przemysłowej",
      "Regulowany kąt nachylenia",
      "Gotowe otwory pod kierunkowskazy",
      "Miejsce na podświetlenie tablicy",
      "Lekka i sztywna konstrukcja"
    ],
    stock: 10,
  },
  {
    id: 4,
    name: "Lampka Uniwersalna LED (Oświetlenie Tablicy)",
    category: "moto",
    price: 39.00,
    // ZMIANA: W folderze masz stop1.jpg (chyba to ta lampka)
    image: "/assets/stop1.jpg",
    images: ["/assets/stop1.jpg", "/assets/stop2.jpg"],
    description: "Mała, ale potężna lampka LED o wszechstronnym zastosowaniu.",
    features: [
      "Kompaktowe wymiary",
      "Barwa światła: Zimna biała",
      "Wodoodporna obudowa",
      "Pasuje idealnie do Mocowania Tablicy 3D"
    ],
    stock: 50,
  },

  // --- KATEGORIA: BRELOKI ---
  {
    id: 5,
    name: "Brelok 3D / Osłona Kluczyka - Custom Design",
    category: "keychains",
    price: 49.00,
    // TO BYŁO DOBRZE: klucz1.jpg
    image: "/assets/klucz1.jpg",
    images: ["/assets/klucz1.jpg", "/assets/klucz2.jpg", "/assets/klucz3.jpg"],
    description: "Unikalna nakładka na kluczyk lub brelok wykonany w technologii druku 3D.",
    features: [
      "Wytrzymały materiał",
      "Unikalny wzór",
      "Lekki i poręczny",
      "Oczko na kółko do kluczy w zestawie"
    ],
    stock: 30,
    featured: true,
  },

  // --- KATEGORIA: ZATYCZKI ---
  {
    id: 101,
    name: "Zatyczki Motocyklowe VibeRush - Czarne (Black)",
    category: "accessories",
    price: 59.00,
    // TO BYŁO DOBRZE: sczarne.jpg
    image: "/assets/sczarne.jpg",
    images: ["/assets/sczarne.jpg", "/assets/srozmiary.jpg"],
    description: "Profesjonalne zatyczki do uszu. Wersja w klasycznej czerni.",
    features: ["Filtr akustyczny", "Hipoalergiczny silikon", "Zestaw 2 rozmiarów", "Aluminiowe etui"],
    stock: 100,
    color: "Czarny",
  },
  {
    id: 102,
    name: "Zatyczki Motocyklowe VibeRush - Złote (Gold)",
    category: "accessories",
    price: 59.00,
    image: "/assets/szlote.jpg",
    images: ["/assets/szlote.jpg", "/assets/srozmiary.jpg"],
    description: "Profesjonalne zatyczki do uszu. Wersja złota.",
    features: ["Filtr akustyczny", "Hipoalergiczny silikon", "Zestaw 2 rozmiarów", "Aluminiowe etui"],
    stock: 100,
    color: "Złoty",
  },
  {
    id: 103,
    name: "Zatyczki Motocyklowe VibeRush - Fioletowe (Purple)",
    category: "accessories",
    price: 59.00,
    image: "/assets/sfioletowe.jpg",
    images: ["/assets/sfioletowe.jpg", "/assets/srozmiary.jpg"],
    description: "Profesjonalne zatyczki do uszu. Wersja fioletowa.",
    features: ["Filtr akustyczny", "Hipoalergiczny silikon", "Zestaw 2 rozmiarów", "Aluminiowe etui"],
    stock: 100,
    color: "Fioletowy",
  },
  {
    id: 104,
    name: "Zatyczki Motocyklowe VibeRush - Srebrne (Silver)",
    category: "accessories",
    price: 59.00,
    image: "/assets/srebrne.jpg",
    images: ["/assets/srebrne.jpg", "/assets/srozmiary.jpg"],
    description: "Profesjonalne zatyczki do uszu. Wersja srebrna.",
    features: ["Filtr akustyczny", "Hipoalergiczny silikon", "Zestaw 2 rozmiarów", "Aluminiowe etui"],
    stock: 100,
    color: "Srebrny",
  },
  {
    id: 105,
    name: "Zatyczki Motocyklowe VibeRush - Różowe (Pink)",
    category: "accessories",
    price: 59.00,
    image: "/assets/srozowe.jpg",
    images: ["/assets/srozowe.jpg", "/assets/srozmiary.jpg"],
    description: "Profesjonalne zatyczki do uszu. Wersja różowa.",
    features: ["Filtr akustyczny", "Hipoalergiczny silikon", "Zestaw 2 rozmiarów", "Aluminiowe etui"],
    stock: 100,
    color: "Różowy",
  },
];
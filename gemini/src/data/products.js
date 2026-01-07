export const products = [
  // --- KATEGORIA: MOTO ---
  {
    id: 1,
    name: "Kierunkowskazy LED",
    category: "moto",
    price: 45.00,
    oldPrice: 59.00,
    // ZMIANA NA PNG
    image: "/assets/migacz1.png",
    images: ["/assets/migacz1.png", "/assets/migacz2.png"],
    description: "Minimalistyczne kierunkowskazy LED przyciemniane ",
    features: [
      "Technologia LED - wysoka jasność",
      "Homologowane certyfikowane światło",
      "Elastyczne ramię odporne na złamania",
      "Wodoodporność IP67",
      "Kompatybilne z naszymi mocowaniami 3D",
      "Ogłoszenie dotyczy jednego kierunkowskazu"
    ],
    stock: 20,
    featured: true,
  },
  {
    id: 2,
    name: "Lampa LED STOP Płaska Przyciemniana",
    category: "moto",
    price: 69.00,
    // ZMIANA NA PNG
    image: "/assets/plaskie1.png",
    images: ["/assets/plaskie1.png", "/assets/plaskie2.png"],
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
    price: 159.00,
    oldPrice: 290.00,
    // WYJĄTEK: ZOSTAJE JPG
    image: "/assets/mocowanie1.png",
    images: ["/assets/mocowanie1.png", "/assets/mocowanie2.png", "/assets/mocowanie3.png", "/assets/mocowanie4.png", "/assets/mocowanie5.png", "/assets/mocowanie6.png", "/assets/mocowanie7.png"],
    description: "Wytrzymały kompletny uchwyt tablicy rejestracyjnej drukowany w 3D (PETG/ASA).",
    features: [
      "Materiał klasy premium",
      "Zgodny z przepisami kąt nachylenia tablicy",
      "Gotowe otwory pod kierunkowskazy",
      "Miejsce na światło stop",
      "Lekka i sztywna konstrukcja potwierdzona crash testami",
      "Uchwyt mocujący tablice w zestawie",
    ],
    stock: 10,
    featured: true,
  },
  {
    id: 4,
    name: "Lampa STOP Uniwersalna LED",
    category: "moto",
    price: 49.00,
    oldPrice: 69.00,
    // ZMIANA NA PNG
    image: "/assets/stop1.png",
    images: ["/assets/stop1.png", "/assets/stop2.png"],
    description: "Uniwersalna lampa LED - światło stop",
    features: [
      "Kompaktowe wymiary",
      "Barwa światła: Homologowana czerwona",
      "Wodoodporna obudowa",
      "Pasuje idealnie do Mocowania Tablicy 3D"
    ],
    stock: 50,
    featured: true,
  },

  // --- KATEGORIA: BRELOKI ---
  {
    id: 5,
    name: "Uchwyt tablicy - część mocowania 3D",
    category: "moto",
    price: 39.00,
    oldPrice: 49.00,
    // WYJĄTEK: ZOSTAJE JPG
    image: "/assets/klucz1.png",
    images: ["/assets/klucz1.png", "/assets/klucz2.png", "/assets/klucz3.png", "/assets/klucz4.png"],
    description: "Uchwyt do zamocowania tablicy rejestracyjnej - Klucz mocowania tablicy 3D",
    features: [
      "Wytrzymały materiał 3D",
      "Wzór dopasowany do mocowania oraz powierzchni tablicy rejestracyjnej",
      "Lekki i poręczny",
      "Posiada mechanizm wysuwający tablice z mocowania 3D"
    ],
    stock: 30,
  },
    {
    id: 6,
    name: "Zestaw Homologacyjny do motocykla",
    category: "moto",
    price: 290.00,
    oldPrice: 388.00,
    // WYJĄTEK: ZOSTAJE JPG
    image: "/assets/custom1.jpg",
    images: ["/assets/mocowanie1.png", "/assets/stop1.png", "/assets/migacz2.png"],
    description: "Zestaw promocyjny, który posiada:",
    features: [
      "4 przyciemniane minimalistyczne kierunkowskazy ",
      "Kompletne mocowanie tablicy z uchwytem",
      "Uniwersalne światło stopu",
    ],
    stock: 10,
    featured: true,
  },

  // --- KATEGORIA: ZATYCZKI (WSZYSTKIE NA PNG) ---
  {
    id: 101,
    name: "Zatyczki Motocyklowe VibeRush - Czarne (Black)",
    category: "accessories",
    price: 49.00,
    // ZMIANA NA PNG
    image: "/assets/sczarne.png",
    images: ["/assets/sczarne.png", "/assets/srozmiary.png"],
    description: "Profesjonalne zatyczki do uszu. Wersja w klasycznej czerni.",
    features: ["Filtr akustyczny", "Hipoalergiczny silikon", "Zestaw rozmiarów",],
    stock: 100,
    color: "Czarny",
  },
  {
    id: 102,
    name: "Zatyczki Motocyklowe VibeRush - Złote (Gold)",
    category: "accessories",
    price: 49.00,
    // ZMIANA NA PNG
    image: "/assets/szlote.png",
    images: ["/assets/szlote.png", "/assets/srozmiary.png"],
    description: "Profesjonalne zatyczki do uszu. Wersja złota.",
    features: ["Filtr akustyczny", "Hipoalergiczny silikon", "Zestaw rozmiarów"],
    stock: 100,
    color: "Złoty",
  },
  {
    id: 103,
    name: "Zatyczki Motocyklowe VibeRush - Fioletowe (Purple)",
    category: "accessories",
    price: 49.00,
    // ZMIANA NA PNG
    image: "/assets/sfioletowe.png",
    images: ["/assets/sfioletowe.png", "/assets/srozmiary.png"],
    description: "Profesjonalne zatyczki do uszu. Wersja fioletowa.",
    features: ["Filtr akustyczny", "Hipoalergiczny silikon", "Zestaw rozmiarów"],
    stock: 100,
    color: "Fioletowy",
  },
  {
    id: 104,
    name: "Zatyczki Motocyklowe VibeRush - Srebrne (Silver)",
    category: "accessories",
    price: 49.00,
    // ZMIANA NA PNG
    image: "/assets/srebrne.png",
    images: ["/assets/srebrne.png", "/assets/srozmiary.png"],
    description: "Profesjonalne zatyczki do uszu. Wersja srebrna.",
    features: ["Filtr akustyczny", "Hipoalergiczny silikon", "Zestaw rozmiarów"],
    stock: 100,
    color: "Srebrny",
  },
  {
    id: 105,
    name: "Zatyczki Motocyklowe VibeRush - Różowe (Pink)",
    category: "accessories",
    price: 49.00,
    // ZMIANA NA PNG
    image: "/assets/srozowe.png",
    images: ["/assets/srozowe.png", "/assets/srozmiary.png"],
    description: "Profesjonalne zatyczki do uszu. Wersja różowa.",
    features: ["Filtr akustyczny", "Hipoalergiczny silikon", "Zestaw rozmiarów"],
    stock: 100,
    color: "Różowy",
  },
   {
    id: 201,
    name: "Brelok skrab.exc",
    category: "accessories",
    price: 12.00,
    // ZMIANA NA PNG
    image: "/assets/skrab1.png",
    images: ["/assets/skrab1.png"],
    description: "Zawieszka do kluczy skrab.exc",
    features: ["Idealny brelok do kluczy", "wysoka jakość wykonania"],
    stock: 100,
    color: "Różowy",
  },
];
// ============================================================
//  ALL YOUR PORTFOLIO CONTENT LIVES HERE.
//  Edit this file and the site updates automatically.
// ============================================================

export const profile = {
  name: "Zahid Hasan",
  initials: "ZH",
  title: "Flutter Developer",
  // Words shown one by one in the hero ("I build ...")
  roles: ["Flutter apps.", "pixel-perfect UIs.", "real-time features.", "cross-platform magic."],
  intro:
    "Mobile Application Developer with 3+ years of experience crafting cross-platform apps with Flutter — live on Google Play, the App Store and the Microsoft Store.",
  photo: "profile.jpg", // file in the "public" folder
  resume: "Zahid_Hasan_Resume.pdf", // file in the "public" folder
  email: "mahdi.zhm13@gmail.com",
  phone: "+880 1783 864132",
  location: "Dhaka, Bangladesh",
  socials: [
    { label: "GitHub", url: "https://github.com/zahid2873" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/zahid-hasan-7b253b22b/" },
  ],
};

// Notifications that slide into the phone in the hero section
export const notifications = [
  { app: "App Store Connect", text: "LawEntra is Ready for Sale 🎉", hue: 210 },
  { app: "flutter test", text: "All tests passed ✓", hue: 160 },
  { app: "Google Play Console", text: "MCQEntra update is live on Google Play", hue: 130 },
  { app: "Crashlytics", text: "99%+ crash-free sessions this week", hue: 30 },
  { app: "bKash", text: "Payment integration successful", hue: 330 },
];

export const about = {
  paragraphs: [
    "I'm a Flutter developer at Codixel who loves turning Figma and Adobe XD designs into pixel-perfect, smooth mobile apps. I specialise in responsive UI, state management and integrating REST APIs and WebSockets for real-time experiences.",
    "I joined Codixel as an intern and became a full-time developer within 3 months. Since then I've shipped apps with chatbots, audio streaming, online exams, in-app purchases and bKash / SSLCommerz payments — all with 99%+ crash-free sessions.",
  ],
  // decimals and suffix are optional
  stats: [
    { value: 3, suffix: "+", label: "Years of experience", icon: "⏱" },
    { value: 5, suffix: "+", label: "Apps live in stores", icon: "📱" },
    { value: 99, suffix: "%+", label: "Crash-free sessions", icon: "🛡" },
    { value: 3, suffix: " mo", label: "Intern → full-time", icon: "🚀" },
  ],
  terminal: [
    { cmd: "flutter test", out: "✓ All tests passed!" },
    { cmd: "flutter build appbundle --release", out: "✓ Built app-release.aab" },
    { cmd: "flutter build ipa --release", out: "✓ Built Runner.ipa" },
    { cmd: "deploy --play-store --app-store", out: "🚀 Released to Google Play & App Store" },
  ],
};

// Tech logos come from the Devicon CDN: https://devicon.dev
const logo = (name, variant = "original") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/${name}/${name}-${variant}.svg`;

export const skills = {
  core: {
    title: "Flutter & Dart",
    summary: "My core stack for 3+ years — production apps built from Figma and Adobe XD designs and shipped to the stores.",
    logos: [
      { name: "Flutter", logo: logo("flutter") },
      { name: "Dart", logo: logo("dart") },
    ],
    chips: ["Pixel-perfect UI", "Responsive layouts", "Animations", "Clean Architecture", "Localization", "Python"],
    code: `class EarningsCallApp extends StatelessWidget {
  const EarningsCallApp({super.key});

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      title: 'EarningsCall',
      theme: AppTheme.light,
      home: const HomeScreen(),
    );
  }
}`,
  },

  platforms: [
    { name: "Android", store: "Google Play", logo: logo("android") },
    { name: "iOS", store: "App Store", logo: logo("apple") },
    { name: "Windows", store: "Microsoft Store", logo: logo("windows11") },
  ],

  stateManagement: {
    note: "I pick the right tool per project — GetX for EarningsCall, Provider for LawEntra & MCQEntra.",
    options: [
      {
        name: "GetX",
        code: `class CartController extends GetxController {
  final items = <Item>[].obs;
  void add(Item item) => items.add(item);
}

Obx(() => Text('\${cart.items.length} items'));`,
      },
      {
        name: "Provider",
        code: `class Cart extends ChangeNotifier {
  final items = <Item>[];
  void add(Item item) {
    items.add(item);
    notifyListeners();
  }
}

final count = context.watch<Cart>().items.length;`,
      },
      {
        name: "Riverpod",
        code: `class Cart extends Notifier<List<Item>> {
  @override
  List<Item> build() => [];
  void add(Item item) => state = [...state, item];
}

final cartProvider = NotifierProvider<Cart, List<Item>>(Cart.new);
final items = ref.watch(cartProvider);`,
      },
      {
        name: "BLoC",
        code: `class CartBloc extends Bloc<CartEvent, CartState> {
  CartBloc() : super(const CartState()) {
    on<ItemAdded>((event, emit) {
      emit(state.copyWith(items: [...state.items, event.item]));
    });
  }
}`,
      },
    ],
  },

  data: {
    cloud: [
      { name: "Firebase", logo: logo("firebase") },
      { name: "Google Cloud", logo: logo("googlecloud") },
    ],
    logos: [
      { name: "MySQL", logo: logo("mysql") },
      { name: "Sqflite", logo: logo("sqlite") },
    ],
    chips: ["Firestore", "Hive", "Shared Preferences", "Remote Config", "Push Notifications"],
  },

  features: [
    { icon: "💳", name: "bKash" },
    { icon: "🏦", name: "SSLCommerz" },
    { icon: "🛒", name: "In-app purchases" },
    { icon: "🔔", name: "Push notifications" },
    { icon: "🎧", name: "Audio streaming" },
    { icon: "🤖", name: "AI chatbot" },
    { icon: "📷", name: "QR scanner" },
    { icon: "🧪", name: "A/B testing" },
  ],

  testing: ["Unit tests", "Widget tests", "Integration tests", "CI/CD pipeline"],

  tools: {
    logos: [
      { name: "Git", logo: logo("git") },
      { name: "GitHub", logo: logo("github") },
      { name: "Figma", logo: logo("figma") },
      { name: "Adobe XD", logo: logo("xd") },
      { name: "Android Studio", logo: logo("androidstudio") },
      { name: "VS Code", logo: logo("vscode") },
      { name: "Postman", logo: logo("postman") },
      { name: "Trello", logo: logo("trello") },
    ],
    chips: ["Cursor AI", "Claude", "ChatGPT", "Discord"],
  },
};

// Logos in the infinite scrolling strip at the top of the Skills section
export const techStrip = [
  ...skills.core.logos,
  ...skills.data.cloud,
  ...skills.data.logos,
  ...skills.platforms.map(({ name, logo }) => ({ name, logo })),
  ...skills.tools.logos,
  { name: "Python", logo: logo("python") },
];

// screen: which animated phone screen to show — "audio", "exam", "analytics" or "scanner"
export const projects = [
  {
    title: "EarningsCall",
    tagline: "Company earnings call player",
    description:
      "Search publicly traded companies and listen to their latest quarterly earnings calls — used by investors and brokers for stock research.",
    highlights: [
      "Audio player with live transcript",
      "AI chatbot over WebSockets",
      "In-app purchases for monetization",
      "Firebase Remote Config, A/B testing & Google Cloud Logging",
      "Owned the Play Store release process",
    ],
    tags: ["Flutter", "GetX", "Firebase", "REST API", "WebSockets", "GCP"],
    screen: "audio",
    links: [
      { store: "Google Play", url: "https://play.google.com/store/apps/details?id=biz.earningscall.app" },
      { store: "App Store", url: "https://apps.apple.com/us/app/earnings-call/id1626859464" },
    ],
  },
  {
    title: "LawEntra",
    tagline: "Legal exam preparation platform",
    description:
      "Feature-rich exam prep app for law students and professionals with MCQ exams, course packages, secure payments and detailed performance analytics.",
    highlights: [
      "Authentication, schedules, assignments & exam practice",
      "Firebase real-time sync and push notifications",
      "Course packages unlocked with bKash payments",
    ],
    tags: ["Flutter", "Provider", "Firebase", "bKash", "REST API"],
    screen: "exam",
    links: [
      { store: "Google Play", url: "https://play.google.com/store/apps/details?id=com.lawentra.app" },
      { store: "App Store", url: "https://apps.apple.com/pk/app/lawentra/id6809141558" },
      { store: "Microsoft Store", url: "https://apps.microsoft.com/detail/9nsmglzkx09j" },
    ],
  },
  {
    title: "MCQEntra",
    tagline: "Government job exam preparation",
    description:
      "Bengali-first app for BCS, Bank, NTRCA, Primary Teacher and Railway exam prep — timed mock exams, free practice, paid packages and leaderboards.",
    highlights: [
      "Complete exam engine: timed MCQs, model & live tests, question bank",
      "bKash gateway: token, agreement, direct-pay & coupons",
      "Analytics with subject-wise accuracy, rankings & leaderboards",
    ],
    tags: ["Flutter", "Provider", "Clean Architecture", "bKash", "Firebase", "Bengali i18n"],
    screen: "analytics",
    links: [
      { store: "Google Play", url: "https://play.google.com/store/apps/details?id=com.mcq_entra.app" },
      { store: "App Store", url: "https://apps.apple.com/us/app/mcq-entra/id6821805259" },
    ],
  },
  {
    title: "GoEventy Scanner",
    tagline: "QR ticket scanner for event organizers",
    description:
      "Fast, secure event check-in: staff scan QR codes on tickets and instantly verify attendee access — no manual errors, no long entry lines.",
    highlights: [
      "Fast and accurate QR code scanning",
      "Instant ticket validation",
      "Secure login for event staff",
      "Real-time scan tracking and validation",
    ],
    tags: ["Flutter", "Dart", "QR Scanner", "Secure Auth"],
    screen: "scanner",
    links: [{ store: "Google Play", url: "https://play.google.com/store/apps/details?id=com.goeventy_scanner_app" }],
  },
];

export const experience = [
  {
    date: "Aug 2023 — Present",
    title: "Mobile Application Developer (Flutter)",
    place: "Codixel · Mohammadpur, Dhaka",
    description:
      "Design and build responsive Flutter apps from Figma / Adobe XD, integrate REST APIs and WebSockets, and test with unit, widget and integration tests.",
    bullets: [
      "Deployed multiple apps on Google Play and the App Store",
      "Built chatbot, audio streaming, online exams, in-app purchases, bKash & SSLCommerz",
      "Maintained 99%+ crash-free user sessions",
      "Promoted from intern to full-time within 3 months",
    ],
  },
  {
    date: "Jan 2023 — Apr 2023",
    title: "Mobile Application Development Training",
    place: "BASIS SEIP (BITM)",
    description: "Intensive training in mobile application development.",
  },
  {
    date: "Graduated Jul 2023",
    title: "BSc in Software Engineering (Major in Data Science)",
    place: "Daffodil International University",
    description: "CGPA 3.87",
  },
];

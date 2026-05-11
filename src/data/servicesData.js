export const servicesData = [
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    tagline: "Build scalable, high-performance native & cross-platform mobile apps.",
    description: "We turn your app ideas into immersive mobile experiences. Our expert mobile engineers craft pixel-perfect, performant, and user-centric iOS and Android applications that stand out in crowded app stores. Whether you need a consumer app or an enterprise mobility solution, we deliver results.",
    bannerImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1400&q=80",
    tags: ["iOS", "Android", "Flutter", "React Native"],
    color: "bg-blue-50 text-blue-600",
    features: [
      { title: "Native iOS Development", desc: "Swift & Objective-C apps optimized for Apple ecosystem.", img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80" },
      { title: "Native Android Development", desc: "Kotlin & Java apps with Jetpack Compose for modern Android.", img: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=600&q=80" },
      { title: "React Native / Flutter", desc: "Single codebase, native feel — deploy to both platforms at once.", img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80" },
    ],
    process: ["Discovery & Wireframing","UI/UX Design","Development Sprints","QA & Testing","App Store Launch","Post-Launch Support"],
    stats: [{ val:"4500+", label:"Apps Delivered"},{ val:"4.9★", label:"Avg App Rating"},{ val:"100M+", label:"End Users"},{ val:"48h", label:"Team Deployment"}],
    techStack: ["Swift","Kotlin","React Native","Flutter","Firebase","GraphQL","AWS Amplify"]
  },
  {
    slug: "web-cms-development",
    title: "Web & CMS Development",
    tagline: "High-performance, SEO-optimised websites and enterprise web applications.",
    description: "We build blazing-fast, visually stunning websites and complex web applications that drive real business results. From marketing sites to full-scale enterprise portals, our engineers combine the latest frameworks with proven UX principles to deliver experiences your users will love.",
    bannerImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&q=80",
    tags: ["React","Next.js","Laravel","WordPress"],
    color: "bg-purple-50 text-purple-600",
    features: [
      { title: "React & Next.js Apps", desc: "Lightning-fast SPAs and SSR apps with modern React ecosystems.", img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80" },
      { title: "CMS Development", desc: "WordPress, Drupal and headless CMS solutions for easy content management.", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80" },
      { title: "PHP & Laravel Backends", desc: "Secure, scalable server-side architecture powering complex portals.", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80" },
    ],
    process: ["Requirements Analysis","Architecture Planning","UI/UX Design","Frontend Development","Backend & API","Deployment & SEO"],
    stats: [{ val:"1200+", label:"Websites Built"},{ val:"99%", label:"Uptime SLA"},{ val:"3x", label:"Faster Page Load"},{ val:"50M+", label:"Monthly Visitors"}],
    techStack: ["React","Next.js","Node.js","Laravel","PHP","PostgreSQL","Redis","Docker"]
  },
  {
    slug: "ecommerce-development",
    title: "eCommerce Development",
    tagline: "Scalable, conversion-optimised online stores that handle millions of transactions.",
    description: "We engineer high-performance eCommerce platforms that drive revenue and scale without limits. From custom Shopify storefronts to fully bespoke Magento architectures, we build digital commerce experiences that convert browsers into loyal buyers.",
    bannerImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&q=80",
    tags: ["Shopify","Magento","WooCommerce","Headless"],
    color: "bg-orange-50 text-orange-600",
    features: [
      { title: "Shopify & Shopify Plus", desc: "Custom themes, apps and headless storefronts for high-volume brands.", img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&q=80" },
      { title: "Magento Enterprise", desc: "Enterprise-grade B2B & B2C platforms with complex product catalogues.", img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80" },
      { title: "Payment & Logistics Integration", desc: "Stripe, PayPal, Razorpay and third-party logistics API integrations.", img: "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=600&q=80" },
    ],
    process: ["Platform Selection","Store Architecture","Design & UX","Development","Payment Integration","Launch & Optimize"],
    stats: [{ val:"45%", label:"Avg Conversion Lift"},{ val:"500+", label:"Stores Launched"},{ val:"$2B+", label:"GMV Processed"},{ val:"99.9%", label:"Store Uptime"}],
    techStack: ["Shopify Plus","Magento 2","Next.js Commerce","Stripe","Klaviyo","Algolia","Vercel"]
  },
  {
    slug: "ai-ml-development",
    title: "AI & ML Development",
    tagline: "Custom LLMs, generative AI tools and machine learning pipelines for enterprises.",
    description: "We harness the power of Artificial Intelligence to transform how your business operates. From custom-trained large language models to intelligent automation pipelines and generative AI products, our AI team delivers solutions that give you a measurable competitive advantage.",
    bannerImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1400&q=80",
    tags: ["GPT-4","LangChain","TensorFlow","Python"],
    color: "bg-cyan-50 text-cyan-600",
    features: [
      { title: "Generative AI & LLMs", desc: "Fine-tuned GPT-4, LLaMA and Mistral models tailored to your domain.", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80" },
      { title: "AI Agents & Automation", desc: "Autonomous agents that plan, decide and execute complex workflows.", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80" },
      { title: "ML Pipelines & MLOps", desc: "End-to-end data pipelines, model training, deployment and monitoring.", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80" },
    ],
    process: ["AI Strategy & Feasibility","Data Engineering","Model Development","Fine-Tuning","Integration & API","Monitor & Retrain"],
    stats: [{ val:"99%", label:"Model Accuracy"},{ val:"10x", label:"ROI Average"},{ val:"24/7", label:"Autonomous Ops"},{ val:"SOC2", label:"Compliant"}],
    techStack: ["Python","PyTorch","TensorFlow","LangChain","Pinecone","OpenAI","AWS SageMaker","Docker"]
  },
  {
    slug: "blockchain-development",
    title: "Blockchain Development",
    tagline: "Smart contracts, DeFi platforms and Web3 apps built for scale and security.",
    description: "We help enterprises and startups enter the decentralized future with confidence. Our blockchain engineers build secure smart contracts, custom DApps, NFT marketplaces, and private blockchain networks that guarantee transparency, immutability and trust.",
    bannerImage: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=1400&q=80",
    tags: ["Solidity","Web3.js","Ethereum","Hyperledger"],
    color: "bg-green-50 text-green-600",
    features: [
      { title: "Smart Contract Development", desc: "Audited, gas-optimised Solidity contracts on Ethereum & EVM chains.", img: "https://images.unsplash.com/photo-1516245834210-c4c142787335?w=600&q=80" },
      { title: "DeFi & NFT Platforms", desc: "Decentralized exchanges, lending protocols and NFT marketplace builds.", img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80" },
      { title: "Enterprise Blockchain", desc: "Hyperledger Fabric networks for supply chain, healthcare and finance.", img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=80" },
    ],
    process: ["Blockchain Consulting","Architecture Design","Smart Contract Dev","Security Audit","DApp Frontend","Deployment & Monitor"],
    stats: [{ val:"200+", label:"Contracts Audited"},{ val:"$500M+", label:"TVL Secured"},{ val:"0", label:"Security Breaches"},{ val:"15+", label:"Chains Supported"}],
    techStack: ["Solidity","Rust","Hardhat","Web3.js","Ethers.js","IPFS","The Graph","Chainlink"]
  },
  {
    slug: "game-development",
    title: "Game Development",
    tagline: "Immersive 2D/3D games, AR/VR experiences and metaverse applications.",
    description: "We design and develop captivating gaming experiences that push the boundaries of what's possible. From hyper-casual mobile games to AAA-quality 3D worlds and immersive metaverse environments, our game studio combines creative artistry with technical excellence.",
    bannerImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1400&q=80",
    tags: ["Unity 3D","Unreal Engine","AR/VR","Metaverse"],
    color: "bg-red-50 text-red-600",
    features: [
      { title: "Unity 3D Game Development", desc: "Cross-platform 2D/3D games with stunning visuals and smooth 60fps gameplay.", img: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600&q=80" },
      { title: "Unreal Engine 5", desc: "Photorealistic AAA-quality games and cinematic simulations with Nanite & Lumen.", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80" },
      { title: "AR / VR / Metaverse", desc: "Immersive augmented and virtual reality experiences for gaming and enterprise.", img: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=600&q=80" },
    ],
    process: ["Concept & Game Design","Art & Asset Creation","Core Development","Level Design","QA & Optimization","Store & Platform Launch"],
    stats: [{ val:"300+", label:"Games Shipped"},{ val:"50M+", label:"Downloads"},{ val:"4.8★", label:"Avg Store Rating"},{ val:"10+", label:"Platforms"}],
    techStack: ["Unity","Unreal Engine 5","C#","C++","ARKit","ARCore","Photon","PlayFab"]
  },
];

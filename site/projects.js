const projects = [
  {
    id: 'tennis', name: 'Tennis Computer Vision Analytics',
    description: 'Turn broadcast tennis rallies into top-down shot charts.',
    rarity: 'Legendary', date: 'Jul 2026 – present',
    tags: ['RF-DETR', 'XGBoost', 'FastAPI', 'Python', 'React', 'Vite', 'OpenCV homography', 'Modal', 'Docker', 'GitHub Actions'],
    details: [
      'Upload broadcast tennis footage to plot bounces and hits on a top-down court shot chart.',
      'Trained an RF-DETR detector on 10,000+ annotated images. It reached 84.4% mAP@50 and 93.6% precision.',
      'An XGBoost classifier uses 88 features across 11 frames. Held-out event-level F1 was 0.835 for bounces and 0.793 for hits.',
      'Moving processing from Render to Modal took a 30-second rally from about 6 minutes to 32 seconds, roughly 11× faster.'
    ],
    links: [['Live demo', 'https://tennis-computer-vision-analytics.vercel.app/'], ['GitHub', 'https://github.com/NoahSantos2006/Tennis-Computer-Vision-Analytics']],
    recording: {
      label: 'Watch rally playback',
      image: 'https://raw.githubusercontent.com/NoahSantos2006/Tennis-Computer-Vision-Analytics/HEAD/docs/demo.gif',
      alt: 'Broadcast rally alongside a top-down court that plots each bounce and hit.'
    }
  },
  {
    id: 'locks', name: 'LinguiniLocks',
    description: 'Forecasts for basketball and tennis, refreshed automatically.',
    rarity: 'Epic', date: 'Nov 2026 – present',
    tags: ['Python', 'XGBoost', 'scikit-learn', 'SQLite', 'Cloudflare Pages'],
    details: [
      'Forecasts NBA games and player props, NCAA men’s basketball, and ATP/WTA tennis.',
      'Calibrates the models and evaluates them with walk-forward testing.',
      'Automates forecast refreshes and deployment to the public site.'
    ],
    links: [['Live site', 'https://linguinilocks.pages.dev/']]
  },
  {
    id: 'climb', name: 'Beta Testers',
    description: 'A bouldering route planner sized to the climber.',
    rarity: 'Rare', date: 'Oct 2026 · UCSC AI Hackathon, team of 4',
    tags: ['FastAPI', 'React', 'TypeScript', 'Claude API', 'Qwen2.5-7B', 'vLLM', 'Roboflow', 'OpenCV', 'pytest'],
    details: [
      'Built a multi-agent route planner that sizes bouldering routes to the climber’s body.',
      'The team built five FastAPI services: Orchestrator, Vision, Planner, Critic and Coach, with 117 pytest tests.',
      'I built the React and TypeScript frontend and the vision agent, and integrated the agents into one app.'
    ],
    links: [['GitHub', 'https://github.com/ktruon23/Beta-Testers'], ['Devpost', 'https://devpost.com/software/beta-testers']],
    recording: { label: 'Watch hackathon demo', url: 'https://www.youtube.com/watch?v=YTwg6PWwW28' }
  },
  {
    id: 'face', name: 'FaceFind',
    description: 'Find every photo of a person using one reference image.',
    rarity: 'Uncommon', date: 'May – Jun 2026',
    tags: ['Flask', 'InsightFace', 'Python'],
    details: [
      'Give the Flask app one reference photo and a folder of images to find photos containing the same person.',
      'Compares InsightFace buffalo_l embeddings with cosine similarity using a threshold of 0.45.',
      'Reports scan progress as the folder is processed.'
    ],
    links: [['GitHub', 'https://github.com/NoahSantos2006/FaceFind']]
  },
  {
    id: 'camera', name: 'nowahspov',
    description: 'A retro camcorder-style photo and home-movie portfolio.',
    rarity: 'Rare',
    tags: ['JavaScript', 'Node.js', 'FFmpeg', 'AWS Lambda', 'DynamoDB', 'Cloudflare Pages'],
    details: [
      'Filterable photo gallery with a keyboard-accessible lightbox and a camcorder-style video player, in vanilla JS with no framework.',
      'A build pipeline uses FFmpeg and Pillow to turn camera originals into web-ready video, posters and responsive WebP images, and strips GPS metadata.',
      'A serverless booking backend on AWS (API Gateway, Lambda, DynamoDB, SES, defined in SAM) with Turnstile bot protection.',
      'Frontend hosted on Cloudflare Pages, with videos served from S3 and CloudFront.'
    ],
    links: [['Live site', 'https://nowahspov.pages.dev'], ['GitHub', 'https://github.com/NoahSantos2006/nowahspov-website']]
  }
];

const sprites = {
  tennis: '<path fill="#101611" d="M5 1h6v1h2v2h2v8h-2v2h-2v1H5v-1H3v-2H1V4h2V2h2z"/><path fill="#acc846" d="M5 2h6v1h2v2h1v6h-1v2h-2v1H5v-1H3v-2H2V5h1V3h2z"/><path fill="#647729" d="M12 8h2v3h-1v2h-2v1H5v-1H3v-2h4v1h4v-1h1z"/><path fill="#f1f4c4" d="M4 3h2v2h1v4H6v2H5v2H3v-2h1V9h1V5H4zm7 0h2v2h-1v5h1v2h-2v-2h-1V5h1z"/>',
  locks: '<path fill="#101611" d="M5 1h6v1h2v5h2v8H1V7h2V2h2z"/><path fill="#d3a55f" d="M5 2h6v1h1v4h-2V4H6v3H4V3h1z"/><path fill="#d89236" d="M2 7h12v7H2z"/><path fill="#ffe18a" d="M2 7h12v1H3v5H2z"/><path fill="#8e5226" d="M13 8h1v6H3v-1h10z"/><path fill="#37271b" d="M7 9h2v2H8v2H7z"/>',
  climb: '<path fill="#101611" d="M6 2h5v1h2v3h2v8H1V8h2V5h2V3h1z"/><path fill="#8a8b78" d="M6 3h5v1h1v3h2v6H2V9h2V6h2z"/><path fill="#5f665b" d="M10 4h2v3h2v6H3v-2h7z"/><path fill="#e6945e" d="M7 5h3v2H7z"/><path fill="#dfc66e" d="M4 8h3v2H4z"/><path fill="#a0c6b7" d="M9 9h3v2H9z"/><path fill="#d998a2" d="M6 11h2v2H6z"/>',
  face: '<path fill="#101611" d="M2 2h10v1h2v8h-2v1h2v2h1v2h-3v-2h-2v-2H2v-1H1V3h1z"/><path fill="#8cb6ae" d="M2 3h10v1h1v6h-1v1H2V4h1z"/><path fill="#d9eee3" d="M3 4h8v1h1v4h-1v1H3V9H2V5h1z"/><path fill="#b98761" d="M5 5h4v4H5z"/><path fill="#424137" d="M5 5h4v1H5zm0 2h1v1H5zm3 0h1v1H8z"/><path fill="#e1aa6f" d="M10 11h2v1h1v2h1v1h-2v-2h-1v-1h-1z"/>',
  camera: '<path fill="#101611" d="M4 3h6v2h5v9H1V5h3z"/><path fill="#9a9b85" d="M5 4h4v2h5v7H2V6h3z"/><path fill="#ddd3a7" d="M2 6h12v2H2z"/><path fill="#4d5651" d="M2 9h12v4H2z"/><path fill="#1d2827" d="M6 7h5v1h1v4h-1v1H6v-1H5V8h1z"/><path fill="#80aaa6" d="M7 8h3v1h1v2h-1v1H7v-1H6V9h1z"/><path fill="#c9e2da" d="M7 9h2v1H7z"/>'
};

import type { Vector3Tuple } from 'three';

export type SectionId =
  | 'experience'
  | 'research'
  | 'projects'
  | 'education'
  | 'personal'
  | 'achievements'
  | 'funfacts';

export type PortfolioDropdown = {
  title: string;
  subtitle: string;
  date: string;
  location?: string;
  description: string;
  bullets: string[];
  tech: string[];
  links?: { label: string; href: string }[];
};

export type PortfolioSection = {
  id: SectionId;
  title: string;
  objectName: string;
  kicker: string;
  cameraPosition: Vector3Tuple;
  lookAt: Vector3Tuple;
  color: string;
  summary: string;
  bullets: string[];
  dropdowns?: PortfolioDropdown[];
  projectHighlights?: PortfolioDropdown[];
  songSnippetManifest?: string;
  tags: string[];
};

export const homeCamera = {
  position: [5.5, 4.45, 6.35] as Vector3Tuple,
  lookAt: [0.1, 0.95, -0.45] as Vector3Tuple,
};

const featuredProjects: PortfolioDropdown[] = [
  {
    title: 'Nodal: MIDI Controller & Audio Visualizer',
    subtitle: 'Knight Hacks VIII',
    date: 'Hackathon Project',
    description:
      'A physics-based MIDI controller and audio visualizer built to explore the intersection of gesture, music, and creative coding.',
    bullets: [
      'Engineered a full-stack MIDI controller using React, TypeScript, MediaPipe, WebMIDI/Audio, and Canvas API.',
      'Used real-time hand tracking and a custom physics engine to create an interactive music control experience.',
      'Rendered 15+ dynamic nodes at 60 FPS.',
      'Recorded 100+ MIDI events/sec for seamless DAW integration.',
    ],
    links: [
      { label: 'Nodal GitHub', href: 'https://github.com/mejiso/Nodal' },
      { label: 'Nodal Live', href: 'https://nodal-six.vercel.app/' },
    ],
    tech: [
      'React',
      'TypeScript',
      'MediaPipe',
      'WebMIDI',
      'WebAudio',
      'Canvas API',
    ],
  },
  {
    title: 'Universal Statistical Analysis Script',
    subtitle: 'Clinical Data Tool',
    date: 'Python Project',
    description:
      'A reusable analytics framework for processing clinical trial datasets and automating statistical testing workflows.',
    bullets: [
      'Developed a universal Python analytics framework for clinical trial datasets.',
      'Processed CSV files with 50+ variables through RegEx parsing and DataFrame restructuring.',
      'Automated statistical testing workflows to make repeated clinical analysis faster and more reproducible.',
      'Achieved 85% faster analysis through reusable scripts and cleaner data processing pipelines.',
    ],
    tech: [
      'Python',
      'Pandas',
      'NumPy',
      'Matplotlib',
      'RegEx',
      'Data Analysis',
    ],
  },
  {
    title: 'Interactive 3D Portfolio Room',
    subtitle: 'Personal Portfolio',
    date: 'Portfolio Project',
    description:
      'A browser-based 3D portfolio room designed as an interactive, personal way to present experience, research, projects, music, and creative details.',
    bullets: [
      'Built an interactive 3D room with clickable portfolio objects, custom camera transitions, and section-specific content drawers.',
      'Added polished interaction details including custom cursor styling, click audio, looping music playback, and a compact seekable music bar.',
      'Integrated custom Blender room assets, wall artwork, sticky notes, music snippets, and responsive overlay controls.',
    ],
    tech: [
      'React',
      'TypeScript',
      'Vite',
      'Three.js',
      'React Three Fiber',
      'Drei',
      'Blender',
      'HTML5 Audio',
      'Tailwind CSS',
    ],
  },
  {
    title: 'Clinical Trial Scheduler',
    subtitle: 'Limbitless Solutions',
    date: 'Clinical Software Project',
    location: 'Orlando, FL',
    description:
      'Collaborated with the Research team to develop a scheduler for managing clinical trials. The scheduler allows participants to sign up for trial slots and allows researchers to input their availability.',
    bullets: [
      'Designed and implemented a trial scheduler interface to support participant sign-ups and researcher availability.',
      'Improved clinical trial workflow visibility and scheduling accuracy with cleaner input flows.',
      'Built with Flutter and Dart to support mobile-friendly research operations.',
    ],
    tech: [
      'Flutter',
      'Dart',
      'Clinical Trial Scheduling',
      'UI/UX',
    ],
  },
  {
    title: 'Weekly Reports Page',
    subtitle: 'Limbitless Solutions',
    date: 'Clinical Software Project',
    location: 'Orlando, FL',
    description:
      'Revamped the Weekly Reports page by fixing bugs and improving the design for better usability and readability.',
    bullets: [
      'Improved readability and usability through visual and interaction updates.',
      'Fixed data reporting bugs to ensure accurate weekly summary output.',
      'Enhanced researcher workflows with clearer report layout and performance improvements.',
    ],
    tech: [
      'Flutter',
      'Dart',
      'Reporting',
      'Usability',
    ],
  },
];

export const portfolioSections: PortfolioSection[] = [
  {
    id: 'experience',
    title: 'Work Experience',
    objectName: 'Laptop / Desk',
    kicker: 'Software Engineering + Applied Technology',
    cameraPosition: [2.2, 2.15, 2.2],
    lookAt: [0.58, 1.18, -1.15],
    color: '#2d7d83',
    summary:
      'Professional Experience & Education',
    bullets: [
      'Software Engineering CWEP at Lockheed Martin.',
      'Clinical data analysis and software engineering work at Limbitless Solutions.',
      'Engineering Sophomore Summit Participant at BNY.',
      'Audio Systems Producer for ATUNES.',
      'Non-emergency medical transport with Village Connect.',
    ],
    dropdowns: [
      {
        title: 'Education and Skills',
        subtitle: 'University of Central Florida',
        date: 'Expected Spring 2028',
        location: 'Orlando, FL',
        description:
          'Computer Science Major from the University of Central Florida.',
        bullets: [
          'Expected Graduation: Spring 2028',
          'Relevant Coursework: Object-Oriented Programming, CS1, Calculus 1 & 2, Discrete Mathematics, Computer Logic & Organization.',
        ],
        tech: [
          'C', 'Python', 'Java', 'Flutter', 'Dart', 'React', 'TypeScript', 'Three.js', 'WebMIDI', 'WebAudio', 'Canvas API',
        ],
      },

      {
        title: 'Software Engineering CWEP',
        subtitle: 'Lockheed Martin',
        date: 'May 2026 – Present',
        location: 'Orlando, FL',
        description:
          'Selected for Lockheed Martin’s College Work Experience Program as a Software Engineering intern, contributing to mission-driven engineering projects while gaining hands-on experience in professional software development workflows.',
        bullets: [
          'Contributing to mission-driven engineering projects in a professional software development environment.',
          'Gaining hands-on experience with software engineering workflows, debugging, collaboration, and maintainable implementation.',
          'Applying computer science fundamentals to technical projects while building stronger engineering habits and professional judgment.',
        ],
        tech: [
          'Java',
          'Software Engineering',
          'Selenium',
          'Professional Workflows',
          'Mission-Driven Systems', 'TestNG', 'Test Verification', 'Automated Testing',
        ],
      },
      {
        title: 'Clinical Data Analyst / Software Engineering Intern',
        subtitle: 'Limbitless Solutions',
        date: 'August 2025 – Present',
        location: 'Orlando, FL',
        description:
          'Clinical data analysis, research, and accessibility-focused software work supporting EMG-powered prosthetics, XR rehabilitation, and clinical trial operations for children with limb differences.',
        bullets: [
          'Optimized clinical data analysis workflows with Python, Pandas, and Matplotlib across 3+ projects, increasing statistical testing efficiency by 75%.',
          'Wrote 50+ literature reviews synthesizing gamified rehabilitation, adaptive affective computing, and AI-driven personalization to support prosthetic accessibility research.',
          'Developed reusable Python and R workflows to normalize multi-cohort clinical trial datasets through RegEx parsing and automated statistical testing.',
          'Contributed to clinical trial scheduler development in Flutter/Dart to support research operations and participant scheduling.',
        ],
        tech: [
          'Python',
          'R',
          'Flutter',
          'Dart',
          'Clinical Data',
          'Accessibility',
        ],
      },
      {
        title: 'Engineering Sophomore Summit Participant',
        subtitle: 'BNY',
        date: 'May 2026 – Present',
        location: 'Remote',
        description:
          'Selected nationwide for BNY’s Engineering Sophomore Summit, a competitive six-week pre-internship program focused on financial technology, engineering career paths, senior leaders, and a coding business case challenge.',
        bullets: [
          'Exploring financial technology, engineering career paths, and large-scale software systems in banking.',
          'Engaging with senior leaders and technical professionals to better understand engineering in financial services.',
          'Participating in a coding business case challenge focused on applying technical problem solving to real-world fintech scenarios.',
        ],
        tech: [
          'FinTech',
          'Engineering Summit',
          'Professional Development',
        ],
      },
      {
        title: 'Audio Systems Producer',
        subtitle: 'ATUNES',
        date: 'January 2024 – January 2025',
        location: 'South Korea (Remote)',
        description:
          'International music production and audio systems work across a remote creative production team.',
        bullets: [
          'Passed 3 global audition rounds, becoming the youngest member of an international production team.',
          'Produced 150+ digital projects and pitched 50+ tracks through cross-platform workflows.',
          'Maintained 100% on-time delivery while collaborating with audio engineers, creative directors, and international teammates.',
        ],
        links: [
          { label: 'Music Page', href: 'https://www.instagram.com/ssofamix/' },
        ],
        tech: [
          'Ableton Live',
          'Music',
          'Creative Coding',
          'Audio Tools',
        ],
      },
      {
        title: 'Non-Emergency Medical Transport',
        subtitle: 'Village Connect',
        date: 'December 2024 – Present',
        location: 'The Villages, FL',
        description:
          'Direct patient support role during Village Connect’s startup phase, focused on non-emergency patient transfers and clinical workflow reliability.',
        bullets: [
          'Supported 100+ non-emergency patient transfers across 3 medical facilities.',
          'Helped boost client satisfaction and support a 45% repeat-service rate during the startup phase.',
          'Built practical experience with patient transport, charting, HIPAA compliance, clinical workflows, and reliability in care settings.',
        ],
        tech: [
          'Patient Transport',
          'Clinical Workflow',
          'HIPAA Compliance',
          'Direct Patient Care',
        ],
      },
    ],
    projectHighlights: featuredProjects,
    tags: [
      'Software Engineering',
      'Lockheed Martin',
      'Limbitless Solutions',
      'BNY',
      'Clinical Technology',
      'Audio Systems',
      'Patient Care',
      'FinTech',
    ],
  },
  {
    id: 'research',
    title: 'Research Experience',
    objectName: 'Research Experience',
    kicker: 'Knights Research Scholars Program',
    cameraPosition: [-1.7, 2.55, 1.45],
    lookAt: [-2.45, 1.75, -1.9],
    color: '#d96b5f',
    summary:
      'Undergraduate research experience at the University of Central Florida through the Knights Research Scholars Program',
    bullets: [
      'Python pipeline research for driver emotion recognition with InternVL.',
      'Secure and embedded LLM systems research with RAG, knowledge graphs, and MLC-LLM tooling.',
      'Gamified rehabilitation research shaped by EMG-powered prosthetics and adaptive difficulty systems.',
    ],
    dropdowns: [
      {
        title: 'Undergraduate Researcher — Vision Language Models',
        subtitle: 'UCF College of Engineering and Computer Science',
        date: 'July 2025 – December 2025',
        location: 'Orlando, FL',
        description:
          'Researched vision-language model applications for driver emotion recognition and driving behavior interpretation using dashcam video data.',
        bullets: [
          'Worked as 1 of 3 researchers engineering a Python pipeline to automate analysis of approximately 3,000 dashcam videos.',
          'Supported comparative study of 3 vision-language models using InternVL to classify driver emotions into 8 categories.',
          'Leveraged 4 Visual Question Answering pipelines to analyze driver attention, facial expression, and road environments.',
          'Improved contextual understanding accuracy for VLM interpretation of driver behavior by 30%.',
        ],
        tech: [
          'Python',
          'InternVL',
          'Vision-Language Models',
          'VQA',
          'Driver Behavior Analysis',
        ],
      },
      {
        title: 'Undergraduate Researcher — Secure & Embedded LLM Systems',
        subtitle: 'UCF College of Engineering and Computer Science',
        date: 'January 2026 – Present',
        location: 'Orlando, FL',
        description:
          'Researching secure and fault-tolerant large language models for embedded systems with a focus on privacy-aware and resource-constrained AI.',
        bullets: [
          'Studying secure and fault-tolerant LLM systems for embedded environments.',
          'Exploring retrieval-augmented generation, knowledge graphs, prompt design, and MLC-LLM tooling.',
          'Investigating how LLM systems can balance usefulness, privacy, performance, and deployment constraints.',
        ],
        tech: [
          'LLMs',
          'RAG',
          'Knowledge Graphs',
          'Prompt Design',
          'MLC-LLM',
          'Embedded AI',
        ],
      },
    ],
    tags: [
      'AI Research',
      'Vision-Language Models',
      'LLMs',
      'RAG',
      'Embedded Systems',
    ],
  },
  {
    id: 'projects',
    title: 'Projects',
    objectName: 'Game Controller / Monitor',
    kicker: 'Interactive Systems + Developer Tools',
    cameraPosition: [3.4, 2.25, 0.65],
    lookAt: [2.65, 1.2, -1.35],
    color: '#7d5a42',
    summary:
      'Technical projects focused on creative coding, data automation, real-time interaction, and user-centered software systems.',
    bullets: [
      'Nodal MIDI controller and audio visualizer.',
      'Universal statistical analysis script.',
      'Dynamic difficulty adjustment exergame.',
      'Interactive 3D portfolio room.',
      'Roblox camera systems for Shonen Raiders.',
    ],
    dropdowns: [
      ...featuredProjects,
      {
        title: 'Clinical Trial Scheduler',
        subtitle: 'Limbitless Solutions',
        date: 'Clinical Software Project',
        location: 'Orlando, FL',
        description:
          'Collaborated with the Research team to develop a scheduler for managing clinical trials. The scheduler allows participants to sign up for trial slots and allows researchers to input their availability.',
        bullets: [
          'Designed and implemented a trial scheduler interface to support participant sign-ups and researcher availability.',
          'Improved clinical trial workflow visibility and scheduling accuracy with cleaner input flows.',
          'Built with Flutter and Dart to support mobile-friendly research operations.',
        ],
        tech: [
          'Flutter',
          'Dart',
          'Clinical Trial Scheduling',
          'UI/UX',
        ],
      },
      {
        title: 'Weekly Reports Page',
        subtitle: 'Limbitless Solutions',
        date: 'Clinical Software Project',
        location: 'Orlando, FL',
        description:
          'Revamped the Weekly Reports page by fixing bugs and improving the design for better usability and readability.',
        bullets: [
          'Improved readability and usability through visual and interaction updates.',
          'Fixed data reporting bugs to ensure accurate weekly summary output.',
          'Enhanced researcher workflows with clearer report layout and performance improvements.',
        ],
        tech: [
          'Flutter',
          'Dart',
          'Reporting',
          'Usability',
        ],
      },
      {
        title: 'Roblox Camera Systems',
        subtitle: 'Shonen Raiders',
        date: 'Game Development Project',
        description:
          'Camera and interaction systems for a Roblox game focused on improving game feel, player feedback, and movement responsiveness.',
        bullets: [
          'Implemented camera effects for enemy proximity, damage feedback, low-health breathing, and player movement.',
          'Adjusted peeking, field of view, camera shake, and visual feedback to improve immersion.',
          'Balanced technical implementation with game feel, readability, and responsive player control.',
        ],
        tech: [
          'Roblox Studio',
          'Lua',
          'Camera Systems',
          'Game Feel',
          'Player Feedback',
        ],
      },
    ],
    tags: [
      'React',
      'TypeScript',
      'Python',
      'Pygame',
      'Three.js',
      'Roblox',
      'Creative Coding',
    ],
  },
  {
    id: 'education',
    title: 'Education',
    objectName: 'Bookshelf',
    kicker: 'University of Central Florida',
    cameraPosition: [-2.75, 2.45, 3.35],
    lookAt: [-1.65, 1.52, -1.5],
    color: '#8a5f9e',
    summary:
      'University of Central Florida • Computer Science Major • Expected Graduation: Spring 2028.',
    bullets: [
      'Expected Graduation: Spring 2028',
      'Relevant Coursework: Object-Oriented Programming, CS1, Calculus 1 & 2, Discrete Mathematics, Computer Logic & Organization.',
    ],
    dropdowns: [
      {
        title: 'University of Central Florida',
        subtitle: 'Computer Science Major',
        date: 'Expected Spring 2028',
        location: 'Orlando, FL',
        description:
          'Computer Science Major from the University of Central Florida.',
        bullets: [
          'Expected Graduation: Spring 2028.',
          'Relevant Coursework: Object-Oriented Programming, CS1, Calculus 1 & 2, Discrete Mathematics, Computer Logic & Organization.',
        ],
        tech: [
          'Computer Science',
        ],
      },
    ],
    tags: [
      'UCF',
      'Computer Science',
    ],
  },
  {
    id: 'personal',
    title: 'Music Experience and Hobbies',
    objectName: 'Music Experience / Hobbies',
    kicker: 'Music + Creative Technology',
    cameraPosition: [1.3, 1.85, 3.1],
    lookAt: [1.15, 0.88, 0.95],
    color: '#bf7f3f',
    summary:
      'Professional Background in Music Production & Composition',
    bullets: [
      'Produced 150+ digital projects and pitched 50+ tracks as an Audio Systems Producer for ATUNES.',
      'Music has shaped the way I think about rhythm, iteration, detail, and user experience.',
      'Interested in projects where code becomes expressive through audio, visualization, interaction, and creative interfaces.',
    ],
    dropdowns: [
      {
        title: 'Audio Systems Producer',
        subtitle: 'ATUNES + Creative Technology',
        date: 'January 2024 – January 2025',
        description:
          'Professional Industry Production Experience',
        bullets: [
          'Passed 3 global audition rounds and contributed to an international production team based in South Korea.',
          'Produced 150+ digital projects and pitched 50+ tracks through cross-platform creative workflows.',
          'Interested in projects where code becomes expressive through audio, visualization, interaction, and creative interfaces.',
        ],
        links: [
          { label: 'Music Page', href: 'https://www.instagram.com/ssofamix/' },
        ],
        tech: [
          'Ableton Live',
          'Music',
          'Creative Coding',
          'Interaction Design',
          'Audio Tools',
        ],
      },
      {
        title: 'Nodal: MIDI Controller & Audio Visualizer',
        subtitle: 'Personal Project',
        date: 'Interactive Audio / MIDI',
        description:
          'A music-connected interactive MIDI controller and visualizer built to translate gesture-based input into expressive audio and dynamic visuals.',
        bullets: [
          'Built a custom MIDI and audio experience using React, TypeScript, WebMIDI, and WebAudio.',
          'Designed gesture-driven controls that connect motion to music performance and visualization.',
        ],
        links: [
          { label: 'Nodal GitHub', href: 'https://github.com/mejiso/Nodal' },
          { label: 'Nodal Live', href: 'https://nodal-six.vercel.app/' },
        ],
        tech: [
          'React',
          'TypeScript',
          'WebMIDI',
          'WebAudio',
          'Canvas API',
        ],
      },
    ],
    songSnippetManifest: '/music-snippets/snippets.json',
    tags: [
      'Music',
      'Creative Coding',
      'Interaction Design',
      'Audio Tools',
    ],
  },
  {
    id: 'achievements',
    title: 'Achievements',
    objectName: 'Trophy',
    kicker: 'Awards + Recognition',
    cameraPosition: [1.55, 2.2, 3.2],
    lookAt: [1.1, 1.05, 0.95],
    color: '#b68a28',
    summary:
      'Awards and recognitions from technology, research, academics, and music.',
    bullets: [
      'National Young Women in Technology (NCWIT) Affiliate Recipient: top 3% of 3,000 global applicants.',
      'AP Capstone Research & Seminar Diploma Recipient: top 16% of 100,000+ global participants.',
      'National Federation of Music Clubs (NFMC) Superior Recipient: 3x Superior Ratings in piano competition.',
    ],
    dropdowns: [
      {
        title: 'NCWIT Affiliate Recipient',
        subtitle: 'National Young Women in Technology',
        date: 'Award',
        description:
          'Recognized through NCWIT for technology achievement and potential.',
        bullets: [
          'Selected as an Affiliate Recipient.',
          'Placed in the top 3% of 3,000 global applicants.',
        ],
        tech: [
          'Technology',
          'Leadership',
          'Recognition',
        ],
      },
      {
        title: 'AP Capstone Research & Seminar Diploma Recipient',
        subtitle: 'College Board',
        date: 'Academic Recognition',
        description:
          'Earned recognition for advanced research, seminar, writing, and presentation work.',
        bullets: [
          'Recognized among the top 16% of 100,000+ global participants.',
          'Built research, analysis, academic writing, and presentation experience through AP Capstone.',
        ],
        tech: [
          'Research',
          'Seminar',
          'Academic Writing',
          'Presentation',
        ],
      },
      {
        title: 'NFMC Superior Recipient',
        subtitle: 'National Federation of Music Clubs',
        date: 'Music Award',
        description:
          'Piano competition recognition through the National Federation of Music Clubs.',
        bullets: [
          'Received 3 Superior Ratings in piano competition.',
          'Represents long-term piano performance, preparation, and musicianship.',
        ],
        tech: [
          'Piano',
          'Music Performance',
          'Competition',
        ],
      },
    ],
    tags: [
      'NCWIT',
      'AP Capstone',
      'NFMC',
      'Research',
      'Piano',
      'Awards',
    ],
  },
  {
    id: 'funfacts',
    title: 'Fun Facts!',
    objectName: 'Fun Facts',
    kicker: 'Fun Facts + Personal Interests',
    cameraPosition: [1.3, 2.2, 3.1],
    lookAt: [0, 1, 1],
    color: '#8a6fb0',
    summary:
      '',
    bullets: [
      'My top 3 artists are Norah Jones, Laufey, and Bruno Major.',
      'I have been producing music and playing piano since I was 10.',
      'I used to play the Launchpad Pro.',
      'I produced a song for a Hmong girl group called Cua Tshiab when I was 13.',
      'I was signed to a K-pop publishing company during my senior year of high school and most likely pitched songs to your favorite K-pop artists.',
      'The music playing in this portfolio was made by me.',
      'I can 3D model, and this room is a 99% accurate model of my current room.',
      'I learned Blender just for this portfolio.',
      'I used to be a pre-med major, then switched to Computer Science during the summer of my freshman year.',
      'I fell in love with CS the moment I transferred and have been building my career ever since.',
      'My favorite game of all time is Omori, and I also love Undertale, Minecraft, and Roblox.',
    ],
    dropdowns: [
      {
        title: 'Personal Snapshot',
        subtitle: 'Music, 3D Modeling, CS, and Games',
        date: 'Fun Facts',
        description:
          'A more personal corner of the portfolio with the creative details that make this room feel like mine.',
        bullets: [
          'My top 3 artists are Norah Jones, Laufey, and Bruno Major.',
          'I have been producing music and playing piano since I was 10, and I used to play the Launchpad Pro.',
          'I produced a song for a Hmong girl group called Cua Tshiab when I was 13.',
          'I was signed to a K-pop publishing company during my senior year of high school and most likely pitched songs to your favorite K-pop artists.',
          'The music playing in this portfolio was made by me.',
          'This room is a 99% accurate 3D model of my current room, and I learned Blender just for this portfolio.',
          'I used to be a pre-med major, then switched to Computer Science during the summer of my freshman year and fell in love with it immediately.',
          'My favorite game of all time is Omori, and I also love Undertale, Minecraft, and Roblox.',
        ],
        tech: [
          'Music Production',
          'Piano',
          'Blender',
          '3D Modeling',
          'Computer Science',
          'Games',
        ],
      },
    ],
    tags: [
      'Norah Jones',
      'Laufey',
      'Bruno Major',
      'Blender',
      'Omori',
      'Music Production',
    ],
  },
];

export const sectionById = Object.fromEntries(
  portfolioSections.map((section) => [section.id, section]),
) as Record<SectionId, PortfolioSection>;

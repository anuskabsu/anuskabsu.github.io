/*
  Your portfolio content lives here. Replace the sample text and links below;
  no HTML editing is needed. Use a direct link to a hosted resume PDF.
*/
const portfolio = {
  name: "Anuska Singh",
  email: "anuskabsu@gmail.com",
  resume: "CV%20Anuska.pdf?v=2026-08-02",
  intro: "Urban designer, planner, researcher & architect.\nI design for people.",
  about: "I’ve always been drawn to the small details that shape how people experience a place - the streets they walk, the parks they gather in & the spaces that quietly become part of everyday life. Design helps me notice those details and imagine how they can be better.",
  currently: {
    intro: "Researching how communities recover after disasters.",
<<<<<<< HEAD
    topics: ["Greenways", "Parks & plazas", "Walkable neighborhoods"],
    location: "Ann Arbor, Michigan",
    reading: "Data Feminism"
  },
  studies: [
    { period: "2023 — 2025", degree: "Master in Urban & Regional Planning", school: "Ball State University", mark: "BALL\nSTATE", markClass: "ball-state", link: "" },
    { period: "2024 — 2025", degree: "Master in Urban Design", school: "Ball State University", mark: "BALL\nSTATE", markClass: "ball-state", link: "" },
    { period: "2015 — 2020", degree: "Bachelor’s in Architecture", school: "Institute of Engineering · Tribhuvan University", mark: "TU", markClass: "tribhuvan", link: "" }
  ],
  projectCollections: [
    {
      id: "urban-design-planning-projects",
      number: "01",
      label: "MY PROJECTS",
      title: "Urban Design & Planning Projects",
      subtitle: "Major projects shaped through research, planning, landscape, and urban design.",
      projects: [
        { title: "The Connected Path", type: "Urban Design Thesis", year: "2025", description: "A citywide greenway framework reconnecting Indianapolis neighborhoods through parks, active mobility, ecological restoration, and healthier public spaces.", link: "Projects%20Folder/Capstone%20Project.pdf", color: "coral" },
        { title: "Green Connections", type: "Landscape Architecture", year: "2024", description: "Transforming underused spaces into connected parks, riverfront landscapes, and vibrant neighborhood destinations.", link: "Projects%20Folder/Green%20Connections.pdf", color: "blue" },
        { title: "Canalscape", type: "Urban Design Studio", year: "2024", description: "A mixed-use waterfront neighborhood that strengthens pedestrian movement, public life, and ecological connections along the Indianapolis Canal.", link: "Projects%20Folder/Canalscape.pdf", color: "yellow" },
        { title: "The Mosaic", type: "ULI Hines Student Competition", year: "2024", description: "A mixed-use cultural district connecting housing, transit, business, and nature through attainable urban living.", link: "Projects%20Folder/The%20Mosaic.pdf", color: "lilac" },
        { title: "Muncie Downtown Revitalization", type: "Urban Design + Development", year: "2023", description: "Transforming underused downtown parking lots into a connected neighborhood with housing, retail, parks, and public spaces.", link: "Projects%20Folder/Muncie%20Downtown%20Revitalization.pdf", color: "coral" },
        { title: "Recessed Highway", type: "Urban Design Studio", year: "2024", description: "Reimagining highway infrastructure as a walkable mixed-use district with transit, housing, parks, and vibrant public spaces.", link: "Projects%20Folder/Recessed%20Highway.pdf", color: "blue" }
      ]
    },
    {
      id: "gis-spatial-analysis",
      number: "02",
      label: "GIS & SPATIAL ANALYSIS",
      title: "Cities read through data.",
      subtitle: "Exploring cities through maps, data, and spatial analysis.",
      methods: ["ACCESS + EQUITY", "GEOCODING + NETWORK ANALYSIS", "CENSUS + COMMUNITY DATA"],
      projects: [
        { title: "GIS & Spatial Analysis", type: "Research + Mapping", year: "2024", description: "A collection of spatial analysis, cartography, geocoding, and network-modeling work addressing access, public safety, and food deserts.", link: "Anuska%20Singh_Portfolio.pdf#page=14", color: "blue" }
      ]
    }
  ],
  experience: [
    { period: "2025 — PRESENT", title: "Research Assistant", organization: "Institute of Urban Development and Policy Research", logoSrc: "assets/iudp-mark.png", logoClass: "iudp", summary: "Prepare datasets in R and produce demographic, policy, and post-disaster recovery analysis, visualizations, and documentation." },
    { period: "2023 — 2025", title: "Graduate & Research Assistant", organization: "Ball State University", logo: "BSU", logoClass: "ball-state", summary: "Supported planning instruction and faculty research through Census, ACS, BLS, GIS, mapping, graphics, reports, and presentations." },
    { period: "2022 — 2023", title: "Volunteer", organization: "UN-Habitat Nepal", logoSrc: "assets/un-habitat-mark.png", logoClass: "un-habitat", summary: "Synthesized workshop discussions and stakeholder feedback into reports and briefing documents for inclusive development and policy conversations." },
    { period: "2020 — 2023", title: "Urban Designer / Architect", organization: "Urban Park Pvt. Ltd.", logoSrc: "assets/urban-park-mark.png", logoClass: "urban-park", summary: "Developed master plans, urban design proposals, architectural projects, feasibility studies, construction documents, and visualizations." },
    { period: "2020 — 2022", title: "Technical Volunteer", organization: "Society of Nepalese Architects", logoSrc: "assets/sona-mark.png", logoClass: "sona", summary: "Contributed to conference communication, visual identity, and affordable-housing research, including the Affordable Housing Activation program in Madrid." }
  ],
  awards: [
    { year: "2024", title: "Best Portfolio Award", organization: "Ball State University" },
    { year: "2024", title: "1st Place, International Student Photo Contest", organization: "Rinker Center for Global Affairs · Ball State University" },
    { year: "2024", title: "Winner, People’s Choice Category Photo Contest", organization: "Rinker Center for Global Affairs · Ball State University" },
    { year: "2020", title: "Best Thesis Award", organization: "Tribhuvan University" }
  ],
  publications: [
    { title: "Building a Vision for the Future", source: "The News-Gazette · Feb 2024", summary: "A newspaper feature on Ball State urban planning students’ work for the Union City Comprehensive Plan.", link: "https://www.winchesternewsgazette.com/news/building-a-vision-for-the-future/article_946935b8-d4e0-11ee-ae8a-8b1ebb1d9f40.html" },
    { title: "Rehabilitating Squatter Settlements: Begin with Affordable Housing Solutions", source: "The Himalayan Times · Jan 2023", summary: "An argument for equitable, affordable housing and secure tenure in Kathmandu’s informal settlements.", link: "https://thehimalayantimes.com/opinion/rehabilitating-squatter-settlements-begin-with-affordable-housing-solutions" },
    { title: "World Habitat Day 2022: Inclusive Cities for Sustainable Urbanization in Nepal", source: "UN-Habitat Nepal · Dec 2022", summary: "A record of conversations on reducing inequality and building inclusive cities across Nepal.", link: "https://unhabitat.org.np/featured_news_detail/world-habitat-day-2022-inclusive-cities-for-sustainable-urbanization-in-nepal" },
    { title: "Affordable Housing Activation and Inclusive Urban Design in Nepal", source: "SONA International Conference, Madrid · 2022", summary: "A conference contribution exploring affordable housing as a foundation for more inclusive urban design.", link: "CV%20Anuska.pdf#page=3" }
  ],
  countries: ["Nepal", "United States", "Spain", "Dubai", "Switzerland", "Italy", "France", "Indonesia", "Canada", "Malaysia"],
  countryCount: 10,
  creator: "I love sharing little moments of my life. I share recipes I grew up with, traditions, places & everyday moments.",
  creatorLinks: [
    { label: "TikTok", icon: "♪", handle: "@anuska___l", link: "https://www.tiktok.com/@anuska___l?_r=1&_t=ZP-98Ri6Uh8Wxb" },
    { label: "Instagram", icon: "◎", handle: "@anuska.diary", link: "https://www.instagram.com/anuska.diary?igsh=MXQxdm1tbG5rdWp4Yg%3D%3D&utm_source=qr" },
    { label: "Facebook", icon: "f", handle: "Follow my journey", link: "https://www.facebook.com/share/1d4oEDDVMC/?mibextid=wwXIfr" },
    { label: "LinkedIn", icon: "in", handle: "Anuska Singh", link: "https://www.linkedin.com/in/anuska-singh" }
  ]
};

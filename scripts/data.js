// News Data
// Add new items to the top of the list
const newsData = [
    {
        date: "Sep 2025",
        content: "Selected as a National Scholar at KOSAF."
    },
    {
        date: "Sep 2024",
        content: "Started Master's degree at KAIST."
    },
    {
        date: "Jan 2024",
        content: "Paper \"ARGo\" accepted to Virtual Reality (Springer)."
    }
];

// Publications Data
// Create new entries here.
// Set 'isSelected: true' to show on the main page (index.html).
const publicationData = [
    {
        year: 2025,
        title: "Increasing Sense of Agency in VR by Providing Non-Contact Collision Haptics",
        authors: "<strong>Dohui Lee</strong>, Kun-Woo Song, Sang Ho Yoon",
        venue: "In IEEE World Haptics Conference Work-In-Progress, 2025",
        badge: { text: "WHC", color: "badge-pink" },
        thumbnail: "paper_placeholder.png",
        links: [
            // { text: "PDF", url: "#" },
            // { text: "Video", url: "#" }
        ],
        isSelected: true
    },
    {
        year: 2024,
        title: "ARGo: augmented reality-based mobile Go stone collision game",
        authors: "<strong>Dohui Lee</strong>, Sohyun Won, Jiwon Kim, Hyuk-Yoon Kwon",
        venue: "In Virtual Reality, 2024",
        badge: { text: "Virtual Reality", color: "badge-blue" },
        thumbnail: "paper_placeholder.png",
        links: [
            { text: "DOI", url: "https://link.springer.com/article/10.1007/s10055-023-00919-4" },
            // { text: "Project Website", url: "#" }
        ],
        isSelected: true
    }
];

// Profile Data
const profileData = {
    name: "Dohui Lee",
    role: "Master's Student @ KAIST",
    image: "profile.jpg",
    links: [
        { text: "dohui.lee@kaist.ac.kr", url: "mailto:dohui.lee@kaist.ac.kr", iconImg: "images/email_icon.png" },
        { text: "GitHub", url: "https://github.com/dohui-lee", iconImg: "images/github_icon.png" },
        { text: "LinkedIn", url: "https://www.linkedin.com/in/dohui-lee-607943219/", iconImg: "images/linkedin_icon.png" },
        { text: "Google Scholar", url: "https://scholar.google.co.kr/citations?user=irP5BeAAAAAJ&hl=ko&oi=ao", iconImg: "images/googlescholar_icon.png" }
    ]
};

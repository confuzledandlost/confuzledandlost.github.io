// Import necessary libraries and components
import { useState, useEffect } from "react"  // React hooks for state management and side effects
import { Github, Linkedin, FileText, Sun, Moon, X } from "lucide-react"  // Icon components
import { motion, AnimatePresence, hover } from "framer-motion"  // Animation library
import styles from "./Portfolio.module.css"  // CSS module for styling
import ranks from "./ranks"  // Import rank images

// Animation configuration for fade-in-up effect
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },  // Initial state: invisible and 20px down
  visible: {
    opacity: 1,  // Final state: fully visible
    y: 0,        // Final position: original position
    transition: { duration: 0.5 }  // Animation duration
  }
};

// Card component for consistent card styling and animation
const Card = ({ children }) => (
  <motion.div
    className={styles.card}
    variants={fadeInUp}  // Apply fadeInUp animation
  >
    {children}
  </motion.div>
);

// CardContent component for consistent content layout within cards
const CardContent = ({ children, className = "" }) => (
  <div className={`${styles.cardContent} ${className}`}>{children}</div>
);

// Button component with different variants (default, outline, ghost)
const Button = ({ children, variant = "default", className = "", animate = true, ...props }) => {
  // Map button variants to their corresponding CSS classes
  const styleMap = {
    default: styles.button,
    outline: styles.buttonOutline,
    ghost: styles.buttonGhost
  }
  return (
    <motion.button
      className={`${styleMap[variant] || styleMap.default} ${className}`}
      {...props}
      variants={animate ? fadeInUp : undefined}  // Only animate if animate prop is true
    >
      {children}
    </motion.button>
  )
};

// Main Portfolio component
export default function Portfolio() {
  // State management using React hooks
  const [filter, setFilter] = useState("Computer Science")  // Current course filter
  const [showResume, setShowResume] = useState(false)      // Resume visibility
  const [showCourses, setShowCourses] = useState(false)    // Course history visibility
  const [selectedProject, setSelectedProject] = useState(null)  // Selected project for modal
  const [loading, setLoading] = useState(true)             // Loading state
  const [isDark, setIsDark] = useState(() => {            // Dark mode state with localStorage
    const savedTheme = localStorage.getItem('theme')
    return savedTheme === null ? true : savedTheme === 'dark'
  })

  const modalOpen = selectedProject !== null  // Helper for modal state

  // Effect for managing dark mode theme
  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    if (isDark) document.documentElement.classList.add("dark")
    else document.documentElement.classList.remove("dark")
  }, [isDark])

  // Effect for managing body scroll when modal is open
  useEffect(() => {
    if (modalOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
  }, [modalOpen])

  // Effect for loading screen timeout
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timeout)
  }, [])

  // Filter courses based on selected category
  const filteredCourses =
    filter === "All" ? courses : courses.filter((c) => c.category === filter)

  // Available course categories
  const categories = ["All", "Computer Science", "Cybersecurity", "IT"]

  // Helper function to get count of courses in a category
  const getCategoryCount = (category) =>
    category === "All"
      ? courses.length
      : courses.filter((c) => c.category === category).length

  // Loading screen component
  if (loading) {
    return (
      <motion.div
        className={styles.splash}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={styles.spinner}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <h1 className={styles.splashTitle}>Brandon Robinson</h1>
      </motion.div>
    )
  }

  // Main portfolio layout
  return (
    <motion.main
      className={styles.main}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.3  // Stagger child animations by 0.3s
          }
        }
      }}
    >
      {/* Hero Section */}
      <motion.section
        className={styles.sectionCentered}
        variants={fadeInUp}
      >
        {/* Theme Toggle */}
        <div className={styles.themeToggleRow}>
          <Button variant="ghost" onClick={() => setIsDark(!isDark)}>
            {isDark ? <Sun className={styles.icon} /> : <Moon className={styles.icon} />}
          </Button>
        </div>
        {/* Name and Title */}
        <motion.h1
          className={styles.heroTitle}
          variants={fadeInUp}
        >
          Brandon Robinson
        </motion.h1>
        <motion.p
          className={styles.heroSubtitle}
          variants={fadeInUp}
        >
          Chief Information Systems Technician | Aspiring Software Engineer
        </motion.p>
        {/* Social Links */}
        <motion.div
          className={styles.iconRow}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate="visible"
        >
          <motion.a
            href="https://github.com/confuzledandlost"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.icon}
            variants={fadeInUp}
          >
            <Github />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/brandon-robinson-uscg/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.icon}
            variants={fadeInUp}
          >
            <Linkedin />
          </motion.a>
          <motion.a
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.icon}
            variants={fadeInUp}
          >
            <FileText />
          </motion.a>
        </motion.div>
      </motion.section>

      {/* About Me Section */}
      <motion.section
        className={styles.sectionNarrow}
        variants={fadeInUp}
      >
        <motion.h2 className={styles.sectionTitle}
          variants={fadeInUp}
        >
          About Me
        </motion.h2>
        <motion.p
          variants={fadeInUp}
        >
          I'm a U.S. Coast Guard Chief Information Systems Technician and full-time Computer Science major at Sonoma State University. With a background in cybersecurity, curriculum development, and IT infrastructure, I'm pivoting into software engineering and academic research in computer science.
        </motion.p>
      </motion.section>

      {/* Featured Projects Section */}
      <motion.section className={styles.sectionNarrow}
        variants={fadeInUp}
      >
        <motion.h2 className={styles.sectionTitle}
          variants={fadeInUp}
        >
          Featured Projects
        </motion.h2>
        <motion.div
          className={styles.cardGrid}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate="visible"
        >
          {/* Project Cards */}
          {projects.map((project) => (
            <Card key={project.id}>
              <CardContent>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <img
                  src={project.image}
                  alt={project.title}
                  className={styles.projectImage}
                />
                <Button
                  variant="outline"
                  onClick={() => setSelectedProject(project)}
                >
                  View More
                </Button>
              </CardContent>
            </Card>

          ))}
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div className={styles.modalOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div className={styles.modal}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
              >
                <button onClick={() => setSelectedProject(null)} className={styles.modalClose}>
                  <X />
                </button>
                {/* Modal Content */}
                <h3 className={styles.modalTitle}>{selectedProject.title}</h3>
                <p>{selectedProject.description}</p>
                <p className={styles.modalSubtitle}>Course: {selectedProject.course}</p>
                {/* GitHub Link */}
                {selectedProject.github && (
                  <p className={styles.modalLink}>
                    <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                      <Github className={styles.icon} />
                    </a>
                  </p>
                )}
                {/* Tech Stack Tags */}
                {selectedProject.stack && (
                  <div className={styles.stackRow}>
                    {selectedProject.stack.map((tech, index) => (
                      <span key={index} className={styles.stackTag}>{tech}</span>
                    ))}
                  </div>
                )}
                {/* Project Challenges */}
                {selectedProject.challenges && (
                  <div>
                    <h4 className={styles.modalSubheading}>Key Challenges:</h4>
                    <ul className={styles.list}>
                      {selectedProject.challenges.map((challenge, index) => (
                        <li key={index}>{challenge}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {/* Download Link */}
                {selectedProject.download && (
                  <div className={styles.downloadLinkWrapper}>
                    <a
                      href={selectedProject.download}
                      className={styles.downloadLink}
                      download
                    >
                      Download Code (ZIP)
                    </a>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      {/* Professional/Academic Credentials Section */}
      <motion.section
        className={styles.sectionWide}
        variants={fadeInUp}
      >
        <motion.h2
          className={styles.sectionTitle}
          variants={fadeInUp}
        >
          Professional/Academic Credentials
        </motion.h2>
        <motion.p
          variants={fadeInUp}
        >
          Throughout my IT career, I have obtained various CompTIA certifications like A+ and Net+, as well as Master Training Specialist for curriculum development. I am graduating from Sonoma State University with a Bachelor of Science in Computer Science with distinction and honors. Additionaly, while on active duty, I obtained a Bachelor of Science in Cybersecurity with an Applied Mathematics Minor and highest honors.
        </motion.p>
        {/* Course History Toggle */}
        <motion.div className={styles.viewButtonContainer}
          variants={fadeInUp}
        >
          <Button onClick={() => setShowCourses(!showCourses)}>
            {showCourses ? "Hide Course History" : "View Course History"}
          </Button>
        </motion.div>

        {/* Course History Section */}
        <AnimatePresence>
          {showCourses && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                duration: 0.3,
                height: {
                  duration: 0.4,
                  ease: "easeInOut"
                }
              }}
            >
              {/* Filter Buttons */}
              <div className={styles.filterButtons}>
                {categories.map(category => (
                  <button
                    key={category}
                    className={`${filter === category ? styles.button : styles.buttonOutline}`}
                    onClick={() => setFilter(category)}
                  >
                    {category} ({getCategoryCount(category)})
                  </button>
                ))}
              </div>
              {/* Course List */}
              <ul className={styles.courseList}>
                {filteredCourses.map((course, index) => (
                  <li key={index} className={styles.courseItem}>
                    <strong>{course.code}</strong>: {course.title} <span className={styles.courseCategory}>({course.category})</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      {/* Military Experience Section */}
      <motion.section
        className={styles.sectionNarrow}
        variants={fadeInUp}
      >
        <motion.h2 className={styles.sectionTitle}
          variants={fadeInUp}
        >
          Military Experience
        </motion.h2>
        <motion.p className={styles.textCenter}
          variants={fadeInUp}
        >
          Over 17 years of service in the United States Coast Guard as an Information Systems Technician with leadership, instructional, and hands-on technical responsibilities.
        </motion.p>
        {/* Rank Cards */}
        <motion.div className={styles.rankGrid}
          variants={fadeInUp}
        >
          {military.map((item, idx) => (
            <Card key={idx}>
              <CardContent>
                <div className={styles.rankHeading}>
                  <img src={ranks[item.rank]} alt={`${item.rank} Rank`} className={styles.rankIcon} />
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                </div>
                <p variants={fadeInUp}>{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </motion.section>

      {/* Resume Section */}
      <motion.section
        className={styles.sectionCentered}
        variants={fadeInUp}
      >
        <motion.h2 className={styles.sectionTitle}
          variants={fadeInUp}
        >
          Resume
        </motion.h2>
        {/* Resume Buttons */}
        <motion.div className={styles.resumeButtons}
          variants={fadeInUp}
        >
          <Button onClick={() => setShowResume(!showResume)}>
            {showResume ? "Hide Resume" : "View Resume"}
          </Button>
          <Button variant="outline">
            <a
              href="/Resume.pdf"
              download
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              Download Resume
            </a>
          </Button>
        </motion.div>

        {/* Resume Viewer */}
        <AnimatePresence>
          {showResume && (
            <motion.div
              className={styles.resumeViewer}
              initial={{ opacity: 0, height: 0, overflow: "hidden" }}
              animate={{ opacity: 1, height: "800px", overflow: "hidden" }}
              exit={{ opacity: 0, height: 0, overflow: "hidden" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <object
                data="/Resume.pdf"
                type="application/pdf"
                width="100%"
                height="100%"
              >
                <p>It appears your browser doesn't support embedded PDFs.
                  <a href="/Resume.pdf" download>Click here to download the resume</a> instead.
                </p>
              </object>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        className={styles.sectionCentered}
        variants={fadeInUp}
      >
        <motion.h2 className={styles.sectionTitle}
          variants={fadeInUp}
        >
          Contact
        </motion.h2>
        <motion.p
          variants={fadeInUp}
        >
          You can reach me via LinkedIn, GitHub, or by reviewing my resume above.
        </motion.p>
        {/* Social Links */}
        <motion.div
          className={styles.iconRow}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate="visible"
        >
          <motion.a
            href="https://github.com/confuzledandlost"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.icon}
            variants={fadeInUp}
          >
            <Github />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/brandon-robinson-uscg/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.icon}
            variants={fadeInUp}
          >
            <Linkedin />
          </motion.a>
          <motion.a
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.icon}
            variants={fadeInUp}
          >
            <FileText />
          </motion.a>
        </motion.div>
      </motion.section>
    </motion.main>
  )
}

const courses = [
  { code: "CYB 420", title: "Enterprise Security", category: "Cybersecurity" },
  { code: "CYB 410", title: "Security Risk Management", category: "Cybersecurity" },
  { code: "CYB 400", title: "Security Assessment and Auditing", category: "Cybersecurity" },
  { code: "CYB 320", title: "Incident Response and Investigation", category: "Cybersecurity" },
  { code: "CYB 310", title: "Network Defense", category: "Cybersecurity" },
  { code: "CYB 300", title: "System and Communication Security", category: "Cybersecurity" },
  { code: "CYB 260", title: "Legal Cybersecurity", category: "Cybersecurity" },
  { code: "CYB 250", title: "Cyber Defense", category: "Cybersecurity" },
  { code: "CYB 240", title: "Application Security", category: "Cybersecurity" },
  { code: "CYB 230", title: "Operating System Security", category: "Cybersecurity" },
  { code: "CYB 220", title: "Network Security", category: "Cybersecurity" },
  { code: "CYB 210", title: "Computer Networking", category: "Cybersecurity" },
  { code: "CYB 200", title: "Cybersecurity Foundations", category: "Cybersecurity" },
  { code: "CS 496", title: "Senior Research Project", category: "Computer Science" },
  { code: "CS 495", title: "Quant Comp Sim & Visual Tutor", category: "Computer Science" },
  { code: "CS 460", title: "Programming Languages (C++)", category: "Computer Science" },
  { code: "CS 454", title: "Theory of Computation", category: "Computer Science" },
  { code: "CS 450", title: "Operating Systems (C)", category: "Computer Science" },
  { code: "CS 415", title: "Algorithm Analysis", category: "Computer Science" },
  { code: "CSCI 420", title: "Quantum Computing for CS", category: "Computer Science" },
  { code: "CS 391", title: "Computing Professions", category: "Computer Science" },
  { code: "CS 390", title: "Computer Science Colloquium", category: "Computer Science" },
  { code: "CS 370", title: "Software Design & Development (Unreal/C++", category: "Computer Science" },
  { code: "CS 250", title: "Software Development Lifecycle", category: "Computer Science" },
  { code: "CS 355", title: "Database Mgt System Design (SQL)", category: "Computer Science" },
  { code: "CS 351", title: "Computer Architecture (LEGV8)", category: "Computer Science" },
  { code: "CS 340", title: "Computer Security and Malware", category: "Computer Science" },
  { code: "CS 315", title: "Data Structures (C++)", category: "Computer Science" },
  { code: "CS 215", title: "Programming II (C++)", category: "Computer Science" },
  { code: "CS 210", title: "Programming Languages (Python, Java, C++)", category: "Computer Science" },
  { code: "IT 235", title: "Database Design", category: "IT" },
  { code: "IT 212", title: "Intro to Computer Networks", category: "IT" },
  { code: "IT 201", title: "Computer Operating Systems", category: "IT" },
  { code: "IT 200", title: "Fundamentals of Info Tech", category: "IT" },
  { code: "IT 145", title: "Foundations in App Development (Java)", category: "IT" },
  { code: "IT 140", title: "Intro to Scripting (Python)", category: "IT" },
  { code: "CS 81.21", title: "Intro to Linux", category: "Computer Science" },
  { code: "CS 50A", title: "Web Development 1 (HTML/CSS)", category: "Computer Science" },
  { code: "CS 12", title: "Assembly Programming (ARM64)", category: "Computer Science" },
  { code: "CS 10B", title: "Programming Concepts (C++)", category: "Computer Science" },
  { code: "CS 10A", title: "Intro to Programming (C++)", category: "Computer Science" }
]

const military = [
  {
    rank: "ITC",
    title: "ITC – Curriculum Chief, Petaluma, CA (2022–Present)",
    description: "Oversaw and updated all apprentice-level training material for IT students. Led a curriculum overhaul aligning 40+ objectives with CompTIA and ACE standards. Piloted an AGILE-based fast-track program for experienced members to reduce training time."
  },
  {
    rank: "IT1",
    title: "IT1 – Lead Instructor, Petaluma, CA (2016–2022)",
    description: "Instructed over 100 junior enlisted members annually in telecommunications systems, VOIP configuration, analog/digital circuits, and advanced trunking. Developed new materials, mentored students, and served as class advisor to 30+ trainees per cycle."
  },
  {
    rank: "IT2",
    title: "IT2 – Independent Duty IT, Homer, AK (2014–2016)",
    description: "Sole technician for shipboard systems supporting 50+ users. Maintained routers, switches, Windows servers, printers, and workstations. Configured equipment for sonar data collection to create navigational maps of Alaskan waterways."
  },
  {
    rank: "IT2",
    title: "IT2 – IT Technician, San Diego, CA (2013–2014)",
    description: "Deployed and reinstalled all IT infrastructure for the Pacific Tactical Law Enforcement Team relocation. Implemented backup schedules and a tracking system for routine server data recovery and audits."
  },
  {
    rank: "IT2",
    title: "IT2 – Forward-Deployed IT, Manama, Bahrain (2012–2013)",
    description: "Maintained systems for over 150 users across 6 deployable cutters. Repaired critical navigation and communication equipment in Kuwait. Oversaw Windows 8 migration across 200+ systems, ensured compatibility and end-user support."
  },
  {
    rank: "IT3",
    title: "IT3 – Shipboard IT, Kodiak, AK (2009–2012)",
    description: "Managed full network and communications stack aboard a Coast Guard cutter in the Bering Sea. Supported classified networks and resolved system issues in extreme conditions."
  },
  {
    rank: "Seaman",
    title: "Seaman – Galveston, TX (2008–2009)",
    description: "Early-career experience aboard a 210' ship in the Gulf of Mexico and Caribbean. Maintained ship readiness and developed foundational maritime and IT skills."
  }
];

const projects = [
  {
    id: 1,
    title: "HTML Parser (C++)",
    description: "This project parses and validates an HTML document, ensuring that all opening and closing tags are properly matched. It uses a custom tokenizer to identify tags and a stack to manage nesting.",
    course: "CS 315 – Data Structures",
    challenges: [
      "Learning how HTML structure works with no prior HTML experience",
      "Implementing a tokenizer (for the first time) to extract valid tag tokens",
      "Managing tag state with a custom stack structure",
      "Properly handling malformed tags and other nasty edge-cases."
    ],
    stack: ["C++", "Tokenizer", "Parser", "Custom Stack"],
    github: "https://github.com/confuzledandlost/HTML_Parser",
    image: "/images/projects/html-parser.png",
    download: "/downloads/html-parser.zip"
  },
  {
    id: 2,
    title: "Personal Portfolio Website",
    description: "A fully custom, dynamic, and mobile-responsive portfolio built with React and Vite. Showcases military experience, academic coursework, and software projects with clean modals and dark mode support.",
    course: "Personal Project",
    challenges: [
      "Migrating from Tailwind to CSS Modules for full styling control",
      "Deploying with GitHub Pages using Vite's build pipeline",
      "Creating a dynamic modal system for project content",
      "Integrating transcripts and auto-sorting course history"
    ],
    stack: ["React", "Vite", "CSS Modules", "Framer Motion", "GitHub Pages"],
    github: "https://github.com/confuzledandlost/confuzledandlost.github.io",
    image: "/images/projects/portfolio-site.png",
    download: null
  },
  {
    id: 3,
    title: "Make Simulator (C++)",
    description: "A simplified implementation of the UNIX `make` utility that builds a dependency graph, detects cycles, and executes shell commands based on a custom makefile format.",
    course: "CS 450 – Operating Systems",
    challenges: [
      "Parsing custom makefile syntax using tokenization",
      "Constructing and traversing a dependency graph",
      "Detecting and preventing cyclic dependencies",
      "Handling shell command execution with system calls",
      "Timestamp validation for rebuild logic"
    ],
    stack: ["C++17", "Makefile", "Dependency Graph", "Tokenizer", "System Calls"],
    github: "https://github.com/confuzledandlost/Make_Simulator",
    image: "/images/projects/make-simulator.png",
    download: "/downloads/html-parser.zip"
  }

];

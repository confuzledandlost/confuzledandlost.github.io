import { useState, useEffect } from "react"
import { Github, Linkedin, FileText, Sun, Moon, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import styles from "./Portfolio.module.css"
import ranks from "./ranks"

const courses = [
  { code: "CS 215", title: "Programming II", category: "Computer Science" },
  { code: "CS 355", title: "Database Mgt System Design", category: "Computer Science" },
  { code: "CS 315", title: "Data Structures", category: "Computer Science" },
  { code: "CS 370", title: "Software Design & Development", category: "Computer Science" },
  { code: "CS 340", title: "Computer Security and Malware", category: "Computer Science" },
  { code: "CS 351", title: "Computer Architecture", category: "Computer Science" },
  { code: "CS 390", title: "Computer Science Colloquium", category: "Computer Science" },
  { code: "CS 415", title: "Algorithm Analysis", category: "Computer Science" },
  { code: "CS 460", title: "Programming Languages", category: "Computer Science" },
  { code: "CS 450", title: "Operating Systems", category: "Computer Science" },
  { code: "CS 454", title: "Theory of Computation", category: "Computer Science" },
  { code: "CS 495", title: "Quant Comp Sim & Visual Tutor", category: "Computer Science" },
  { code: "CS 496", title: "Senior Research Project", category: "Computer Science" },
  { code: "CS 50A", title: "Web Development 1", category: "Computer Science" },
  { code: "CS 10A", title: "Intro to Programming", category: "Computer Science" },
  { code: "CS 10B", title: "Programming Concepts", category: "Computer Science" },
  { code: "CS 12", title: "Assembly Programming", category: "Computer Science" },
  { code: "CS 81.21", title: "Intro to Linux", category: "Computer Science" },
  { code: "CYB 220", title: "Network Security", category: "Cybersecurity" },
  { code: "CYB 230", title: "Operating System Security", category: "Cybersecurity" },
  { code: "CYB 240", title: "Application Security", category: "Cybersecurity" },
  { code: "CYB 250", title: "Cyber Defense", category: "Cybersecurity" },
  { code: "CYB 260", title: "Legal Cybersecurity", category: "Cybersecurity" },
  { code: "CYB 300", title: "System and Communication Security", category: "Cybersecurity" },
  { code: "CYB 310", title: "Network Defense", category: "Cybersecurity" },
  { code: "CYB 320", title: "Incident Response and Investigation", category: "Cybersecurity" },
  { code: "CYB 400", title: "Security Assessment and Auditing", category: "Cybersecurity" },
  { code: "CSCI 420", title: "Quantum Computing for CS", category: "Computer Science" },
  { code: "IT-145", title: "Foundations in App Development (Java)", category: "IT" },
  { code: "IT-140", title: "Intro to Scripting (Python)", category: "IT" },
  { code: "IT-201", title: "Computer Operating Systems", category: "IT" },
  { code: "IT-212", title: "Intro to Computer Networks", category: "IT" }
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
    description: "Early-career experience aboard a 210’ ship in the Gulf of Mexico and Caribbean. Maintained ship readiness and developed foundational maritime and IT skills."
  }
];

const Card = ({ children }) => (
  <div className={styles.card}>{children}</div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`${styles.cardContent} ${className}`}>{children}</div>
);

const Button = ({ children, variant = "default", className = "", ...props }) => {
  const styleMap = {
    default: styles.button,
    outline: styles.buttonOutline,
    ghost: styles.buttonGhost
  }
  return (
    <button className={`${styleMap[variant] || styleMap.default} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default function Portfolio() {
  const [filter, setFilter] = useState("All")
  const [isDark, setIsDark] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark")
    else document.documentElement.classList.remove("dark")
  }, [isDark])

  const filteredCourses =
    filter === "All" ? courses : courses.filter((c) => c.category === filter)

  return (
    <main className={styles.main}>
      <section className={styles.sectionCentered}>
        <div className={styles.themeToggleRow}>
          <Button variant="ghost" onClick={() => setIsDark(!isDark)}>
            {isDark ? <Sun className={styles.icon} /> : <Moon className={styles.icon} />}
          </Button>
        </div>
        <motion.h1
          className={styles.heroTitle}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Brandon Robinson
        </motion.h1>
        <p className={styles.heroSubtitle}>
          Chief Information Systems Technician | Aspiring Software Engineer
        </p>
        <div className={styles.iconRow}>
          <a href="https://github.com/confuzledandlost" target="_blank" rel="noopener noreferrer">
            <Github />
          </a>
          <a href="https://www.linkedin.com/in/brandon-robinson-uscg/" target="_blank" rel="noopener noreferrer">
            <Linkedin />
          </a>
          <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer">
            <FileText />
          </a>
        </div>
      </section>

      <section className={styles.sectionNarrow}>
        <h2 className={styles.sectionTitle}>About Me</h2>
        <p>
          I’m a U.S. Coast Guard Chief Information Systems Technician and full-time Computer Science major at Sonoma State University. With a background in cybersecurity, curriculum development, and IT infrastructure, I’m pivoting into software engineering and academic research in computer science.
        </p>
      </section>

      <section className={styles.sectionWide}>
        <h2 className={styles.sectionTitle}>Featured Projects</h2>
        <div className={styles.cardGrid}>
          <Card>
            <CardContent>
              <h3 className={styles.cardTitle}>HTML Parser</h3>
              <p>A C++ program that parses and validates HTML structure using a tokenizer and tag stack.</p>
              <Button variant="outline" onClick={() => setModalOpen(true)}>View More</Button>
            </CardContent>
          </Card>
        </div>

        <AnimatePresence>
          {modalOpen && (
            <motion.div className={styles.modalOverlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div className={styles.modal} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}>
                <button onClick={() => setModalOpen(false)} className={styles.modalClose}>
                  <X />
                </button>
                <h3 className={styles.modalTitle}>HTML Parser (C++)</h3>
                <p>This project parses and validates an HTML document, ensuring that all opening and closing tags are properly matched. It uses a custom tokenizer to identify tags and a stack to manage nesting.</p>
                <p className={styles.modalSubtitle}>Course: CS 315 – Data Structures</p>
                <div>
                  <h4 className={styles.modalSubheading}>Key Challenges:</h4>
                  <ul className={styles.list}>
                    <li>Learning how HTML structure works from scratch</li>
                    <li>Implementing a tokenizer to extract valid tag tokens</li>
                    <li>Managing tag state with a custom stack structure</li>
                  </ul>
                </div>
                <div className={styles.downloadLinkWrapper}>
                  <a href="/downloads/html-parser.zip" className={styles.downloadLink}>Download Code (ZIP)</a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <section className={styles.sectionWide}>
        <h2 className={styles.sectionTitle}>Course History</h2>
        <div className={styles.filterButtons}>
          {['All', 'Computer Science', 'Cybersecurity', 'IT'].map(category => (
            <Button key={category} variant={filter === category ? 'default' : 'outline'} onClick={() => setFilter(category)}>
              {category}
            </Button>
          ))}
        </div>
        <ul className={styles.courseList}>
          {filteredCourses.map((course, index) => (
            <li key={index} className={styles.courseItem}>
              <strong>{course.code}</strong>: {course.title} <span className={styles.courseCategory}>({course.category})</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.sectionWide}>
        <h2 className={styles.sectionTitle}>Military Experience</h2>
        <p className={styles.textCenter}>Over 17 years of service in the United States Coast Guard as an Information Systems Technician with leadership, instructional, and hands-on technical responsibilities.</p>
        <div className={styles.rankGrid}>
          {military.map((item, idx) => (
            <Card key={idx}>
              <CardContent>
                <div className={styles.rankHeading}>
                  <img src={ranks[item.rank]} alt={`${item.rank} Rank`} className={styles.rankIcon} />
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                </div>
                <p>{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className={styles.sectionWide}>
        <h2 className={styles.sectionTitle}>Resume</h2>
        <div className={styles.resumeViewer}>
          <embed src="/Resume.pdf" type="application/pdf" width="100%" height="800px" />
        </div>
      </section>

      <section className={styles.sectionWide}>
        <h2 className={styles.sectionTitle}>Contact</h2>
        <p>You can reach me via LinkedIn, GitHub, or by reviewing my resume above. I'm always open to exciting career opportunities or collaborations.</p>
      </section>
    </main>
  )
}


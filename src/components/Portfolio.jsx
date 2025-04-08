import { useState, useEffect } from "react"
import { Github, Linkedin, FileText, Sun, Moon, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import styles from "./Portfolio.module.css"
import ranks from "./ranks"

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
  const [filter, setFilter] = useState("Computer Science")
  const [showResume, setShowResume] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const modalOpen = selectedProject !== null
  const [isDark, setIsDark] = useState(() => {
  const savedTheme = localStorage.getItem('theme')
  return savedTheme === null ? true : savedTheme === 'dark'
})

useEffect(() => {
  if (isDark) document.documentElement.classList.add("dark")
  else document.documentElement.classList.remove("dark")
  localStorage.setItem('theme', isDark ? 'dark' : 'light')
}, [isDark])

  useEffect(() => {
    if (modalOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
  }, [selectedProject])

const categories = ['Computer Science', 'Cybersecurity', 'IT', 'All'];

const getCategoryCount = (category) =>
  category === 'All'
    ? courses.length
    : courses.filter((c) => c.category === category).length;

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
            <Github className={styles.icon} />
          </a>
          <a href="https://www.linkedin.com/in/brandon-robinson-uscg/" target="_blank" rel="noopener noreferrer">
            <Linkedin className={styles.icon}/>
          </a>
          <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer">
            <FileText className={styles.icon}/>
          </a>
        </div>
      </section>

      <section className={styles.sectionNarrow}>
        <h2 className={styles.sectionTitle}>About Me</h2>
        <p>
          I’m a U.S. Coast Guard Chief Information Systems Technician and full-time Computer Science major at Sonoma State University. With a background in cybersecurity, curriculum development, and IT infrastructure, I’m pivoting into software engineering and academic research in computer science.
        </p>
      </section>

      <section className={styles.sectionNarrow}>
        <h2 className={styles.sectionTitle}>Featured Projects</h2>
        <div className={styles.cardGrid}>
	  {projects.map((project) => (
	    <Card key={project.id}>
	      <CardContent>
		<h3 className={styles.cardTitle}>{project.title}</h3>
		<p>{project.description}</p>
		<Button variant="outline" onClick={() => {
		  setSelectedProject(project)
		}}>
        	  View More
      		</Button>
    	      </CardContent>
  	    </Card>
	  ))}
        </div>

<AnimatePresence>
  {selectedProject && (
    <motion.div
      className={styles.modalOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={styles.modal}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
      >
        <button
          onClick={() => setSelectedProject(null)}
          className={styles.modalClose}
        >
          <X />
        </button>

        <h3 className={styles.modalTitle}>{selectedProject.title}</h3>
        <p>{selectedProject.description}</p>
        <p className={styles.modalSubtitle}>Course: {selectedProject.course}</p>

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

      </section>

      <section className={styles.sectionWide}>
	<h2 className={styles.sectionTitle}>Professional/Academic Credentials</h2>
	  <p>
	    Throughout my IT career, I have obtained various CompTIA certifications like A+ and Net+, as well as Master Training Specialist for curriculum development. I am graduating from Sonoma State University with a Bachelor of Science in Computer Science with distinction and honors. Additionaly, while on active duty, I obtained a Bachelor of Science in Cybersecurity with an Applied Mathematics Minor and highest honors.
	  </p>
	  <div className={styles.viewButtonContainer}>
	    <Button onClick={() => setShowCourses(!showCourses)}>
	      {showCourses ? "Hide Course History" : "View Course History"}
	    </Button>
	  </div>

	  <AnimatePresence>
	    {showCourses && (
	      <motion.div
		initial={{ opacity: 0, height: 0, overflow: "hidden" }}
		animate={{ opacity: 1, height: "auto", overflow: "visible" }}
		exit={{ opacity: 0, height: 0, overflow: "hidden" }}
		transition={{ duration: 0.5, ease: "easeInOut" }}
	      >
		<div className={styles.filterButtons}>
		  {categories.map(category => (
		    <Button
		      key={category}
		      variant={filter === category ? 'default' : 'outline'}
		      onClick={() => setFilter(category)}
		>
                  {category} ({getCategoryCount(category)})
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
      	  </motion.div>
    	)}
      </AnimatePresence>
    </section>

      <section className={styles.sectionNarrow}>
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
     
      <section className={styles.sectionCentered}>
  <h2 className={styles.sectionTitle}>Resume</h2>
  
  <div className={styles.resumeButtons}>
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
  </div>
  
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
</section>

      <section className={styles.sectionCentered}>
        <h2 className={styles.sectionTitle}>Contact</h2>
        <p>You can reach me via LinkedIn, GitHub, or by reviewing my resume above.</p>
        <div className={styles.iconRow}>
          <a href="https://github.com/confuzledandlost" target="_blank" rel="noopener noreferrer">
            <Github className={styles.icon}/>
          </a>
          <a href="https://www.linkedin.com/in/brandon-robinson-uscg/" target="_blank" rel="noopener noreferrer">
            <Linkedin className={styles.icon}/>
          </a>
          <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer">
            <FileText className={styles.icon}/>
          </a>
        </div>
      </section>
    </main>
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
    description: "Early-career experience aboard a 210’ ship in the Gulf of Mexico and Caribbean. Maintained ship readiness and developed foundational maritime and IT skills."
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
    download: "/downloads/html-parser.zip"
  }
];

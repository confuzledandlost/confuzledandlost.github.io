import { useState, useEffect } from "react";
import { Github, Linkedin, FileText, Sun, Moon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Card = ({ children }) => (
  <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4">{children}</div>
);

const CardContent = ({ children }) => (
  <div className="space-y-2">{children}</div>
);

const Button = ({ children, variant = "default", ...props }) => {
  const base = "px-4 py-2 rounded font-medium transition";
  const styles =
    variant === "outline"
      ? "border border-gray-500 text-gray-700 dark:text-gray-200 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700"
      : "bg-blue-600 text-white hover:bg-blue-700";

  return (
    <button className={`${base} ${styles}`} {...props}>
      {children}
    </button>
  );
};

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

const ranks = {
  "ITC": "/images/ranks/itc.png",
  "IT1": "/images/ranks/it1.png",
  "IT2": "/images/ranks/it2.png",
  "IT3": "/images/ranks/it3.png",
  "Seaman": "/images/ranks/seaman.png"
}

export default function Portfolio() {
  const [filter, setFilter] = useState("All")
  const [isDark, setIsDark] = useState(false)
  const [modalOpen, setModalOpen] = useState(false);


  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  const filteredCourses =
    filter === "All" ? courses : courses.filter((c) => c.category === filter)

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 p-4 md:p-8 space-y-12">

      {/* Hero Section */}
      <section className="text-center space-y-4">
        <div className="flex justify-end">
          <Button variant="ghost" onClick={() => setIsDark(!isDark)}>
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
        <motion.h1
          className="text-4xl md:text-5xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Brandon Robinson
        </motion.h1>
        <p className="text-lg md:text-xl">Chief Information Systems Technician | Aspiring Software Engineer</p>
        <div className="flex justify-center gap-4 text-2xl">
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

      {/* About Section */}
      <section className="max-w-3xl mx-auto text-center space-y-4">
        <h2 className="text-3xl font-semibold">About Me</h2>
        <p>
          I’m a U.S. Coast Guard Chief Information Systems Technician and full-time Computer Science major at Sonoma State University. With a background in cybersecurity, curriculum development, and IT infrastructure, I’m pivoting into software engineering and academic research in computer science.
        </p>
      </section>

      {/* Projects Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-center">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="space-y-2">
              <h3 className="text-xl font-bold">HTML Parser</h3>
              <p>A C++ program that parses and validates HTML structure using a tokenizer and tag stack.</p>
              <Button variant="outline" onClick={() => setModalOpen(true)}>View More</Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-2">
              <h3 className="text-xl font-bold">Make Simulator</h3>
              <p>A C++ program that simulates the functionality of `make`, building targets from a dependency tree based on timestamp analysis.</p>
              <Button variant="outline">View More</Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-2">
              <h3 className="text-xl font-bold">C-like Interpreter</h3>
              <p>Parses and evaluates a C-style language using recursive descent, an AST, and a symbol table.</p>
              <Button variant="outline">View More</Button>
            </CardContent>
          </Card>
        </div>

         {/* Modal */}
         <AnimatePresence>
          {modalOpen && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl shadow-xl max-w-2xl w-full p-6 space-y-4 relative"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
              >
                <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-red-500">
                  <X />
                </button>
                <h3 className="text-2xl font-bold">HTML Parser (C++)</h3>
                <p>This project parses and validates an HTML document, ensuring that all opening and closing tags are properly matched. It uses a custom tokenizer to identify tags and a stack to manage nesting.</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Course: CS 315 – Data Structures</p>
                <div className="space-y-2">
                  <h4 className="font-semibold">Key Challenges:</h4>
                  <ul className="list-disc list-inside text-sm">
                    <li>Learning how HTML structure works from scratch</li>
                    <li>Implementing a tokenizer to extract valid tag tokens</li>
                    <li>Managing tag state with a custom stack structure</li>
                  </ul>
                </div>
                <div className="pt-4">
                  <a href="/downloads/html-parser.zip" className="text-blue-600 underline">Download Code (ZIP)</a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Course History Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-center">Course History</h2>
        <div className="flex justify-center gap-4 flex-wrap">
          {['All', 'Computer Science', 'Cybersecurity', 'IT'].map((cat) => (
            <Button key={cat} variant={filter === cat ? "default" : "outline"} onClick={() => setFilter(cat)}>
              {cat}
            </Button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {filteredCourses.map((course) => (
            <Card key={course.code}>
              <CardContent>
                <strong>{course.code}</strong> – {course.title}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

{/* Coast Guard Experience */}
      <section className="space-y-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-center">Military Experience</h2>
        <p className="text-center max-w-2xl mx-auto">Over 17 years of service in the United States Coast Guard as an Information Systems Technician with leadership, instructional, and hands-on technical responsibilities.</p>
        <div className="space-y-4">
          <Card><CardContent>
            <div className="flex items-center gap-4">
              <img src={ranks.ITC} alt="ITC Rank" className="w-10 h-10" />
              <h3 className="text-xl font-bold">ITC – Curriculum Chief, Petaluma, CA (2022–Present)</h3>
            </div>
            <p>Oversaw and updated all apprentice-level training material for IT students. Led a curriculum overhaul aligning 40+ objectives with CompTIA and ACE standards. Piloted an AGILE-based fast-track program for experienced members to reduce training time.</p>
          </CardContent></Card>

          <Card><CardContent>
            <div className="flex items-center gap-4">
              <img src={ranks.IT1} alt="IT1 Rank" className="w-10 h-10" />
              <h3 className="text-xl font-bold">IT1 – Lead Instructor, Petaluma, CA (2016–2022)</h3>
            </div>
            <p>Instructed over 100 junior enlisted members annually in telecommunications systems, VOIP configuration, analog/digital circuits, and advanced trunking. Developed new materials, mentored students, and served as class advisor to 30+ trainees per cycle.</p>
          </CardContent></Card>

          <Card><CardContent>
            <div className="flex items-center gap-4">
              <img src={ranks.IT2} alt="IT2 Rank" className="w-10 h-10" />
              <h3 className="text-xl font-bold">IT2 – Independent Duty IT, Homer, AK (2014–2016)</h3>
            </div>
            <p>Sole technician for shipboard systems supporting 50+ users. Maintained routers, switches, Windows servers, printers, and workstations. Configured equipment for sonar data collection to create navigational maps of Alaskan waterways.</p>
          </CardContent></Card>

          <Card><CardContent>
            <div className="flex items-center gap-4">
              <img src={ranks.IT2} alt="IT2 Rank" className="w-10 h-10" />
              <h3 className="text-xl font-bold">IT2 – IT Technician, San Diego, CA (2013–2014)</h3>
            </div>
            <p>Deployed and reinstalled all IT infrastructure for the Pacific Tactical Law Enforcement Team relocation. Implemented backup schedules and a tracking system for routine server data recovery and audits.</p>
          </CardContent></Card>

          <Card><CardContent>
            <div className="flex items-center gap-4">
              <img src={ranks.IT2} alt="IT2 Rank" className="w-10 h-10" />
              <h3 className="text-xl font-bold">IT2 – Forward-Deployed IT, Manama, Bahrain (2012–2013)</h3>
            </div>
            <p>Maintained systems for over 150 users across 6 deployable cutters. Repaired critical navigation and communication equipment in Kuwait. Oversaw Windows 8 migration across 200+ systems, ensured compatibility and end-user support.</p>
          </CardContent></Card>

          <Card><CardContent>
            <div className="flex items-center gap-4">
              <img src={ranks.IT3} alt="IT3 Rank" className="w-10 h-10" />
              <h3 className="text-xl font-bold">IT3 – Shipboard IT, Kodiak, AK (2009–2012)</h3>
            </div>
            <p>Managed full network and communications stack aboard a Coast Guard cutter in the Bering Sea. Supported classified networks and resolved system issues in extreme conditions.</p>
          </CardContent></Card>

          <Card><CardContent>
            <div className="flex items-center gap-4">
              <img src={ranks.Seaman} alt="Seaman Rank" className="w-10 h-10" />
              <h3 className="text-xl font-bold">Seaman – Galveston, TX (2008–2009)</h3>
            </div>
            <p>Early-career experience aboard a 210’ ship in the Gulf of Mexico and Caribbean. Maintained ship readiness and developed foundational maritime and IT skills.</p>
          </CardContent></Card>
        </div>
      </section>

      {/* Resume Section */}
      <section className="text-center space-y-6">
        <h2 className="text-3xl font-semibold">My Resume</h2>
        <iframe src="/Resume.pdf" className="w-full max-w-4xl mx-auto h-[800px] border shadow-md" />
        <p><a href="/Resume.pdf" target="_blank" className="text-blue-600 font-medium">Download PDF</a></p>
      </section>

      {/* Contact Section */}
      <section className="text-center space-y-4">
        <h2 className="text-3xl font-semibold">Let’s Connect</h2>
        <p>Email: <a href="mailto:brandon.clark.robinson@gmail.com" className="text-blue-600">brandon.clark.robinson@gmail.com</a></p>
      </section>

    </main>
  )
}


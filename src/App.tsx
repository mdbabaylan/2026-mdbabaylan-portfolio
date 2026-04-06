import React from 'react';
import { 
  Code2, 
  Cpu, 
  Globe, 
  Terminal, 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink,
  ChevronRight,
  User,
  Layers,
  Zap,
  FileText,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
}

interface SkillTagProps {
  label: string;
  level: number; // 0-100
}

// --- Components ---

const LiveClock: React.FC = () => {
  const [time, setTime] = React.useState<string>('');
  
  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utc8Time = new Date(now.getTime() + (8 * 60 * 60 * 1000));
      const hours = String(utc8Time.getUTCHours()).padStart(2, '0');
      const minutes = String(utc8Time.getUTCMinutes()).padStart(2, '0');
      const seconds = String(utc8Time.getUTCSeconds()).padStart(2, '0');
      setTime(`${hours}:${minutes}:${seconds}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <span className="label-metadata text-[10px] font-mono text-on-surface-variant">
      UTC+8: {time}
    </span>
  );
};

const ContactForm: React.FC = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Portfolio Contact from ${name}`;
    const body = `From: ${name} (${email})\n\nMessage:\n${message}`;
    window.location.href = `mailto:matmatmark@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-6 bg-surface border border-primary/30 text-center">
        <p className="text-primary font-mono mb-2">MESSAGE_READY_TO_SEND</p>
        <p className="text-sm text-on-surface-variant">Your email client should have opened. If not, email me directly at matmatmark@gmail.com</p>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="IDENTIFIER (NAME)" 
          className="input-field" 
          required 
        />
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="RETURN_ADDRESS (EMAIL)" 
          className="input-field" 
          required 
        />
      </div>
      <textarea 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="MESSAGE_PAYLOAD" 
        rows={4} 
        className="input-field w-full resize-none" 
        required
      ></textarea>
      <button type="submit" className="btn-primary w-full md:w-auto px-12">SEND_MESSAGE</button>
    </form>
  );
};

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-6 py-4 transition-colors duration-200 group ${
      active ? 'bg-surface-high text-primary border-l-2 border-primary' : 'text-on-surface-variant hover:bg-surface-low hover:text-on-surface'
    }`}
  >
    <Icon size={20} className={active ? 'text-primary' : 'group-hover:text-primary'} />
    <span className="label-metadata text-xs font-medium">{label}</span>
  </button>
);

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, tags, link, github }) => (
  <div className="card border-l-2 border-outline-variant/10 hover:border-primary/30 group flex flex-col h-full">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-xl font-bold tracking-tighter uppercase text-on-surface group-hover:text-primary transition-colors">{title}</h3>
      <div className="flex gap-3">
        {github && <a href={github} className="text-on-surface-variant hover:text-primary"><Github size={18} /></a>}
        {link && <a href={link} className="text-on-surface-variant hover:text-primary"><ExternalLink size={18} /></a>}
      </div>
    </div>
    <p className="text-sm text-on-surface-variant mb-6 flex-1 leading-relaxed">
      {description}
    </p>
    <div className="flex flex-wrap gap-2 mt-auto">
      {tags.map(tag => (
        <span key={tag} className="label-metadata text-[9px] bg-surface-high px-2 py-1 border border-outline-variant/10">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const ExperienceLog: React.FC = () => (
  <div className="bg-surface-low p-6 font-mono text-xs overflow-hidden">
    <div className="flex justify-between items-center mb-4 border-b border-outline-variant/10 pb-2">
      <span className="label-metadata">CAREER_EXECUTION_LOG</span>
      <span className="text-primary animate-pulse">ACTIVE_HISTORY</span>
    </div>
    <div className="space-y-4 text-on-surface-variant">
      <div className="relative pl-4 border-l border-primary/30">
        <div className="absolute -left-[4.5px] top-0 w-2 h-2 bg-primary" />
        <p className="text-on-surface font-bold">[2025 - PRESENT] TECHNICAL_OPERATIONS_CONSULTANT @ BARLY_PHARMACY</p>
        <p className="mt-1">Direct operations support for family-run business. SSS compliance, payroll systems, IT infrastructure, print operations. Multi-hat ops work.</p>
      </div>
      <div className="relative pl-4 border-l border-outline-variant/30">
        <div className="absolute -left-[4.5px] top-0 w-2 h-2 bg-outline-variant" />
        <p className="text-on-surface font-bold">[2023 - 2025] FRONTEND_DEVELOPER @ ARCHINTEL</p>
        <p className="mt-1">Built Salesforce backends with Apex/Visualforce. Created email systems, updated UIs, built reports, managed Jira/Basecamp workflows, client support.</p>
      </div>
      <div className="relative pl-4 border-l border-outline-variant/30">
        <div className="absolute -left-[4.5px] top-0 w-2 h-2 bg-outline-variant" />
        <p className="text-on-surface font-bold">[2021 - 2023] OPERATIONS_ASSOCIATE @ BARLY_PHARMACY</p>
        <p className="mt-1">Logistics & inventory, customer operations, admin & compliance, property management. Jack of all trades, master of getting things done.</p>
      </div>
      <div className="relative pl-4 border-l border-outline-variant/30">
        <div className="absolute -left-[4.5px] top-0 w-2 h-2 bg-outline-variant" />
        <p className="text-on-surface font-bold">[2020 - 2021] SOFTWARE_ENGINEER_3 @ CLOUD_PANDA_PH</p>
        <p className="mt-1">Built & maintained projects serving internal teams. Communicated with QA, managers regarding code fixes and project updates.</p>
      </div>
      <div className="relative pl-4 border-l border-outline-variant/30">
        <div className="absolute -left-[4.5px] top-0 w-2 h-2 bg-outline-variant" />
        <p className="text-on-surface font-bold">[2019 - 2020] SYSTEM_ANALYST @ PSBANK</p>
        <p className="mt-1">System development using React JS, .NET Core WEB API, SQL Server, Oracle DB. Application support for Daily Attendance Record, HR and Trust Division systems.</p>
      </div>
      <div className="relative pl-4 border-l border-outline-variant/30">
        <div className="absolute -left-[4.5px] top-0 w-2 h-2 bg-outline-variant" />
        <p className="text-on-surface font-bold">[2019] DESIGN_ENGINEER_TRAINEE @ TSUKIDEN_GLOBAL</p>
        <p className="mt-1">Unit testing of C code snippets with custom tools. Documentation with Microsoft Word and Excel.</p>
      </div>
      <div className="relative pl-4 border-l border-outline-variant/30">
        <div className="absolute -left-[4.5px] top-0 w-2 h-2 bg-outline-variant" />
        <p className="text-on-surface font-bold">[2018] COMPUTER_PROGRAMMER @ HELIX_SOFTWARE</p>
        <p className="mt-1">Website layouts with HTML, CSS, jQuery, SenchaJS, Bootstrap. Brochure designs, logos with Adobe Photoshop. User support with MySQL, SQL Server.</p>
      </div>
      <div className="relative pl-4 border-l border-outline-variant/30">
        <div className="absolute -left-[4.5px] top-0 w-2 h-2 bg-outline-variant" />
        <p className="text-on-surface font-bold">[2018] INTERN_BACK_END_DEV @ AND_DIGITAL</p>
        <p className="mt-1">Design layouts with HTML/CSS. Beer tap app with .NET Web API and AngularJS. iOS app policy research.</p>
      </div>
    </div>
  </div>
);

const SkillModule: React.FC<SkillTagProps> = ({ label, level }) => (
  <div className="p-4 bg-surface hover:bg-surface-high transition-colors group">
    <div className="flex justify-between items-center mb-2">
      <span className="text-xs font-mono text-on-surface">{label}</span>
      <span className="label-metadata text-[8px]">{level}%</span>
    </div>
    <div className="h-1 bg-surface-high">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        className="h-full bg-primary/60 group-hover:bg-primary transition-colors"
      />
    </div>
  </div>
);

// --- Main App Component ---

export default function App() {
  const [activeSection, setActiveSection] = React.useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setIsSidebarOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-surface text-on-surface overflow-x-hidden">
      {/* Mobile Header */}
      <header className="lg:hidden h-20 bg-surface border-b border-outline-variant/10 flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary flex items-center justify-center">
            <Code2 size={20} className="text-on-primary" />
          </div>
          <h1 className="text-xl font-bold tracking-tighter uppercase">MDB.sh</h1>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-on-surface-variant hover:text-primary transition-colors"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar / Mobile Menu Overlay */}
      <AnimatePresence>
        {(isSidebarOpen || window.innerWidth >= 1024) && (
          <motion.aside 
            initial={{ x: -256 }}
            animate={{ x: 0 }}
            exit={{ x: -256 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-surface border-r border-outline-variant/10 flex flex-col z-[60] lg:z-40 ${
              isSidebarOpen ? 'block' : 'hidden lg:flex'
            }`}
          >
            <div className="p-8 mb-4 hidden lg:block">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-primary flex items-center justify-center">
                  <Code2 size={20} className="text-on-primary" />
                </div>
                <h1 className="text-xl font-bold tracking-tighter uppercase">Mark.sh</h1>
              </div>
              <span className="label-metadata text-[9px]">Systems & Full-Stack Engineer</span>
            </div>

            <nav className="flex-1 pt-8 lg:pt-0">
              <NavItem icon={User} label="Identity" active={activeSection === 'home'} onClick={() => scrollTo('home')} />
              <NavItem icon={Layers} label="Projects" active={activeSection === 'projects'} onClick={() => scrollTo('projects')} />
              <NavItem icon={Cpu} label="Tech_Stack" active={activeSection === 'skills'} onClick={() => scrollTo('skills')} />
              <NavItem icon={Terminal} label="Experience" active={activeSection === 'experience'} onClick={() => scrollTo('experience')} />
              <NavItem icon={Mail} label="Connect" active={activeSection === 'contact'} onClick={() => scrollTo('contact')} />
            </nav>

            <div className="p-6 border-t border-outline-variant/10 space-y-4">
              <div className="flex justify-around">
                <a href="https://github.com/mdbabaylan" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors"><Github size={18} /></a>
                <a href="https://www.linkedin.com/in/mbabaylan" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors"><Linkedin size={18} /></a>
                <a href="https://mdbabaylan.github.io/" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors"><Globe size={18} /></a>
              </div>
              <a href="/resume-mark-daniel-babaylan.pdf" download className="w-full btn-secondary text-[10px] py-2 flex items-center justify-center gap-2">
                <FileText size={14} /> DOWNLOAD_CV
              </a>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-surface/80 backdrop-blur-sm z-50 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Desktop Header */}
        <header className="hidden lg:flex h-20 bg-surface border-b border-outline-variant/10 items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-primary shadow-[0_0_8px_rgba(105,218,255,0.4)]" />
            <span className="label-metadata text-[10px]">STATUS: <span className="text-primary">AVAILABLE_FOR_HIRE</span></span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-1 bg-surface-low border border-outline-variant/10">
              <Zap size={14} className="text-primary" />
              <span className="label-metadata text-[9px]">UPTIME: <span className="text-primary">99.99%</span></span>
            </div>
            <LiveClock />
          </div>
        </header>

        {/* Viewport */}
        <div className="flex-1 p-6 lg:p-12 space-y-24 lg:space-y-32">
          {/* Hero Section */}
          <section id="home" className="min-h-[50vh] lg:min-h-[60vh] flex flex-col justify-center">
            <div className="max-w-3xl">
              <span className="label-metadata text-primary mb-4 block tracking-[0.3em]">SYSTEM_INITIALIZED</span>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter uppercase mb-6 leading-none">
                Mark Daniel <span className="text-primary">Babaylan</span>
              </h1>
              <p className="text-lg lg:text-xl text-on-surface-variant leading-relaxed mb-10 font-light">
                Software engineer building agentic systems. I ship across tech, operations, and markets —
                from Vue/Salesforce systems serving 500+ users to AI infrastructure. 
                6+ years of building systems that make decisions under uncertainty.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => scrollTo('projects')} className="btn-primary w-full sm:w-auto">EXPLORE_WORK</button>
                <button onClick={() => scrollTo('contact')} className="btn-secondary w-full sm:w-auto">GET_IN_TOUCH</button>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="space-y-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tighter uppercase mb-2">Featured_Projects</h2>
              <div className="w-20 h-1 bg-primary" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <ProjectCard 
                title="2026 Portfolio" 
                description="Multi-agent development workflow showcase — UI/UX designed with Google Stitch, core architecture generated via Google AI Studio, content and refinements completed with Kimi Code CLI using actual resume data."
                tags={['REACT', 'TYPESCRIPT', 'MULTI_AGENT_WORKFLOW', 'AI_COLLABORATION']}
                github="https://github.com/mdbabaylan/2026-mdbabaylan-portfolio"
                link="https://mdbabaylan.github.io/"
              />
              <ProjectCard 
                title="OpenClaw Setup" 
                description="Documentation and setup guide for OpenClaw, an open-source agentic AI tool. Includes architecture diagram showing my personal workflow."
                tags={['AI_AGENTS', 'OPENCLAW', 'DOCUMENTATION']}
                github="https://github.com/mdbabaylan/mdbabaylan-openclaw-setup"
              />
              <ProjectCard 
                title="ArchIntel Exam" 
                description="AI-assisted rapid build — Vue frontend + custom backend completed in under 24 hours to pass ArchIntel technical exam. Leveraged ChatGPT for architecture decisions."
                tags={['VUE', 'NODE.JS', 'AI_ASSISTED', 'RAPID_PROTOTYPING']}
                github="https://github.com/mdbabaylan/archintel-exam"
                link="https://github.com/mdbabaylan/archintel-exam-mockupserver"
              />
              <ProjectCard 
                title="Hermes Config" 
                description="Configuration for Hermes AI agent — self-improving, skill-equippable alternative to OpenClaw. Reduces dependency risk from single LLM provider downtime (Claude/OpenAI)."
                tags={['AI_AGENTS', 'HERMES', 'LLM', 'INFRASTRUCTURE']}
                github="https://github.com/mdbabaylan/hermes-config"
              />
              <ProjectCard 
                title="Weekly Attestation CLI" 
                description="Automates weekly fitness reports for my fitness group. Compiles macros from Cronometer, exercise and weight data from CSV using local GPU + Ollama for processing."
                tags={['PYTHON', 'OLLAMA', 'LOCAL_LLM', 'AUTOMATION']}
                github="https://github.com/mdbabaylan/weekly-attestation-cli"
              />
              <ProjectCard 
                title="Pourover Mini Calc" 
                description="Minimalist coffee brewing calculator. Made out of frustration from repeatedly pulling out a calculator for morning pourover coffee ratios."
                tags={['SIDE_PROJECT', 'UTILITIES', 'COFFEE']}
                github="https://github.com/mdbabaylan/pourover-mini-calc"
              />
            </div>
          </section>

          {/* Skills & Experience Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 lg:gap-16">
            {/* Skills */}
            <section id="skills" className="xl:col-span-1 space-y-8">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold tracking-tighter uppercase mb-6">Tech_Stack</h2>
                <div className="space-y-1">
                  <SkillModule label="VUE.JS / REACT" level={90} />
                  <SkillModule label="SALESFORCE / APEX" level={85} />
                  <SkillModule label="JAVASCRIPT / TYPESCRIPT" level={92} />
                  <SkillModule label=".NET / C#" level={80} />
                  <SkillModule label="SQL / ORACLE / SQL_SERVER" level={85} />
                  <SkillModule label="AI INFRASTRUCTURE / AGENTS" level={75} />
                </div>
              </div>
              
              <div className="card bg-surface-low">
                <h3 className="label-metadata mb-4">CORE_COMPETENCIES</h3>
                <ul className="space-y-2 text-sm text-on-surface-variant font-mono">
                  <li className="flex items-center gap-2"><ChevronRight size={12} className="text-primary" /> FULL_STACK_DEVELOPMENT</li>
                  <li className="flex items-center gap-2"><ChevronRight size={12} className="text-primary" /> SALESFORCE_DEVELOPMENT</li>
                  <li className="flex items-center gap-2"><ChevronRight size={12} className="text-primary" /> AI_INFRASTRUCTURE</li>
                  <li className="flex items-center gap-2"><ChevronRight size={12} className="text-primary" /> SYSTEMS_ANALYSIS</li>
                  <li className="flex items-center gap-2"><ChevronRight size={12} className="text-primary" /> TECHNICAL_OPERATIONS</li>
                </ul>
              </div>
            </section>

            {/* Experience */}
            <section id="experience" className="xl:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold tracking-tighter uppercase mb-6">Execution_History</h2>
                <ExperienceLog />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card border-t-2 border-primary">
                  <h3 className="label-metadata mb-4">EDUCATION</h3>
                  <p className="text-on-surface font-bold">B.S. INFORMATION TECHNOLOGY</p>
                  <p className="text-xs text-on-surface-variant">Colegio de San Juan de Letran // 2014 - 2018</p>
                  <p className="mt-4 text-xs leading-relaxed text-on-surface-variant">
                    Comprehensive IT education covering software development, systems analysis, 
                    and database management.
                  </p>
                </div>
                <div className="card border-t-2 border-outline-variant/20">
                  <h3 className="label-metadata mb-4">CERTIFICATIONS</h3>
                  <ul className="space-y-3 text-xs text-on-surface-variant">
                    <li className="flex justify-between">
                      <span>JAVASCRIPT BASICS FOR BEGINNERS</span>
                      <span className="text-primary">✓</span>
                    </li>
                    <li className="flex justify-between">
                      <span>MTA-98-375 (HTML5 APP DEV)</span>
                      <span className="text-primary">✓</span>
                    </li>
                    <li className="flex justify-between">
                      <span>EF SET ENGLISH C1 ADVANCED (67/100)</span>
                      <span className="text-primary">✓</span>
                    </li>
                    <li className="flex justify-between">
                      <span>OOP IN JAVASCRIPT</span>
                      <span className="text-primary">✓</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Contact Section */}
          <section id="contact" className="pb-24">
            <div className="card bg-surface-low border-l-4 border-primary p-8 lg:p-12">
              <div className="max-w-2xl">
                <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter uppercase mb-6">Establish_Connection</h2>
                <p className="text-on-surface-variant mb-10 leading-relaxed">
                  Open to remote dev roles — backend, infrastructure, or anywhere I can write solid code and ship. 
                  Prefer fast-moving teams over slow-moving enterprises.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div className="space-y-1">
                    <span className="label-metadata">EMAIL_ADDRESS</span>
                    <p className="text-base lg:text-lg font-mono text-primary break-all">matmatmark@gmail.com</p>
                  </div>
                  <div className="space-y-1">
                    <span className="label-metadata">LOCATION_ORIGIN</span>
                    <p className="text-base lg:text-lg font-mono text-on-surface">PHILIPPINES [UTC+8]</p>
                  </div>
                  <div className="space-y-1">
                    <span className="label-metadata">MOBILE</span>
                    <p className="text-base lg:text-lg font-mono text-primary">09270815174</p>
                  </div>
                  <div className="space-y-1">
                    <span className="label-metadata">LINKEDIN</span>
                    <a href="https://www.linkedin.com/in/mbabaylan" target="_blank" rel="noopener noreferrer" className="text-base lg:text-lg font-mono text-primary hover:underline">linkedin.com/in/mbabaylan</a>
                  </div>
                </div>

                <ContactForm />
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="py-6 lg:h-12 bg-surface border-t border-outline-variant/10 flex flex-col lg:flex-row items-center justify-between px-8 gap-4 text-[9px] font-mono text-on-surface-variant text-center lg:text-left">
          <span>&copy; 2026 MDB_PORTFOLIO_V4.0.1 // ALL_RIGHTS_RESERVED</span>
          <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
            <span>LATENCY: 14MS</span>
            <span>ENCRYPTION: AES-256</span>
            <span className="text-primary">SYSTEM_NOMINAL</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

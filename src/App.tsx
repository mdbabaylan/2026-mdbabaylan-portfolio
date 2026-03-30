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
  FileText
} from 'lucide-react';
import { motion } from 'motion/react';

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
        <p className="text-on-surface font-bold">[2024 - PRESENT] SENIOR_SYSTEMS_ENGINEER @ NEURAL_MESH</p>
        <p className="mt-1">Architecting distributed inference pipelines for LLMs. Reduced latency by 40% using custom Rust-based load balancers.</p>
      </div>
      <div className="relative pl-4 border-l border-outline-variant/30">
        <div className="absolute -left-[4.5px] top-0 w-2 h-2 bg-outline-variant" />
        <p className="text-on-surface font-bold">[2022 - 2024] FULL_STACK_DEVELOPER @ OBSIDIAN_LABS</p>
        <p className="mt-1">Led the transition from monolith to microservices. Implemented real-time data sync using WebSockets and Go.</p>
      </div>
      <div className="relative pl-4 border-l border-outline-variant/30">
        <div className="absolute -left-[4.5px] top-0 w-2 h-2 bg-outline-variant" />
        <p className="text-on-surface font-bold">[2020 - 2022] SOFTWARE_ENGINEER_INTERN @ CLOUD_CORE</p>
        <p className="mt-1">Optimized CI/CD pipelines and managed Kubernetes clusters for high-traffic applications.</p>
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

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex h-screen bg-surface text-on-surface overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-outline-variant/10 flex flex-col">
        <div className="p-8 mb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-primary flex items-center justify-center">
              <Code2 size={20} className="text-on-primary" />
            </div>
            <h1 className="text-xl font-bold tracking-tighter uppercase">Mark.sh</h1>
          </div>
          <span className="label-metadata text-[9px]">Systems & Full-Stack Engineer</span>
        </div>

        <nav className="flex-1">
          <NavItem icon={User} label="Identity" active={activeSection === 'home'} onClick={() => scrollTo('home')} />
          <NavItem icon={Layers} label="Projects" active={activeSection === 'projects'} onClick={() => scrollTo('projects')} />
          <NavItem icon={Cpu} label="Tech_Stack" active={activeSection === 'skills'} onClick={() => scrollTo('skills')} />
          <NavItem icon={Terminal} label="Experience" active={activeSection === 'experience'} onClick={() => scrollTo('experience')} />
          <NavItem icon={Mail} label="Connect" active={activeSection === 'contact'} onClick={() => scrollTo('contact')} />
        </nav>

        <div className="p-6 border-t border-outline-variant/10 space-y-4">
          <div className="flex justify-around">
            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors"><Github size={18} /></a>
            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors"><Linkedin size={18} /></a>
            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors"><Globe size={18} /></a>
          </div>
          <button className="w-full btn-secondary text-[10px] py-2 flex items-center justify-center gap-2">
            <FileText size={14} /> DOWNLOAD_CV
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-surface border-b border-outline-variant/10 flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-primary shadow-[0_0_8px_rgba(105,218,255,0.4)]" />
            <span className="label-metadata text-[10px]">STATUS: <span className="text-primary">AVAILABLE_FOR_HIRE</span></span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-1 bg-surface-low border border-outline-variant/10">
              <Zap size={14} className="text-primary" />
              <span className="label-metadata text-[9px]">UPTIME: <span className="text-primary">99.99%</span></span>
            </div>
            <span className="label-metadata text-[10px] font-mono text-on-surface-variant">UTC: 05:11:51</span>
          </div>
        </header>

        {/* Viewport */}
        <div className="flex-1 overflow-y-auto p-8 space-y-24 scroll-smooth">
          {/* Hero Section */}
          <section id="home" className="min-h-[60vh] flex flex-col justify-center">
            <div className="max-w-3xl">
              <span className="label-metadata text-primary mb-4 block tracking-[0.3em]">SYSTEM_INITIALIZED</span>
              <h1 className="text-7xl font-bold tracking-tighter uppercase mb-6 leading-none">
                Building <span className="text-primary">Monolithic</span> <br />
                Digital Infrastructure.
              </h1>
              <p className="text-xl text-on-surface-variant leading-relaxed mb-10 font-light">
                I architect high-performance systems and scalable web applications. 
                Focused on technical precision, distributed logic, and professional brutality in design.
              </p>
              <div className="flex gap-4">
                <button onClick={() => scrollTo('projects')} className="btn-primary">EXPLORE_WORK</button>
                <button onClick={() => scrollTo('contact')} className="btn-secondary">GET_IN_TOUCH</button>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="space-y-12">
            <div>
              <h2 className="text-4xl font-bold tracking-tighter uppercase mb-2">Featured_Projects</h2>
              <div className="w-20 h-1 bg-primary" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProjectCard 
                title="Project Obsidian" 
                description="A distributed key-value store engine optimized for high-write throughput and low-latency reads. Built with Rust and Raft consensus."
                tags={['RUST', 'DISTRIBUTED_SYSTEMS', 'RAFT']}
                github="#"
              />
              <ProjectCard 
                title="Neural Mesh" 
                description="Real-time AI inference pipeline that scales horizontally across multiple GPU nodes. Handles 10k+ requests per second."
                tags={['PYTHON', 'KUBERNETES', 'PYTORCH']}
                link="#"
              />
              <ProjectCard 
                title="Void OS" 
                description="A minimal microkernel operating system written from scratch to explore memory safety and hardware abstraction layers."
                tags={['C++', 'X86_64', 'ASSEMBLY']}
                github="#"
              />
              <ProjectCard 
                title="Monolith UI" 
                description="The design system used for this portfolio. A React-based component library focusing on technical brutality and high-density data."
                tags={['REACT', 'TYPESCRIPT', 'TAILWIND']}
                github="#"
              />
              <ProjectCard 
                title="Flux Engine" 
                description="A high-frequency trading engine prototype capable of processing market data feeds with sub-millisecond latency."
                tags={['GO', 'WEBSOCKETS', 'REDIS']}
                link="#"
              />
              <ProjectCard 
                title="Core Vault" 
                description="End-to-end encrypted file storage solution with decentralized metadata management and zero-knowledge proofs."
                tags={['NODE.JS', 'CRYPTOGRAPHY', 'IPFS']}
                github="#"
              />
            </div>
          </section>

          {/* Skills & Experience Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Skills */}
            <section id="skills" className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter uppercase mb-6">Tech_Stack</h2>
                <div className="space-y-1">
                  <SkillModule label="TYPESCRIPT / REACT" level={95} />
                  <SkillModule label="RUST / SYSTEMS" level={82} />
                  <SkillModule label="GO / BACKEND" level={88} />
                  <SkillModule label="KUBERNETES / DEVOPS" level={75} />
                  <SkillModule label="POSTGRESQL / SQL" level={90} />
                  <SkillModule label="PYTHON / AI" level={70} />
                </div>
              </div>
              
              <div className="card bg-surface-low">
                <h3 className="label-metadata mb-4">CORE_COMPETENCIES</h3>
                <ul className="space-y-2 text-sm text-on-surface-variant font-mono">
                  <li className="flex items-center gap-2"><ChevronRight size={12} className="text-primary" /> DISTRIBUTED_SYSTEMS</li>
                  <li className="flex items-center gap-2"><ChevronRight size={12} className="text-primary" /> CLOUD_ARCHITECTURE</li>
                  <li className="flex items-center gap-2"><ChevronRight size={12} className="text-primary" /> API_DESIGN_REST_GRPC</li>
                  <li className="flex items-center gap-2"><ChevronRight size={12} className="text-primary" /> PERFORMANCE_OPTIMIZATION</li>
                </ul>
              </div>
            </section>

            {/* Experience */}
            <section id="experience" className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter uppercase mb-6">Execution_History</h2>
                <ExperienceLog />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card border-t-2 border-primary">
                  <h3 className="label-metadata mb-4">EDUCATION</h3>
                  <p className="text-on-surface font-bold">B.S. COMPUTER SCIENCE</p>
                  <p className="text-xs text-on-surface-variant">University of Technology // 2016 - 2020</p>
                  <p className="mt-4 text-xs leading-relaxed text-on-surface-variant">
                    Specialized in Operating Systems and Distributed Computing. 
                    Graduated with honors.
                  </p>
                </div>
                <div className="card border-t-2 border-outline-variant/20">
                  <h3 className="label-metadata mb-4">CERTIFICATIONS</h3>
                  <ul className="space-y-3 text-xs text-on-surface-variant">
                    <li className="flex justify-between">
                      <span>AWS SOLUTIONS ARCHITECT</span>
                      <span className="text-primary">2023</span>
                    </li>
                    <li className="flex justify-between">
                      <span>CKAD (KUBERNETES)</span>
                      <span className="text-primary">2022</span>
                    </li>
                    <li className="flex justify-between">
                      <span>RUST CORE SPECIALIST</span>
                      <span className="text-primary">2021</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Contact Section */}
          <section id="contact" className="pb-24">
            <div className="card bg-surface-low border-l-4 border-primary p-12">
              <div className="max-w-2xl">
                <h2 className="text-5xl font-bold tracking-tighter uppercase mb-6">Establish_Connection</h2>
                <p className="text-on-surface-variant mb-10 leading-relaxed">
                  I am currently open to new opportunities and collaborations. 
                  If you have a project that requires technical precision and monolithic architecture, 
                  let's start the handshake.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div className="space-y-1">
                    <span className="label-metadata">EMAIL_ADDRESS</span>
                    <p className="text-lg font-mono text-primary">matmatmark@gmail.com</p>
                  </div>
                  <div className="space-y-1">
                    <span className="label-metadata">LOCATION_ORIGIN</span>
                    <p className="text-lg font-mono text-on-surface">SAN_FRANCISCO, CA [PST]</p>
                  </div>
                </div>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="IDENTIFIER (NAME)" className="input-field" />
                    <input type="email" placeholder="RETURN_ADDRESS (EMAIL)" className="input-field" />
                  </div>
                  <textarea placeholder="MESSAGE_PAYLOAD" rows={4} className="input-field w-full resize-none"></textarea>
                  <button className="btn-primary w-full md:w-auto px-12">SEND_MESSAGE</button>
                </form>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="h-12 bg-surface border-t border-outline-variant/10 flex items-center justify-between px-8 text-[9px] font-mono text-on-surface-variant">
          <span>&copy; 2026 MARK_PORTFOLIO_V4.0.1 // ALL_RIGHTS_RESERVED</span>
          <div className="flex gap-6">
            <span>LATENCY: 14MS</span>
            <span>ENCRYPTION: AES-256</span>
            <span className="text-primary">SYSTEM_NOMINAL</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

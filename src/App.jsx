import { useState } from "react";
import {
  SiAnsible,
  SiArgo,
  SiDocker,
  SiGithub,
  SiGrafana,
  SiJenkins,
  SiKubernetes,
  SiLinux,
  SiPrometheus,
  SiTerraform,
} from "react-icons/si";

const navItems = [
  ["Bootcamps", "#bootcamps"],
  ["Learning Path", "#learning-path"],
  ["Tools", "#tools"],
  ["About", "#about"],
  ["Community", "#community"],
];

const stats = [
  ["250+", "Learners Trained"],
  ["6+", "Bootcamp Topics"],
  ["2 Days", "Per Bootcamp"],
  ["0 Fluff", "Pure Hands-On"],
];

const devopsTools = [
  {
    name: "Linux",
    icon: SiLinux,
    color: "#f5be04",
    description: "Shell, users, permissions, processes, networking, and system debugging.",
    featured: true,
  },
  { name: "GitHub", icon: SiGithub, color: "#181717", description: "Version control" },
  { name: "Docker", icon: SiDocker, color: "#2496ed", description: "Containers" },
  { name: "Kubernetes", icon: SiKubernetes, color: "#326ce5", description: "Orchestration" },
  { name: "Terraform", icon: SiTerraform, color: "#844fba", description: "Infrastructure as code" },
  { name: "Argo CD", icon: SiArgo, color: "#ef7b4d", description: "GitOps delivery" },
  { name: "Jenkins", icon: SiJenkins, color: "#d24939", description: "Automation server" },
  { name: "Ansible", icon: SiAnsible, color: "#ee0000", description: "Configuration" },
  { name: "Prometheus", icon: SiPrometheus, color: "#e6522c", description: "Metrics" },
  { name: "Grafana", icon: SiGrafana, color: "#f46800", description: "Dashboards" },
];

const pathCards = [
  {
    title: "Linux + Networking",
    body: "The bedrock of all DevOps engineering. Master the command line and protocols.",
    icon: "terminal",
    level: "Fundamental",
    active: true,
  },
  {
    title: "Shell Scripting + Git",
    body: "Automate routine tasks and manage infrastructure code versions effectively.",
    icon: "code_blocks",
    level: "Core",
  },
  {
    title: "Docker",
    body: "Containerize applications for consistent environments across the pipeline.",
    icon: "view_in_ar",
    level: "Intermediate",
  },
  {
    title: "CI/CD Pipelines",
    body: "Automate building, testing, and deployment processes reliably.",
    icon: "route",
    level: "Intermediate",
  },
  {
    title: "Kubernetes",
    body: "Orchestrate container deployments at massive scale.",
    icon: "hub",
    level: "Advanced",
  },
  {
    title: "AWS + Terraform",
    body: "Provision and manage cloud infrastructure as code.",
    icon: "cloud",
    level: "Advanced",
  },
];

const included = [
  "Live Zoom Sessions (Weekend)",
  "Hands-on Lab Exercises",
  "Lifetime Recording Access",
  "Private Community Group",
  "Certificate of Completion",
];

const footerLinks = ["Terms", "Privacy", "Syllabus", "Mentors", "Status", "Support"];

function Icon({ name, className = "", filled = false }) {
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-outlined ${className}`}
      style={{ fontVariationSettings: `'FILL' ${filled ? 1 : 0}` }}
    >
      {name}
    </span>
  );
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant/30 bg-surface/75 shadow-sm backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-content items-center justify-between px-4 md:px-16">
        <a
          href="#top"
          className="flex items-center gap-2 font-headline text-2xl font-bold text-on-surface transition-opacity hover:opacity-80"
        >
          <Icon name="terminal" filled className="text-primary" />
          OnlyDevOps
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="font-mono text-xs font-semibold uppercase text-on-surface-variant transition-colors hover:text-primary"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#community"
            className="hidden rounded-full border border-primary px-6 py-2.5 font-mono text-xs font-semibold uppercase text-primary transition-all hover:bg-primary hover:text-on-primary md:inline-flex"
          >
            Join Community
          </a>
          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((current) => !current)}
            className="inline-flex size-11 items-center justify-center rounded-full text-on-surface transition-colors hover:bg-surface-container-low md:hidden"
          >
            <Icon name={isOpen ? "close" : "menu"} />
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="border-t border-outline-variant/30 bg-surface/95 px-4 py-4 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-content flex-col gap-2">
            {navItems.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-3 font-mono text-sm font-semibold uppercase text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
              >
                {label}
              </a>
            ))}
            <a
              href="#community"
              onClick={() => setIsOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 font-mono text-xs font-semibold uppercase text-on-primary"
            >
              Join Community
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function TerminalVisual() {
  return (
    <div className="relative z-10 flex aspect-square w-full items-center justify-center md:aspect-[4/3]">
      <FloatingLogo
        icon={SiKubernetes}
        label="Kubernetes"
        color="#326ce5"
        className="right-5 top-6 size-16 sm:right-10 sm:top-8 sm:size-[74px]"
      />
      <FloatingLogo
        icon={SiDocker}
        label="Docker"
        color="#2496ed"
        className="bottom-12 left-4 size-14 sm:bottom-20 sm:left-8 sm:size-16"
        reverse
      />
      <FloatingLogo
        icon={SiTerraform}
        label="Terraform"
        color="#844fba"
        className="bottom-4 right-12 hidden size-12 sm:flex"
      />

      <div className="terminal-tilt group relative w-full max-w-md overflow-hidden rounded-2xl border border-gray-800 bg-[#111827] shadow-2xl transition-transform duration-700 ease-out">
        <div className="flex items-center border-b border-gray-800 bg-gray-900 px-4 py-3">
          <div className="flex gap-2">
            <span className="size-3 rounded-full bg-red-500" />
            <span className="size-3 rounded-full bg-yellow-500" />
            <span className="size-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-grow text-center font-mono text-xs font-semibold uppercase text-gray-500">
            bash - root@production
          </div>
        </div>
        <div className="flex min-h-[250px] flex-col gap-3 p-6 font-mono text-sm font-medium leading-6 text-gray-300">
          <Command command="kubectl get pods -n kube-system" />
          <Output lines={["NAME", "coredns-6d4b75cb6d-abcde", "kube-proxy-fghij"]} />
          <Command command="terraform init" className="mt-2" />
          <Output lines={["Initializing the backend...", "Terraform has been successfully initialized!"]} />
          <div className="mt-2 flex gap-2">
            <span className="text-primary-fixed-dim">$</span>
            <span>
              docker build -t app .
              <span className="ml-1 inline-block h-4 w-2 animate-pulse align-middle bg-gray-300" />
            </span>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
      </div>
    </div>
  );
}

function FloatingLogo({ icon: Logo, label, color, className = "", reverse = false }) {
  return (
    <div
      aria-label={label}
      className={`absolute ${reverse ? "animate-float-reverse" : "animate-float"} flex items-center justify-center rounded-2xl border border-outline-variant/25 bg-white/90 shadow-ambient backdrop-blur ${className}`}
    >
      <Logo aria-hidden="true" className="text-[48px]" style={{ color }} />
    </div>
  );
}

function Command({ command, className = "" }) {
  return (
    <div className={`flex gap-2 ${className}`}>
      <span className="text-primary-fixed-dim">$</span>
      <span>{command}</span>
    </div>
  );
}

function Output({ lines }) {
  return (
    <div className="text-sm leading-6 text-gray-500">
      {lines.map((line) => (
        <div key={line}>{line}</div>
      ))}
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-24 pt-20 md:pb-32 md:pt-24">
      <div className="hero-glow absolute inset-0 -z-10" />
      <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-16 px-4 md:px-16 lg:grid-cols-2">
        <div className="z-10 flex flex-col items-start gap-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-outline-variant/50 bg-surface-container px-3 py-1.5 font-mono text-xs font-semibold uppercase text-on-surface-variant">
            <span className="size-2 rounded-full bg-primary" />
            Taught by a working DevOps engineer
          </div>
          <div className="space-y-6">
            <h1 className="font-headline text-5xl font-extrabold leading-tight text-on-surface sm:text-6xl lg:text-7xl">
              Learn DevOps
              <br />
              <span className="text-primary">The Real Way</span>
            </h1>
            <p className="max-w-xl text-lg leading-8 text-on-surface-variant">
              Weekend bootcamps. Hands-on labs. Real production knowledge. Stop watching tutorials and
              start building infrastructure.
            </p>
          </div>
          <div className="mt-2 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <a
              href="#community"
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 font-mono text-xs font-semibold uppercase text-on-primary shadow-glow transition-all hover:scale-[1.02]"
            >
              Join Free Community
            </a>
            <a
              href="#bootcamps"
              className="inline-flex items-center justify-center rounded-full border border-outline bg-transparent px-8 py-4 font-mono text-xs font-semibold uppercase text-on-surface transition-colors hover:bg-surface-container-low"
            >
              View Bootcamps
            </a>
          </div>
        </div>
        <TerminalVisual />
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="border-y border-outline-variant/30 bg-surface-container-low py-14">
      <div className="mx-auto max-w-content px-4 md:px-16">
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:divide-x md:divide-outline-variant/30">
          {stats.map(([value, label]) => (
            <div key={label} className="flex flex-col items-center justify-center p-4 text-center">
              <span className="mb-2 font-headline text-3xl font-bold text-primary">{value}</span>
              <span className="font-mono text-xs font-semibold uppercase text-on-surface-variant">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DevOpsTools() {
  const [featuredTool, ...toolGrid] = devopsTools;
  const FeaturedLogo = featuredTool.icon;

  return (
    <section id="tools" className="border-b border-outline-variant/30 bg-surface/70 py-20">
      <div className="mx-auto max-w-content px-4 md:px-16">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-3 font-mono text-xs font-semibold uppercase text-primary">
              DevOps Toolchain
            </p>
            <h2 className="font-headline text-4xl font-bold text-on-surface md:text-5xl">
              Practice with tools used in real infrastructure work.
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-on-surface-variant">
            The visual stack stays technical and practical: operating systems, containers, GitOps,
            pipelines, infrastructure as code, and observability.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1.9fr]">
          <article className="glass-panel group relative overflow-hidden rounded-2xl border-2 border-primary/45 p-8 shadow-glow">
            <div className="absolute -right-16 -top-16 size-44 rounded-full bg-primary-container/20 blur-3xl" />
            <div className="relative flex h-full min-h-[280px] flex-col justify-between gap-10">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="mb-3 font-mono text-xs font-semibold uppercase text-primary">
                    Foundation
                  </p>
                  <h3 className="font-headline text-4xl font-bold text-on-surface">
                    {featuredTool.name}
                  </h3>
                </div>
                <div className="flex size-28 shrink-0 items-center justify-center rounded-2xl border border-outline-variant/30 bg-white shadow-ambient sm:size-32">
                  <FeaturedLogo
                    aria-hidden="true"
                    className="text-[76px] sm:text-[88px]"
                    style={{ color: featuredTool.color }}
                  />
                </div>
              </div>
              <p className="max-w-lg text-lg leading-8 text-on-surface-variant">
                {featuredTool.description}
              </p>
            </div>
          </article>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {toolGrid.map((tool) => (
              <ToolTile key={tool.name} tool={tool} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ToolTile({ tool }) {
  const Logo = tool.icon;

  return (
    <article className="group flex min-h-40 flex-col justify-between rounded-2xl border border-outline-variant/30 bg-white/75 p-5 shadow-ambient backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-white">
      <div className="flex items-start justify-between gap-3">
        <div className="flex size-16 items-center justify-center rounded-xl bg-surface-container-low transition-colors group-hover:bg-surface-container">
          <Logo aria-hidden="true" className="text-[40px]" style={{ color: tool.color }} />
        </div>
        <span className="size-2 rounded-full bg-primary-container opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <div>
        <h3 className="mb-1 font-headline text-xl font-semibold text-on-surface">{tool.name}</h3>
        <p className="font-mono text-xs font-semibold uppercase text-on-surface-variant">
          {tool.description}
        </p>
      </div>
    </article>
  );
}

function LearningPath() {
  return (
    <section id="learning-path" className="py-24">
      <div className="mx-auto max-w-content px-4 md:px-16">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 font-headline text-4xl font-bold text-on-surface md:text-5xl">
            The Engineering Path
          </h2>
          <p className="text-lg leading-8 text-on-surface-variant">
            A structured curriculum designed to take you from fundamentals to advanced infrastructure
            orchestration.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pathCards.map((card) => (
            <PathCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PathCard({ title, body, icon, level, active = false }) {
  const activeStyles = active
    ? "glass-panel border-2 border-primary shadow-glow"
    : "border border-outline-variant/30 bg-surface shadow-ambient hover:border-outline";

  return (
    <article
      className={`${activeStyles} group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1`}
    >
      {active && (
        <div className="absolute right-0 top-0 p-4">
          <span className="rounded-full bg-primary-container px-2 py-1 font-mono text-[10px] font-semibold uppercase text-on-primary-container">
            Active
          </span>
        </div>
      )}
      <div className="mb-6 flex size-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/10">
        <Icon
          name={icon}
          className={`text-2xl transition-colors ${active ? "text-primary" : "text-on-surface-variant group-hover:text-primary"}`}
        />
      </div>
      <h3 className="mb-2 font-headline text-2xl font-semibold text-on-surface">{title}</h3>
      <p className="mb-6 min-h-12 text-base leading-6 text-on-surface-variant">{body}</p>
      <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase text-outline">
        <span className={`size-4 rounded border border-outline ${active ? "bg-outline/20" : ""}`} />
        {level}
      </div>
    </article>
  );
}

function Bootcamp() {
  return (
    <section id="bootcamps" className="bg-surface-container-low py-24">
      <div className="mx-auto max-w-content px-4 md:px-16">
        <div className="flex flex-col overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface shadow-ambient lg:flex-row">
          <div className="flex-grow border-b border-outline-variant/30 p-8 lg:border-b-0 lg:border-r lg:p-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded bg-secondary-container/20 px-3 py-1 font-mono text-xs font-semibold uppercase text-secondary">
              Next Bootcamp
            </div>
            <h2 className="mb-4 font-headline text-4xl font-bold text-on-surface">
              Linux + Networking Bootcamp
            </h2>
            <p className="mb-8 max-w-2xl text-base leading-7 text-on-surface-variant">
              Stop memorizing commands. Start understanding the operating system and how traffic flows.
              This intensive weekend bootcamp covers the essential foundation every serious DevOps
              engineer needs.
            </p>
            <div className="mb-8 flex items-baseline gap-4">
              <span className="font-headline text-4xl font-bold text-on-surface">₹399</span>
              <span className="text-base text-outline">/ $10</span>
            </div>
            <a
              href="#community"
              className="inline-flex w-full items-center justify-center rounded-full bg-primary px-8 py-3 font-mono text-xs font-semibold uppercase text-on-primary transition-transform hover:scale-[1.02] sm:w-auto"
            >
              Join Waitlist
            </a>
          </div>

          <div className="flex min-w-full flex-col justify-center bg-surface-bright p-8 lg:min-w-[360px] lg:p-12">
            <h3 className="mb-6 font-mono text-xs font-semibold uppercase text-outline">
              What's Included
            </h3>
            <ul className="space-y-4">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Icon name="check_circle" filled className="text-xl text-primary" />
                  <span className="text-base leading-6 text-on-surface">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Instructor() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto flex max-w-content flex-col items-center gap-16 px-4 md:flex-row md:px-16">
        <div className="relative flex size-48 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-surface bg-surface-container-highest shadow-xl md:size-64">
          <div className="absolute inset-8 rounded-full bg-gradient-to-br from-white to-surface-container" />
          <Icon name="person" className="relative text-7xl text-outline-variant" />
        </div>
        <div className="text-center md:text-left">
          <h2 className="mb-2 font-headline text-4xl font-bold text-on-surface">Shaik Abrar</h2>
          <p className="mb-6 font-mono text-xs font-semibold uppercase text-primary">
            DevOps Engineer · AWS Certified Instructor
          </p>
          <p className="max-w-2xl text-base leading-7 text-on-surface-variant">
            I build and maintain cloud infrastructure for a living. I created OnlyDevOps because I was
            tired of seeing bootcamps teach outdated, isolated tools without explaining how they fit
            together in real production environments. My goal is to teach you how to think like a systems
            architect, not just how to copy-paste commands.
          </p>
        </div>
      </div>
    </section>
  );
}

function Community() {
  return (
    <section id="community" className="border-y border-outline-variant/30 bg-surface-container py-20">
      <div className="mx-auto flex max-w-content flex-col items-start justify-between gap-8 px-4 md:flex-row md:items-center md:px-16">
        <div>
          <p className="mb-3 font-mono text-xs font-semibold uppercase text-primary">
            Community Access
          </p>
          <h2 className="font-headline text-4xl font-bold text-on-surface">
            Learn with engineers who are building every week.
          </h2>
        </div>
        <a
          href="mailto:hello@onlydevops.com"
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-primary px-8 py-4 font-mono text-xs font-semibold uppercase text-on-primary shadow-glow transition-transform hover:scale-[1.02]"
        >
          Request Invite
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-outline-variant/20 bg-surface py-16">
      <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-6 px-4 md:flex-row md:px-16">
        <a
          href="#top"
          className="flex items-center gap-2 font-headline text-2xl font-extrabold text-on-surface transition-opacity hover:opacity-80"
        >
          <Icon name="terminal" filled className="text-primary" />
          OnlyDevOps
        </a>
        <p className="order-3 text-center text-base text-on-surface-variant md:order-none md:text-left">
          © 2026 OnlyDevOps. Precision Engineering for System Architects.
        </p>
        <div className="flex flex-wrap justify-center gap-5">
          {footerLinks.map((link) => (
            <a
              key={link}
              href="#top"
              className="font-mono text-sm font-medium text-on-surface-variant transition-colors hover:text-primary"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="blueprint-grid min-h-screen bg-background text-on-surface selection:bg-primary-container selection:text-on-primary-container">
      <Header />
      <main>
        <Hero />
        <Stats />
        <DevOpsTools />
        <LearningPath />
        <Bootcamp />
        <Instructor />
        <Community />
      </main>
      <Footer />
    </div>
  );
}

import { Suspense, lazy, useEffect, useMemo, useState } from "react";
const ArchitectureGeneratorPage = lazy(() => import("./features/diagram/ArchitectureGeneratorPage"));
import DesignArchitecturePage from "./pages/DesignArchitecturePage.jsx";
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
  ["Roadmap", "/roadmap", true],
  ["Design Architecture", "/designArchitecture"],
  ["Architecture Lab", "/diagram-generator"],
  ["Learning Path", "/#learning-path"],
  ["Tools", "/#tools"],
  ["About", "/#about"],
  ["Community", "/#community"],
];

const stats = [
  ["250+", "Learners Trained"],
  ["6+", "Core Tracks"],
  ["Roadmap", "Always Available"],
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
    body: "Build the command-line confidence and network intuition every real DevOps engineer needs.",
    icon: "terminal",
    level: "Foundation",
    active: true,
  },
  {
    title: "Shell Scripting + Git",
    body: "Automate routine work and manage infrastructure changes with clean version control habits.",
    icon: "code_blocks",
    level: "Core",
  },
  {
    title: "Docker",
    body: "Package applications into consistent, portable runtime environments.",
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
    body: "Orchestrate container deployments at serious scale with confidence.",
    icon: "hub",
    level: "Advanced",
  },
  {
    title: "AWS + Terraform",
    body: "Provision and manage cloud infrastructure as code in repeatable workflows.",
    icon: "cloud",
    level: "Advanced",
  },
];

const included = [
  "Visual roadmap with real tool progression",
  "Hands-on sequence from Linux to Kubernetes",
  "Milestone-based learning checkpoints",
  "Project-first guidance, not tutorial spam",
  "Community-ready next steps",
];

const footerLinks = ["Roadmap", "Architecture Lab", "Learning Path", "Mentors", "Status", "Support"];

const roadmapMilestones = [
  {
    title: "Ground Zero",
    subtitle: "Linux + Networking",
    level: "Stage 01",
    duration: "2-3 weeks",
    status: "Start here",
    color: "from-amber-400/30 via-primary/10 to-transparent",
    icon: SiLinux,
    iconColor: "#f5be04",
    summary: "Own the shell, understand filesystems, services, ports, DNS, HTTP, SSH, and how packets actually move.",
    achievements: [
      "Navigate Linux without fear",
      "Debug ports, processes, permissions, and logs",
      "Explain what happens from browser request to server response",
    ],
    tools: ["Linux", "SSH", "Bash", "Networking"],
  },
  {
    title: "Automation Lane",
    subtitle: "Shell Scripting + GitHub",
    level: "Stage 02",
    duration: "2 weeks",
    status: "Build momentum",
    color: "from-sky-400/30 via-secondary/10 to-transparent",
    icon: SiGithub,
    iconColor: "#181717",
    summary: "Turn repeated terminal work into scripts, structure projects in Git, and ship changes with clean commits and branches.",
    achievements: [
      "Write useful bash automation",
      "Manage repos, branches, and PR workflows",
      "Document commands like an engineer, not a student",
    ],
    tools: ["Bash", "Git", "GitHub", "Markdown"],
  },
  {
    title: "Container Curve",
    subtitle: "Docker",
    level: "Stage 03",
    duration: "1-2 weeks",
    status: "Package everything",
    color: "from-cyan-400/30 via-primary/10 to-transparent",
    icon: SiDocker,
    iconColor: "#2496ed",
    summary: "Build images, understand layers, optimize Dockerfiles, and run production-like workloads locally.",
    achievements: [
      "Create clean Dockerfiles",
      "Use Compose for multi-service setups",
      "Debug build issues and container networking",
    ],
    tools: ["Docker", "Docker Compose", "Images", "Volumes"],
  },
  {
    title: "Delivery Bridge",
    subtitle: "CI/CD + Jenkins + GitHub Actions",
    level: "Stage 04",
    duration: "2 weeks",
    status: "Automate releases",
    color: "from-rose-400/30 via-secondary/10 to-transparent",
    icon: SiJenkins,
    iconColor: "#d24939",
    summary: "Move from manual deployments to repeatable pipelines with testing, linting, build artifacts, and deployment stages.",
    achievements: [
      "Design reliable CI pipelines",
      "Understand runners, secrets, and artifacts",
      "Ship the same way every time",
    ],
    tools: ["Jenkins", "GitHub Actions", "Artifacts", "Pipelines"],
  },
  {
    title: "Cluster Highway",
    subtitle: "Kubernetes + GitOps",
    level: "Stage 05",
    duration: "3 weeks",
    status: "Scale systems",
    color: "from-indigo-400/30 via-primary/10 to-transparent",
    icon: SiKubernetes,
    iconColor: "#326ce5",
    summary: "Learn pods, deployments, services, ingress, Helm thinking, and how GitOps removes deployment chaos.",
    achievements: [
      "Read and write Kubernetes manifests",
      "Debug workloads with kubectl and logs",
      "Understand GitOps flows with Argo CD mindset",
    ],
    tools: ["Kubernetes", "kubectl", "Helm", "Argo CD"],
  },
  {
    title: "Cloud Summit",
    subtitle: "AWS + Terraform + Observability",
    level: "Stage 06",
    duration: "3-4 weeks",
    status: "Operate for real",
    color: "from-emerald-400/30 via-primary/10 to-transparent",
    icon: SiTerraform,
    iconColor: "#ff9900",
    summary: "Provision cloud infrastructure, standardize environments, and monitor systems with metrics, dashboards, and alerting.",
    achievements: [
      "Provision infra as code",
      "Create production-shaped environments",
      "Measure health with Prometheus and Grafana",
    ],
    tools: ["AWS", "Terraform", "Prometheus", "Grafana"],
  },
];

function getInitialTheme() {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem("onlydevops-theme");

  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return "light";
}

function getCurrentPath() {
  if (typeof window === "undefined") {
    return "/";
  }

  return window.location.pathname || "/";
}

function normalizePath(path) {
  if (!path) {
    return "/";
  }

  return path.replace(/\/$/, "") || "/";
}

function isRoadmapPath(pathname) {
  return normalizePath(pathname) === "/roadmap";
}

function isDiagramPath(pathname) {
  return normalizePath(pathname) === "/diagram-generator";
}

function isDesignArchitecturePath(pathname) {
  return normalizePath(pathname) === "/designArchitecture";
}

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

function ThemeToggle({ theme, onToggle, compact = false }) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
      onClick={onToggle}
      className={`inline-flex items-center justify-center rounded-full border border-outline-variant/50 bg-surface-container-lowest/70 text-on-surface shadow-sm backdrop-blur transition-all hover:border-primary/50 hover:text-primary ${
        compact ? "size-11" : "h-11 gap-2 px-3 sm:px-4"
      }`}
    >
      <Icon name={isDark ? "light_mode" : "dark_mode"} filled className="text-[20px]" />
      {!compact && (
        <span className="hidden font-mono text-xs font-semibold uppercase sm:inline">
          {isDark ? "Light" : "Dark"}
        </span>
      )}
    </button>
  );
}

function Header({ theme, onToggleTheme, pathname }) {
  const [isOpen, setIsOpen] = useState(false);
  const isLanding = !isRoadmapPath(pathname) && !isDiagramPath(pathname) && !isDesignArchitecturePath(pathname);
  const communityHref = isLanding ? "#community" : "/#community";

  const isActiveLink = (href) => {
    if (href === "/roadmap") {
      return isRoadmapPath(pathname);
    }

    if (href === "/diagram-generator") {
      return isDiagramPath(pathname);
    }

    if (href === "/designArchitecture") {
      return isDesignArchitecturePath(pathname);
    }

    return isLanding && href.startsWith("/#");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant/30 bg-surface/75 shadow-sm backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-content items-center justify-between px-4 md:px-16">
        <a
          href="/"
          className="flex items-center gap-2 font-headline text-2xl font-bold text-on-surface transition-opacity hover:opacity-80"
        >
          <Icon name="terminal" filled className="text-primary" />
          OnlyDevOps
        </a>

        <div className="hidden items-center gap-4 md:flex">
          {navItems.map(([label, href, highlighted]) => {
            const active = isActiveLink(href);
            const classes = highlighted
              ? `rounded-full border px-4 py-2 font-mono text-xs font-semibold uppercase transition-all ${
                  active
                    ? "border-primary bg-primary text-on-primary shadow-glow"
                    : "border-primary/50 bg-primary/10 text-primary hover:border-primary hover:bg-primary hover:text-on-primary"
                }`
              : `font-mono text-xs font-semibold uppercase transition-colors ${
                  active ? "text-primary" : "text-on-surface-variant hover:text-primary"
                }`;

            return (
              <a key={label} href={href} className={classes}>
                {label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <a
            href={communityHref}
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
            <div className="mb-2 flex items-center justify-between rounded-xl border border-outline-variant/30 bg-surface-container-lowest/70 px-3 py-3">
              <span className="font-mono text-xs font-semibold uppercase text-on-surface-variant">Theme</span>
              <ThemeToggle theme={theme} onToggle={onToggleTheme} compact />
            </div>
            {navItems.map(([label, href, highlighted]) => (
              <a
                key={label}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`rounded-lg px-3 py-3 font-mono text-sm font-semibold uppercase ${
                  highlighted
                    ? "bg-primary/10 text-primary"
                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
                }`}
              >
                {label}
              </a>
            ))}
            <a
              href={communityHref}
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
        className="right-0 top-2 size-16 sm:-right-2 sm:top-4 sm:size-[74px] lg:-right-5"
      />
      <FloatingLogo
        icon={SiDocker}
        label="Docker"
        color="#2496ed"
        className="bottom-10 left-0 size-14 sm:bottom-16 sm:-left-2 sm:size-16 lg:-left-4"
        reverse
      />
      <FloatingLogo
        icon={SiTerraform}
        label="Terraform"
        color="#844fba"
        className="bottom-0 right-10 hidden size-12 sm:flex lg:right-16"
      />

      <div className="terminal-tilt group relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-800 bg-[#111827] shadow-2xl transition-transform duration-700 ease-out">
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
      className={`absolute z-20 ${reverse ? "animate-float-reverse" : "animate-float"} flex items-center justify-center rounded-2xl border border-outline-variant/25 bg-surface-container-lowest/90 shadow-ambient backdrop-blur ${className}`}
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
              Hands-on learning paths, real infrastructure thinking, and a visual roadmap that shows
              exactly what to learn next.
            </p>
          </div>
          <div className="mt-2 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <a
              href="/roadmap"
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 font-mono text-xs font-semibold uppercase text-on-primary shadow-glow transition-all hover:scale-[1.02]"
            >
              Explore Roadmap
            </a>
            <a
              href="#community"
              className="inline-flex items-center justify-center rounded-full border border-outline bg-transparent px-8 py-4 font-mono text-xs font-semibold uppercase text-on-surface transition-colors hover:bg-surface-container-low"
            >
              Join Community
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
            <p className="mb-3 font-mono text-xs font-semibold uppercase text-primary">DevOps Toolchain</p>
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
                  <p className="mb-3 font-mono text-xs font-semibold uppercase text-primary">Foundation</p>
                  <h3 className="font-headline text-4xl font-bold text-on-surface">{featuredTool.name}</h3>
                </div>
                <div className="flex size-28 shrink-0 items-center justify-center rounded-2xl border border-outline-variant/30 bg-surface-container-lowest shadow-ambient sm:size-32">
                  <FeaturedLogo
                    aria-hidden="true"
                    className="text-[76px] sm:text-[88px]"
                    style={{ color: featuredTool.color }}
                  />
                </div>
              </div>
              <p className="max-w-lg text-lg leading-8 text-on-surface-variant">{featuredTool.description}</p>
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
    <article className="group flex min-h-40 flex-col justify-between rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/75 p-5 shadow-ambient backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-surface-container-lowest">
      <div className="flex items-start justify-between gap-3">
        <div className="flex size-16 items-center justify-center rounded-xl bg-surface-container-low transition-colors group-hover:bg-surface-container">
          <Logo aria-hidden="true" className="text-[40px]" style={{ color: tool.color }} />
        </div>
        <span className="size-2 rounded-full bg-primary-container opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <div>
        <h3 className="mb-1 font-headline text-xl font-semibold text-on-surface">{tool.name}</h3>
        <p className="font-mono text-xs font-semibold uppercase text-on-surface-variant">{tool.description}</p>
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
            Foundation
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

function RoadmapCallout() {
  return (
    <section className="bg-surface-container-low py-24">
      <div className="mx-auto max-w-content px-4 md:px-16">
        <div className="grid gap-8 rounded-[32px] border border-outline-variant/30 bg-surface p-8 shadow-ambient md:grid-cols-[1.15fr_0.85fr] md:p-12">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 font-mono text-xs font-semibold uppercase text-primary">
              <Icon name="route" filled className="text-base" />
              Roadmap available now
            </div>
            <h2 className="mb-4 font-headline text-4xl font-bold text-on-surface md:text-5xl">
              No live bootcamp right now — follow the roadmap instead.
            </h2>
            <p className="max-w-2xl text-base leading-8 text-on-surface-variant">
              The current Linux + Networking bootcamp promo has been retired for now. Instead of pushing an
              inactive event, OnlyDevOps now guides learners through a clean, interactive roadmap from Linux
              basics to Kubernetes, AWS, Terraform, and observability.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="/roadmap"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 font-mono text-xs font-semibold uppercase text-on-primary shadow-glow transition-transform hover:scale-[1.02]"
              >
                Open Roadmap Page
              </a>
              <a
                href="#community"
                className="inline-flex items-center justify-center rounded-full border border-outline px-8 py-4 font-mono text-xs font-semibold uppercase text-on-surface transition-colors hover:bg-surface-container-low"
              >
                Get Notified for Future Events
              </a>
            </div>
          </div>

          <div className="grid gap-4 rounded-[28px] bg-surface-container-low p-6">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-outline">
              What the roadmap includes
            </h3>
            <ul className="space-y-4">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Icon name="flag" filled className="mt-0.5 text-xl text-primary" />
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

function ArchitectureLabCallout() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-content px-4 md:px-16">
        <div className="grid gap-8 rounded-[32px] border border-outline-variant/30 bg-surface p-8 shadow-ambient md:grid-cols-[0.9fr_1.1fr] md:p-12">
          <div className="glass-panel rounded-[28px] border border-outline-variant/30 p-6 shadow-ambient">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1.5 font-mono text-xs font-semibold uppercase text-secondary">
              <Icon name="deployed_code" filled className="text-base" />
              New platform feature
            </div>
            <h2 className="font-headline text-4xl font-bold text-on-surface md:text-5xl">
              Architecture Lab for DevOps diagrams.
            </h2>
            <p className="mt-4 text-base leading-8 text-on-surface-variant">
              Build clean infrastructure diagrams on an interactive canvas. Add components, connect systems,
              drag blocks, and export the final view as a shareable image.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="/diagram-generator"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 font-mono text-xs font-semibold uppercase text-on-primary shadow-glow transition-transform hover:scale-[1.02]"
              >
                Open Architecture Lab
              </a>
              <a
                href="#community"
                className="inline-flex items-center justify-center rounded-full border border-outline px-8 py-4 font-mono text-xs font-semibold uppercase text-on-surface transition-colors hover:bg-surface-container-low"
              >
                Request Early Access
              </a>
            </div>
          </div>

          <div className="grid gap-4 rounded-[28px] bg-surface-container-low p-6">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-outline">
              Included in the lab
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Canvas-based diagram editing",
                "Selectable DevOps tool nodes",
                "Connection flow lines",
                "Node labels and tool switching",
                "Starter deployment topology",
                "PNG export for sharing",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/80 p-4">
                  <div className="mb-3 inline-flex size-9 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon name="check" filled className="text-base" />
                  </div>
                  <p className="text-base leading-6 text-on-surface">{item}</p>
                </div>
              ))}
            </div>
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
          <div className="absolute inset-8 rounded-full bg-gradient-to-br from-surface-container-lowest to-surface-container" />
          <Icon name="person" className="relative text-7xl text-outline-variant" />
        </div>
        <div className="text-center md:text-left">
          <h2 className="mb-2 font-headline text-4xl font-bold text-on-surface">Shaik Abrar</h2>
          <p className="mb-6 font-mono text-xs font-semibold uppercase text-primary">
            DevOps Engineer · AWS Certified Instructor
          </p>
          <p className="max-w-2xl text-base leading-7 text-on-surface-variant">
            I build and maintain cloud infrastructure for a living. I created OnlyDevOps because I was tired
            of seeing bootcamps teach isolated tools without showing how they connect in production. My goal
            is to help learners think like operators and systems engineers.
          </p>
        </div>
      </div>
    </section>
  );
}

function Community({ roadmap = false }) {
  return (
    <section id="community" className="border-y border-outline-variant/30 bg-surface-container py-20">
      <div className="mx-auto flex max-w-content flex-col items-start justify-between gap-8 px-4 md:flex-row md:items-center md:px-16">
        <div>
          <p className="mb-3 font-mono text-xs font-semibold uppercase text-primary">Community Access</p>
          <h2 className="font-headline text-4xl font-bold text-on-surface">
            {roadmap
              ? "Want the full roadmap with projects, labs, and next steps?"
              : "Learn with engineers who are building every week."}
          </h2>
        </div>
        <a
          href="mailto:hello@onlydevops.in"
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
          href="/"
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
              href={link === "Roadmap" ? "/roadmap" : link === "Architecture Lab" ? "/diagram-generator" : "/#top"}
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

function RoadmapHero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-20 md:pb-24 md:pt-24">
      <div className="hero-glow absolute inset-0 -z-10" />
      <div className="mx-auto grid max-w-content gap-10 px-4 md:px-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            <Icon name="explore" filled className="text-base" />
            OnlyDevOps Roadmap
          </div>
          <h1 className="max-w-4xl font-headline text-5xl font-extrabold leading-tight text-on-surface sm:text-6xl lg:text-7xl">
            Your visual
            <span className="block text-primary">DevOps learning highway</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-on-surface-variant">
            Follow the road from Linux fundamentals to cloud infrastructure, GitOps, and observability.
            Every flag marks a skill milestone. Every turn prepares you for the next production challenge.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#roadmap-track"
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 font-mono text-xs font-semibold uppercase text-on-primary shadow-glow transition-transform hover:scale-[1.02]"
            >
              View Full Roadmap
            </a>
            <a
              href="/#community"
              className="inline-flex items-center justify-center rounded-full border border-outline px-8 py-4 font-mono text-xs font-semibold uppercase text-on-surface transition-colors hover:bg-surface-container-low"
            >
              Join Community
            </a>
          </div>
        </div>

        <RoadmapPreviewCard />
      </div>
    </section>
  );
}

function RoadmapPreviewCard() {
  const previewSteps = [
    ["01", "Linux + Networking"],
    ["02", "Scripting + GitHub"],
    ["03", "Docker"],
    ["04", "CI/CD"],
    ["05", "Kubernetes"],
    ["06", "AWS + Terraform"],
  ];

  return (
    <div className="glass-panel relative overflow-hidden rounded-[32px] border border-outline-variant/30 p-6 shadow-ambient md:p-8">
      <div className="absolute inset-x-10 top-8 h-40 rounded-full bg-primary/10 blur-3xl" />
      <svg
        viewBox="0 0 520 380"
        className="relative z-10 h-full w-full"
        aria-hidden="true"
        role="img"
      >
        <defs>
          <linearGradient id="roadmapStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 108, 79, 0.95)" />
            <stop offset="50%" stopColor="rgba(49, 107, 243, 0.85)" />
            <stop offset="100%" stopColor="rgba(0, 108, 79, 0.95)" />
          </linearGradient>
        </defs>
        <path
          d="M42 318C112 318 126 246 188 246C256 246 258 128 332 128C396 128 416 54 480 54"
          stroke="url(#roadmapStroke)"
          strokeWidth="28"
          strokeLinecap="round"
          fill="none"
          className="drop-shadow-[0_10px_28px_rgba(0,108,79,0.25)]"
        />
        <path
          d="M42 318C112 318 126 246 188 246C256 246 258 128 332 128C396 128 416 54 480 54"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="4"
          strokeDasharray="14 12"
          strokeLinecap="round"
          fill="none"
        />
        {[{ x: 58, y: 318 }, { x: 182, y: 246 }, { x: 328, y: 128 }, { x: 474, y: 54 }].map((point) => (
          <g key={`${point.x}-${point.y}`}>
            <circle cx={point.x} cy={point.y} r="20" fill="rgba(255,255,255,0.96)" />
            <circle cx={point.x} cy={point.y} r="10" fill="rgba(0,108,79,0.95)" />
          </g>
        ))}
        {[{ x: 58, y: 283 }, { x: 182, y: 211 }, { x: 328, y: 93 }, { x: 474, y: 19 }].map((point, index) => (
          <g key={`flag-${index}`}>
            <line x1={point.x} y1={point.y + 10} x2={point.x} y2={point.y + 42} stroke="rgba(19,27,46,0.52)" strokeWidth="5" strokeLinecap="round" />
            <path d={`M ${point.x} ${point.y + 12} L ${point.x + 36} ${point.y + 22} L ${point.x} ${point.y + 34} Z`} fill="rgba(0,108,79,0.95)" />
          </g>
        ))}
      </svg>
      <div className="relative z-10 mt-6 grid gap-3 sm:grid-cols-2">
        {previewSteps.map(([id, label]) => (
          <div key={id} className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/75 px-4 py-3">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">{id}</p>
            <p className="mt-1 text-sm font-semibold text-on-surface">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function RoadmapTrack() {
  const [activeMilestone, setActiveMilestone] = useState(roadmapMilestones[0].title);

  const selectedMilestone = useMemo(
    () => roadmapMilestones.find((milestone) => milestone.title === activeMilestone) ?? roadmapMilestones[0],
    [activeMilestone],
  );

  return (
    <section id="roadmap-track" className="pb-24">
      <div className="mx-auto max-w-content px-4 md:px-16">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Interactive learning route
          </p>
          <h2 className="font-headline text-4xl font-bold text-on-surface md:text-5xl">
            Follow the road. Hover a flag. See what you unlock.
          </h2>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr] xl:items-start">
          <div className="relative overflow-hidden rounded-[32px] border border-outline-variant/30 bg-surface-container-low/45 p-4 md:p-6">
            <div className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0 md:block" />
            <div className="absolute left-1/2 top-10 hidden h-[calc(100%-5rem)] w-[280px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl md:block" />
            <div className="relative z-10 space-y-5">
              {roadmapMilestones.map((milestone, index) => (
                <RoadmapMilestoneCard
                  key={milestone.title}
                  milestone={milestone}
                  index={index}
                  active={selectedMilestone.title === milestone.title}
                  onHover={() => setActiveMilestone(milestone.title)}
                />
              ))}
            </div>
          </div>

          <RoadmapDetails milestone={selectedMilestone} />
        </div>
      </div>
    </section>
  );
}

function RoadmapMilestoneCard({ milestone, index, active, onHover }) {
  const Logo = milestone.icon;
  const reversed = index % 2 === 1;

  return (
    <div className={`md:flex ${reversed ? "md:justify-end" : "md:justify-start"}`}>
      <article
        tabIndex={0}
        onMouseEnter={onHover}
        onFocus={onHover}
        onClick={onHover}
        className={`roadmap-card group relative w-full rounded-[28px] border p-6 text-left shadow-ambient transition-all duration-300 md:w-[calc(50%-2rem)] ${
          active
            ? "border-primary bg-surface shadow-glow md:-translate-y-1"
            : "border-outline-variant/30 bg-surface/90 hover:-translate-y-1 hover:border-primary/35"
        }`}
      >
        <div className={`roadmap-anchor hidden md:flex ${reversed ? "roadmap-anchor-right" : "roadmap-anchor-left"}`}>
          <span className="roadmap-node" />
          <span className="roadmap-flag">
            <Icon name="flag" filled className="text-sm text-on-primary" />
          </span>
        </div>

        <div className={`absolute inset-0 rounded-[28px] bg-gradient-to-br ${milestone.color} opacity-70`} />
        <div className="relative z-10">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                {milestone.level}
              </p>
              <h3 className="mt-2 font-headline text-2xl font-bold text-on-surface">{milestone.subtitle}</h3>
            </div>
            <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/90 shadow-ambient">
              <Logo aria-hidden="true" className="text-[38px]" style={{ color: milestone.iconColor }} />
            </div>
          </div>
          <p className="text-base leading-7 text-on-surface-variant">{milestone.summary}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full border border-outline-variant/30 bg-surface-container-lowest/85 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
              {milestone.duration}
            </span>
            <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              {milestone.status}
            </span>
          </div>
        </div>
      </article>
    </div>
  );
}

function RoadmapDetails({ milestone }) {
  const Logo = milestone.icon;

  return (
    <aside className="xl:sticky xl:top-28">
      <div className="glass-panel overflow-hidden rounded-[32px] border border-outline-variant/30 p-6 shadow-ambient md:p-8">
        <div className={`mb-6 rounded-[28px] bg-gradient-to-br ${milestone.color} p-6`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                {milestone.level}
              </p>
              <h3 className="mt-3 font-headline text-3xl font-bold text-on-surface">{milestone.title}</h3>
              <p className="mt-2 text-base leading-7 text-on-surface-variant">{milestone.summary}</p>
            </div>
            <div className="flex size-20 shrink-0 items-center justify-center rounded-3xl border border-outline-variant/30 bg-surface-container-lowest/90 shadow-ambient">
              <Logo aria-hidden="true" className="text-[48px]" style={{ color: milestone.iconColor }} />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-outline">
              Milestone achievements
            </p>
            <ul className="space-y-3">
              {milestone.achievements.map((achievement) => (
                <li key={achievement} className="flex items-start gap-3">
                  <Icon name="check_circle" filled className="mt-0.5 text-xl text-primary" />
                  <span className="text-base leading-7 text-on-surface">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-outline">
              Tool stack on this segment
            </p>
            <div className="flex flex-wrap gap-3">
              {milestone.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-outline-variant/30 bg-surface-container-lowest/80 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function LandingPage() {
  return (
    <>
      <main>
        <Hero />
        <Stats />
        <DevOpsTools />
        <LearningPath />
        <RoadmapCallout />
        <ArchitectureLabCallout />
        <Instructor />
        <Community />
      </main>
      <Footer />
    </>
  );
}

function RoadmapPage() {
  return (
    <>
      <main>
        <RoadmapHero />
        <Stats />
        <RoadmapTrack />
        <Community roadmap />
      </main>
      <Footer />
    </>
  );
}

function ArchitecturePage() {
  return (
    <>
      <Suspense
        fallback={
          <main className="mx-auto flex min-h-[60vh] max-w-content items-center justify-center px-4 md:px-16">
            <div className="rounded-[28px] border border-outline-variant/30 bg-surface px-8 py-10 text-center shadow-ambient">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Loading Architecture Lab
              </p>
              <p className="mt-3 text-base leading-7 text-on-surface-variant">
                Preparing the interactive canvas and DevOps component library.
              </p>
            </div>
          </main>
        }
      >
        <ArchitectureGeneratorPage />
      </Suspense>
      <Footer />
    </>
  );
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const pathname = getCurrentPath();

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
    window.localStorage.setItem("onlydevops-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.title = isRoadmapPath(pathname)
      ? "OnlyDevOps Roadmap - Visual DevOps Learning Highway"
      : isDiagramPath(pathname)
        ? "OnlyDevOps Architecture Lab - Infrastructure Diagram Generator"
        : isDesignArchitecturePath(pathname)
          ? "OnlyDevOps | Design Architecture"
          : "OnlyDevOps - Learn DevOps The Real Way";
  }, [pathname]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  if (isDesignArchitecturePath(pathname)) {
    return <DesignArchitecturePage />;
  }

  return (
    <div className="blueprint-grid min-h-screen bg-background text-on-surface transition-colors duration-300 selection:bg-primary-container selection:text-on-primary-container">
      <Header theme={theme} onToggleTheme={toggleTheme} pathname={pathname} />
      {isRoadmapPath(pathname) ? (
        <RoadmapPage />
      ) : isDiagramPath(pathname) ? (
        <ArchitecturePage />
      ) : (
        <LandingPage />
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import { FaAws } from "react-icons/fa";
import {
  SiAnsible,
  SiArgo,
  SiClaude,
  SiDocker,
  SiGit,
  SiGithub,
  SiGrafana,
  SiJenkins,
  SiKubernetes,
  SiLinux,
  SiOpenai,
  SiPrometheus,
  SiPython,
  SiTerraform,
} from "react-icons/si";

const registrationUrl = "https://tally.so/r/7Rpe59";

const navItems = [
  ["Live Event", "#live-event"],
  ["Roadmap", "#learning-path"],
  ["Tools", "#tools"],
  ["Mentor", "#about"],
  ["Community", "#community"],
];

const stats = [
  ["FREE", "Live Session"],
  ["June 7", "Sunday, 2026"],
  ["7 PM", "IST"],
  ["Beginner", "Friendly"],
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

const eventTools = [
  { name: "Terraform", icon: SiTerraform, color: "#844fba" },
  { name: "Git", icon: SiGit, color: "#f05032" },
  { name: "GitHub", icon: SiGithub, color: "#ffffff" },
  { name: "Docker", icon: SiDocker, color: "#2496ed" },
  { name: "Kubernetes", icon: SiKubernetes, color: "#326ce5" },
  { name: "Python", icon: SiPython, color: "#3776ab" },
  { name: "ArgoCD", icon: SiArgo, color: "#ef7b4d" },
  { name: "AWS", icon: FaAws, color: "#ff9900" },
  { name: "Claude", icon: SiClaude, color: "#d97757" },
  { name: "ChatGPT", icon: SiOpenai, color: "#10a37f" },
  { name: "AI Agents", material: "smart_toy", color: "#22d3ee" },
  { name: "Prometheus", icon: SiPrometheus, color: "#e6522c" },
  { name: "Grafana", icon: SiGrafana, color: "#f46800" },
  { name: "Jenkins", icon: SiJenkins, color: "#d24939" },
  { name: "Linux", icon: SiLinux, color: "#f5be04" },
];

const eventDetails = [
  ["calendar_month", "Sunday, June 7, 2026"],
  ["schedule", "7:00 PM IST"],
  ["desktop_windows", "Online Mode"],
  ["videocam", "Google Meet"],
  ["target", "Beginner Friendly"],
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

const footerLinks = ["Terms", "Privacy", "Syllabus", "Mentors", "Status", "Support"];

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

function Header({ theme, onToggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/85 shadow-sm backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-content items-center justify-between px-4 md:px-16">
        <a
          href="#top"
          className="flex items-center gap-2 font-headline text-2xl font-bold text-white transition-opacity hover:opacity-80"
        >
          <Icon name="terminal" filled className="text-cyan-300" />
          OnlyDevOps
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="font-mono text-xs font-semibold uppercase text-slate-300 transition-colors hover:text-cyan-200"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <a
            href={registrationUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full border border-cyan-300/50 px-6 py-2.5 font-mono text-xs font-semibold uppercase text-cyan-100 transition-all hover:bg-cyan-300 hover:text-slate-950 md:inline-flex"
          >
            Register Now
          </a>
          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((current) => !current)}
            className="inline-flex size-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 md:hidden"
          >
            <Icon name={isOpen ? "close" : "menu"} />
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="border-t border-white/10 bg-[#050816]/95 px-4 py-4 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-content flex-col gap-2">
            <div className="mb-2 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-3">
              <span className="font-mono text-xs font-semibold uppercase text-slate-300">
                Theme
              </span>
              <ThemeToggle theme={theme} onToggle={onToggleTheme} compact />
            </div>
            {navItems.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-3 font-mono text-sm font-semibold uppercase text-slate-300 hover:bg-white/10 hover:text-cyan-200"
              >
                {label}
              </a>
            ))}
            <a
              href={registrationUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-cyan-300 px-6 py-3 font-mono text-xs font-semibold uppercase text-slate-950"
            >
              Register Now
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
    <section
      id="top"
      className="relative isolate overflow-hidden bg-[#050816] pb-20 pt-16 text-white md:pb-28 md:pt-20"
    >
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(96,165,250,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(96,165,250,0.12)_1px,transparent_1px)] bg-[size:42px_42px]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(37,99,235,0.34),transparent_42%),radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.24),transparent_42%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-52 bg-gradient-to-b from-cyan-400/10 to-transparent blur-2xl" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-35">
        <div className="absolute left-[8%] top-36 h-px w-72 rotate-12 bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
        <div className="absolute bottom-32 right-[10%] h-px w-96 -rotate-12 bg-gradient-to-r from-transparent via-purple-300 to-transparent" />
        <div className="absolute right-[18%] top-28 font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-100/50">
          deploy --automate --scale
        </div>
      </div>

      <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 px-4 md:px-16 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="z-10 flex flex-col items-start gap-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/35 bg-white/10 px-4 py-2 font-mono text-xs font-bold uppercase text-cyan-100 shadow-[0_0_36px_rgba(34,211,238,0.22)] backdrop-blur-xl">
            <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] text-white">FREE</span>
            Live Session
          </div>

          <div className="space-y-5">
            <h1 className="max-w-4xl font-headline text-5xl font-extrabold leading-[0.95] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
              DevOps
              <br />
              <span className="bg-gradient-to-r from-cyan-200 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                Roadmap 2026
              </span>
            </h1>
            <p className="font-headline text-2xl font-bold text-slate-100 sm:text-3xl">
              How To Start DevOps From Scratch
            </p>
            <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Learn the exact roadmap used in real industry environments.
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
            {eventDetails.map(([icon, label]) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-sm font-semibold text-slate-100 shadow-[0_18px_50px_rgba(15,23,42,0.28)] backdrop-blur-xl"
              >
                <Icon name={icon} filled className="text-[20px] text-cyan-200" />
                {label}
              </div>
            ))}
          </div>

          <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <a
              href={registrationUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 px-8 py-4 font-mono text-xs font-extrabold uppercase text-slate-950 shadow-[0_0_44px_rgba(34,211,238,0.34)] transition-all hover:scale-[1.02]"
            >
              Register Now
            </a>
            <a
              href="#live-event"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 font-mono text-xs font-bold uppercase text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              View Details
            </a>
          </div>

          <div className="flex flex-wrap gap-3 font-mono text-xs font-bold uppercase text-cyan-100">
            <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-2">
              ⚡ Limited Seats Only
            </span>
            <span className="rounded-full border border-purple-300/30 bg-purple-300/10 px-3 py-2">
              ⚡ Limited Slots Available
            </span>
          </div>
        </div>
        <EventVisual />
      </div>
    </section>
  );
}

function EventVisual() {
  return (
    <div className="relative z-10 mx-auto w-full max-w-xl">
      <div className="absolute inset-x-8 -top-8 h-32 bg-gradient-to-r from-cyan-400/30 via-blue-500/20 to-purple-500/30 blur-3xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-slate-950/70 p-5 shadow-[0_34px_90px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs font-bold uppercase text-cyan-200">Tech Stack</p>
            <h2 className="mt-1 font-headline text-2xl font-extrabold text-white">
              Tools You Will See In The Roadmap
            </h2>
          </div>
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10">
            <Icon name="hub" filled className="text-cyan-200" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
          {eventTools.map((tool, index) => (
            <EventToolChip key={tool.name} tool={tool} featured={index % 4 === 0} />
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 bg-black/25 p-4 font-mono text-xs leading-6 text-slate-300">
          <div className="text-cyan-200">$ roadmap --from scratch --industry</div>
          <div className="text-slate-500">loading: linux git docker kubernetes aws ai...</div>
          <div className="text-emerald-300">status: beginner friendly</div>
        </div>
      </div>
    </div>
  );
}

function EventToolChip({ tool, featured = false }) {
  const Logo = tool.icon;

  return (
    <div
      className={`flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.07] p-3 text-center shadow-[0_16px_44px_rgba(15,23,42,0.28)] backdrop-blur transition-transform hover:-translate-y-1 ${
        featured ? "ring-1 ring-cyan-300/30" : ""
      }`}
    >
      {Logo ? (
        <Logo aria-hidden="true" className="text-[30px]" style={{ color: tool.color }} />
      ) : (
        <Icon name={tool.material} filled className="text-[32px]" style={{ color: tool.color }} />
      )}
      <span className="font-mono text-[10px] font-bold uppercase text-slate-200">{tool.name}</span>
    </div>
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
                <div className="flex size-28 shrink-0 items-center justify-center rounded-2xl border border-outline-variant/30 bg-surface-container-lowest shadow-ambient sm:size-32">
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
    <article className="group flex min-h-40 flex-col justify-between rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/75 p-5 shadow-ambient backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-surface-container-lowest">
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
    <section id="live-event" className="bg-surface-container-low py-24">
      <div className="mx-auto max-w-content px-4 md:px-16">
        <div className="grid overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface shadow-ambient lg:grid-cols-[1.35fr_0.65fr]">
          <div className="relative overflow-hidden border-b border-outline-variant/30 p-8 lg:border-b-0 lg:border-r lg:p-12">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-300 via-blue-500 to-purple-500" />
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary-container/20 px-3 py-1 font-mono text-xs font-semibold uppercase text-secondary">
              Free Live Session
            </div>
            <h2 className="mb-4 font-headline text-4xl font-bold text-on-surface">
              DevOps Roadmap 2026
            </h2>
            <p className="mb-8 max-w-2xl text-base leading-7 text-on-surface-variant">
              A focused online session for students, beginners, developers, and cloud learners who want
              a clear path into DevOps without wasting months on scattered tutorials.
            </p>
            <div className="mb-8 grid gap-3 sm:grid-cols-2">
              {eventDetails.map(([icon, label]) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-xl border border-outline-variant/30 bg-surface-container-lowest px-4 py-3"
                >
                  <Icon name={icon} filled className="text-xl text-primary" />
                  <span className="text-sm font-semibold text-on-surface">{label}</span>
                </div>
              ))}
            </div>
            <a
              href={registrationUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full bg-primary px-8 py-3 font-mono text-xs font-semibold uppercase text-on-primary transition-transform hover:scale-[1.02] sm:w-auto"
            >
              Register Now
            </a>
          </div>

          <div className="flex min-w-full flex-col justify-center bg-surface-bright p-8 lg:min-w-[360px] lg:p-12">
            <h3 className="mb-6 font-mono text-xs font-semibold uppercase text-outline">
              What You'll Learn
            </h3>
            <ul className="space-y-4">
              {[
                "How DevOps works in real industry environments",
                "Which tools to learn first and which to skip early",
                "How cloud, CI/CD, Kubernetes, and AI fit together",
                "How to join the FREE DevOps community after the session",
              ].map((item) => (
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
      <div className="mx-auto grid max-w-content items-center gap-12 px-4 md:px-16 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="relative overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-6 shadow-ambient">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-300 via-blue-500 to-purple-500" />
          <div className="relative mx-auto flex size-44 items-center justify-center overflow-hidden rounded-full border-4 border-surface bg-surface-container-highest shadow-xl md:size-56">
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-surface-container-lowest to-surface-container" />
            <Icon name="person" className="relative text-7xl text-outline-variant" />
          </div>
          <div className="mt-6 rounded-xl border border-outline-variant/30 bg-surface p-4 text-center">
            <p className="font-mono text-[10px] font-semibold uppercase text-outline">
              DevOps Engineer at
            </p>
            <p className="mt-1 font-headline text-sm font-bold text-on-surface">
              [Company Logo Placeholder]
            </p>
          </div>
        </div>
        <div className="text-center lg:text-left">
          <p className="mb-3 font-mono text-xs font-semibold uppercase text-primary">
            Instructor
          </p>
          <h2 className="mb-2 font-headline text-4xl font-bold text-on-surface">Shaik Abrar</h2>
          <p className="mb-6 font-mono text-xs font-semibold uppercase text-primary">
            DevOps Engineer
          </p>
          <div className="mb-7 flex flex-wrap justify-center gap-3 lg:justify-start">
            {["AWS Certified Instructor", "Technical Mentor", "250+ Students Mentored"].map(
              (badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-primary/20 bg-primary/10 px-3 py-2 font-mono text-[11px] font-bold uppercase text-primary"
                >
                  {badge}
                </span>
              ),
            )}
          </div>
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
            Join the FREE DevOps community and start your journey.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-on-surface-variant">
            Register for the live roadmap session and get access details for the community.
          </p>
        </div>
        <a
          href={registrationUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-primary px-8 py-4 font-mono text-xs font-semibold uppercase text-on-primary shadow-glow transition-transform hover:scale-[1.02]"
        >
          Register Now
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
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
    window.localStorage.setItem("onlydevops-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  return (
    <div className="blueprint-grid min-h-screen bg-background text-on-surface transition-colors duration-300 selection:bg-primary-container selection:text-on-primary-container">
      <Header theme={theme} onToggleTheme={toggleTheme} />
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

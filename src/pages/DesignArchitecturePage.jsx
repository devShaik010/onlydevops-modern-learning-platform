import { useCallback, useMemo, useState } from "react";
import {
  Background,
  BackgroundVariant,
  BaseEdge,
  Handle,
  MiniMap,
  Panel,
  ReactFlow,
  ReactFlowProvider,
  applyEdgeChanges,
  applyNodeChanges,
  getBezierPath,
  useReactFlow,
} from "@xyflow/react";
import {
  Boxes,
  Cloud,
  CloudCog,
  Database,
  FolderArchive,
  Hand,
  Library,
  LifeBuoy,
  Minus,
  Plus,
  Router,
  Save,
  Search,
  Server,
  Settings,
  Shield,
  Upload,
  X,
} from "lucide-react";
import { cn } from "../lib/utils.js";
import "@xyflow/react/dist/style.css";

const providerItems = [
  { id: "aws", label: "AWS", icon: Cloud },
  { id: "gcp", label: "GCP", icon: CloudCog },
  { id: "azure", label: "Azure", icon: Cloud },
  { id: "kubernetes", label: "Kubernetes", icon: Boxes },
  { id: "databases", label: "Databases", icon: Database },
  { id: "compute", label: "Compute", icon: Server },
  { id: "storage", label: "Storage", icon: FolderArchive },
];

const resourceLibrary = [
  {
    id: "ec2",
    label: "EC2 Instance",
    shortLabel: "EC2",
    icon: Server,
    provider: "aws",
    shape: "compute",
    status: "online",
    metadata: "t3.medium | us-east-1",
    instanceType: "t3.medium",
    region: "us-east-1",
    environment: "Production",
    vpc: "vpc-main-production",
    monthlyCost: 41,
    publicIp: true,
    autoScaling: false,
  },
  {
    id: "rds",
    label: "RDS Aurora",
    shortLabel: "RDS",
    icon: Database,
    provider: "aws",
    shape: "database",
    status: "healthy",
    metadata: "db.t3.large",
    instanceType: "db.t3.large",
    region: "us-east-1",
    environment: "Production",
    vpc: "vpc-main-production",
    monthlyCost: 128,
    publicIp: false,
    autoScaling: false,
  },
  {
    id: "s3",
    label: "S3 Bucket",
    shortLabel: "S3",
    icon: FolderArchive,
    provider: "aws",
    shape: "storage",
    status: "active",
    metadata: "Standard storage",
    instanceType: "Bucket",
    region: "us-east-1",
    environment: "Production",
    vpc: "vpc-main-production",
    monthlyCost: 23,
    publicIp: false,
    autoScaling: true,
  },
  {
    id: "gateway",
    label: "Gateway",
    shortLabel: "GW",
    icon: Router,
    provider: "aws",
    shape: "network",
    status: "healthy",
    metadata: "Ingress edge",
    instanceType: "Managed",
    region: "us-east-1",
    environment: "Production",
    vpc: "public-subnet-a",
    monthlyCost: 18,
    publicIp: true,
    autoScaling: false,
  },
  {
    id: "iam",
    label: "IAM Role",
    shortLabel: "IAM",
    icon: Shield,
    provider: "aws",
    shape: "security",
    status: "healthy",
    metadata: "Least privilege",
    instanceType: "Policy",
    region: "global",
    environment: "Production",
    vpc: "global",
    monthlyCost: 4,
    publicIp: false,
    autoScaling: false,
  },
];

const initialNodes = [
  {
    id: "gateway-main",
    type: "infraNode",
    position: { x: 420, y: 230 },
    data: {
      iconKey: "gateway",
      title: "IGW-Main",
      subtitle: "Public",
      status: "healthy",
      resourceType: "Gateway",
      environment: "Production",
      instanceType: "Managed",
      region: "us-east-1",
      vpc: "public-subnet-a",
      monthlyCost: 18,
      publicIp: true,
      autoScaling: false,
    },
  },
  {
    id: "app-worker-01",
    type: "infraNode",
    position: { x: 720, y: 215 },
    data: {
      iconKey: "ec2",
      title: "App-Worker-01",
      subtitle: "t3.medium | us-east-1",
      status: "online",
      resourceType: "AWS EC2 Instance",
      environment: "Production",
      instanceType: "t3.medium",
      region: "us-east-1",
      vpc: "vpc-main-production",
      monthlyCost: 41,
      publicIp: true,
      autoScaling: false,
    },
  },
  {
    id: "postgres-db",
    type: "infraNode",
    position: { x: 1020, y: 240 },
    data: {
      iconKey: "rds",
      title: "Postgres-DB",
      subtitle: "db.t3.large",
      status: "healthy",
      resourceType: "RDS Aurora",
      environment: "Production",
      instanceType: "db.t3.large",
      region: "us-east-1",
      vpc: "vpc-main-production",
      monthlyCost: 128,
      publicIp: false,
      autoScaling: false,
    },
  },
  {
    id: "assets-store",
    type: "infraNode",
    position: { x: 1030, y: 450 },
    data: {
      iconKey: "s3",
      title: "Assets-Store",
      subtitle: "Standard S3",
      status: "active",
      resourceType: "S3 Bucket",
      environment: "Production",
      instanceType: "Bucket",
      region: "us-east-1",
      vpc: "vpc-main-production",
      monthlyCost: 23,
      publicIp: false,
      autoScaling: true,
    },
  },
];

const initialEdges = [
  {
    id: "gateway-main->app-worker-01",
    source: "gateway-main",
    target: "app-worker-01",
    type: "dataFlow",
    data: { active: false },
  },
  {
    id: "app-worker-01->postgres-db",
    source: "app-worker-01",
    target: "postgres-db",
    type: "dataFlow",
    data: { active: true },
  },
  {
    id: "app-worker-01->assets-store",
    source: "app-worker-01",
    target: "assets-store",
    type: "dataFlow",
    data: { active: false },
  },
];

const iconRegistry = {
  ec2: Server,
  rds: Database,
  s3: FolderArchive,
  gateway: Router,
  iam: Shield,
};

const topTabs = ["Projects", "Templates", "Library", "History"];
const environmentOptions = ["Production", "Staging", "Development"];
const regionOptions = ["us-east-1", "us-west-2", "eu-central-1", "ap-south-1", "global"];
const vpcOptions = ["vpc-main-production", "vpc-main-staging", "public-subnet-a", "private-subnet-b", "global"];
const instanceCatalog = {
  Managed: 18,
  Bucket: 23,
  Policy: 4,
  "t3.medium": 41,
  "t3.large": 84,
  "m5.large": 112,
  "db.t3.large": 128,
};

function calculateMonthlyCost(instanceType, publicIp, autoScaling) {
  const baseCost = instanceCatalog[instanceType] ?? 30;
  const publicIpCost = publicIp ? 4 : 0;
  const autoScalingCost = autoScaling ? Math.round(baseCost * 0.35) : 0;
  return baseCost + publicIpCost + autoScalingCost;
}

function formatMonthlyCost(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function statusTone(status) {
  if (status === "online" || status === "healthy") {
    return "bg-emerald-500/10 text-emerald-600";
  }

  if (status === "warning") {
    return "bg-amber-500/10 text-amber-600";
  }

  return "bg-slate-500/10 text-slate-600";
}

function InfraNode({ data, selected }) {
  const Icon = iconRegistry[data.iconKey] ?? Server;

  return (
    <>
      <Handle type="target" position="left" className="!size-3 !border-2 !border-white !bg-slate-300" />
      <div
        className={cn(
          "min-w-[205px] rounded-2xl border bg-white px-5 py-4 shadow-[0px_10px_25px_rgba(15,23,42,0.08)] transition-all",
          selected ? "border-sky-400 ring-4 ring-sky-200/70" : "border-slate-200",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
            <Icon size={22} />
          </div>
          <div className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.24em]", statusTone(data.status))}>
            <span className="size-2 rounded-full bg-current opacity-80" />
            {data.status}
          </div>
        </div>
        <div className="mt-4 space-y-1">
          <p className="text-2xl font-bold tracking-tight text-slate-900">{data.title}</p>
          <p className="font-mono text-sm text-slate-500">{data.subtitle}</p>
        </div>
      </div>
      <Handle type="source" position="right" className="!size-3 !border-2 !border-white !bg-slate-300" />
    </>
  );
}

function DataFlowEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }) {
  const [path] = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });

  return (
    <>
      <defs>
        <marker id={`${id}-arrow`} markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={data?.active ? "#38bdf8" : "#cbd5e1"} />
        </marker>
      </defs>
      <BaseEdge path={path} markerEnd={`url(#${id}-arrow)`} style={{ stroke: data?.active ? "#38bdf8" : "#cbd5e1", strokeWidth: 2.5, strokeDasharray: data?.active ? "8 6" : undefined }} />
    </>
  );
}

const nodeTypes = { infraNode: InfraNode };
const edgeTypes = { dataFlow: DataFlowEdge };

function FlowToolbar() {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/90 px-2 py-2 shadow-sm backdrop-blur">
      <button type="button" onClick={() => zoomIn()} className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900" aria-label="Zoom in">
        <Plus size={18} />
      </button>
      <button type="button" onClick={() => zoomOut()} className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900" aria-label="Zoom out">
        <Minus size={18} />
      </button>
      <button type="button" onClick={() => fitView({ padding: 0.2, duration: 400 })} className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900" aria-label="Fit canvas">
        <Hand size={18} />
      </button>
    </div>
  );
}

function CanvasWorkspace() {
  const [provider, setProvider] = useState("aws");
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState("app-worker-01");
  const [searchTerm, setSearchTerm] = useState("");
  const [deployMessage, setDeployMessage] = useState("");

  const selectedNode = useMemo(
    () => nodes.find((node) => node.id === selectedNodeId) ?? nodes[0],
    [nodes, selectedNodeId],
  );
  const SelectedResourceIcon = iconRegistry[selectedNode?.data.iconKey] ?? Server;

  const filteredLibrary = useMemo(() => {
    return resourceLibrary.filter((resource) => {
      const matchesProvider = provider === "aws" ? resource.provider === "aws" : true;
      const matchesSearch = `${resource.label} ${resource.metadata}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesProvider && matchesSearch;
    });
  }, [provider, searchTerm]);

  const architectureStats = useMemo(() => {
    const monthlyCost = nodes.reduce((sum, node) => sum + (node.data.monthlyCost ?? 0), 0);
    const onlineNodes = nodes.filter((node) => ["online", "healthy", "active"].includes(node.data.status)).length;
    return {
      nodeCount: nodes.length,
      connectionCount: edges.length,
      onlineNodes,
      monthlyCost,
    };
  }, [nodes, edges]);

  const updateSelectedNode = useCallback((updater) => {
    setNodes((currentNodes) =>
      currentNodes.map((node) => {
        if (node.id !== selectedNodeId) {
          return node;
        }

        const nextData = typeof updater === "function" ? updater(node.data) : { ...node.data, ...updater };
        return { ...node, data: nextData };
      }),
    );
  }, [selectedNodeId]);

  const handleNodesChange = useCallback(
    (changes) => setNodes((currentNodes) => applyNodeChanges(changes, currentNodes)),
    [],
  );

  const handleEdgesChange = useCallback(
    (changes) => setEdges((currentEdges) => applyEdgeChanges(changes, currentEdges)),
    [],
  );

  const handleNodeClick = useCallback((_, node) => {
    setSelectedNodeId(node.id);
  }, []);

  const handleAddResource = useCallback((resource) => {
    const nextIndex = nodes.length + 1;
    const title = `${resource.label.replace(/\s+/g, "-")}-${String(nextIndex).padStart(2, "0")}`;
    const subtitle = resource.metadata;
    const id = `${resource.id}-${Date.now()}`;
    const monthlyCost = calculateMonthlyCost(resource.instanceType, resource.publicIp, resource.autoScaling);

    const nextNode = {
      id,
      type: "infraNode",
      position: { x: 540 + (nextIndex % 3) * 180, y: 420 + (nextIndex % 2) * 130 },
      data: {
        iconKey: resource.id,
        title,
        subtitle,
        status: resource.status,
        resourceType: resource.label,
        environment: resource.environment,
        instanceType: resource.instanceType,
        region: resource.region,
        vpc: resource.vpc,
        monthlyCost,
        publicIp: resource.publicIp,
        autoScaling: resource.autoScaling,
      },
    };

    setNodes((currentNodes) => [...currentNodes, nextNode]);

    setEdges((currentEdges) => [
      ...currentEdges,
      {
        id: `${selectedNodeId}->${id}`,
        source: selectedNodeId,
        target: id,
        type: "dataFlow",
        data: { active: false },
      },
    ]);

    setSelectedNodeId(id);
  }, [nodes.length, selectedNodeId]);

  const handleFieldChange = useCallback((field, value) => {
    updateSelectedNode((currentData) => {
      const nextData = { ...currentData, [field]: value };
      const subtitleParts = [nextData.instanceType, nextData.region].filter(Boolean);
      nextData.subtitle = subtitleParts.join(" | ");
      nextData.monthlyCost = calculateMonthlyCost(
        nextData.instanceType,
        nextData.publicIp,
        nextData.autoScaling,
      );
      return nextData;
    });
  }, [updateSelectedNode]);

  const handleExport = useCallback(() => {
    const payload = JSON.stringify({ nodes, edges }, null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "design-architecture-export.json";
    anchor.click();
    URL.revokeObjectURL(url);
  }, [nodes, edges]);

  const handleDeploy = useCallback(() => {
    setDeployMessage(
      `Deployment plan ready · ${architectureStats.nodeCount} services · ${formatMonthlyCost(architectureStats.monthlyCost)}/mo estimated`,
    );
  }, [architectureStats]);

  return (
    <div className="flex min-h-screen bg-[#f7f9fb] text-slate-950">
      <aside className="hidden w-[280px] shrink-0 border-r border-slate-200 bg-white xl:flex xl:flex-col">
        <div className="p-7">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
              <Boxes size={22} />
            </div>
            <div>
              <h1 className="text-[2.1rem] font-black leading-none tracking-tight">InfraDesigner</h1>
              <p className="mt-1 text-sm text-slate-500">System Architect</p>
            </div>
          </div>
          <button type="button" className="mt-9 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-black px-5 py-4 text-base font-semibold text-white transition hover:bg-slate-800">
            <Plus size={20} />
            New Project
          </button>
          <nav className="mt-10 space-y-2">
            {providerItems.map((item) => {
              const Icon = item.icon;
              const active = provider === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setProvider(item.id)}
                  className={cn(
                    "flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left text-xl font-medium transition",
                    active ? "bg-sky-400 text-sky-950" : "text-slate-700 hover:bg-slate-100",
                  )}
                >
                  <Icon size={26} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto border-t border-slate-200 p-7">
          <div className="space-y-2">
            <button type="button" className="flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left text-xl text-slate-700 transition hover:bg-slate-100">
              <Settings size={24} />
              Settings
            </button>
            <button type="button" className="flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left text-xl text-slate-700 transition hover:bg-slate-100">
              <LifeBuoy size={24} />
              Support
            </button>
          </div>
          <div className="mt-8 flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0f172a,#0ea5e9)] text-sm font-bold text-white">
              AT
            </div>
            <div>
              <p className="text-xl font-semibold">Archie Tek</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-20 items-center justify-between gap-6 border-b border-slate-200 bg-white px-6 xl:px-8">
          <div className="flex min-w-0 items-center gap-6">
            <div>
              <h2 className="text-2xl font-black leading-tight tracking-tight xl:text-[2rem]">Architecture Architect v1.0</h2>
            </div>
            <label className="hidden items-center gap-3 rounded-full bg-slate-100 px-4 py-3 text-slate-500 md:flex md:min-w-[260px]">
              <Search size={16} />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                placeholder="Search architecture..."
              />
            </label>
            <nav className="hidden items-center gap-6 lg:flex">
              {topTabs.map((tab, index) => (
                <button
                  key={tab}
                  type="button"
                  className={cn(
                    "border-b-2 pb-1 text-lg transition",
                    index === 0 ? "border-sky-400 text-slate-950" : "border-transparent text-slate-500 hover:text-slate-900",
                  )}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <FlowToolbar />
            <button type="button" onClick={handleExport} className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-900 transition hover:bg-slate-50">
              <Upload size={18} />
              Export
            </button>
            <button type="button" onClick={handleDeploy} className="inline-flex items-center gap-2 rounded-2xl bg-black px-5 py-3 text-base font-semibold text-white transition hover:bg-slate-800">
              <Save size={18} />
              Deploy
            </button>
          </div>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-1 xl:grid-cols-[1fr_360px]">
          <section className="relative min-h-[720px] border-r border-slate-200">
            <ReactFlow
              className="bg-[#f7f9fb]"
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              onNodesChange={handleNodesChange}
              onEdgesChange={handleEdgesChange}
              onNodeClick={handleNodeClick}
              fitView
              proOptions={{ hideAttribution: true }}
              defaultEdgeOptions={{ type: "dataFlow" }}
              nodesDraggable
            >
              <Background id="grid" variant={BackgroundVariant.Dots} gap={20} size={1.2} color="#cbd5e1" />
              <MiniMap pannable zoomable className="!bottom-5 !right-5 !rounded-2xl !border !border-slate-200 !bg-white/90 !shadow-sm" />
              <Panel position="top-left" className="!left-8 !top-8 !m-0">
                <div className="w-[248px] rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-[0px_12px_30px_rgba(15,23,42,0.08)] backdrop-blur">
                  <div className="mb-4 flex items-center justify-between border-b border-slate-200 px-2 pb-4">
                    <div>
                      <p className="font-mono text-sm uppercase tracking-[0.3em] text-slate-500">Resource Library</p>
                    </div>
                    <Library size={16} className="text-slate-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {filteredLibrary.map((resource) => {
                      const Icon = resource.icon;
                      return (
                        <button
                          key={resource.id}
                          type="button"
                          onClick={() => handleAddResource(resource)}
                          className="group rounded-2xl border border-transparent px-3 py-4 text-center transition hover:border-sky-300 hover:bg-slate-50"
                        >
                          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 transition group-hover:bg-sky-100">
                            <Icon size={20} />
                          </div>
                          <p className="mt-3 text-xs font-medium leading-4 text-slate-700">{resource.label}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </Panel>
            </ReactFlow>
            {deployMessage && (
              <div className="absolute bottom-6 left-6 z-20 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 shadow-sm">
                {deployMessage}
              </div>
            )}
          </section>

          <aside className="flex min-h-[720px] flex-col bg-white">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-6">
              <div className="flex items-center gap-3">
                <Settings size={20} className="text-sky-600" />
                <h3 className="text-2xl font-bold tracking-tight">Properties</h3>
              </div>
              <button type="button" className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600">
                <X size={22} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-4">
                  <div className="flex size-16 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                    <SelectedResourceIcon size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Selected Resource</p>
                    <p className="text-2xl font-bold tracking-tight">{selectedNode?.data.resourceType}</p>
                  </div>
                </div>
              </div>

              <div className="mt-7 space-y-7">
                <InspectorSection title="Identity">
                  <Field label="Resource Name">
                    <input value={selectedNode?.data.title ?? ""} onChange={(event) => handleFieldChange("title", event.target.value)} className="inspector-input" />
                  </Field>
                  <Field label="Environment">
                    <select value={selectedNode?.data.environment ?? environmentOptions[0]} onChange={(event) => handleFieldChange("environment", event.target.value)} className="inspector-input">
                      {environmentOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </Field>
                </InspectorSection>

                <InspectorSection title="Infrastructure Settings">
                  <Field label="Instance Type">
                    <select value={selectedNode?.data.instanceType ?? "t3.medium"} onChange={(event) => handleFieldChange("instanceType", event.target.value)} className="inspector-input">
                      {Object.keys(instanceCatalog).map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Region">
                    <select value={selectedNode?.data.region ?? regionOptions[0]} onChange={(event) => handleFieldChange("region", event.target.value)} className="inspector-input">
                      {regionOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="VPC Assignment">
                    <select value={selectedNode?.data.vpc ?? vpcOptions[0]} onChange={(event) => handleFieldChange("vpc", event.target.value)} className="inspector-input">
                      {vpcOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </Field>
                </InspectorSection>

                <InspectorSection title="Storage & Network">
                  <ToggleRow label="Public IP" checked={Boolean(selectedNode?.data.publicIp)} onChange={(value) => handleFieldChange("publicIp", value)} />
                  <ToggleRow label="Auto-Scaling" checked={Boolean(selectedNode?.data.autoScaling)} onChange={(value) => handleFieldChange("autoScaling", value)} />
                </InspectorSection>

                <InspectorSection title="Architecture Health">
                  <div className="grid grid-cols-2 gap-3">
                    <StatCard label="Resources" value={String(architectureStats.nodeCount)} />
                    <StatCard label="Connections" value={String(architectureStats.connectionCount)} />
                    <StatCard label="Healthy" value={String(architectureStats.onlineNodes)} />
                    <StatCard label="Estimated / mo" value={formatMonthlyCost(architectureStats.monthlyCost)} compact />
                  </div>
                </InspectorSection>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 border-t border-slate-200 px-6 py-5">
              <button type="button" className="rounded-2xl border border-slate-300 px-4 py-3 text-base font-semibold text-slate-700 transition hover:bg-slate-50">
                Discard
              </button>
              <button type="button" className="rounded-2xl bg-sky-500 px-4 py-3 text-base font-semibold text-slate-950 transition hover:bg-sky-400">
                Save Changes
              </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function InspectorSection({ title, children }) {
  return (
    <section>
      <p className="mb-4 font-mono text-sm uppercase tracking-[0.24em] text-slate-500">{title}</p>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      {children}
    </label>
  );
}

function ToggleRow({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3">
      <span className="text-lg text-slate-700">{label}</span>
      <button
        type="button"
        aria-pressed={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-7 w-12 rounded-full transition",
          checked ? "bg-sky-400" : "bg-slate-200",
        )}
      >
        <span
          className={cn(
            "absolute top-1 size-5 rounded-full bg-white shadow-sm transition",
            checked ? "left-6" : "left-1",
          )}
        />
      </button>
    </div>
  );
}

function StatCard({ label, value, compact = false }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className={cn("mt-2 font-bold tracking-tight text-slate-950", compact ? "text-xl" : "text-2xl")}>{value}</p>
    </div>
  );
}

export default function DesignArchitecturePage() {
  return (
    <ReactFlowProvider>
      <CanvasWorkspace />
    </ReactFlowProvider>
  );
}

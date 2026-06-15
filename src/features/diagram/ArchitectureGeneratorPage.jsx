import { useMemo, useRef, useState } from "react";
import { Arrow, Circle, Group, Image as KonvaImage, Layer, Line, Rect, Stage, Text } from "react-konva";

import { starterEdges, starterNodes, toolCatalog, toolCatalogMap } from "./toolCatalog";
import { useIconLibrary } from "./useIconLibrary";

const stageSize = { width: 920, height: 620 };
const nodeSize = { width: 200, height: 96 };
const generatorMetrics = [
  ["Canvas", "Drag, connect, and export architecture blocks"],
  ["Tool Palette", "Preloaded DevOps services and platform components"],
  ["Selection", "Click a node to edit labels or remove it cleanly"],
];

function IconButton({ active = false, children, onClick, tone = "default" }) {
  const toneClasses =
    tone === "danger"
      ? "border-rose-200 bg-rose-50 text-rose-600 hover:border-rose-300 hover:bg-rose-100 dark:border-rose-950/50 dark:bg-rose-950/25 dark:text-rose-300"
      : active
        ? "border-primary bg-primary text-on-primary shadow-glow"
        : "border-outline-variant/40 bg-surface-container-lowest/85 text-on-surface hover:border-primary/35 hover:text-primary";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-full border px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] transition-all ${toneClasses}`}
    >
      {children}
    </button>
  );
}

function getNodeCenter(node) {
  return {
    x: node.x + nodeSize.width / 2,
    y: node.y + nodeSize.height / 2,
  };
}

function getEdgePoints(fromNode, toNode) {
  const from = getNodeCenter(fromNode);
  const to = getNodeCenter(toNode);
  const midX = from.x + (to.x - from.x) / 2;

  return [from.x, from.y, midX, from.y, midX, to.y, to.x, to.y];
}

function getNextNodePosition(count) {
  const row = Math.floor(count / 4);
  const col = count % 4;

  return {
    x: 50 + col * 212,
    y: 70 + row * 128,
  };
}

function buildNode(toolId, count) {
  const tool = toolCatalogMap[toolId];
  const nextPosition = getNextNodePosition(count);

  return {
    id: `node-${crypto.randomUUID()}`,
    toolId,
    label: tool.name,
    x: nextPosition.x,
    y: nextPosition.y,
  };
}

function downloadPng(stageRef) {
  if (!stageRef.current) {
    return;
  }

  const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
  const link = document.createElement("a");
  link.download = "onlydevops-architecture-diagram.png";
  link.href = uri;
  link.click();
}

function DiagramNode({ iconLibrary, node, onMove, onSelect, selected }) {
  const tool = toolCatalogMap[node.toolId];
  const iconImage = iconLibrary[node.toolId];

  return (
    <Group
      x={node.x}
      y={node.y}
      draggable
      onClick={() => onSelect(node.id)}
      onTap={() => onSelect(node.id)}
      onDragEnd={(event) => {
        onMove(node.id, {
          x: event.target.x(),
          y: event.target.y(),
        });
      }}
    >
      <Rect
        width={nodeSize.width}
        height={nodeSize.height}
        cornerRadius={28}
        fill="rgba(255,255,255,0.90)"
        stroke={selected ? "#006c4f" : "rgba(100,116,139,0.28)"}
        strokeWidth={selected ? 3 : 1.5}
        shadowColor={selected ? "rgba(0,108,79,0.28)" : "rgba(15,23,42,0.08)"}
        shadowBlur={selected ? 22 : 14}
        shadowOffsetY={6}
      />
      <Rect width={nodeSize.width} height={10} cornerRadius={28} fill={tool.color} />
      {iconImage ? <KonvaImage image={iconImage} x={16} y={16} width={58} height={58} /> : null}
      <Text x={84} y={18} text={tool.category.toUpperCase()} fontFamily="JetBrains Mono" fontSize={10} fill="rgba(100,116,139,0.95)" />
      <Text
        x={84}
        y={38}
        text={node.label}
        fontFamily="Inter"
        fontSize={16}
        fontStyle="700"
        fill="#0f172a"
        width={100}
      />
      <Text
        x={84}
        y={66}
        text={tool.shortLabel}
        fontFamily="JetBrains Mono"
        fontSize={11}
        fill="rgba(15,23,42,0.62)"
        letterSpacing={0.6}
      />
    </Group>
  );
}

export default function ArchitectureGeneratorPage() {
  const [nodes, setNodes] = useState(starterNodes);
  const [edges, setEdges] = useState(starterEdges);
  const [selectedNodeId, setSelectedNodeId] = useState(starterNodes[0]?.id ?? null);
  const [linkMode, setLinkMode] = useState(false);
  const [pendingLinkNodeId, setPendingLinkNodeId] = useState(null);
  const stageRef = useRef(null);
  const iconLibrary = useIconLibrary(toolCatalog);

  const selectedNode = useMemo(
    () => nodes.find((node) => node.id === selectedNodeId) ?? null,
    [nodes, selectedNodeId],
  );

  const nodeIndex = useMemo(() => Object.fromEntries(nodes.map((node) => [node.id, node])), [nodes]);

  const addToolNode = (toolId) => {
    const newNode = buildNode(toolId, nodes.length);
    setNodes((current) => [...current, newNode]);
    setSelectedNodeId(newNode.id);
  };

  const updateNodePosition = (nodeId, position) => {
    setNodes((current) =>
      current.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              ...position,
            }
          : node,
      ),
    );
  };

  const updateSelectedNodeLabel = (label) => {
    setNodes((current) =>
      current.map((node) => (node.id === selectedNodeId ? { ...node, label } : node)),
    );
  };

  const updateSelectedNodeTool = (toolId) => {
    setNodes((current) =>
      current.map((node) =>
        node.id === selectedNodeId
          ? {
              ...node,
              toolId,
              label: toolCatalogMap[toolId].name,
            }
          : node,
      ),
    );
  };

  const deleteSelectedNode = () => {
    if (!selectedNodeId) {
      return;
    }

    setNodes((current) => current.filter((node) => node.id !== selectedNodeId));
    setEdges((current) => current.filter((edge) => edge.from !== selectedNodeId && edge.to !== selectedNodeId));
    setSelectedNodeId(null);
    setPendingLinkNodeId(null);
  };

  const duplicateSelectedNode = () => {
    if (!selectedNode) {
      return;
    }

                    const duplicate = {
      ...selectedNode,
      id: `node-${crypto.randomUUID()}`,
      x: Math.min(selectedNode.x + 40, stageSize.width - nodeSize.width - 20),
      y: Math.min(selectedNode.y + 40, stageSize.height - nodeSize.height - 20),
      label: `${selectedNode.label} Copy`,
    };

    setNodes((current) => [...current, duplicate]);
    setSelectedNodeId(duplicate.id);
  };

  const connectNodes = (nodeId) => {
    setSelectedNodeId(nodeId);

    if (!linkMode) {
      return;
    }

    if (!pendingLinkNodeId) {
      setPendingLinkNodeId(nodeId);
      return;
    }

    if (pendingLinkNodeId === nodeId) {
      setPendingLinkNodeId(null);
      return;
    }

    const edgeExists = edges.some(
      (edge) =>
        (edge.from === pendingLinkNodeId && edge.to === nodeId) ||
        (edge.from === nodeId && edge.to === pendingLinkNodeId),
    );

    if (!edgeExists) {
      setEdges((current) => [
        ...current,
        {
          id: `edge-${crypto.randomUUID()}`,
          from: pendingLinkNodeId,
          to: nodeId,
        },
      ]);
    }

    setPendingLinkNodeId(null);
    setLinkMode(false);
  };

  const resetStarterDiagram = () => {
    setNodes(starterNodes);
    setEdges(starterEdges);
    setSelectedNodeId(starterNodes[0]?.id ?? null);
    setLinkMode(false);
    setPendingLinkNodeId(null);
  };

  return (
    <>
      <main>
        <section className="relative overflow-hidden pb-14 pt-20 md:pb-20 md:pt-24">
          <div className="hero-glow absolute inset-0 -z-10" />
          <div className="mx-auto grid max-w-content gap-10 px-4 md:px-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                <span className="material-symbols-outlined text-base">deployed_code</span>
                Architecture Lab
              </div>
              <h1 className="max-w-4xl font-headline text-5xl font-extrabold leading-tight text-on-surface sm:text-6xl lg:text-7xl">
                Build clean
                <span className="block text-primary">infrastructure diagrams on canvas</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-on-surface-variant">
                Add DevOps components, connect services, drag architecture blocks, and export a clean PNG.
                The lab ships with a curated palette for cloud, CI/CD, observability, and Kubernetes workflows.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#architecture-lab"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 font-mono text-xs font-semibold uppercase text-on-primary shadow-glow transition-transform hover:scale-[1.02]"
                >
                  Open the Lab
                </a>
                <a
                  href="/#community"
                  className="inline-flex items-center justify-center rounded-full border border-outline px-8 py-4 font-mono text-xs font-semibold uppercase text-on-surface transition-colors hover:bg-surface-container-low"
                >
                  Request a Guided Demo
                </a>
              </div>
            </div>

            <div className="glass-panel relative overflow-hidden rounded-[32px] border border-outline-variant/30 p-6 shadow-ambient md:p-8">
              <div className="absolute -right-10 top-0 size-40 rounded-full bg-primary/10 blur-3xl" />
              <div className="grid gap-4">
                {generatorMetrics.map(([title, description], index) => (
                  <div key={title} className="rounded-[24px] border border-outline-variant/25 bg-surface-container-lowest/85 p-5">
                    <div className="mb-3 inline-flex size-10 items-center justify-center rounded-2xl bg-primary/10 font-mono text-sm font-semibold text-primary">
                      0{index + 1}
                    </div>
                    <h2 className="font-headline text-2xl font-bold text-on-surface">{title}</h2>
                    <p className="mt-2 text-base leading-7 text-on-surface-variant">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="architecture-lab" className="pb-24">
          <div className="mx-auto max-w-content px-4 md:px-16">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Interactive canvas generator
              </p>
              <h2 className="font-headline text-4xl font-bold text-on-surface md:text-5xl">
                Add a service. Drag it into place. Connect the flow.
              </h2>
              <p className="mt-4 text-base leading-8 text-on-surface-variant">
                Select any palette item to place it on the canvas. Click two nodes in link mode to draw a connection.
                Select a node to rename it, change its tool type, duplicate it, or delete it.
              </p>
            </div>

            <div className="grid gap-8 xl:grid-cols-[0.9fr_1.45fr_0.85fr] xl:items-start">
              <aside className="glass-panel rounded-[32px] border border-outline-variant/30 p-6 shadow-ambient xl:sticky xl:top-28">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-outline">
                      Tool palette
                    </p>
                    <h3 className="mt-2 font-headline text-2xl font-bold text-on-surface">DevOps components</h3>
                  </div>
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                    {toolCatalog.length} tools
                  </span>
                </div>
                <div className="space-y-3">
                  {toolCatalog.map((tool) => {
                    const IconComponent = tool.icon;

                    return (
                      <button
                        key={tool.id}
                        type="button"
                        onClick={() => addToolNode(tool.id)}
                        className="group flex w-full items-start gap-4 rounded-[24px] border border-outline-variant/30 bg-surface-container-lowest/80 p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-ambient"
                      >
                        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-surface-container-low shadow-sm">
                          <IconComponent aria-hidden="true" className="text-[34px]" style={{ color: tool.color }} />
                        </div>
                        <div>
                          <p className="font-headline text-lg font-bold text-on-surface">{tool.name}</p>
                          <p className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                            {tool.category}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-on-surface-variant">{tool.description}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </aside>

              <section className="glass-panel rounded-[32px] border border-outline-variant/30 p-4 shadow-ambient md:p-5">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-outline">
                      Canvas workspace
                    </p>
                    <h3 className="mt-2 font-headline text-2xl font-bold text-on-surface">OnlyDevOps Architecture Board</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <IconButton active={linkMode} onClick={() => {
                      setLinkMode((current) => !current);
                      setPendingLinkNodeId(null);
                    }}>
                      {linkMode ? "Cancel Link" : "Link Mode"}
                    </IconButton>
                    <IconButton onClick={() => downloadPng(stageRef)}>Export PNG</IconButton>
                    <IconButton onClick={resetStarterDiagram}>Reset</IconButton>
                  </div>
                </div>

                <div className="overflow-x-auto overflow-y-hidden rounded-[28px] border border-outline-variant/30 bg-[#0b1120]">
                  <Stage
                    ref={stageRef}
                    width={stageSize.width}
                    height={stageSize.height}
                    onMouseDown={(event) => {
                      if (event.target === event.target.getStage()) {
                        setSelectedNodeId(null);
                        if (!linkMode) {
                          setPendingLinkNodeId(null);
                        }
                      }
                    }}
                  >
                    <Layer>
                      {Array.from({ length: 24 }).map((_, index) => (
                        <Line
                          key={`vertical-${index}`}
                          points={[index * 50, 0, index * 50, stageSize.height]}
                          stroke="rgba(148,163,184,0.12)"
                          strokeWidth={1}
                        />
                      ))}
                      {Array.from({ length: 16 }).map((_, index) => (
                        <Line
                          key={`horizontal-${index}`}
                          points={[0, index * 50, stageSize.width, index * 50]}
                          stroke="rgba(148,163,184,0.12)"
                          strokeWidth={1}
                        />
                      ))}
                      <Rect x={18} y={18} width={884} height={584} cornerRadius={30} stroke="rgba(255,255,255,0.12)" dash={[10, 12]} />

                      {edges.map((edge) => {
                        const fromNode = nodeIndex[edge.from];
                        const toNode = nodeIndex[edge.to];

                        if (!fromNode || !toNode) {
                          return null;
                        }

                        return (
                          <Arrow
                            key={edge.id}
                            points={getEdgePoints(fromNode, toNode)}
                            tension={0.2}
                            stroke="rgba(96,165,250,0.92)"
                            fill="rgba(96,165,250,0.92)"
                            strokeWidth={3}
                            pointerLength={10}
                            pointerWidth={10}
                            lineCap="round"
                            lineJoin="round"
                          />
                        );
                      })}

                      {nodes.map((node) => (
                        <DiagramNode
                          key={node.id}
                          iconLibrary={iconLibrary}
                          node={node}
                          onMove={updateNodePosition}
                          onSelect={connectNodes}
                          selected={selectedNodeId === node.id || pendingLinkNodeId === node.id}
                        />
                      ))}

                      {pendingLinkNodeId ? (() => {
                        const pendingNode = nodeIndex[pendingLinkNodeId];
                        if (!pendingNode) {
                          return null;
                        }
                        const center = getNodeCenter(pendingNode);
                        return <Circle x={center.x} y={center.y} radius={12} fill="rgba(0,226,144,0.92)" shadowBlur={18} shadowColor="rgba(0,226,144,0.6)" />;
                      })() : null}
                    </Layer>
                  </Stage>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-on-surface-variant">
                  <span className="rounded-full border border-outline-variant/30 bg-surface-container-low px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em]">
                    Nodes: {nodes.length}
                  </span>
                  <span className="rounded-full border border-outline-variant/30 bg-surface-container-low px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em]">
                    Connections: {edges.length}
                  </span>
                  <span className="rounded-full border border-outline-variant/30 bg-surface-container-low px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                    {linkMode
                      ? pendingLinkNodeId
                        ? "Select the second node to finish the link"
                        : "Select the first node to start a link"
                      : "Drag nodes freely across the board"}
                  </span>
                </div>
              </section>

              <aside className="glass-panel rounded-[32px] border border-outline-variant/30 p-6 shadow-ambient xl:sticky xl:top-28">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-outline">
                  Inspector
                </p>
                <h3 className="mt-2 font-headline text-2xl font-bold text-on-surface">Selected node</h3>

                {selectedNode ? (
                  <div className="mt-6 space-y-6">
                    <div className="rounded-[28px] border border-outline-variant/30 bg-surface-container-lowest/85 p-5">
                      <label className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-outline">
                        Label
                      </label>
                      <input
                        value={selectedNode.label}
                        onChange={(event) => updateSelectedNodeLabel(event.target.value)}
                        className="mt-3 w-full rounded-2xl border border-outline-variant/35 bg-transparent px-4 py-3 text-base text-on-surface outline-none transition-colors focus:border-primary"
                      />
                    </div>

                    <div className="rounded-[28px] border border-outline-variant/30 bg-surface-container-lowest/85 p-5">
                      <label className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-outline">
                        Tool type
                      </label>
                      <select
                        value={selectedNode.toolId}
                        onChange={(event) => updateSelectedNodeTool(event.target.value)}
                        className="mt-3 w-full rounded-2xl border border-outline-variant/35 bg-transparent px-4 py-3 text-base text-on-surface outline-none transition-colors focus:border-primary"
                      >
                        {toolCatalog.map((tool) => (
                          <option key={tool.id} value={tool.id}>
                            {tool.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-[24px] border border-outline-variant/30 bg-surface-container-lowest/85 p-4">
                        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-outline">X position</p>
                        <p className="mt-2 text-2xl font-bold text-on-surface">{Math.round(selectedNode.x)}</p>
                      </div>
                      <div className="rounded-[24px] border border-outline-variant/30 bg-surface-container-lowest/85 p-4">
                        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-outline">Y position</p>
                        <p className="mt-2 text-2xl font-bold text-on-surface">{Math.round(selectedNode.y)}</p>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                      <IconButton onClick={duplicateSelectedNode}>Duplicate Node</IconButton>
                      <IconButton tone="danger" onClick={deleteSelectedNode}>Delete Node</IconButton>
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 rounded-[28px] border border-dashed border-outline-variant/35 bg-surface-container-lowest/70 p-6 text-center">
                    <p className="text-base leading-7 text-on-surface-variant">
                      Select a node on the canvas to rename it, change the tool, or remove it.
                    </p>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

const views = [
  {
    name: "Overview",
    title: "A whole system. Every layer considered.",
    text: "Explore the interface, computing core and infrastructure. Each part connects to the next.",
    camera: [5.5, 4.5, 6.9],
    target: [0, 0.6, 0],
  },
  {
    name: "Interface",
    title: "Where people meet the product.",
    text: "React, Next.js, Flutter and Figma turn complex workflows into thoughtful interfaces.",
    camera: [0, 3.4, 6.3],
    target: [-1.1, 1.1, -0.2],
  },
  {
    name: "Intelligence",
    title: "From data to useful intelligence.",
    text: "PyTorch, TensorFlow and Python power the models and pipelines behind the experience.",
    camera: [2.8, 5.2, 4.3],
    target: [0.3, 0.3, 1],
  },
  {
    name: "Infrastructure",
    title: "Built to run beyond the demo.",
    text: "APIs, Docker, Kubernetes and CI/CD keep the product connected, deployable and dependable.",
    camera: [5.5, 3, 5.3],
    target: [1.8, 1, -0.6],
  },
];

/** Detailed, explorable workstation; rendering sleeps offscreen and when paused. */
export default function OrbitalScene({ paused = false }: { paused?: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const [view, setView] = useState(0);
  const [exploded, setExploded] = useState(false);
  const [failed, setFailed] = useState(false);
  const settings = useRef({ paused, view, exploded });
  const refresh = useRef<() => void>(() => {});
  useEffect(() => {
    settings.current = { paused, view, exploded };
    refresh.current();
  }, [paused, view, exploded]);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      setFailed(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    element.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(39, 1, 0.1, 60);
    camera.position.fromArray(views[0].camera);
    const focus = new THREE.Vector3(0, 0.6, 0);
    const root = new THREE.Group();
    scene.add(root);
    const materials: THREE.Material[] = [];
    const geometries: THREE.BufferGeometry[] = [];
    const material = (color: number, metalness = 0.45, roughness = 0.4) => {
      const m = new THREE.MeshStandardMaterial({ color, metalness, roughness });
      materials.push(m);
      return m;
    };
    const graphite = material(0x1e2936),
      silver = material(0x8795a8, 0.8, 0.26),
      dark = material(0x070d14),
      copper = material(0xbc7048, 0.75),
      pcb = material(0x174245),
      white = material(0xc5cfd9);
    const glow = new THREE.MeshStandardMaterial({
      color: 0xffb173,
      emissive: 0xff7636,
      emissiveIntensity: 2,
    });
    materials.push(glow);
    const blue = new THREE.MeshStandardMaterial({
      color: 0x83d5ff,
      emissive: 0x308cce,
      emissiveIntensity: 1.4,
    });
    materials.push(blue);
    const box = (
      parent: THREE.Object3D,
      size: number[],
      pos: number[],
      mat: THREE.Material,
      rounded = false,
    ) => {
      const geometry = rounded
        ? new RoundedBoxGeometry(
            size[0],
            size[1],
            size[2],
            2,
            Math.min(...size) * 0.16,
          )
        : new THREE.BoxGeometry(...(size as [number, number, number]));
      geometries.push(geometry);
      const mesh = new THREE.Mesh(geometry, mat);
      mesh.position.fromArray(pos);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      parent.add(mesh);
      return mesh;
    };
    const cylinder = (
      parent: THREE.Object3D,
      radius: number,
      depth: number,
      pos: number[],
      mat: THREE.Material,
    ) => {
      const geometry = new THREE.CylinderGeometry(radius, radius, depth, 32);
      geometries.push(geometry);
      const mesh = new THREE.Mesh(geometry, mat);
      mesh.position.fromArray(pos);
      parent.add(mesh);
      return mesh;
    };
    // Machined desk, copper edge, isolation feet and a recessed light channel.
    box(root, [5.5, 0.18, 3.6], [0, -0.17, 0], graphite, true);
    box(root, [5.35, 0.04, 3.45], [0, -0.055, 0], copper, true);
    box(root, [5.25, 0.06, 3.35], [0, 0, 0], dark, true);
    box(root, [4.7, 0.025, 0.025], [0, -0.12, 1.81], glow);
    for (const x of [-2.2, 2.2])
      for (const z of [-1.3, 1.3])
        cylinder(root, 0.2, 0.2, [x, -0.32, z], dark);
    const ui = new THREE.Group(),
      ai = new THREE.Group(),
      server = new THREE.Group();
    root.add(ui, ai, server);
    // Monitor assembly: stand, rear shell, bezel and actual product screen.
    box(ui, [1.1, 0.07, 0.65], [-1.25, 0.09, -0.72], silver, true);
    box(ui, [0.14, 0.7, 0.16], [-1.25, 0.43, -0.86], silver);
    box(ui, [2.85, 1.64, 0.16], [-1.25, 1.48, -0.86], graphite, true);
    box(ui, [2.68, 1.48, 0.018], [-1.25, 1.49, -0.769], dark);
    const screenMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    materials.push(screenMaterial);
    const screenGeometry = new THREE.PlaneGeometry(2.61, 1.43);
    geometries.push(screenGeometry);
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(-1.25, 1.49, -0.755);
    ui.add(screen);
    let disposed = false;
    const texture = new THREE.TextureLoader().load(
      "/assets/projects/auctionmandu-web.webp",
      () => {
        if (!disposed) refresh.current();
      },
    );
    texture.colorSpace = THREE.SRGBColorSpace;
    screenMaterial.map = texture;
    cylinder(ui, 0.018, 0.02, [-1.25, 2.265, -0.76], blue).rotation.x =
      Math.PI / 2;
    box(ui, [0.15, 0.02, 0.01], [-0.06, 0.735, -0.764], glow);
    // A full keyboard with distinct keycaps, a space bar, trackpad and mouse.
    box(ui, [2.35, 0.075, 0.73], [-1.22, 0.1, 0.48], silver, true);
    for (let row = 0; row < 4; row++)
      for (let col = 0; col < 14; col++)
        box(
          ui,
          [0.125, 0.04, 0.12],
          [-2.25 + col * 0.156, 0.158, 0.22 + row * 0.16],
          col === 0 ? copper : graphite,
          true,
        );
    box(ui, [0.82, 0.04, 0.11], [-1.2, 0.16, 0.98], graphite, true);
    box(ui, [0.42, 0.13, 0.62], [-2.14, 0.14, 1.24], white, true);
    box(ui, [0.02, 0.02, 0.15], [-2.14, 0.215, 1.13], copper);
    // Computing core: PCB, etched traces, CPU, heatsink, memory and sockets.
    box(ai, [1.52, 0.085, 1.47], [0.53, 0.12, 0.72], pcb, true);
    for (let i = 0; i < 9; i++) {
      box(ai, [0.008, 0.012, 1.22], [-0.08 + i * 0.145, 0.17, 0.72], copper);
      box(ai, [1.3, 0.012, 0.007], [0.53, 0.172, 0.1 + i * 0.145], copper);
    }
    box(ai, [0.66, 0.09, 0.66], [0.52, 0.215, 0.69], dark);
    box(ai, [0.5, 0.06, 0.5], [0.52, 0.295, 0.69], silver);
    const heatsink = new THREE.Group();
    ai.add(heatsink);
    for (let i = 0; i < 9; i++)
      box(
        heatsink,
        [0.035, 0.23, 0.53],
        [0.285 + i * 0.057, 0.44, 0.69],
        copper,
      );
    for (let i = 0; i < 2; i++) {
      box(ai, [0.13, 0.24, 1], [1.02 + i * 0.17, 0.3, 0.72], graphite);
      for (let j = 0; j < 5; j++)
        box(
          ai,
          [0.025, 0.13, 0.12],
          [1.095 + i * 0.17, 0.32, 0.33 + j * 0.19],
          dark,
        );
    }
    for (let i = 0; i < 4; i++)
      cylinder(ai, 0.045, 0.15, [-0.03, 0.24, 0.25 + i * 0.29], silver);
    // Rack: three server sleds with handles, vents, ports, status lights, cooling fans.
    box(server, [1.16, 2.12, 1.3], [1.91, 1.1, -0.72], graphite, true);
    box(server, [1.02, 1.92, 0.03], [1.91, 1.12, -0.048], dark);
    for (let i = 0; i < 3; i++) {
      const y = 0.53 + i * 0.56;
      box(server, [0.95, 0.47, 0.08], [1.91, y, 0.005], silver, true);
      box(server, [0.7, 0.31, 0.03], [1.91, y, 0.06], graphite);
      for (let v = 0; v < 7; v++)
        box(server, [0.035, 0.2, 0.018], [1.66 + v * 0.07, y, 0.082], dark);
      box(
        server,
        [0.08, 0.02, 0.03],
        [2.28, y + 0.13, 0.063],
        i === 1 ? blue : glow,
      );
      box(server, [0.055, 0.28, 0.09], [1.49, y, 0.07], copper, true);
      const fan = cylinder(server, 0.22, 0.025, [2.503, y, -0.77], dark);
      fan.rotation.z = Math.PI / 2;
      const hub = cylinder(server, 0.07, 0.035, [2.525, y, -0.77], copper);
      hub.rotation.z = Math.PI / 2;
      for (let blade = 0; blade < 6; blade++) {
        const mesh = box(
          server,
          [0.018, 0.23, 0.045],
          [2.526, y, -0.77],
          silver,
        );
        mesh.rotation.x = (blade * Math.PI) / 3;
      }
    }
    // Patch cables visually connect the workstation, board and rack.
    for (let i = 0; i < 3; i++) {
      const path = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.6 + i * 0.15, 0.08, -1.2),
        new THREE.Vector3(0.2, 0.09, -1.48 + i * 0.09),
        new THREE.Vector3(0.85, 0.1, -1.3 + i * 0.09),
        new THREE.Vector3(1.4, 0.18, -0.65 + i * 0.15),
      ]);
      const geo = new THREE.TubeGeometry(path, 30, 0.017, 6, false);
      geometries.push(geo);
      root.add(new THREE.Mesh(geo, i === 1 ? copper : silver));
    }
    const floor = box(
      scene,
      [200, 0.05, 200],
      [0, -0.46, 0],
      new THREE.ShadowMaterial({ opacity: 0.3 }),
    );
    materials.push(floor.material as THREE.Material);
    scene.add(new THREE.HemisphereLight(0xcbe8ff, 0x17212e, 3));
    const key = new THREE.DirectionalLight(0xe0efff, 5);
    key.position.set(-4, 7, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -5;
    key.shadow.camera.right = 5;
    key.shadow.camera.top = 5;
    key.shadow.camera.bottom = -5;
    key.shadow.bias = -0.001;
    scene.add(key);
    const rim = new THREE.PointLight(0xff9658, 60);
    rim.position.set(3, 3, -2);
    scene.add(rim);
    let frame = 0,
      visible = false;
    const pointer = new THREE.Vector2();
    const draw = () => {
      frame = 0;
      if (disposed) return;
      const state = settings.current;
      const chosen = views[state.view];
      const cameraTarget = new THREE.Vector3().fromArray(chosen.camera);
      if (!state.paused) {
        cameraTarget.x += pointer.x * 0.45;
        cameraTarget.y += pointer.y * 0.2;
      }
      const step = state.paused ? 1 : 0.075;
      camera.position.lerp(cameraTarget, step);
      focus.lerp(new THREE.Vector3().fromArray(chosen.target), step);
      camera.lookAt(focus);
      const spread = state.exploded ? 1 : 0;
      ui.position.x = THREE.MathUtils.lerp(ui.position.x, -0.35 * spread, step);
      server.position.x = THREE.MathUtils.lerp(
        server.position.x,
        0.35 * spread,
        step,
      );
      heatsink.position.y = THREE.MathUtils.lerp(
        heatsink.position.y,
        0.8 * spread,
        step,
      );
      ai.position.y = THREE.MathUtils.lerp(ai.position.y, 0.2 * spread, step);
      renderer.render(scene, camera);
      if (visible && !document.hidden && !state.paused)
        frame = requestAnimationFrame(draw);
    };
    const wake = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (visible && !document.hidden) draw();
    };
    refresh.current = wake;
    const resize = () => {
      const { width, height } = element.getBoundingClientRect();
      renderer.setSize(width, height);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      wake();
    };
    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(element);
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        wake();
      },
      { rootMargin: "120px" },
    );
    observer.observe(element);
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const r = element.getBoundingClientRect();
      pointer.set(
        (event.clientX - r.left) / r.width - 0.5,
        (event.clientY - r.top) / r.height - 0.5,
      );
    };
    const leave = () => pointer.set(0, 0);
    const lost = (event: Event) => {
      event.preventDefault();
      cancelAnimationFrame(frame);
      setFailed(true);
    };
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", leave);
    renderer.domElement.addEventListener("webglcontextlost", lost);
    document.addEventListener("visibilitychange", wake);
    resize();
    return () => {
      disposed = true;
      refresh.current = () => {};
      cancelAnimationFrame(frame);
      observer.disconnect();
      sizeObserver.disconnect();
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", wake);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      texture.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);
  return (
    <div className="workshop-model">
      <div
        className="workshop-canvas"
        ref={host}
        role="img"
        aria-label="Detailed 3D engineering workstation with a working product screen, keyboard, computing core and server rack"
      >
        {failed && (
          <Image
            src="/assets/art/story-workshop.webp"
            alt="Engineering workshop overlooking the Himalayas"
            fill
            sizes="(max-width: 760px) 90vw, 50vw"
          />
        )}
      </div>
      <div
        className="workshop-controls"
        aria-label="Explore toolkit disciplines"
      >
        {views.map((item, i) => (
          <button
            key={item.name}
            aria-pressed={view === i}
            onClick={() => setView(i)}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="workshop-description" aria-live="polite">
        <strong>{views[view].title}</strong>
        <p>{views[view].text}</p>
      </div>
      <button
        className="workshop-explode"
        aria-pressed={exploded}
        onClick={() => setExploded(!exploded)}
      >
        {exploded ? "Reassemble workstation" : "Explore the layers"}
        <span aria-hidden="true">{exploded ? "−" : "+"}</span>
      </button>
    </div>
  );
}

"use client";
import { useEffect, useRef, useState, useId } from "react";
import * as THREE from "three";
import { profile } from "@/data/profile";
import { useDaylight } from "./ThemeImage";

const layers = [
  {
    title: "Where an idea becomes an interface.",
    text: "The human layer. Screens assemble around the planet, turning complex systems into something people can use.",
    position: [0, 1.3, 7.8],
  },
  {
    title: "Every request has somewhere to go.",
    text: "The connection layer. APIs carry a signal between people, products and the services behind them.",
    position: [5, 2, 6],
  },
  {
    title: "Patterns become possibilities.",
    text: "The intelligence layer. Connected neurons gather around the world: data, models and the decisions they make possible.",
    position: [-3.8, 2.2, 5.5],
  },
  {
    title: "A good launch is only the beginning.",
    text: "The orbital layer. Infrastructure keeps the signal alive, from a first deployment to the systems people rely on.",
    position: [3.5, 3.8, 4.5],
  },
  {
    title: "Different languages. Shared intent.",
    text: "The translation layer. Choosing the right language for each part of the system, then making the parts work together.",
    position: [-5, 0.6, 6.5],
  },
  {
    title: "Bring the whole world together.",
    text: "The creative layer. Design, engineering and a little curiosity meet in one connected system.",
    position: [0, 3.2, 10],
  },
];
export default function UniverseScene({
  paused = false,
}: {
  paused?: boolean;
}) {
  const host = useRef<HTMLDivElement>(null),
    section = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0),
    [failed, setFailed] = useState(false);
  const daylight = useDaylight(),
    id = useId().replace(/:/g, "");
  const state = useRef({ paused, active, daylight }),
    redraw = useRef<() => void>(() => {});
  useEffect(() => {
    state.current = { paused, active, daylight };
    redraw.current();
  }, [paused, active, daylight]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting)
            setActive(Number((entry.target as HTMLElement).dataset.layer));
      },
      { rootMargin: "-30% 0px -35% 0px" },
    );
    section.current
      ?.querySelectorAll(".universe-step")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const el = host.current;
    if (!el) return;
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
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene(),
      camera = new THREE.PerspectiveCamera(39, 1, 0.1, 100),
      world = new THREE.Group();
    scene.add(world);
    camera.position.set(0, 1.3, 7.8);
    const ambient = new THREE.AmbientLight(0x9ac9ff, 1.6);
    scene.add(ambient);
    const sun = new THREE.DirectionalLight(0xffd1a0, 4);
    sun.position.set(-5, 4, 5);
    scene.add(sun);
    const rim = new THREE.DirectionalLight(0x56bdff, 3);
    rim.position.set(4, 2, -3);
    scene.add(rim);
    const gold = new THREE.MeshStandardMaterial({
        color: 0xba8b4d,
        metalness: 0.75,
        roughness: 0.32,
      }),
      metal = new THREE.MeshStandardMaterial({
        color: 0xc6d3dc,
        metalness: 0.72,
        roughness: 0.25,
      }),
      blue = new THREE.MeshStandardMaterial({
        color: 0x14376b,
        metalness: 0.55,
        roughness: 0.3,
        emissive: 0x0e2854,
        emissiveIntensity: 0.45,
      }),
      glow = new THREE.MeshBasicMaterial({ color: 0x8be3ff }),
      amber = new THREE.MeshBasicMaterial({ color: 0xffcb87 });
    const mesh = (
      geometry: THREE.BufferGeometry,
      material: THREE.Material,
      parent: THREE.Object3D,
      x = 0,
      y = 0,
      z = 0,
    ) => {
      const m = new THREE.Mesh(geometry, material);
      m.position.set(x, y, z);
      parent.add(m);
      return m;
    };
    const textures: THREE.Texture[] = [];
    let disposed = false;
    const earthMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.85,
      metalness: 0.05,
    });
    const earth = mesh(
      new THREE.SphereGeometry(1.35, 64, 48),
      earthMaterial,
      world,
    );
    earth.rotation.y = -1.6;
    new THREE.TextureLoader().load("/assets/universe/earth.jpg", (texture) => {
      if (disposed) {
        texture.dispose();
        return;
      }
      texture.colorSpace = THREE.SRGBColorSpace;
      earthMaterial.map = texture;
      earthMaterial.needsUpdate = true;
      textures.push(texture);
      redraw.current();
    });
    const atmosphere = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: { tint: { value: new THREE.Color(0x66bcff) } },
      vertexShader:
        "varying vec3 n; varying vec3 v; void main(){vec4 p=modelViewMatrix*vec4(position,1.);n=normalize(normalMatrix*normal);v=normalize(-p.xyz);gl_Position=projectionMatrix*p;}",
      fragmentShader:
        "varying vec3 n;varying vec3 v;uniform vec3 tint;void main(){float a=pow(1.-abs(dot(normalize(n),normalize(v))),3.);gl_FragColor=vec4(tint,a*.6);}",
    });
    mesh(new THREE.SphereGeometry(1.43, 64, 48), atmosphere, world);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xc89965,
      transparent: true,
      opacity: 0.38,
    });
    [
      [2.1, 0.35, 0.25],
      [2.55, -0.55, -0.45],
      [3.1, 0.65, 0.3],
    ].forEach(([radius, tilt, twist]) => {
      const points = Array.from(
        { length: 181 },
        (_, i) =>
          new THREE.Vector3(
            Math.cos((i / 180) * Math.PI * 2) * radius,
            0,
            Math.sin((i / 180) * Math.PI * 2) * radius,
          ),
      );
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(points),
        lineMaterial,
      );
      line.rotation.set(tilt, 0, twist);
      world.add(line);
    });
    // Individually modelled bus, solar cells, dish, sensor and antenna.
    const satellite = new THREE.Group();
    world.add(satellite);
    mesh(new THREE.BoxGeometry(0.42, 0.45, 0.48), gold, satellite);
    mesh(new THREE.BoxGeometry(0.44, 0.04, 0.5), metal, satellite, 0, 0.24, 0);
    mesh(
      new THREE.CylinderGeometry(0.12, 0.16, 0.24, 24),
      metal,
      satellite,
      0,
      -0.32,
      0,
    );
    for (const side of [-1, 1]) {
      mesh(
        new THREE.BoxGeometry(0.35, 0.025, 0.04),
        metal,
        satellite,
        side * 0.35,
        0,
        0,
      );
      mesh(
        new THREE.BoxGeometry(0.8, 0.035, 0.51),
        metal,
        satellite,
        side * 0.89,
        0,
        0,
      );
      for (let row = 0; row < 3; row++)
        for (let col = 0; col < 6; col++)
          mesh(
            new THREE.BoxGeometry(0.12, 0.018, 0.148),
            blue,
            satellite,
            side * 0.89 + (col - 2.5) * 0.127,
            0.028,
            (row - 1) * 0.16,
          );
    }
    mesh(
      new THREE.LatheGeometry(
        Array.from({ length: 18 }, (_, i) => {
          const r = (i / 17) * 0.26;
          return new THREE.Vector2(r, r * r * 2.5);
        }),
        32,
      ),
      metal,
      satellite,
      0,
      0.38,
      0,
    ).rotation.z = 0.4;
    mesh(
      new THREE.CylinderGeometry(0.009, 0.009, 0.35, 8),
      metal,
      satellite,
      0.08,
      0.55,
      0,
    );
    mesh(
      new THREE.SphereGeometry(0.025, 12, 8),
      amber,
      satellite,
      0.08,
      0.74,
      0,
    );
    // Radiator fins, foil seams, instrument window and four attitude thrusters.
    for (let i = 0; i < 7; i++)
      mesh(
        new THREE.BoxGeometry(0.012, 0.37, 0.012),
        metal,
        satellite,
        (i - 3) * 0.055,
        0,
        0.245,
      );
    mesh(
      new THREE.CylinderGeometry(0.075, 0.075, 0.035, 24),
      blue,
      satellite,
      0,
      0,
      0.27,
    ).rotation.x = Math.PI / 2;
    for (const x of [-0.17, 0.17])
      for (const z of [-0.19, 0.19])
        mesh(
          new THREE.CylinderGeometry(0.025, 0.047, 0.08, 12),
          metal,
          satellite,
          x,
          -0.27,
          z,
        );
    for (const x of [-0.12, 0.12]) {
      const strut = mesh(
        new THREE.CylinderGeometry(0.006, 0.006, 0.25, 8),
        gold,
        satellite,
        x,
        0.52,
        0,
      );
      strut.rotation.z = x > 0 ? 0.5 : -0.5;
    }
    const neurons = new THREE.Group();
    world.add(neurons);
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < 76; i++) {
      const y = 1 - (i / 75) * 2,
        a = i * 2.399963,
        r = Math.sqrt(1 - y * y),
        p = new THREE.Vector3(
          Math.cos(a) * r,
          y,
          Math.sin(a) * r,
        ).multiplyScalar(1.7);
      nodes.push(p);
      mesh(
        new THREE.SphereGeometry(i % 9 === 0 ? 0.039 : 0.018, 8, 6),
        i % 9 === 0 ? amber : glow,
        neurons,
        p.x,
        p.y,
        p.z,
      );
    }
    const edges: number[] = [],
      routes: [THREE.Vector3, THREE.Vector3][] = [];
    nodes.forEach((p, i) =>
      nodes.forEach((q, j) => {
        if (j > i && p.distanceTo(q) < 0.67) {
          edges.push(...p.toArray(), ...q.toArray());
          routes.push([p, q]);
        }
      }),
    );
    const neuralMaterial = new THREE.LineBasicMaterial({
        color: 0x6fc4dd,
        transparent: true,
        opacity: 0.25,
      }),
      edgeGeometry = new THREE.BufferGeometry();
    edgeGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(edges, 3),
    );
    neurons.add(new THREE.LineSegments(edgeGeometry, neuralMaterial));
    const pulses = routes
      .filter((_, i) => i % 7 === 0)
      .map((route) => ({
        route,
        object: mesh(new THREE.SphereGeometry(0.027, 8, 6), amber, neurons),
      }));
    const panels = profile.skills.map((skill, i) => {
      const group = new THREE.Group();
      world.add(group);
      const canvas = document.createElement("canvas");
      canvas.width = 640;
      canvas.height = 384;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#0e1c2a";
      ctx.fillRect(0, 0, 640, 384);
      ctx.strokeStyle = "#779da8";
      ctx.lineWidth = 2;
      ctx.strokeRect(1, 1, 638, 382);
      ctx.fillStyle = "#e7bc86";
      ctx.font = "20px monospace";
      ctx.fillText(`0${i + 1} / VOIDCU SYSTEMS`, 28, 42);
      ctx.fillStyle = "#f2eee6";
      ctx.font = "bold 32px sans-serif";
      ctx.fillText(skill.category, 28, 104);
      skill.items.slice(0, 6).forEach((name, j) => {
        ctx.fillStyle = "#87c7d8";
        ctx.fillRect(28, 142 + j * 33, 5, 5);
        ctx.fillStyle = "#b8c9d4";
        ctx.font = "21px monospace";
        ctx.fillText(name, 48, 154 + j * 33);
      });
      const pieces: THREE.Mesh[] = [];
      for (let k = 0; k < 3; k++) {
        const tex = new THREE.CanvasTexture(canvas);
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.repeat.set(1 / 3, 1);
        tex.offset.x = k / 3;
        textures.push(tex);
        pieces.push(
          mesh(
            new THREE.PlaneGeometry(0.43, 0.78),
            new THREE.MeshBasicMaterial({
              map: tex,
              side: THREE.DoubleSide,
              transparent: true,
              opacity: 0.95,
            }),
            group,
            (k - 1) * 0.43,
          ),
        );
      }
      return { group, pieces, angle: (i / 6) * Math.PI * 2 };
    });
    const stars = new THREE.BufferGeometry(),
      starPositions: number[] = [];
    for (let i = 0; i < 360; i++) {
      const a = i * 2.3999,
        z = (((i * 37) % 359) / 359) * 2 - 1,
        r = Math.sqrt(1 - z * z) * 13;
      starPositions.push(Math.cos(a) * r, z * 10, Math.sin(a) * r);
    }
    stars.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starPositions, 3),
    );
    const starMaterial = new THREE.PointsMaterial({
      color: 0xb9d5e9,
      size: 0.024,
      transparent: true,
      opacity: 0.65,
    });
    scene.add(new THREE.Points(stars, starMaterial));
    let frame = 0,
      visible = false,
      last = 0,
      time = 0;
    const targetCamera = new THREE.Vector3();
    const render = (now = 0) => {
      frame = 0;
      if (disposed || !visible || document.hidden) return;
      const { paused, active, daylight } = state.current;
      const dt = Math.min((now - last) / 1000 || 0, 0.05);
      last = now;
      if (!paused) time += dt;
      const lightsOff = document.documentElement.dataset.illumination === "off";
      ambient.intensity = daylight ? 2.8 : lightsOff ? 0.65 : 1.6;
      sun.intensity = daylight ? 4 : lightsOff ? 1.5 : 4;
      rim.intensity = lightsOff ? 0.3 : 3;
      starMaterial.opacity = daylight ? 0.22 : 0.65;
      starMaterial.color.set(daylight ? 0x547a92 : 0xb9d5e9);
      targetCamera.fromArray(layers[active].position);
      targetCamera.multiplyScalar(camera.aspect < 0.9 ? 1.18 : 1);
      camera.position.lerp(targetCamera, paused ? 1 : 1 - Math.exp(-dt * 3));
      camera.lookAt(0, 0, 0);
      earth.rotation.y = -1.6 + time * 0.035;
      neuralMaterial.opacity = active === 2 ? 0.6 : 0.18;
      neurons.rotation.y = time * 0.018;
      pulses.forEach(({ route, object }, i) =>
        object.position.lerpVectors(
          route[0],
          route[1],
          (time * 0.28 + i * 0.16) % 1,
        ),
      );
      const a = time * 0.12 + 0.65;
      satellite.position.set(
        Math.cos(a) * 2.55,
        Math.sin(a) * 1.1,
        Math.sin(a) * 2.1,
      );
      satellite.rotation.set(0.2, a + 0.3, 0.4);
      panels.forEach(({ group, pieces, angle }, i) => {
        const t = angle - (active / 6) * Math.PI * 2,
          desired = new THREE.Vector3(
            Math.sin(t) * 2.85,
            0.2 + Math.cos(t) * 0.25,
            Math.cos(t) * 2.3,
          );
        group.position.lerp(desired, paused ? 1 : 0.08);
        group.lookAt(camera.position);
        group.scale.setScalar(i === active ? 1.1 : 0.65);
        pieces.forEach((p, k) => {
          p.position.x = THREE.MathUtils.lerp(
            p.position.x,
            (k - 1) * (i === active ? 0.43 : 0.62),
            paused ? 1 : 0.08,
          );
          p.position.z = THREE.MathUtils.lerp(
            p.position.z,
            i === active ? 0 : (k - 1) * 0.16,
            paused ? 1 : 0.08,
          );
        });
      });
      renderer.render(scene, camera);
      if (!paused) frame = requestAnimationFrame(render);
    };
    const request = () => {
      if (!frame && !disposed) frame = requestAnimationFrame(render);
    };
    redraw.current = request;
    const resize = new ResizeObserver(() => {
      const { width, height } = el.getBoundingClientRect();
      renderer.setSize(width, height);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      request();
    });
    resize.observe(el);
    const visibility = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          last = performance.now();
          request();
        } else {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      { rootMargin: "120px" },
    );
    visibility.observe(el);
    const resume = () => {
      last = performance.now();
      request();
    };
    document.addEventListener("visibilitychange", resume);
    const theme = new MutationObserver(request);
    theme.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-illumination"],
    });
    const lost = (e: Event) => {
      e.preventDefault();
      setFailed(true);
      cancelAnimationFrame(frame);
    };
    renderer.domElement.addEventListener("webglcontextlost", lost);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      visibility.disconnect();
      theme.disconnect();
      document.removeEventListener("visibilitychange", resume);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      const geometries = new Set<THREE.BufferGeometry>(),
        materials = new Set<THREE.Material>();
      scene.traverse((o) => {
        if (
          o instanceof THREE.Mesh ||
          o instanceof THREE.Line ||
          o instanceof THREE.Points
        ) {
          geometries.add(o.geometry);
          (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) =>
            materials.add(m),
          );
        }
      });
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      renderer.dispose();
      renderer.domElement.remove();
      redraw.current = () => {};
    };
  }, []);
  const select = (i: number) => {
    setActive(i);
    document.getElementById(`${id}-${i}`)?.scrollIntoView({
      behavior: paused ? "instant" : "smooth",
      block: "center",
    });
  };
  return (
    <div className="skills-universe" ref={section}>
      <div className="universe-sticky">
        <div className="universe-coordinate">
          <span>VOIDCU / CONNECTED SYSTEMS</span>
          <span>27.7172° N · 85.3240° E</span>
        </div>
        <div
          ref={host}
          className="universe-canvas"
          role="img"
          aria-label={`Earth, satellite and neural network: ${profile.skills[active].category}`}
        />
        {failed && (
          <div className="universe-fallback">
            <div className="fallback-orbit" />
            <strong>One connected world.</strong>
            <p>Explore every layer below.</p>
          </div>
        )}
        <div className="universe-readout">
          <span>LAYER 0{active + 1} / 06</span>
          <strong>{profile.skills[active].category}</strong>
          <span>{paused ? "STILL VIEW" : "SCROLL TO EXPLORE"}</span>
        </div>
        <nav className="universe-tabs" aria-label="Skill layers">
          {profile.skills.map((s, i) => (
            <button
              key={s.category}
              type="button"
              onClick={() => select(i)}
              aria-pressed={active === i}
            >
              {String(i + 1).padStart(2, "0")}
              <span>{s.category}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="universe-steps">
        {layers.map((layer, i) => (
          <article
            id={`${id}-${i}`}
            data-layer={i}
            key={layer.title}
            className={`universe-step ${active === i ? "is-current" : ""}`}
          >
            <span className="chapter-label">
              0{i + 1} / {profile.skills[i].category.toUpperCase()}
            </span>
            <h3>{layer.title}</h3>
            <p>{layer.text}</p>
            <div className="universe-skills">
              {profile.skills[i].items.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

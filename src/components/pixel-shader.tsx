"use client"

import React, { useRef, useEffect, useCallback } from 'react'
import * as THREE from 'three'

interface MousePosition {
  x: number;
  y: number;
}

export const PixelShader: React.FC = () => {
  const textContainerRef = useRef<HTMLDivElement>(null);
  
  // Use refs for Three.js objects that need to persist across renders
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const planeMeshRef = useRef<THREE.Mesh | null>(null);
  const animationIdRef = useRef<number | null>(null);
  
  // Use refs for mutable values that don't trigger re-renders
  const mousePositionRef = useRef<MousePosition>({ x: 0.5, y: 0.5 });
  const targetMousePositionRef = useRef<MousePosition>({ x: 0.5, y: 0.5 });
  const prevPositionRef = useRef<MousePosition>({ x: 0.5, y: 0.5 });
  const easeFactorRef = useRef<number>(0.02);

  // SHADERS
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    uniform sampler2D u_texture;
    uniform vec2 u_mouse;
    uniform vec2 u_prevMouse;

    void main() {
      vec2 gridUV = floor(vUv * vec2(40.0, 40.0)) / vec2(40.0, 40.0);
      vec2 centerOfPixel = gridUV + vec2(1.0/40.0, 1.0/40.0);

      vec2 mouseDirection = u_mouse - u_prevMouse;

      vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
      float pixelDistanceToMouse = length(pixelToMouseDirection);
      float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);

      vec2 uvOffset = strength * -mouseDirection * 0.15;
      vec2 uv = vUv - uvOffset;

      vec4 color = texture2D(u_texture, uv);
      gl_FragColor = color;
    } 
  `;

  const createTextTexture = useCallback((
    text: string, 
    font: string, 
    size: number | null, 
    color: string, 
    fontWeight: string = "100"
  ): THREE.CanvasTexture => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Could not get 2d context");
    }

    const canvasWidth = window.innerWidth * 2;
    const canvasHeight = window.innerHeight * 2;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
    ctx.fillStyle = color || "#ffffff";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    const fontSize = size || Math.floor(canvasWidth / 8);

    ctx.fillStyle = "#000000"; 
    ctx.font = `${fontWeight} ${fontSize}px ${font}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const textMetrics = ctx.measureText(text);
    const textWidth = textMetrics.width;

    const scaleFactor = Math.min(1, (canvasWidth * 0.8) / textWidth);
    const aspectCorrection = canvasWidth / canvasHeight;

    ctx.setTransform(scaleFactor, 0, 0, scaleFactor / aspectCorrection, canvasWidth / 2, canvasHeight / 2);
    
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = fontSize * 0.005;
    for (let i = 0; i < 3; i++) {
      ctx.strokeText(text, 0, 0);
    }

    ctx.fillText(text, 0, 0);

    return new THREE.CanvasTexture(canvas);
  }, []);

  const initializeScene = useCallback((texture: THREE.CanvasTexture) => {
    const container = textContainerRef.current;
    if (!container) {
      throw new Error("Text container not found");
    }

    // Clean up existing renderer if it exists
    if (rendererRef.current) {
      container.removeChild(rendererRef.current.domElement);
      rendererRef.current.dispose();
    }

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const aspectRatio = window.innerWidth / window.innerHeight;
    const camera = new THREE.OrthographicCamera(-1, 1, 1/aspectRatio, -1/aspectRatio, 0.1, 1000);
    camera.position.z = 1;
    cameraRef.current = camera;

    const shaderUniforms = {
      u_mouse: { value: new THREE.Vector2() },
      u_prevMouse: { value: new THREE.Vector2() },
      u_texture: { value: texture }
    };

    const planeMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({
        uniforms: shaderUniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
      })
    );

    scene.add(planeMesh);
    planeMeshRef.current = planeMesh;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xffffff, 0);
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);
  }, [vertexShader, fragmentShader]);

  const reloadTexture = useCallback(() => {
    if (planeMeshRef.current) {
      const newTexture = createTextTexture("Zayno", "Arial", 900, "#ffffff", "100");
      const material = planeMeshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.u_texture.value = newTexture;
    }
  }, [createTextTexture]);

  const animateScene = useCallback(() => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current || !planeMeshRef.current) {
      return;
    }

    const mousePos = mousePositionRef.current;
    const targetMousePos = targetMousePositionRef.current;
    const prevPos = prevPositionRef.current;
    const easeFactor = easeFactorRef.current;

    mousePos.x += (targetMousePos.x - mousePos.x) * easeFactor;
    mousePos.y += (targetMousePos.y - mousePos.y) * easeFactor;

    const material = planeMeshRef.current.material as THREE.ShaderMaterial;
    material.uniforms.u_mouse.value.set(mousePos.x, 1.0 - mousePos.y);
    material.uniforms.u_prevMouse.value.set(prevPos.x, 1.0 - prevPos.y);

    rendererRef.current.render(sceneRef.current, cameraRef.current);
    
    animationIdRef.current = requestAnimationFrame(animateScene);
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    const rect = textContainerRef.current?.getBoundingClientRect();
    if (!rect) return;

    prevPositionRef.current = { ...targetMousePositionRef.current };

    targetMousePositionRef.current.x = (e.clientX - rect.left) / rect.width;
    targetMousePositionRef.current.y = (e.clientY - rect.top) / rect.height;
  }, []);

  const onMouseEnter = useCallback((e: MouseEvent) => {
    easeFactorRef.current = 0.02;
    const rect = textContainerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    mousePositionRef.current.x = x;
    mousePositionRef.current.y = y;
    targetMousePositionRef.current.x = x;
    targetMousePositionRef.current.y = y;
  }, []);

  const onMouseLeave = useCallback(() => {
    easeFactorRef.current = 0.02;
    targetMousePositionRef.current = { ...prevPositionRef.current };
  }, []);

  const onWindowResize = useCallback(() => {
    if (!cameraRef.current || !rendererRef.current) return;

    const aspectRatio = window.innerWidth / window.innerHeight;
    cameraRef.current.left = -1;
    cameraRef.current.right = 1;
    cameraRef.current.top = 1 / aspectRatio;
    cameraRef.current.bottom = -1 / aspectRatio;
    cameraRef.current.updateProjectionMatrix();

    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    reloadTexture();
  }, [reloadTexture]);

  useEffect(() => {
    const container = textContainerRef.current;
    if (!container) return;

    // Initialize the scene
    try {
      const texture = createTextTexture("Zayno", "Arial", 900, "#ffffff", "100");
      initializeScene(texture);
      animateScene();
    } catch (error) {
      console.error("Failed to initialize scene:", error);
    }

    // Add event listeners
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onWindowResize);

    // Cleanup function
    return () => {
      // Cancel animation frame
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      // Remove event listeners
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onWindowResize);

      // Clean up Three.js objects
      if (rendererRef.current) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      
      if (planeMeshRef.current) {
        const material = planeMeshRef.current.material as THREE.ShaderMaterial;
        material.dispose();
        planeMeshRef.current.geometry.dispose();
      }
    };
  }, [createTextTexture, initializeScene, animateScene, onMouseMove, onMouseEnter, onMouseLeave, onWindowResize]);

  return (
    <div 
      ref={textContainerRef} 
      className="text-container"
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden'
      }}
    />
  );
};
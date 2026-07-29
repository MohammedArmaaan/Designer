import { useEffect, useRef } from 'react';

interface LiquidCanvasProps {
  imageSrc: string;
  className?: string;
}

const NUM_RIPPLES = 16;

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  vUv.y = 1.0 - vUv.y;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
#define NUM_RIPPLES ${NUM_RIPPLES}
uniform sampler2D uTexture;
uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uRipples[NUM_RIPPLES]; // xy = uv pos, z = startTime
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec2 disp = vec2(0.0);
  float highlight = 0.0;
  float aspect = uResolution.x / uResolution.y;

  for (int i = 0; i < NUM_RIPPLES; i++) {
    vec3 r = uRipples[i];
    float age = uTime - r.z;
    if (age < 0.0 || age > 3.5) continue;

    vec2 toR = uv - r.xy;
    toR.x *= aspect;
    float dist = length(toR);
    float radius = age * 0.35;
    float ringDist = dist - radius;

    float wave = sin(ringDist * 38.0) * exp(-abs(ringDist) * 7.0);
    float fade = exp(-age * 1.0);
    float amp = wave * fade * 0.014;

    vec2 dir = toR / max(dist, 0.0001);
    disp += dir * amp;
    highlight += abs(wave) * fade * 0.06;
  }

  // ambient gentle swell so the surface always feels alive
  float swell = sin(uv.x * 6.0 + uTime * 0.6) * cos(uv.y * 5.0 + uTime * 0.4) * 0.0015;
  disp += vec2(swell, swell * 0.7);

  vec2 sampleUv = uv + disp;
  vec3 color = texture2D(uTexture, sampleUv).rgb;
  color += highlight * vec3(0.35, 0.55, 0.75);

  gl_FragColor = vec4(color, 1.0);
}
`;

function createShader(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export function LiquidCanvas({ imageSrc, className }: LiquidCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = (canvas.getContext('webgl', { premultipliedAlpha: false }) ||
      canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) return;

    // compile program
    const vs = createShader(gl, gl.VERTEX_SHADER, VERT);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    // fullscreen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    // uniforms
    const uTexture = gl.getUniformLocation(prog, 'uTexture');
    const uResolution = gl.getUniformLocation(prog, 'uResolution');
    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uRipples = gl.getUniformLocation(prog, 'uRipples');

    // load image as texture
    const img = new Image();
    img.crossOrigin = 'anonymous';
    let tex: WebGLTexture | null = null;
    img.onload = () => {
      tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    };
    img.src = imageSrc;

    // ripple state: [x, y, startTime], -999 = inactive
    const ripples: Float32Array = new Float32Array(NUM_RIPPLES * 3);
    for (let i = 0; i < NUM_RIPPLES; i++) ripples[i * 3 + 2] = -999;
    let rippleIdx = 0;

    const addRipple = (x: number, y: number, time: number) => {
      ripples[rippleIdx * 3] = x;
      ripples[rippleIdx * 3 + 1] = y;
      ripples[rippleIdx * 3 + 2] = time;
      rippleIdx = (rippleIdx + 1) % NUM_RIPPLES;
    };

    // mouse tracking
    let mouse = { x: 0.5, y: 0.5 };
    let lastMove = 0;
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width;
      mouse.y = (e.clientY - rect.top) / rect.height;
      const now = performance.now() / 1000;
      // throttle ripple creation a touch
      if (now - lastMove > 0.04) {
        addRipple(mouse.x, mouse.y, now);
        lastMove = now;
      }
    };
    const onLeave = () => {
      mouse.x = 0.5;
      mouse.y = 0.5;
    };
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    // touch
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      const t = e.touches[0];
      mouse.x = (t.clientX - rect.left) / rect.width;
      mouse.y = (t.clientY - rect.top) / rect.height;
      addRipple(mouse.x, mouse.y, performance.now() / 1000);
    };
    canvas.addEventListener('touchmove', onTouch, { passive: true });

    // resize
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    // seed a couple of ambient ripples
    const start = performance.now() / 1000;
    addRipple(0.5, 0.5, start);
    addRipple(0.3, 0.4, start + 0.3);

    let raf = 0;
    const render = () => {
      const time = performance.now() / 1000;
      gl.uniform1f(uTime, time);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform3fv(uRipples, ripples);

      if (tex) {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.uniform1i(uTexture, 0);
      }

      gl.clearColor(0.04, 0.04, 0.04, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
      canvas.removeEventListener('touchmove', onTouch);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      if (tex) gl.deleteTexture(tex);
    };
  }, [imageSrc]);

  return <canvas ref={canvasRef} className={className} />;
}

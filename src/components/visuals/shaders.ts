export const planetVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const planetFragmentShader = `
  uniform vec3 uColor;
  uniform float uGlowPower;
  uniform float uGlowMultiplier;
  
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  // 2D Random function
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  // 2D Noise function
  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    // Surface pattern using noise
    float surfaceNoise = noise(vUv * 10.0);
    vec3 surfaceColor = uColor * (0.8 + surfaceNoise * 0.2);
    
    // Atmospheric glow using Fresnel effect
    float fresnel = dot(normalize(vNormal), normalize(vViewPosition));
    fresnel = pow(1.0 - fresnel, uGlowPower);
    vec3 glowColor = uColor * fresnel * uGlowMultiplier;

    // Final color
    gl_FragColor = vec4(surfaceColor + glowColor, 1.0);
  }
`;

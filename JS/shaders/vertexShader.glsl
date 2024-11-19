varying vec2 vUv;

void main() {
    vUv = uv;
    vec3 pos = position;
    pos.x += sin(pos.y * 10.0 + time) * 0.5;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}

const fragmentShader = `
uniform float time;
uniform vec2 mouse;
varying vec2 vUv;

void main() {
    // Calculer l'effet des vagues avec une influence plus douce
    float waveX = sin(vUv.x * 6.0 - time * 0.5 + mouse.x * 2.0) * 0.3;
    float waveY = cos(vUv.y * 6.0 - time * 0.5 + mouse.y * 2.0) * 0.3;

    // Mélanger les deux effets pour une animation douce
    float wave = waveX + waveY;

    // Assombrir la couleur en fonction de la proximité avec la souris
    float distanceFromMouse = distance(vUv, mouse); 
    float darkness = exp(-distanceFromMouse * 10.0) * 0.6; // Assombrir plus près de la souris

    // Couleur de base beige
    vec3 baseColor = vec3(0.60, 0.8, 0.75); // Beige
    vec3 color = baseColor - vec3(darkness);

    // Appliquer la couleur finale
    gl_FragColor = vec4(color, 0.5);
}`;
        
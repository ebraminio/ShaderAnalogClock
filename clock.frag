#ifdef GL_ES
precision highp float;
#endif

uniform float time;
varying vec2 uv;

float needle(float angle, vec2 m, float rd, float border, float pr) {
    vec2 rotated = vec2(cos(angle) * m.x - sin(angle) * m.y,
          sin(angle) * m.x + cos(angle) * m.y);
    bool centerd = rotated.y < 0.0 && rd < -border * pr;
    if (centerd) {
        if (border / 2.0 - abs(rotated.x) > 0.0)
            return 1.0;
        else if (border * 1.5 - abs(rotated.x) > 0.0)
            return (border * 1.5 - abs(rotated.x)) / border;
    }
    return 0.0;
}

void main() {
    vec4 res;
    float border = 0.01;
    float radius = 0.24;
    vec4 color0 = vec4(0.0, 0.0, 0.0, 0.0);
    vec4 color1 = vec4(1.0, 1.0, 1.0, 1.0);
    vec4 color2 = vec4(1.0, 0.0, 0.0, 0.0);

    vec2 m = uv - vec2(0.5);
    float rd = dot(m, m) - radius;

    float t = 0.0;

    t = (border - rd) / border;
    if (border + rd < 0.0)
        t = (border * 2.0 + rd) / border;

    res = mix(color0, color1, t);

    float tscale = 9; // time scale
    float v = needle(-time / tscale, m, rd, border, 6.0);
    v += needle(-time / (tscale * 60), m, rd, border, 12.0);
    v += needle(-time / (tscale * 60 * 60), m, rd, border, 16.0);
    if (v != 0.0)
        res = mix(color0, color1, v);

    gl_FragColor = res;
}
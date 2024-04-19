#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

const float blobSize = 0.125;
const float cellSize = .75;
const float noiseScale = .375;
const float background = .125;
const float blobsLuminosity = .75;
const float blobsSaturation = .5;

vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

// Gradient Noise by Inigo Quilez - iq/2013
// https://www.shadertoy.com/view/XdXGW8
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y)*.5+.5;
}


float gaussFunction(vec2 st, vec2 p, float r) {
    return exp(-dot(st-p, st-p)/2./r/r);
}

//  Function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix( vec3(1.0), rgb, c.y);
}

vec3 hash32(vec2 p)
{
    vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));
    p3 += dot(p3, p3.yxz+33.33);
    return fract((p3.xxy+p3.yzz)*p3.zyx);
}

vec3 blobs(vec2 st){
    vec2 i = floor(st/cellSize);
    vec3 c = vec3(0.);
    
    for(int x = -1; x <= 1; x++)
        for(int y = -1; y <= 1; y++){
            vec3 h = hash32(i+vec2(x, y));
            c += hsb2rgb(vec3(h.z, blobsSaturation, blobsLuminosity)) * gaussFunction(st/cellSize, i + vec2(x, y) + h.xy, blobSize) * smoothstep(0., 1., noise(noiseScale*st/cellSize / blobSize));        }
    return c + vec3(background);
}


float map(float x, float a, float b, float c, float d){
    return (x-a)/(b-a)*(d-c)+c;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    vec3 color = vec3(0.0);
    
    
    
    color = vec3(blobs(st));

    gl_FragColor = vec4(color,1.0);
}
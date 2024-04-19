// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_flowerNum;

vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix( vec3(1.0), rgb, c.y);
}

vec2 skew (vec2 st) {
    vec2 r = vec2(0.0);
    r.x = 1.1547*st.x;
    r.y = st.y+0.5*r.x;
    return r;
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    // st = rotate2D(st,PI*sin(u_time)+1.);
    vec3 color = vec3(0.0);
    vec3 bgcolor = vec3(0.);

    // polar coordinates for the background
    vec2 toCenter = vec2(0.5)-st;
    vec2 bgst = st;
    float angle = atan(toCenter.y,toCenter.x);
    float radius = length(toCenter)*100.;
    
    
    st *= 10.;
    st = fract(st);
    // st = rotate2D(st,PI*sin(u_time)+1.);

    st.x *= u_resolution.x/u_resolution.y;

    // Tile the space
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);

    vec2 pos = vec2(0.5)-st;

    // float r = length(pos)*40.*(cos(u_time)*0.5+0.51);
    float r = length(pos)*5.;

    float a = atan(pos.y,pos.x);

    float f;
    //f = abs(cos(a*(3.+sin(u_time))))-.3;
    // f = abs(cos(a*2.5+u_time))*.5+.3;
    f = abs(cos(5.*u_time+a*(2.5+sin(u_time))))*.5+.3;
    f = abs(cos(5.*u_time+a*(2.5+u_flowerNum/2.)))*sin(u_time)+0.5;

    // f = abs(cos(a*(2.5+sin(u_time))))*.5+.3;
    // f = abs(cos(a*12.)*sin(a*3.))*.8+.1;


    vec3 pattern1 = vec3(0.);

    for(float i = 1.; i<10.; i+=2.){
        pattern1 += vec3(smoothstep(f+i/10.,f+(i+1.)/10.,r));
    }
    for(float i = 2.; i<10.; i+=2.){
        pattern1 -= vec3(smoothstep(f+i/10.,f+(i+1.)/10.,r));
    }
    pattern1 -= vec3(smoothstep(f+1., f+1.5,r));

    // color = hsb2rgb(vec3(smoothstep(f,f+0.5,r)-(angle/TWO_PI)+0.5,radius,1.0));
    color = hsb2rgb(vec3((angle/TWO_PI)+0.5,radius,1.0));

    // rgb background, black flower
    color = vec3(bgst.x,bgst.y,abs(sin(u_time))) - vec3(1.) + pattern1;

    // black background, rgb flower
    // color = vec3(bgst.x,bgst.y,abs(sin(u_time))) - pattern1;

    // black background, white flower
    // color = vec3(1.) - pattern1;

    gl_FragColor = vec4(color, 1.0);
}

// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix( vec3(1.0), rgb, c.y);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec3 color = vec3(0.0);


    
    // Use polar coordinates instead of cartesian
    vec2 toCenter = vec2(0.5)-st;
    float angle = atan(toCenter.y,toCenter.x);
    float radius = length(toCenter)*1.5;
    st *= 10.;
    st = fract(st);




    // Tile the space
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);

    vec2 pos = vec2(0.5)-st;

    // float r = length(pos)*40.*(cos(u_time)*0.5+0.51);
    float r = length(pos)*5.;

    float a = atan(pos.y,pos.x);

    float f;
    //f = abs(cos(a*(3.+sin(u_time))))-.3;
    f = abs(cos(a*2.5+u_time))*.5+.3;
    // f = abs(cos(a*(2.5+sin(u_time))))*.5+.3;
    // f = abs(cos(a*(2.5+sin(u_time))))*.5+.3;


    // f = abs(cos(a*12.)*sin(a*3.))*.8+.1;
    color = hsb2rgb(vec3(smoothstep(f,f+0.5,r)-(angle/TWO_PI)+0.5+u_time,radius,1.0));

    // color = vec3(1.-smoothstep(f,f+0.1,r)+smoothstep(f+0.1,f+0.2,r)-smoothstep(f+0.2,f+0.3,r)+smoothstep(f+0.3,f+0.4,r)-smoothstep(f+0.4,f+0.6,r)+smoothstep(f+0.6,f+0.7,r)-smoothstep(f+0.7,f+0.8,r)+smoothstep(f+0.8,f+0.9,r)-smoothstep(f+0.9,f+1.,r));

    gl_FragColor = vec4(color, 1.0);
}

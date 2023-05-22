uniform float time;
uniform vec2 resolution;

// tie nd die by Snoep Games.

void main(void){
    
    vec3 color = vec3(1.,0.,0.);
    vec2 pos=((1.4*gl_FragCoord.xy-resolution.xy)/resolution.xx)*1.5;
    float r=sqrt(pos.x*pos.x+pos.y*pos.y)/15.;
    float size1=2.*cos(time/60.);
    float size2=2.5*sin(time/12.1);
    
    float rot1 = 13.;//82.0+16.0*sin(time/4.0);
    float rot2 = -50.;//82.0+16.0*sin(time/8.0);
    float t=sin(time);
    float a=(60.)*sin(rot1*atan(pos.x-size1*pos.y/r,pos.y+size1*pos.x/r)+time);
    a+=200.*acos(pos.x*2.+cos(time/2.))+asin(pos.y*5.+sin(time/2.));
    a=a*(r/50.);
    a=200.*sin(a*5.)*(r/30.);
    if(a>5.)a=a/200.;
    if(a<.5)a=a*22.5;
    gl_FragColor=vec4(cos(a/20.),a*cos(a/200.),sin(a/8.),1.);
}
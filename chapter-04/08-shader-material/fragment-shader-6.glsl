uniform float time;
uniform vec2 resolution;

void main(void)
{
    
    vec2 uPos=(gl_FragCoord.xy/resolution.xy);//normalize wrt y axis
    //suPos -= vec2((resolution.x/resolution.y)/2.0, 0.0);//shift origin to center
    
    uPos.x-=1.;
    uPos.y-=.5;
    
    vec3 color=vec3(0.);
    float vertColor=2.;
    for(float i=0.;i<15.;++i)
    {
        float t=time*(.9);
        
        uPos.y+=sin(uPos.x*i+t+i/2.)*.1;
        float fTemp=abs(1./uPos.y/100.);
        vertColor+=fTemp;
        color+=vec3(fTemp*(10.-i)/10.,fTemp*i/10.,pow(fTemp,1.5)*1.5);
    }
    
    vec4 color_final=vec4(color,1.);
    gl_FragColor=color_final;
}

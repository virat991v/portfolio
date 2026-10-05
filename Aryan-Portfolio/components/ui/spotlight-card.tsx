import React, {useRef, type ReactNode, type CSSProperties} from 'react';
export interface GlowCardProps {children:ReactNode;className?:string;glowColor?:'blue'|'purple'|'green'|'red'|'orange';size?:'sm'|'md'|'lg';width?:string|number;height?:string|number;customSize?:boolean}
const hues={blue:220,purple:280,green:120,red:0,orange:30};
// Scoped, local pointer coordinates keep the supplied spotlight effect accurate
// inside scrolling containers without disabling touch scrolling.
export function GlowCard({children,className='',glowColor='orange',size='md',width,height,customSize=false}:GlowCardProps){
 const ref=useRef<HTMLDivElement>(null);
 return <div ref={ref} className={`glow-card ${customSize?'':`glow-${size}`} ${className}`} style={{'--glow-hue':hues[glowColor],width,height} as CSSProperties} onPointerMove={e=>{if(e.pointerType==='touch'||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const el=ref.current;if(!el)return;const r=el.getBoundingClientRect();el.style.setProperty('--glow-x',`${e.clientX-r.left}px`);el.style.setProperty('--glow-y',`${e.clientY-r.top}px`)}}><div className="glow-card-content">{children}</div></div>
}

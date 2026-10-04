import React, {forwardRef,useEffect,useLayoutEffect,useRef,useState,useImperativeHandle} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
// Adapted from the supplied FullScreenScrollFX: scoped GSAP lifecycle, native
// controls, accurate document offsets, direct index updates, mobile fallback.
export type FXSection={id:string;background:string;leftLabel:string;title:string;rightLabel:string;description:string;href:string;live?:string};
export type FullScreenFXAPI={next:()=>void;prev:()=>void;goTo:(i:number)=>void;getIndex:()=>number;refresh:()=>void};
export const FullScreenScrollFX=forwardRef<HTMLDivElement,{sections:FXSection[];apiRef?:React.Ref<FullScreenFXAPI>}>(({sections,apiRef},forwardedRef)=>{
 const root=useRef<HTMLDivElement|null>(null),stage=useRef<HTMLDivElement|null>(null),trigger=useRef<ScrollTrigger|null>(null);
 const [index,setIndex]=useState(0),[compact,setCompact]=useState(()=>typeof window!=='undefined'&&matchMedia('(max-width: 760px), (prefers-reduced-motion: reduce)').matches);
 const indexRef=useRef(index);indexRef.current=index;
 useEffect(()=>{const mq=matchMedia('(max-width: 760px), (prefers-reduced-motion: reduce)');const update=()=>setCompact(mq.matches);mq.addEventListener('change',update);return()=>mq.removeEventListener('change',update)},[]);
 useLayoutEffect(()=>{if(compact||!root.current||!stage.current)return;const ctx=gsap.context(()=>{trigger.current=ScrollTrigger.create({trigger:root.current,start:'top top',end:'bottom bottom',invalidateOnRefresh:true,onUpdate:self=>setIndex(Math.min(sections.length-1,Math.floor(self.progress*sections.length)))});},root);const refresh=()=>ScrollTrigger.refresh();window.addEventListener('load',refresh);return()=>{window.removeEventListener('load',refresh);ctx.revert();trigger.current=null}},[compact,sections.length]);
 useLayoutEffect(()=>{if(compact||!stage.current)return;const ctx=gsap.context(()=>{gsap.fromTo('.fx-project-copy',{opacity:.3,y:16},{opacity:1,y:0,duration:.5,overwrite:true})},stage);return()=>ctx.revert()},[index,compact]);
 function goTo(i:number){const n=Math.max(0,Math.min(sections.length-1,i));setIndex(n);if(!compact&&trigger.current){const t=trigger.current;window.scrollTo({top:t.start+(t.end-t.start)*(n+.2)/sections.length,behavior:'smooth'})}}
 useImperativeHandle(apiRef,()=>({next:()=>goTo(indexRef.current+1),prev:()=>goTo(indexRef.current-1),goTo,getIndex:()=>indexRef.current,refresh:()=>ScrollTrigger.refresh()}));
 const p=sections[index];if(!p)return null;
 return <div ref={node=>{root.current=node;if(typeof forwardedRef==='function')forwardedRef(node);else if(forwardedRef)forwardedRef.current=node}} className={`fx ${compact?'fx-compact':''}`} style={{'--fx-count':sections.length} as React.CSSProperties}>
 <div className="fx-stage" ref={stage}>
 <div className="fx-backgrounds" aria-hidden="true">{sections.map((s,i)=><img key={s.id} src={s.background} alt="" className={i===index?'is-active':''}/>)}</div>
 <div className="fx-top"><span>01 / SELECTED WORK</span><a href="#about">SKIP SHOWCASE ↓</a></div>
 <h2 className="fx-heading">Built with <em>purpose.</em></h2>
 <div className="fx-layout"><nav className="fx-selector" aria-label="Project showcase">{sections.map((s,i)=><button key={s.id} onClick={()=>goTo(i)} aria-pressed={i===index}><small>0{i+1}</small><span>{s.leftLabel}</span><b>↗</b></button>)}</nav>
 <div className="fx-project-copy" key={p.id}><span className="fx-role">{p.rightLabel}</span><h3>{p.title}</h3><p>{p.description}</p><div className="fx-actions">{p.live&&<a href={p.live} target="_blank" rel="noopener noreferrer">Live site ↗</a>}<a href={p.href} target="_blank" rel="noopener noreferrer">View code ↗</a></div></div>
 <div className="fx-image"><img src={p.background} alt={`${p.leftLabel} application screenshot`} width="1365" height="690"/></div></div>
 <div className="fx-bottom"><span>{compact?'SELECT A PROJECT ABOVE':'SCROLL TO EXPLORE · OR SELECT A PROJECT'}</span><div className="fx-progress"><span>0{index+1}</span><div><i style={{width:`${(index+1)/sections.length*100}%`}}/></div><span>0{sections.length}</span></div><div className="fx-arrows"><button aria-label="Previous project" disabled={index===0} onClick={()=>goTo(index-1)}>←</button><button aria-label="Next project" disabled={index===sections.length-1} onClick={()=>goTo(index+1)}>→</button></div></div>
 </div></div>
});
FullScreenScrollFX.displayName='FullScreenScrollFX';

'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpLeft, Search, ShoppingCart, ChevronDown, Menu, X, Sun, Moon, Monitor, Sparkles, Gamepad2, Globe2, Layers3, ArrowUpRight } from 'lucide-react';
const FIZZ='https://fizzbrowser.vercel.app/';
const PLAY='https://play.google.com/store/apps/details?id=com.snakebrawl.raneddie';
const slides=[
 {label:'BROWSER, REIMAGINED',title:<>Meet Fizz.<br/><strong>The browser that rewards you.</strong></>,desc:'A fresh way to explore the web. Discover a faster, more personal browsing experience, with rewards built into the journey.',cta:'Discover Fizz',href:FIZZ,kind:'fizz'},
 {label:'A NEW KIND OF CLASSIC',title:<>Snake Brawl.<br/><strong>Enter the arena.</strong></>,desc:'Classic Snake meets modern multiplayer competition. Grow, outplay and make every round count.',cta:'Play on Google Play',href:PLAY,kind:'snake'}
];
function Logo(){return <Image src="https://i.ibb.co/spvRBsHC/Chat-GPT-Image-Mar-23-2026-06-23-40-PM-removebg-preview-1-1.png" alt="RanEddie" width={126} height={52} unoptimized className="real-logo"/>;}
export default function Home(){
 const [theme,setTheme]=useState<'light'|'dark'>('light');
 const [slide,setSlide]=useState(0);
 const [menu,setMenu]=useState(false);
 useEffect(()=>{const saved=localStorage.getItem('raneddie-theme');const initial=saved==='dark'?'dark':'light';setTheme(initial);document.documentElement.dataset.theme=initial;},[]);
 const changeTheme=(next:'light'|'dark')=>{setTheme(next);document.documentElement.dataset.theme=next;localStorage.setItem('raneddie-theme',next);};
 const current=slides[slide];
 return <main className="site" dir="ltr">
  <header className="topbar"><a href="#home" className="brandmark" aria-label="RanEddie home"><Logo/></a>
   <button className="mobile-menu" onClick={()=>setMenu(!menu)} aria-label="Open navigation">{menu?<X/>:<Menu/>}</button>
   <nav className={menu?'navlinks open':'navlinks'}>
    <a href="#products" onClick={()=>setMenu(false)}>Products</a><a href="#lab" onClick={()=>setMenu(false)}>Lab</a><a href="#studio" onClick={()=>setMenu(false)}>Studio</a><a href="#contact" onClick={()=>setMenu(false)}>Contact</a>
   </nav>
   <div className="navtools"><a className="navlink" href={FIZZ}>Get Fizz <ArrowUpRight size={15}/></a><button className="theme-toggle" onClick={()=>changeTheme(theme==='light'?'dark':'light')} aria-label={theme==='light'?'Switch to dark mode':'Switch to light mode'} title={theme==='light'?'Dark mode':'Light mode'}>{theme==='light'?<Moon size={17}/>:<Sun size={17}/>}</button></div>
  </header>
  <section className={'hero hero-'+current.kind} id="home">
   <div className="hero-inner">
    <div className="hero-copy" key={slide}><div className="eyebrow"><span/> {current.label}</div><h1>{current.title}</h1><p>{current.desc}</p><a className="hero-cta" href={current.href}>{current.cta}<ArrowUpLeft size={19}/></a></div>
    <div className="hero-visual">
     {current.kind==='fizz'?<div className="m365-art" aria-label="Fizz browser concept"><div className="app-tile tile-a"><span>f.</span></div><div className="app-tile tile-b"><Globe2/></div><div className="app-tile tile-c"><Sparkles/></div><div className="app-tile tile-d"><Layers3/></div><div className="browser-window"><div className="browser-top"><i/><i/><i/><span>fizz browser</span></div><div className="browser-main"><div className="fizz-symbol">f.</div><b>fizz<span>.</span></b><small>Explore more. Get more back.</small><div className="browser-search">⌕ &nbsp; Search the web</div><div className="browser-dock"><span>✦<small>Discover</small></span><span>◉<small>Rewards</small></span><span>⌁<small>Private</small></span></div></div></div></div>
      :<div className="snake-art"><div className="snake-glow"/><Image src="/images/snake-brawl-arena.png" alt="Snake Brawl gameplay" fill sizes="(max-width: 900px) 90vw, 50vw" priority/><span className="snake-badge"><Gamepad2/> MULTIPLAYER ARENA</span></div>}
    </div>
   </div>
  </section>
  <div className="slider-controls"><button className="slider-arrow" onClick={()=>setSlide((slide+slides.length-1)%slides.length)} aria-label="Previous slide"><ArrowLeft/></button><div className="slider-center"><button className="pause" aria-label="Pause carousel">Ⅱ</button><div className="dots">{slides.map((_,i)=><button key={i} className={i===slide?'active':''} onClick={()=>setSlide(i)} aria-label={'Show slide '+(i+1)}/>)}</div></div><button className="slider-arrow" onClick={()=>setSlide((slide+1)%slides.length)} aria-label="Next slide"><ArrowRight/></button></div>
  <section className="products-section" id="products"><div className="section-title"><span>THE RANEDDIE COLLECTION</span><h2>Made to move you forward.</h2><p>Useful by design. Memorable by nature.</p></div><div className="product-row"><a className="product-card fizz-card" href={FIZZ}><div><small>01 / BROWSER</small><h3>Fizz Browser</h3><p>The browser that rewards you.</p><b>Explore Fizz <ArrowUpRight size={16}/></b></div><div className="mini-browser"><div className="mini-bar"><i/><i/><i/></div><div className="mini-fizz">f<span>.</span><small>Search the web</small></div></div></a><a className="product-card snake-card" href={PLAY}><div><small>02 / GAME</small><h3>Snake Brawl</h3><p>Nostalgia meets competition.</p><b>Get the game <ArrowUpRight size={16}/></b></div><div className="snake-thumb"><Image src="/images/snake-brawl-arena.png" alt="Snake Brawl arena" fill sizes="40vw"/></div></a></div></section>
  <section className="lab-section" id="lab"><div className="section-title"><span>IN DEVELOPMENT</span><h2>There's more in the making.</h2></div><div className="lab-row"><article><small>PROJECT NEON · Q1 2027</small><h3>NEON</h3><p>A new kind of digital energy.</p></article><article><small>PROJECT VAULT · COMING SOON</small><h3>VAULT</h3><p>Something worth keeping close.</p></article><article><small>PROJECT FLOW · RESEARCH</small><h3>FLOW</h3><p>Make space for what matters.</p></article></div></section>
  <section className="studio-section" id="studio"><div className="studio-logo"><Logo/></div><div><span>THE STUDIO</span><h2>Ideas into experiences.</h2><p>RanEddie is an independent product studio building digital products across browsers, games, apps and the web. Thoughtful design, careful engineering, and a belief that software should feel great to use.</p></div></section>
  <footer id="contact"><a href="#home" className="footer-brand"><Logo/></a><div className="footer-links"><a href={FIZZ}>Fizz Browser</a><a href={PLAY}>Snake Brawl</a><a href="#lab">Lab</a><a href="mailto:contact@raneddie.com">Contact</a></div><span>© 2026 RanEddie Studio. All rights reserved.</span></footer>
 </main>;
}
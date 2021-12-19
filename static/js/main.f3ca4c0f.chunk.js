(this.webpackJsonpzendo=this.webpackJsonpzendo||[]).push([[0],{85:function(e,n,t){},98:function(e,n,t){"use strict";t.r(n);t(85);var o=t(3),a=t.n(o),r=t(72),i=t.n(r),u=t(119),c=t(79),l=t(118),s=t(65),d=t(32),f=t(116),m=t(59),b={color:"#ade465",amplitude:.4,frequency:3,shadowColor:Object(m.a)("#ade465").lighten(.2).toHexString(),shadowRadius:.5,shadowBlur:.5,bloomEnabled:!1},v=Object(d.proxy)({shadowColor:b.shadowColor,amplitude:b.amplitude,frequency:b.frequency}),h=Object(d.proxy)({enabled:b.bloomEnabled}),p=t(14),_=function(){var e=Object(d.useSnapshot)(h);return Object(p.b)(f.a,{size:"large",onClick:function(){h.enabled=!e.enabled},children:e.enabled?Object(p.b)(s.b,{color:"#fff"}):Object(p.b)(s.a,{color:"#fff"})})},g=t(73),j=t(74);var O=function(){return Object(p.c)("div",{css:y.container,children:[Object(p.b)("a",{href:"https://github.com/nemutas/r3f-zendo",target:"_blank",rel:"noopener noreferrer",children:Object(p.b)(f.a,{size:"large",children:Object(p.b)(g.a,{color:"#fff"})})}),Object(p.b)("a",{href:"https://qiita.com/nemutas/items/38a33130e8bf3564769f",target:"_blank",rel:"noopener noreferrer",children:Object(p.b)(f.a,{size:"large",children:Object(p.b)(j.a,{color:"#55C500"})})})]})},y={container:{name:"1sactrr",styles:"display:grid;grid-template-rows:auto auto;grid-row-gap:10px"}},w=t(120),x=t(22),C=t(121),q=t(113),M=t(67),P=t(122);Object(x.b)({EffectComposer:C.a,RenderPass:q.a,ShaderPass:M.a,UnrealBloomPass:P.a});var z=function(){var e=Object(d.useSnapshot)(h),n=Object(o.useRef)(null),t=Object(x.d)(),a=t.gl,r=t.scene,i=t.camera;return a.toneMappingExposure=Math.pow(.9,4),Object(x.c)((function(){n.current.render()}),1),Object(p.c)("effectComposer",{ref:n,args:[a],children:[Object(p.b)("renderPass",{attachArray:"passes",args:[r,i]}),Object(p.b)("unrealBloomPass",{attachArray:"passes",enabled:e.enabled,strength:3,radius:1.2,threshold:0})]})},E=t(6),S=t(114),k=t(62),B=t(9),A=function(e,n){var t=new E.Color(n);k.a.to(e.value,{r:t.r,g:t.g,b:t.b,ease:B.c.easeOut,duration:1})},F=function(e,n){k.a.to(e,{value:n,ease:B.a.easeOut,duration:1})},L=function(e,n){k.a.to(e,{value:n,ease:B.a.easeOut,duration:1})},R=function(e){var n=e.position,t=void 0===n?[0,0,0]:n,a=e.rotation,r=void 0===a?[-Math.PI/2,0,0]:a,i=e.color,u=e.radius,c=void 0===u?b.shadowRadius:u,l=e.blur,s=void 0===l?b.shadowBlur:l,f=e.amplitude,m=e.frequency,h=Object(d.useSnapshot)(v),_=2*c+s+.5,g=1/_,j=Object(o.useMemo)((function(){var e=new E.ShaderMaterial({uniforms:{u_color:{value:new E.Color(b.shadowColor)},u_radius:{value:b.shadowRadius},u_smooth:{value:b.shadowBlur},u_time:{value:0},u_amplitude:{value:b.amplitude},u_frequency:{value:b.frequency}},vertexShader:T,fragmentShader:I});return e.transparent=!0,e}),[]);return Object(o.useEffect)((function(){i&&(j.uniforms.u_color.value=i),j.uniforms.u_radius.value=c*g,j.uniforms.u_smooth.value=s*g,f&&(j.uniforms.u_amplitude.value=f),m&&(j.uniforms.u_frequency.value=m)}),[f,s,i,m,j,c,g]),Object(o.useEffect)((function(){A(j.uniforms.u_color,h.shadowColor),F(j.uniforms.u_amplitude,h.amplitude),L(j.uniforms.u_frequency,h.frequency)}),[j.uniforms.u_amplitude,j.uniforms.u_color,j.uniforms.u_frequency,h]),Object(x.c)((function(e){var n=e.clock;j.uniforms.u_time.value=n.getElapsedTime()})),Object(p.b)(S.a,{args:[_,_],material:j,position:t,rotation:r})},T="\nvarying vec2 v_uv;\n\nvoid main() {\n  v_uv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}\n",I="\nvarying vec2 v_uv;\nuniform vec3 u_color;\nuniform float u_radius;\nuniform float u_smooth;\n\nuniform float u_time;\nuniform float u_amplitude;\nuniform float u_frequency;\n\nvoid main() {\n  float dist = distance(vec2(0.5), v_uv);\n  float circle = 1.0 - smoothstep(u_radius - u_smooth, u_radius + u_smooth, dist);\n\t//----------------------------------------------------------------------------------------------------\n\t// The top(1.0) and bottom(-1.0) of the sphere have a radius around the y-axis that is close to zero,\n\t// so the shadow is affected at -0.8 from the center.\n\n\tfloat ratio = u_amplitude * (sin(u_time - 0.8 * u_frequency) + 1.0) / 2.0 + (1.0 - u_amplitude);\n\t//----------------------------------------------------------------------------------------------------\n\t\n  gl_FragColor = vec4(u_color * circle * ratio, 1.0 * circle * ratio);\n}\n",H=function(){var e=Object(o.useMemo)((function(){var e=new E.ShaderMaterial({uniforms:{u_time:{value:0},u_amplitude:{value:b.amplitude},u_frequency:{value:b.frequency},u_color:{value:new E.Color(b.color)},u_start:{value:0},u_end:{value:1},u_alpha:{value:1}},vertexShader:J,fragmentShader:V,wireframe:!1});return e.transparent=!0,e}),[]);return Object(x.c)((function(n){var t=n.clock;e.uniforms.u_time.value=t.getElapsedTime()})),Object(p.c)(p.a,{children:[Object(p.b)(S.b,{args:[.8,128,128],material:e,onClick:function(){var n="hsl(".concat(360*Math.random(),", 70%, 65%)");A(e.uniforms.u_color,n);var t=Math.random();F(e.uniforms.u_amplitude,t);var o=9*Math.random()+1;L(e.uniforms.u_frequency,o),v.shadowColor=Object(m.a)(n).lighten(.2).toHexString(),v.amplitude=t,v.frequency=o},onPointerEnter:function(){document.body.style.cursor="pointer"},onPointerLeave:function(){document.body.style.cursor="auto"}}),Object(p.b)(R,{position:[0,-1.5,0]})]})},J="\nuniform float u_time;\nuniform float u_amplitude;\nuniform float u_frequency;\n\nvarying vec3 v_position;\nvarying vec3 v_normal;\n\nvoid main() {\n  // wave\n  //----------------------------------\n  // f1 = sin(t + x * f) -> -1 ~ 1\n  // f2 = (f1 + 1) / 2   -> 0 ~ 1\n  // f3 = a * f2         -> 0 ~ a\n  // f4 = f3 + (1 - a)   -> (1 - a) ~ 1\n  //----------------------------------\n  float ratio = u_amplitude * (sin(u_time + position.y * u_frequency) + 1.0) / 2.0 + (1.0 - u_amplitude);\n  vec4 pos = vec4(vec3(position.x * ratio, position.y, position.z * ratio), 1.0);\n    \n  // glow\n  pos = modelViewMatrix * pos;\n  v_position = pos.xyz;\n  v_normal = normalMatrix * normal;\n\n  gl_Position = projectionMatrix * pos;\n}\n",V="\nuniform vec3 u_color;\nuniform float u_start;\nuniform float u_end;\nuniform float u_alpha;\n\nvarying vec3 v_position;\nvarying vec3 v_normal;\n\nvoid main() {\n  // glow\n  vec3 normal = normalize(v_normal);\n  vec3 eye = normalize(-v_position);\n  float rim = smoothstep(u_start, u_end, 1.0 - dot(normal, eye));\n  float ratio = clamp(rim, 0.0, 1.0);\n  \n  gl_FragColor = vec4(u_color * ratio, u_alpha + ratio);\n}\n",Z=function(){return Object(p.c)(x.a,{camera:{position:[0,0,4],fov:50,aspect:window.innerWidth/window.innerHeight,near:.1,far:2e3},dpr:window.devicePixelRatio,children:[Object(p.b)("color",{attach:"background",args:["#000"]}),Object(p.b)(w.a,{attach:"orbitControls",target:[0,-.3,0],enablePan:!1,enableZoom:!1,maxPolarAngle:Math.PI/2,minAzimuthAngle:0,maxAzimuthAngle:0,addEventListener:void 0,hasEventListener:void 0,removeEventListener:void 0,dispatchEvent:void 0}),Object(p.b)(H,{}),Object(p.b)(z,{})]})};var D={container:{name:"3h2m3b",styles:"position:relative;width:100vw;height:100vh;overflow:hidden"},bloomButton:{name:"1eucs3e",styles:"position:absolute;top:20px;right:20px"},linkButtons:{name:"wgpkh3",styles:"position:absolute;bottom:20px;right:20px"},titleConteiner:{name:"9cejh9",styles:"position:absolute;top:5px;left:20px"},title:{name:"d6zxtm",styles:"font-size:clamp(1rem, 10vw, 3rem);font-family:'Yuji Mai',sans-serif;user-select:none"}},U=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,123)).then((function(n){var t=n.getCLS,o=n.getFID,a=n.getFCP,r=n.getLCP,i=n.getTTFB;t(e),o(e),a(e),r(e),i(e)}))};i.a.render(Object(p.b)(a.a.StrictMode,{children:Object(p.b)((function(){var e=a.a.useMemo((function(){return Object(c.a)({palette:{mode:"dark"}})}),[]);return Object(p.c)(l.a,{theme:e,children:[Object(p.b)(u.a,{}),Object(p.c)("div",{css:D.container,children:[Object(p.b)(Z,{}),Object(p.b)("div",{css:D.bloomButton,children:Object(p.b)(_,{})}),Object(p.b)("div",{css:D.linkButtons,children:Object(p.b)(O,{})}),Object(p.b)("div",{css:D.titleConteiner,children:Object(p.b)("div",{css:D.title,children:"\u8815\u52d5 - Zendo -"})})]})]})}),{})}),document.getElementById("root")),U()}},[[98,1,2]]]);
//# sourceMappingURL=main.f3ca4c0f.chunk.js.map
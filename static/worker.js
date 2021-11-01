(()=>{var He=Object.defineProperty,Ke=Object.defineProperties,Xe=Object.getOwnPropertyDescriptors,Re=Object.getOwnPropertySymbols,Qe=Object.prototype.hasOwnProperty,Ze=Object.prototype.propertyIsEnumerable;Reflect.get;Reflect.set;var Ie=(e,t,r)=>t in e?He(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Ae=(e,t)=>{for(var r in t||(t={}))Qe.call(t,r)&&Ie(e,r,t[r]);if(Re)for(var r of Re(t))Ze.call(t,r)&&Ie(e,r,t[r]);return e},Ne=(e,t)=>Ke(e,Xe(t));function Ce(e){let t=o=>{if(o===null)r.write8(0);else if(typeof o=="boolean")r.write8(1),r.write8(+o);else if(typeof o=="number")r.write8(2),r.write32(o|0);else if(typeof o=="string")r.write8(3),r.write(ce(o));else if(o instanceof Uint8Array)r.write8(4),r.write(o);else if(o instanceof Array){r.write8(5),r.write32(o.length);for(let d of o)t(d)}else{let d=Object.keys(o);r.write8(6),r.write32(d.length);for(let u of d)r.write(ce(u)),t(o[u])}},r=new Fe;return r.write32(0),r.write32(e.id<<1|+!e.isRequest),t(e.value),je(r.buf,r.len-4,0),r.buf.subarray(0,r.len)}function et(e){let t=()=>{switch(r.read8()){case 0:return null;case 1:return!!r.read8();case 2:return r.read32();case 3:return he(r.read());case 4:return r.read();case 5:{let n=r.read32(),y=[];for(let s=0;s<n;s++)y.push(t());return y}case 6:{let n=r.read32(),y={};for(let s=0;s<n;s++)y[he(r.read())]=t();return y}default:throw new Error("Invalid packet")}},r=new Fe(e),o=r.read32(),d=(o&1)==0;o>>>=1;let u=t();if(r.ptr!==e.length)throw new Error("Invalid packet");return{id:o,isRequest:d,value:u}}var Fe=class{constructor(e=new Uint8Array(1024)){this.buf=e,this.len=0,this.ptr=0}_write(e){if(this.len+e>this.buf.length){let t=new Uint8Array((this.len+e)*2);t.set(this.buf),this.buf=t}return this.len+=e,this.len-e}write8(e){let t=this._write(1);this.buf[t]=e}write32(e){let t=this._write(4);je(this.buf,e,t)}write(e){let t=this._write(4+e.length);je(this.buf,e.length,t),this.buf.set(e,t+4)}_read(e){if(this.ptr+e>this.buf.length)throw new Error("Invalid packet");return this.ptr+=e,this.ptr-e}read8(){return this.buf[this._read(1)]}read32(){return Ue(this.buf,this._read(4))}read(){let e=this.read32(),t=new Uint8Array(e),r=this._read(t.length);return t.set(this.buf.subarray(r,r+e)),t}},ce,he;if(typeof TextEncoder!="undefined"&&typeof TextDecoder!="undefined"){let e=new TextEncoder,t=new TextDecoder;ce=r=>e.encode(r),he=r=>t.decode(r)}else if(typeof Buffer!="undefined")ce=e=>{let t=Buffer.from(e);return t instanceof Uint8Array||(t=new Uint8Array(t)),t},he=e=>{let{buffer:t,byteOffset:r,byteLength:o}=e;return Buffer.from(t,r,o).toString()};else throw new Error("No UTF-8 codec found");function Ue(e,t){return e[t++]|e[t++]<<8|e[t++]<<16|e[t++]<<24}function je(e,t,r){e[r++]=t,e[r++]=t>>8,e[r++]=t>>16,e[r++]=t>>24}function Be(e){if(e+="",e.indexOf(",")>=0)throw new Error(`Invalid target: ${e}`);return e}var De=()=>null,V=e=>typeof e=="boolean"?null:"a boolean",tt=e=>typeof e=="boolean"||typeof e=="object"&&!Array.isArray(e)?null:"a boolean or an object",m=e=>typeof e=="string"?null:"a string",Ve=e=>e instanceof RegExp?null:"a RegExp object",ge=e=>typeof e=="number"&&e===(e|0)?null:"an integer",Pe=e=>typeof e=="function"?null:"a function",W=e=>Array.isArray(e)?null:"an array",pe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e)?null:"an object",rt=e=>typeof e=="object"&&e!==null?null:"an array or an object",Le=e=>typeof e=="object"&&!Array.isArray(e)?null:"an object or null",Me=e=>typeof e=="string"||typeof e=="boolean"?null:"a string or a boolean",lt=e=>typeof e=="string"||typeof e=="object"&&e!==null&&!Array.isArray(e)?null:"a string or an object",nt=e=>typeof e=="string"||Array.isArray(e)?null:"a string or an array",st=e=>typeof e=="string"||e instanceof Uint8Array?null:"a string or a Uint8Array";function l(e,t,r,o){let d=e[r];if(t[r+""]=!0,d===void 0)return;let u=o(d);if(u!==null)throw new Error(`"${r}" must be ${u}`);return d}function G(e,t,r){for(let o in e)if(!(o in t))throw new Error(`Invalid option ${r}: "${o}"`)}function it(e){let t=Object.create(null),r=l(e,t,"wasmURL",m),o=l(e,t,"worker",V);return G(e,t,"in startService() call"),{wasmURL:r,worker:o}}function ke(e,t,r,o,d){let u=l(t,r,"color",V),n=l(t,r,"logLevel",m),y=l(t,r,"logLimit",ge);u!==void 0?e.push(`--color=${u}`):o&&e.push("--color=true"),e.push(`--log-level=${n||d}`),e.push(`--log-limit=${y||0}`)}function We(e,t,r){let o=l(t,r,"legalComments",m),d=l(t,r,"sourceRoot",m),u=l(t,r,"sourcesContent",V),n=l(t,r,"target",nt),y=l(t,r,"format",m),s=l(t,r,"globalName",m),x=l(t,r,"minify",V),S=l(t,r,"minifySyntax",V),A=l(t,r,"minifyWhitespace",V),F=l(t,r,"minifyIdentifiers",V),D=l(t,r,"charset",m),U=l(t,r,"treeShaking",V),ee=l(t,r,"ignoreAnnotations",V),K=l(t,r,"jsx",m),le=l(t,r,"jsxFactory",m),te=l(t,r,"jsxFragment",m),ne=l(t,r,"define",pe),se=l(t,r,"pure",W),oe=l(t,r,"keepNames",V);if(o&&e.push(`--legal-comments=${o}`),d!==void 0&&e.push(`--source-root=${d}`),u!==void 0&&e.push(`--sources-content=${u}`),n&&(Array.isArray(n)?e.push(`--target=${Array.from(n).map(Be).join(",")}`):e.push(`--target=${Be(n)}`)),y&&e.push(`--format=${y}`),s&&e.push(`--global-name=${s}`),x&&e.push("--minify"),S&&e.push("--minify-syntax"),A&&e.push("--minify-whitespace"),F&&e.push("--minify-identifiers"),D&&e.push(`--charset=${D}`),U!==void 0&&e.push(`--tree-shaking=${U}`),ee&&e.push("--ignore-annotations"),K&&e.push(`--jsx=${K}`),le&&e.push(`--jsx-factory=${le}`),te&&e.push(`--jsx-fragment=${te}`),ne)for(let X in ne){if(X.indexOf("=")>=0)throw new Error(`Invalid define: ${X}`);e.push(`--define:${X}=${ne[X]}`)}if(se)for(let X of se)e.push(`--pure:${X}`);oe&&e.push("--keep-names")}function at(e,t,r,o,d){var u;let n=[],y=[],s=Object.create(null),x=null,S=null,A=null;ke(n,t,s,r,o),We(n,t,s);let F=l(t,s,"sourcemap",Me),D=l(t,s,"bundle",V),U=l(t,s,"watch",tt),ee=l(t,s,"splitting",V),K=l(t,s,"preserveSymlinks",V),le=l(t,s,"metafile",V),te=l(t,s,"outfile",m),ne=l(t,s,"outdir",m),se=l(t,s,"outbase",m),oe=l(t,s,"platform",m),X=l(t,s,"tsconfig",m),ve=l(t,s,"resolveExtensions",W),Se=l(t,s,"nodePaths",W),$e=l(t,s,"mainFields",W),_e=l(t,s,"conditions",W),h=l(t,s,"external",W),c=l(t,s,"loader",pe),i=l(t,s,"outExtension",pe),f=l(t,s,"publicPath",m),C=l(t,s,"entryNames",m),R=l(t,s,"chunkNames",m),T=l(t,s,"assetNames",m),N=l(t,s,"inject",W),O=l(t,s,"banner",pe),j=l(t,s,"footer",pe),v=l(t,s,"entryPoints",rt),B=l(t,s,"absWorkingDir",m),$=l(t,s,"stdin",pe),E=(u=l(t,s,"write",V))!=null?u:d,_=l(t,s,"allowOverwrite",V),p=l(t,s,"incremental",V)===!0;if(s.plugins=!0,G(t,s,`in ${e}() call`),F&&n.push(`--sourcemap${F===!0?"":`=${F}`}`),D&&n.push("--bundle"),_&&n.push("--allow-overwrite"),U)if(n.push("--watch"),typeof U=="boolean")A={};else{let a=Object.create(null),b=l(U,a,"onRebuild",Pe);G(U,a,`on "watch" in ${e}() call`),A={onRebuild:b}}if(ee&&n.push("--splitting"),K&&n.push("--preserve-symlinks"),le&&n.push("--metafile"),te&&n.push(`--outfile=${te}`),ne&&n.push(`--outdir=${ne}`),se&&n.push(`--outbase=${se}`),oe&&n.push(`--platform=${oe}`),X&&n.push(`--tsconfig=${X}`),ve){let a=[];for(let b of ve){if(b+="",b.indexOf(",")>=0)throw new Error(`Invalid resolve extension: ${b}`);a.push(b)}n.push(`--resolve-extensions=${a.join(",")}`)}if(f&&n.push(`--public-path=${f}`),C&&n.push(`--entry-names=${C}`),R&&n.push(`--chunk-names=${R}`),T&&n.push(`--asset-names=${T}`),$e){let a=[];for(let b of $e){if(b+="",b.indexOf(",")>=0)throw new Error(`Invalid main field: ${b}`);a.push(b)}n.push(`--main-fields=${a.join(",")}`)}if(_e){let a=[];for(let b of _e){if(b+="",b.indexOf(",")>=0)throw new Error(`Invalid condition: ${b}`);a.push(b)}n.push(`--conditions=${a.join(",")}`)}if(h)for(let a of h)n.push(`--external:${a}`);if(O)for(let a in O){if(a.indexOf("=")>=0)throw new Error(`Invalid banner file type: ${a}`);n.push(`--banner:${a}=${O[a]}`)}if(j)for(let a in j){if(a.indexOf("=")>=0)throw new Error(`Invalid footer file type: ${a}`);n.push(`--footer:${a}=${j[a]}`)}if(N)for(let a of N)n.push(`--inject:${a}`);if(c)for(let a in c){if(a.indexOf("=")>=0)throw new Error(`Invalid loader extension: ${a}`);n.push(`--loader:${a}=${c[a]}`)}if(i)for(let a in i){if(a.indexOf("=")>=0)throw new Error(`Invalid out extension: ${a}`);n.push(`--out-extension:${a}=${i[a]}`)}if(v)if(Array.isArray(v))for(let a of v)y.push(["",a+""]);else for(let[a,b]of Object.entries(v))y.push([a+"",b+""]);if($){let a=Object.create(null),b=l($,a,"contents",m),P=l($,a,"resolveDir",m),g=l($,a,"sourcefile",m),k=l($,a,"loader",m);G($,a,'in "stdin" object'),g&&n.push(`--sourcefile=${g}`),k&&n.push(`--loader=${k}`),P&&(S=P+""),x=b?b+"":""}let w=[];if(Se)for(let a of Se)a+="",w.push(a);return{entries:y,flags:n,write:E,stdinContents:x,stdinResolveDir:S,absWorkingDir:B,incremental:p,nodePaths:w,watch:A}}function ot(e,t,r,o){let d=[],u=Object.create(null);ke(d,t,u,r,o),We(d,t,u);let n=l(t,u,"sourcemap",Me),y=l(t,u,"tsconfigRaw",lt),s=l(t,u,"sourcefile",m),x=l(t,u,"loader",m),S=l(t,u,"banner",m),A=l(t,u,"footer",m);return G(t,u,`in ${e}() call`),n&&d.push(`--sourcemap=${n===!0?"external":n}`),y&&d.push(`--tsconfig-raw=${typeof y=="string"?y:JSON.stringify(y)}`),s&&d.push(`--sourcefile=${s}`),x&&d.push(`--loader=${x}`),S&&d.push(`--banner=${S}`),A&&d.push(`--footer=${A}`),d}function ct(e){let t=new Map,r=new Map,o=new Map,d=new Map,u=0,n=!1,y=0,s=0,x=new Uint8Array(16*1024),S=0,A=h=>{let c=S+h.length;if(c>x.length){let f=new Uint8Array(c*2);f.set(x),x=f}x.set(h,S),S+=h.length;let i=0;for(;i+4<=S;){let f=Ue(x,i);if(i+4+f>S)break;i+=4,le(x.subarray(i,i+f)),i+=f}i>0&&(x.copyWithin(0,i,S),S-=i)},F=()=>{n=!0;for(let h of t.values())h("The service was stopped",null);t.clear();for(let h of d.values())h.onWait("The service was stopped");d.clear();for(let h of o.values())try{h(new Error("The service was stopped"),null)}catch(c){console.error(c)}o.clear()},D=(h,c,i)=>{if(n)return i("The service is no longer running",null);let f=y++;t.set(f,(C,R)=>{try{i(C,R)}finally{h&&h.unref()}}),h&&h.ref(),e.writeToStdin(Ce({id:f,isRequest:!0,value:c}))},U=(h,c)=>{if(n)throw new Error("The service is no longer running");e.writeToStdin(Ce({id:h,isRequest:!1,value:c}))},ee=async(h,c)=>{try{switch(c.command){case"ping":{U(h,{});break}case"start":{let i=r.get(c.key);i?U(h,await i(c)):U(h,{});break}case"resolve":{let i=r.get(c.key);i?U(h,await i(c)):U(h,{});break}case"load":{let i=r.get(c.key);i?U(h,await i(c)):U(h,{});break}case"serve-request":{let i=d.get(c.serveID);i&&i.onRequest&&i.onRequest(c.args),U(h,{});break}case"serve-wait":{let i=d.get(c.serveID);i&&i.onWait(c.error),U(h,{});break}case"watch-rebuild":{let i=o.get(c.watchID);try{i&&i(null,c.args)}catch(f){console.error(f)}U(h,{});break}default:throw new Error("Invalid command: "+c.command)}}catch(i){U(h,{errors:[me(i,e,null,void 0,"")]})}},K=!0,le=h=>{if(K){K=!1;let i=String.fromCharCode(...h);if(i!=="0.13.11")throw new Error(`Cannot start service: Host version "0.13.11" does not match binary version ${JSON.stringify(i)}`);return}let c=et(h);if(c.isRequest)ee(c.id,c.value);else{let i=t.get(c.id);t.delete(c.id),c.value.error?i(c.value.error,{}):i(null,c.value)}},te=async(h,c,i,f)=>{let C=[],R=[],T={},N={},O=0,j=0,v=[];c=[...c];for(let _ of c){let p={};if(typeof _!="object")throw new Error(`Plugin at index ${j} must be an object`);let w=l(_,p,"name",m);if(typeof w!="string"||w==="")throw new Error(`Plugin at index ${j} is missing a name`);try{let a=l(_,p,"setup",Pe);if(typeof a!="function")throw new Error("Plugin is missing a setup function");G(_,p,`on plugin ${JSON.stringify(w)}`);let b={name:w,onResolve:[],onLoad:[]};j++;let P=a({initialOptions:h,onStart(g){let k='This error came from the "onStart" callback registered here',M=xe(new Error(k),e,"onStart");C.push({name:w,callback:g,note:M})},onEnd(g){let k='This error came from the "onEnd" callback registered here',M=xe(new Error(k),e,"onEnd");R.push({name:w,callback:g,note:M})},onResolve(g,k){let M='This error came from the "onResolve" callback registered here',L=xe(new Error(M),e,"onResolve"),J={},z=l(g,J,"filter",Ve),Y=l(g,J,"namespace",m);if(G(g,J,`in onResolve() call for plugin ${JSON.stringify(w)}`),z==null)throw new Error("onResolve() call is missing a filter");let q=O++;T[q]={name:w,callback:k,note:L},b.onResolve.push({id:q,filter:z.source,namespace:Y||""})},onLoad(g,k){let M='This error came from the "onLoad" callback registered here',L=xe(new Error(M),e,"onLoad"),J={},z=l(g,J,"filter",Ve),Y=l(g,J,"namespace",m);if(G(g,J,`in onLoad() call for plugin ${JSON.stringify(w)}`),z==null)throw new Error("onLoad() call is missing a filter");let q=O++;N[q]={name:w,callback:k,note:L},b.onLoad.push({id:q,filter:z.source,namespace:Y||""})}});P&&await P,v.push(b)}catch(a){return{ok:!1,error:a,pluginName:w}}}const B=async _=>{switch(_.command){case"start":{let p={errors:[],warnings:[]};return await Promise.all(C.map(async({name:w,callback:a,note:b})=>{try{let P=await a();if(P!=null){if(typeof P!="object")throw new Error(`Expected onStart() callback in plugin ${JSON.stringify(w)} to return an object`);let g={},k=l(P,g,"errors",W),M=l(P,g,"warnings",W);G(P,g,`from onStart() callback in plugin ${JSON.stringify(w)}`),k!=null&&p.errors.push(...ue(k,"errors",f,w)),M!=null&&p.warnings.push(...ue(M,"warnings",f,w))}}catch(P){p.errors.push(me(P,e,f,b&&b(),w))}})),p}case"resolve":{let p={},w="",a,b;for(let P of _.ids)try{({name:w,callback:a,note:b}=T[P]);let g=await a({path:_.path,importer:_.importer,namespace:_.namespace,resolveDir:_.resolveDir,kind:_.kind,pluginData:f.load(_.pluginData)});if(g!=null){if(typeof g!="object")throw new Error(`Expected onResolve() callback in plugin ${JSON.stringify(w)} to return an object`);let k={},M=l(g,k,"pluginName",m),L=l(g,k,"path",m),J=l(g,k,"namespace",m),z=l(g,k,"external",V),Y=l(g,k,"sideEffects",V),q=l(g,k,"pluginData",De),ie=l(g,k,"errors",W),ae=l(g,k,"warnings",W),I=l(g,k,"watchFiles",W),H=l(g,k,"watchDirs",W);G(g,k,`from onResolve() callback in plugin ${JSON.stringify(w)}`),p.id=P,M!=null&&(p.pluginName=M),L!=null&&(p.path=L),J!=null&&(p.namespace=J),z!=null&&(p.external=z),Y!=null&&(p.sideEffects=Y),q!=null&&(p.pluginData=f.store(q)),ie!=null&&(p.errors=ue(ie,"errors",f,w)),ae!=null&&(p.warnings=ue(ae,"warnings",f,w)),I!=null&&(p.watchFiles=Ee(I,"watchFiles")),H!=null&&(p.watchDirs=Ee(H,"watchDirs"));break}}catch(g){return{id:P,errors:[me(g,e,f,b&&b(),w)]}}return p}case"load":{let p={},w="",a,b;for(let P of _.ids)try{({name:w,callback:a,note:b}=N[P]);let g=await a({path:_.path,namespace:_.namespace,pluginData:f.load(_.pluginData)});if(g!=null){if(typeof g!="object")throw new Error(`Expected onLoad() callback in plugin ${JSON.stringify(w)} to return an object`);let k={},M=l(g,k,"pluginName",m),L=l(g,k,"contents",st),J=l(g,k,"resolveDir",m),z=l(g,k,"pluginData",De),Y=l(g,k,"loader",m),q=l(g,k,"errors",W),ie=l(g,k,"warnings",W),ae=l(g,k,"watchFiles",W),I=l(g,k,"watchDirs",W);G(g,k,`from onLoad() callback in plugin ${JSON.stringify(w)}`),p.id=P,M!=null&&(p.pluginName=M),L instanceof Uint8Array?p.contents=L:L!=null&&(p.contents=ce(L)),J!=null&&(p.resolveDir=J),z!=null&&(p.pluginData=f.store(z)),Y!=null&&(p.loader=Y),q!=null&&(p.errors=ue(q,"errors",f,w)),ie!=null&&(p.warnings=ue(ie,"warnings",f,w)),ae!=null&&(p.watchFiles=Ee(ae,"watchFiles")),I!=null&&(p.watchDirs=Ee(I,"watchDirs"));break}}catch(g){return{id:P,errors:[me(g,e,f,b&&b(),w)]}}return p}default:throw new Error("Invalid command: "+_.command)}};let $=(_,p,w)=>w();R.length>0&&($=(_,p,w)=>{(async()=>{for(const{name:a,callback:b,note:P}of R)try{await b(_)}catch(g){_.errors.push(await new Promise(k=>p(g,a,P&&P(),k)))}})().then(w)});let E=0;return{ok:!0,requestPlugins:v,runOnEndCallbacks:$,pluginRefs:{ref(){++E==1&&r.set(i,B)},unref(){--E==0&&r.delete(i)}}}},ne=(h,c,i)=>{let f={},C=l(c,f,"port",ge),R=l(c,f,"host",m),T=l(c,f,"servedir",m),N=l(c,f,"onRequest",Pe),O=u++,j,v=new Promise((B,$)=>{j=E=>{d.delete(O),E!==null?$(new Error(E)):B()}});return i.serve={serveID:O},G(c,f,"in serve() call"),C!==void 0&&(i.serve.port=C),R!==void 0&&(i.serve.host=R),T!==void 0&&(i.serve.servedir=T),d.set(O,{onRequest:N,onWait:j}),{wait:v,stop(){D(h,{command:"serve-stop",serveID:O},()=>{})}}};const se="warning",oe="silent";let X=h=>{let c=s++;const i=Je();let f,{refs:C,options:R,isTTY:T,callback:N}=h;if(typeof R=="object"){let v=R.plugins;if(v!==void 0){if(!Array.isArray(v))throw new Error('"plugins" must be an array');f=v}}let O=(v,B,$,E)=>{let _=[];try{ke(_,R,{},T,se)}catch(w){}const p=me(v,e,i,$,B);D(C,{command:"error",flags:_,error:p},()=>{p.detail=i.load(p.detail),E(p)})},j=(v,B)=>{O(v,B,void 0,$=>{N(be("Build failed",[$],[]),null)})};if(f&&f.length>0){if(e.isSync)return j(new Error("Cannot use plugins in synchronous API calls"),"");te(R,f,c,i).then(v=>{if(!v.ok)j(v.error,v.pluginName);else try{ve(Ne(Ae({},h),{key:c,details:i,logPluginError:O,requestPlugins:v.requestPlugins,runOnEndCallbacks:v.runOnEndCallbacks,pluginRefs:v.pluginRefs}))}catch(B){j(B,"")}},v=>j(v,""))}else try{ve(Ne(Ae({},h),{key:c,details:i,logPluginError:O,requestPlugins:null,runOnEndCallbacks:(v,B,$)=>$(),pluginRefs:null}))}catch(v){j(v,"")}},ve=({callName:h,refs:c,serveOptions:i,options:f,isTTY:C,defaultWD:R,callback:T,key:N,details:O,logPluginError:j,requestPlugins:v,runOnEndCallbacks:B,pluginRefs:$})=>{const E={ref(){$&&$.ref(),c&&c.ref()},unref(){$&&$.unref(),c&&c.unref()}};let _=!e.isBrowser,{entries:p,flags:w,write:a,stdinContents:b,stdinResolveDir:P,absWorkingDir:g,incremental:k,nodePaths:M,watch:L}=at(h,f,C,se,_),J={command:"build",key:N,entries:p,flags:w,write:a,stdinContents:b,stdinResolveDir:P,absWorkingDir:g||R,incremental:k,nodePaths:M};v&&(J.plugins=v);let z=i&&ne(E,i,J),Y,q,ie=(I,H)=>{I.outputFiles&&(H.outputFiles=I.outputFiles.map(ut)),I.metafile&&(H.metafile=JSON.parse(I.metafile)),I.writeToStdout!==void 0&&console.log(he(I.writeToStdout).replace(/\n$/,""))},ae=(I,H)=>{let Q={errors:we(I.errors,O),warnings:we(I.warnings,O)};ie(I,Q),B(Q,j,()=>{if(Q.errors.length>0)return H(be("Build failed",Q.errors,Q.warnings),null);if(I.rebuildID!==void 0){if(!Y){let re=!1;Y=()=>new Promise((fe,de)=>{if(re||n)throw new Error("Cannot rebuild");D(E,{command:"rebuild",rebuildID:I.rebuildID},(Z,qe)=>{if(Z)return H(be("Build failed",[{pluginName:"",text:Z,location:null,notes:[],detail:void 0}],[]),null);ae(qe,(Oe,Ye)=>{Oe?de(Oe):fe(Ye)})})}),E.ref(),Y.dispose=()=>{re||(re=!0,D(E,{command:"rebuild-dispose",rebuildID:I.rebuildID},()=>{}),E.unref())}}Q.rebuild=Y}if(I.watchID!==void 0){if(!q){let re=!1;E.ref(),q=()=>{re||(re=!0,o.delete(I.watchID),D(E,{command:"watch-stop",watchID:I.watchID},()=>{}),E.unref())},L&&o.set(I.watchID,(fe,de)=>{if(fe){L.onRebuild&&L.onRebuild(fe,null);return}let Z={errors:we(de.errors,O),warnings:we(de.warnings,O)};ie(de,Z),B(Z,j,()=>{if(Z.errors.length>0){L.onRebuild&&L.onRebuild(be("Build failed",Z.errors,Z.warnings),null);return}de.rebuildID!==void 0&&(Z.rebuild=Y),Z.stop=q,L.onRebuild&&L.onRebuild(null,Z)})})}Q.stop=q}H(null,Q)})};if(a&&e.isBrowser)throw new Error('Cannot enable "write" in the browser');if(k&&e.isSync)throw new Error('Cannot use "incremental" with a synchronous build');if(L&&e.isSync)throw new Error('Cannot use "watch" with a synchronous build');D(E,J,(I,H)=>{if(I)return T(new Error(I),null);if(z){let Q=H,re=!1;E.ref();let fe={port:Q.port,host:Q.host,wait:z.wait,stop(){re||(re=!0,z.stop(),E.unref())}};return E.ref(),z.wait.then(E.unref,E.unref),T(null,fe)}return ae(H,T)})};return{readFromStdout:A,afterClose:F,service:{buildOrServe:X,transform:({callName:h,refs:c,input:i,options:f,isTTY:C,fs:R,callback:T})=>{const N=Je();let O=j=>{try{if(typeof i!="string")throw new Error('The input to "transform" must be a string');let v=ot(h,f,C,oe);D(c,{command:"transform",flags:v,inputFS:j!==null,input:j!==null?j:i},($,E)=>{if($)return T(new Error($),null);let _=we(E.errors,N),p=we(E.warnings,N),w=1,a=()=>--w==0&&T(null,{warnings:p,code:E.code,map:E.map});if(_.length>0)return T(be("Transform failed",_,p),null);E.codeFS&&(w++,R.readFile(E.code,(b,P)=>{b!==null?T(b,null):(E.code=P,a())})),E.mapFS&&(w++,R.readFile(E.map,(b,P)=>{b!==null?T(b,null):(E.map=P,a())})),a()})}catch(v){let B=[];try{ke(B,f,{},C,oe)}catch(E){}const $=me(v,e,N,void 0,"");D(c,{command:"error",flags:B,error:$},()=>{$.detail=N.load($.detail),T(be("Transform failed",[$],[]),null)})}};if(typeof i=="string"&&i.length>1024*1024){let j=O;O=()=>R.writeFile(i,j)}O(null)},formatMessages:({callName:h,refs:c,messages:i,options:f,callback:C})=>{let R=ue(i,"messages",null,"");if(!f)throw new Error(`Missing second argument in ${h}() call`);let T={},N=l(f,T,"kind",m),O=l(f,T,"color",V),j=l(f,T,"terminalWidth",ge);if(G(f,T,`in ${h}() call`),N===void 0)throw new Error(`Missing "kind" in ${h}() call`);if(N!=="error"&&N!=="warning")throw new Error(`Expected "kind" to be "error" or "warning" in ${h}() call`);let v={command:"format-msgs",messages:R,isWarning:N==="warning"};O!==void 0&&(v.color=O),j!==void 0&&(v.terminalWidth=j),D(c,v,(B,$)=>{if(B)return C(new Error(B),null);C(null,$.messages)})},analyzeMetafile:({callName:h,refs:c,metafile:i,options:f,callback:C})=>{f===void 0&&(f={});let R={},T=l(f,R,"color",V),N=l(f,R,"verbose",V);G(f,R,`in ${h}() call`);let O={command:"analyze-metafile",metafile:i};T!==void 0&&(O.color=T),N!==void 0&&(O.verbose=N),D(c,O,(j,v)=>{if(j)return C(new Error(j),null);C(null,v.result)})}}}}function Je(){const e=new Map;let t=0;return{load(r){return e.get(r)},store(r){if(r===void 0)return-1;const o=t++;return e.set(o,r),o}}}function xe(e,t,r){let o,d=!1;return()=>{if(d)return o;d=!0;try{let u=(e.stack+"").split(`
`);u.splice(1,1);let n=Ge(t,u,r);if(n)return o={text:e.message,location:n},o}catch(u){}}}function me(e,t,r,o,d){let u="Internal error",n=null;try{u=(e&&e.message||e)+""}catch(y){}try{n=Ge(t,(e.stack+"").split(`
`),"")}catch(y){}return{pluginName:d,text:u,location:n,notes:o?[o]:[],detail:r?r.store(e):-1}}function Ge(e,t,r){let o="    at ";if(e.readFileSync&&!t[0].startsWith(o)&&t[1].startsWith(o))for(let d=1;d<t.length;d++){let u=t[d];if(!!u.startsWith(o))for(u=u.slice(o.length);;){let n=/^(?:new |async )?\S+ \((.*)\)$/.exec(u);if(n){u=n[1];continue}if(n=/^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec(u),n){u=n[1];continue}if(n=/^(\S+):(\d+):(\d+)$/.exec(u),n){let y;try{y=e.readFileSync(n[1],"utf8")}catch(A){break}let s=y.split(/\r\n|\r|\n|\u2028|\u2029/)[+n[2]-1]||"",x=+n[3]-1,S=s.slice(x,x+r.length)===r?r.length:0;return{file:n[1],namespace:"file",line:+n[2],column:ce(s.slice(0,x)).length,length:ce(s.slice(x,x+S)).length,lineText:s+`
`+t.slice(1).join(`
`),suggestion:""}}break}}return null}function be(e,t,r){let o=5,d=t.length<1?"":` with ${t.length} error${t.length<2?"":"s"}:`+t.slice(0,o+1).map((n,y)=>{if(y===o)return`
...`;if(!n.location)return`
error: ${n.text}`;let{file:s,line:x,column:S}=n.location,A=n.pluginName?`[plugin: ${n.pluginName}] `:"";return`
${s}:${x}:${S}: error: ${A}${n.text}`}).join(""),u=new Error(`${e}${d}`);return u.errors=t,u.warnings=r,u}function we(e,t){for(const r of e)r.detail=t.load(r.detail);return e}function ze(e,t){if(e==null)return null;let r={},o=l(e,r,"file",m),d=l(e,r,"namespace",m),u=l(e,r,"line",ge),n=l(e,r,"column",ge),y=l(e,r,"length",ge),s=l(e,r,"lineText",m),x=l(e,r,"suggestion",m);return G(e,r,t),{file:o||"",namespace:d||"",line:u||0,column:n||0,length:y||0,lineText:s||"",suggestion:x||""}}function ue(e,t,r,o){let d=[],u=0;for(const n of e){let y={},s=l(n,y,"pluginName",m),x=l(n,y,"text",m),S=l(n,y,"location",Le),A=l(n,y,"notes",W),F=l(n,y,"detail",De),D=`in element ${u} of "${t}"`;G(n,y,D);let U=[];if(A)for(const ee of A){let K={},le=l(ee,K,"text",m),te=l(ee,K,"location",Le);G(ee,K,D),U.push({text:le||"",location:ze(te,D)})}d.push({pluginName:s||o,text:x||"",location:ze(S,D),notes:U,detail:r?r.store(F):-1}),u++}return d}function Ee(e,t){const r=[];for(const o of e){if(typeof o!="string")throw new Error(`${JSON.stringify(t)} must be an array of strings`);r.push(o)}return r}function ut({path:e,contents:t}){let r=null;return{path:e,contents:t,get text(){return r===null&&(r=he(t)),r}}}var ft=e=>dt().build(e),ye,Te,dt=()=>{if(Te)return Te;throw ye?new Error('You need to wait for the promise returned from "initialize" to be resolved before calling this'):new Error('You need to call "initialize" before calling this')},ht=e=>{e=it(e||{});let t=e.wasmURL,r=e.worker!==!1;if(!t)throw new Error('Must provide the "wasmURL" option');if(t+="",ye)throw new Error('Cannot call "initialize" more than once');return ye=gt(t,r),ye.catch(()=>{ye=void 0}),ye},gt=async(e,t)=>{let r=await fetch(e);if(!r.ok)throw new Error(`Failed to download ${JSON.stringify(e)}`);let o=await r.arrayBuffer(),d=`{let global={};for(let o=self;o;o=Object.getPrototypeOf(o))for(let k of Object.getOwnPropertyNames(o))if(!(k in global))Object.defineProperty(global,k,{get:()=>self[k]});// Copyright 2018 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

(() => {
	// Map multiple JavaScript environments to a single common API,
	// preferring web standards over Node.js API.
	//
	// Environments considered:
	// - Browsers
	// - Node.js
	// - Electron
	// - Parcel
	// - Webpack

	if (typeof global !== "undefined") {
		// global already exists
	} else if (typeof window !== "undefined") {
		window.global = window;
	} else if (typeof self !== "undefined") {
		self.global = self;
	} else {
		throw new Error("cannot export Go (neither global, window nor self is defined)");
	}

	if (!global.require && typeof require !== "undefined") {
		global.require = require;
	}

	if (!global.fs && global.require) {
		const fs = require("fs");
		if (typeof fs === "object" && fs !== null && Object.keys(fs).length !== 0) {
			
    global.fs = Object.assign({}, fs, {
      // Hack around a Unicode bug in node: https://github.com/nodejs/node/issues/24550
      write(fd, buf, offset, length, position, callback) {
        if (offset === 0 && length === buf.length && position === null) {
          if (fd === process.stdout.fd) {
            try {
              process.stdout.write(buf, err => err ? callback(err, 0, null) : callback(null, length, buf));
            } catch (err) {
              callback(err, 0, null);
            }
            return;
          }
          if (fd === process.stderr.fd) {
            try {
              process.stderr.write(buf, err => err ? callback(err, 0, null) : callback(null, length, buf));
            } catch (err) {
              callback(err, 0, null);
            }
            return;
          }
        }
        fs.write(fd, buf, offset, length, position, callback);
      },
    });
  
		}
	}

	const enosys = () => {
		const err = new Error("not implemented");
		err.code = "ENOSYS";
		return err;
	};

	if (!global.fs) {
		let outputBuf = "";
		global.fs = {
			constants: { O_WRONLY: -1, O_RDWR: -1, O_CREAT: -1, O_TRUNC: -1, O_APPEND: -1, O_EXCL: -1 }, // unused
			writeSync(fd, buf) {
				outputBuf += decoder.decode(buf);
				const nl = outputBuf.lastIndexOf("\\n");
				if (nl != -1) {
					console.log(outputBuf.substr(0, nl));
					outputBuf = outputBuf.substr(nl + 1);
				}
				return buf.length;
			},
			write(fd, buf, offset, length, position, callback) {
				if (offset !== 0 || length !== buf.length || position !== null) {
					callback(enosys());
					return;
				}
				const n = this.writeSync(fd, buf);
				callback(null, n);
			},
			chmod(path, mode, callback) { callback(enosys()); },
			chown(path, uid, gid, callback) { callback(enosys()); },
			close(fd, callback) { callback(enosys()); },
			fchmod(fd, mode, callback) { callback(enosys()); },
			fchown(fd, uid, gid, callback) { callback(enosys()); },
			fstat(fd, callback) { callback(enosys()); },
			fsync(fd, callback) { callback(null); },
			ftruncate(fd, length, callback) { callback(enosys()); },
			lchown(path, uid, gid, callback) { callback(enosys()); },
			link(path, link, callback) { callback(enosys()); },
			lstat(path, callback) { callback(enosys()); },
			mkdir(path, perm, callback) { callback(enosys()); },
			open(path, flags, mode, callback) { callback(enosys()); },
			read(fd, buffer, offset, length, position, callback) { callback(enosys()); },
			readdir(path, callback) { callback(enosys()); },
			readlink(path, callback) { callback(enosys()); },
			rename(from, to, callback) { callback(enosys()); },
			rmdir(path, callback) { callback(enosys()); },
			stat(path, callback) { callback(enosys()); },
			symlink(path, link, callback) { callback(enosys()); },
			truncate(path, length, callback) { callback(enosys()); },
			unlink(path, callback) { callback(enosys()); },
			utimes(path, atime, mtime, callback) { callback(enosys()); },
		};
	}

	if (!global.process) {
		global.process = {
			getuid() { return -1; },
			getgid() { return -1; },
			geteuid() { return -1; },
			getegid() { return -1; },
			getgroups() { throw enosys(); },
			pid: -1,
			ppid: -1,
			umask() { throw enosys(); },
			cwd() { throw enosys(); },
			chdir() { throw enosys(); },
		}
	}

	if (!global.crypto && global.require) {
		const nodeCrypto = require("crypto");
		global.crypto = {
			getRandomValues(b) {
				nodeCrypto.randomFillSync(b);
			},
		};
	}
	if (!global.crypto) {
		throw new Error("global.crypto is not available, polyfill required (getRandomValues only)");
	}

	if (!global.performance) {
		global.performance = {
			now() {
				const [sec, nsec] = process.hrtime();
				return sec * 1000 + nsec / 1000000;
			},
		};
	}

	if (!global.TextEncoder && global.require) {
		global.TextEncoder = require("util").TextEncoder;
	}
	if (!global.TextEncoder) {
		throw new Error("global.TextEncoder is not available, polyfill required");
	}

	if (!global.TextDecoder && global.require) {
		global.TextDecoder = require("util").TextDecoder;
	}
	if (!global.TextDecoder) {
		throw new Error("global.TextDecoder is not available, polyfill required");
	}

	// End of polyfills for common API.

	const encoder = new TextEncoder("utf-8");
	const decoder = new TextDecoder("utf-8");

	global.Go = class {
		constructor() {
			this.argv = ["js"];
			this.env = {};
			this.exit = (code) => {
				if (code !== 0) {
					console.warn("exit code:", code);
				}
			};
			this._exitPromise = new Promise((resolve) => {
				this._resolveExitPromise = resolve;
			});
			this._pendingEvent = null;
			this._scheduledTimeouts = new Map();
			this._nextCallbackTimeoutID = 1;

			const setInt64 = (addr, v) => {
				this.mem.setUint32(addr + 0, v, true);
				this.mem.setUint32(addr + 4, Math.floor(v / 4294967296), true);
			}

			const getInt64 = (addr) => {
				const low = this.mem.getUint32(addr + 0, true);
				const high = this.mem.getInt32(addr + 4, true);
				return low + high * 4294967296;
			}

			const loadValue = (addr) => {
				const f = this.mem.getFloat64(addr, true);
				if (f === 0) {
					return undefined;
				}
				if (!isNaN(f)) {
					return f;
				}

				const id = this.mem.getUint32(addr, true);
				return this._values[id];
			}

			const storeValue = (addr, v) => {
				const nanHead = 0x7FF80000;

				if (typeof v === "number" && v !== 0) {
					if (isNaN(v)) {
						this.mem.setUint32(addr + 4, nanHead, true);
						this.mem.setUint32(addr, 0, true);
						return;
					}
					this.mem.setFloat64(addr, v, true);
					return;
				}

				if (v === undefined) {
					this.mem.setFloat64(addr, 0, true);
					return;
				}

				let id = this._ids.get(v);
				if (id === undefined) {
					id = this._idPool.pop();
					if (id === undefined) {
						id = this._values.length;
					}
					this._values[id] = v;
					this._goRefCounts[id] = 0;
					this._ids.set(v, id);
				}
				this._goRefCounts[id]++;
				let typeFlag = 0;
				switch (typeof v) {
					case "object":
						if (v !== null) {
							typeFlag = 1;
						}
						break;
					case "string":
						typeFlag = 2;
						break;
					case "symbol":
						typeFlag = 3;
						break;
					case "function":
						typeFlag = 4;
						break;
				}
				this.mem.setUint32(addr + 4, nanHead | typeFlag, true);
				this.mem.setUint32(addr, id, true);
			}

			const loadSlice = (addr) => {
				const array = getInt64(addr + 0);
				const len = getInt64(addr + 8);
				return new Uint8Array(this._inst.exports.mem.buffer, array, len);
			}

			const loadSliceOfValues = (addr) => {
				const array = getInt64(addr + 0);
				const len = getInt64(addr + 8);
				const a = new Array(len);
				for (let i = 0; i < len; i++) {
					a[i] = loadValue(array + i * 8);
				}
				return a;
			}

			const loadString = (addr) => {
				const saddr = getInt64(addr + 0);
				const len = getInt64(addr + 8);
				return decoder.decode(new DataView(this._inst.exports.mem.buffer, saddr, len));
			}

			const timeOrigin = Date.now() - performance.now();
			this.importObject = {
				go: {
					// Go's SP does not change as long as no Go code is running. Some operations (e.g. calls, getters and setters)
					// may synchronously trigger a Go event handler. This makes Go code get executed in the middle of the imported
					// function. A goroutine can switch to a new stack if the current stack is too small (see morestack function).
					// This changes the SP, thus we have to update the SP used by the imported function.

					// func wasmExit(code int32)
					"runtime.wasmExit": (sp) => {
						sp >>>= 0;
						const code = this.mem.getInt32(sp + 8, true);
						this.exited = true;
						delete this._inst;
						delete this._values;
						delete this._goRefCounts;
						delete this._ids;
						delete this._idPool;
						this.exit(code);
					},

					// func wasmWrite(fd uintptr, p unsafe.Pointer, n int32)
					"runtime.wasmWrite": (sp) => {
						sp >>>= 0;
						const fd = getInt64(sp + 8);
						const p = getInt64(sp + 16);
						const n = this.mem.getInt32(sp + 24, true);
						fs.writeSync(fd, new Uint8Array(this._inst.exports.mem.buffer, p, n));
					},

					// func resetMemoryDataView()
					"runtime.resetMemoryDataView": (sp) => {
						sp >>>= 0;
						this.mem = new DataView(this._inst.exports.mem.buffer);
					},

					// func nanotime1() int64
					"runtime.nanotime1": (sp) => {
						sp >>>= 0;
						setInt64(sp + 8, (timeOrigin + performance.now()) * 1000000);
					},

					// func walltime() (sec int64, nsec int32)
					"runtime.walltime": (sp) => {
						sp >>>= 0;
						const msec = (new Date).getTime();
						setInt64(sp + 8, msec / 1000);
						this.mem.setInt32(sp + 16, (msec % 1000) * 1000000, true);
					},

					// func scheduleTimeoutEvent(delay int64) int32
					"runtime.scheduleTimeoutEvent": (sp) => {
						sp >>>= 0;
						const id = this._nextCallbackTimeoutID;
						this._nextCallbackTimeoutID++;
						this._scheduledTimeouts.set(id, setTimeout(
							() => {
								this._resume();
								while (this._scheduledTimeouts.has(id)) {
									// for some reason Go failed to register the timeout event, log and try again
									// (temporary workaround for https://github.com/golang/go/issues/28975)
									console.warn("scheduleTimeoutEvent: missed timeout event");
									this._resume();
								}
							},
							getInt64(sp + 8) + 1, // setTimeout has been seen to fire up to 1 millisecond early
						));
						this.mem.setInt32(sp + 16, id, true);
					},

					// func clearTimeoutEvent(id int32)
					"runtime.clearTimeoutEvent": (sp) => {
						sp >>>= 0;
						const id = this.mem.getInt32(sp + 8, true);
						clearTimeout(this._scheduledTimeouts.get(id));
						this._scheduledTimeouts.delete(id);
					},

					// func getRandomData(r []byte)
					"runtime.getRandomData": (sp) => {
						sp >>>= 0;
						crypto.getRandomValues(loadSlice(sp + 8));
					},

					// func finalizeRef(v ref)
					"syscall/js.finalizeRef": (sp) => {
						sp >>>= 0;
						const id = this.mem.getUint32(sp + 8, true);
						this._goRefCounts[id]--;
						if (this._goRefCounts[id] === 0) {
							const v = this._values[id];
							this._values[id] = null;
							this._ids.delete(v);
							this._idPool.push(id);
						}
					},

					// func stringVal(value string) ref
					"syscall/js.stringVal": (sp) => {
						sp >>>= 0;
						storeValue(sp + 24, loadString(sp + 8));
					},

					// func valueGet(v ref, p string) ref
					"syscall/js.valueGet": (sp) => {
						sp >>>= 0;
						const result = Reflect.get(loadValue(sp + 8), loadString(sp + 16));
						sp = this._inst.exports.getsp() >>> 0; // see comment above
						storeValue(sp + 32, result);
					},

					// func valueSet(v ref, p string, x ref)
					"syscall/js.valueSet": (sp) => {
						sp >>>= 0;
						Reflect.set(loadValue(sp + 8), loadString(sp + 16), loadValue(sp + 32));
					},

					// func valueDelete(v ref, p string)
					"syscall/js.valueDelete": (sp) => {
						sp >>>= 0;
						Reflect.deleteProperty(loadValue(sp + 8), loadString(sp + 16));
					},

					// func valueIndex(v ref, i int) ref
					"syscall/js.valueIndex": (sp) => {
						sp >>>= 0;
						storeValue(sp + 24, Reflect.get(loadValue(sp + 8), getInt64(sp + 16)));
					},

					// valueSetIndex(v ref, i int, x ref)
					"syscall/js.valueSetIndex": (sp) => {
						sp >>>= 0;
						Reflect.set(loadValue(sp + 8), getInt64(sp + 16), loadValue(sp + 24));
					},

					// func valueCall(v ref, m string, args []ref) (ref, bool)
					"syscall/js.valueCall": (sp) => {
						sp >>>= 0;
						try {
							const v = loadValue(sp + 8);
							const m = Reflect.get(v, loadString(sp + 16));
							const args = loadSliceOfValues(sp + 32);
							const result = Reflect.apply(m, v, args);
							sp = this._inst.exports.getsp() >>> 0; // see comment above
							storeValue(sp + 56, result);
							this.mem.setUint8(sp + 64, 1);
						} catch (err) {
							sp = this._inst.exports.getsp() >>> 0; // see comment above
							storeValue(sp + 56, err);
							this.mem.setUint8(sp + 64, 0);
						}
					},

					// func valueInvoke(v ref, args []ref) (ref, bool)
					"syscall/js.valueInvoke": (sp) => {
						sp >>>= 0;
						try {
							const v = loadValue(sp + 8);
							const args = loadSliceOfValues(sp + 16);
							const result = Reflect.apply(v, undefined, args);
							sp = this._inst.exports.getsp() >>> 0; // see comment above
							storeValue(sp + 40, result);
							this.mem.setUint8(sp + 48, 1);
						} catch (err) {
							sp = this._inst.exports.getsp() >>> 0; // see comment above
							storeValue(sp + 40, err);
							this.mem.setUint8(sp + 48, 0);
						}
					},

					// func valueNew(v ref, args []ref) (ref, bool)
					"syscall/js.valueNew": (sp) => {
						sp >>>= 0;
						try {
							const v = loadValue(sp + 8);
							const args = loadSliceOfValues(sp + 16);
							const result = Reflect.construct(v, args);
							sp = this._inst.exports.getsp() >>> 0; // see comment above
							storeValue(sp + 40, result);
							this.mem.setUint8(sp + 48, 1);
						} catch (err) {
							sp = this._inst.exports.getsp() >>> 0; // see comment above
							storeValue(sp + 40, err);
							this.mem.setUint8(sp + 48, 0);
						}
					},

					// func valueLength(v ref) int
					"syscall/js.valueLength": (sp) => {
						sp >>>= 0;
						setInt64(sp + 16, parseInt(loadValue(sp + 8).length));
					},

					// valuePrepareString(v ref) (ref, int)
					"syscall/js.valuePrepareString": (sp) => {
						sp >>>= 0;
						const str = encoder.encode(String(loadValue(sp + 8)));
						storeValue(sp + 16, str);
						setInt64(sp + 24, str.length);
					},

					// valueLoadString(v ref, b []byte)
					"syscall/js.valueLoadString": (sp) => {
						sp >>>= 0;
						const str = loadValue(sp + 8);
						loadSlice(sp + 16).set(str);
					},

					// func valueInstanceOf(v ref, t ref) bool
					"syscall/js.valueInstanceOf": (sp) => {
						sp >>>= 0;
						this.mem.setUint8(sp + 24, (loadValue(sp + 8) instanceof loadValue(sp + 16)) ? 1 : 0);
					},

					// func copyBytesToGo(dst []byte, src ref) (int, bool)
					"syscall/js.copyBytesToGo": (sp) => {
						sp >>>= 0;
						const dst = loadSlice(sp + 8);
						const src = loadValue(sp + 32);
						if (!(src instanceof Uint8Array || src instanceof Uint8ClampedArray)) {
							this.mem.setUint8(sp + 48, 0);
							return;
						}
						const toCopy = src.subarray(0, dst.length);
						dst.set(toCopy);
						setInt64(sp + 40, toCopy.length);
						this.mem.setUint8(sp + 48, 1);
					},

					// func copyBytesToJS(dst ref, src []byte) (int, bool)
					"syscall/js.copyBytesToJS": (sp) => {
						sp >>>= 0;
						const dst = loadValue(sp + 8);
						const src = loadSlice(sp + 16);
						if (!(dst instanceof Uint8Array || dst instanceof Uint8ClampedArray)) {
							this.mem.setUint8(sp + 48, 0);
							return;
						}
						const toCopy = src.subarray(0, dst.length);
						dst.set(toCopy);
						setInt64(sp + 40, toCopy.length);
						this.mem.setUint8(sp + 48, 1);
					},

					"debug": (value) => {
						console.log(value);
					},
				}
			};
		}

		async run(instance) {
			if (!(instance instanceof WebAssembly.Instance)) {
				throw new Error("Go.run: WebAssembly.Instance expected");
			}
			this._inst = instance;
			this.mem = new DataView(this._inst.exports.mem.buffer);
			this._values = [ // JS values that Go currently has references to, indexed by reference id
				NaN,
				0,
				null,
				true,
				false,
				global,
				this,
			];
			this._goRefCounts = new Array(this._values.length).fill(Infinity); // number of references that Go has to a JS value, indexed by reference id
			this._ids = new Map([ // mapping from JS values to reference ids
				[0, 1],
				[null, 2],
				[true, 3],
				[false, 4],
				[global, 5],
				[this, 6],
			]);
			this._idPool = [];   // unused ids that have been garbage collected
			this.exited = false; // whether the Go program has exited

			// Pass command line arguments and environment variables to WebAssembly by writing them to the linear memory.
			let offset = 4096;

			const strPtr = (str) => {
				const ptr = offset;
				const bytes = encoder.encode(str + "\\0");
				new Uint8Array(this.mem.buffer, offset, bytes.length).set(bytes);
				offset += bytes.length;
				if (offset % 8 !== 0) {
					offset += 8 - (offset % 8);
				}
				return ptr;
			};

			const argc = this.argv.length;

			const argvPtrs = [];
			this.argv.forEach((arg) => {
				argvPtrs.push(strPtr(arg));
			});
			argvPtrs.push(0);

			const keys = Object.keys(this.env).sort();
			keys.forEach((key) => {
				argvPtrs.push(strPtr(\`\${key}=\${this.env[key]}\`));
			});
			argvPtrs.push(0);

			const argv = offset;
			argvPtrs.forEach((ptr) => {
				this.mem.setUint32(offset, ptr, true);
				this.mem.setUint32(offset + 4, 0, true);
				offset += 8;
			});

			// The linker guarantees global data starts from at least wasmMinDataAddr.
			// Keep in sync with cmd/link/internal/ld/data.go:wasmMinDataAddr.
			const wasmMinDataAddr = 4096 + 4096;
			if (offset >= wasmMinDataAddr) {
				throw new Error("command line too long");
			}

			this._inst.exports.run(argc, argv);
			if (this.exited) {
				this._resolveExitPromise();
			}
			await this._exitPromise;
		}

		_resume() {
			if (this.exited) {
				throw new Error("Go program has already exited");
			}
			this._inst.exports.resume();
			if (this.exited) {
				this._resolveExitPromise();
			}
		}

		_makeFuncWrapper(id) {
			const go = this;
			return function () {
				const event = { id: id, this: this, args: arguments };
				go._pendingEvent = event;
				go._resume();
				return event.result;
			};
		}
	}

	if (
		typeof module !== "undefined" &&
		global.require &&
		global.require.main === module &&
		global.process &&
		global.process.versions &&
		!global.process.versions.electron
	) {
		if (process.argv.length < 3) {
			console.error("usage: go_js_wasm_exec [wasm binary] [arguments]");
			process.exit(1);
		}

		const go = new Go();
		go.argv = process.argv.slice(2);
		go.env = Object.assign({ TMPDIR: require("os").tmpdir() }, process.env);
		go.exit = process.exit;
		WebAssembly.instantiate(fs.readFileSync(process.argv[2]), go.importObject).then((result) => {
			process.on("exit", (code) => { // Node.js exits if no event handler is pending
				if (code === 0 && !go.exited) {
					// deadlock, make Go print error and stack traces
					go._pendingEvent = { id: 0 };
					go._resume();
				}
			});
			return go.run(result.instance);
		}).catch((err) => {
			console.error(err);
			process.exit(1);
		});
	}
})();
onmessage = ({ data: wasm }) => {
  let decoder = new TextDecoder();
  let fs = global.fs;
  let stderr = "";
  fs.writeSync = (fd, buffer) => {
    if (fd === 1) {
      postMessage(buffer);
    } else if (fd === 2) {
      stderr += decoder.decode(buffer);
      let parts = stderr.split("\\n");
      if (parts.length > 1)
        console.log(parts.slice(0, -1).join("\\n"));
      stderr = parts[parts.length - 1];
    } else {
      throw new Error("Bad write");
    }
    return buffer.length;
  };
  let stdin = [];
  let resumeStdin;
  let stdinPos = 0;
  onmessage = ({ data }) => {
    if (data.length > 0) {
      stdin.push(data);
      if (resumeStdin)
        resumeStdin();
    }
  };
  fs.read = (fd, buffer, offset, length, position, callback) => {
    if (fd !== 0 || offset !== 0 || length !== buffer.length || position !== null) {
      throw new Error("Bad read");
    }
    if (stdin.length === 0) {
      resumeStdin = () => fs.read(fd, buffer, offset, length, position, callback);
      return;
    }
    let first = stdin[0];
    let count = Math.max(0, Math.min(length, first.length - stdinPos));
    buffer.set(first.subarray(stdinPos, stdinPos + count), offset);
    stdinPos += count;
    if (stdinPos === first.length) {
      stdin.shift();
      stdinPos = 0;
    }
    callback(null, count);
  };
  let go = new global.Go();
  go.argv = ["", \`--service=\${"0.13.11"}\`];
  WebAssembly.instantiate(wasm, go.importObject).then(({ instance }) => go.run(instance));
};}`,u;if(t){let s=new Blob([d],{type:"text/javascript"});u=new Worker(URL.createObjectURL(s))}else{let x=new Function("postMessage",d+"var onmessage; return m => onmessage(m)")(S=>u.onmessage({data:S}));u={onmessage:null,postMessage:S=>x({data:S}),terminate(){}}}u.postMessage(o),u.onmessage=({data:s})=>n(s);let{readFromStdout:n,service:y}=ct({writeToStdin(s){u.postMessage(s)},isSync:!1,isBrowser:!0});Te={build:s=>new Promise((x,S)=>y.buildOrServe({callName:"build",refs:null,serveOptions:null,options:s,isTTY:!1,defaultWD:"/",callback:(A,F)=>A?S(A):x(F)})),transform:(s,x)=>new Promise((S,A)=>y.transform({callName:"transform",refs:null,input:s,options:x||{},isTTY:!1,fs:{readFile(F,D){D(new Error("Internal error"),null)},writeFile(F,D){D(null)}},callback:(F,D)=>F?A(F):S(D)})),formatMessages:(s,x)=>new Promise((S,A)=>y.formatMessages({callName:"formatMessages",refs:null,messages:s,options:x,callback:(F,D)=>F?A(F):S(D)})),analyzeMetafile:(s,x)=>new Promise((S,A)=>y.analyzeMetafile({callName:"analyzeMetafile",refs:null,metafile:typeof s=="string"?s:JSON.stringify(s),options:x,callback:(F,D)=>F?A(F):S(D)}))}};(async()=>{await ht({wasmURL:"./esbuild.wasm",worker:!1}),self.addEventListener("message",async e=>{const t=e.data,r=await ft({stdin:{contents:`import "${t.entryURL}";`},write:!1,...t});self.postMessage(r.outputFiles[0].text)})})();})();

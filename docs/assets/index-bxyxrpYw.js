(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const d of o)if(d.type==="childList")for(const p of d.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&i(p)}).observe(document,{childList:!0,subtree:!0});function s(o){const d={};return o.integrity&&(d.integrity=o.integrity),o.referrerPolicy&&(d.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?d.credentials="include":o.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function i(o){if(o.ep)return;o.ep=!0;const d=s(o);fetch(o.href,d)}})();const L=`<section class="todoapp">\r
    <header class="header">\r
        <h1>Tareas</h1>\r
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>\r
    </header>\r
    \r
    <!-- This section should be hidden by default and shown when there are todos -->\r
    <section class="main">\r
        <input id="toggle-all" class="toggle-all" type="checkbox">\r
        <label for="toggle-all">Mark all as complete</label>\r
        <ul class="todo-list">\r
            <!-- These are here just to show the structure of the list items -->\r
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->\r
            <!-- <li class="completed" data-id="abc">\r
                <div class="view">\r
                    <input class="toggle" type="checkbox" checked>\r
                    <label>Probar JavaScript</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Create a TodoMVC template">\r
            </li> -->\r
            <!-- <li>\r
                <div class="view">\r
                    <input class="toggle" type="checkbox">\r
                    <label>Comprar un unicornio</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Rule the web">\r
            </li> -->\r
        </ul>\r
    </section>\r
\r
    <!-- This footer should hidden by default and shown when there are todos -->\r
    <footer class="footer">\r
        <!-- This should be "0 items left" by default -->\r
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
        <!-- Remove this if you don't implement routing -->\r
        <ul class="filters">\r
            <li>\r
                <a class="selected filtro" class="selected" href="#/">Todos</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/active">Pendientes</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/completed">Completados</a>\r
            </li>\r
        </ul>\r
        <!-- Hidden if no completed items are left ↓ -->\r
        <button class="clear-completed">Borrar completados</button>\r
    </footer>\r
</section>\r
\r
\r
<footer class="info">\r
    <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>\r
    <!-- Change this out with your name and url ↓ -->\r
    <p>Creado por <a href="http://todomvc.com">ti</a></p>\r
    <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>\r
</footer>`;let f;const S=new Uint8Array(16);function C(){if(!f&&(f=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!f))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return f(S)}const n=[];for(let e=0;e<256;++e)n.push((e+256).toString(16).slice(1));function E(e,t=0){return n[e[t+0]]+n[e[t+1]]+n[e[t+2]]+n[e[t+3]]+"-"+n[e[t+4]]+n[e[t+5]]+"-"+n[e[t+6]]+n[e[t+7]]+"-"+n[e[t+8]]+n[e[t+9]]+"-"+n[e[t+10]]+n[e[t+11]]+n[e[t+12]]+n[e[t+13]]+n[e[t+14]]+n[e[t+15]]}const P=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),w={randomUUID:P};function A(e,t,s){if(w.randomUUID&&!t&&!e)return w.randomUUID();e=e||{};const i=e.random||(e.rng||C)();if(i[6]=i[6]&15|64,i[8]=i[8]&63|128,t){s=s||0;for(let o=0;o<16;++o)t[s+o]=i[o];return t}return E(i)}class g{constructor(t){this.id=A(),this.description=t,this.done=!1,this.createdAt=new Date}}const c={All:"all",Completed:"Completed",Pending:"Pending"},r={todos:[new g("Piedra del alma"),new g("Piedra del infinito"),new g("Piedra del tiempo"),new g("Piedra del poder"),new g("Piedra de la realidad")],filter:c.All},I=()=>{console.log(r),console.log("es de tipo",typeof r.filter),console.log("initStore 🥑"),T()},T=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=c.All}=JSON.parse(localStorage.getItem("state"));r.todos=e,r.filter=t},b=()=>{localStorage.setItem("state",JSON.stringify(r))},k=(e=c.All)=>{switch(e){case c.All:return[...r.todos];case c.Completed:return r.todos.filter(t=>t.done);case c.Pending:return r.todos.filter(t=>!t.done);default:throw new Error(`Option ${e} is not valid`)}},U=e=>{if(!e)throw new Error("description is required");r.todos.push(new g(e)),b()},x=e=>{r.todos=r.todos.map(t=>(t.id===e&&(t.done=!t.done),console.log(t.done),t)),b()},O=e=>{r.todos=r.todos.filter(t=>t.id!==e),b()},q=()=>{r.todos=r.todos.filter(e=>!e.done),b()},F=(e=c.All)=>{r.filter=e},M=()=>r.filter,a={initStore:I,loadStore:T,getTodos:k,addTodo:U,toggleTodo:x,deleteTodo:O,deleteCompleted:q,setFiler:F,getCurrentFilter:M};let m;const D=(e,t=[])=>{if(m||(m=document.querySelector(e)),!m)throw new Error(`Element ${m} not found`);m.innerHTML="",t.forEach(s=>{m.append(N(s))})},N=e=>{if(!e)throw new Error("A TODO object is requiered");const t=`<div class="view">
                        <input class="toggle" type="checkbox" ${e.id?"checked":""}>
                        <label>${e.description}</label>
                        <button class="destroy"></button>
                    </div>
                    <input class="edit" value="Create a TodoMVC template">
                `,s=document.createElement("li");return s.innerHTML=t,s.setAttribute("data-id",e.id),e.done&&s.classList.add("completed"),s};let y;const H=e=>{if(y||(y=document.querySelector(e)),!y)throw new Error(`Element ${e} not found`);y.innerHTML=a.getTodos(c.Pending).length},h={ClearCompleted:".clear-completed",TodoList:".todo-list",NewTodoInput:"#new-todo-input",TodoFilters:".filtro",PendingCountLabel:"#pending-count"},V=e=>{const t=()=>{const l=a.getTodos(a.getCurrentFilter());D(h.TodoList,l),s()},s=()=>{H(h.PendingCountLabel)};(()=>{const l=document.createElement("div");l.innerHTML=L,document.querySelector(e).append(l),t()})();const i=document.querySelector(h.NewTodoInput),o=document.querySelector(h.TodoList),d=document.querySelector(h.ClearCompleted),p=document.querySelectorAll(h.TodoFilters);i.addEventListener("keyup",l=>{l.key==="Enter"&&l.target.value.trim().length!==0&&(a.addTodo(l.target.value),t(),l.target.value="")}),o.addEventListener("click",l=>{const u=l.target.closest("[data-id]");a.toggleTodo(u.getAttribute("data-id")),t()}),o.addEventListener("click",l=>{const u=l.target.closest("[data-id]");!u||l.target.className!=="destroy"||(a.deleteTodo(u.getAttribute("data-id")),t())}),d.addEventListener("click",()=>{a.deleteCompleted(),t()}),p.forEach(l=>{l.addEventListener("click",u=>{switch(p.forEach(v=>v.classList.remove("selected")),u.target.classList.add("selected"),u.target.text){case"Todos":a.setFiler(c.All);break;case"Pendientes":a.setFiler(c.Pending);break;case"Completados":a.setFiler(c.Completed);break}t()})})};a.initStore();V("#app");

/* SmartyHub Organic: shared footer + floating WhatsApp button (all shop pages) */
(function(){
  var WA="2348066611017",IG="https://instagram.com/smartyhuborganic";
  var wa='<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="h-full w-full"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
  var ig='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="h-full w-full"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>';
  var box='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="h-5 w-5"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>';

  var social=
   '<div><p class="text-sm font-bold">Connect With Us</p><div class="mt-3 flex gap-3">'+
   '<a href="'+IG+'" target="_blank" rel="noopener" aria-label="Instagram" class="flex h-11 w-11 items-center justify-center rounded-full bg-white p-3 text-g2 shadow-sm ring-1 ring-neutral-200 hover:ring-g3">'+ig+'</a>'+
   '<a href="https://wa.me/'+WA+'" target="_blank" rel="noopener" aria-label="WhatsApp" class="flex h-11 w-11 items-center justify-center rounded-full bg-white p-3 text-g2 shadow-sm ring-1 ring-neutral-200 hover:ring-g3">'+wa+'</a></div></div>';

  var f=document.getElementById("site-footer");
  if(f){
    f.className="border-t border-neutral-100 bg-neutral-50";
    f.innerHTML=
'<div class="mx-auto max-w-6xl px-4 py-10 md:py-14">'+
 '<div class="grid gap-8 md:grid-cols-12 md:gap-12">'+
  /* left: brand, My order, social (desktop) */
  '<div class="md:col-span-5">'+
   '<div class="flex items-center gap-4"><img src="logo-mark.png?v=3" alt="" class="h-14 w-auto shrink-0 md:h-16"/>'+
   '<p class="text-sm text-neutral-600">SmartyHub Organic is a Lagos brand offering fresh organic breakfast, tiger nut drinks, shawarma and quality wellness supplements, delivered to your door.</p></div>'+
   '<a href="index.html" data-go="orders" class="mt-6 flex items-center justify-between rounded-xl bg-black px-4 py-4 font-semibold text-white md:max-w-sm"><span class="flex items-center gap-3"><span class="flex h-9 w-9 items-center justify-center rounded-lg bg-g2">'+box+'</span>My order</span><span aria-hidden="true" class="text-xl">&rsaquo;</span></a>'+
   '<div class="mt-8 hidden md:block">'+social+'</div>'+
  '</div>'+
  /* right: link columns */
  '<div class="grid grid-cols-2 gap-8 text-sm md:col-span-7 md:grid-cols-3">'+
   '<div><p class="font-bold">Quicklinks</p><ul class="mt-3 space-y-2.5 text-neutral-600">'+
    '<li><a href="index.html#eats" data-go="products" class="hover:text-g2">Products</a></li>'+
    '<li><a href="about.html" class="hover:text-g2">About us</a></li>'+
    '<li><a href="index.html" data-go="orders" class="hover:text-g2">My order</a></li></ul></div>'+
   '<div><p class="font-bold">Legal</p><ul class="mt-3 space-y-2.5 text-neutral-600">'+
    '<li><a href="terms.html" class="hover:text-g2">Terms of Service</a></li>'+
    '<li><a href="policy.html" class="hover:text-g2">Policy</a></li>'+
    '<li><a href="privacy.html" class="hover:text-g2">Privacy</a></li></ul></div>'+
   '<div class="col-span-2 md:col-span-1"><p class="font-bold">Contact</p><ul class="mt-3 space-y-2.5 text-neutral-600"><li>Lagos, Nigeria</li><li><a href="https://wa.me/'+WA+'" class="hover:text-g2">+234 806 661 1017 (WhatsApp)</a></li></ul></div>'+
  '</div>'+
  /* social (mobile only, after the links) */
  '<div class="md:hidden">'+social+'</div>'+
 '</div>'+
 '<div class="mt-10 border-t border-neutral-200 pt-6"><p class="text-xs font-semibold uppercase tracking-wide text-neutral-500">&copy; '+new Date().getFullYear()+' SmartyHub Organic</p></div>'+
'</div>';
  }

  /* Floating WhatsApp: slides away while scrolling, returns when the user stops */
  var st=document.createElement("style");
  st.textContent=".wa-float{position:fixed;right:1rem;bottom:calc(1.25rem + env(safe-area-inset-bottom,0px));z-index:30;width:3.5rem;height:3.5rem;padding:.85rem;border-radius:9999px;background:#25D366;color:#fff;box-shadow:0 10px 24px -6px rgba(0,0,0,.35);transition:transform .25s ease,opacity .25s ease}.wa-float.wa-hide{transform:translateY(90px) scale(.8);opacity:0;pointer-events:none}";
  document.head.appendChild(st);
  var a=document.createElement("a");
  a.className="wa-float";a.href="https://wa.me/"+WA+"?text="+encodeURIComponent("Hi SmartyHub Organic, I need help with...");
  a.target="_blank";a.rel="noopener";a.setAttribute("aria-label","Chat on WhatsApp");a.innerHTML=wa;
  document.body.appendChild(a);
  var t;addEventListener("scroll",function(){a.classList.add("wa-hide");clearTimeout(t);t=setTimeout(function(){a.classList.remove("wa-hide")},600)},{passive:true});

  /* On the shop page, footer links act in place instead of reloading */
  document.addEventListener("click",function(e){
    var l=e.target.closest&&e.target.closest("a[data-go]");
    if(!l)return;
    if(!document.getElementById("app")){
      /* other pages: remember the request, then open the shop (no #orders in the address bar) */
      if(l.dataset.go==="orders"){e.preventDefault();try{sessionStorage.setItem("sho-go-orders",String(Date.now()))}catch(x){}location.href="index.html"}
      return;
    }
    e.preventDefault();
    if(l.dataset.go==="orders")openOrders();
    else{location.hash="#eats";scrollTo({top:0,behavior:"smooth"})}
  });
})();

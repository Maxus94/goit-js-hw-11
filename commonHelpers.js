import{S as m,i as l}from"./assets/vendor-5b791d57.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const c=document.querySelector(".search-form"),i=document.querySelector(".gallery"),u=new m(".gallery a",{captionsData:"alt",captionDelay:250});i.innerHTML="";c.addEventListener("submit",f);function f(s){s.preventDefault(),l.destroy(),i.innerHTML='<div class="loader-block"><div class="loader-text">Loading images, please wait...</div><span class="loader"></span></div>',fetch(`https://pixabay.com/api/?key=40858721-2ab2962236a746e97c71283b6&q=${c.elements.searchText.value.trim()}&image_type=photo&orientation=horizontal&safesearch=true,`).then(t=>{if(!t.ok)throw new Error(t.status);return t.json()}).then(t=>{t.hits.length===0?(l.show({message:"Sorry, there are no images matching your search query. Please try again!",close:!1,maxWidth:"422px",backgroundColor:"red",messageColor:"white",messageSize:20,timeout:0,position:"topRight"}),i.innerHTML=""):(i.innerHTML=p(t.hits),u.refresh())}).catch(t=>{l.show({title:"Error",message:"Something goes wrong, please try reload page.",close:!1,backgroundColor:"red",messageColor:"white",messageSize:20,timeout:0,position:"topRight"}),i.innerHTML=""}),c.reset()}function p(s){return s.map(({webformatURL:t,tags:n,likes:a,views:e,comments:r,downloads:o,largeImageURL:d})=>`<div class="photo-card">
        <a href="${d}">
      <img class="item-image" src="${t}" alt="${n}" width="400" height="240" loading="lazy" />
      </a>
      <div class="info"><p class="info-item"><b>Likes</b><br>${a}</p>
      <p class="info-item"><b>Views</b><br>${e}</p>
      <p class="info-item"><b>Comments</b><br>${r}</p>
      <p class="info-item"><b>Downloads</b><br>${o}</p></div></div>`).join("")}
//# sourceMappingURL=commonHelpers.js.map

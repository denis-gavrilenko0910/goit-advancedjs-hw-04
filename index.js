import{a as q,S as P,i as a}from"./assets/vendor-_1MgqFv1.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const R="56783276-a6bc6513a52b18a8df57108bc",B="https://pixabay.com/api/";async function m(r,t=1){const{data:s}=await q.get(B,{params:{key:R,q:r,page:t,per_page:15,image_type:"photo",orientation:"horizontal",safesearch:!0}});return s}const p=document.querySelector(".gallery"),g=document.querySelector(".loader"),h=document.querySelector(".load-more"),E=new P(".gallery a",{captionsData:"alt",captionDelay:250});function y(r){const t=r.map(({webformatURL:s,largeImageURL:i,tags:e,likes:o,views:c,comments:w,downloads:M})=>`
        <li class="gallery-card">
            <a href="${i}">
                <img class="gallery-image" src="${s}" alt="${e}" />
            </a>

            <div class="gallery-info">
                <div class="info-item">
                  <p class="info-title">Likes</p>
                  <p class="info-value">${o}</p>
                </div>

                <div class="info-item">
                  <p class="info-title">Views</p>
                  <p class="info-value">${c}</p>
                </div>

                <div class="info-item">
                  <p class="info-title">Comments</p>
                  <p class="info-value">${w}</p>
                </div>

                <div class="info-item">
                  <p class="info-title">Downloads</p>
                  <p class="info-value">${M}</p>
                </div>
            </div>
      </li>
    `).join("");p.insertAdjacentHTML("beforeend",t),E.refresh()}function $(){p.innerHTML=""}function v(){g.classList.add("is-visible")}function L(){g.classList.remove("is-visible")}function b(){h.classList.remove("hidden")}function d(){h.classList.add("hidden")}const u=document.querySelector(".form"),x=document.querySelector(".load-more");let l="",n=1,f=0;const S=15,O=async r=>{if(console.log("FORM SUBMIT FIRED"),r.preventDefault(),l=u.elements["search-text"].value.trim(),console.log(l),!l){d(),a.error({message:"Please enter a search query",position:"topRight"});return}n=1,$(),d(),v();try{const t=await m(l,n);if(f=t.totalHits,t.hits.length===0){a.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}y(t.hits);const s=Math.ceil(f/S);n<s?b():(d(),a.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch{a.error({message:"Something went wrong",position:"topRight"})}finally{L(),u.reset()}},A=async()=>{n+=1,d(),v();try{const r=await m(l,n);y(r.hits);const t=document.querySelector(".gallery-card");if(t){const i=t.getBoundingClientRect().height;window.scrollBy({top:i*2,behavior:"smooth"})}const s=Math.ceil(f/S);n<s?b():(d(),a.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch{a.error({message:"Error loading more images",position:"topRight"})}finally{L()}};u.addEventListener("submit",O);x.addEventListener("click",A);
//# sourceMappingURL=index.js.map

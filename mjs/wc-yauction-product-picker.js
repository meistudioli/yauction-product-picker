import { _wcl } from './common-lib.js';
import { _wccss } from './common-css.js';
import he from './he.js';
import Mustache from './mustache.js';

const defaults = {
  storeid: '',
  maxcount: 10,
  params: {
    spaceId: 'test'
  },
  l10n: {
    placeholder: 'Search Products',
    selectCategory: 'Select Category',
    all: 'all products',
    submit: 'Submit'
  },
  limit: 60
};
const objectAttrs = ['params', 'l10n'];
const custumEvents = {
  close: 'ypp-close',
  submit: 'ypp-submit',
  slectedChange: 'ypp-selected-change'
};
const ws = {
  inStoreSearch: 'https://tw.search.ec.yahoo.com/api/uther/v3/auction/inStoreSearch',
  productListing: 'https://tw.search.ec.yahoo.com/api/uther/v3/auction/products'
};

const template = document.createElement('template');
template.innerHTML = `
<style>
${_wccss}

.clickable{position:relative;width:fit-content;font-size:var(--fs, 18px);font-weight:var(--fw, 400);line-height:var(--lh, 44px);padding:0 var(--p, 32px);color:var(--color, #232a31);background-color:var(--bgcolor, #fff);box-shadow:inset 0 0 0 2px var(--border-color, #e0e4e9);border-radius:44px;box-sizing:border-box;display:block;outline:0 none;overflow:hidden;transform:translate3d(0,0,0);}
.clickable::after{position:absolute;left:0;top:0;width:100%;height:100%;content:'';background-color:var(--inkwell, #1d2228);filter:opacity(0%);transition:filter 100ms ease;}
.clickable:active{transform:scale(0.97);}
.clickable[data-size='large']{--fs:18px;--lh:44px;--p:32px;}
.clickable[data-size='medium']{--fs:16px;--lh:36px;--p:24px;}
.clickable[data-size='xs']{--fs:14px;--lh:28px;--p:16px;}
.clickable[data-size='xxs']{--fs:14px;--lh:24px;--p:14px;}
.clickable__content{position:relative;z-index:1;}
.clickable:focus{outline:0 none;}
.clickable:focus::after{filter:opacity(20%);}

:host{position:relative;display:none;overflow:hidden;width:0;height:0;background-color:#fff;}

:host {
  --height: 48px;
  --icon-size: 20px;

  --yauction-product-picker-remove-bgc: #e1e1e1;
  --yauction-product-picker-icon-close: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIGhlaWdodD0nMjQnIHdpZHRoPScyNCc+PHBhdGggZD0nTTAgMGgyNHYyNEgweicgZmlsbD0nbm9uZScvPjxwYXRoIGZpbGw9JyMyODI4MjgnIGQ9J00xOSA2LjQxTDE3LjU5IDUgMTIgMTAuNTkgNi40MSA1IDUgNi40MSAxMC41OSAxMiA1IDE3LjU5IDYuNDEgMTkgMTIgMTMuNDEgMTcuNTkgMTkgMTkgMTcuNTkgMTMuNDEgMTJ6Jy8+PC9zdmc+) no-repeat 50% 50%/1.5em auto;
  --yauction-product-picker-icon-search: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIGhlaWdodD0nMjQnIHdpZHRoPScyNCc+PHBhdGggZD0nTTAgMGgyNHYyNEgweicgZmlsbD0nbm9uZScvPjxwYXRoIGZpbGw9JyMyODI4MjgnIGQ9J00xNS41IDE0aC0uNzlsLS4yOC0uMjdBNi40NzEgNi40NzEgMCAwMDE2IDkuNSA2LjUgNi41IDAgMTA5LjUgMTZjMS42MSAwIDMuMDktLjU5IDQuMjMtMS41N2wuMjcuMjh2Ljc5bDUgNC45OUwyMC40OSAxOWwtNC45OS01em0tNiAwQzcuMDEgMTQgNSAxMS45OSA1IDkuNVM3LjAxIDUgOS41IDUgMTQgNy4wMSAxNCA5LjUgMTEuOTkgMTQgOS41IDE0eicvPjwvc3ZnPg==) no-repeat calc(var(--height) / 2) 50%/var(--icon-size) auto;
  --yauction-product-picker-icon-arrow-down: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIGhlaWdodD0nMjQnIHdpZHRoPScyNCc+PHBhdGggZD0nTTAgMGgyNHYyNEgweicgZmlsbD0nbm9uZScvPjxwYXRoIGZpbGw9JyMyODI4MjgnIGQ9J003IDEwbDUgNSA1LTV6Jy8+PC9zdmc+) transparent no-repeat calc(100% - 1.25em + 14px) 50% /20px auto;
  --yauction-product-picker-icon-remove: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIGhlaWdodD0nMjQnIHdpZHRoPScyNCc+PHBhdGggZD0nTTAgMGgyNHYyNEgweicgZmlsbD0nbm9uZScvPjxwYXRoIGZpbGw9JyMxZDFjMWMnIGQ9J00xOSAxM0g1di0yaDE0djJ6Jy8+PC9zdmc+) var(--yauction-product-picker-remove-bgc) no-repeat 50% 50% /80% auto;
  --yauction-product-picker-logo: url(data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPScxLjEnIGlkPSdMYXllcl8xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHg9JzAnIHk9JzAnIHZpZXdCb3g9JzAgMCA0MiA0MicgeG1sOnNwYWNlPSdwcmVzZXJ2ZSc+PHN0eWxlPi5zdDB7ZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGR9PC9zdHlsZT48cGF0aCBjbGFzcz0nc3QwJyBkPSdNMzEuNSAxMC42aC00LjFWOC4yYzAtLjYtLjUtMS4yLTEuMi0xLjJoLS42Yy0uNiAwLTEuMi41LTEuMiAxLjJ2Mi41aC00LjFjLTIuMSAwLTMuOCAxLjctMy44IDMuOFYyMWwyLjktLjd2LTUuNmMwLS42LjUtMS4yIDEuMi0xLjFoMTAuNmMuNiAwIDEuMi41IDEuMiAxLjF2MTUuNWMwIC42LS41IDEuMS0xLjIgMS4xSDIwLjdjLS42IDAtMS4yLS41LTEuMi0xLjF2LTQuM0wxNi42IDI3djMuNWMwIDIuMSAxLjcgMy44IDMuOCAzLjhoMTEuMWMyLjEgMCAzLjgtMS43IDMuOC0zLjh2LTE2YzAtMi4yLTEuNy0zLjktMy44LTMuOU0xMC4yIDMzLjFjMCAuNi41IDEuMSAxLjEgMS4xaC41Yy42IDAgMS4xLS41IDEuMS0xLjF2LTQuNWwtMi44IDEuMXYzLjRNNy43IDEzLjVIOWMuNiAwIDEuMS41IDEuMSAxLjF2Ny43bDIuOS0uN3YtNy4xYzAtLjYuNS0xLjEgMS4xLTEuMWgxLjFjLjEtMS4xLjYtMi4yIDEuNS0yLjloLTIuNmMtLjYgMC0xLjItLjUtMS4yLTEuMVY4LjJjMC0uNi0uNS0xLjItMS4yLTEuMmgtLjZjLS42IDAtMS4yLjUtMS4yIDEuMnYxLjNjMCAuNi0uNSAxLjItMS4yIDEuMWgtMWMtLjYgMC0xLjIuNS0xLjIgMS4ydi42Yy4xLjUuNiAxLjEgMS4yIDEuMScvPjxwYXRoIGNsYXNzPSdzdDAnIGQ9J00yMC41IDIxLjVMNi44IDI0LjljLS4xIDAtLjIgMC0uMy4xLTEuMi40LTEuOCAxLjUtMS40IDIuNi40IDEuMSAxLjYgMS43IDIuOCAxLjMuMSAwIC4yLS4xLjMtLjFsMTIuOC01LS41LTIuM3onLz48cGF0aCBjbGFzcz0nc3QwJyBkPSdNMzEuMSAyMS44YzAgMy0yLjQgNS40LTUuNCA1LjQtMyAuMS01LjUtMi4zLTUuNS01LjMtLjEtMyAyLjMtNS41IDUuMy01LjVoLjNjMi45IDAgNS4zIDIuNCA1LjMgNS40Jy8+PHBhdGggZD0nTTI4LjggMjEuOGMwIDEuNy0xLjQgMy0zIDMtMS43IDAtMy0xLjQtMy0zIDAtMS43IDEuNC0zIDMtM3MzIDEuNCAzIDMnIGZpbGwtcnVsZT0nZXZlbm9kZCcgY2xpcC1ydWxlPSdldmVub2RkJyBmaWxsPScjM2FiZGI5Jy8+PC9zdmc+) #fcda19 no-repeat 50% 50%/94% auto;

  --yauction-product-picker-card-min-width: 180px;
  --yauction-product-picker-close-bgc: transparent;
  --yauction-product-picker-hover: #e1e1e1;
  --yauction-product-picker-input-bgc: #efefef;
  --yauction-product-picker-input-color: #000;
  --yauction-product-picker-loader-color: #b0b9b1;
  --yauction-product-picker-text-selected: '已挑選';

  --yauction-product-picker-submit-bgc: #3abfba;
  --yauction-product-picker-submit-border-color: #3abfba;
  --yauction-product-picker-submit-text-color: #fff;
}

.wrap {
  /* color hex */
  --grey-hair: #f0f3f5;
  --bob: #b0b9b1;
  --dirty-seagull: #e0e4e9;
  --marshmallow: #f5f8fa;

  --header-height: 80px;
  --filter-bgc: #fefefe;
  --padding: 1em;
  --select-width: 130px;

  --input-padding: calc(var(--height) / 2 + var(--icon-size) + .5em);
  --submit-width: 120px;
}

.wrap{width:100%;height:100%;}
.wrap:focus{outline:0 none;}

.ypp-header{position:relative;height:80px;box-sizing:border-box;padding:1em;display:flex;justify-content:space-between;border-bottom:1px solid var(--dirty-seagull);}
.ypp-main{position:relative;width:100%;height:calc(100% - 80px);}
.ypp-main--noResult::after{position:absolute;left:0;top:0;content:'(>_<)';font-size:calc(50vmin - var(--header-height));color:var(--yauction-product-picker-hover);line-height:80vh;color:#dadce0;width:100%;height:100%;text-align:center;}
.header__h1{flex:0 0 var(--height);height:var(--height);border-radius:var(--height);background:var(--yauction-product-picker-logo);padding:0;font-size:0;}
.ypp__search{position:relative;flex-grow:1;margin:0 1.5em;padding:0 0 0 var(--input-padding);display:block;box-sizing:border-box;border:0 none;border-radius:var(--height);background:var(--yauction-product-picker-icon-search);background-color:var(--yauction-product-picker-input-bgc);transition:background-color 150ms ease;display:flex;overflow:hidden;}
.ypp__search::after{position:absolute;right:var(--select-width);top:15%;width:1px;height:calc(100% - 15% * 2);content:'';background-color:#c7cdd2;}
.ypp__input{width:calc(100% - var(--select-width));color:var(--yauction-product-picker-input-color);flex-grow:1;height:100%;border:0 none;background:transparent;display:block;}
.ypp__input:focus{outline:0 none;}
.ypp__search:focus-within{--yauction-product-picker-input-bgc:var(--yauction-product-picker-hover);}
.ypp__prevent-submit{display:none;}
.ypp__select{position:relative;width:var(--select-width);padding:0 1.25em 0 1em;box-sizing:border-box;color:var(--yauction-product-picker-input-color);line-height:var(--height);appearance:none;-webkit-appearance:none;border:0 none;background:var(--yauction-product-picker-icon-arrow-down);text-overflow:ellipsis;}
.ypp__select:focus{outline:0 none;}
.ypp__select:focus-within{background-color:#d2d2d2;}
.ypp__close{flex:0 0 var(--height);height:var(--height);border-radius:var(--height);background:var(--yauction-product-picker-icon-close);background-color:var(--yauction-product-picker-close-bgc);transition:background-color 150ms ease;}
.ypp__close:focus{outline:0 none;--yauction-product-picker-close-bgc:var(--yauction-product-picker-hover);}
.ypp__close:focus-visible{--yauction-product-picker-close-bgc:var(--yauction-product-picker-hover);}
.ypp__close:active{transform:scale(0.95);}

/* loader */
.ypp__loader{width:100%;padding:20px 0;display:none;}
.ypp__loader--active{display:block;}

/* powered by https://loading.io/css/ */
.lds-ripple{display:block;position:relative;width:80px;height:80px;margin:0 auto;}
.lds-ripple div{position:absolute;border:4px solid var(--yauction-product-picker-loader-color);opacity:1;border-radius:50%;animation:lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;}
.lds-ripple div:nth-child(2){animation-delay:-0.5s;}
@keyframes lds-ripple {
  0% {top:36px;left:36px;width:0;height:0;opacity:1;}
  100% {top:0px;left:0px;width:72px;height:72px;opacity:0;}
}

/* product */
.ypp__grid{position:relative;padding:2em;display:grid;gap:2em 1em;grid-template-columns:repeat(auto-fill, minmax(var(--yauction-product-picker-card-min-width),1fr));grid-auto-rows:auto;}
.ypp__grid__unit{position:relative;}
.ypp__grid__input{position:absolute;opacity:0;}
.ypp__grid__input:focus{outline:0 none;}
.ypp__grid__input:focus-visible~.ypp__product__cell{animation:product-focus 5.7s;}

.ypp__product__cell{border-radius:.5em;display:block;overflow:hidden;transition:transform 100ms ease;transform-origin:50% 100%;user-select:none;-webkit-user-select:none;}
.ypp__product__vision{--w:1;--h:1;}
.ypp__product__img{position:relative;width:100%;height:100%;display:block;object-fit:cover;}
.ypp__product__info{position:relative;padding:.75em;border-radius:0 0 .5em .5em;border:1px solid #f0f3f5;background-color:#fff;}
.ypp__product__title{font-size:.875em;height:36px;line-height:1.3;color:#232a31;}
.ypp__product__listprice{font-size:.875em;color:#ff333a;line-height:16px;vertical-align:middle;}
.ypp__product__marketprice{font-size:11px;color:#979ea8;line-height:16px;vertical-align:middle;text-decoration:line-through;}
.ypp__product__salecount{font-size:11px;color:#979ea8;line-height:16px;vertical-align:middle;}
.ypp__product__price__wrap{margin-top:6px;vertical-align: middle}
.ypp__product__marks{margin-top:6px;display:flex;}
.ypp__product__mark{--color:#ff8b12;--border-color:#ff8b12;--bgcolor:transparent;font-size:.75em;color:var(--color);background-color:var(--bgcolor);line-height:16px;height:16px;padding:0 4px;border-radius:2px;border:1px solid var(--border-color);white-space:nowrap;}
.ypp__product__mark:nth-of-type(n+2){margin-left:4px;}
.ypp__product__mark--buynow{--color:#0078ff;--border-color:#0078ff;}
.ypp__product__mark--bid{--color:#ff8a00;}
.ypp__product__mark--buynow--hilife{--color:#fff;--bgcolor:#ff8a00;--border-color:#ff8a00;}
.ypp__product__mark--coupon{--bgcolor:#ff8a00;--color:#ff8a00;}
.ypp__product__outofstock{}
.ypp__product__sign__outofstock{position:absolute;left:50%;top:50%;width:80px;height:80px;background:rgba(0, 0, 0, 0.4);margin-left:-40px;margin-top:-40px;border-radius:80px;font-size:0;}
.ypp__product__sign__outofstock::before {font-size:14px;line-height:5.714;color:#fff;width:100%;height:100%;content:'缺貨中';text-align:center;display:block;}
.ypp__product__sign__video{--mask-play:path('M5.726,2.22493802 C4.831,1.71893802 4,2.07593802 4,3.20193802 L4,20.789938 C4,21.780938 4.704,22.345938 5.726,21.767938 L21.261,12.972938 C22.211,12.435938 22.211,11.555938 21.261,11.018938 L5.726,2.22493802 Z');position:absolute;left:8px;bottom:8px;width:32px;height:32px;border-radius:30px;font-size:0;overflow:hidden;}
.ypp__product__sign__video::before{content:'';position:absolute;left:0;top:0;width:100%;height:100%;background:linear-gradient(87deg, #ffe762, #fcda19 67%, #fcda19);filter:opacity(0.65);}
.ypp__product__sign__video::after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;margin:auto;width:24px;height:24px;transform:scale(0.67);clip-path:var(--mask-play);background-color:#fff;}
.ypp__product__sign__metroexpress{font-size:12px;line-height:18px;height:18px;border-radius:2px;padding:0 4px 0 22px;position:absolute;left:6px;top:6px;color:#fff;background:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyB3aWR0aD0nMjAnIGhlaWdodD0nMjAnPjxkZWZzPjxwYXRoIGlkPSdhJyBkPSdNMy4zMzMgMi4zNDJIMTYuNjZ2MTQuNTQ0SDMuMzMzeicvPjwvZGVmcz48ZyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnPjxwYXRoIGZpbGw9JyNGRjRENTInIGZpbGwtcnVsZT0nbm9uemVybycgZD0nTTAgMGgyMHYyMEgweicvPjxwYXRoIGZpbGw9JyNGRkYnIGQ9J005Ljk5NyAxMi4zNTFjLS41NjcgMC0uOTk0LjQ2MS0uOTk0IDEuMDcybC4wMTMgNC40MDdjMCAuNTkyLjQzMSAxLjA1OC45OCAxLjA1OC41NSAwIC45ODItLjQ2Ni45ODItMS4wNThsLjAxMi00LjQwN2MwLS42MS0uNDI3LTEuMDcyLS45OTMtMS4wNzInLz48bWFzayBpZD0nYicgZmlsbD0nI2ZmZic+PHVzZSB4bGluazpocmVmPScjYScvPjwvbWFzaz48cGF0aCBmaWxsPScjRkZGJyBkPSdNOS41OTYgNi45NDVhMS44MDQgMS44MDQgMCAwMS0xLjEyNy0uODk3IDIuMDEzIDIuMDEzIDAgMDEtLjE1OC0uMzc4Yy0uMDExLS4wMzctLjAyMy0uMDc0LS4wMzItLjExMWEyLjAzIDIuMDMgMCAwMS0uMDY1LS40ODggMi4wNzUgMi4wNzUgMCAwMS4xMi0uNjc3Yy4wMTEtLjAzMy4wMjEtLjA2Ny4wMzQtLjEuMjc3LS42NzQuOS0xLjE0NiAxLjYyOS0xLjE0Ni43MjcgMCAxLjM1MS40NzIgMS42MjggMS4xNDYuMDEzLjAzMy4wMjMuMDY3LjAzNS4xYTIuMDExIDIuMDExIDAgMDEuMDg3LjMzNGMuMDE5LjExMi4wMzIuMjI2LjAzMi4zNDMgMCAuMTctLjAyNi4zMzEtLjA2NS40ODhhMS45OTggMS45OTggMCAwMS0uMTkuNDg5IDEuODA0IDEuODA0IDAgMDEtMS4xMjUuODk2aC0uODAzem0tLjc3MyAzLjE4OHYtLjc0N2wyLjM0My0uMDAxdi43NDZsLTIuMzQzLjAwMnptLS4wMDItMi4yNGwyLjM0My0uMDAyLjAwMS43NDctMi4zNDMuMDAxLS4wMDEtLjc0NnpNMTYuNjYgNS4xMnYtLjcxOWwtNC4zMjQtLjM2Yy0uMzc3LS45OTYtMS4yOC0xLjY5OS0yLjM0LTEuNjk5LTEuMDU4IDAtMS45NjIuNzAzLTIuMzM5IDEuN2wtNC4zMjQuMzZ2LjcxOGw0LjI2NS43NzdjLjExOS40LjMyLjc1NS41OCAxLjA0OWgtLjc1Yy0xLjMxNS4wMDItMi4zODcgMS4xNi0yLjM4NiAyLjU4bC0uMDg2IDEuMDItLjA2Ny43OTYtLjM3MSAzLjg5IDMuNzU3IDEuNjU0LS4wMDgtMy40NjNjMC0xLjA0NS43Ni0xLjg2NyAxLjczLTEuODY3Ljk2OCAwIDEuNzMuODIyIDEuNzMgMS44NjdsLS4wMDggMy40NjMgMy43OTgtMS42NTQtLjM4LTMuODktLjA2OC0uNzk1LS4wODktMS4wM2EyLjc4NCAyLjc4NCAwIDAwLS41MDEtMS41MzFjLS40NDQtLjYzMi0xLjE0LTEuMDQ0LTEuOTIzLTEuMDQ0aC0uNzM4Yy4yNi0uMjkzLjQ1OS0uNjQ3LjU3Ny0xLjA0NWw0LjI2NS0uNzc3eicgbWFzaz0ndXJsKCNiKScvPjwvZz48L3N2Zz4=) #ff4d52 no-repeat 4px -1px / auto 100%;z-index:1;pointer-events:none;}
.ypp_checkmark{--color:#fa3d38;position:absolute;right:.5em;bottom:.5em;width:80px;height:80px;border-radius:80px;box-sizing:border-box;border:4px solid var(--color);padding:4px;background:rgba(255,255,255,.5);transform:scale(2) rotate(18deg);opacity:0;pointer-events:none;transition:transform 150ms ease,opacity 150ms ease;}
.ypp_checkmark::before{width:100%;height:100%;border-radius:80px;content:'';display:block;border:3px solid var(--color);box-sizing:border-box;}
.ypp_checkmark::after{position:absolute;left:50%;top:50%;font-weight:500;font-size:1em;line-height:1.6;content:var(--yauction-product-picker-text-selected);color:var(--color);border-top:2px solid var(--color);border-bottom:2px solid var(--color);display:inline-block;transform:translate(-50%,-50%);white-space:nowrap;text-align:center;}

.ypp__grid__input:checked~label{transform:translate3d(0,0,0) translateY(-30px) rotate(-2deg);}
.ypp__grid__input:checked~label .ypp_checkmark{transform:scale(1) rotate(24deg);opacity:1;transition-delay:100ms;}
.ypp__grid--max-selected .ypp__grid__input:not(:checked)~label{pointer-events:none;}

/* dock */
.ypp__dock__wrap{position:absolute;left:50%;bottom:6px;max-width:96%;transform:translateX(-50%);pointer-events:none;z-index:5;}
.ypp__dock{height:66px;background:rgba(255,255,255,.6);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);border-radius:20px;box-shadow:inset 1px 1px rgba(255,255,255,.5),inset -1px -1px rgba(255,255,255,.5),0 0 0 1px rgba(0,0,0,.1),0 0 4px rgba(0,0,0,.2);box-sizing:border-box;display:flex;gap:2em;padding-right:.75em;transition:transform 300ms ease;transform:translateY(calc(100% + 6px + 22px));pointer-events:auto;}
.ypp__dock--active,.ypp__dock--permanent{transform:translateY(0%);}
.ypp__dock::after{position:absolute;top:10%;right:calc(.75em + var(--submit-width) + 2em / 2);content:'';width:1px;height:80%;background-color:var(--dirty-seagull);}
.ypp__dock::before{position:absolute;color:#fff;font-size:.875em;line-height:22px;text-align:center;content:attr(data-count);right:calc(.75em + var(--submit-width) - 6px + 2em / 2);top:-11px;width:22px;height:22px;border-radius:22px;background-color:#fa3d38;z-index:1;}

.ypp__selected__products{display:flex;gap:.5em;padding-top:.5em;overflow:hidden;overflow-x:auto;mask-image:linear-gradient(to right,transparent 0%,black .5em,black calc(100% - .5em),transparent 100%);-webkit-mask-image:linear-gradient(to right,transparent 0%,black .5em,black calc(100% - .5em),transparent 100%);}
.ypp__selected__products::before{content:'';flex:0 0 0px;}
.ypp__selected__products::after{content:'';flex:0 0 0px;}
.ypp__selected__product{position:relative;width:50px;height:50px;flex-shrink:0;transition:transform 250ms cubic-bezier(.68,-.55,.265,1.55),opacity 250ms cubic-bezier(.68,-.55,.265,1.55);transform:scale(.001);opacity:0;}
.ypp__selected__product--active{transform:scale(1);opacity:1;}
.ypp__selected__product img{position:relative;width:100%;height:100%;object-fit:cover;display:block;border-radius:.5em;overflow:hidden;}
.ypp__selected__product::after{position:absolute;left:-6px;top:-6px;width:18px;height:18px;content:'';border-radius:20px;background:var(--yauction-product-picker-icon-remove);transition:transform 200ms ease,opacity 200ms ease;transform:scale(.001);opacity:0;pointer-events:none;}
.ypp__selected__product__remove{position:absolute;left:-6px;top:-6px;width:0;height:0;display:block;pointer-events:none;}
.ypp__submit{--bgcolor:var(--yauction-product-picker-submit-bgc);--border-color:var(--yauction-product-picker-submit-border-color);--color:var(--yauction-product-picker-submit-text-color);text-decoration:none;text-align:center;align-self:center;}
.ypp__submit{width:var(--submit-width);flex-shrink:0;text-overflow:ellipsis;white-space:nowrap;}

.ypp__selected__product:focus{outline:0 none;}
.ypp__selected__product:focus-within{animation:jiggle 250ms infinite alternate;transform-origin:50% 10%;}
.ypp__selected__product:focus-within::after{transform:scale(1);opacity:1;}
.ypp__selected__product:focus-within .ypp__selected__product__remove{width:calc(100% + 6px);height:calc(100% + 6px);pointer-events:auto;}

:host(.ypp--active){width:100%;height:100%;display:block;}

/* animation */
@keyframes product-focus {
  0% {box-shadow:0 0 0 4px transparent;} 
  3% {box-shadow:0 0 0 4px #8cc4fb;}
  91% {box-shadow:0 0 0 4px #8cc4fb;}
  100% {box-shadow:0 0 0 4px transparent;}
}

@keyframes jiggle {
  0% {transform:rotate(-2deg);animation-timing-function:ease-in;}
  50% {transform:rotate(3deg);animation-timing-function:ease-out;}
}

/* supports */
@supports not selector(:focus-visible) {
  .ypp__grid__input:focus~.ypp__product__cell{animation:product-focus 5.7s;}
}

@media (hover: hover) {
  .ypp__search:hover{--yauction-product-picker-input-bgc:var(--yauction-product-picker-hover);}
  .ypp__close:hover{--yauction-product-picker-close-bgc:var(--yauction-product-picker-hover);}

  .ypp__submit:hover{font-weight:400;}
  .clickable:not(.clickable--disable, .clickable--process):hover::after{filter:opacity(20%);}
}
</style>

<div class="wrap" tabindex="0">
  <header class="ypp-header">
    <h1 class="header__h1 stuff">
      logo
    </h1>
    <form class="ypp__search">
      <input type="search" name="q" class="ypp__input" accesskey="/" autocomplete="off" placeholder="Search Products" aria-label="search products">
      <input type="text" class="ypp__prevent-submit" name="prevent-submit">
      <select class="ypp__select" name="category">
        <option disabled>Select Category</option>
      </select>
    </form>
    <a href="#close" class="ypp__close stuff" title="close" aria-label="close">close</a>
  </header>

  <div class="ypp-main overscrolling">
    <div class="ypp__grid">
    </div>
    <div class="ypp__loader">
      <div class="lds-ripple"><div></div><div></div></div>
    </div>
  </div>

  <div class="ypp__dock__wrap">
    <div class="ypp__dock" data-count="0">
      <div class="ypp__selected__products overscrolling-x">
      </div>
      <a href="#submit" class="ypp__submit clickable" data-size='medium'>
        <em class="clickable__content">Submit</em>
      </a>
    </div>
  </div>
</div>
`;

const templateProduct = document.createElement('template');
templateProduct.innerHTML = `
  {{#hits}}
  <div class="ypp__grid__unit">
    {{#selected}}
    <input
      class="ypp__grid__input"
      type="checkbox"
      id="product-{{id}}"
      autocomplete="off"
      value="{{id}}"
      data-thumbnail="{{img.src}}"
      checked
    />
    {{/selected}}

    {{^selected}}
    <input
      class="ypp__grid__input"
      type="checkbox"
      id="product-{{id}}"
      autocomplete="off"
      value="{{id}}"
      data-thumbnail="{{img.src}}"
    />
    {{/selected}}

    <label class="ypp__product__cell" for="product-{{id}}">
      <div class="ypp__product__vision aspect-ratio">
        <div class="content">
          <img
            src="{{img.src}}"
            srcset="{{img.srcset}}"
            alt="{{titleForLabel}}"
            loading="lazy"
            class="ypp__product__img"
            width="1"
            height="1"
          />
          {{^inStock}}
          <em class="ypp__product__sign__outofstock"></em>
          {{/inStock}}
          {{#urlForVideo}}
          <em class="ypp__product__sign__video">video</em>
          {{/urlForVideo}}
          {{#metroExpress}}
          <em class="ypp__product__sign__metroexpress">{{metroExpress}}</em>
          {{/metroExpress}}
        </div>
      </div>
      <div class="ypp__product__info">
        <p class="ypp__product__title line-clampin">
          {{title}}
        </p>
        <p class="ypp__product__price__wrap">
          <em class="ypp__product__listprice">{{listPrice}}</em>
          {{#marketPrice}}
          <em class="ypp__product__marketprice">{{marketPrice}}</em>
          {{/marketPrice}}
          {{#buyCount}}
          <em class="ypp__product__salecount">/ 售出 {{buyCount}} 件</em>
          {{/buyCount}}
        </p>
        <div class="ypp__product__marks">
          {{#marks.hilife}}
          <mark class="ypp__product__mark ypp__product__mark--buynow--hilife">萊爾富優惠</mark>
          {{/marks.hilife}}
          {{#marks.coupon}}
          <mark class="ypp__product__mark ypp__product__mark--coupon">折扣碼</mark>
          {{/marks.coupon}}
          {{#marks.buynow}}
          <mark class="ypp__product__mark ypp__product__mark--buynow">直購</mark>
          {{/marks.buynow}}
          {{#marks.bid}}
          <mark class="ypp__product__mark ypp__product__mark--bid">競標</mark>
          {{/marks.bid}}
        </div>
      </div>
      <div class="ypp_checkmark">
      </div>
    </label>
  </div>
  {{/hits}}
`;

const templateSelectedProduct = document.createElement('template');
templateSelectedProduct.innerHTML = `
  <div class="ypp__selected__product" tabindex="0">
    <img />
    <a class="ypp__selected__product__remove stuff">remove</a>
  </div>
`;

// Houdini Props and Vals
if (CSS?.registerProperty) {
  CSS.registerProperty({
    name: '--yauction-product-picker-remove-bgc',
    syntax: '<color>',
    inherits: true,
    initialValue: '#e1e1e1'
  });

  CSS.registerProperty({
    name: '--yauction-product-picker-card-min-width',
    syntax: '<length>',
    inherits: true,
    initialValue: '180px'
  });

  CSS.registerProperty({
    name: '--yauction-product-picker-close-bgc',
    syntax: '<color>',
    inherits: true,
    initialValue: 'transparent'
  });

  CSS.registerProperty({
    name: '--yauction-product-picker-hover',
    syntax: '<color>',
    inherits: true,
    initialValue: '#e1e1e1'
  });

  CSS.registerProperty({
    name: '--yauction-product-picker-input-bgc',
    syntax: '<color>',
    inherits: true,
    initialValue: '#efefef'
  });

  CSS.registerProperty({
    name: '--yauction-product-picker-input-color',
    syntax: '<color>',
    inherits: true,
    initialValue: '#000'
  });

  CSS.registerProperty({
    name: '--yauction-product-picker-loader-color',
    syntax: '<color>',
    inherits: true,
    initialValue: '#b0b9b1'
  });

  CSS.registerProperty({
    name: '--yauction-product-picker-submit-bgc',
    syntax: '<color>',
    inherits: true,
    initialValue: '#3abfba'
  });

  CSS.registerProperty({
    name: '--yauction-product-picker-submit-border-color',
    syntax: '<color>',
    inherits: true,
    initialValue: '#3abfba'
  });

  CSS.registerProperty({
    name: '--yauction-product-picker-submit-text-color',
    syntax: '<color>',
    inherits: true,
    initialValue: '#fff'
  });
}

export class YauctionProductPicker extends HTMLElement {
  #data;
  #nodes;
  #config;

  constructor(config) {
    super();

    // template
    this.attachShadow({ mode: 'open', delegatesFocus: true });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // data
    this.#data = {
      controller: '',
      io: '',
      disableCategoryFetch: true,
      inputId: '',
      uther: {
        totalCount: 0,
        offset: 0
      },
      selectedProducts: []
    };

    // nodes
    this.#nodes = {
      styleSheet: this.shadowRoot.querySelector('style'),
      input: this.shadowRoot.querySelector('.ypp__input'),
      select: this.shadowRoot.querySelector('.ypp__select'),
      btnClose: this.shadowRoot.querySelector('.ypp__close'),
      btnSubmit: this.shadowRoot.querySelector('.ypp__submit'),
      grid: this.shadowRoot.querySelector('.ypp__grid'),
      selected: this.shadowRoot.querySelector('.ypp__selected__products'),
      dock: this.shadowRoot.querySelector('.ypp__dock'),
      form: this.shadowRoot.querySelector('.ypp__search'),
      main: this.shadowRoot.querySelector('.ypp-main'),
      loader: this.shadowRoot.querySelector('.ypp__loader'),
      selectedProduct: {}
    };

    // config
    this.#config = {
      ...defaults,
      ...config // new YauctionProductPicker(config)
    };

    // evt
    this._onSelectChange = this._onSelectChange.bind(this);
    this._onInput = this._onInput.bind(this);
    this._onCardPick = this._onCardPick.bind(this);
    this._onTransitionend = this._onTransitionend.bind(this);
    this._onRemove = this._onRemove.bind(this);
    this._onIntersect = this._onIntersect.bind(this);
    this._onClose = this._onClose.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
  }

  async connectedCallback() {
    const { select, selected, input, grid, loader, btnClose, btnSubmit } = this.#nodes;
    
    const remoteconfig = this.getAttribute('remoteconfig');
    const script = this.querySelector('script');

    if (remoteconfig) {
      // fetch remote config once [remoteconfig] exist
      try {
        const configUrl = new URL(remoteconfig);
        const resConfig = await fetch(configUrl.toString(), {
          headers: {
            'content-type': 'application/json'
          },
          method: 'GET',
          mode: 'cors'
        })
        .then((response) => response.json())
        .catch(
          (err) => {
            console.warn(`${_wcl.classToTagName(this.constructor.name)}: ${err.message}`);
            return {};
          }
        );

        this.#config = {
          ...this.#config,
          ...resConfig
        };
      } catch(err) {
        console.warn(`${_wcl.classToTagName(this.constructor.name)}: ${err.message}`);
        this.remove();
        return;
      }
    } else if (script) {
      // apply inner script's config
      try {
        this.#config = {
          ...this.#config,
          ...JSON.parse(script.textContent.replace(/\n/g, '').trim())
        };
      } catch(err) {
        console.warn(`${_wcl.classToTagName(this.constructor.name)}: ${err.message}`);
        this.remove();
        return;
      }
    }

    Object.keys(defaults).forEach(
      (key) => {
        this._upgradeProperty(key);
      }
    , this);

    // categories
    this._genCategories();
    this.#data.disableCategoryFetch = false; // aviod fetch category when init

    // io
    this.#data.io = new IntersectionObserver(this._onIntersect);
    this.#data.io.observe(loader);

    // evt
    this.#data.controller = new AbortController();
    const signal = this.#data.controller.signal;
    select.addEventListener('change', this._onSelectChange, { signal });
    input.addEventListener('input', this._onInput, { signal });
    grid.addEventListener('change', this._onCardPick, { signal });
    selected.addEventListener('transitionend', this._onTransitionend, { signal });
    selected.addEventListener('click', this._onRemove, { signal });
    btnClose.addEventListener('click', this._onClose, { signal });
    btnSubmit.addEventListener('click', this._onSubmit, { signal });
    document.addEventListener('keydown', this._onKeyDown, { signal, capture: true });
  }

  disconnectedCallback() {
    const { io, controller } = this.#data;

    // io
    if (io) {
      io.unobserve(loader);
      io.disconnect();
    }

    // evts
    if (controller) {
      controller.abort();
    }
  }

  _format(attrName, oldValue, newValue) {
    const hasValue = newValue !== null;

    if (!hasValue) {
      this.#config[attrName] = defaults[attrName];
    } else {
      switch (attrName) {
        case 'categories':
        case 'l10n':
        case 'params':
          this.#config[attrName] = JSON.parse(newValue);
          break;
        case 'storeid':
          this.#config[attrName] = newValue;
          break;
        case 'maxcount': {
          const count = +newValue;
          this.#config[attrName] = (isNaN(count) || count <= 0) ? defaults.maxcount : count;
          break;
        }
      }
    }
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (!YauctionProductPicker.observedAttributes.includes(attrName)) {
      return;
    }

    this._format(attrName, oldValue, newValue);

    switch (attrName) {
      case 'storeid':
        if (this.#data.disableCategoryFetch) {
          return;
        }

        this._genCategories();
        break;
      case 'l10n':
        if (this.l10n.submit) {
          this.#nodes.btnSubmit.querySelector('.clickable__content').textContent = this.l10n.submit;
        }

        if (this.l10n.placeholder) {
          this.#nodes.input.placeholder = this.l10n.placeholder;
        }
        break;
    }
  }

  static get observedAttributes() {
    return Object.keys(defaults).filter(key => !['limit'].includes(key)); // YauctionProductPicker.observedAttributes
  }

  _upgradeProperty(prop) {
    let value;

    if (YauctionProductPicker.observedAttributes.includes(prop)) {
      if (Object.prototype.hasOwnProperty.call(this, prop)) {
        value = this[prop];
        delete this[prop];
      } else {
        if (this.hasAttribute(prop)) {
          value = this.getAttribute(prop);
        } else {
          value = objectAttrs.includes(prop) ? JSON.stringify(this.#config[prop]) : this.#config[prop];
        }
      }

      this[prop] = value;
    }
  }

  set storeid(value) {
    if (value) {
      return this.setAttribute('storeid', value);
    } else {
      return this.removeAttribute('storeid');
    }
  }

  get storeid() {
    return this.#config.storeid;
  }

  set maxcount(value) {
    if (value) {
      return this.setAttribute('maxcount', value);
    } else {
      return this.removeAttribute('maxcount');
    }
  }

  get maxcount() {
    return this.#config.maxcount;
  }

  set params(value) {
    if (value) {
      const newValue = {
        ...this.params,
        ...(typeof value === 'string' ? JSON.parse(value) : value)
      }
      return this.setAttribute('params', JSON.stringify(newValue));
    } else {
      return this.removeAttribute('params');
    }
  }

  get params() {
    return this.#config.params;
  }

  set l10n(value) {
    if (value) {
      const newValue = {
        ...this.l10n,
        ...(typeof value === 'string' ? JSON.parse(value) : value)
      }
      return this.setAttribute('l10n', JSON.stringify(newValue));
    } else {
      return this.removeAttribute('l10n');
    }
  }

  get l10n() {
    return this.#config.l10n;
  }

  get limit() {
    return this.#config.limit;
  }

  get active() {
    return this.classList.contains('ypp--active');
  }

  async _genCategories() {
    const { select } = this.#nodes;
    const { selectCategory, all } = this.l10n;
    const formData = this._prepareData(
      {
        extraParams: {
          offset: 0,
          hits: 1
        },
        excludeParams: [
          'q',
          'categoryId',
          'boothCategoryId',
          'productId',
        ]
      }
    );

    // fetch data
    const inStoreSearchUri = `${ws.inStoreSearch}?${new URLSearchParams(formData).toString()}`;
    const { boothInfo:{ isStore = 'false' } = {}, categoryListing = [] } = await fetch(inStoreSearchUri, {
      headers: {
        'content-type': 'application/json'
      },
      method: 'GET',
      mode: 'cors'
    }).then((response) => response.json());

    const categories = categoryListing.reduce(
      (acc, category) => {
        const { id, name } = category;
        
        acc.push({
          categoryId: id,
          name: he.decode(name).trim()
        });

        return acc;
      }
    ,
      [
        { name:selectCategory, categoryId:'-1', disabled:true },
        { name:all, categoryId:'', selected:true }
      ]
    );

    // DOM
    select.name = isStore === 'true' ? 'boothCategoryId' : 'categoryId';
    select.replaceChildren();
    categories.forEach(
      ({ categoryId, name, selected = false, disabled = false }) => {
        const option = document.createElement('option');
        option.value = categoryId;
        option.selected = selected;
        option.disabled = disabled;
        option.appendChild(document.createTextNode(he.decode(name).trim()));
        
        select.appendChild(option);
      }
    );
  }

  _prepareData({ extraParams = {}, excludeParams = [] }) {
    const { form } = this.#nodes;

    const formData = new FormData(form);
    const extra = {
      storeId: this.storeid,
      ...this.params,
      ...extraParams
    };
    Object.keys(extra).forEach(
      (key) => {
        formData.set(key, extra[key]);
      }
    );

    // filter
    const removes = [];
    for (let [key, value] of formData.entries()) {
      if (!value || excludeParams.includes(key)) {
        removes.push(key);
      }
    }
    removes.forEach(key => formData.delete(key));

    return formData;
  }

  _purify(str) {
    return he.decode(str).replace(/"|'/g, '');
  }

  _dollarFormat(input, sign) {
    const number = parseInt(input, 10);
    let s = typeof sign !== 'undefined' ? sign : '$';
    if (!Number.isInteger(number)) {
      return '';
    }

    return s + number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') // add ',' at every 3 digit
  }

  _utherUnitNormalizer(products = []) {
    const { selectedProducts } = this.#data;

    const hits = products.reduce(
      (acc, product) => {
        const {
          productId: id,
          title,
          marketPrice, // 原價
          currentPrice, // 優惠價
          biddingPrice = 0, // 競標：最高出價
          stockStatus,
          productImages = [],
          flags,
          metroExpressCity = '',
          salesVolume = 0,
          payTypes = []
        } = product;
        const type = flags.includes('NON_BIDDING') ? 'buynow' : 'bid';

        let img;
        if (!productImages.length) {
          img = {
            src: 'https://s.yimg.com/ma/auc/item/icon/item-no-image.svg',
            srcset: 'https://s.yimg.com/ma/auc/item/icon/item-no-image.svg 1x'
          };
        } else {
          const { large, small } = productImages[0];
          img = {
            src: small.url,
            srcset: `${small.url} 1x, ${large.url} 2x`
          };
        }

        let listPrice, originalPrice;
        if (type === 'bid') {
          listPrice = this._dollarFormat(biddingPrice, '$ ');
          originalPrice = '';
        } else {
          if (currentPrice) {
            listPrice = this._dollarFormat(currentPrice, '$ ');
            originalPrice = this._dollarFormat(marketPrice);
          } else {
            listPrice = this._dollarFormat(marketPrice, '$ ');
            originalPrice = '';
          }
        }

        acc.push(
          {
            id,
            title: he.decode(title),
            titleForLabel: this._purify(title),
            img,
            metroExpress: metroExpressCity,
            buyCount: +salesVolume,
            listPrice,
            marketPrice: originalPrice,
            type,
            inStock: stockStatus !== 'OUT_OF_STOCK',
            marks: {
              coupon: flags.includes('HAS_COUPON'),
              buynow: flags.includes('NON_BIDDING'),
              bid: flags.includes('IS_BIDDING'),
              ...(payTypes.includes('HI_LIFE') && { coupon: false, hilife: '萊爾富優惠' })
            },
            urlForVideo: flags.includes('HAS_VIDEO') ? 'HAS_VIDEO' : '',
            selected: selectedProducts.includes(id)
          }
        );

        return acc;
      }
    , []);

    return { hits };
  }

  _reset() {
    const { input, select, selected, dock, loader, grid, main } = this.#nodes;

    input.value = '';
    select.value = '';
    main.classList.remove('ypp-main--noResult');
    grid.classList.remove('ypp__grid--max-selected');
    dock.classList.remove('ypp__dock--active', 'ypp__dock--permanent');
    dock.dataset.count = 0;
    loader.classList.remove('ypp__loader--active');
    selected.replaceChildren();

    this.#data.selectedProducts = [];
    Object.keys(this.#nodes.selectedProduct).forEach(
      (key) => {
        this.#nodes.selectedProduct[key] = null;
      }
    );
  }

  async _genProducts({ reset = false } = {}) {
    const { grid, main, loader } = this.#nodes;
    
    if (reset) {
      this.#data.uther.offset = 0;
    } else {
      this.#data.uther.offset += this.limit;
    }

    const formData = this._prepareData(
      {
        extraParams: {
          offset: this.#data.uther.offset,
          hits: this.limit
        }
      }
    );

    // empty node
    if (this.#data.uther.offset === 0) {
      grid.replaceChildren();
    }
    loader.classList.remove('ypp__loader--active');

    const inStoreSearchUri = `${ws.inStoreSearch}?${new URLSearchParams(formData).toString()}`;
    const { totalCount = 0, products = [] } = await fetch(inStoreSearchUri, {
      headers: {
        'content-type': 'application/json'
      },
      method: 'GET',
      mode: 'cors'
    }).then((response) => response.json());
    this.#data.uther.totalCount = +totalCount;

    // uther
    const productsString = Mustache.render(templateProduct.innerHTML, this._utherUnitNormalizer(products));
    grid.insertAdjacentHTML('beforeend', productsString);

    // no result
    main.classList.toggle('ypp-main--noResult', this.#data.uther.totalCount === 0);

    // active loader or not
    loader.classList.toggle('ypp__loader--active', this.#data.uther.offset + this.limit < this.#data.uther.totalCount);
  }

  async show({ productIds = [], maxcount = this.maxcount } = {}) {
    /*
     * fetct selectedProducts
     * usage:
     * - $('yec-product-picker').show()
     * - $('yec-product-picker').show({ productIds:['101056169643', '101023641341', '101011522685', '101011512475', '101011506469'] });
     * - $('yec-product-picker').show({ maxcount:3 })
     */

    this._reset();

    // maxcount
    if (maxcount !== this.maxcount) {
      this.maxcount = +maxcount;
    }

    if (productIds.length) {
      const count = 12; // productListing API max limit is 12.
      const groups = productIds.reduce(
        (acc, cur, idx) => {
          const key = Math.floor(idx / count);
          const productId = cur.trim();
          
          if (typeof acc[key] == 'undefined') {
            acc[key] = [];
          }
          
          if (productId) {
            acc[key].push(productId);
          }
          
          return acc;
        }
      , []);

      const spaceId = this.params.spaceId || '';
      const res = await Promise.all(
        groups.map(
          (group) => {
            const formData = new FormData();
            formData.set('spaceId', spaceId);
            formData.set('productIds', group.join());

            const productListingUri = `${ws.productListing}?${new URLSearchParams(formData).toString()}`;
            
            return fetch(productListingUri, {
              headers: {
                'content-type': 'application/json'
              },
              method: 'GET',
              mode: 'cors'
            }).then((response) => response.json());
          }
        )
      );

      const final = res.reduce(
        (acc, { products = [] }) => {
          const { hits } = this._utherUnitNormalizer(products);
          hits.forEach(
            ({ id:productId, img, titleForLabel:alt }) => {
              acc.push({
                productId,
                thumbnail: img.src,
                alt,
                checked: true
              });
            }
          );

          return acc;
        }
      , []);

      final.slice(0, this.maxcount).forEach(
        (hit) => this._toggleSelectedProduct(hit)
      );

      this.#nodes.dock.classList.add('ypp__dock--permanent');
    }

    // fetch placeholder
    this._genProducts({ reset:true });

    // active
    this.classList.add('ypp--active');
  }

  close() {
    this.#nodes.btnClose.click();
  }

  _onSelectChange(evt) {
    this._genProducts({ reset:true });
  }

  _onInput(evt) {
    /*
     * clone "input-debounced", only fires when 300ms have passed after the value of the input has stopped changing
     * https://amp.dev/documentation/guides-and-tutorials/learn/amp-actions-and-events/
     */

    clearTimeout(this.#data.inputId);

    this.#data.inputId = setTimeout(
      () => this._genProducts({ reset:true })
    , 300); 
  }

  _onTransitionend(evt) {
    const selectedProduct = evt.target.closest('.ypp__selected__product');

    if (!selectedProduct.classList.contains('ypp__selected__product--active')) {
      selectedProduct.remove();
    }
  }

  _onRemove(evt) {
    const a = evt.target.closest('a');

    if (!a) {
      return;
    }

    evt.preventDefault();

    const productId = a.dataset.id;
    const productCard = this.#nodes.grid.querySelector(`label[for=product-${productId}]`);

    if (productCard) {
      productCard.click();
    } else {
      this._toggleSelectedProduct({
        productId,
        checked: false
      });
    }
  }

  _onIntersect(entries) {
    const { offset, totalCount } = this.#data.uther;
    const entry = entries.find(
      ({ isIntersecting }) => isIntersecting
    );

    if (entry && (offset + this.limit < totalCount)) {
      this._genProducts();
    }
  }

  _onKeyDown(evt) {
    const { key } = evt;
    
    switch (key) {
      case 'Escape':
        if (this.active) {
          this.#nodes.btnClose.click();
        }
        break;
    }
  }

  _toggleSelectedProduct({ productId, thumbnail = '', alt = '', checked }) {
    const { dock, selected, grid } = this.#nodes;

    if (checked) {
      if (!this.#data.selectedProducts.includes(productId)) {
        this.#data.selectedProducts.push(productId);

        if (!this.#nodes.selectedProduct[`product-${productId}`]) {
          const cloneNode = templateSelectedProduct.content.cloneNode(true);
          const selectedProduct = cloneNode.querySelector('.ypp__selected__product');
          const img = selectedProduct.querySelector('img');
          const a = selectedProduct.querySelector('a');

          img.src = thumbnail;
          img.alt = alt;
          a.dataset.id = productId;
          a.title = `remove product > ${alt}`;
          a.setAttribute('aria-label', `remove product > ${alt}`);

          selected.appendChild(selectedProduct);

          // show
          setTimeout(() => selectedProduct.classList.add('ypp__selected__product--active'), 50);

          this.#nodes.selectedProduct[`product-${productId}`] = selectedProduct;
        }
      }
    } else {
      if (this.#data.selectedProducts.includes(productId)) {
        this.#data.selectedProducts.splice(this.#data.selectedProducts.indexOf(productId), 1);
        
        if (this.#nodes.selectedProduct[`product-${productId}`]) {
          this.#nodes.selectedProduct[`product-${productId}`].classList.remove('ypp__selected__product--active');
          delete this.#nodes.selectedProduct[`product-${productId}`];
        }
      }
    }

    const currentSelectCount = this.#data.selectedProducts.length;

    // dock
    dock.dataset.count = currentSelectCount;
    dock.classList.toggle('ypp__dock--active', this.#data.selectedProducts.length > 0);

    // grid
    grid.classList.toggle('ypp__grid--max-selected', currentSelectCount >= this.maxcount);

    // fire event:slectedChange
    this._fireEvent(custumEvents.slectedChange, { selectedProducts: this.#data.selectedProducts });
  }

  _onCardPick(evt) {
    const { target } = evt;

    const unit = target.closest('.ypp__grid__unit');
    const productId = target.value;
    const thumbnail = target.dataset.thumbnail;
    const alt = unit.querySelector('img').alt;

    this._toggleSelectedProduct({
      productId,
      thumbnail,
      alt,
      checked: target.checked
    });
  }

  _onClose(evt) {
    evt.preventDefault();
    this.classList.remove('ypp--active');
    this._fireEvent(custumEvents.close);
  }

  _onSubmit(evt) {
    evt.preventDefault();
    this.classList.remove('ypp--active');
    this._fireEvent(custumEvents.submit, { selectedProducts: this.#data.selectedProducts });
  }

  _fireEvent(evtName, detail) {
    this.dispatchEvent(new CustomEvent(evtName,
      {
        bubbles: true,
        composed: true,
        ...(detail && { detail })
      }
    ));
  }
}

// define web component
const S = _wcl.supports();
const T = _wcl.classToTagName('YauctionProductPicker');
if (S.customElements && S.shadowDOM && S.template && !window.customElements.get(T)) {
  window.customElements.define(T, YauctionProductPicker);
}
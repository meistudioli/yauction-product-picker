# YAuction Product Picker

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/yauction-product-picker)


To display specific promotion module, users might like to pick products to list by themselves. That's why I design &lt;yauction-product-picker /> to fulfill this request. With &lt;yauction-product-picker />, users could search products by keyword &amp; category easily. Besides that, &lt;yauction-product-picker /> also provide property and method to switch seller role and setting. Infinite scroll feature has already built with it and user could browse product cells smoothly.


## Basic Usage

&lt;yauction-product-picker /&gt; is a web component. All we need to do is put the required script into your HTML document. Then follow <yauction-product-picker />'s html structure and everything will be all set.

- Required Script

```html
<script 
  type="module"
  src="https://your-domain/wc-yauction-product-picker.js"
</script>
```

- Structure

Put &lt;yauction-product-picker /&gt; into HTML document. It will have different functions and looks with attribute mutation.

```html
<yauction-product-picker>
  <script type="application/json">
    {
      "storeid": "Y0174493470", // store id
      "maxcount": 10, // max select count
      "l10n": {
        // localization
        "placeholder": "請輸入關鍵字搜尋商品",
        "selectCategory": "請選擇分類",
        "all": "全部商品",
        "submit": "確定選取"
      },
      "params": {
        // params which uther needs
        "spaceId": "2092115381",
        "sort": "launchedTime"
      }
    }
  </script>
</yauction-product-picker>
```

Otherwise, developers could also choose remoteconfig to fetch config for &lt;yauction-product-picker /&gt;.

```html
<yauction-product-picker
  remoteconfig="https://617751a89c328300175f58b7.mockapi.io/api/v1/yauctionProductPicker"
  ...
></yauction-product-picker>
```

## JavaScript Instantiation

&lt;yauction-product-picker /&gt; could also use JavaScript to create DOM element. Here comes some examples.

```html
<script type="module">
import { YauctionProductPicker } from 'https://your-domain/wc-yauction-product-picker.js';

//use DOM api
const nodeA = document.createElement('yauction-product-picker');
document.body.appendChild(nodeA);
nodeA.storid = '...';

// new instance with Class
const nodeB = new YauctionProductPicker();
document.body.appendChild(nodeB);
nodeB.storid = '...';

// new instance with Class & default config
const config = {
  storid: '...',
  ...
};
const nodeC = new YauctionProductPicker(config);
document.body.appendChild(nodeC);
</script>
```

## Style Customization

&lt;yauction-product-picker /&gt; uses CSS variables to hook some action elements' looks. That means developer could easy change it into the looks you like.

```html
<style>
yauction-product-picker {
  --yauction-product-picker-remove-bgc: #e1e1e1;
  --yauction-product-picker-icon-close: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIGhlaWdodD0nMjQnIHdpZHRoPScyNCc+PHBhdGggZD0nTTAgMGgyNHYyNEgweicgZmlsbD0nbm9uZScvPjxwYXRoIGZpbGw9JyMyODI4MjgnIGQ9J00xOSA2LjQxTDE3LjU5IDUgMTIgMTAuNTkgNi40MSA1IDUgNi40MSAxMC41OSAxMiA1IDE3LjU5IDYuNDEgMTkgMTIgMTMuNDEgMTcuNTkgMTkgMTkgMTcuNTkgMTMuNDEgMTJ6Jy8+PC9zdmc+) no-repeat 50% 50%/1.5em auto;
  --yauction-product-picker-icon-search: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIGhlaWdodD0nMjQnIHdpZHRoPScyNCc+PHBhdGggZD0nTTAgMGgyNHYyNEgweicgZmlsbD0nbm9uZScvPjxwYXRoIGZpbGw9JyMyODI4MjgnIGQ9J00xNS41IDE0aC0uNzlsLS4yOC0uMjdBNi40NzEgNi40NzEgMCAwMDE2IDkuNSA2LjUgNi41IDAgMTA5LjUgMTZjMS42MSAwIDMuMDktLjU5IDQuMjMtMS41N2wuMjcuMjh2Ljc5bDUgNC45OUwyMC40OSAxOWwtNC45OS01em0tNiAwQzcuMDEgMTQgNSAxMS45OSA1IDkuNVM3LjAxIDUgOS41IDUgMTQgNy4wMSAxNCA5LjUgMTEuOTkgMTQgOS41IDE0eicvPjwvc3ZnPg==) no-repeat calc(var(--height) / 2) 50%/var(--icon-size) auto;
  --yauction-product-picker-icon-arrow-down: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIGhlaWdodD0nMjQnIHdpZHRoPScyNCc+PHBhdGggZD0nTTAgMGgyNHYyNEgweicgZmlsbD0nbm9uZScvPjxwYXRoIGZpbGw9JyMyODI4MjgnIGQ9J003IDEwbDUgNSA1LTV6Jy8+PC9zdmc+) transparent no-repeat calc(100% - 1.25em + 14px) 50% /20px auto;
  --yauction-product-picker-icon-remove: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIGhlaWdodD0nMjQnIHdpZHRoPScyNCc+PHBhdGggZD0nTTAgMGgyNHYyNEgweicgZmlsbD0nbm9uZScvPjxwYXRoIGZpbGw9JyMxZDFjMWMnIGQ9J00xOSAxM0g1di0yaDE0djJ6Jy8+PC9zdmc+) var(--remove-bgc) no-repeat 50% 50% /80% auto;
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
</style>
```

## Attributes

&lt;yauction-product-picker /&gt; supports some attributes to let it become more convenience & useful.

- storeid

Set store id then user could browse its product listings. When storeid changed, &lt;yauction-product-picker /&gt; will auto fetch its `categories`.

```html
<yauction-product-picker
  storeid="Y0174493470"
  ...
></yauction-product-picker>
```

- maxcount

Set max select count. Once user reach this count they can not pick product cell anymore until unpick product. (default is `10`)

```html
<yauction-product-picker
  maxcount="10"
  ...
></yauction-product-picker>
```

- l10n

Set localization for UI display. It combines several keys that's why it accept JSON string only.

```html
<yauction-product-picker
  l10n='{"placeholder":"請輸入關鍵字搜尋商品","selectCategory":"請選擇分類","all":"全部商品","submit":"確定選取"}'
  ...
></yauction-product-picker>
```

- params

Set parameters for uther API fetch.(`spaceId` can not be null)

```html
<yauction-product-picker
  params='{"spaceId":"2092115381","sort":"launchedTime"}'
  ...
></yauction-product-picker>
```

## Methods

Here comes methods which &lt;yauction-product-picker /&gt; supported.

- show

Display &lt;yauction-product-picker />&gt;. This method accepts two parameter: productIds, maxcount. Both of them are optional.

```html
<script> 
const picker = document.querySelector('yauction-product-picker');
picker.show(
  {
    productIds: [
      '101056169643',
      '101023641341',
      '101011522685'
    ],
    maxcount: 20
  }
);
</script>
```

- close

Turn off &lt;yauction-product-picker /&gt;.

```html
<script> 
const picker = document.querySelector('yauction-product-picker');
picker.close();
</script>
```

## Properties

| Property Name | Type | Description |
| ----------- | ----------- | ----------- |
| storeid | String | Getter / Setter for store id. |
| maxcount | Number | Getter / Setter for max select count. |
| params | Object | Getter / Setter for parameters which fetch uther API should be attached. |
| l10n | Object | Getter / Setter localization for UI display. |
| active | Boolean | Getter for <yec-product-pick /> status. |
| limit | Number | Getter for fetch uther API parameter > limit. |

## Event

| Event Signature | Description |
| ----------- | ----------- |
| ypp-selected-change | Fired when <yauction-product-picker /> selected product change. |
| ypp-submit | Fired when user press <yauction-product-picker /> > submit button. Once user selected products, callBack function could gather these product ids through `event.detail.selectedProducts`. |
| ypp-close | Fired when user press <yauction-product-picker /> > close button. |

## Reference
- [&lt;yauction-product-picker /&gt;](https://blog.lalacube.com/mei/webComponent_yauction-product-picker.html)



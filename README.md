# fpa-sdk-js
FPA thirdparty sdk


## How to use
```javascript
const fpa = FPA.default.getInstance("<public-key>");
const result = await fpa.getUserToken("<OTID>");

result.authStatus
result.userToken?

```

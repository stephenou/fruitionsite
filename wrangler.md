### Wrangler Install

```
npm i @cloudflare/wrangler -g
```


### Setup wrangler.toml
Setup properly for your cloudflare environment
```
name = "fruitionsite"
type = "javascript"

account_id = "327bf887743064e5f494d98140f02f3d"
workers_dev = true
route = "fruitionsite.com/*"
zone_id = "70c07fd95414f54325a5d15b5b3467b8"
compatibility_date = "2022-12-11"
```


### Authorize Wrangler with your Cloudflare login
```
wrangler login 
```


### 🎉 Publish your Worker to Cloudflare
```
wrangler publish
```
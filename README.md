# Fruition: Free, Open Source Toolkit For Customizing Your Notion Pages

[fix database](https://github.com/stephenou/fruitionsite/pull/243)

[fix dark mode toggle]()

[]() 
Reduce Errors in Network Tab
(like this `POST https://exp.yaogl.moe/v1/rgstr net::ERR_CONNECTION_CLOSED`)

Add an A or CNAME record exp. that points to the domain for your notion site (can be properly documented), rewrite the hostname

```javascript
function rewriteHostName(hostname) {
  if (hostname.startsWith("exp.")) {
    return hostname.replace(MY_DOMAIN, 'notion.so');
  }

  return 'www.notion.so';
}
```


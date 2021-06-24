---
title: 2021 How to add Staticman to Jekyll Blog using Github App and Heroku
---


## Heroku Staticman Instance


https://spinningnumbers.org/a/staticman-heroku.html
https://travisdowns.github.io/blog/2020/02/05/now-with-comments.html

To verify:
https://api.staticman.net/v2/connect/ranaalisaeed/ranaalisaeed.github.io

reCaptcha
http://www.google.com/recaptcha/admin


https://www.google.com/recaptcha/admin/site/457942831


## Staticman App deployed on Heroku
Fork [staticman repository](https://github.com/eduardoboucas/staticman) into your Github account. 
Ensure you're on master branch, then hit the 'Deploy to Heroku' button.
Give the app a name, mine was 'alir-staticman-app' and hit deploy. It should succeed.

Test should fail:
https://alir-staticman-app.herokuapp.com/ will show **Application error**
`heroku logs --tail --app alir-staticman-app` will show `Error: Empty key given`

## Your website on Github Pages
For testing purposes, create a new public repository, call it sandbox-staticman.
Create a project site choosing a theme from https://pages.github.com/ and do the initial commit, leaving everything default.
The site should be up and running at https://ranaalisaeed.github.io/sandbox-staticman

## Github App
Create a GitHub App providing
- Homepage URL: https://staticman.net/
- Webhook URL: https://alir-staticman-app.heroku.com/v1/webhook
- Read & Write permissions for Contents and Pull Requests
- Subscribe to Pull Requests

Generate a private key, save the .pem file locally on your computer.
Note down the App ID.
Install the App on static site repository sandbox-staticman.

There is no need to hit the /connect route in Staticman v3 because we're using a GitHub App instead of a GitHub bot account here.

Test should fail:
https://alir-staticman-app.herokuapp.com/ 
`heroku logs --tail --app alir-staticman-app` will show `Error: Empty key given`

## Configure variables in Staticman App deployed on Heroku

```
heroku config:add --app alir-staticman-app "NODE_ENV=production"
heroku config:add --app alir-staticman-app "RSA_PRIVATE_KEY=$(cat ~/.ssh/staticman_key | tr -d '\n')"
heroku config:add --app alir-staticman-app "GITHUB_APP_ID=122884"
heroku config:add --app alir-staticman-app "GITHUB_PRIVATE_KEY=$(cat alir-github-app.2021-06-23.private-key.pem | tr -d '\n')"
```

## Add site configuration to static site repo
Add staticman.yml file to root of the static site repo sandbox-staticman.
Set `branch: "gh-pages"` inside staticman.yml.

After configuration heroku vars and staticman.yml, Test should pass:
https://alir-staticman-app.herokuapp.com/ will show **Hello from Staticman version 3.0.0!**
`heroku logs --tail --app alir-staticman-app` will show `Staticman API running on port 30831, State changed from starting to up`


this.server.get(
      '/v:version/auth/:service/:username/:repository/:branch/:property',
      this.bruteforce.prevent,
      this.requireApiVersion([2, 3]),
      this.requireService(['github', 'gitlab']),
      this.controllers.auth

https://alir-staticman-app.herokuapp.com/v3/auth/github/ranaalisaeed/sandbox-staticman/gh-pages/comments



```
heroku config:add --app alir-staticman-app "GITHUB_TOKEN=19cc0ed58035902614de2c8f2e505315f555a4b6"
```

```
heroku config --app staticman-instance
```






```
<pre>

	{% assign page_slug = page.slug | slugify: "ascii" %}
	page_slug: {{ page_slug | jsonify | escape }}
	<hr>
	{% assign comments2 = site.data.comments[page_slug] | where_exp: "item", "item.replying_to_uid == ''" %}
	comments2: {{ comments2 | jsonify | escape }}
	<hr>
	{% assign comments_by_date2 = comments2 | sort: 'date' | reverse %}
	comments_by_date2: {{ comments_by_date2 | jsonify | escape }}
	<hr>
	
	
	<!-- site: {{ site | jsonify | escape }} -->
	<!-- page: {{ page.slug | slugify: "ascii" | jsonify | escape }} -->
	<!-- layout: {{ layout | jsonify | escape }} -->
	<!-- content: {{ content | jsonify | escape }} -->
	<!-- paginator: {{ paginator | jsonify | escape }} -->
</pre>
```
---
title: 2021 How to add Staticman to Jekyll Blog using Github App and Heroku
---


## Heroku Staticman Instance

{% highlight bash %}
heroku config --app staticman-instance
8777  heroku config --app alir-staticman-instance
 8778  heroku config:add --app alir-staticman-instance "RSA_PRIVATE_KEY=$(cat ~/.ssh/staticman_key | tr -d '\n')"
 8779  heroku config --app alir-staticman-instance
 8780  heroku config:add --app alir-staticman-instance "GITHUB_APP_ID=122578"
 8781  heroku config --app alir-staticman-instance
 8782  heroku config:add --app alir-staticman-instance "GITHUB_PRIVATE_KEY=$(cat 190425-jekyll-site/alir-staticman-app.2021-06-21.private-key.pem | tr -d '\n')"
 8783  heroku config --app alir-staticman-instance
 8784  heroku config:add --app alir-staticman-instance "GITHUB_TOKEN=19cc0ed58035902614de2c8f2e505315f555a4b6"
 8785  heroku config --app alir-staticman-instance 
{% endhighlight%}


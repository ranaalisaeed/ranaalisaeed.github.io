# ranaalisaeed.github.io

My personal site using Jekyll, GitHub Pages and Netlify.

## Development

### Pre-requisites

Ensure Rbenv, Ruby 2.7.4 and Bundler are already installed.
For ubuntu, follow this: https://www.digitalocean.com/community/tutorials/how-to-install-ruby-on-rails-with-rbenv-on-ubuntu-20-04

### Local server

```bash
# Local server including drafts
bundle exec jekyll serve --config _config.yml,_config_dev.yml --open-url --drafts
# Local server excluding drafts
bundle exec jekyll serve --config _config.yml,_config_dev.yml --open-url
```

[![Netlify Status](https://api.netlify.com/api/v1/badges/3611d981-a92f-4983-987c-468139fd3fb0/deploy-status)](https://app.netlify.com/sites/ranaalisaeed/deploys)

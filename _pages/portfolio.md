---
layout: page
title: Portfolio
permalink: /:basename
---

<div class="portfolio-page-wrapper">
  <div class="projects">
    {% for project in site.projects %}
      <div class="project">
        <h2 class="project__title">
          <a href="{{ project.url | absolute_url }}">{{ project.name }}</a>
        </h2>
        <p>{{ project.summary }}</p>
      </div>
    {% endfor %}
  </div>
</div>

<!-- Please come back later or [send me a note]({% link _pages/contact.md %})  -->

---
layout: page
title: Blog
permalink: /:basename
---

<div class='blog-page-wrapper'>
	<div class="posts">
		{% for post in site.posts %}
		<div class="post">
			<h2 class="post-title">
				<a href="{{ post.url | absolute_url }}">
					{{ post.title }}
				</a>
			</h2>
			<span class="post-excerpt">{{ post.excerpt }}</span>
    	<span class="post-date">{{ post.date | date_to_string }}</span>
    </div>
    {% endfor %}
  </div>
</div>

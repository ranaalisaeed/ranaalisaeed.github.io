---
layout: page
title: Blog
permalink: /:basename
---

<div class='blog-page-wrapper'>
  <div class="topic-filter">
    <h3>Topics</h3>
    <ul class="topic-list">
      <li><a href="{% link _pages/blog.md %}" class="topic-link" id="all-topics">All</a></li>
      {% assign topics = site.posts | map: "topics" | compact | uniq | sort %}
      {% for topic in topics %}
        {% assign topic_slug = topic | slugify %}
        <li><a href="{% link _pages/blog.md %}?topic={{ topic_slug }}" class="topic-link" data-topic="{{ topic_slug }}">{{ topic | capitalize | replace: '-', ' ' }}</a></li>
      {% endfor %}
    </ul>
  </div>
  
  <div class="posts">
    {% for post in site.posts %}
    <div class="post" data-topics="{% for topic in post.topics %}{{ topic | slugify }} {% endfor %}">
      <h2 class="post-title">
        <a href="{{ post.url | absolute_url }}">
          {{ post.title }}
        </a>
      </h2>
      {%if post.topics %}
      <div class="post-topics">
        {% for topic in post.topics %}
          <span class="post-topic">{{ topic | capitalize | replace: '-', ' ' }}</span>
        {% endfor %}
      </div>
      {% endif %}
      <span class="post-excerpt">{{ post.excerpt }}</span>
      <span class="post-date">{{ post.date | date_to_string }}</span>
    </div>
    {% endfor %}
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const topicParam = urlParams.get('topic');
  
  // If there's a topic filter in the URL
  if (topicParam) {
    const posts = document.querySelectorAll('.post');
    const topicLinks = document.querySelectorAll('.topic-link');
    
    // Highlight the current topic filter
    topicLinks.forEach(link => {
      if (link.dataset.topic === topicParam) {
        link.classList.add('active');
      }
    });
    
    // Show only posts with the selected topic
    posts.forEach(post => {
      const postTopics = post.dataset.topics.split(' ');
      if (!postTopics.includes(topicParam)) {
        post.style.display = 'none';
      }
    });
  } else {
    // If no topic parameter, the "All" link should be active
    document.getElementById('all-topics').classList.add('active');
  }
});
</script>

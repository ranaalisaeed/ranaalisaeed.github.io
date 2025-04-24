---
layout: page
title: Thank You
permalink: /thank-you/
---

<div class="thank-you-container" style="text-align: center; padding: 2rem 0;">
  <script>
      // Check if the URL has the submitted parameter
      const urlParams = new URLSearchParams(window.location.search);
      const submitted = urlParams.get('submitted');      
      // If not submitted via form, redirect to home
      if (submitted !== 'true') {
        window.location.href = '{{ site.url }}';
      }
  </script>


  <h1>Message Received!</h1>
  
  <p>Thank you for reaching out. I've received your message and will get back to you as soon as possible.</p>
  
  <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin: 2rem auto; display: block; color: #85144b;">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>

  <div class="navigation-links" style="margin-top: 2rem;">
    <p>While you wait, you might be interested in:</p>
    <div style="margin: 1rem 0;">
      <a href="{% link _pages/portfolio.md %}" class="form-button">View Portfolio</a>
      <a href="{% link _pages/blog.md %}" class="form-button">Read Blog</a>
    </div>
    <a href="{{ site.url }}" style="display: inline-block; margin-top: 1rem;">Return to Homepage</a>
  </div>
</div>

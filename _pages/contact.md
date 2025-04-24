---
layout: page
title: Contact
permalink: /:basename
---

I'd love to get in touch!
<br />
<br />
You can send me an <a href="mailto:alirana@engineer.com">Email</a>, connect on <a href="https://www.linkedin.com/in/ranaalisaeed/">LinkedIn</a> or fill our the form below :-)
<br />
<br />

<div class="contact-page-wrapper">

<form action="https://formspree.io/f/manowqgw" method="POST" aria-label="Contact Form">
  <div class="form-group">
    <label for="name">Your name:</label>
    <input id="name" name="name" type="text" required autofocus aria-required="true">
  </div>

  <div class="form-group">
    <label for="email">Your email:</label>
    <input id="email" name="_replyto" type="email" required aria-required="true">
  </div>

  <div class="form-group">
    <label for="message">Your message:</label>
    <textarea id="message" name="message" required aria-required="true"></textarea>
  </div>

  <!-- Hidden fields remain the same -->
  <input type="hidden" name="_subject" value="New message from your site">
  <input type="hidden" name="_next" value="{{ site.url }}/thank-you/?submitted=true">
  
  <button class="form-button" type="submit">Send Message</button>
</form>

</div>

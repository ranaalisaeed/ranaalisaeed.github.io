---
layout: page
title: Contact
permalink: /:basename
---

I'd love to get in touch!
<br />
<br />
<br />

<div class="contact-page-wrapper">
	<!-- <form netlify action="/contact/confirmation"> -->
	<form name="contact" method="POST" data-netlify="true">
		<fieldset>
			<section>
				<label for="name">Name
					<input autofocus type="text" name="name" id="name">
				</label>
			</section>

    		<section>
    			<label for="email">Email
    				<input required type="email" name="email" id="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$">
    			</label>
    		</section>

    		<section>
    			<label for="message">Message
    				<textarea required name="message" id="message"></textarea>
    			</label>
    		</section>

    		<section>
    			<div data-netlify-recaptcha></div>
    		</section>

    		<!-- <input class="form-button" type="submit" value="Send Message"> -->
			<button class="form-button" type="submit">Send Message</button>
    	</fieldset>
    </form>

</div>

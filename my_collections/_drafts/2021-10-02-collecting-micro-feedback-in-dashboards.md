---
title: The case of micro feedback in learning analytics dashboards
image_serve_path: /public/images/micro-feedback
---

I've worked on many learning analytics dashboards for users in higher education, especially university teachers.

A frequent challenge with dashboards is how to collect relevant feedback from users.

## Feedback

Feedback is either quantitative or quantitative. Qualitative feedback is generally through user interviews and quantitative feedback through web traffic monitors, such as Google Analytics.

Good feedback is essential to understand and improve data insights.

## The problem

I make the case here that qualitative feedback through user interviews is very limited. Interviews usually take places long after the actual experience. When interviewed, users tend to provide feedback reflecting (looking back) at an experience that isn't fresh in minds. It's usually long after the actual experience.

When dashboards have many charts and insights, and data is updated regularly, is there a better way to collect feedback that captures the essence of timeliness and usefulness of data, as it helps users in their day-to-day practices?

## Micro feedback

I propose a micro feedback collector, as a way to collect in-situ feedback against any chart. It's strategically placed at the bottom of the chart container, so it doesn't distract users from the content. It's also conveniently located at the place of action.

![Micro feedback placed under a chart]({{page.image_serve_path}}/micro-feedback_IMAGE.png)
{:class="img-responsive"}

If the user finds a chart helpful, they can provide their feedback through a quick form:

![Micro feedback journey for YES]({{page.image_serve_path}}/micro-feedback_YES.gif)
{:class="img-responsive"}

If they don't find a chart helpful, they can follow a similar journey. Notice how the question prompt adapts to 'No' input:

![Micro feedback journey for NO]({{page.image_serve_path}}/micro-feedback_NO.gif)
{:class="img-responsive"}

User experience flow for micro feedback:

![Micro feedback flow]({{page.image_serve_path}}/micro-feedback_FLOW.svg)
{:class="img-responsive"}

## Further considerations

When we collect feedback his way, it is relevant to a specific chart for which the user provided the feedback. When there are several charts in the dashboard, what data model do we need at the back-end to collect scalable feedback? The date and time of such feedback might also be important to record in the back-end.

Another consideration is related to 'feedback fatigue'. Will users find it overwhelming to have these prompts available at so many places? Is there a more subtle way to do this? Users might need to be educated to ensure they understand this feedback is optional.

I'm interested to try this out with users and hear any thoughts from readers.

## Attribution

In designing the micro feedback form, I've taken inspiration from feedback forms provided at the end of Apple support articles. See an example [here](https://support.apple.com/en-au/HT202039).

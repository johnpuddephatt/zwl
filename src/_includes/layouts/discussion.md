---
layout: /layouts/base.njk
---

<div class="container">

  ## {{ title | safe }}

  {{ content | safe }}

  {% for section in sections %}
  ### {{ section.title | safe}}
  {{ section.description | safe}}
  <div
    data-is-remark-embed
    data-remark-host="http://165.22.117.109"
    data-remark-site-id="remark"
    data-remark-post-url="{{ page.url }}?{{ section.title | slug }}"
    data-remark-theme="dark" >
  </div>
  {% endfor %}

  <script>
    var remark_config = {}
  </script>
  <script src="http://165.22.117.109/web/embed.js"></script>

  ---

  [View all discussions](/discussions/)

</div>

# Chattering

> A chat widget made with Socket.IO and Bootstrap 4.

Do you ever had a project, a page (no matter in wich language) that it's perfect, but it would be more perfect if you added to it some chatting system?

Well, this is an intent to solve your problems.

This widget, let you include a simple chat on a pre-built site, without the needing of do huge alterations/implementations on your main site. It, also uses 

![Demo](images/demo.gif)

# Installation

## Backend

This proyect, for simplicity and thing, don't use a database, so, the messages aren't persitent, just they are on the fly.

Copy the `chatter.js` (on `client` folder) to your master web site.

Add a reference to the proyect

```html
<script type="text/javascript" src="/path/to/chatter.js"></script>
<div id="chat"></div>

<script type="text/javascript">
   var chat = new chatter({
      id : "chat",
      room : "default",
      user : "myname",
      sess : {
			// To create a persistent connection using as id
			// the value of the specified cookie
			method : "cookie",
			name :   "ci-session"
		}
   });
</script>
```
# Chattering.io

> A chat widget made with Socket.IO and Bootstrap 4.

Do you ever had a project, a page (no matter in wich language) that it's perfect, but it would be more perfect if you added to it some chatting system?

Well, this is an intent to solve your problems.

This widget, let you include a simple chat on a pre-built site, without the needing of do huge alterations/implementations on your main site. It, also uses Bootstrap (with just little modifications) to fit the color scheme and design of your site. So, it would look like if it's part of it.

![Demo](images/demo.gif)

# Requirements

On **backend**

- NodeJS (~8.11.3)

On **frontend**

- JQuery (!3.3.1)

- Bootstrap 4

# Installation

## Backend

> Remember to do any modification to the `config.json` that you need, before running it.

This proyect, for simplicity and thing, don't use a database, so, the messages aren't persitent, just they are on the fly. You can modify the code and get a database implementation with no much effort.

```
git clone https://github.com/thblckjkr/chattering.io.git

npm update

node server.js OR npm start
```

## Including it on the site

Copy the `chatter.js` (on `client` folder) to your master web site.

Add a reference to the proyect

```html
<!-- Include the socket.io framework -->
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.slim.js"></script>
<script type="text/javascript" src="/path/to/chattering.io.js"></script>
<div id="chat"></div>

<script type="text/javascript">
   var chat = new chattering({
      url : "http://localhost:3000/" // Your chat, as is accesible to the navigator
      id : "chat",
      room : "default",
      user : "myname",
      sess : {
         // To create a persistent connection using as id
         // the value of the specified cookie
         method : "cookie",
         name :   "ci-session" // This uses the codeigniter hash
      }
   });
</script>
```

That's everything you'll need. Now, go and modify anything you need.
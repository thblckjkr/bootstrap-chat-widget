var chattering = function(options){ // Controller
   this.socket;

   this.init  = function(){
      var that = this;
      // Check if necessary options were provided
      if(
         typeof options.url === "undefined"  || typeof options.id === "undefined" ||
         typeof options.room === "undefined" || typeof options.sess  === "undefined"
      )
         throw new Error("Missing necessary information on options");

      this.url = options.url;
      this.room = options.room; this.user = options.user;
      this.sess = options.sess;

      // Disabled for test pourposes
      // this.socket = io(this.url + "chat");
      
      this.UI = new chatteringUI({
         divid: options.id,
         room: options.room,
         user: options.user
      });

      this.UI.generate();
   }

   this.rooms = function(){
      this.socket.on('connect', function () {
         
      });
   }

   this.chat = function(){
      var that = this;
      this.socket.on('connect', function(){
         that.socket.emit( 'join', {
            user: that.user,
            room: that.room
         });

         // Server sends a new message
         that.socket.on('chat', function (msg) {
            var $message = $("<div></div>").html(msg.msg);
            that.UI.addMessage($message, msg.room, msg.user)
         });

         // Server sends a new photo
         that.socket.on('chat image', function (msg) {
            var $message = $("<div></div>").append($('<img>',{
               src: msg.img,
               class:'message-image' // TODO
            }));
            that.UI.addMessage($message, msg.room, msg.user)
         });
      });
   }

   this.init(); // Automatically init from inside scope
   // this.chat(); //Enable chat functionality
}

var chatteringUI = function(opt){ // Views
   this.divid = opt.divid;

   this.generate = function(){
      that = this;

      // Generate a UI to chat
      let $temp = $( '<div></div>' )
         .attr("id", this.divid + 'UI')
         .addClass("chatteringMain bg-white border col-md-3 p-0 fixed-bottom h-75")
         .css({ right: "1rem", left: "initial" });

      // Convert the given id, into a floating button, and append as a silbing the main chat form
      $('#' + this.divid)
         .addClass("chatteringOpen btn btn-secondary btn-lg rounded-circle position-fixed")
         .append('<i class="fa fa-fw fa-comments" style="line-height:2"></i>')
         .css({ right : "20px", bottom: "20px" })
         .parent().append( $temp );

      $('#' + that.divid + 'UI')
         .append( that.createUI() );
      
      $('#' +  that.divid)
         .on("click", function(){
            $('#' + that.divid + 'UI').css({ display : "block" });
         });
   },

   this.createUI = function(){
      var that = this;
      // Here, we've create all the inner content for the chat
      let $head = $('<div></div>');
      let $body = $('<div></div>');
      let $footer = $('<div></div>');

      let $closer = $('<div></div>')
         .attr({id: that.divid + "Closer"})
         .addClass("btn btn-outline-danger btn-sm rounded-0")
         .append('<i class="fa fa-times"></i>')
         .on("click", function(){
            $('#' + that.divid + 'UI').css({ display : "none" });
         });

      let $info = $('<div></div>')
         .addClass("bg-secondary text-white flex-fill p-1")
         .text("With who are we talking?");

      $head
         .addClass("d-flex flex-row justify-content-end clearfix")
         .append($info)
         .append($closer);

      let $chatter = $('<div></div>')
         .attr({id: that.divid + "Chat"})
         .addClass("clearfix p-1")
         .append("Messages");
         
      $body
         .append($chatter);
      

      let $senderfield = $('<input></input>')
         .addClass("form-control")
         .attr({ placeholder: "Type a message", type: "text", id: that.divid + "MsgBox" });

      let $senderbutton = $('<div></div>')
         .addClass("btn btn-secondary btn-sm rounded-circle")
         .append('<i class="fa fa-fw fa-paper-plane" style="line-height:2"></i>')
         .css({ right : "20px", bottom: "20px" });
         

      $footer
         .addClass("d-inline-flex justify-content-end clearfix fixed-bottom position-absolute pb-1")
         .append($senderfield)
         .append($senderbutton);

      var $div = $('<div></div>')
         .addClass("h-100")
         .append($head)
         .append($body)
         .append($footer);

      return $div;
   }

   this.addMesssage = function( msg, room, user ){
      var that = this;
      $chat = $('#' + that.divid + "Chat")

      $chat.append($msg);
      
   }
}
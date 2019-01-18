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
         .addClass("chatteringMain bg-primary col-md-3 fixed-bottom h-75")
         .css({ right: "1rem", left: "initial" });

      // Convert the given id, into a floating button, and append as a silbing the main chat form
      $('#' + this.divid)
         .addClass("chatteringOpen btn btn-secondary btn-lg rounded-circle position-fixed")
         .append('<i class="fa fa-fw fa-comments" style="line-height:2"></i>')
         .css({ right : "20px", bottom: "20px" })
         .parent().append( $temp );

      $('#' + that.divid + 'UI')
         .append( that.gChat() );
   },

   this.gChat = function(){
      var that = this;
      // Here, we've create all the inner content for the chat
      let closer = $('<div></div>')
         .attr({id: that.divid + "Closer"})
         .addClass("fa fa-times")
         .text("close")
         .on("click", function(){
            $('#' + that.divid + 'UI').css({ display : "none" });
         });
      
      var $div = $('<div></div>').append(closer) ;
      return $div;
   }

   this.addMesssage = function(){
      
   }
}
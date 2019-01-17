var chattering = function(options){ // Controller
   this.socket;

   this.init  = function(){
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
      // this.socket = io(this.url, { transports: ['websocket'] });

      this.UI = new chatteringUI({
         divid: options.id,
         room: options.room,
         user: options.user
      });
      this.UI.generate();
   }

   this.sockets = function(){
      this.socket.on('connect', function () {

      });
   }

   this.chat = function(){
      var that = this;
      // Server sends a new message
      socket.on('chat', function (msg) {
         var $message = $("<div></div>").html(msg.msg);
         this.UI.addMessage($message, msg.room, msg.user)
      });

      // Server sends a new photo
      socket.on('chat image', function (msg) {
         var $message = $("<div></div>").append($('<img>',{
            src: msg.img,
            class:'message-image' // TODO
         }));
         that.UI.addMessage($message, msg.room, msg.user)
      });
   }

   this.init(); // Automatically init from inside scope
}

var chatteringUI = function(opt){ // Views
   this.divid = opt.divid;

   this.generate = function(){
      let temp = $( '<div></div>' )
         .attr("id", '#' + this.divid + 'UI')
         .addClass("chatteringMain")

      $('#' + this.divid)
         .addClass("chatteringOpen btn btn-secondary btn-lg rounded-circle position-fixed")
         .append('<i class="fa fa-fw fa-comments" style="line-height:2"></i>')
         .css({ right : "20px", bottom: "20px" })
         .parent().append( temp );
   },

   this.addMesssage = function(){
      
   }
}
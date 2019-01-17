var chattering = function(options){
   this.socket;
   this.url;
   this.divid;

   this.init  = function(){
      // Check if necessary options were provided
      if(typeof options.url === "undefined")
         throw new Error("The URL was not defined");

      this.url = options.url;

      this.helpers.addMesssage();

      // Disabled for test pourposes
      // this.socket = io(this.url, { transports: ['websocket'] });

      id = "chat",
      room = "default",
      user = "myname",
      sess = {
         // To create a persistent connection using as id
         // the value of the specified cookie
         method : "cookie",
         name : "ci-session" // This uses the codeigniter hash
      }
   }

   this.helpers = {
      addMesssage : function(){
         alert("working")
      }
   }

   this.init();
}
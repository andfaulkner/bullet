#Bullet

Bullet is an ultra lightweight and simple to use pub-sub library, with AMD/module support and an intuitive API.
It was built to facilitate a simple and consistent system of communication across web applications and includes only the bare essentials typically needed to achieve this.

###Usage
Firstly, grab either the [minified](https://raw.githubusercontent.com/munkychop/bullet/master/dist/bullet.min.js), or [non-minified](https://raw.githubusercontent.com/munkychop/bullet/master/src/js/libs/bullet.js) source from Github, or install via Bower using the following command in your command prompt:

    bower install bullet

###Include Bullet in your application

    <script type="application/javascript" src="path/to/bullet.min.js"></script>
    
###API

####**.on()**
    Bullet.on("someMessageName", callback);

Register a callback function to get called whenever the specified message is triggered.

**Example usage:**
    
    function helloCallback () {
        console.log("hello there :)");
    }
    
    
    // Register the 'helloCallback' function to be called whenever the 'hello' message is triggered:
    
    Bullet.on("hello", helloCallback);
    

    // Somewhere later in the application...
    
    
    // Trigger the 'hello' message – Bullet will call the 'helloCallback' function:
    
    Bullet.trigger("hello");
    

----------

####**.off()**
    Bullet.off("someMessageName"[, callback]);

Remove either all callback functions or a specific callback function registered against the specified message.

**Example usage:**
    
    function helloCallback () {
        console.log("hello there :)");
    }
    
    function anotherCallback () {
        console.log("hello again :)");
    }
    
    
    Bullet.on("hello", helloCallback);
    Bullet.on("hello", anotherCallback);
    
    
    // Somewhere later in the application...
    
    
    // Trigger the 'hello' message – Bullet will call both the 'helloCallback' and 'anotherCallback' functions:
    
    Bullet.trigger("hello");
    
    
    // Remove all callback functions associated with the 'hello' message:
    Bullet.off("hello");
    
    // Attempt to trigger the 'hello' message again – Bullet won't call any functions:
    Bullet.trigger("hello");
    

**Example usage removing a specific callback:**
    
    function helloCallback () {
        console.log("hello there :)");
    }
    
    function anotherCallback () {
        console.log("hello again :)");
    }
    
    
    Bullet.on("hello", helloCallback);
    Bullet.on("hello", anotherCallback);
    
    
    // Somewhere later in the application...
    
    
    // Trigger the 'hello' message – Bullet will call both the 'helloCallback' and 'anotherCallback' functions:
    
    Bullet.trigger("hello");
    
    
    // Remove only the 'anotherCallback' function associated with the 'hello' message:
    Bullet.off("hello", anotherCallback);
    
    // Trigger the 'hello' message again – Bullet will only call the 'helloCallback' function:
    Bullet.trigger("hello");


----------


    
####**.once()**
    Bullet.once("someMessageName", callback);

This function behaves in the same way as the the **'on'** function, except that – once registered – the callback function will only be called a single time when the specified message is triggered.

**Example usage:**
    
    function helloCallback () {
        console.log("hello there :)");
    }
    
    
    // Register the 'helloCallback' function to be called whenever the 'hello' message is triggered:
    
    Bullet.once("hello", helloCallback);
    

    // Somewhere later in the application...
    
    
    // Trigger the 'hello' message – Bullet will call the 'helloCallback' function:
    
    Bullet.trigger("hello");
    
    
    // Attempt to trigger the 'hello' message again – Bullet won't call any functions this time:
    
    Bullet.trigger("hello");
    

----------


####**.trigger()**
    Bullet.trigger("someMessageName"[, data]);

This function will call all callback functions registered against the specified message, optionally passing in custom data as a payload.

**Example usage:**
    
    function helloCallback () {
        console.log("hello there :)");
    }
    
    
    // Register the 'helloCallback' function to be called whenever the 'hello' message is triggered:
    
    Bullet.on("hello", helloCallback);
    

    // Somewhere later in the application...
    
    
    // Trigger the 'hello' message – Bullet will call the 'helloCallback' function:
    
    Bullet.trigger("hello");
    

**Example usage with custom data:**
    
    function userAddedCallback (data) {
        console.log(data);
    }
    
    
    // Register the 'userAddedCallback' function to be called whenever the 'user-added' message is triggered:
    
    Bullet.on("user-added", userAddedCallback);
    
    
    // Somewhere later in the application...
    
    
    // Create some custom data:
    
    var customData = {
        someProp : "bro",
        someOtherProp : "awesome!"
    };
    
    
    // Trigger the 'user-added' message – Bullet will call the 'helloCallback' function and
    // pass in the custom data that you created, which will be sent to the function as a parameter:
    
    Bullet.trigger("user-added", customData);

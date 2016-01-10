terminal.js
===========

An extensible pseudo-terminal for your website (or whatever you do in the browser)

## What's this?
Terminal.js is a Javascript terminal emulation for use in the browser.
And it's available as a web component, too.

I have a [live demo here](http://avgp.github.io/terminal.js) and the component version of the demo can be found [here](http://avgp.github.io/component/index.html)

You can do a bunch of things with it:

- Create a CLI-style API interface that runs in the browser
- Create a remote terminal emulator for something that exposes an interface in a browser-consumable way (CORS, Websocket, WebRTC, ...)
- Create a text-based adventure game in the browser
- whatever you can come up with, where a command line interface is useful.

## How do I use it?
It's really easy:

1. You include the ``terminal.css`` and ``terminal.js`` files and have a container element (e.g. a div) with a child element holding a contenteditable element of class ``input`` and another span with the actual prompt line you wanna display.
2. You create an object with methods that will be your commands (see below for the details of how this works)
3. Call terminal.init and pass the container element and your commands object - **Ready to roll!**

Here's a minimal example:

```html
  <div id="myterminal">
    <p>
      <span>$> </span>
      <span contenteditable="true" class="input"></span>
    </p>    
  </div>
  <script src="terminal.js"></script>
  <script>
    var commands = {
      hi: function() {
        return '<p>Hi there!</p>'
      }
    }
    
    Terminal.init(document.getElementById("myterminal"), commands)
  </script>
```

## Extensible command interface

The terminal is only a way to interact with "commands" and "commands" are a bundles of functionality.  
So to use the terminal, you'll need to create a bunch of functions that actually do something - and that's not hard.

### A greeting command
So let's build a command that greets the user with the name she enters, like this:

```bash
$ hello Alice
Hi there, Alice
```

in Terminal.js this is done by creating a ``commands`` object and add a "hello" method to it.  
That method will take one parameter, which will be the array of arguments (separated by spaces) entered to call the command and returns HTML to be displayed in the terminal.

```javascript
var commands = {
  hello: function(args) {
    if(args.length < 2) return "<div>Please tell me your name like this: <pre>hello Alice</pre></div>";
    return "<div>Hi there, " + args[1] + "</div>";
  }
};
```

Note that the ``args`` array's first element is the name of the command itself.

Now we can make our terminal (I left parts of the HTML out, see ``index.html`` for a full example):

```html
<div id="terminal">
  <p>
    <span>$ </span>
    <span contenteditable="true" class="input"></span>
  </p>
</div>
<script>
var commands = {
  hello: function(args) {
    if(args.length < 2) return "<div>Please tell me your name like this: <pre>hello Alice</pre></div>";
    return "<div>Hi there, " + args[1] + "</div>";
  }
};

terminal.init(document.getElementById("terminal"), commands);
</script>
```
and we're done. We have a terminal that can greet the user :)

### A full example
The code for the [live demo](http://avgp.github.io/terminal.js) lives in index.html and another example is at [my website](http://www.geekonaut.de/terminal.html) and [its github repository](https://github.com/avgp/avgp.github.com) in ``console.html`` and ``javascripts/terminal.js``.

# License
MIT License - basically: Do whatever you feel like, but don't sue me when it blows up.

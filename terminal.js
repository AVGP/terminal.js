var terminal = (function() {
    var history = (localStorage.getItem("history") ? localStorage.getItem("history").split(",") : []),
        historyIndex = history.length;
        self = {};

    var KEY_UP   = 38,
        KEY_DOWN = 40;

    // Auxiliary functions

    var resetPrompt = function(terminal, prompt) {
        var newPrompt = prompt.parentNode.cloneNode(true);
        prompt.setAttribute("contenteditable", false);        
        terminal.appendChild(newPrompt);
        newPrompt.querySelector(".input").innerHTML = " ";
        newPrompt.querySelector(".input").focus();        
    };

    var runCommand = function(terminal, cmd, args) {
        terminal.innerHTML += (self.commands[cmd](args));        
    };

    var updateHistory = function(cmd) {
        history.push(cmd);
        localStorage.setItem("history", history);
        historyIndex = history.length;
    };

    var browseHistory = function(prompt, direction) {
        if(direction == KEY_UP && historyIndex > 0) {
            prompt.textContent = history[--historyIndex];
        } else if(direction == KEY_DOWN) {
            if(historyIndex < history.length) ++historyIndex;
            if(historyIndex < history.length) prompt.textContent = history[historyIndex];
            else prompt.textContent = " ";
        }
    };

    // Terminal functions

    self.init = function(elem, commands) {
        self.commands = commands;
    
        elem.addEventListener("keyup", function(event) {
            if(historyIndex < 0) return;
            
            browseHistory(event.target, event.keyCode);
        });
        
        elem.addEventListener("keypress", function(event) {
            var prompt = event.target;
            if(event.keyCode != 13) return false;
            
            updateHistory(prompt.textContent); 
            
            var input = prompt.textContent.split(" ");
            if(input[0] && input[0] in commands) {
                runCommand(elem, input[0], input);
            }

            resetPrompt(elem, prompt);
            event.preventDefault();
        });
        
        elem.querySelector(".input").focus();
    };
    
    return self;
})();

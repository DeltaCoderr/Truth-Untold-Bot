let commands = { 
 addcmd: { 
 command(target, room, user) { 
 let target2 = target.split('|'); 
 Storage.addCmd(room, target2[1], target2[0], target2[2]);
this.say('Command added');
 }, 
devOnly: true,
 help: 'adds a command, Syntax : ``&addcmd name|code|exts``'
 },
 
 
 delcmd: { 
 command(target, room, user) { 
 Storage.delCmd(target);
 this.say("Command deleted");
 }, 
devOnly:true,
 help: 'deletes a command, Syntax : ``&delcmd name``'
 },
 }; 
 
 exports.commands = commands;

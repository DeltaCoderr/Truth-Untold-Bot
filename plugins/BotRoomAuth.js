/**
 * Bot Room Auth
 * Cassius - https://github.com/sirDonovan/Cassius
 *
 * Manages the Bot Room Auth system for the bot
 *
 * @author Pokem9n
 * @license MIT license
 */

class Rank {
  constructor(user, rank, roomid){
    this.user = user;
    this.rank = rank;
    this.room = roomid;
    let database = Storage.getDatabase(roomid);
	if (!database.auth) database.auth = {};
    this.auths =  database.auth;
  }
  
  promote(user, rank, roomid, room){
        if(!Storage.databases[roomid]) Storage.databases[roomid] = {};
     let database = Storage.getDatabase(roomid);
	if (!database.auth) database.auth = {};
    database.auth[user.id] = rank.trim();
    room.say(user.name + " was promoted to " + rank);
    Storage.exportDatabase(room.id);
    
  }
   demote(user,roomid, room, rank){
     let database = Storage.getDatabase(roomid);
	if (!database.auth) return;
     if(!database.auth[user.id]) return room.say("This user doesnt have a bot rank")
     if(rank){
    room.say(user.name + " was demoted to " + rank );
       
     } else{
     database.auth[user.id] = '';
    room.say(user.name + " was demoted" );
         delete database.auth[user.id];
 
    Storage.exportDatabase(room.id);
     }
  }
  
  transfer(from,to,roomid, room){
     let database = Storage.getDatabase(roomid);
	if (!database.auth) return;
     if(!database.auth[from.id]) return room.say("This user doesnt have a bot rank");
    database.auth[to.id] = database.auth[from.id];
    database.auth[from.id] = '';
    room.say(from.name + "'s bot rank was successfully transfered to " + to.name);
    Storage.exportDatabase(room.id);
    
  }
  
  
  
  
}
let ranks =  new Rank();

let commands = {
  promote: { command(target, room, user){
    var myArray = target.split(',');
    var p1 =  myArray[0].toLowerCase();
    var p2 = myArray[1].toLowerCase();
     if(!user.isDeveloper() && !user.hasBotRank(room, '#')) return this.say("Access denied.");
    if(!Users.add(p1)) return this.say("That user is offline and cannot be promoted")
    ranks.promote(Users.get(p1), p2,room.id, room);
    
  },
            help: 'promotes an user to given rank, Syntax : ``&promote [user], [rank]``',
           },
  
    demote: { command(target, room, user){
      if(!user.isDeveloper() && !user.hasBotRank(room, '#')) return this.say("Access denied.");
      var myArray = target.split(',');
      if(myArray.length >= 2){
         var p1 =  myArray[0].toLowerCase();
    var p2 = myArray[1].toLowerCase();
         
        ranks.demote(Users.add(p1),p2,room.id, room);
        return;
      }
    ranks.demote(Users.add(target),room.id, room);
    
  },
     help: 'demotes an user to given rank, Syntax : ``&demote [user]`` OR ``&demote [user],[rank]``'       
            },
  
  transfer: { command(target, room, user){
    if(!user.isDeveloper() && !user.hasBotRank(room, '#')) return this.say("Access denied.");
    var myArray = target.split(',');
    var p1 =  myArray[0].toLowerCase();
    var p2 = myArray[1].toLowerCase();
    ranks.transfer(Users.add(p1), Users.add(p2), room.id, room);
    
  },
     help: 'transfers rank of two users, Syntax : ``&transfer [user1],[user2]``'       
            },
  

  botauth: { command(target, room, user){
    if(!user.isDeveloper() && !user.hasBotRank(room, '+')) return;
    let ranks = Storage.databases[room.id].auth;
    var arr = Object.entries(ranks);
    var i = 0;
    var auths = "<center><div style='border:2px solid black;'><b> Bot Room Auth </b><br>";
    for(i = 0;i < arr.length;i++){
      auths += "<br>" + arr[i];
      
    }
    this.say("/adduhtml test," + auths + "</div></center>");
  },},
  
    
    //DRIVER COMMANDS
      m: 'mute',
  mute: { command(target, room, user) {
if(!user.isDeveloper() && !user.hasBotRank(room, '%')) return;
    if(target.toLowerCase() == 'truthuntold') return;
    this.say("/mute " + target);
  },},
  
  hm: 'hourmute',
   hourmute: { command(target, room, user) {
 if(!user.isDeveloper() && !user.hasBotRank(room, '%')) return; 
     this.say("/hourmute " + target);
     
  },},
  
  
  um: 'unmute',
  unmute: { command(target, room, user) {
  if(!user.isDeveloper() && !user.hasBotRank(room, '%')) return; 
    this.say("/unmute " + target);
  },},
  
   tour: { command(target, room, user){
      if(!user.isDeveloper() && !user.hasBotRank(room, '%')) return;
     this.say("/tour create " + target +",elimination");
     
   },},
  
   tourstart: { command(target, room, user){
     if(!user.isDeveloper() && !user.hasBotRank(room, '%')) return;
     this.say("/tour start");
    
   },},
  
   tourautodq: { command(target, room, user){
      if(!user.isDeveloper() && !user.hasBotRank(room, '%')) return;
     this.say("/tour autodq " + target);
   },},
  
     tourend: { command(target, room, user){
             if(!user.isDeveloper() && !user.hasBotRank(room, '%')) return;
       this.say("/tour end");
    
     },},
  
  
   uno: { command(target, room, user){
    if(!user.isDeveloper() && !user.hasBotRank(room, '@')) return;
     this.say("/uno " + target);
   },},
  
  
  
  
  wall: 'announce',
  announce: { command(target, room, user) {
  if(!user.isDeveloper() && !user.hasBotRank(room, '@')) return;
    this.say("/wall " + target);
  
  },},
  
  declare: { command(target, room, user) {
    if(!user.isDeveloper() && !user.hasBotRank(room, '@')) return;
    this.say("/declare " + target);
  },},
  
   poll: { command(target, room, user){
      if(!user.isDeveloper() && !user.hasBotRank(room, '%')) return;
     this.say("/poll " + target);
   },},
  
    ban: { command(target, room, user){
      if(!user.isDeveloper() && !user.hasBotRank(room, '@')) return;
     this.say("/ban " + target);
   },},
  
     unban: { command(target, room, user){
             if(!user.isDeveloper() && !user.hasBotRank(room, '@')) return;
       this.say("/unban " + target);
    
     },},
  
  
};

exports.commands = commands;

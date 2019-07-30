/**
*********************************
*********************************
**      leaderboard plugin          **
**      author - Pokem9n            **
**                                                 **
*********************************
**********************************/

class Lb {    
  constructor(){
    this.output = '';
    this.data = {};
  }
  
sortLb(leaderboardRoom,lb) {
const database = Storage.getDatabase(leaderboardRoom.id);
  let leaderboard =  lb;
  
            if (!database.leaderboards[leaderboard])
                return leaderboardRoom.say("There is no leaderboard for the " + leaderboardRoom.id + " room.");
            let users = Object.keys(database.leaderboards[leaderboard]);
            let startPosition = 0;
            let source;
            let annual = false;
  
            if (startPosition) {
                if (startPosition > users.length)
                    startPosition = users.length;
                startPosition -= 10;
                if (startPosition < 0)
                    startPosition = 0;
            }
            const pointsCache = {};
            
                for (let i = 0; i < users.length; i++) {
                    pointsCache[users[i]] = database.leaderboards[leaderboard][users[i]].pts;
                
            }
            users = users.filter(x => pointsCache[x] !== 0).sort((a, b) => pointsCache[b] - pointsCache[a]);
            if (!users.length)
                return leaderboardRoom.say("The " + leaderboardRoom.id + " leaderboard is empty.");
            const output = {};
  const data = {};
            let positions = 0;
            for (let i = startPosition; i < users.length; i++) {
                if (!users[i])
                    break;
                const points = pointsCache[users[i]] || database.leaderboards[leaderboard][users[i]].pts;
                const position = '' + (i + 1);
              output['pos' + i] = {};
              console.log('pos' + i);
              output['pos' + i].name = database.leaderboards[leaderboard][users[i]].name;
              console.log(JSON.stringify(output));
                  output['pos' + i].pts = points;
              let userid = database.leaderboards[leaderboard][users[i]].name;
              this.data[userid] = {rank: 0};
              this.data[userid].rank = i + 1;
                positions++;
               // if (positions >= 10)
              //      break;
            }
            let endPosition = startPosition + 10;
            if (endPosition > users.length)
                endPosition = users.length;

this.output = output;
 // this.data = data;
           // this.say("``" + (annual ? "Annual " : "") + (source ? source.name + " " : "") + "Top " + endPosition + " of " + users.length + "``: " + output.join(", "));
        }
  
  getRank(user,lb,room){
    this.sortLb(room,lb);
    if(!(user.id in this.data)) return room.say('User not found on the ' + lb + ' leaderboard');
    return room.say(user.name + "'s rank is " + this.data[user.id].rank + ' on the ' + lb + ' leaderboard');
  }
  
  createLb(name,room,data){
    if(!room.id in Storage.databases) Storage.databases[room.id] = {};
    let database = Storage.databases[room.id];
    if(!database.leaderboards) database.leaderboards = {};
    database.leaderboards[name] = {};
  let db = database.leaderboards[name];
    if(typeof data == 'object'){
      let keys = Object.keys(data);
      let values = Object.values(data);
      for(let i = 0; i <= keys.length;i++){
        db[keys[i]] = {};
        db[keys[i]].pts = values[i];
        let name = Users.add(keys[i]).name;
       if(Users.get(keys[i]).name) name =  Users.get(keys[i]).name;
       
        db[keys[i]].name = name;
      }
      Storage.exportDatabase(room.id);
    }
    Storage.exportDatabase(room.id);
  //  room.say(JSON.stringify(database.leaderboards[name]));
  }
  
  addPts(pts,lb,room,user,reason){
     let database = Storage.databases[room.id];
    if(!database.leaderboards) database.leaderboards = {};
    if(!database.leaderboards[lb]) this.createLb(lb,room);
    if(!database.leaderboards[lb][user.id]) database.leaderboards[lb][user.id] = {name: [user.name],pts: 0};
    database.leaderboards[lb][user.id].pts += pts;
    Storage.exportDatabase(room.id);
  }
  
  remPts(pts,lb,room,user,reason){
     let database = Storage.databases[room.id];
    if(!database.leaderboards) database.leaderboards = {};
    if(!database.leaderboards[lb]) this.createLb(lb,room);
    if(!database.leaderboards[lb][user.id]) database.leaderboards[lb][user.id] = {name: [user.name],pts: 0};
    if(database.leaderboards[lb][user.id].pts !== 0) database.leaderboards[lb][user.id].pts -= pts;
    Storage.exportDatabase(room.id);
  }
  
  transPts(pts,lb,room,from,to){
     let database = Storage.databases[room.id];
    if(!database.leaderboards) database.leaderboards = {};
    if(!database.leaderboards[lb]) this.createLb(lb,room);
    if(!database.leaderboards[lb][from.id] || database.leaderboards[lb][from.id].pts <= 0) return room.say('You dont have enough pts');
     if(!database.leaderboards[lb][to.id]) database.leaderboards[lb][to.id] = {name: to.name,pts: 0};
    database.leaderboards[lb][to.id].pts += pts;
     database.leaderboards[lb][from.id].pts -= pts;
    Storage.exportDatabase(room.id);
    room.say('done');
  }
  
  isLb(name,room){
    if(!Storage.databases[room.id].leaderboards) return room.say("There are no leaderboards for this room");
    if(Storage.databases[room.id].leaderboards[name]) return true;
    return false
  }
  
  
  getTable(lb,room){
    this.sortLb(room,lb)
    let table = [];
    let keys = Object.keys(this.output);
    let output = this.output;
    for(let i = 0;i < keys.length - 1;i++){
      const position = '' + (i + 1);
      if (position.endsWith('1') && !position.endsWith('11')) {
					table.push(position + "st: " + this.output['pos' + i].name + " (" + this.output['pos' + i].pts + ")" );
				} else  if (position.endsWith('2')) {
					table.push(position + "nd: " + this.output['pos' + i].name + " (" + this.output['pos' + i].pts + ")" );
				} else if (position.endsWith('3')) {
					table.push(position + "rd: " + this.output['pos' + i].name + " (" + this.output['pos' + i].pts + ")" );
				} else  {
					table.push(position + "th: " + this.output['pos' + i].name + " (" + this.output['pos' + i].pts + ")" );
        }
     
    }
         room.say('/adduhtml test,' + "<center><div style='background:black;max-height: 180px ; overflow-y: auto ; color: #fff ; text-shadow: 1px 0 0 #000 , 0 -1px 0 #000 , 0 1px 0 #000 , -1px 0 0 #000'><table border='1' bgcolor='purple' width='250' style='border-collapse: collapse ; border: 1px solid #6688aa ; background-color: rgba(40 , 40 , 60 , 1) ; border-radius: 10px' > <tr><td bgcolor='#ffd700' >" + table.join('</td></tr><tr><td>') + "</td></tr></table></div></center>",true);

  }
  
  
}    

//let lb = new Lb();
global.lb = new Lb();
exports.commands = {
  testlb: {
    command(target, room, user){
    eval(target);
    }
  },
  ladder: {
    command(target, room, user){
      if(!lb.isLb(target.toLowerCase(),room)) return this.say("There is no leaderboard with that name");
      
      lb.getTable(target.toLowerCase(),room);
    },
    help: 'Syntax : ``.ladder [name]``',
    perms: '+',
    chatOnly: true
  },
  
  givepts: {
  command(target, room, user){
  let targets = target.toLowerCase().split(',');
  let user,pts;
 touser = Users.get(Tools.toId(targets[1]));
  pts = targets[0];
  let lb = targets[2];
  if(!lb.isLb(lb,room)) return this.say('leaderboard not found');
  lb.addpts(pts,lb,room,touser);
  },
  help: 'Syntax : ``.givepts [points],[user],[leaderboard name]``',
  devOnly: true
  }
  
   
  
};
exports.Lb = new Lb();


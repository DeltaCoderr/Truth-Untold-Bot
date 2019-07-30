/**
 * Users
 * Cassius - https://github.com/sirDonovan/Cassius
 *
 * This file tracks information about users.
 *
 * @lcense MIT license
 */

'use strict';

const PRUNE_INTERVAL = 60 * 60 * 1000;

class User {
	/**
	 * @param {string} name
	 * @param {string} id
	 */
	constructor(name, id) {
		this.name = Tools.toName(name);
		this.id = id;
    this.status = null;
    this.avatar = null;
		/**@type {Map<Room, string>} */
		this.rooms = new Map();
		/**@type {Map<Room, {messages: Array<{time: number, message: string}>, points: number, lastAction: number}>} */
		this.roomData = new Map();
		/**@type {?Game} */
		this.game = null;
 //   this.level = true;
 //   if(Config.bannedLevel.includes(this.id)) this.level = false;
    this.globalrank = null;
	}

	/**
	 * @param {Room | string} room
	 * @param {string} targetRank
	 * @return {boolean}
	 */
	hasRank(room, targetRank) {
    if(room.id === this.id){
      let userid = Tools.toId(this);
      userid = userid.split('');
      if(userid[0] === '+') return true;
      return false;
    }
    else{
		if (!Config.groups) return false;
		let rank;
		if (typeof room === 'string') {
			rank = room;
		} else {
			rank = this.rooms.get(room);
		}
		if (!rank) return false;
		return Config.groups[rank] >= Config.groups[targetRank];
	}
  }

    hasBotRank(room, targetRank){
 if(this.isDeveloper()) return true;
    if(!Storage.databases[room.id].auth) return false;
   let rank =  Storage.databases[room.id].auth[this.id]
    if(Config.groups[rank] >= Config.groups[targetRank]) return true;
    return false;
  }
  
  
	/**
	 * @return {boolean}
	 */
	isDeveloper() {
		return Config.developers && Config.developers.indexOf(this.id) !== -1;
	}

	/**
	 * @param {string} message
	 */
	say(message) {
		message = Tools.normalizeMessage(message);
		if (!message) return;
		Client.send('|/pm ' + this.id + ', ' + message);
	}
}

exports.User = User;

class Users {
	constructor() {
		this.users = {};
		this.self = this.add(Config.username);
		this.pruneUsersInterval = setInterval(() => this.pruneUsers(), PRUNE_INTERVAL);

		this.User = User;
	}

	/**
	 * @param {User | string} name
	 * @return {User}
	 */
	get(name) {
		if (name instanceof User) return name;
		return this.users[Tools.toId(name)];
	}

	/**
	 * @param {string} name
	 * @return {User}
	 */
	add(name) {
		let id = Tools.toId(name);
		let user = this.get(id);
		if (!user) {
			user = new User(name, id);
			this.users[id] = user;
		}
		return user;
	}

	pruneUsers() {
		let users = Object.keys(this.users);
		users.splice(users.indexOf(this.self.id), 1);
		for (let i = 0, len = users.length; i < len; i++) {
			let user = this.users[users[i]];
			if (!user.rooms.size) {
				delete this.users[user.id];
			}
		}
	}
  
   remove(user) {
        if (user !== this.self)
            delete this.users[user.id];
    }
  
    rename(name, oldId) {
        if (!(oldId in this.users))
            return this.add(name);
        const user = this.users[oldId];
        this.remove(user);
        const id = Tools.toId(name);
        if (id in this.users)
            return this.users[id];
        user.name = name;
        user.id = id;
        this.users[id] = user;
        user.rooms.forEach((value, room) => {
            if (room.game)
                room.game.renamePlayer(user, oldId);
            if (room.tournament)
                room.tournament.renamePlayer(user, oldId);
        });
        return user;
    }
  

	destroyUsers() {
		for (let i in this.users) {
			delete this.users[i];
		}
	}
}

exports.Users = new Users();

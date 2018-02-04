"use strict";
let ta = require("./timeago.js");
module.exports = class UTILS {
	output(t) {//general utility function
		if (this.exists(t)) {
			let d = new Date();
			let n = d.toUTCString();
			console.log(n + " : " + t);
		}
	}
	exists(anyObject) {//general utility function
		if (anyObject != null && anyObject != undefined) return true;
		else return false;
	}
	numberWithCommas(x) {//general utility function
		if (this.exists(x)) {
			let parts = x.toString().split(".");
			parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			return parts.join(".");
		}
		else return "";
	}
	round(num, decimal) {
		return Math.round(num * Math.pow(10, decimal)) / Math.pow(10, decimal);
	}
	assert(condition) {
		if (typeof (condition) != "boolean") throw new Error("asserting non boolean value: " + typeof (condition));
		if (!condition) throw new Error("assertion false");
		return true;
	}
	ago(date) {
		return ta.ago(date);
	}
	KDA(summonerID, match) {
		const participantID = match.participantIdentities.find(pI => { return pI.player.summonerId == summonerID; }).participantId;
		const stats = match.participants.find(p => { return p.participantId == participantID; }).stats;
		return {
			K: stats.kills,
			D: stats.deaths,
			A: stats.assists
		};
	}
	determineWin(summonerID, match) {
		const participantID = match.participantIdentities.find(pI => { return pI.player.summonerId == summonerID; }).participantId;
		const teamID = match.participants.find(p => { return p.participantId == participantID; }).teamId;
		return match.teams.find(t => { return t.teamId == teamID; }).win == "Win";
	}
	english(text) {
		return text.split("_").map(t => { return t.substring(0, 1).toUpperCase() + t.substring(1).toLowerCase(); }).join(" ");
	}
	standardTimestamp(sec) {
		let mins = Math.floor(parseInt(sec) / 60);
		let hours = Math.floor(parseInt(mins) / 60);
		mins = mins % 60;
		let secs = Math.floor(parseInt(sec) % 60);
		if (secs < 10) {
			secs = "0" + secs;
		}
		if (mins < 10) {
			mins = "0" + mins;
		}
		if (hours < 10) {
			hours = "0" + hours
		}
		return hours + ":" + mins + ":" + secs;
	}
}
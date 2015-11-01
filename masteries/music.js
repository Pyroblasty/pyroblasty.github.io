// when i was trying to put it on a free hosting they did not allow mp3 file, so i guess github wouldn't either
// these files are not loaded if the user didnt click "sound on"
var CURSE_PLS = [];
CURSE_PLS["background"] = "http://media-titanium.cursecdn.com/audio/0/807/masteries_music_general.mp3";
CURSE_PLS["offense"] = "http://media-titanium.cursecdn.com/audio/0/808/masteries_music_offense.mp3";
CURSE_PLS["defence"] = "http://media-titanium.cursecdn.com/audio/0/806/masteries_music_defense.mp3";
CURSE_PLS["utility"] = "http://media-titanium.cursecdn.com/audio/0/809/masteries_music_utility.mp3";
CURSE_PLS["keystone"] = "http://media-titanium.cursecdn.com/audio/0/792/global-button_large.mp3";
CURSE_PLS["click"] = "http://media-titanium.cursecdn.com/audio/0/794/global-dropdown_click.mp3";
CURSE_PLS["remove"] = "http://media-titanium.cursecdn.com/audio/0/802/groupfinder-player_fadein.mp3";
CURSE_PLS["unlock"] = "http://media-titanium.cursecdn.com/audio/0/792/global-button_large.mp3";
CURSE_PLS["peak"] = "http://media-titanium.cursecdn.com/audio/0/804/groupfinder-player_ready.mp3";
CURSE_PLS["flush"] = "http://media-titanium.cursecdn.com/audio/0/798/groupfinder_player_leaves.mp3";
CURSE_PLS["full"] = "http://media-titanium.cursecdn.com/audio/0/810/summon_champion.mp3";


var MUSIC = false; // does not cause the crime of hotlinking to excessive levels if you don't turn on the music

var themes_count = 0; // counter for loading themes
var BGM, BGM_o, BGM_d, BGM_u; // we don't load the themes if the user does not request it
var sounds_add, sounds_remove, sounds_unlock, sounds_peak, sounds_return, sounds_30;
var action_sound = null;
var ignore_music = true; 
var music_on = false; // the actual music on/off switch. does not turn off sounds.

function calculate_volume(level) {
	var volume = 0.0;
	volume = Math.sqrt(Math.abs(Math.sin(level * Math.PI / 60.0 )));
	return volume;
}

// This is supposed to be simple and work flawlessly, but sometimes it behaves in a weird way.
function updateMusic() {
	BGM.volume(music_on ? 0.8 - totalPoints * 0.015 : 0.0);
	BGM_o.volume(music_on ? calculate_volume(treePoints(0)) * 0.7 : 0.0); // offence is a bit too loud
	BGM_u.volume(music_on ? calculate_volume(treePoints(1)) * 0.9: 0.0); // so is utility
	BGM_d.volume(music_on ? calculate_volume(treePoints(2)) : 0.0);
	if (action_sound != null) action_sound.play();
	action_sound = null;
}

// Checks if all themes are loaded, then plays the loop.
function launch_themes() {
	themes_count++;
	if (themes_count == 4)
	{
		BGM.play();
		BGM_o.play();
		BGM_d.play();
		BGM_u.play();
		themes_count = 0;
	}
}

function mute_music() {
	if (music_on) Howler.mute();
	else Howler.unmute();
	music_on = !music_on;
	if (music_on && !MUSIC)
	{
		BGM = new Howl({urls:[CURSE_PLS["background"]], volume: 0.8, loop: true, onload: launch_themes});
		BGM_o = new Howl({urls:[CURSE_PLS["offense"]], volume: 0.0, loop: true, onload: launch_themes});
		BGM_d = new Howl({urls:[CURSE_PLS["defence"]], volume: 0.0, loop: true, onload: launch_themes});
		BGM_u = new Howl({urls:[CURSE_PLS["utility"]], volume: 0.0, loop: true, onload: launch_themes});
		sounds_add = new Howl({urls:[CURSE_PLS["click"]], volume: 0.5});
		sounds_remove = new Howl({urls:[CURSE_PLS["remove"]], volume: 0.5});
		sounds_unlock = new Howl({urls:[CURSE_PLS["unlock"]], volume: 0.5});
		sounds_peak = new Howl({urls:[CURSE_PLS["peak"]], volume: 0.5});
		sounds_return = new Howl({urls:[CURSE_PLS["flush"]], volume: 0.5});
		sounds_30 = new Howl({urls:[CURSE_PLS["full"]], volume: 1.0});
		
		MUSIC = true;
	}
	updateMusic();
	$("#mute-music").text(music_on ? "Sound on" : "Sound off");
}

$(function(){
	Howler.volume(0.25);
	$("#mute-music").click(mute_music);
	$("#volume").slider({
		min: 0,
		max: 100,
		value: 25,
		range: "min",
		animate: true,
		slide: function(event, ui) { Howler.volume((ui.value) / 100); }
		});
	Howler.mute();
});
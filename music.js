var MUSIC = true;

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

var themes_count = 0;
var BGM = new Howl({urls:[CURSE_PLS["background"]], volume: 0.8, loop: true, onload: launch_themes});
var BGM_o = new Howl({urls:[CURSE_PLS["offense"]], volume: 0.0, loop: true, onload: launch_themes});
var BGM_d = new Howl({urls:[CURSE_PLS["defence"]], volume: 0.0, loop: true, onload: launch_themes});
var BGM_u = new Howl({urls:[CURSE_PLS["utility"]], volume: 0.0, loop: true, onload: launch_themes});
var sounds_add = new Howl({urls:[CURSE_PLS["click"]]});
var sounds_remove = new Howl({urls:[CURSE_PLS["remove"]]});
var sounds_unlock = new Howl({urls:[CURSE_PLS["unlock"]]});
var sounds_peak = new Howl({urls:[CURSE_PLS["peak"]]});
var sounds_return = new Howl({urls:[CURSE_PLS["flush"]]});
var action_sound = null;
var music_on = true;

function calculate_volume(level) {
	var volume = 0.0;
	volume = Math.sqrt(Math.abs(Math.sin(level * Math.PI / 60.0 )));
	return volume;
}

function updateMusic() {
	BGM.volume(music_on ? 0.8 - totalPoints * 0.015 : 0.0);
    for (var tree=0; tree<3; tree++) {
        var theme;
		switch (tree)
		{
			case 0: theme = BGM_o; break;
			case 1: theme = BGM_u; break;
			case 2: theme = BGM_d; break;
			default: break;
		}
		theme.volume(music_on ? calculate_volume(treePoints(tree)) : 0.0);
    }
	if (action_sound != null) action_sound.play();
	action_sound = null;
}

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
	//if (music_on) Howler.mute();
	//else Howler.unmute();
	music_on = !music_on;
	updateMusic();
	//alert("Music off");
	//update_volume(1, 0);
}

$(function(){
	if (MUSIC) {
		$("#audio-controls").css({display: "inline"});
	}
	Howler.volume(0.25);
	$("#volume").slider({
		min: 0,
		max: 100,
		value: 25,
		range: "min",
		animate: true,
		slide: function(event, ui) { Howler.volume((ui.value) / 100); }
		});
});
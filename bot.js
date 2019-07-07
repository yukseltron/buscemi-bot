const Discord = require('discord.js');
const { Client, RichEmbed } = require('discord.js');
const client = new Discord.Client();
const request = require('request');
var auth = require('./auth.json');
var search = require('scrape-youtube');
var films;

request('https://api.themoviedb.org/3/person/884/movie_credits?api_key=' + auth.key + '&language=en-US', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  films = res.body.cast;
  //list of all his films
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === '!buscemi hi') {
    msg.reply('Howdy-do, fellow earthling!');
  }
  if (msg.content === '!buscemi help') {
      const embed = new RichEmbed()
        // Set the title of the field
        .setTitle("List of commands")
        // Set the color of the embed
        .setColor(0xFF0000)
        // Set the main content of the embed
        .setDescription(
            "!buscemi help - Lists available commands\n" +
            "!buscemi hi - I say hi right back\n" +
            "!buscemi video - I send a youtube video featuring me\n" +
            "!buscemi trailer - I send a trailer of a film featuring me\n" +
            "!buscemi film - Info on a random film starring me"
        )
      // Send the embed to the same channel as the message
      msg.reply(embed);
  }
  if (msg.content === '!buscemi film') {
      var randomFilm = Math.floor(Math.random() * 164);
      var film = films[randomFilm];
      const embed = new RichEmbed()
        // Set the title of the field
        .setTitle(film.title + "\t" + film.release_date)
        // Set the color of the embed
        .setColor(0xFF0000)
        // Set the main content of the embed
        .setDescription("I play " + film.character + "\n\n" + film.overview + "\n\n" + film.vote_average + "/10")
      // Send the embed to the same channel as the message
      msg.reply(embed);
      msg.channel.send("https://image.tmdb.org/t/p/w500"+film.poster_path);//film poster
  }
  if (msg.content === '!buscemi video') {//get a youtube video
      search("steve buscemi", {
          limit: 23,
          type : "video"
      }).then(function(results){
          rand = Math.floor(Math.random() * 23);
          msg.reply(results[rand].link);
      }, function(err){
          console.log(err);
      });
  }
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'member-log');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`How do you do, ${member}`);
});


client.login(auth.token);

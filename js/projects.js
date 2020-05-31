var staticUrl = 'https://dyhlstudio.github.io/data/projectslist.json';
$.getJSON(staticUrl, function(data) {
  console.log("This is an example of a static JSON file being served by a web server.")
  alert(data);
});
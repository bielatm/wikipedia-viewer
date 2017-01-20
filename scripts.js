function getWikiResults() {
  var inputData = document.getElementById("search").value;
  if (inputData.trim()) {
    $.ajax({
      type: "GET",
      url: "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + inputData + "&callback=JSON_CALLBACK",
      dataType: "jsonp",
      success: printResults
    })
  }
}

function printResults(data) {
  var toString = JSON.stringify(data);
  var json = JSON.parse(toString).query.pages;
  var aTag;
  var list = document.getElementById("list");
  $('#list').empty();
  Object.keys(json).forEach(function(object) {
    aTag = document.createElement("a");
    aTag.className = "list-group-item";
    aTag.setAttribute("href", "https://en.wikipedia.org/?curid=" + json[object].pageid.toString());
    aTag.setAttribute("target", "_blank");
    aTag.innerHTML =
      '<h4 class="list-group-item-heading">'
      + json[object].title
      + '</h4><p class="list-group-item-text">'
      + json[object].extract
      + '</p>';
    list.appendChild(aTag);
  });

  $("#box").css("margin-top", "1%");
}

$(document).ready(function() {
  $("#search").on("keydown", function(event) {
    if (event.keyCode == 13) {
      getWikiResults();
    }
  });
});

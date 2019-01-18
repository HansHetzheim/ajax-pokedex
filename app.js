var pokemonAPI = "https://pokeapi.co/api/v2/pokemon/"
var userInput
var search


$('.button').click(function() {
   $(".screen3, .screen2, .screen1").empty();
  userInput = $('.input').val();
  search = pokemonAPI + userInput + "/"
  console.log(search);

  $.ajax({
      url: search,
      success: function(data) {
        var pe = data.species.url
        console.log(data)
        $('.screen1').html('<img id="image" src="' + data.sprites.front_default + '">')
        $('.screen2').html('<p id="idNumber">' + data.id + '</p>')

        var numberOfMoves
          if(data.moves.length < 4){
            numberOfMoves = data.moves.length
          } else {
            numberOfMoves = 4
          }
        for (var i = 0; i < numberOfMoves; i++) {
          var randomMoves = Math.floor(Math.random() * data.moves.length)
          console.log(data.moves[randomMoves].move.name)
          $('.screen3').append('<li id="moves">' + data.moves[randomMoves].move.name + '</li>')
        }
        console.log(data.species.url)



        $.ajax({
          url: pe,
          dataType: 'json',
        }).done(function(name){
            console.log(name.evolves_from_species.name)
            $.ajax({
              url: pokemonAPI + name.evolves_from_species.name +"/",
              dataType: 'json'

            }).done(function(pePic){
              console.log(pePic)
              $('.screen3').append('<img id="peImage" src="' + pePic.sprites.front_default + '">')

            })
        })

    }
  })

})

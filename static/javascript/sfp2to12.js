$(document).ready(function(){
    
    $(".mmm").html(function(){
          //numbers 2 -> 12; first number = how many numbers, second number = starting number
          var a = Math.floor((Math.random() * 11) + 2);
          var b = Math.floor((Math.random() * 11) + 2);
          var c = a+b;
          return "<p class='mfp'>" + c + " - " + a + " = </p>";
        });
});

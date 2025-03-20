$(function(){
  $('.beforeAfter').beforeAfter();
});

$('.beforeAfter').beforeAfter({
  movable: true,          // De slider is verplaatsbaar (slepen/swipen)
  clickMove: true,        // De slider kan verplaatst worden door op de afbeelding te klikken
  alwaysShow: true,       // De slider is altijd zichtbaar
  position: 50,           // De startpositie van de slider (bijvoorbeeld op 50% van de afbeelding)
  opacity: 0.4,           // De basisopaciteit van de scheidingslijn tussen de afbeeldingen
  activeOpacity: 1,       // De opaciteit van de scheidingslijn wanneer deze actief is
  hoverOpacity: 0.8,      // De opaciteit van de scheidingslijn wanneer de gebruiker eroverheen beweegt
  separatorColor: '#ffffff',   // De kleur van de scheidingslijn
  bulletColor: '#ffffff',      // De kleur van de knop (bullet) van de slider
  arrowColor: '#333333'        // De kleur van de pijlen aan de zijkant van de slider
});
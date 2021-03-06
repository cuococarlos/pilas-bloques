import { skip } from 'qunit';
import moduleForAcceptance from 'pilas-engine-bloques/tests/helpers/module-for-acceptance';
import desafios from '../pages/desafios';

moduleForAcceptance('Acceptance | desafios');

skip('visiting /desafios', function(assert) {
  let cantidadDesafiosEsperada = 50;

  desafios.
    visit();

  andThen(function() {
    assert.equal(desafios.cantidadDeDesafiosDisponibles(), cantidadDesafiosEsperada, `Hay exactamente ${cantidadDesafiosEsperada} desafios habilitados para utilizar.`);
  });


});

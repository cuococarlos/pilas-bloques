import bloques from 'pilas-engine-bloques/actividades/bloques';
import direcciones from 'pilas-engine-bloques/actividades/direccionesCuadricula';
import tocando from 'pilas-engine-bloques/actividades/tocando';
var {Si,Sino} = bloques;
var {IrDerecha,IrAbajo} = direcciones;
var {TocandoAbajo,TocandoDerecha} = tocando;

var actividadLaberintoCorto = {
  nombre: 'Laberinto corto',
  id: 'LaberintoCorto',
  enunciado: 'Guiá al ratón a llegar a la meta. Para lograrlo, debe avanzar una casilla en la dirección que indica la flecha. Pista: mirá en la categoría "Sensores" qué preguntas podés hacer.',

  // la escena proviene de ejerciciosPilas
  escena: LaberintoCorto, // jshint ignore:line
  puedeComentar: false,
  puedeDesactivar: false,
  puedeDuplicar: false,
  procedimientos: [],

  // TODO: aca irian atributos iniciales que se desean para un personaje
  variables: [],
  control: [Si,Sino],
  expresiones: [],
  acciones: [IrDerecha,IrAbajo],
  sensores: [TocandoAbajo,TocandoDerecha],
};

export default actividadLaberintoCorto;
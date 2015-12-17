/// <reference path = "EscenaActividad.ts" />

class ReparandoLaNave extends EscenaActividad {
  automata;
  compus;
  fondo;
  cuadricula;
  estado;
  tableroHierro;
  tableroCarbon;
  cantidadCarbon;
  cantidadHierro;
  nave;
  secuenciaCaminata;
  condicion;
  iniciar() {
      this.fondo = new Fondo('fondos.reparandoLaNave.png',0,0);
      var cantidadFilas=4
      var cantidadColumnas=5

      this.cuadricula = new Cuadricula(0,0,cantidadFilas,cantidadColumnas,
          {ancho:323,alto:261},
          {grilla: 'invisible.png',
          cantColumnas: 1});

      this.automata = new MarcianoVerdeAnimado(0,0);
      this.nave= new NaveAnimada(0,0);

      this.cuadricula.agregarActor(this.nave,cantidadFilas-1,0);
      this.cuadricula.agregarActorEnPerspectiva(this.automata,cantidadFilas-1,0);

      this.cuadricula.agregarActor(new HierroAnimado(0,0),0,0);
      this.cuadricula.agregarActor(new CarbonAnimado(0,0),0,cantidadColumnas-1);

      this.tableroCarbon= new Tablero(150,220,{texto:"Hierro",separacionX:30,valorInicial:0,imagen:'placacontar.png'});
      this.tableroHierro = new Tablero(150,190,{texto:"Carbon",separacionX:30,valorInicial:0,imagen:'placacontar.png'});

      this.cantidadCarbon= new ObservadoConDisminuir(3);
      this.cantidadHierro= new ObservadoConDisminuir(3);

      this.cantidadCarbon.registrarObservador(this.tableroCarbon);
      this.cantidadHierro.registrarObservador(this.tableroHierro);

      this.cantidadCarbon.registrarObservador(this.automata);
      this.cantidadHierro.registrarObservador(this.automata);

      var builder= new BuilderStatePattern('estoy00');
      this.definirTransiciones(builder);

      this.estado=builder.estadoInicial();

      this.secuenciaCaminata = new Secuencia({'secuencia':[ new CaminaArriba({})]})

      this.secuenciaCaminata.iniciar(this.automata);
       this.condicion = () => { return this.automata.y > pilas.arriba+10; }
       this.automata.escala=0.75;

 }

  private definirTransiciones(builder){
    //modelo estoyCH como cantidad de carbon y de hierro ya depositados,
    //CestoyCH como tengo carbon en mano
    // y HestoyCH como tengo hierro en mano.
    //Estados donde no tengo nada en la mano.
    for(var hierro=0;hierro<=3;hierro++){
        for(var carbon=0;carbon<=3;carbon++){
            builder.agregarEstado(('estoy'+hierro)+carbon)
            builder.agregarEstado((('estoy'+hierro)+carbon)+'carbon')
            builder.agregarEstado((('estoy'+hierro)+carbon)+'hierro')
        }}
        //no unificar los fors, necesito tener creados los estados antes de las transi
        for(var hierro=0;hierro<=3;hierro++){
            for(var carbon=0;carbon<=3;carbon++){
              builder.agregarError('estoy'+hierro+carbon,'depositar','No tengo nada en la mano')
            if(hierro!=3){
                builder.agregarTransicion((('estoy'+hierro)+carbon)+'hierro',('estoy'+(hierro+1))+carbon,'depositar')
                builder.agregarTransicion((('estoy'+hierro)+carbon),'estoy'+(hierro)+carbon+'hierro','tomarHierro')

            }
            if(carbon!=3){
                builder.agregarTransicion((('estoy'+hierro)+carbon)+'carbon',('estoy'+hierro)+(carbon+1),'depositar')
                builder.agregarTransicion((('estoy'+hierro)+carbon),'estoy'+(hierro)+carbon+'carbon','tomarCarbon')
            }
          }
        }


}
  tomarHierro(){
        this.automata.hacer_luego(TomarYContarPorEtiqueta,{'etiqueta':'HierroAnimado','mensajeError':'No hay hierro aquí','dondeReflejarValor': this.cantidadHierro,'idComportamiento' : 'tomarHierro'})
  }

  tomarCarbon(){
    this.automata.hacer_luego(TomarYContarPorEtiqueta,{'etiqueta':'CarbonAnimado','mensajeError':'No hay Carbon aquí','dondeReflejarValor': this.cantidadCarbon,'idComportamiento' : 'tomarCarbon'})
  }

  depositar(){
    this.automata.hacer_luego(Depositar,{'etiqueta':'NaveAnimada','mensajeError':'La nave no está aquí','idComportamiento' : 'depositar'})
  }

  escapar(){
  this.automata.hacer_luego(RepetirHasta,{'secuencia':this.secuenciaCaminata, 'condicion':this.condicion });

  }



     }

class Depositar extends ComportamientoColision{
  metodo(objetoColision){
      pilas.escena_actual().automataPrincipal().cargarAnimacion("parado");
  }
}


class TomarYContarPorEtiqueta extends ComportamientoColision {
  //Si es el último del contador, elimina el objeto del cual recoge.
    metodo(objetoColision){
        this.argumentos['dondeReflejarValor'].disminuir(1);
        if(this.argumentos['dondeReflejarValor'].dameAtributo()==0){
          objetoColision.eliminar()
        }

        pilas.escena_actual().automataPrincipal().cargarAnimacion("con"+this.argumentos['etiqueta']+"EnMano");
    }
}

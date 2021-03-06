import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['contenedor-pilas-editor'],
  persistirSolucionEnURL: false,
  blocksGallery: Ember.inject.service(),
  cargando: true,
  showCode: false,

  didInsertElement() {
    this.get('blocksGallery').start();
  },

  actions: {
    onReady(pilas) {
      this.sendAction("onReady", pilas);
      this.set('cargando', false);
    }
  }
});

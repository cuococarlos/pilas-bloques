function utils_obtener_xml() {
  return Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace));
}

function utils_cargar_xml(codigo) {
  var workspace = Blockly.getMainWorkspace();
  workspace.clear();
  var xml = Blockly.Xml.textToDom(codigo);
  Blockly.Xml.domToWorkspace(xml, workspace);
}

function utils_guardar_solucion_en_url() {
  var xml = utils_obtener_xml();
  var codigo = btoa(xml);
  window.location.href = window.location.href.split("?")[0] + "?codigo=" + encodeURIComponent(codigo);
  console.log("Se guardó correctamente la solución, ahora se puede recargar la página sin perder el workspace.");
}


// Por ejemplo utils_obtener_puntos("pizarraFantasma") ó bien utils_obtener_puntos("automata.pizarra")
function utils_obtener_puntos(pizarra){
  var puntos = PilasEngineBloques.__container__.cache['service:pilas'].evaluar(`pilas.escena_actual().${pizarra}.puntosDeLineas();`);
  return puntos.map( pto => '{x:' + pto.x + ',y:' + pto.y + '}').join();
}

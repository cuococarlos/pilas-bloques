import {moduloActividad, actividadTest} from '../../helpers/actividadTest';

const nombre = 'PrendiendoLasCompusParametrizado';

moduloActividad(nombre);

actividadTest(nombre, {
	solucion: `
		<xml xmlns="http://www.w3.org/1999/xhtml">
		  <block type="al_empezar_a_ejecutar" id="1" deletable="false" movable="false" editable="false" x="0" y="0">
		    <statement name="program">
		      <block type="procedures_callnoreturn" id="46">
		        <mutation name="Prender compus hacia">
		          <arg name="direccion"></arg>
		        </mutation>
		        <value name="ARG0">
		          <block type="ParaLaDerecha" id="61"></block>
		        </value>
		        <next>
		          <block type="procedures_callnoreturn" id="64">
		            <mutation name="Prender compus hacia">
		              <arg name="direccion"></arg>
		            </mutation>
		            <value name="ARG0">
		              <block type="ParaAbajo" id="72"></block>
		            </value>
		            <next>
		              <block type="procedures_callnoreturn" id="77">
		                <mutation name="Prender compus hacia">
		                  <arg name="direccion"></arg>
		                </mutation>
		                <value name="ARG0">
		                  <block type="ParaLaIzquierda" id="83"></block>
		                </value>
		                <next>
		                  <block type="procedures_callnoreturn" id="92">
		                    <mutation name="Prender compus hacia">
		                      <arg name="direccion"></arg>
		                    </mutation>
		                    <value name="ARG0">
		                      <block type="ParaArriba" id="89"></block>
		                    </value>
		                  </block>
		                </next>
		              </block>
		            </next>
		          </block>
		        </next>
		      </block>
		    </statement>
		  </block>
		  <block type="procedures_defnoreturn" id="18" x="7" y="207">
		    <mutation>
		      <arg name="direccion"></arg>
		    </mutation>
		    <field name="NAME">Prender compus hacia</field>
		    <comment pinned="false" h="80" w="160">Describe esta función...</comment>
		    <statement name="STACK">
		      <block type="MoverA" id="95">
		        <value name="direccion">
		          <block type="param_get" id="99">
		            <field name="VAR">direccion</field>
		          </block>
		        </value>
		        <next>
		          <block type="hasta" id="29">
		            <value name="condition">
		              <block type="Estoyenunaesquina" id="31"></block>
		            </value>
		            <statement name="block">
		              <block type="PrenderCompuConColision" id="41">
		                <next>
		                  <block type="MoverA" id="34">
		                    <value name="direccion">
		                      <block type="param_get" id="38">
		                        <field name="VAR">direccion</field>
		                      </block>
		                    </value>
		                  </block>
		                </next>
		              </block>
		            </statement>
		          </block>
		        </next>
		      </block>
		    </statement>
		  </block>
		</xml>
	`
});

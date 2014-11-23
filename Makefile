N=[0m
V=[01;32m

VERSION=0.1.1

all:
	@echo "Comando disponibles"
	@echo ""
	@echo "  $(V)actualizar$(N)  Actualiza el repositorio y pilas-engine."
	@echo ""
	@echo "  $(V)version$(N)     Genera la informacion de versión actualizada."
	@echo "  $(V)ver_sync$(N)    Sube la nueva version al servidor."
	@echo ""
	@echo "  $(V)build$(N)       Genera los archivos compilados."
	@echo "  $(V)watch$(N)       Genera los archivos compilados de forma contínua."
	@echo ""
	@echo "  $(V)test_mac$(N)    Prueba la aplicación sobre OSX"
	@echo ""
	@echo "  $(V)distmac$(N)    Genera la versión compilada para OSX"
	@echo "  $(V)distwin$(N)    Genera la versión compilada para Window"
	@echo ""

build:
	ember build 

watch:
	ember build --watch

actualizar:
	git pull
	npm install
	grunt copy

test_mac: build
	@echo "Cuidado - se está usando la version de nodewebkit del sistema."
	open -a /Applications/node-webkit.app dist

version:
	# patch || minor
	@bumpversion patch --current-version ${VERSION} package.json public/package.json extras/instalador.nsi app/templates/about.hbs extras/distwin.py Makefile --list
	make build
	@echo "Es recomendable escribir el comando que genera los tags y sube todo a github:"
	@echo ""
	@echo "make ver_sync"

ver_sync:
	git commit -am 'release ${VERSION}'
	git tag '${VERSION}'
	git push
	git push --all
	git push --tags

distwin:
	@python extras/distwin.py

distmac:
	@grunt nodewebkit
	mv distribuibles/ejemplo/osx/ejemplo.app distribuibles/ejemplo/osx/pilas-engine-bloques_0.1.1.app
	hdiutil create distribuibles/ejemplo/osx/pilas-engine-bloques_0.1.1.dmg -srcfolder distribuibles/ejemplo/osx/pilas-engine-bloques_0.1.1.app -size 200mb
	cp distribuibles/ejemplo/osx/pilas-engine-bloques_0.1.1.dmg '/Users/hugoruscitti/Google Drive/'
	cp distribuibles/ejemplo/osx/pilas-engine-bloques_0.1.1.dmg '/Users/hugoruscitti/shared/'

.PHONY: dist

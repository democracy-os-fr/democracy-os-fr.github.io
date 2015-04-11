run:
	@echo "Installing dependencies..."
	@npm install
	@bower install

clean:
	@echo "Removing dependencies and minified files..."
	@rm -rf node_modules bower_components js/*.min.js css/*.min.css
	@echo "Done.\n"


.PHONY: clean

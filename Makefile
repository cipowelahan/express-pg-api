help:
	@echo "\nCommands:"
	@echo "\t help \t show help"
	@echo "\t up \t up service"
	@echo "\t down \t down service"

up:
	@docker-compose up --build -d

down:
	@docker-compose down
up: # docker-compose up
	docker compose -f docker-compose.dev.yml up -d --build

up_log: # docker-compose up
	docker compose -f docker-compose.dev.yml up --build

down: ## docker-compose down
	docker compose -f docker-compose.dev.yml down --volumes

up_db: # docker-compose up
	docker compose -f docker-compose.db.yml up -d --build

down_db: ## docker-compose down
	docker compose -f docker-compose.db.yml down --volumes

.PHONY: up up_log down up_db down_db
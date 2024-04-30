include .env
export

run: generate-types
	@bun dev
generate-types:
	@supabase gen types typescript --project-id $(SUPABASE_PROJECT_ID) > src/types/database.types.ts
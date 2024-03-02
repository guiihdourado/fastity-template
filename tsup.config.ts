import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src',
    '!src/shared/infra/database/prisma/migrations/**/*.sql',
    '!src/shared/infra/database/prisma/migrations/*.toml',
    '!src/shared/infra/database/prisma/schema.prisma',
    '!src/modules/**/application/use-cases/*.spec.ts',
    '!src/modules/**/infra/http/controllers/*.spec.ts',
  ],
  outDir: 'build',
})

import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [
      ['src/modules/**/infra/http/controllers/**', 'prisma'],
    ],
    coverage: {
      include: [
        'src/modules/**/application/use-cases/*.ts',
        'src/modules/**/infra/http/controllers/*.ts',
      ],
      provider: 'v8',
    },
  },
})

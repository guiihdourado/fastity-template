import { env } from '../env'
import { app } from './app'

const PORT = env.PORT

app
  .listen({
    host: '0.0.0.0',
    port: PORT,
  })
  .then(() => {
    console.log(`Server is running in on port ${PORT}! 🚀🚀🚀`)
  })

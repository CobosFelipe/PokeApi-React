import { AppRouter } from "./AppRouter"
import { PokemonProvider } from "./context/PokemonProvider"
import './index.css'

function App() {

  return (
    <PokemonProvider>
      <AppRouter />
    </PokemonProvider>
  )
}

export default App

import MealsGenerator from "@/components/organisms/MealsScheduleShoppingList/App"
import { Default } from "@/components/organisms/MealsScheduleShoppingList/App.stories"

function App() {
  return (
    <MealsGenerator {...Default.args} />
  )
}

export default App
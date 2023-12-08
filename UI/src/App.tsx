import MealsGenerator from "@/components/organisms/MealsScheduleShoppingList/MealsSheduleShoppingListApp"
import { Default } from "@/components/organisms/MealsScheduleShoppingList/MealsSheduleShoppingListApp.stories"

function App() {
  return (
    <MealsGenerator {...Default.args} />
  )
}

export default App
import { FC } from "react";
import { useQuery } from "@apollo/client";
import RootHeader from "@/components/RootHeader/RootHeader";
import { useParams } from "react-router";
import MEAL from "@/graphql/queries/meal";

const MealDetail: FC = () => {
    const { mealSlug } = useParams<string>();
    // @ts-expect-error ignore this error
    const [id] = mealSlug.split('-');
    const { data, loading, error } = useQuery<TMealQueryResponse>(MEAL,
        { variables: { id } }
    );
    const meal = data?.meal.data;

    // const navigate = useNavigate();

    return (
        <>
            <RootHeader>
                <h1>{meal?.attributes.name}</h1>

                {/* {data && (
                    <Button
                        onClick={() => navigate('/meals/create')}
                    >Create</Button>
                )} */}
            </RootHeader>

            <div className="flex flex-col gap-[30px] items-start ">
                {loading && (
                    <p>Loading...</p>
                )}

                {error && (
                    <p>Error: ${error.message}</p>
                )}

                {meal && (
                    <div className="flex flex-col gap-[30px] items-start">
                        <div className="flex items-center gap-[30px] w-full">
                            <h3 className="h4">Timing Category:</h3>
                            <p className="h4 font-normal">{meal.attributes.timingCategory}</p>
                        </div>

                        {meal.attributes.ingredients.length > 0 && (
                            <>
                                <h3>Ingredients</h3>

                                <table className="w-full -mt-[15px]">
                                    <thead>
                                        <tr>
                                            <th className="text-left">Name</th>
                                            <th className="w-[60px] text-center">QTY</th>
                                            <th className="w-[60px] text-center">Unit</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {meal.attributes.ingredients.map((ingredient, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="text-left">{ingredient.name}</td>
                                                    <td className="w-[60px] text-center">{ingredient.quantity}</td>
                                                    <td className="w-[60px] text-center">{ingredient.metricUnit}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </>
                        )}

                        {/* <Button
                        onClick={handleEditButtonClick}
                    >Edit</Button> */}
                    </div>
                )}

                {(!error && !meal) && (
                    <p className="text-center my-10">No meal found</p>
                )}
            </div>
        </>
    );
}

export default MealDetail;
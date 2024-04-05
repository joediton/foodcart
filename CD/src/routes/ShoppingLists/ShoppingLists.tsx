import RootHeader from "@/components/RootHeader/RootHeader";
import All_SHOPPING_LISTS from "@/graphql/queries/allShoppingLists";
import useAuth from "@/hooks/useAuth";
import { TShoppingListsQueryResponse } from "@/types";
import { useQuery } from "@apollo/client";
import { Button } from "@mui/material";
import { FC } from "react";

const ShoppingList: FC = () => {
    const { userId } = useAuth();
    const { data, loading, error } = useQuery<TShoppingListsQueryResponse>(All_SHOPPING_LISTS,
        { variables: { userId } }
    );
    const shoppingLists = data?.shoppingLists.data;

    // const navigate = useNavigate();

    return (
        <>
            <RootHeader>
                <h1>Shopping List</h1>

                {data && (
                    <Button
                        type="button"
                        variant="outlined"
                    // onClick={() => navigate('/shopping-lists/add')}
                    >Add Schedule</Button>
                )}
            </RootHeader>

            {loading && (
                <p>Loading...</p>
            )}

            {error && (
                <p>Error: ${error.message}</p>
            )}

            {(shoppingLists && shoppingLists.length > 0) && (
                <div className="flex flex-col gap-[10px] w-full">
                    {shoppingLists.map(() => (
                        // <ViewEditSchedule {...schedule} key={schedule.id} />
                        <></>
                    ))}
                </div>
            )}

            {(!shoppingLists || shoppingLists.length === 0) && (
                <p className="text-center my-10">No shopping lists found</p>
            )}
        </>
    )
}

export default ShoppingList;
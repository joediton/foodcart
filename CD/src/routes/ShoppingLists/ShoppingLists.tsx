import RootHeader from "@/components/RootHeader/RootHeader";
import All_SHOPPING_LISTS from "@/graphql/queries/allShoppingLists";
import useAuth from "@/hooks/useAuth";
import { useQuery } from "@apollo/client";
import Button from '@/components/Button/Button';
import { FC } from "react";
import { useNavigate } from "react-router";

const ShoppingList: FC = () => {
    const { userId } = useAuth();
    const { data, loading, error } = useQuery<TShoppingListsQueryResponse>(All_SHOPPING_LISTS,
        { variables: { userId } }
    );
    const shoppingLists = data?.shoppingLists.data;

    const navigate = useNavigate();

    return (
        <>
            <RootHeader>
                <h1>Shopping Lists</h1>

                {data && (
                    <Button
                        onClick={() => navigate('/shopping-lists/create')}
                    >Create</Button>
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
                    {shoppingLists.map((_, index) => (
                        // <ViewEditSchedule {...schedule} key={schedule.id} />
                        <p key={index}>Item</p>
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
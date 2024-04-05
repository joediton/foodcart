import { FC, FormEvent, useState } from "react";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import RootHeader from "@/components/RootHeader/RootHeader";
import { useNavigate } from "react-router";
import { useMutation, useQuery } from "@apollo/client";
import CREATE_SHOPPING_LIST from "@/graphql/mutations/createShoppingList";
import All_SHOPPING_LISTS from "@/graphql/queries/allShoppingLists";
import { TSchedulesQueryResponse, TShoppingListsQueryResponse } from "@/types";
import useAuth from "@/hooks/useAuth";
import All_SCHEDULES from "@/graphql/queries/allSchedules";

const CreateShoppingList: FC = () => {
    const navigate = useNavigate();

    const { userId } = useAuth();

    const [name, setName] = useState("");
    const [selectedScheduleId, setSelectedScheduleId] = useState("");

    const variables = {
        name,
        userId,
    };

    const { data: schedulesData, loading, error } = useQuery<TSchedulesQueryResponse>(All_SCHEDULES,
        { variables: { userId } }
    );
    const schedules = schedulesData?.schedules.data;

    const [createShoppingList] = useMutation(CREATE_SHOPPING_LIST, {
        variables,
        update(cache, { data }) {
            const newShoppingList = data?.createShoppingList.data;
            const existingShoppingLists: TShoppingListsQueryResponse = cache.readQuery({ query: All_SHOPPING_LISTS, variables });
            if (!newShoppingList || !existingShoppingLists) return;

            cache.writeQuery({
                query: All_SHOPPING_LISTS,
                variables,
                data: {
                    shoppingLists: {
                        data: [...existingShoppingLists.shoppingLists.data, newShoppingList],
                    }
                }
            });
        }
    });

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        createShoppingList();
        navigate('/shopping-lists');
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <RootHeader>
                <h1>Create Shopping List</h1>

                <Button
                    variant="outlined"
                    type="submit"
                >
                    Save
                </Button>
            </RootHeader>

            {loading && (
                <p>Loading...</p>
            )}

            {error && (
                <>
                    <p>Error: ${error.message}</p>
                </>
            )}

            <div className="flex flex-col gap-[10px] w-full">
                <TextField
                    size="small"
                    label="Name"
                    type="text"
                    value={name}
                    className="w-full"
                    onChange={(e) => setName(e.target.value)}
                    required={true}
                />

                {(schedules && schedules.length > 0) && (
                    <Select
                        size="small"
                        id="schedule"
                        value={selectedScheduleId}
                        onChange={(e) => setSelectedScheduleId(e.target.value)}
                        name="schedule"
                    >
                        {schedules.map((schedule) => (
                            <MenuItem key={schedule.id} value={schedule.id}>
                                {schedule.attributes.name}
                            </MenuItem>
                        ))}
                    </Select>
                )}
            </div>
        </form>
    )
}

export default CreateShoppingList;
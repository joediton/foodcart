import { FC } from "react";
import { TSchedulesQueryResponse } from "@/types";
import { Button } from "@mui/material";
import { useQuery } from "@apollo/client";
import All_SCHEDULES from "@/graphql/queries/allSchedules";
import { useNavigate } from "react-router";
import RootHeader from "@/components/RootHeader/RootHeader";
import useAuth from "@/hooks/useAuth";

const Schedules: FC = () => {
    const { userId } = useAuth();
    const { data, loading, error } = useQuery<TSchedulesQueryResponse>(All_SCHEDULES,
        { variables: { id: userId } }
    );
    const schedules = data?.schedules.data;

    const navigate = useNavigate();

    return (
        <>
            <RootHeader>
                <h1>Schedules</h1>

                {data && (
                    <Button
                        type="button"
                        variant="outlined"
                        onClick={() => navigate('/schedules/generate')}
                    >Add Schedule</Button>
                )}
            </RootHeader>

            {loading && (
                <p>Loading...</p>
            )}

            {error && (
                <p>Error: ${error.message}</p>
            )}

            {(schedules && schedules.length > 0) && (
                <div className="flex flex-col gap-[10px] w-full">
                    {/* {schedules.map((meal) => (
                        <ViewEditMeal {...meal} key={meal.id} />
                    ))} */}
                </div>
            )}

            {(!schedules || schedules.length === 0) && (
                <p className="text-center my-10">No schedules found</p>
            )}
        </>
    );
}

export default Schedules;
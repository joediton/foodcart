import { FC } from "react";
import Button from '@/components/Button/Button';
import { useQuery } from "@apollo/client";
import All_SCHEDULES from "@/graphql/queries/allSchedules";
import { useNavigate } from "react-router";
import RootHeader from "@/components/RootHeader/RootHeader";
import useAuth from "@/hooks/useAuth";
import ViewEditSchedule from "@/components/ViewEditSchedule/ViewEditSchedule";

const Schedules: FC = () => {
    const { userId } = useAuth();
    const { data, loading, error } = useQuery<TSchedulesQueryResponse>(All_SCHEDULES,
        { variables: { userId } }
    );
    const schedules = data?.schedules.data;

    const navigate = useNavigate();

    return (
        <>
            <RootHeader>
                <h1>Schedules</h1>

                {data && (
                    <Button
                        onClick={() => navigate('/schedules/create')}
                    >Create</Button>
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
                    {schedules.map((schedule) => (
                        <ViewEditSchedule {...schedule} key={schedule.id} />
                    ))}
                </div>
            )}

            {(!schedules || schedules.length === 0) && (
                <p className="text-center my-10">No schedules found</p>
            )}
        </>
    );
}

export default Schedules;
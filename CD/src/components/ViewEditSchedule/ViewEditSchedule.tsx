import { TSchedule, TSchedulesQueryResponse, daysOfWeek } from "@/types";
import React, { FormEvent } from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    TextField
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useMutation } from "@apollo/client";
import useAuth from "@/hooks/useAuth";
// import UPDATE_SCHEDULE from "@/graphql/mutations/updateSchedule";
import All_SCHEDULES from "@/graphql/queries/allSchedules";
import DELETE_SCHEDULE from "@/graphql/mutations/deleteSchedule";

export type TViewEditScheduleProps = TSchedule;

const ViewEditSchedule: React.FC<TViewEditScheduleProps> = (props) => {
    const { userId } = useAuth();
    const [editMode, setEditMode] = React.useState(false);
    const [name, setName] = React.useState(props.attributes.name || "");
    // const [
    //     selectedTimingCategories,
    //     setSelectedTimingCategories
    // ] = React.useState<{ [day: string]: string }>({
    //     Monday: 'quick',
    //     Tuesday: 'quick',
    //     Wednesday: 'quick',
    //     Thursday: 'quick',
    //     Friday: 'quick',
    //     Saturday: 'quick',
    //     Sunday: 'quick',
    // });

    // const [ 
    //     selectedMeals,
    //     setSelectedMeals
    // ] = React.useState<{ [day: string]: string }>({
    //     Monday: '',
    //     Tuesday: '',
    //     Wednesday: '',
    //     Thursday: '',
    //     Friday: '',
    //     Saturday: '',
    //     Sunday: '',
    // });

    // const [updateSchedule] = useMutation(UPDATE_SCHEDULE, {
    //     variables: {
    //         id: props.id,
    //         name,
    //     },
    //     update(cache, { data }) {
    //         const updatedSchedule = data?.updateSchedule.data;
    //         const existingSchedules: TSchedulesQueryResponse = cache.readQuery({ query: All_SCHEDULES, variables: { userId } });
    //         if (!updatedSchedule || !existingSchedules) return;

    //         cache.writeQuery({
    //             query: All_SCHEDULES,
    //             variables: { userId },
    //             data: {
    //                 shedules: {
    //                     data: existingSchedules?.schedules.data.map((shedule: TSchedule) => {
    //                         if (shedule.id === updatedSchedule.id) {
    //                             return updatedSchedule;
    //                         }
    //                         return shedule;
    //                     }),
    //                 }
    //             }
    //         });
    //     }
    // });

    const [deleteSchedule] = useMutation(DELETE_SCHEDULE, {
        variables: {
            id: props.id,
        },
        update(cache, { data }) {
            const deletedSchedule = data?.deleteSchedule.data;
            const existingSchedules: TSchedulesQueryResponse = cache.readQuery({ query: All_SCHEDULES, variables: { userId } });
            if (!deletedSchedule || !existingSchedules) return;

            cache.writeQuery({
                query: All_SCHEDULES,
                variables: { userId },
                data: {
                    schedules: {
                        data: existingSchedules?.schedules.data.filter((schedule: TSchedule) => schedule.id !== deletedSchedule.id),
                    }
                }
            });
        }
    });

    const handleEditButtonClick = (): void => {
        setEditMode(true);
    }

    const handleDeleteScheduleButtonClick = (): void => {
        const confirmed = window.confirm("Are you sure you want to delete this schedule?");
        if (!confirmed) return;

        deleteSchedule();
    }

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        // updateSchedule();
        setEditMode(false);
    }

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <h2 className="my-0">{name}</h2>
            </AccordionSummary>

            <AccordionDetails>
                {!editMode && (
                    <div className="flex flex-col gap-[30px] items-start">
                        <div className="flex flex-col gap-[10px]">
                            <div className='grid grid-cols-3 gap-[20px] items-center pb-2'>
                                <div className="col-span-1">
                                    <p className="font-bold m-0">Day</p>
                                </div>

                                <div className="col-span-1">
                                    <p className="font-bold m-0">Timing</p>
                                </div>

                                <div className="col-span-1">
                                    <p className="font-bold m-0">Meal</p>
                                </div>
                            </div>

                            {daysOfWeek.map((day) => (
                                <div className='grid grid-cols-3 gap-[20px] items-center' key={day}>
                                    <div className="col-span-1">
                                        <label className="m-0 p-0" htmlFor={day.toLowerCase()}>{day}</label>
                                    </div>

                                    <div className="col-span-1">
                                        {props.attributes[day.toLowerCase()].timingCategory}
                                    </div>

                                    <div className="col-span-1">
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button
                            variant="outlined"
                            onClick={handleEditButtonClick}
                        >Edit</Button>
                    </div>
                )}

                {editMode && (
                    <form onSubmit={handleFormSubmit} className="flex flex-col gap-[30px]">
                        <TextField
                            size="small"
                            label="Name"
                            type="text"
                            value={name}
                            className="w-full"
                            onChange={(e) => setName(e.target.value)}
                            required={true}
                        />

                        <div className="flex gap-[20px] justify-between">
                            <Button
                                type="button"
                                variant="outlined"
                                onClick={handleDeleteScheduleButtonClick}
                            >Delete Schedule</Button>

                            <Button
                                type="submit"
                                variant="outlined"
                            >Save Schedule</Button>
                        </div>
                    </form>
                )}
            </AccordionDetails>
        </Accordion>
    );
};

export default ViewEditSchedule;
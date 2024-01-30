import React from 'react';
import { TIngredient, metricUnits } from '@/types';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import { Delete } from '@mui/icons-material';

export type EditIngredientProps = {
    handleIngredientChange: (ingredient: TIngredient, index: number) => void;
    handleDeleteIngredient: (index: number) => void;
    index: number;
    ingredient: TIngredient;
};

const EditIngredient: React.FC<EditIngredientProps> = (props) => {
    const [name, setName] = React.useState<string>(props.ingredient.name);
    const [quantity, setQuantity] = React.useState<number | undefined>(props.ingredient.quantity);
    const [metricUnit, setMetricUnit] = React.useState<string | undefined>(props.ingredient.metricUnit);

    React.useEffect(() => {
        props.handleIngredientChange({
            name,
            quantity,
            metricUnit,
        }, props.index);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, quantity, metricUnit]);

    return (
        <div className="grid grid-cols-6 gap-[10px]">
            <TextField
                label="Name"
                type="text"
                value={name}
                className="col-span-4"
                onChange={(e) => setName(e.target.value)}
                required={true}
            />

            <Button
                className="col-span-2"
                variant='outlined'
                onClick={() => props.handleDeleteIngredient(props.index)}
            >
                <Delete />
            </Button>

            <TextField
                label="QTY"
                type="text"
                value={quantity}
                className="col-span-2 text-center"
                onChange={(e) => setQuantity(Number(e.target.value))}
                required={true}
            />

            <Select
                defaultValue={metricUnits[0]}
                value={metricUnit}
                className="col-span-4 text-center"
                onChange={(e) => setMetricUnit(e.target.value)}
                required={true}
            >
                {metricUnits.map((unit, index) => (
                    <MenuItem value={unit} key={index}>{unit}</MenuItem>
                ))}
            </Select>

        </div>
    );
};

export default EditIngredient;
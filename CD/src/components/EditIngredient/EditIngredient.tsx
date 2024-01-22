import React from 'react';
import { TIngredient, metricUnits } from '@/types';
import { MenuItem, Select, TextField } from '@mui/material';

export type EditIngredientProps = {
    handleIngredientChange: (ingredient: TIngredient, index: number) => void;
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
        <>
            <TextField
                type="text"
                value={name}
                className="flex-1"
                onChange={(e) => setName(e.target.value)}
            />

            <TextField
                type="text"
                value={quantity}
                className="w-[60px] text-center"
                onChange={(e) => setQuantity(Number(e.target.value))}
            />

            <Select
                value={metricUnit}
                className="w-[60px] text-center"
                onChange={(e) => setMetricUnit(e.target.value)}
            >
                {metricUnits.map((unit, index) => (
                    <MenuItem value={unit} key={index}>{unit}</MenuItem>
                ))}
            </Select>
        </>
    );
};

export default EditIngredient;
import React, { ChangeEvent } from 'react';
import { metricUnits } from '@/types';
import { MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import Button from '@/components/Button/Button';
import { Delete } from '@mui/icons-material';

export type EditIngredientProps = {
    handleIngredientFieldChange: (targetIndex: number, key: string, value: string) => void;
    handleDeleteIngredientButtonClick: (index: number) => void;
    index: number;
    ingredient: TIngredient;
};

const EditIngredient: React.FC<EditIngredientProps> = (props) => {
    const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        props.handleIngredientFieldChange(props.index, name, value);
    }

    const handleSelectChange = (e: SelectChangeEvent<string>): void => {
        const { name, value } = e.target;
        props.handleIngredientFieldChange(props.index, name, value);
    }

    const handleDeleteButtonClick = (): void => {
        props.handleDeleteIngredientButtonClick(props.index);
    }

    return (
        <div className="grid grid-cols-6 gap-[10px]">
            <TextField
                size="small"
                label="Name"
                type="text"
                value={props.ingredient.name}
                className="col-span-4"
                onChange={handleTextFieldChange}
                required={true}
                name="name"
            />

            <Button
                className="col-span-2"
                onClick={handleDeleteButtonClick}
            >
                <Delete />
            </Button>

            <TextField
                size="small"
                label="QTY"
                type="number"
                value={props.ingredient.quantity}
                className="col-span-2 text-center"
                onChange={handleTextFieldChange}
                required={true}
                name="quantity"
            />

            <Select
                size="small"
                defaultValue={metricUnits[0]}
                value={props.ingredient.metricUnit}
                className="col-span-4 text-center"
                onChange={handleSelectChange}
                required={true}
                name="metricUnit"
            >
                {metricUnits.map((unit, index) => (
                    <MenuItem value={unit} key={index}>{unit}</MenuItem>
                ))}
            </Select>
        </div>
    );
};

export default EditIngredient;
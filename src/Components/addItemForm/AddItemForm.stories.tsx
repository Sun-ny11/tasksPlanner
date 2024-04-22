import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { AddItemForm, AddItemFormProps } from "./AddItemForm";
import React, { ChangeEvent, useState, KeyboardEvent } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof AddItemForm> = {
   title: "TODOLIST/AddItemForm",
   component: AddItemForm,
   parameters: {
      // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
      layout: "centered",
   },
   // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
   tags: ["autodocs"],
   // More on argTypes: https://storybook.js.org/docs/api/argtypes
   argTypes: {
      collBack: {
         description: "Button clicked inside form",
         action: "clicked",
      },
   },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const AddItemFormStory: Story = {
   render: () => <AddItemForm collBack={action("Callback")} />,
};
export const AddItemFormDisabled: Story = {
   render: () => <AddItemForm disabled={true} collBack={action("Callback")} />,
};

const AddItemFormError = (props: AddItemFormProps) => {
   let [title, setTitle] = useState("");
   let [error, setError] = useState<string | null>("Title is required");

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value);
   };

   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (error) setError(null);
      if (e.charCode === 13) {
         addTask();
      }
   };

   const addTask = () => {
      if (title.trim() !== "") {
         props.collBack(title.trim());
         setTitle("");
      } else {
         setError("Title is required");
      }
   };
   const styles = {
      maxWidth: "38px",
      maxHeight: "38px",
      minWidth: "38px",
      minHeight: "38px",
   };
   return (
      <div>
         <TextField
            id="outlined-basic"
            label={error ? error : "Outlined"}
            variant="outlined"
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            size="small"
            error={!!error}
         />
         {/* <input value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            className={error ? "error" : ""}
         /> */}
         <Button onClick={addTask} size="small" variant="contained" style={styles}>
            +
         </Button>
      </div>
   );
};

export const AddItemFormErrorStory: Story = {
   render: () => <AddItemFormError collBack={action("Callback")} />,
};

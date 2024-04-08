import type { Meta, StoryObj } from "@storybook/react";
import { Task } from "./Task";
import React from "react";
import { useSelector } from "react-redux";
import { ReduxStoreProviderDecorator } from "../../../../reducers/ReduxStoreProviderDecorator";
import { AppRootStateType } from "../../../../reducers/store";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Task> = {
   title: "TODOLIST/Task",
   component: Task,
   parameters: {
      // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
      layout: "centered",
   },
   // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
   tags: ["autodocs"],
   // More on argTypes: https://storybook.js.org/docs/api/argtypes

   decorators: [ReduxStoreProviderDecorator],
};

export default meta;
type Story = StoryObj<typeof Task>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
const TaskStory = () => {
   const taskID = useSelector<AppRootStateType, any>((state) => state.tasks["todolistId1"][0].id);

   return <Task todolistID={"todolistId1"} taskId={taskID} />;
};

export const TaskToggle: Story = {
   render: () => <TaskStory />,
};

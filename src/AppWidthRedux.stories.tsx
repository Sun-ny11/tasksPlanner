import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import React from 'react';
import AppWidthRedux from './AppWidthRedux';
import { Provider } from 'react-redux';
import { store } from './reducers/store';
import { ReduxStoreProviderDecorator } from './reducers/ReduxStoreProviderDecorator';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof AppWidthRedux> = {
    title: 'TODOLIST/AppWidthRedux',
    component: AppWidthRedux,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    decorators: [
        ReduxStoreProviderDecorator
    ]
};

export default meta;
type Story = StoryObj<typeof AppWidthRedux>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const AppWidthReduxStory: Story = {
    render: () => <AppWidthRedux/>
}

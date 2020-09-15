import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Gantt, GanttProps } from "./Gantt";

export default {
  title: "Gant",
  component: Gantt,
  argTypes: { onDataUpdated: { action: "data update" } }
} as Meta;

const Template: Story<GanttProps> = args => (
  <div style={{ width: "90vw", height: "90vh" }}>
    <Gantt {...args} />
  </div>
);

export const TwoTasks = Template.bind({});
TwoTasks.args = {
  tasks: {
    data: [
      {
        id: 1,
        text: "Task #1",
        start_date: "2019-04-16",
        duration: 3,
        progress: 0.6
      },
      {
        id: 2,
        text: "Task #2",
        start_date: "2019-04-18",
        duration: 3,
        progress: 0.4
      }
    ],
    links: [{ id: 1, source: 1, target: 2, type: "0" }]
  },
  zoom: 1
};

import { action } from "@storybook/addon-actions";

export const actionFactory = (actionName: string) => (payload: any) => () => action(actionName)(payload);

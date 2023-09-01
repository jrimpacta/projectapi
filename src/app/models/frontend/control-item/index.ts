import { Icon } from "../icon";

export type Value = string | number | boolean;
export interface ControlItem {
	value: Value;
	label: string;
	icon?: Icon
}

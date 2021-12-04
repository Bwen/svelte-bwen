import type {IconDefinition} from "@fortawesome/fontawesome-svg-core";

export type LinkDefinition = {
    icon?: IconDefinition;
    icon_hover?: IconDefinition;
    subtext?: string;
    text?: string;
    href?: string;
    id?: string;
    css?: string;
    data?: { [key: string]: string };
}

export interface IImage {
  id: number;
  image: string;
}

export interface IModifierItem {
  id: number;
  name: string;
  price: number;
  maxChoices: number;
  position: number;
  visible: number;
  availabilityType: string;
  available: boolean;
  qty?: number; // Optional, used for "2 meats" in the example
}

export interface IModifier {
  id: number;
  name: string;
  minChoices: number;
  maxChoices: number;
  items: IModifierItem[];
}

export interface IMenuItem {
  id: number;
  name: string;
  description?: string; // Optional, some items have no description
  alcoholic: number;
  price: number;
  position: number;
  visible?: number;
  availabilityType: string;
  sku?: string;
  images?: IImage[]; // Optional, some items may have no images
  modifiers?: IModifier[]; // Optional, used for items with modifiers
  available: boolean;
}

export interface ISection {
  id: number;
  name: string;
  description?: string | null; // Optional
  position: number;
  visible?: number;
  images: IImage[];
  items: IMenuItem[];
}

export interface IMenu {
  id: number;
  name: string;
  type: string;
  collapse: number;
  sections: ISection[];
}

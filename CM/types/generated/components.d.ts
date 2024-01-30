import type { Schema, Attribute } from '@strapi/strapi';

export interface MealsIngredient extends Schema.Component {
  collectionName: 'components_meals_ingredients';
  info: {
    displayName: 'Ingredient';
    icon: 'cube';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    quantity: Attribute.Integer;
    metricUnit: Attribute.Enumeration<
      ['items', 'packs', 'g', 'kg', 'l', 'ml']
    > &
      Attribute.Required &
      Attribute.DefaultTo<'items'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'meals.ingredient': MealsIngredient;
    }
  }
}

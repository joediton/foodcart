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

export interface ScheduleScheduleItem extends Schema.Component {
  collectionName: 'components_schedule_schedule_items';
  info: {
    displayName: 'Schedule Item';
    description: '';
  };
  attributes: {
    timingCategory: Attribute.Enumeration<['quick', 'normal', 'slow']> &
      Attribute.Required;
    meal: Attribute.Relation<
      'schedule.schedule-item',
      'oneToOne',
      'api::meal.meal'
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'meals.ingredient': MealsIngredient;
      'schedule.schedule-item': ScheduleScheduleItem;
    }
  }
}

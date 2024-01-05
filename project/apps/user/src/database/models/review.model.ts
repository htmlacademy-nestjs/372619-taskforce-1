import { BaseModel } from './base.model';

export type ReviewModelProperties = Pick<
  ReviewModel,
  'text' | 'taskId' | 'rating'
>;

export class ReviewModel extends BaseModel {
  public static get tableName() {
    return 'reviews';
  }

  public static get idColumn() {
    return 'id';
  }

  public readonly text: string;
  public readonly taskId: number;
  public readonly rating: number;
  public readonly createdAt: number;
  public readonly updatedAt: number;

  public static get jsonSchema() {
    return {
      type: 'object',
      required: ['text', 'taskId', 'rating'],
      properties: {
        id: {
          type: 'integer',
        },
        text: {
          type: 'string',
          minLength: 1,
          maxLength: 500,
        },
        taskId: {
          type: 'integer',
        },
        rating: {
          type: 'integer',
        },
        createdAt: {
          type: 'integer',
        },
        updatedAt: {
          type: 'integer',
        },
      },
    };
  }
}
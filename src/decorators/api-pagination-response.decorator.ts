import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiPaginationResponse = (model: any) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        properties: {
          count: {
            type: 'number'
          },
          skip: {
            type: 'number'
          },
          limit: {
            type: 'number'
          },
          data: {
            type: 'array',
            items: { $ref: getSchemaPath(model) }
          }
        }
      }
    })
  );
};
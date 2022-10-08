import * as handler from '../../handler';

const event = {
  Records: [
    {
      body: {
        title: 'Test',
        description: 'Test',
        price: 1,
        count: 1,
      },
    },
  ],
};

describe('Simulate events from SQS', () => {
  it('Event processing', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const response = await handler.catalogBatchProcess(event);

    expect(response).toBeDefined();
    expect(response?.statusCode).toBe(200);
  });
});

import client from 'amqplib';
import logger from '@notifications/utils/logger';
import { createConnection } from '@notifications/services/queues/connects';

jest.mock('amqplib');
jest.mock('@notifications/utils/logger');

describe('createConnection', () => {
  let mockChannel: any;
  let mockConnection: any;

  beforeEach(() => {
    jest.clearAllMocks();

    mockChannel = { close: jest.fn() };
    mockConnection = {
      createChannel: jest.fn().mockResolvedValue(mockChannel),
      close: jest.fn()
    };

    (client.connect as jest.Mock).mockResolvedValue(mockConnection);
  });

  it('should connect and create channel successfully', async () => {
    const channel = await createConnection();

    expect(client.connect).toHaveBeenCalledWith(expect.stringContaining('amqp'));
    expect(mockConnection.createChannel).toHaveBeenCalled();
    expect(logger.info).toHaveBeenCalledWith('Notification server connected to queue successfully...');
    expect(channel).toBe(mockChannel);
  });

  it('should handle error and return undefined', async () => {
    (client.connect as jest.Mock).mockRejectedValueOnce(new Error('Connection failed'));

    const result = await createConnection();

    expect(logger.log).toHaveBeenCalledWith(
      'error',
      'NotificationService error createConnection() method:',
      expect.any(Error)
    );
    expect(result).toBeUndefined();
  });

  it('should close connection on SIGINT', async () => {
    const onceSpy = jest.spyOn(process, 'once').mockImplementation((event, handler: any) => {
      if (event === 'SIGINT') {
        (onceSpy as any).handler = handler;
      }
      return process as any;
    });

    await createConnection();

    await (onceSpy as any).handler('SIGINT');

    expect(mockChannel.close).toHaveBeenCalledTimes(1);
    expect(mockConnection.close).toHaveBeenCalledTimes(1);
  });
});

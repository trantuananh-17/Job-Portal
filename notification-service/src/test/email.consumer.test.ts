import { Channel } from 'amqplib';
import logger from '@notifications/utils/logger';
import { createConnection } from '@notifications/services/queues/connects';
import {
  consumeApprovedCompanyEmailMessages,
  consumeAuthEmailMessages
} from '@notifications/services/queues/email.consumer';

jest.mock('@notifications/services/queues/connects');
jest.mock('@notifications/services/queues/mail.transport');
jest.mock('@notifications/utils/logger');
jest.mock('@notifications/configs/config', () => ({
  config: { CLIENT_URL: 'http://localhost:3000' }
}));

describe('EmailConsumer', () => {
  let channel: jest.Mocked<Channel>;

  beforeEach(() => {
    jest.resetAllMocks();

    channel = {
      assertExchange: jest.fn(),
      assertQueue: jest.fn(),
      bindQueue: jest.fn(),
      consume: jest.fn(),
      ack: jest.fn()
    } as unknown as jest.Mocked<Channel>;

    (createConnection as jest.Mock).mockResolvedValue(channel);
  });

  describe('consumeAuthEmailMessages', () => {
    it('should setup exchange, queue, bind and consume correctly', async () => {
      // mock assertQueue return
      (channel.assertQueue as jest.Mock).mockResolvedValue({
        queue: 'auth-email-queue',
        messageCount: 0,
        consumerCount: 0
      });

      await consumeAuthEmailMessages(channel);

      expect(channel.assertExchange).toHaveBeenCalledWith('job-email-notification', 'direct');
      expect(channel.assertQueue).toHaveBeenCalledWith('auth-email-queue', { durable: true, autoDelete: false });
      expect(channel.bindQueue).toHaveBeenCalledWith('auth-email-queue', 'job-email-notification', 'auth-email');
      expect(channel.consume).toHaveBeenCalledTimes(1);
    });

    it('should handle error gracefully', async () => {
      (channel.assertExchange as jest.Mock).mockRejectedValue(new Error('Boom!'));
      await consumeAuthEmailMessages(channel);
      expect(logger.log).toHaveBeenCalledWith(
        'error',
        expect.stringContaining('consumeAuthEmailMessages() method error:'),
        expect.any(Error)
      );
    });
  });

  describe('consumeApprovedCompanyEmailMessages', () => {
    it('should setup exchange, queue, bind and consume correctly', async () => {
      (channel.assertQueue as jest.Mock).mockResolvedValue({
        queue: 'company-approved-email-queue',
        messageCount: 0,
        consumerCount: 0
      });

      await consumeApprovedCompanyEmailMessages(channel);

      expect(channel.assertExchange).toHaveBeenCalledWith('job-company-notification', 'direct', { durable: true });
      expect(channel.assertQueue).toHaveBeenCalledWith('company-approved-email-queue', {
        durable: true,
        autoDelete: false
      });
      expect(channel.bindQueue).toHaveBeenCalledWith(
        'company-approved-email-queue',
        'job-company-notification',
        'company-approved-email'
      );
      expect(channel.consume).toHaveBeenCalledTimes(1);
    });

    it('should handle errors in consumeApprovedCompanyEmailMessages', async () => {
      (channel.assertExchange as jest.Mock).mockRejectedValue(new Error('Exchange error'));
      await consumeApprovedCompanyEmailMessages(channel);
      expect(logger.log).toHaveBeenCalledWith(
        'error',
        expect.stringContaining('consumeApprovedCompanyEmailMessages() method error:'),
        expect.any(Error)
      );
    });
  });
});

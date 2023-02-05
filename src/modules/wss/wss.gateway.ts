import { OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';

import io from 'socket.io';

// @WebSocketGateway(wss_settings.port, {
//   pingInterval: wss_settings.ping_interval,
//   pingTimeout: wss_settings.ping_timeout,
//   path: wss_settings.path,
// })
export class WssGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  public server: io.Server;

  // constructor(private readonly logger: LoggerService) {}

  private getClientQuery(client: io.Socket): Record<string, unknown> {
    return client.handshake.query;
  }

  public async handleConnection(client: io.Socket) {
    const { user_id } = this.getClientQuery(client);

    // this.logger.info('WssGateway: handleConnection', { user_id });

    return this.server.emit('event', { connected: user_id });
  }

  public async handleDisconnect(client: io.Socket) {
    const { user_id } = this.getClientQuery(client);

    // this.logger.info('WssGateway: handleDisconnect', { user_id });

    return this.server.emit('event', { disconnected: user_id });
  }
}

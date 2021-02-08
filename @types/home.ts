export interface ClientRecord {
  client: string;
  socketId: string;
  userId: string;
}

export type NewClientConnectedData = Pick<ClientRecord, 'client'>;

export interface RoomStatusData {
  room: ClientRecord[];
}

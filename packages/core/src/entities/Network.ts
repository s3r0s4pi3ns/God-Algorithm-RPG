export type Network = {
  device: string;
  connected: boolean;
  speed: {
    type: string;
    value: number;
    unit: string;
  };
  ipv4: string;
  ipv6?: string;
  ssh: {
    open: boolean;
    password: string;
    port: number;
  };
};

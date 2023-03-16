export interface IpLocation  {
  id?: number;
  domain?: string;
  long?: string;
  lat?: string;
  geoname_id?: string;
  isActive?: Boolean;
};


export type Locations = {
  locations: IpLocation[];
};

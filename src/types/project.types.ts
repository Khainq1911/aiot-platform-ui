export interface NewProjectDto {
  name: string;
  description: string;
  deviceIds: number[];
  userIds?: number[];
}

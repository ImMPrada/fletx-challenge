import { Role } from "../../hooks/use-roles-list/types";

export interface RolesContextParams {
  roles: Role[];
  isFetchingRoles: boolean;
}

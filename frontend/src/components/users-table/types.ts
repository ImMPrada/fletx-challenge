import { User } from '../../hooks/use-users-list/types';

export interface UsersTableProps {
  users: User[];
  canCreateUser: boolean;
  canUpdateUser: boolean;
  canDeleteUser: boolean;
}

export interface HeaderProps {
  canCreateUser: boolean;
  canUpdateUser: boolean;
  canDeleteUser: boolean;
}

export interface BodyProps {
  users: User[];
  canCreateUser: boolean;
  canUpdateUser: boolean;
  canDeleteUser: boolean;
}

export interface ActionsProps {
  user: User;
  canUpdateUser: boolean;
  canDeleteUser: boolean;
}

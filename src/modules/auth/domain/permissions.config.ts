/* eslint-disable @typescript-eslint/naming-convention */
import { Permission } from './permission.model';

export const PERMISSIONS: Record<Permission, true> = {
  VIEW_DASHBOARD: true,
  VIEW_PROFILE: true,
  EDIT_PROFILE: true,
  VIEW_USERS: true,
  VIEW_REPORTS: true,
  MANAGE_USERS: true,
  ACCESS_ADMIN_PANEL: true,
};

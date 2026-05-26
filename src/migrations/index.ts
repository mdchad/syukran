import * as migration_20260526_075025_initial from './20260526_075025_initial';

export const migrations = [
  {
    up: migration_20260526_075025_initial.up,
    down: migration_20260526_075025_initial.down,
    name: '20260526_075025_initial'
  },
];

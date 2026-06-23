import * as migration_20260623_165644_initial from './20260623_165644_initial';

export const migrations = [
  {
    up: migration_20260623_165644_initial.up,
    down: migration_20260623_165644_initial.down,
    name: '20260623_165644_initial'
  },
];

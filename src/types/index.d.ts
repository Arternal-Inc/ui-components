declare module 'arternal-ui';
declare module 'arternal-ui/src/icons';
declare module 'arternal-ui/src/components';
declare module 'arternal-ui/src/utils';

export type Size = 'sm' | 'md' | 'lg'

export type Variant =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'classic'


export type VueClassAttr =
  | string
  | Record<string, boolean>
  | (string | Record<string, boolean>)[]
import classNames from 'classnames';
import { PropsOf } from '../shared/types';

export const VStack = ({ className, ...props }: PropsOf<'div'>) => (
  <div
    className={classNames(`space-y-4 max-w-4xl md:space-y-8`, className)}
    {...props}
  />
);

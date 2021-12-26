import classNames from 'classnames';
import { PropsOf } from '../shared/types';

export const VStack = ({ className, ...props }: PropsOf<'div'>) => (
  <div
    className={classNames(`space-y-8 md:space-y-16`, className)}
    {...props}
  />
);

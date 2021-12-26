import classNames from 'classnames';
import { PropsOf } from '../shared/types';

export const PageSection = ({ className, ...props }: PropsOf<'div'>) => (
  <div
    className={classNames(
      `space-y-4 max-w-4xl mt-4 md:mt-8 md:space-y-8`,
      className,
    )}
    {...props}
  />
);

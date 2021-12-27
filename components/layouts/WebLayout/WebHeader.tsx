import Link from 'next/link';
import { ROUTES } from 'shared/constants/client';
import classNames from 'classnames';
import { useRouter } from 'next/router';

interface Route {
  title: string;
  route: string;
}

const items = [
  {
    title: 'Home',
    route: ROUTES.Home,
  },
  {
    title: 'Writing',
    route: ROUTES.Writing.Home,
  },
  {
    title: 'Stuff',
    route: ROUTES.Stuff.Home,
  },
];

const HeaderLink = ({
  isActive,
  route,
  title,
}: Route & {
  isActive: boolean;
}) => (
  <Link key={route} href={route} passHref>
    <a
      className={classNames(
        'px-1 text-2xl hover:bg-brand-500 hover:text-black',
        {
          'bg-brand-500': isActive,
          'text-black': isActive,
          'text-brand-500': !isActive,
        },
      )}
    >
      {title}
    </a>
  </Link>
);

export function WebHeader() {
  const route = useRouter();

  return (
    <div className="flex items-center space-x-4">
      {items.map((item) => (
        <HeaderLink
          {...item}
          key={item.route}
          isActive={route.pathname === item.route}
        />
      ))}
    </div>
  );
}

import { Link } from 'react-router-dom';

import { ButtonTheme } from '@/components';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components';
import { navList } from '@/data/constant/navs';
import { useActiveMenu } from '@/hooks';

const HeaderComponent = () => {
  const { checkActive } = useActiveMenu();

  return (
    <div className="block fixed w-full inset-x-0 z-30 h-16 px-4 bg-slate-500 dark:bg-slate-900">
      <div className="w-full h-full flex items-center justify-between mx-auto">
        <div className="w-full flex justify-between items-center">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-5 justify-center items-center">
              {navList.map((nav) => (
                <NavigationMenuItem key={nav.key}>
                  <Link to={nav.key}>
                    <NavigationMenuLink
                      active={checkActive(nav.label as string)}
                      className={`${navigationMenuTriggerStyle()} capitalize`}
                    >
                      {nav.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <ButtonTheme />
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;

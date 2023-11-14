import { Link } from 'react-router-dom';

import { ButtonTheme } from '@/components';
import { navList } from '@/data/constant/navs';
import { useActiveMenu } from '@/hooks';

const HeaderComponent = () => {
  const { checkActive } = useActiveMenu();

  return (
    <header className="bg-secondary block fixed w-full inset-x-0 z-30 h-16 px-4 shadow-xl">
      <div className="w-full h-full flex items-center justify-between mx-auto">
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-5">
            {navList.map((item) => (
              <Link key={item.key} to={item.key}>
                <span
                  className={`uppercase font-bold text-sm px-4 py-2 ${
                    checkActive(item.key)
                      ? 'bg-slate-400 dark:bg-slate-700'
                      : 'bg-slate-300 dark:bg-slate-500'
                  }  hover:bg-slate-400  dark:hover:bg-slate-700 rounded-md transition-all duration-150`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
          <ButtonTheme />
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;

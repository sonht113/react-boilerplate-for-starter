import { ButtonTheme } from '@/components';

const HeaderComponent = () => {
  return (
    <div className="block fixed w-full inset-x-0 z-30 h-16 px-4 bg-slate-500 dark:bg-slate-800">
      <div className="w-full h-full flex items-center justify-between mx-auto">
        <div className="w-full flex justify-between items-center">
          <div>Home</div>
          <ButtonTheme />
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;

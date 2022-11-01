import useLocalStorage from 'use-local-storage';
import { ReactComponent as Sun } from '../assets/icon-sun.svg';
import { ReactComponent as Moon } from '../assets/icon-moon.svg';
import avatar from '../assets/image-avatar.jpg';

const Sidebar: React.FC = () => {
  //check browsers/os prefered theme
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  //save prefered theme in local stroage
  const [theme, setTheme] = useLocalStorage<string>(
    'theme',
    defaultDark ? 'dark' : 'light'
  );

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="bg-secondary-400 dark:bg-secondary-50 sm:h-[100vh] h-auto flex justify-between sm:flex-col sm:rounded-tr-[2rem] sm:rounded-br-[2rem] z-[3] ">
      <div className=" relative h-[8rem] w-[8rem] bg-primary-50 rounded-tr-[2rem] rounded-br-[2rem]">
        <div className="w-[3.1rem] h-[3.1rem] bg-[#fff] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] rounded-[50%] z-10">
          <div className="absolute top-[-3%] left-[50%] transform translate-x-[-50%] border-solid border-[1.5rem] border-primary-50 border-l-transparent border-r-transparent border-b-transparent z-20  " />
        </div>
        <div className="h-[4rem] w-[8rem] bg-primary-100 absolute bottom-0 left-0 rounded-tl-[2rem] rounded-br-[2rem]" />
      </div>

      <div className="flex sm:flex-col ">
        <div
          className=" h-[8rem] w-[8rem] flex items-center justify-center "
          onClick={() => toggleTheme()}
        >
          {theme === 'dark' ? (
            <Sun className="cursor-pointer" />
          ) : (
            <Moon className="cursor-pointer" />
          )}
        </div>
        <div className="px- h-[8rem] w-[8rem] flex items-center justify-center border-l-[0.1rem] border-[#494E6E] sm:border-l-0 sm:border-t-[0.1rem] ">
          <img className="w-[3.2rem] rounded-[50%]" src={avatar} alt="avatar" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

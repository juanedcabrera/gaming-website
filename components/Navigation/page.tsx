'use client';
import { useEffect, useState } from 'react';
import { Menubar, MenubarMenu, MenubarShortcut } from '@/components/ui/menubar';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuContent,
} from '@/components/ui/navigation-menu';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navigation = () => {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [avatar, setAvatar] = useState<string>('');
  const [name, setName] = useState<string>('');
  const token = localStorage.getItem('token');
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  const handleSearchSubmit = async (event: any) => {
    event.preventDefault();
    router.push(`/games/search/${encodeURIComponent(searchValue)}`);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    router.push('/login');
    setIsMenuOpen(false);
  };

  const getAvatar = () => {
    const decodedToken = jwt.decode(token as string);
    const userId =
      typeof decodedToken === 'object' && decodedToken !== null
        ? decodedToken.id
        : '';
    const fetchUserAvatar = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/api-v1/users/profile/${userId}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch user avatar');
        }
        const data = await response.json();
        setAvatar(data.user.avatar);
        setName(data.user.name);
      } catch (error) {
        console.error('Error fetching user avatar:', error);
      }
    };
    fetchUserAvatar();
  };

  useEffect(() => {
    if (token) {
      getAvatar();
    }
  }, [token]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Menubar className="flex justify-between items-center bg-gray-900 border-gray-900 rounded-md-gray-900 h-16">
      <div className="flex items-center space-x-4">
        <a href="/">
          <img
            src="/logo.png"
            alt="Logo"
            className="object-contain h-10 w-10"
          />
        </a>
        <div className="hidden md:flex space-x-4">
          <NavigationMenu>
            <NavigationMenuLink href="/" className="text-white text-sm px-3">
              Home
            </NavigationMenuLink>

            {token ? (
              <>
                <NavigationMenuLink
                  onClick={handleSignOut}
                  className="text-white text-sm px-3 cursor-pointer"
                >
                  Sign Out
                </NavigationMenuLink>

                <NavigationMenuLink
                  href="/games"
                  className="text-white text-sm px-3"
                >
                  Games
                </NavigationMenuLink>
              </>
            ) : (
              <>
                <NavigationMenuLink
                  href="/login"
                  className="text-white text-sm px-3"
                >
                  Login
                </NavigationMenuLink>

                <NavigationMenuLink
                  href="/sign-up"
                  className="text-white text-sm px-3"
                >
                  Sign Up
                </NavigationMenuLink>
                <NavigationMenuLink
                  href="/games"
                  className="text-white text-sm px-3"
                >
                  Games
                </NavigationMenuLink>
              </>
            )}
          </NavigationMenu>
        </div>
      </div>
      <div className="md:flex items-center space-x-2">
        <form onSubmit={handleSearchSubmit}>
          <Input
            type="search"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>
        {/* Desktop Avatar */}
        {token && ( 
          <a href="/profile" className="hidden md:block">
            <Avatar className='w-10 h-12'>
              <AvatarImage src={avatar} alt="Avatar" />
              <AvatarFallback>{name}</AvatarFallback>
            </Avatar>
          </a>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <NavigationMenu>
          <NavigationMenuItem>
            {/* Mobile Menu Button */}
            <NavigationMenuTrigger
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none text-black"
            >
              Menu
            </NavigationMenuTrigger>

            {/* Mobile Menu Content */}
            <NavigationMenuContent
              className={`flex flex-col space-y-2 p-2 ${
                isMenuOpen ? 'block' : 'hidden'
              }`}
            >
              {/* Mobile Avatar */}
              {token && ( 
                <div className="mb-4 flex justify-center">
                  <a href="/profile">
                    <Avatar className="w-10 h-12">
                      <AvatarImage src={avatar} alt="Avatar" />
                      <AvatarFallback>{name}</AvatarFallback>
                    </Avatar>
                  </a>
                </div>
              )}

              {/* Mobile Menu Links */}
              <div>
                <NavigationMenuLink href="/" onClick={toggleMenu}>
                  Home
                </NavigationMenuLink>
              </div>
              {token ? (
                <>
                  <div>
                    <NavigationMenuLink
                      href="/sign-out"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </NavigationMenuLink>
                  </div>
                  <div>
                    <NavigationMenuLink href="/games" onClick={toggleMenu}>
                      Games
                    </NavigationMenuLink>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <NavigationMenuLink href="/login" onClick={toggleMenu}>
                      Login
                    </NavigationMenuLink>
                  </div>
                  <div>
                    <NavigationMenuLink href="/sign-up" onClick={toggleMenu}>
                      Sign Up
                    </NavigationMenuLink>
                  </div>
                </>
              )}
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenu>
      </div>
    </Menubar>
  );
};

export default Navigation;

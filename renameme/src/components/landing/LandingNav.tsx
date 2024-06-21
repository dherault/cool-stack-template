import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'

import useUser from '~hooks/user/useUser'

import Logo from '~components/common/Logo'
import { Button } from '~components/ui/Button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from '~components/ui/Drawer'

function LandingNav() {
  const { user } = useUser()

  return (
    <div className="py-4 px-4 sticky top-0 flex items-center gap-4 bg-white border-b">
      <Link
        to="/"
        className="flex items-center text-blue gap-4 relative"
      >
        <Logo className="h-[40px]" />
        <div className="text-3xl font-bold">
          Rename me
        </div>
      </Link>
      <div className="-ml-4 grow" />
      <div className="hidden md:flex items-center gap-4">
        <Link to="/product">
          <div className="px-4 py-2 font-medium rounded hover:bg-neutral-50 text-neutral-800">
            Product
          </div>
        </Link>
        <Link to="/pricing">
          <div className="px-4 py-2 font-medium rounded hover:bg-neutral-50 text-neutral-800">
            Pricing
          </div>
        </Link>
        <Link to="/community">
          <div className="px-4 py-2 font-medium rounded hover:bg-neutral-50 text-neutral-800">
            Community
          </div>
        </Link>
        <a
          href="https://blog.renameme.com"
          target="_blank"
          rel="noreferrer noopener"
        >
          <div className="px-4 py-2 font-medium rounded hover:bg-neutral-50 text-neutral-800">
            Blog
          </div>
        </a>
        <Link to="/~">
          <Button>
            {user ? 'Go to project' : 'Get started'}
          </Button>
        </Link>
      </div>
      <div className="flex md:hidden items-center justify-center">
        <Drawer direction="right">
          <DrawerTrigger>
            <Menu className="w-6 h-6" />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerClose className="w-min">
                <Button
                  variant="ghost"
                  size="icon"
                  className="-ml-1"
                >
                  <X />
                </Button>
              </DrawerClose>
              <div className="flex flex-col items-start gap-2">
                <Link to="/product">
                  <DrawerClose>
                    <div className="p-2 font-medium rounded hover:bg-neutral-50 text-neutral-800">
                      Product
                    </div>
                  </DrawerClose>
                </Link>
                <Link to="/pricing">
                  <DrawerClose>
                    <div className="p-2 font-medium rounded hover:bg-neutral-50 text-neutral-800">
                      Pricing
                    </div>
                  </DrawerClose>
                </Link>
                <Link to="/community">
                  <DrawerClose>
                    <div className="p-2 font-medium rounded hover:bg-neutral-50 text-neutral-800">
                      Community
                    </div>
                  </DrawerClose>
                </Link>
                <a
                  href="https://blog.renameme.com"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <DrawerClose>
                    <div className="p-2 font-medium rounded hover:bg-neutral-50 text-neutral-800">
                      Blog
                    </div>
                  </DrawerClose>
                </a>
                <Link to="/~">
                  <DrawerClose>
                    <Button>
                      {user ? 'Go to project' : 'Get started'}
                    </Button>
                  </DrawerClose>
                </Link>
              </div>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  )
}

export default LandingNav

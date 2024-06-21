import { LogOut, User } from 'lucide-react'
import { Link } from 'react-router-dom'

import useUser from '~hooks/user/useUser'
import useUserInitials from '~hooks/user/useUserInitials'

import { Avatar, AvatarFallback } from '~components/ui/Avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~components/ui/DropdownMenu'

function UserDropdown() {
  const { user, signOut } = useUser()

  const initials = useUserInitials()

  if (!user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer select-none">
          {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
          <AvatarFallback>
            {initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent alignOffset={16}>
        <Link to="/account">
          <DropdownMenuItem>
            <User className="mr-2 w-4 h-4" />
            Account
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={signOut}
          className="text-red-500"
        >
          <LogOut className="mr-2 w-4 h-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdown

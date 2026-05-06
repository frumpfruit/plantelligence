import { Bell, Search, Menu } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

interface TopbarProps {
  onMenuClick: () => void
}

export function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header className="fixed left-0 lg:left-[240px] right-0 top-0 z-30 flex h-[80px] items-center justify-between border-b bg-background px-4 md:px-8 transition-all duration-300">
      <div className="flex items-center gap-4 flex-1">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
          <Menu className="h-6 w-6" />
        </Button>
        <div className="flex w-full max-w-md items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Cari tanaman, device, atau laporan..." 
            className="h-9 w-full border-none bg-muted shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-4 ml-2">
        <button className="relative rounded-full p-2 hover:bg-muted transition-colors">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-destructive"></span>
        </button>
        <div className="flex items-center gap-3 border-l pl-4">
          <div className="hidden md:flex flex-col items-end text-sm">
            <span className="font-medium leading-none">Admin Farmer</span>
            <span className="text-xs text-muted-foreground mt-1">Farm Manager</span>
          </div>
          <Avatar className="h-8 w-8 md:h-10 md:w-10">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" />
            <AvatarFallback>AF</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}

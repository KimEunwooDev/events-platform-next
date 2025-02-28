import { CalendarDays, LayoutGrid, LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/supabase";
import { toast } from "sonner";

export default function ProfileDropdown() {
  const router = useRouter();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast("Logged out");
    router.push("/auth/login");
  };
  const moveToPage = (value: string) => {
    router.push(`/${value}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            onClick={() => router.push("/admin/manage")}
            className="cursor-pointer"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {/* <span>{loggedInUser.email}</span> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={moveToPage("admin/manage")}>
          <LayoutGrid />
          <span>Manage events</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CalendarDays />
          <span>My event</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

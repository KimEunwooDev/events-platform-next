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

export default function ProfileDropdown({ loggedInUser }: any) {
  const router = useRouter();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast("Logged out");
    setTimeout(() => {
      router.push("/");
    }, 100);
  };
  const moveToPage = (value: string) => {
    router.push(`/${value}`);
  };
  console.log(loggedInUser);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex justify-center items-center gap-2 rounded-md  ">
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            className="cursor-pointer"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="text-sm">{loggedInUser.email}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem>
          <User />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => moveToPage("admin/manage")}>
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

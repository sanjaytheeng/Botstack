import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ChevronDownIcon, CreditCardIcon, User, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { useRouter } from "next/navigation";

const DashboardUserButton = () => {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();
  
  const onLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  if (isPending || !data?.user) {
    return null;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden">
        {data.user.image ? (
          <Avatar>
            <AvatarImage
              src={data.user.image}
              alt={data.user.name || "User Avatar"}
            />
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={data.user.name}
            variant="initials"
            className="size-9 mr-3"
          />
        )}
        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate w-full">
            {data.user.name}
          </p>
          <p className="text-xs text-muted-foreground truncate w-full">
            {data.user.email}
          </p>
        </div>
        <ChevronDownIcon className="size-4 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="text-sm font-semibold">
          Account
        </DropdownMenuLabel>
        <DropdownMenuItem className="flex items-center justify-between">
          <a href="/profile">Profile</a>
          <User className="size-4 ml-2 inline-block" />
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center justify-between">
          <a href="/settings">Settings</a>
          <Settings className="size-4 ml-2 inline-block" />
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center justify-between">
          <a href="/billing">Billing</a>
          <CreditCardIcon className="size-4 ml-2 inline-block" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout} className="cursor-pointer">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardUserButton;

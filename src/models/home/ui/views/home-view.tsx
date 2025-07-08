"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const HomeView = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  if (session === null) {
    return <p>Loading</p>;
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p>Logged in as {session.user.name}</p>
      <Button
        className="flex flex-col p-4 gap-y-4"
        onClick={() =>
          authClient.signOut({
            fetchOptions: { onSuccess: () => router.push("/sign-in") },
          })
        }
      >
        Logout
      </Button>
    </div>
  );
};

export default HomeView;

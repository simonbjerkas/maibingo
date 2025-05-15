"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Button } from "./ui/button";
import Link from "next/link";

export function MembersList({
  onOpenChange,
}: {
  onOpenChange?: (open: boolean) => void;
}) {
  const members = useQuery(api.users.getAllUsers);

  if (members === undefined || members === null) {
    return <div className="text-sm text-gray-500">Laster...</div>;
  }

  return (
    <ul className="space-y-1 mx-4">
      {members.map((member) => (
        <li key={member._id}>
          <Button
            variant="outline"
            className="w-full"
            onClick={async () => {
              onOpenChange?.(false);
            }}
          >
            <Link href={`/user/${member._id}`}>{member.name}</Link>
          </Button>
        </li>
      ))}
    </ul>
  );
}

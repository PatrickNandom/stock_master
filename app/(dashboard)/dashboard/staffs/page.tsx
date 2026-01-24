"use client";

import { useState } from "react";
import { User } from "@/app/types";
import { MOCK_STAFFS } from "@/app/data/data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Shield, UserCog } from "lucide-react";
import Link from "next/link";

const StaffsPage = () => {
  const [staffs, setStaffs] = useState<User[]>(MOCK_STAFFS);
  const [selectedStaff, setSelectedStaff] = useState<User | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<"promote" | "demote" | null>(
    null,
  );
  const router = useRouter();

  const handleRoleChange = (staff: User, newRole: "ADMIN" | "STAFF") => {
    setSelectedStaff(staff);
    setActionType(newRole === "ADMIN" ? "promote" : "demote");
    setDialogOpen(true);
  };

  const confirmRoleChange = () => {
    if (!selectedStaff || !actionType) return;

    const newRole = actionType === "promote" ? "ADMIN" : "STAFF";

    setStaffs(
      staffs.map((staff) =>
        staff.id === selectedStaff.id ? { ...staff, role: newRole } : staff,
      ),
    );

    setDialogOpen(false);
    setSelectedStaff(null);
    setActionType(null);
  };

  return (
    <div className="container mx-auto py-4">
      <div className="flex items-baseline justify-between gap-10 mb-4">
        <Image
          src="/auth_left-arrow.svg"
          className="hidden sm:block cursor-pointer self-start"
          alt="Back"
          width={20}
          height={20}
          priority
          onClick={() => router.back()}
        />
        <Link
          href="/dashboard/staffs/add-staff"
          className="text-xl text-[#E67E5D] font-bold flex"
        >
          <span className="bg-[#E67E5D] flex items-center justify-center rounded-full mr-2 w-6 h-6">
            <Image
              src="/dashboard_add_icon.svg"
              alt="add-icon"
              height={20}
              width={20}
            />
          </span>{" "}
          Add Staff
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-linear-to-r from-[#F7AB97] to-[#071548]">
            <TableRow>
              <TableHead className="text-white">Name</TableHead>
              <TableHead className="text-white">Email</TableHead>
              <TableHead className="text-white">Role</TableHead>
              <TableHead className="text-right text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffs.map((staff) => {
              const { id, name, email, role } = staff;

              return (
                <TableRow key={id}>
                  <TableCell className="font-medium">
                    {name || "No name"}
                  </TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell>
                    <Badge variant={role === "ADMIN" ? "default" : "secondary"}>
                      {role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {role === "STAFF" ? (
                          <DropdownMenuItem
                            onClick={() => handleRoleChange(staff, "ADMIN")}
                          >
                            <Shield className="mr-2 h-4 w-4" />
                            Promote to Admin
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            onClick={() => handleRoleChange(staff, "STAFF")}
                          >
                            <UserCog className="mr-2 h-4 w-4" />
                            Demote to Staff
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-[#F7AB97]">
              {actionType === "promote"
                ? "Promote to Admin"
                : "Demote to Staff"}
            </DialogTitle>
            <DialogDescription>
              {`Are you sure you want to change ${selectedStaff?.name || selectedStaff?.email}'s role to ${actionType === "promote" ? "ADMIN" : "STAFF"}?`}
              {actionType === "promote" ? "ADMIN" : "STAFF"}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={confirmRoleChange}
              className="bg-linear-to-r from-[#F7AB97] to-[#071548]"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StaffsPage;

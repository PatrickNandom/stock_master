"use client";

import { useState } from "react";
import { User } from "@/app/types";
import { MOCK_STAFFS } from "@/app/data/data";
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

export default function StaffsPage() {
  const [staffs, setStaffs] = useState<User[]>(MOCK_STAFFS);
  const [selectedStaff, setSelectedStaff] = useState<User | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<"promote" | "demote" | null>(
    null,
  );

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
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Staff Management</h1>
        <p className="text-gray-600">Manage your staff roles and permissions</p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
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
            <DialogTitle>
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
            <Button onClick={confirmRoleChange}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

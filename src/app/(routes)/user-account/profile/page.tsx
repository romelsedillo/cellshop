import UserAccountSideNav from "@/components/layout/UserAccountSideNav";
import React from "react";
import { SquarePen, UserRound } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Calendar from "@/components/layout/Calendar";

const ProfilePage = () => {
  return (
    <div className="py-8 px-20">
      <div className=" grid grid-cols-12">
        <div className="flex flex-col col-span-2">
          <div>
            <div className="flex items-center justify-center bg-green-300 h-20 w-20 rounded-full mr-2">
              P
            </div>
            <h2 className="font-semibold">Romel Sedillo</h2>
          </div>
        </div>
        <div className=" shadow-lg col-span-10 p-4">
          <h2 className="text-2xl font-medium mb-4">Account Settings</h2>
          <div className="flex gap-8">
            <form className="flex flex-col items-start gap-4 pl-4">
              <div className="flex gap-4">
                <div className="flex gap-1">
                  <Label>Name:</Label>
                  <Input type="text" placeholder="Romel" />
                </div>
                <div className="flex gap-1">
                  <Label>Surname:</Label>
                  <Input type="text" placeholder="Sedillo" />
                </div>
              </div>
              <div className="flex gap-1">
                <Label>Email:</Label>
                <Input type="email" placeholder="Email" />
              </div>
              <div className="flex items-center gap-2">
                <p>Gender:</p>
                <div className="flex items-center gap-1">
                  <Input type="radio" value="male" id="male" name="gender" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center gap-1">
                  <Input
                    type="radio"
                    value="female"
                    id="female"
                    name="gender"
                  />
                  <Label htmlFor="female">Female</Label>
                </div>
              </div>
              <div className="flex gap-1">
                <Label>Phone:</Label>
                <Input type="text" placeholder="09123456789" />
              </div>
              <div className="flex gap-1">
                <Label>Date of Birth:</Label>
                <Calendar />
              </div>
              <Button>Save</Button>
            </form>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center bg-gray-100 h-20 w-20 rounded-full mb-2">
                <UserRound className="w-8 text-gray-500" />
              </div>
              <Button>Select Image</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

import React from "react";
import { UserRound } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Calendar from "@/components/layout/Calendar";

const ProfilePage = () => {
  return (
    <div className="">
      <h2 className="text-4xl font-semibold mb-6">Account Settings</h2>
      <div className="grid grid-cols-12">
        <form className="flex flex-col items-start gap-4 col-span-7 pl-4">
          <div className="flex gap-4">
            <div className="flex flex-col">
              <Label className="mb-2">Name:</Label>
              <Input type="text" placeholder="Romel" />
            </div>
            <div className="flex flex-col">
              <Label className="mb-2">Surname:</Label>
              <Input type="text" placeholder="Sedillo" />
            </div>
          </div>
          <div className="flex flex-col">
            <Label className="mb-2">Email:</Label>
            <Input type="email" placeholder="Email" />
          </div>
          <div className="flex items-center">
            <Label className="mr-2">Gender:</Label>
            <div className="flex items-center gap-1 mr-2">
              <Input
                type="radio"
                value="male"
                id="male"
                name="gender"
                className="cursor-pointer"
              />
              <Label htmlFor="male" className="cursor-pointer">
                Male
              </Label>
            </div>
            <div className="flex items-center gap-1">
              <Input
                type="radio"
                value="female"
                id="female"
                name="gender"
                className="cursor-pointer"
              />
              <Label htmlFor="female" className="cursor-pointer">
                Female
              </Label>
            </div>
          </div>
          <div className="flex flex-col">
            <Label className="mb-2">Phone:</Label>
            <Input type="text" placeholder="09123456789" />
          </div>
          <div className="flex flex-col">
            <Label className="mb-2">Date of Birth:</Label>
            <Calendar />
          </div>
          <Button className="cursor-pointer">Save</Button>
        </form>

        <div className="col-span-5 flex flex-col items-center">
          <div className="flex items-center justify-center bg-gray-100 h-40 w-40 rounded-full mb-4">
            <UserRound className="w-8 text-gray-500" />
          </div>
          <Button>Select Image</Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

import React from "react";
import Link from "next/link";

const UserAccountSideNav = () => {
  return (
    <div className="flex flex-col col-span-3">
      <div className="flex flex-col">
        <Link href="/user-account/profile" className="hover:underline">
          Profile
        </Link>
        <Link href="/user-account/orders" className="hover:underline">
          Orders
        </Link>
        <Link href="/user-account/favorites" className="hover:underline">
          Favorites
        </Link>
      </div>
    </div>
  );
};

export default UserAccountSideNav;

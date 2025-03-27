import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./SidebarSkeleton";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import defaultAvatar from "../../public/avatar1.png";

const Sidebar = () => {
  const { getUsers, users, setSelectedUser, selectedUser, isUsersLoading } = useChatStore();

  const {onlineUsers} = useAuthStore();

  const [searchQuery, setSearchQuery] = useState("");
  const filteredUsers = users.filter((u) =>
    u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) //filter users based on search query
  );

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) {
    return <SidebarSkeleton />;
  }

  return (
    <aside className="h-full w-40 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5 flex">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block" />
        </div>
        {/* todo: search bar */}

        <input
          type="text"
          placeholder="Search users..."
          className="input input-bordered w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

      </div>
      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((u) => (
            <button
              key={u._id}
              onClick={() => setSelectedUser(u)}
              className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${
                selectedUser?._id === u._id ? "bg-base-300 ring-1 ring-base-300" : ""
              }`}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={u.profilePic || defaultAvatar}
                  alt={u.fullName}
                  className="size-12 object-cover rounded-full"
                />
                {onlineUsers.includes(u._id) && (
                  <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900"></span>
                )}
              </div>

              {/* User Info (Visible Only on Large Screens) */}
              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">{u.fullName}</div>
                <div className="text-sm text-zinc-400">
                  {onlineUsers.includes(u._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-5">No users found</p>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

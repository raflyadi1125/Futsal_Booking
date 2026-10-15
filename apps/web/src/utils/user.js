export function getUserName(user) {
  return user?.name ?? user?.nama ?? user?.fullName ?? user?.email ?? "Pengguna";
}

export function getInitials(name) {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "U"
  );
}
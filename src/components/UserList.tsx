// import React, { useEffect, useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from "./shadcn/components/ui/card";
// import { Avatar, AvatarImage, AvatarFallback } from "./shadcn/components/ui/avatar";
// import { Button } from './shadcn/components/ui/button';
// import { fetchUsers } from '../services/api'; 
// import { User } from './../types';

// const UserList: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);

//   useEffect(() => {
//     const loadUsers = async () => {
//       try {
//         const fetchedUsers = await fetchUsers();
//         setUsers(fetchedUsers);
//       } catch (error) {
//         console.error('Failed to fetch users:', error);
//       }
//     };

//     loadUsers();
//   }, []);

//   return (
//     <Card className="mt-8">
//       <CardHeader>
//         <CardTitle>Team Members</CardTitle>
//         <p className="text-sm text-muted-foreground">
//           Invite your team members to collaborate.
//         </p>
//       </CardHeader>
//       <CardContent>
//         {users.map((user) => (
//           <div key={user.id} className="flex items-center justify-between py-2">
//             <div className="flex items-center space-x-4">
//               <Avatar>
//                 <AvatarImage src={""} alt={""} />
//                 <AvatarFallback>{""}</AvatarFallback>
//               </Avatar>
//               <div>
//                 <p className="font-medium">{user.username}</p>
//                 <p className="text-md text-muted-foreground">{user.email}</p>
//               </div>
//             </div>
//             <Button>
//                 Send Friend Request
//             </Button>
//           </div>
//         ))}
//       </CardContent>
//     </Card>
//   );
// };

// export default UserList;
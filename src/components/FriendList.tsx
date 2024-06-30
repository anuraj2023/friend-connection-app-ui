import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent } from './shadcn/components/ui/card'
import { Input } from './shadcn/components/ui/input'
import { RootState } from '../store/store';
import { FriendStatus } from '../types';

const FriendList: React.FC = () => {
  const friendStatuses = useSelector((state: RootState) => state.friends.statuses);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStatuses, setFilteredStatuses] = useState<FriendStatus[]>([]);

  useEffect(() => {
    setFilteredStatuses(
      friendStatuses.filter((status) =>
        status.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [friendStatuses, searchTerm]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Friend Status Updates</h2>
      <Input
        type="text"
        placeholder="Search friends..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="h-96 overflow-y-auto">
        {filteredStatuses.map((status) => (
          <Card key={status.id} className="mb-2">
            <CardContent className="p-4">
              <h3 className="font-bold">{status.username}</h3>
              <p>{status.status}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FriendList;
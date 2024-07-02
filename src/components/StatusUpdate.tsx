// import React, { useState } from 'react';
// import { Button } from './shadcn/components/ui/button';
// import { Textarea } from './shadcn/components/ui/textarea';
// import { Alert, AlertDescription, AlertTitle } from './shadcn/components/ui/alert';
// import { updateStatus } from '../services/api';
// import { useSelector } from 'react-redux';
// import { RootState } from '../store/store';

// const StatusUpdate: React.FC = () => {
//   const [status, setStatus] = useState('');
//   const [alertMessage, setAlertMessage] = useState('');
//   const [showAlert, setShowAlert] = useState(false);

//   const handleStatusUpdate = async () => {
//     try {
//       const authState = useSelector((state: RootState) => state.auth);
//       const loggedInUserId = authState.loggedInUserId;
  
//       if (!loggedInUserId) {
//         setAlertMessage('User not logged in');
//         setShowAlert(true);
//         return;
//       }
  
//       await updateStatus(status, loggedInUserId);
//       setStatus('');
//       setAlertMessage('Status updated successfully');
//       setShowAlert(true);
//     } catch (error) {
//       console.error('Status update failed:', error);
//       setAlertMessage('Status update failed');
//       setShowAlert(true); 
//     }
//     setTimeout(() => setShowAlert(false), 1000);
//   };

//   return (
//     <div className="space-y-4">
//       <h2 className="text-2xl font-bold">Update Your Status</h2>
//       {showAlert && (
//           <Alert className="mb-4" variant="default">
//             <AlertTitle>{alertMessage}</AlertTitle>
//             <AlertDescription>{alertMessage}</AlertDescription>
//           </Alert>
//       )}
//       <Textarea
//         placeholder="What's on your mind?"
//         value={status}
//         onChange={(e) => setStatus(e.target.value)}
//       />
//       <div className="flex justify-end">
//         <Button onClick={handleStatusUpdate}>Update Status</Button>
//       </div>
//     </div>
//   );
// };

// export default StatusUpdate;

import React, { useState } from 'react';
import { Button } from './shadcn/components/ui/button';
import { Textarea } from './shadcn/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from './shadcn/components/ui/alert';
import { updateStatus } from '../services/api';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const StatusUpdate: React.FC = () => {
  const [status, setStatus] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  // Move the useSelector hook to the top level of the component
  const authState = useSelector((state: RootState) => state.auth);

  const handleStatusUpdate = async () => {
    try {
      const loggedInUserId = authState.loggedInUser?.id;
  
      if (!loggedInUserId) {
        setAlertMessage('User not logged in');
        setShowAlert(true);
        return;
      }
  
      await updateStatus(status, loggedInUserId);
      setStatus('');
      setAlertMessage('Status updated successfully');
      setShowAlert(true);
    } catch (error) {
      console.error('Status update failed:', error);
      setAlertMessage('Status update failed');
      setShowAlert(true); 
    }
    setTimeout(() => setShowAlert(false), 1000);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Update Your Status</h2>
      {showAlert && (
          <Alert className="mb-4" variant="default">
            <AlertTitle>{alertMessage}</AlertTitle>
            <AlertDescription>{alertMessage}</AlertDescription>
          </Alert>
      )}
      <Textarea
        placeholder="What's on your mind?"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <div className="flex justify-end">
        <Button onClick={handleStatusUpdate}>Update Status</Button>
      </div>
    </div>
  );
};

export default StatusUpdate;

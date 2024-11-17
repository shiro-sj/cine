export default function RespondRequest({ senderUsername, receiverUserName }) {
    const handleAccept = async () => {

      try {
        //accept the friend request
        const response = await fetch(`/api/friends`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            action: 'acceptRequest',
            requestSender: senderUsername, 
            requestResponder: receiverUserName, 
             }),
        });
        
        if (response.ok) {
          console.log('Friend request accepted');
        } else {
          const errorData = await response.json();
          console.error('Error accepting request:', errorData.error);
        }
      } catch (e) {
        console.log(e);
      }
    };

    //reject the request
    const handleReject = async () => {
      console.log('rejecting');
      try {
        const response = await fetch(`/api/friends`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            action: 'declineRequest',
            requestSender: senderUsername, 
            requestResponder: receiverUserName }),
        });
        if (response.ok) {
          console.log('Friend request rejected');
        } else {
          const errorData = await response.json();
          console.error('Error rejecting request:', errorData.error);
        }
      } catch (e) {
        console.log(e);
      }
    };

    
    return (
      <div>
        <p>Friend request from user: {senderUsername}</p>
        <button onClick={handleAccept}>Accept</button>
        <button onClick={handleReject}>Reject</button>
      </div>
    );
  }
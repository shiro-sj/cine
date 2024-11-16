export default function RespondRequest({ senderUsername, receiverUserName }) {
    const handleAccept = async () => {

      try {
        //accept the friend request
        const response = await fetch(`/api/friends/respondRequest`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ requestSender: senderUsername, requestResponder: receiverUserName, action: 'ACCEPT' }),
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
        const response = await fetch(`/api/friends/respondRequest`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ requestSender: senderUsername, requestResponder: receiverUserName, action: 'REJECT' }),
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
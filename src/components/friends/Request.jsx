import { useState } from "react";
export default function Request({ sessionUserId, requestUserId }) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

//   Send Friend Request 
  const handleClick = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    
    //if one of the users does not exist
    if (!sessionUserId || !requestUserId) {
      setError('Both sender and receiver IDs must be provided.');
      setLoading(false);
      return;
    }

    try {
      //make the friend request for the current user and the sent user
      const response = await fetch(`/api/friends/sendRequest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderName: sessionUserId, receiverName: requestUserId }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage('Friend request sent successfully!');
      } else {
        setError(data.error || 'Error sending friend request');
      }

    } catch (e) {
      console.error('Error sending friend request:', e);
      setError('Error sending friend request');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      {loading ? <p>Sending...</p> : <button onClick={handleClick}>Add friend</button>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
}
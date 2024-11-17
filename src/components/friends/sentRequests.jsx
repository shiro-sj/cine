export default function SentFriendRequest({ request }) {
    
    const handleDelete = async() =>{
        try{
            //getting rid of the request
            const response = await fetch(`/api/friends/respondRequest`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    action: 'deleteRequest' ,
                    requestSender: request.senderUserName, 
                    requestResponder: request.receiverUserName
                    }),
                });
            if (response.ok) {
                console.log('Friend request rejected');
            } else {
                const errorData = await response.json();
                console.error('Error rejecting request:', errorData.error);
            }  
        }catch(error){
            console.log('there was an error ', error)
        }
    }

    return (
      <div>
        <span className="text-xl font-medium">To: {request.receiverUserName}</span>
        <button onClick={handleDelete}>delete</button>
      </div>
    );
}
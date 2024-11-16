import { useState } from 'react';
import RespondRequest from './respondRequest';
import SentFriendRequest from './sentFriendRequest'

export default function FriendRequestList({ receivedRequests, sentRequests }) {
    const [showOverlay, setShowOverlay] = useState(false);
    const handleOverlayToggle = () => setShowOverlay(!showOverlay);

    return (
        <div className="text-white">
            {/* Display number of received requests and trigger overlay */}
            <div 
                onClick={handleOverlayToggle} 
                className="cursor-pointer flex items-center justify-start space-x-1 text-white mb-4"
            >
                <p className='text-xs'>{receivedRequests.length} Friend Requests</p>
            </div>

            {/* Overlay */}
            {showOverlay && (
                <div className="fixed inset-0 bg-[#121212] bg-opacity-95 flex justify-center items-center z-50">
                    <div className="bg-[#1E1E1E] p-5 rounded-lg w-80 text-white">
                        <h2 className="text-lg font-bold mb-4">Received Friend Requests</h2>
                        <ul>
                            {receivedRequests.length > 0 ? (
                                receivedRequests.map((request) => (
                                    <li key={`${request.id}-${request.senderUsername}`} className="mb-2">
                                        <span className="text-xl font-medium">{request.senderUserName}</span> {/* Larger Username */}
                                        <RespondRequest 
                                            senderUsername={request.senderUserName} 
                                            receiverUserName={request.receiverUserName} 
                                        />
                                    </li>
                                ))
                            ) : (
                                <p>No received friend requests.</p>
                            )}
                        </ul>
                        <h3 className="text-lg font-bold mt-4">Sent Requests</h3>
                        <ul>
                            {sentRequests.map((request) => (
                                <li key={request.id} className="mb-2">
                                    <SentFriendRequest request = {request}/>
                                </li>
                            ))
                            }
                        </ul>
                        <button 
                            onClick={handleOverlayToggle} 
                            className="mt-4 bg-blue-700 text-white py-1 px-4 rounded hover:bg-blue-600 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

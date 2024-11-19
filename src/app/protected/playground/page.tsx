'use client'
import Ticket from '../../../components/tickets';

export default function Page() {

    return (
        <div className='main-div'>
          <Ticket/>
        </div>
    );
}

// CSS Styles
// const styles = {
//     mainContainer: {
//         display: 'flex',
//         justifyContent: 'center', // Center horizontally
//         alignItems: 'center',     // Center vertically
//         height: '100vh',
//         padding: '100px'        // Full viewport height
//     },
//     contentContainer: {
//         display: 'flex',
//         flexDirection: 'column', // Stack elements vertically
//         alignItems: 'center',    // Center content horizontally
//         marginRight: '20px',     // Space between ticket and buttons
//     },
//     ticketContainer: {
//         backgroundColor: "#000000",
//         marginBottom: '20px',    // Space between ticket and download button
//     },
//     buttonContainer: {
//         display: 'flex',
//         flexDirection: 'column', // Stack buttons vertically
//         alignItems: 'flex-start', // Align buttons to the left of the container (right side of the ticket)
//         justifyContent: 'center', // Center vertically within the button container
//     },
//     button: {
//         marginBottom: '10px',     // Space between buttons
//     },
//     downloadButton: {
//         marginTop: '10px',        // Space between ticket and download button
//     }
// };

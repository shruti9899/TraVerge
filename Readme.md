# TraVerge

Project contains several APIs for a bus ticket booking system. Here, it is taken static for 1 bus containing 40 seats and all tickets get open at the project initialisation.
Also, there is role based authentication. 
Currently there are two roles:-

 1. User (have privileges to read and update tickets)
 2. Admin (have privileges to read, update and reset tickets)

## APIs

 - User/ Admin Sign up 
 - User/Admin Login
 - View Tickets baed on status (booked or unbooked)
 - View Passenger details of any booked ticket
 - Update the Ticket status + add user details (if unbooked) / update the passenger details (if booked)
 - Reset all tickets (Only Admin)

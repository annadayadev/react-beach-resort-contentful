//There are 2 options for this, the first one is the code that is commented out below, and the second is creating a higher order component on the context page at the bottom, and then we have a shorter code here below.

import React from "react";
import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";

//this is from the context - a higher order component we just created
import { withRoomConsumer } from "../context";
import Loading from "./Loading";

function RoomsContainer({ context }) {
  const { loading, sortedRooms, rooms } = context;
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      {/* Hello From Room Rooms Container */}
      <RoomsFilter rooms={rooms} />
      <RoomsList rooms={sortedRooms} />
    </>
  );
}

export default withRoomConsumer(RoomsContainer);

// import React from "react";
// import RoomsFilter from "./RoomsFilter";
// import RoomsList from "./RoomsList";
// import { RoomConsumer } from "../context";
// import Loading from "./Loading";

// export default function RoomsContainer() {
//   return (
//     <RoomConsumer>
// {/* this is a function, the arg is whatever it renders on the context.js  */}
//       {value => {
// //we can see in the console that we now have an access to our state - so now we can destructure it.
// //console.log(value);
//         const { loading, sortedRooms, rooms } = value;

//         if (loading) {
//           return <Loading />;
//         }
// //don't do a function inside the return, its against the rules of jsx, so do it above the return
//         return (
//           <div>
//             Hello From Room Rooms Container
//             <RoomsFilter rooms={rooms} />
//             <RoomsList rooms={sortedRooms} />
//           </div>
//         );
//       }}
//     </RoomConsumer>
//   );
// }

import React, { Component } from "react";
import { RoomContext } from "../context";
import Loading from "./Loading";
import Room from "./Room";
import Title from "./Title";

//We are using context API, with context and provider

export default class componentName extends Component {
  //its important that we passed here not the consumer, but the whole context - set equal to the contextType - and then we have an acccess to that context using this.context
  static contextType = RoomContext;

  render() {
    // const value = this.context;
    //we can also do this instead now that we have our object
    //we destructure by name, greeting
    //const { name, greeting } = this.context;
    let { loading, featuredRooms: rooms } = this.context;
    //console.log(rooms);
    rooms = rooms.map(room => {
      return <Room key={room.id} room={room} />;
    });

    return (
      <div>
        <section className="featured-rooms">
          <Title title="featured rooms" />
          <div className="featured-rooms-center">
            {loading ? <Loading /> : rooms}
          </div>
        </section>
      </div>
    );
  }
}

//With this code, it will show up on the featured space Hello Ann welcome to featured property

/*
import React, { Component } from "react";
import { RoomContext } from "../context";

export default class componentName extends Component {
  //its important that we passed here not the consumer, but the whole context - set equal to the contextType - and then we have an acccess to that context using this.context
  static contextType = RoomContext;

  render() {
    // const value = this.context;
    //we can also do this instead now that we have our object
    //we destructure by name, greeting
    const { name, greeting } = this.context;
    //console.log(value);
    return (
      <div>
        {greeting} {name} View our Featured Rooms{" "}
      </div>
    );
    //we added {value} here and it will show hello from the context
    //<RoomContext.Provider value={ "hello" }>
  }
}


*/

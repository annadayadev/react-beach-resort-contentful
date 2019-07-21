import React, { Component } from "react";
//import items from "./data";
import Client from "./Contentful";

//Client.getEntries().then(response => console.log(response.items));
/*
however, with the code above, there will be some issue, for example in our contentful we have several other data that are connected to our different app or project, by using this code above, everything will be pulled out, meaning all the data, so what we need to do is to filter, and specify specific set of data to make sure it will only get the only data we needed. In order to get the specific ones, we need to get the content id or content type -> which can be found on the content model there's an id that we can use so we can filter our data. 
*/

// now we have filtered our data instead of the one above
// Client.getEntries({
//   content_type: "beachResortRoom"
// }).then(response => console.log(response.items));

// ==== we removed this code and put it inside our getData function/method

const RoomContext = React.createContext();
// <RoomContext.Provider value ={'hello'}

class RoomProvider extends Component {
  state = {
    // greeting: "Heyyy!",
    // name: "Ann"
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  };

  // getData - getting data from external source
  //here we will get all the filtered data from our contentful.
  getData = async () => {
    try {
      let response = await Client.getEntries({
        content_type: "beachResortRoom", //we got our response back
        //order: "sys.createdAt",
        //order: "fields.price", //order by price
        order: "-fields.price" //reverse order
      });
      //we changed this to response from API contentful
      let rooms = this.formatData(response.items);
      //console.log(rooms);
      //if your room is actually featured, or if featured is equals to true, you will be added to this featured room users.
      let featuredRooms = rooms.filter(room => room.featured === true);

      //compute the max value based on the data of the rooms
      let maxPrice = Math.max(...rooms.map(item => item.price));
      let maxSize = Math.max(...rooms.map(item => item.size));

      this.setState({
        rooms,
        featuredRooms,
        sortedRooms: rooms,
        loading: false,
        price: maxPrice,
        maxPrice,
        maxSize
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    //Since we will be using API, external data we will just call this method
    this.getData();

    //All these codes are intended for using local data. we move these code inside getData method and did some changes
    // let rooms = this.formatData(items);
    // //console.log(rooms);
    // //if your room is actually featured, or if featured is equals to true, you will be added to this featured room users.
    // let featuredRooms = rooms.filter(room => room.featured === true);

    // //compute the max value based on the data of the rooms
    // let maxPrice = Math.max(...rooms.map(item => item.price));
    // let maxSize = Math.max(...rooms.map(item => item.size));

    // this.setState({
    //   rooms,
    //   featuredRooms,
    //   sortedRooms: rooms,
    //   loading: false,
    //   price: maxPrice,
    //   maxPrice,
    //   maxSize
    // });
  }

  //our function in formatting data
  formatData(items) {
    //first lets loop through our data - map - iterating our array
    let tempItems = items.map(item => {
      let id = item.sys.id;
      //accessing our items - images.map(image => { means each and every item, as i am mapping all this, just return me the fields.file.url
      let images = item.fields.images.map(image => image.fields.file.url);
      //this will be equal to new images images is same as images:images but this is ES6 so we can just say images we are overriding this data - images

      //this is our room
      let room = { ...item.fields, images, id };
      return room;
    });

    //after returning our room, now we are getting back tempItems, so we are looping over our array, all this destructuring and formatting, now the last thing for this function is to return our tempItems.
    return tempItems;

    //and now in our console.log -> we are getting our objects - all the array of our data.
  }

  //first, we get the slug,
  getRoom = slug => {
    //we filter it first - and get the specific room that has that slug that will be pass using the link.
    let tempRooms = [...this.state.rooms];
    //check if the slug is the same - if you do have the slug that matches the slug that we are passing here in this argument, then return me
    const room = tempRooms.find(room => room.slug === slug);
    return room;
  };

  //events - handles all the changes
  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = event.target.name;
    this.setState(
      {
        [name]: value
      },
      this.filterRooms
    );
  };

  //   console.log(
  //     `this is the type: ${type}, this is name: ${name}, this is value:${value}`
  //   );
  // };

  filterRooms = () => {
    //console.log("hello from filter rooms");

    //i want to get the rooms from my state, not filters ones but the original list of rooms - and we make sure we only run this function when there's a changes on the state
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets
    } = this.state;

    //all the rooms
    let tempRooms = [...rooms];

    //transform value - whatever the capacity I have - and parse that instead of string we will get the number value - so now this is going to transform the value.
    capacity = parseInt(capacity);

    //for the price
    price = parseInt(price);

    //filter by type -> single, double, family
    if (type !== "all") {
      tempRooms = tempRooms.filter(room => room.type === type);
    }

    //filter by capacity - if capacity is one do nothing, if greater then return only the rooms that has more than 1 capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter(room => room.capacity >= capacity);
    }

    //filter by price
    tempRooms = tempRooms.filter(room => room.price <= price);

    //filter by size
    tempRooms = tempRooms.filter(
      room => room.size >= minSize && room.size <= maxSize
    );

    //filter by addons - breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast === true);
    }

    //filter by addons - pets
    if (pets) {
      tempRooms = tempRooms.filter(room => room.pets === true);
    }

    //changing the state
    this.setState({
      sortedRooms: tempRooms
    });
  };

  render() {
    return (
      // <RoomContext.Provider value={"Seda BGC, Serendra BGC"}>
      //we now have access to all the state properties
      //{'hello'} - but now that we have object on state, we do this
      //{{greeting:this.state.greeting}}
      // ... means destructure
      //but if you are passing only one string, you can just do "hello"
      //since the this.state is an object, we can pass more parameters, once we pass this getRoom, it will then be in our context where we can access it all over our application.
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

//higher order component
export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {value => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}

export { RoomProvider, RoomConsumer, RoomContext };

const plist = {
  pieces:[
  {
      id: "Game_Board",
      drag: false,
      rot: false,
      image: "board.png",
      position: {
          x: 200,
          y: 20,
          z: -1
      }
  },
  {
      id: "Arrow",
      drag: false,
      rot: true,
      image: "arrow.png",
      position: {
          x: 10,
          y: 170,
          z: 0
      }
  },
  {
      id: "Green",
      drag: true,
      rot: false,
      deg: 90,
      image: "green.png",
      position: {
          x: 425,
          y: 250,
          z: 1
      }
  },
  {
      id: "Purple",
      drag: true,
      rot: false,
      deg: 170,
      image: "purple.png",
      position: {
          x: 500,
          y: 250,
          z: 2
      }
  },
  {
      id: "White",
      drag: true,
      rot: false,
      image: "white.png",
      position: {
          x: 425,
          y: 320,
          z: 1
      }
  }
],
history: []
};
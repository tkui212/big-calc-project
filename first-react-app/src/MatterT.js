import React from "react";
import ReactDOM from "react-dom";
import Matter from "matter-js";

class MatterT extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint;

    var engine = Engine.create({
      // positionIterations: 20
    });

    var render = Render.create({
      element: this.refs.m,
      engine: engine,
      options: {

        wireframes: false
      }
    });

    var ballA = Bodies.circle(210, 100, 30, { restitution: 0.5 });
    var ballB = Bodies.circle(110, 50, 30, { restitution: 0.5 });

    World.add(engine.world, [
      // walls
      Bodies.rectangle(200, 0, window.innerWidth, 50, { isStatic: true }),
      Bodies.rectangle(200, 600, window.innerWidth, 50, { isStatic: true })
    ]);

    World.add(engine.world, [ballA, ballB]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false
          }
        }
      });

    World.add(engine.world, mouseConstraint);

    // Matter.Events.on(mouseConstraint, "mousedown", function(event) {
    //   World.add(engine.world, Bodies.circle(150, 50, 30, { restitution: 0.7 }));
    // });

    Engine.run(engine);

    Render.run(render);
    setInterval(()=>{console.log(Render)},4000)
  }

  render() {
    return <div ref="m" />;
  }
}
export default MatterT;

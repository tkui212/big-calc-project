console.log("i work")
let mouse = {
  x: null,
  y: null
};
mouseElem = () => document.elementsFromPoint(mouse.x, mouse.y);
window.onmousemove = e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
};
for (const element of $(`.menuos`)) {

  element[`enter`] = function hover() {
    console.log("enter");
    if ($(`#${this.id}>.contents`)[0].style.display == "none") {
        if($(`#${this.id}`).is(':animated')){
      $(`#${this.id}>.contents`).stop(true, true);
      $(`#${this.id}`).stop(true, true);
      }
      $(`#${this.id}>.contents`)[0].Show("up", 1000);
      $(`#${this.id}`).animate(
        { height: `+=${$(`#${this.id}>.contents`)[0].style.height}` },
        1000
      );
    }
  };
  element[`exit`] = function Exit() {
    let is = false;
    setTimeout(() => {
      for (const el of mouseElem()) {
        if (el.id == this.id) {
          is = true;
        }
      }
      if (!is) {
        // $(`#${this.id}>.contents`).stop(true, true);
        // $(`#${this.id}`).stop(true, true);
        // $(`#${this.id}`).animate({ height: `-=${$(`#${this.id}>.contents`)[0].style.height}` },1000);
        if($(`#${this.id}`).is(':animated')){
            $(`#${this.id}>.contents`).stop(true, true);
        $(`#${this.id}`).stop(true, true);
            $(`#${this.id}>.contents`)[0].Hide("up", 1000);
            $(`#${this.id}`).animate({ height: `-=${$(`#${this.id}>.contents`)[0].style.height}` },1000);
        }
        
        else{
        $(`#${this.id}>.contents`)[0].Hide("up", 1000);
        $(`#${this.id}`).animate({ height: `-=${$(`#${this.id}>.contents`)[0].style.height}` },1000);
        }
        

      }
    }, 10);
  };
    $(`#${element.id}awd`)[0][`der`] = "up";

    $(`#${element.id}awd`)[0][`Hide`] = function(dir, dur) {
    $(`#${this.id}`).hide(
      "slide",
      {
        direction: dir
      },
      dur
    );
  };
  $(`#${element.id}awd`)[0][`Show`] = function(dir, dur) {
    $(`#${this.id}`).show("slide", { direction: dir }, dur);
  };
  $(`#${element.id}awd`)[0].Hide("up", 1);
}

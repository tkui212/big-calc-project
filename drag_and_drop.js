con = (child) => {
    if (child.parentElement.getAttribute("title")!="WB"&&(WB.id!=child.id)&&!containsId(WB.children, child.id)) {
        // WB.parentElement.getAttribute("title")=="WB"
        let parBo=WB.getBoundingClientRect()
        let chiBo=child.getBoundingClientRect()
        child.style.left =parseInt(child.style.left) - parBo.left
        child.style.top = parseInt(child.style.top) - parBo.top-2
        WB.appendChild(child)
    }
}
dis = (child) => {
    if (child.parentElement.getAttribute("title")=="WB") {
        let parBo=child.getBoundingClientRect()
        child.style.left =parBo.left
        child.style.top =parBo.top
        child.style.position="absolute"
        child.style.float="none"
        all.insertBefore(child, document.getElementById("end of boards"))

    }
}


$(".ui-widget-content").resizable();
$("#tmove").draggable({
  grid: [2, 2]
});
$(".ui-widget-content").draggable({
  snap: `snapTo:not(#${this.id}):not(#${this.id}>snapTo)`,
  snapTolerance: 10,
  start: function (event, ui) {
    dis(this)

    this.connectCon()
    
    //add con() for the con's of WB children
  },

  stop: function (event, ui) {

    this.disconnectCon()
    
    /* Get the possible snap targets: */
    onSnap(this, this.getSnapings()[0]);
    
    updateCon(this);
  }
});
$(".dataPoints").draggable({
  snap: `snapTo`,
  snapTolerance: 10,
  start: function (event, ui) {
    WB=this.parentElement
    dis(this)
  },

  stop: function (event, ui) {
   
      onSnap(this, this.getSnapings()[0]);
    
}
});

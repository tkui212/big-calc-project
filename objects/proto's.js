Array.prototype.filterDup = function() {
    let arra = [this[0]];
    for (let i = 0; i < this.length; i++) {
      let is = true;
      for (let j = 0; j < arra.length; j++) {
        if (arra[j] == this[i]) {
          is = false;
          break;
        }
      }
      if (is) {
        arra.push(this[i]);
      }
    }
    // this=arra
    return arra;
  };
function rmADs () {
  for (let i=1; i<10; i++) {
    let ele = document.getElementById('ad'+i);
    ele && ele.setAttribute('style', 'display:none;')
  }
  for (let i=1; i<10; i++) {
    let cls = document.getElementsByClassName('ad' + i);
    if (cls && cls[0]);
    cls[0].setAttribute('style', 'display:none;')
  }
}
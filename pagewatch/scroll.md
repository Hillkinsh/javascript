# 优化滚动

需要优化滚动事件，
滚动与页面渲染的关系，
节流与防抖，
pointer-events:none 
优化滚动

IntersectionObserver

https://www.cnblogs.com/coco1s/p/5499469.html

在绑定 scroll 、resize 这类事件时，当它发生时，它被触发的频次非常高，间隔很近。如果事件中涉及到大量的位置计算、DOM 操作、元素重绘等工作且这些工作无法在下一个 scroll 事件触发前完成，就会造成浏览器掉帧。加之用户鼠标滚动往往是连续的，就会持续触发 scroll 事件导致掉帧扩大、浏览器 CPU 使用率增加、用户体验受到影响